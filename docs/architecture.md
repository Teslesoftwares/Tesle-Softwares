# Tesle Platform — Architecture Document

## Overview

Tesle is an AI-native digital growth platform combining software engineering, AI, creative production, and performance marketing. The platform follows a monorepo architecture with a Python/FastAPI backend and React/TypeScript frontends.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Client Layer                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   Website    │  │    Admin     │  │   Portal     │  │  Workspace   │   │
│  │  (5173)      │  │  (5174)      │  │  (5175)      │  │  (5176)      │   │
│  │  React 19    │  │  React 19    │  │  React 19    │  │  React 19    │   │
│  │  Vite 8      │  │  Vite 8      │  │  Vite 8      │  │  Vite 8      │   │
│  │  Tailwind v4 │  │  Tailwind v4 │  │  Tailwind v4 │  │  Tailwind v4 │   │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   │
│         │                 │                 │                 │            │
│         └────────┬────────┴────────┬────────┘                 │            │
│                  │  HTTP/REST       │  HTTP/REST              │            │
│                  │  WebSocket       │  WebSocket              │            │
└──────────────────┼─────────────────┼─────────────────────────┼────────────┘
                   │                 │                         │
┌──────────────────┼─────────────────┼─────────────────────────┼────────────┐
│                  │    Backend Layer (FastAPI)                  │            │
│  ┌───────────────┴─────────────────┴─────────────────────────┴──────────┐  │
│  │                         API Gateway (port 3000)                      │  │
│  │                    FastAPI + CORS + Lifespan                          │  │
│  └───────────────┬─────────────────┬────────────────────────────────────┘  │
│                  │                 │                                       │
│  ┌───────────────┴──────┐  ┌──────┴───────────────────────────────────┐   │
│  │    REST API          │  │         WebSocket Manager                │   │
│  │  118 routes          │  │         Native WebSocket + JWT           │   │
│  │  16 modules          │  │         Room-based routing               │   │
│  └───────────────┬──────┘  └──────┬───────────────────────────────────┘   │
│                  │                │                                        │
│  ┌───────────────┴────────────────┴──────────────────────────────────────┐ │
│  │                        Service Layer                                  │ │
│  │  ┌─────────┐  ┌──────────┐  ┌──────────────┐  ┌──────────────────┐  │ │
│  │  │  Auth   │  │  AI Svc  │  │  Doc Engine  │  │  Tenant/Middleware│  │ │
│  │  │  JWT    │  │ OpenAI   │  │  PDF/DOCX/   │  │  Org resolution  │  │ │
│  │  │  bcrypt │  │ LangChain│  │  XLSX        │  │  Permission checks│ │ │
│  │  └─────────┘  └──────────┘  └──────────────┘  └──────────────────┘  │ │
│  └───────────────┬──────────────────────────────────────────────────────┘ │
│                  │                                                        │
│  ┌───────────────┴──────────────────────────────────────────────────────┐ │
│  │                      Data Layer                                      │ │
│  │  ┌──────────────────────────────┐  ┌──────────────────────────────┐ │ │
│  │  │  SQLAlchemy 2.0 (async)      │  │  Alembic Migrations         │ │ │
│  │  │  40 tables                   │  │  Schema versioning           │ │ │
│  │  │  PostgreSQL 16               │  │  Rollback support            │ │ │
│  │  └──────────────────────────────┘  └──────────────────────────────┘ │ │
│  └──────────────────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | React | 19.2.7 |
| **Frontend** | TypeScript | 6.0.3 |
| **Frontend** | Vite | 8.0.16 |
| **Frontend** | Tailwind CSS | 4.3.0 |
| **Animation** | GSAP | 3.15 |
| **Animation** | Three.js / R3F / Drei | Latest |
| **Backend** | FastAPI | 0.115.0+ |
| **Backend** | Python | 3.12 |
| **ORM** | SQLAlchemy | 2.0.36+ (async) |
| **Database** | PostgreSQL | 16 |
| **Migrations** | Alembic | 1.14.0+ |
| **AI** | OpenAI API | 1.60.0+ |
| **AI** | LangChain | 0.3.0+ |
| **Documents** | ReportLab | 4.2.0+ (PDF) |
| **Documents** | python-docx | 1.1.0+ (Word) |
| **Documents** | openpyxl | 3.1.0+ (Excel) |
| **Auth** | JWT (python-jose) | 3.3.0+ |
| **Auth** | bcrypt (passlib) | 1.7.4+ |

