# Tesle Backend (FastAPI)

Python backend for the Tesle Platform — FastAPI + SQLAlchemy 2.0 (async) + PostgreSQL 16 + native WebSocket + AI services + document generation.

## Setup

```bash
cd backend

# Create virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## Environment Variables

Copy `.env.example` to `.env` or create `backend/.env`:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/tesle_admin

# JWT
JWT_SECRET=your-jwt-secret-change-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret-change-in-production

# CORS (comma-separated origins)
CORS_ORIGIN=http://localhost:5173,http://localhost:5174,http://localhost:5175

# Password hashing
BCRYPT_ROUNDS=12

# OpenAI (for AI features)
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MODEL=gpt-4o
AI_TEMPERATURE=0.7

# Document storage
DOCUMENT_STORAGE_PATH=./storage/documents
```

## Run

```bash
# Development (with auto-reload)
uvicorn app.main:app --reload --host 0.0.0.0 --port 3000

# Or
python -m app.main
```

The API starts at `http://localhost:3000`.

## Interactive Docs

- Swagger UI: `http://localhost:3000/docs`
- ReDoc: `http://localhost:3000/redoc`

## Database

```bash
# Generate initial migration (compares models to database)
alembic revision --autogenerate -m "initial schema"

# Apply migrations
alembic upgrade head

# Or create all tables directly (dev only)
python -c "import asyncio; from app.database.connection import init_db; asyncio.run(init_db())"
```

---

## API Endpoints (118 total)

### Health (1 route)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/health` | No | Health check — returns status + UTC timestamp |

### Authentication — Legacy Admin (2 routes)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/auth/login` | No | Login with email/password. Returns JWT token + user object |
| `GET` | `/api/auth/me` | Yes | Get current authenticated user |

### Authentication — Multi-Tenant V2 (6 routes)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/auth/register` | No | Register new org user (optional `org_name` to create org) |
| `POST` | `/api/auth/login-v2` | No | Login with email/password (returns org context + refresh token) |
| `POST` | `/api/auth/refresh` | No | Exchange refresh token for new access token |
| `POST` | `/api/auth/logout` | No | Revoke refresh token |
| `GET` | `/api/auth/me-v2` | Yes | Get current user with org memberships |
| `PUT` | `/api/auth/password` | Yes | Change password (requires current password) |

### Client Portal Auth (3 routes)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/portal/auth/register` | No | Register new client user |
| `POST` | `/api/portal/auth/login` | No | Login client user |
| `GET` | `/api/portal/auth/me` | Yes | Get current client user |

### Dashboard (1 route)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/dashboard` | Yes | Aggregated admin stats (services, portfolio, blog, testimonials, careers, leads) |

### CMS (29 routes)

