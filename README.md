# Tesle — AI-Native Digital Growth Partner

We design and build end-to-end digital growth systems — combining software engineering, AI, creative production, and performance marketing to scale ambitious brands across Africa and beyond.

This monorepo contains the frontend applications, shared packages, and Python backend for the Tesle Platform.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend Apps                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   Website    │  │    Admin     │  │     Client Portal    │  │
│  │  (5173)      │  │  (5174)      │  │  (5175)              │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘  │
│         │                 │                     │               │
│         └────────┬────────┴─────────────────────┘               │
│                  │  Vite proxy → localhost:3000                  │
└──────────────────┼──────────────────────────────────────────────┘
                   │
┌──────────────────┼──────────────────────────────────────────────┐
│                  │        FastAPI Backend (3000)                 │
│  ┌───────────────┴────────────────────────────────────────┐     │
│  │                    REST API                            │     │
│  │  Auth · CMS · Dashboard · Orgs · Teams · Departments   │     │
│  │  Roles · Permissions · Products · Subscriptions        │     │
│  │  Marketplace · System · Portal · Documents · AI        │     │
│  └───────────────┬────────────────────────────────────────┘     │
│                  │                                              │
│  ┌───────────────┴────────────┐  ┌─────────────────────────┐   │
│  │   WebSocket /ws           │  │   AI Services            │   │
│  │   Native WebSocket + JWT  │  │   OpenAI + LangChain     │   │
│  │   Real-time notifications │  │   Document generation    │   │
│  └───────────────────────────┘  │   Data analysis          │   │
│                                 └─────────────────────────┘   │
│  ┌───────────────────────────┐  ┌─────────────────────────┐   │
│  │   Document Engine         │  │   PostgreSQL 16         │   │
│  │   PDF · Word · Excel      │  │   40 tables (async)     │   │
│  │   Invoices · Contracts    │  │   SQLAlchemy 2.0         │   │
│  └───────────────────────────┘  └─────────────────────────┘   │
└────────────────────────────────────────────────────────────────┘
```

| Layer | Technology |
|---|---|
| Frontend | **React 19**, **TypeScript**, **Vite 8**, **Tailwind CSS v4** |
| Animation | **GSAP 3.15**, **Framer Motion**, **Three.js / R3F / Drei** |
| Backend | **FastAPI**, **Python 3.12**, **SQLAlchemy 2.0 (async)**, **PostgreSQL 16** |
| AI | **OpenAI**, **LangChain**, **LangChain-OpenAI** |
| Documents | **ReportLab** (PDF), **python-docx** (Word), **openpyxl** (Excel) |
| Auth | **JWT** (access + refresh tokens), **bcrypt** |
| Tooling | **tsx**, **Zod**, **React Router**, **React Helmet Async**, **Alembic** |

## Apps

| App | Directory | Port | Description |
|---|---|---|---|
| **Website** | `apps/website/` | 5173 | Public-facing website |
| **Admin** | `apps/admin/` | 5174 | CMS for managing site content |
| **Client Portal** | `apps/portal/` | 5175 | Client dashboard with projects, tickets, invoicing |
| **Backend** | `backend/` | 3000 | FastAPI REST + WebSocket + AI API |

## Quick Start

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Start backend (port 3000)
uvicorn app.main:app --reload --host 0.0.0.0 --port 3000

# Start frontend apps (new terminals)
npm run dev              # Website → http://localhost:5173
npm run dev:admin        # Admin   → http://localhost:5174
npm run dev:portal       # Portal  → http://localhost:5175
```

## Database

```bash
cd backend

# Generate migration
alembic revision --autogenerate -m "description"

# Apply migration
alembic upgrade head

# Or create tables directly (dev only)
python -c "import asyncio; from app.database.connection import init_db; asyncio.run(init_db())"
```

## Backend Structure

