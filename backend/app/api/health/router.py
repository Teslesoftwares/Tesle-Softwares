from datetime import datetime, timezone
from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.config import get_settings
import structlog

router = APIRouter(tags=["health"])
logger = structlog.get_logger()


@router.get("/api/health")
async def health_check(db: AsyncSession = Depends(get_db)):
    checks = {"database": "ok", "timestamp": datetime.now(timezone.utc).isoformat()}

    try:
        await db.execute(text("SELECT 1"))
    except Exception as e:
        checks["database"] = "error"
        logger.error("health_check_db_failed", error=str(e))

    try:
        import redis.asyncio as aioredis
        settings = get_settings()
        if settings.REDIS_URL:
            r = aioredis.from_url(settings.REDIS_URL, socket_timeout=2)
            await r.ping()
            await r.aclose()
            checks["redis"] = "ok"
    except Exception as e:
        checks["redis"] = "unavailable"
        logger.warning("health_check_redis_unavailable", error=str(e))

    all_ok = all(v == "ok" for k, v in checks.items() if k != "timestamp")

    return {
        "status": "ok" if all_ok else "degraded",
        "checks": checks,
    }