All routes require JWT auth.

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/services` | List all services |
| `GET` | `/api/services/{id}` | Get a service |
| `POST` | `/api/services` | Create a service |
| `PUT` | `/api/services/{id}` | Update a service |
| `DELETE` | `/api/services/{id}` | Delete a service |
| `GET` | `/api/portfolio` | List all portfolio items |
| `GET` | `/api/portfolio/{id}` | Get a portfolio item |
| `POST` | `/api/portfolio` | Create a portfolio item |
| `PUT` | `/api/portfolio/{id}` | Update a portfolio item |
| `DELETE` | `/api/portfolio/{id}` | Delete a portfolio item |
| `GET` | `/api/blog` | List blog posts (optionally filtered by published status) |
| `GET` | `/api/blog/{id}` | Get a blog post |
| `POST` | `/api/blog` | Create a blog post |
| `PUT` | `/api/blog/{id}` | Update a blog post |
| `DELETE` | `/api/blog/{id}` | Delete a blog post |
| `GET` | `/api/testimonials` | List all testimonials |
| `GET` | `/api/testimonials/{id}` | Get a testimonial |
| `POST` | `/api/testimonials` | Create a testimonial |
| `PUT` | `/api/testimonials/{id}` | Update a testimonial |
| `DELETE` | `/api/testimonials/{id}` | Delete a testimonial |
| `GET` | `/api/careers` | List all career listings |
| `GET` | `/api/careers/{id}` | Get a career listing |
| `POST` | `/api/careers` | Create a career listing |
| `PUT` | `/api/careers/{id}` | Update a career listing |
| `DELETE` | `/api/careers/{id}` | Delete a career listing |
| `GET` | `/api/leads` | List all inbound leads |
| `GET` | `/api/leads/{id}` | Get a lead |
| `PUT` | `/api/leads/{id}/status` | Update lead status |
| `DELETE` | `/api/leads/{id}` | Delete a lead |

### Organizations (9 routes)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/v1/organizations` | Yes | List organizations the user belongs to |
| `GET` | `/api/v1/organizations/{id}` | Yes | Get an organization |
| `POST` | `/api/v1/organizations` | Yes | Create an organization (auto-creates default roles) |
| `PUT` | `/api/v1/organizations/{id}` | Yes | Update an organization |
| `DELETE` | `/api/v1/organizations/{id}` | Yes | Delete an organization |
| `GET` | `/api/v1/organizations/{id}/members` | Yes | List organization members |
| `POST` | `/api/v1/organizations/{id}/members` | Yes | Add a member to an organization |
| `PUT` | `/api/v1/organizations/{id}/members/{user_id}` | Yes | Update a member's role/status |
| `DELETE` | `/api/v1/organizations/{id}/members/{user_id}` | Yes | Remove a member |

### Workspaces (5 routes)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/v1/workspaces` | Yes | List workspaces in the current org |
| `POST` | `/api/v1/workspaces` | Yes | Create a workspace |
| `GET` | `/api/v1/workspaces/{id}` | Yes | Get a workspace |
| `PUT` | `/api/v1/workspaces/{id}` | Yes | Update a workspace |
| `DELETE` | `/api/v1/workspaces/{id}` | Yes | Delete a workspace |

### Teams (7 routes)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/v1/teams` | Yes | List all teams in the org |
| `POST` | `/api/v1/teams` | Yes | Create a team (creator auto-added as lead) |
| `GET` | `/api/v1/teams/{id}` | Yes | Get a team with its members |
| `PUT` | `/api/v1/teams/{id}` | Yes | Update a team |
| `DELETE` | `/api/v1/teams/{id}` | Yes | Delete a team |
| `POST` | `/api/v1/teams/{id}/members` | Yes | Add a member to a team |
| `DELETE` | `/api/v1/teams/{id}/members/{user_id}` | Yes | Remove a member from a team |

### Departments (7 routes)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/v1/departments` | Yes | List all departments in the org |
| `POST` | `/api/v1/departments` | Yes | Create a department (supports parent hierarchy) |
| `GET` | `/api/v1/departments/{id}` | Yes | Get a department with its members |
| `PUT` | `/api/v1/departments/{id}` | Yes | Update a department |
| `DELETE` | `/api/v1/departments/{id}` | Yes | Delete a department |
| `POST` | `/api/v1/departments/{id}/members` | Yes | Add a member to a department |
| `DELETE` | `/api/v1/departments/{id}/members/{user_id}` | Yes | Remove a member from a department |

### Roles (5 routes)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/v1/roles` | Yes | List all org roles with user counts + permissions |
| `POST` | `/api/v1/roles` | Yes | Create a role |
| `PUT` | `/api/v1/roles/{id}` | Yes | Update a role |
| `DELETE` | `/api/v1/roles/{id}` | Yes | Delete a role (system roles protected) |
| `PUT` | `/api/v1/roles/{id}/permissions` | Yes | Replace the permission set for a role |

### Permissions (2 routes)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/v1/permissions` | Yes | List all available permissions |
| `GET` | `/api/v1/permissions/seed` | Yes | Seed the default permission catalog |