```
backend/
├── app/
│   ├── main.py                    # FastAPI entry point, CORS, lifespan
│   ├── config.py                  # Pydantic settings (JWT, DB, CORS, OpenAI)
│   ├── database/
│   │   ├── connection.py          # Async SQLAlchemy engine + session
│   │   └── models/                # 40 tables (SQLAlchemy 2.0)
│   ├── middleware/
│   │   ├── auth.py                # JWT dependencies
│   │   ├── tenant.py              # Org resolution
│   │   ├── permissions.py         # Hierarchy checks
│   │   └── cors.py                # CORS configuration
│   ├── api/                       # Route modules
│   │   ├── auth/                  # Legacy + v2 + portal auth
│   │   ├── cms/                   # Services, portfolio, blog, etc.
│   │   ├── dashboard/             # Dashboard stats
│   │   ├── organizations/         # Org CRUD + members
│   │   ├── workspaces/            # Workspace CRUD
│   │   ├── teams/                 # Team CRUD + members
│   │   ├── departments/           # Dept CRUD + members
│   │   ├── roles/                 # Role CRUD + permissions
│   │   ├── permissions/           # Permission list + seed
│   │   ├── products/              # Product CRUD + org products
│   │   ├── subscriptions/         # Plans + subscriptions
│   │   ├── marketplace/           # Items, developers, install/uninstall
│   │   ├── system/                # Feature flags, audit logs, notifications
│   │   ├── portal/                # Client portal (projects, tickets, files, invoices, meetings, notifications, AI)
│   │   ├── documents/             # Document generation (PDF, Word, Excel)
│   │   ├── ai/                    # AI chat, report generation, data analysis
│   │   └── health/                # Health check
│   ├── services/
│   │   ├── auth.py                # Password hashing, JWT, user CRUD
│   │   ├── ai/                    # AI service layer (OpenAI + LangChain)
│   │   └── documents/             # Document generators (PDF, DOCX, XLSX, invoices, contracts, reports)
│   └── websocket/
│       ├── manager.py             # ConnectionManager (rooms, broadcast)
│       └── routes.py              # WebSocket endpoint with JWT auth
├── alembic/                       # Database migrations
├── storage/                       # Generated documents
├── requirements.txt
└── README.md                      # Full API documentation
```

## Key Features

- **Cinematic loader** — 7-phase GSAP animation with 3D particle effects (localStorage-gated)
- **3D hero** — Interactive Three.js scene with R3F
- **Client portal** — Real-time project tracking, tickets, file sharing, invoicing, AI assistant
- **Admin panel** — Full CRUD for services, portfolio, blog, testimonials, careers, leads
- **Native WebSocket** — Real-time notifications with JWT auth (no Socket.IO)
- **AI services** — Chat, document generation, data analysis via OpenAI + LangChain
- **Document engine** — PDF, Word, Excel generation for invoices, contracts, reports
- **Multi-tenant** — Organizations, workspaces, teams, departments, roles, permissions
- **Product marketplace** — Tesle Business OS, Tesle MedClinic, Tesle ERP
- **SEO** — Per-page meta tags, JSON-LD structured data, sitemap generation

## Products

| Product | Description |
|---|---|
| **Tesle Business OS** | All-in-one business management platform |
| **Tesle MedClinic** | Healthcare and clinic management |
| **Tesle ERP** | Enterprise resource planning |

## Services

| # | Service |
|---|---------|
| 1 | Software Development |
| 2 | Website Development |
| 3 | Mobile App Development |
| 4 | Graphics & Branding |
| 5 | Photography |
| 6 | Videography |
| 7 | Content Creation |
| 8 | Digital Marketing |
| 9 | SEO |
| 10 | Business Automation |
| 11 | Music Production |
| 12 | Digital Distribution & Promotion |

## Loader Animation

The cinematic loader (GSAP-driven) runs on first visit only:

1. **Dot** — tiny white point at center
2. **Line** — 3D-rotating light line with traveling sphere
3. **Split** — segments assemble into the Tesle "T" logo
4. **Brand** — logo glows, text fades in
5. **Orbit** — sphere orbits the logo, emitting particles
6. **Collapse** — everything converges to a bright point
7. **Burst** — cyan-white burst transitions to content

## Deployment

| Platform | Config | Notes |
|---|---|---|
| **Vercel** | `vercel.json` | Recommended for frontend apps |
| **Netlify** | `netlify.toml` | SPA redirect rules |
| **Any static host** | Point to `dist/` | Ensure SPA fallback to `index.html` |
| **Backend** | Docker, Railway, Render, Fly | Requires PostgreSQL + env vars |

---

Built with React 19, TypeScript, Vite 8, and FastAPI.
# Tesle-Softwares