## Directory Structure

```
tesle/
├── apps/
│   ├── website/           # Public website (port 5173)
│   ├── admin/             # Admin CMS panel (port 5174)
│   ├── portal/            # Client portal (port 5175)
│   └── workspace/         # Workspace app (port 5176)
│
├── backend/               # FastAPI Python backend (port 3000)
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── database/
│   │   │   ├── connection.py
│   │   │   └── models/    # 40 SQLAlchemy models
│   │   ├── middleware/
│   │   │   ├── auth.py
│   │   │   ├── tenant.py
│   │   │   ├── permissions.py
│   │   │   └── cors.py
│   │   ├── api/           # 16 route modules (118 routes)
│   │   ├── services/
│   │   │   ├── auth.py
│   │   │   ├── ai/        # OpenAI + LangChain
│   │   │   └── documents/ # PDF, Word, Excel generation
│   │   ├── schemas/       # Pydantic models
│   │   └── websocket/     # Native WebSocket
│   ├── alembic/           # Database migrations
│   ├── storage/           # Generated documents
│   └── requirements.txt
│
├── packages/              # Shared TypeScript packages
│   ├── ui/                # Shared UI components
│   ├── auth/              # Auth utilities
│   ├── permissions/       # Permission logic
│   ├── database/          # Database types
│   ├── sdk/               # API SDK
│   ├── analytics/         # Analytics utilities
│   ├── billing/           # Billing logic
│   └── notifications/     # Notification utilities
│
├── products/              # Product packages (Tesle Business OS, MedClinic, ERP)
├── package.json           # Root workspace config
└── README.md
```

## Database Schema (40 Tables)

### Core Domain Tables

| Table | Description |
|-------|-------------|
| `users` | System users (email, password, name, role) |
| `org_users` | Organization membership (user_id, org_id, role) |
| `client_users` | Client portal users |
| `refresh_tokens` | JWT refresh tokens |

### CMS Tables

| Table | Description |
|-------|-------------|
| `services` | Service offerings |
| `portfolio` | Portfolio items |
| `blog_posts` | Blog articles |
| `testimonials` | Client testimonials |
| `careers` | Job listings |
| `leads` | Inbound leads |

### Multi-Tenant Tables

| Table | Description |
|-------|-------------|
| `organizations` | Tenant organizations |
| `organization_members` | Org membership with roles |
| `workspaces` | Workspaces within orgs |
| `teams` | Teams within workspaces |
| `departments` | Department hierarchy |
| `roles` | Custom roles per org |
| `permissions` | Permission catalog |
| `role_permissions` | Role-permission mapping |

### Product & Subscription Tables

| Table | Description |
|-------|-------------|
| `products` | Available products |
| `organization_products` | Org-product enable/disable |
| `subscription_plans` | Pricing plans |
| `subscriptions` | Active subscriptions |

### Marketplace Tables

| Table | Description |
|-------|-------------|
| `marketplace_items` | Marketplace listings |
| `developers` | Developer profiles |
| `installs` | Item installations |
| `reviews` | Item reviews |

### Portal Tables

| Table | Description |
|-------|-------------|
| `client_projects` | Client projects |
| `project_milestones` | Project milestones |
| `tickets` | Support tickets |
| `ticket_comments` | Ticket comments |
| `files` | Shared files |
| `invoices` | Client invoices |
| `meetings` | Scheduled meetings |

### System Tables