### Products (7 routes)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/v1/products` | Yes | List active products (optional category filter) |
| `GET` | `/api/v1/products/org/{org_id}` | Yes | List products with enable/disable status for an org |
| `GET` | `/api/v1/products/{id}` | Yes | Get a product |
| `POST` | `/api/v1/products` | Yes | Create a product |
| `PUT` | `/api/v1/products/{id}` | Yes | Update a product |
| `DELETE` | `/api/v1/products/{id}` | Yes | Delete a product |
| `PUT` | `/api/v1/products/org/{org_id}/{product_id}` | Yes | Enable/disable a product for an org |

### Subscriptions (7 routes)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/v1/subscriptions/plans` | Yes | List all active subscription plans |
| `POST` | `/api/v1/subscriptions/plans` | Yes | Create a subscription plan |
| `PUT` | `/api/v1/subscriptions/plans/{id}` | Yes | Update a subscription plan |
| `GET` | `/api/v1/subscriptions` | Yes | List subscriptions for the current org |
| `GET` | `/api/v1/subscriptions/current` | Yes | Get the current active subscription |
| `POST` | `/api/v1/subscriptions` | Yes | Create a subscription for the org |
| `PUT` | `/api/v1/subscriptions/{id}` | Yes | Update a subscription |

### Marketplace (8 routes)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/v1/marketplace/items` | Yes | List marketplace items (filterable by type, category, search, sort) |
| `GET` | `/api/v1/marketplace/items/{id}` | Yes | Get a marketplace item |
| `GET` | `/api/v1/marketplace/developers` | Yes | List all developers |
| `GET` | `/api/v1/marketplace/developers/{id}` | Yes | Get a developer profile + published items |
| `POST` | `/api/v1/marketplace/install` | Yes | Install a marketplace item for the org |
| `DELETE` | `/api/v1/marketplace/install/{item_id}` | Yes | Uninstall a marketplace item |
| `GET` | `/api/v1/marketplace/installed` | Yes | List installed items for the org |
| `POST` | `/api/v1/marketplace/items/{id}/review` | Yes | Submit a rating + review |

### System (12 routes)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/v1/feature-flags` | Yes | List feature flags (optional environment filter) |
| `POST` | `/api/v1/feature-flags` | Yes | Create a feature flag |
| `PUT` | `/api/v1/feature-flags/{id}` | Yes | Update a feature flag |
| `DELETE` | `/api/v1/feature-flags/{id}` | Yes | Delete a feature flag |
| `GET` | `/api/v1/audit-logs` | Yes | List audit logs (paginated, filterable) |
| `GET` | `/api/v1/audit-logs/actions` | Yes | List distinct audit action types |
| `GET` | `/api/v1/audit-logs/resources` | Yes | List distinct audit resource types |
| `GET` | `/api/v1/notifications` | Yes | List org notifications |
| `GET` | `/api/v1/notifications/unread-count` | Yes | Get unread notification count |
| `PUT` | `/api/v1/notifications/{id}/read` | Yes | Mark a notification as read |
| `PUT` | `/api/v1/notifications/read-all` | Yes | Mark all notifications as read |
| `DELETE` | `/api/v1/notifications/{id}` | Yes | Delete a notification |

### Client Portal (16 routes)

