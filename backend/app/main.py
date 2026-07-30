from contextlib import asynccontextmanager
from fastapi import FastAPI
import structlog

from app.config import get_settings
from app.logging import setup_logging
from app.middleware.cors import setup_cors
from app.middleware.error_handling import (
    ErrorHandlingMiddleware,
    SecurityHeadersMiddleware,
    RequestTimingMiddleware,
)
from app.database.connection import init_db

from app.api.health.router import router as health_router
from app.api.auth.routes import router as auth_router
from app.api.auth.routes import portal_router
from app.api.cms.router import router as cms_router
from app.api.dashboard.router import router as dashboard_router
from app.api.organizations.router import router as organizations_router
from app.api.workspaces.router import router as workspaces_router
from app.api.teams.router import router as teams_router
from app.api.departments.router import router as departments_router
from app.api.roles.router import router as roles_router
from app.api.permissions.router import router as permissions_router
from app.api.products.router import router as products_router
from app.api.subscriptions.router import router as subscriptions_router
from app.api.marketplace.router import router as marketplace_router
from app.api.portal.router import router as portal_routes_router
from app.api.system.router import router as system_router
from app.websocket.routes import router as ws_router
from app.websocket.chat_handler import router as chat_ws_router
from app.api.ai.router import router as ai_router
from app.api.chat.router import router as chat_router
from app.api.documents.router import router as documents_router


settings = get_settings()

setup_logging(log_level=settings.LOG_LEVEL, log_format=settings.LOG_FORMAT)
logger = structlog.get_logger()


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("starting_server", env=settings.NODE_ENV, port=settings.PORT)

    if settings.is_development:
        await init_db()
        logger.info("database_initialized", mode="create_all")
    else:
        logger.info("database_skipped", mode="production_use_alembic")

    yield

    logger.info("shutting_down_server")


app = FastAPI(
    title="Tesle API",
    description="Tesle Platform Backend — FastAPI",
    version="2.0.0",
    lifespan=lifespan,
    docs_url="/docs" if settings.is_development else None,
    redoc_url="/redoc" if settings.is_development else None,
    openapi_url="/openapi.json" if settings.is_development else None,
)

app.add_middleware(ErrorHandlingMiddleware)
app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(RequestTimingMiddleware)

setup_cors(app)

# ── Health ───────────────────────────────────────────────────────────────────
app.include_router(health_router)

# ── Auth (legacy + v2 + portal) ──────────────────────────────────────────────
app.include_router(auth_router)
app.include_router(portal_router)

# ── CMS (admin portal) ──────────────────────────────────────────────────────
app.include_router(cms_router)
app.include_router(dashboard_router)

# ── Multi-tenant (v1) ───────────────────────────────────────────────────────
app.include_router(organizations_router)
app.include_router(workspaces_router)
app.include_router(teams_router)
app.include_router(departments_router)
app.include_router(roles_router)
app.include_router(permissions_router)
app.include_router(products_router)
app.include_router(subscriptions_router)

# ── Marketplace (v1) ────────────────────────────────────────────────────────
app.include_router(marketplace_router)

# ── System (feature flags, audit logs, notifications) ────────────────────────
app.include_router(system_router)

# ── Client portal ────────────────────────────────────────────────────────────
app.include_router(portal_routes_router)

# ── WebSocket ───────────────────────────────────────────────────────────────
app.include_router(ws_router)
app.include_router(chat_ws_router)

# ── Chat (REST) ─────────────────────────────────────────────────────────────
app.include_router(chat_router)

# ── AI (chat, document generation, analytics) ──────────────────────────────
app.include_router(ai_router)

# ── Documents (invoices, contracts, reports, file storage) ─────────────────
app.include_router(documents_router)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=settings.PORT,
        reload=settings.is_development,
    )