| Table | Description |
|-------|-------------|
| `feature_flags` | Feature flag definitions |
| `audit_logs` | Audit trail |
| `org_notifications` | Notification messages |

## API Design

### Route Structure

```
/api/                     # CMS + Dashboard
/api/auth/                # Authentication (legacy + v2)
/api/v1/                  # Multi-tenant resources
/api/portal/              # Client portal
/api/documents/           # Document generation
/api/ai/                  # AI services
/api/health               # Health check
/ws                       # WebSocket
```

### Authentication Flow

```
Client → POST /api/auth/login-v2 → { email, password }
    ↓
Server validates credentials → generates JWT access + refresh tokens
    ↓
Client stores tokens → uses Bearer token for subsequent requests
    ↓
Access token expires (15m) → POST /api/auth/refresh → new token pair
```

### WebSocket Flow

```
Client → ws://localhost:3000/ws?token=<jwt>
    ↓
Server validates JWT → ConnectionManager.add_user()
    ↓
Client → { "event": "join:org" } → joins organization room
    ↓
Server broadcasts to room → all org members receive real-time updates
```

## AI Services

### Components

1. **AIService** — Core LLM wrapper (OpenAI + LangChain)
2. **DocumentAgent** — Document generation (reports, proposals, emails)
3. **AnalyticsAgent** — Data analysis (trends, anomalies, predictions)

### Capabilities

- Multi-turn chat with system prompts
- Document generation (reports, proposals, summaries, emails)
- Data analysis (summary, trends, comparison, prediction, anomaly detection)
- Configurable temperature and token limits

## Document Engine

### Generators

| Generator | Format | Library |
|-----------|--------|---------|
| PDFGenerator | PDF | ReportLab |
| DOCXGenerator | Word | python-docx |
| ExcelGenerator | Excel | openpyxl |
| InvoiceGenerator | PDF/DOCX/XLSX | Combined |
| ContractGenerator | PDF/DOCX | Combined |
| ReportGenerator | PDF/DOCX/XLSX | Combined |

### Storage

Documents are stored at:
```
storage/{product}/{doc_type}/{YYYY}/{MM}/{filename}
```

## Security

### Authentication

- JWT access tokens (15-minute expiry)
- Refresh tokens (7-day expiry, stored in DB)
- bcrypt password hashing (12 rounds)

### Authorization

- Role-based access control (admin, manager, staff, client)
- Organization-scoped permissions
- Hierarchy-based permission checks

### CORS

Configured origins:
```
http://localhost:5173  # Website
http://localhost:5174  # Admin
http://localhost:5175  # Portal
```

## Deployment

### Frontend

- **Vercel** — Recommended for all frontend apps
- **Netlify** — SPA redirect rules
- **Static hosting** — Point to `dist/` with SPA fallback

### Backend

- **Docker** — Containerized deployment
- **Railway** — Managed PostgreSQL + Python
- **Render** — Web service with PostgreSQL
- **Fly.io** — Edge deployment

### Environment Variables

See `backend/README.md` for complete list.

## Development Workflow

### Frontend

```bash
npm install                    # Install all dependencies
npm run dev                    # Start website (5173)
npm run dev:admin              # Start admin (5174)
npm run dev:portal             # Start portal (5175)
npm run build                  # Build website
npm run build:all              # Build all apps
```

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 3000
```

### Database

```bash
cd backend
alembic revision --autogenerate -m "description"
alembic upgrade head
```

## Performance

- **Lazy loading** — Route-level code splitting
- **WebP images** — Optimized assets
- **Tree shaking** — Bundled icons and utilities
- **Async I/O** — Non-blocking database queries
- **Connection pooling** — SQLAlchemy async pool
- **WebSocket rooms** — Efficient broadcast targeting

## Products

| Product | Description |
|---------|-------------|
| **Tesle Business OS** | All-in-one business management |
| **Tesle MedClinic** | Healthcare clinic management |
| **Tesle ERP** | Enterprise resource planning |

---

Last updated: July 2026