All routes require client-role JWT auth.

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/portal/projects` | Yes | List client's projects |
| `GET` | `/api/portal/projects/{id}` | Yes | Get a project with milestones |
| `GET` | `/api/portal/tickets` | Yes | List client's support tickets |
| `GET` | `/api/portal/tickets/{id}` | Yes | Get a ticket with comments |
| `POST` | `/api/portal/tickets` | Yes | Create a support ticket |
| `POST` | `/api/portal/tickets/{id}/comments` | Yes | Add a comment to a ticket |
| `GET` | `/api/portal/files` | Yes | List files shared with the client |
| `POST` | `/api/portal/files` | Yes | Upload/register a file share |
| `GET` | `/api/portal/invoices` | Yes | List client's invoices |
| `GET` | `/api/portal/invoices/{id}` | Yes | Get an invoice |
| `GET` | `/api/portal/meetings` | Yes | List client's meetings |
| `POST` | `/api/portal/meetings` | Yes | Schedule a meeting |
| `GET` | `/api/portal/notifications` | Yes | List client notifications |
| `PUT` | `/api/portal/notifications/{id}/read` | Yes | Mark a client notification as read |
| `PUT` | `/api/portal/notifications/read-all` | Yes | Mark all client notifications as read |
| `POST` | `/api/portal/ai/chat` | Yes | Keyword-based AI assistant for client support |

### Documents (14 routes)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/documents/invoices/generate` | Yes | Generate an invoice (PDF/DOCX/XLSX) |
| `POST` | `/api/documents/invoices/preview` | Yes | Preview an invoice (raw file bytes) |
| `POST` | `/api/documents/contracts/generate` | Yes | Generate a contract (PDF/DOCX) |
| `POST` | `/api/documents/contracts/preview` | Yes | Preview a contract (raw file bytes) |
| `GET` | `/api/documents/contracts/clause-libraries` | Yes | List available clause libraries |
| `POST` | `/api/documents/reports/generate` | Yes | Generate a report (PDF/DOCX/XLSX) |
| `POST` | `/api/documents/reports/preview` | Yes | Preview a report (raw file bytes) |
| `POST` | `/api/documents/reports/financial` | Yes | Generate a financial report |
| `POST` | `/api/documents/generate` | Yes | Unified document generation (any type, any format) |
| `POST` | `/api/documents/preview` | Yes | Unified document preview |
| `GET` | `/api/documents/files` | Yes | List stored generated documents |
| `GET` | `/api/documents/files/download/{path}` | Yes | Download a generated document |
| `DELETE` | `/api/documents/files/{path}` | Yes | Delete a generated document |
| `POST` | `/api/documents/templates/render` | Yes | Render a template string with data injection |

### AI (3 routes)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/ai/chat` | Yes | Multi-turn AI chat (supports system prompt, temperature, max tokens) |
| `POST` | `/api/ai/generate-report` | Yes | AI-powered document generation (report, proposal, email, contract, etc.) |
| `POST` | `/api/ai/analyze-data` | Yes | AI-powered data analysis (summary, trends, comparison, prediction, anomaly) |

### WebSocket (1 endpoint)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `WS` | `/ws` | Yes (JWT query param) | Real-time WebSocket — join rooms: `join:org`, `join:workspace`, `join:team` |

---

## Authentication System

### JWT Tokens

- **Access token**: 15-minute expiry, signed with `JWT_SECRET`
- **Refresh token**: 7-day expiry, random hex string stored in `refresh_tokens` table
- **Algorithm**: HS256

### Token Payload
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "User Name",
  "role": "admin",
  "orgId": 1,
  "exp": 1234567890,
  "iat": 1234567890
}
```

### Password Hashing

- **Library**: passlib with bcrypt
- **Rounds**: 12 (configurable via `BCRYPT_ROUNDS`)

### Roles

| Role | Description |
|------|-------------|
| `admin` | Full system access |
| `manager` | Organization management |
| `staff` | Basic access |
| `client` | Portal-only access |

### Using Auth in New Routes

```python
from fastapi import Depends
from app.middleware.auth import get_current_user, require_role, AuthPayload

# Protected route
@router.get("/protected")
async def protected(user: AuthPayload = Depends(get_current_user)):
    return {"user_id": user.id}

# Role-based route
@router.get("/admin-only")
async def admin_only(user: AuthPayload = Depends(require_role("admin"))):
    return {"admin": user.name}

# Client-only route
@router.get("/client-only")
async def client_only(user: AuthPayload = Depends(require_role("client"))):
    return {"client": user.name}
```

---

## AI Services

### Architecture

```
Frontend → FastAPI → AI Service → OpenAI / Local Models
                ↓
         app/services/ai/
           ├── ai_service.py        (Core LLM wrapper)
           ├── document_agent.py    (Document generation)
           └── analytics_agent.py   (Data analysis)
```

### Configuration

```env
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MODEL=gpt-4o
AI_TEMPERATURE=0.7
```

---

## Document Engine

### Architecture

```
app/services/documents/
  ├── base.py                 (BaseDocumentGenerator)
  ├── pdf_generator.py        (PDF via ReportLab)
  ├── docx_generator.py       (Word via python-docx)
  ├── excel_generator.py      (Excel via openpyxl)
  ├── invoice_generator.py    (Invoice-specific logic)
  ├── contract_generator.py   (Contract with clause library)
  ├── report_generator.py     (Business reports)
  ├── templates.py            (Jinja2-style template engine)
  └── storage.py              (File storage: product/doc_type/YYYY/MM/filename)
```

### Supported Formats

| Format | Library | Extensions |
|--------|---------|------------|
| PDF | ReportLab | `.pdf` |
| Word | python-docx | `.docx` |
| Excel | openpyxl | `.xlsx` |

---

## WebSocket

### Connection

```
ws://localhost:3000/ws?token=<jwt>
```

### Events

| Client → Server | Description |
|----------------|-------------|
| `join:org` | Join the organization room |
| `join:workspace` | Join a workspace room |
| `join:team` | Join a team room |
| `leave:org` | Leave the organization room |
| `leave:workspace` | Leave a workspace room |
| `leave:team` | Leave a team room |

| Server → Client | Description |
|----------------|-------------|
| `notification` | Real-time notification broadcast |

---

## Project Structure

```
backend/
├── app/
│   ├── main.py                    # FastAPI entry point, CORS, lifespan
│   ├── config.py                  # Pydantic settings (reads .env)
│   ├── database/
│   │   ├── connection.py          # Async SQLAlchemy engine + session
│   │   └── models/                # 40 tables (SQLAlchemy 2.0)
│   │       ├── __init__.py
│   │       ├── users.py           # User, OrgUser, ClientUser
│   │       ├── cms.py             # Service, Portfolio, BlogPost, etc.
│   │       ├── portal.py          # ClientProject, Ticket, Invoice, etc.
│   │       ├── organizations.py   # Organization, Member, Role, Permission
│   │       ├── workspace.py       # Workspace, Team, Department
│   │       ├── products.py        # OrgProduct, OrganizationProduct
│   │       ├── billing.py         # SubscriptionPlan, Subscription, RefreshToken
│   │       ├── marketplace.py     # MarketplaceItem, Developer, Install, Review
│   │       └── system.py          # FeatureFlag, AuditLog, OrgNotification
│   ├── middleware/
│   │   ├── auth.py                # JWT dependencies (get_current_user, require_role)
│   │   ├── tenant.py              # Org resolution
│   │   ├── permissions.py         # Hierarchy checks
│   │   └── cors.py                # CORS configuration
│   ├── schemas/                   # Pydantic request/response models
│   │   ├── auth.py
│   │   ├── cms.py
│   │   ├── common.py
│   │   ├── marketplace.py
│   │   ├── organizations.py
│   │   ├── portal.py
│   │   ├── system.py
│   │   ├── ai.py
│   │   └── documents.py
│   ├── services/
│   │   ├── auth.py                # Password hashing, JWT, user CRUD
│   │   ├── base.py                # Base service utilities
│   │   ├── ai/                    # AI service layer
│   │   │   ├── __init__.py
│   │   │   ├── ai_service.py      # Core OpenAI + LangChain wrapper
│   │   │   ├── document_agent.py  # Document generation agent
│   │   │   └── analytics_agent.py # Data analysis agent
│   │   └── documents/             # Document generators
│   │       ├── __init__.py
│   │       ├── base.py            # BaseDocumentGenerator
│   │       ├── pdf_generator.py
│   │       ├── docx_generator.py
│   │       ├── excel_generator.py
│   │       ├── invoice_generator.py
│   │       ├── contract_generator.py
│   │       ├── report_generator.py
│   │       ├── templates.py
│   │       └── storage.py
│   ├── api/                       # Route modules
│   │   ├── health/
│   │   ├── auth/
│   │   ├── cms/
│   │   ├── dashboard/
│   │   ├── organizations/
│   │   ├── workspaces/
│   │   ├── teams/
│   │   ├── departments/
│   │   ├── roles/
│   │   ├── permissions/
│   │   ├── products/
│   │   ├── subscriptions/
│   │   ├── marketplace/
│   │   ├── system/
│   │   ├── portal/
│   │   ├── documents/
│   │   └── ai/
│   └── websocket/
│       ├── manager.py             # ConnectionManager (rooms, broadcast)
│       └── routes.py              # WebSocket endpoint with JWT auth
├── alembic/                       # Database migrations
│   ├── env.py
│   ├── script.py.mako
│   └── versions/
├── alembic.ini
├── storage/                       # Generated documents
├── requirements.txt
└── README.md
```

## Dependencies

```
fastapi>=0.115.0
uvicorn[standard]>=0.34.0
sqlalchemy[asyncio]>=2.0.36
asyncpg>=0.30.0
pydantic>=2.10.0
pydantic-settings>=2.7.0
python-jose[cryptography]>=3.3.0
passlib[bcrypt]>=1.7.4
python-multipart>=0.0.18
alembic>=1.14.0
openai>=1.60.0
langchain>=0.3.0
langchain-openai>=0.2.0
langchain-core>=0.3.0
reportlab>=4.2.0
python-docx>=1.1.0
openpyxl>=3.1.0
```

## Migration Status

- [x] FastAPI app scaffold + CORS + lifespan
- [x] Pydantic settings (JWT, DB, CORS, OpenAI, document storage)
- [x] Async PostgreSQL connection (SQLAlchemy 2.0 + asyncpg)
- [x] All 40 database models
- [x] Alembic migration setup
- [x] JWT authentication (access + refresh tokens)
- [x] Password hashing (passlib bcrypt)
- [x] Role-based access control (`require_role()` dependency)
- [x] Multi-tenant middleware (org resolution)
- [x] Hierarchy permission checks
- [x] Legacy admin auth routes (`/api/auth/login`, `/api/auth/me`)
- [x] V2 multi-tenant auth routes (register, login, refresh, logout, me, password)
- [x] Client portal auth routes (`/api/portal/auth/*`)
- [x] CMS routes — services, portfolio, blog, testimonials, careers, leads (29 routes)
- [x] Dashboard aggregated stats
- [x] Organization CRUD + member management (9 routes)
- [x] Workspace CRUD (5 routes)
- [x] Team CRUD + member management (7 routes)
- [x] Department CRUD + member management (7 routes)
- [x] Role CRUD + permission assignment (5 routes)
- [x] Permission list + seed (2 routes)
- [x] Product CRUD + org product management (7 routes)
- [x] Subscription plan + subscription CRUD (7 routes)
- [x] Marketplace items, developers, install/uninstall, reviews (8 routes)
- [x] Feature flags CRUD (4 routes)
- [x] Audit logs (3 routes)
- [x] Notifications (5 routes)
- [x] Client portal — projects, tickets, files, invoices, meetings, notifications, AI (16 routes)
- [x] AI service layer (OpenAI + LangChain)
- [x] AI chat endpoint
- [x] AI document generation endpoint
- [x] AI data analysis endpoint
- [x] Document generation — invoices, contracts, reports (PDF, DOCX, XLSX)
- [x] Document storage + file management
- [x] WebSocket with JWT auth + room management
- [ ] Seeds / fixtures
