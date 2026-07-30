# Tesle Platform — Technical Blueprint

> **Document version:** 1.0.0
> **Last updated:** July 2026
> **Status:** Active reference for all implementation phases

---

## Table of Contents

1. [Product Vision & Scope](#1-product-vision--scope)
2. [Business Domains & Bounded Contexts](#2-business-domains--bounded-contexts)
3. [Multi-Tenant Architecture](#3-multi-tenant-architecture)
4. [User Roles & Permission Matrix](#4-user-roles--permission-matrix)
5. [Shared Platform Services](#5-shared-platform-services)
6. [Data Model & ER Diagrams](#6-data-model--er-diagrams)
7. [API Standards & Naming Conventions](#7-api-standards--naming-conventions)
8. [Monorepo Package Strategy](#8-monorepo-package-strategy)
9. [Folder Structure](#9-folder-structure)
10. [Coding Standards](#10-coding-standards)
11. [Security Architecture](#11-security-architecture)
12. [Deployment Architecture](#12-deployment-architecture)
13. [3–5 Year Product Roadmap](#13-3-5-year-product-roadmap)

---

## 1. Product Vision & Scope

### Vision
Tesle is Africa's operating system for business. A unified platform of 15 integrated products that replaces dozens of disjointed tools — giving organizations a single source of truth for every operational domain.

### Mission
Eliminate operational fragmentation in African enterprises and institutions by providing an integrated, multi-tenant SaaS platform that covers ERP, CRM, HR, payroll, accounting, inventory, POS, project management, education, healthcare, hospitality, logistics, and AI — all on one platform with one data model, one security layer, and one user experience.

### Target Market

| Segment | Description | Products Needed |
|---------|-------------|-----------------|
| **SMEs** (10–200 employees) | Retail, trade, services | ERP, CRM, Accounting, Inventory, POS, HR, Payroll |
| **Mid-Market** (200–2000) | Growing enterprises | All products, multi-entity, advanced reporting |
| **Enterprise** (2000+) | Large corporations | All products + dedicated infrastructure + SLAs |
| **Education** | K-12 schools, tertiary institutions | School, HR, Payroll, Accounting |
| **Healthcare** | Hospitals, clinics | Hospital, Inventory, HR, Payroll, Accounting |
| **Hospitality** | Hotels, lodges, restaurants | Hotel, POS, Inventory, HR, Payroll |
| **Non-Profit / Religious** | Churches, NGOs | Church, Accounting, HR, Payroll |

### Geographic Scope (Phase 1)
- **Primary:** Nigeria, Ghana, Kenya, South Africa
- **Secondary:** Rwanda, Uganda, Tanzania, Ethiopia, Zambia

### Regulatory Compliance Targets
- Nigeria: FIRS (PAYE, VAT, CIT), ITF, NSITF, NHF
- Ghana: GRA, SSNIT
- Kenya: KRA (PAYE, VAT), NSSF, NHIF
- South Africa: SARS (PAYE, VAT, UIF, SDL)

### Product Portfolio — 15 Products

| # | Product | Slug | Category | Starting Price |
|---|---------|------|----------|----------------|
| 1 | Tesle ERP | `erp` | Core | $19/mo |
| 2 | Tesle CRM | `crm` | Sales | $15/mo |
| 3 | Tesle Procurement | `procurement` | Supply Chain | $14/mo |
| 4 | Tesle HR | `hr` | People | $9/mo |
| 5 | Tesle Payroll | `payroll` | People | $5/mo |
| 6 | Tesle Accounting | `accounting` | Finance | $14/mo |
| 7 | Tesle Inventory | `inventory` | Supply Chain | $12/mo |
| 8 | Tesle POS | `pos` | Retail | $29/mo |
| 9 | Tesle Projects | `projects` | Operations | $12/mo |
| 10 | Tesle School | `school` | Vertical | $99/mo |
| 11 | Tesle Hospital | `hospital` | Vertical | $149/mo |
| 12 | Tesle Church | `church` | Vertical | $29/mo |
| 13 | Tesle Hotel | `hotel` | Vertical | $79/mo |
| 14 | Tesle Logistics | `logistics` | Supply Chain | $49/mo |
| 15 | Tesle AI | `ai` | Platform | Included free |

### Pricing Model
- **Starter (Free):** 1–5 users, limited features, Tesle branding
- **Business ($5–$149/mo/product):** Full features, 5–50 users, per-product pricing
- **Enterprise (Custom):** Unlimited users, dedicated support, custom SLAs, on-premise option

---

## 2. Business Domains & Bounded Contexts

Every bounded context maps to one or more products, owns its data, and communicates with others via shared events or API calls.

```
┌────────────────────────────────────────────────────────────────────┐
│                        TESLE PLATFORM                              │
│                                                                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │  Core    │  │  Sales   │  │  People  │  │ Finance  │          │
│  │  ERP     │  │  CRM     │  │  HR      │  │ Account  │          │
│  │  Proj    │  │          │  │  Payroll │  │          │          │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘          │
│       │              │              │              │              │
│  ┌────┴─────┐  ┌────┴─────┐  ┌────┴─────┐  ┌────┴─────┐          │
│  │ Supply   │  │  Retail  │  │ Vertical │  │ Platform │          │
│  │ Chain    │  │  POS     │  │ School   │  │ AI       │          │
│  │ Invent   │  │          │  │ Hospital │  │ Marketpl │          │
│  │ Logistics│  │          │  │ Church   │  │ Billing  │          │
│  │ Procure  │  │          │  │ Hotel    │  │ Auth     │          │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘          │
└────────────────────────────────────────────────────────────────────┘
```

### 2.1 Core Operations (ERP, Projects)
- Entity management, multi-entity consolidation
- Project lifecycle, task management, resource planning
- Financial consolidation across entities
- **Key data:** Organizations, workspaces, teams, projects, tasks, entities

### 2.2 Sales & Customer Management (CRM)
- Contact management, lead scoring, pipeline tracking
- Deal management, email integration, meeting scheduling
- Customer portal, support ticketing
- **Key data:** Contacts, leads, deals, pipelines, tickets

### 2.3 People Management (HR, Payroll)
- Employee lifecycle, org chart, document management
- Time tracking, leave management, performance reviews
- Payroll processing, tax computation, statutory filings
- **Key data:** Employees, departments, positions, timesheets, payruns, tax tables

### 2.4 Finance & Accounting (Accounting)
- General ledger, accounts payable/receivable
- Fixed assets, bank reconciliation, multi-currency
- Budgeting, financial reporting, audit trails
- **Key data:** Chart of accounts, journal entries, invoices, payments, budgets

### 2.5 Supply Chain (Procurement, Inventory, Logistics)
- Purchase orders, vendor management, sourcing
- Warehouse management, stock movements, inventory valuation
- Fleet management, route optimization, delivery tracking
- **Key data:** Vendors, POs, SKUs, warehouses, stock transactions, shipments, routes

### 2.6 Retail & Payments (POS)
- Point of sale, payment processing, order management
- Customer display, receipt printing, offline mode
- Loyalty programs, promotions
- **Key data:** Orders, payments, customers, products (retail), registers

### 2.7 Vertical Solutions (School, Hospital, Church, Hotel)
- **School:** Student records, class scheduling, grades, fees, LMS
- **Hospital:** Patient records, appointments, EHR, pharmacy, lab, billing
- **Church:** Membership, donations, events, small groups
- **Hotel:** Reservations, check-in/out, housekeeping, OTAs, billing
- **Key data:** Domain-specific per vertical

### 2.8 Platform Services (AI, Marketplace, Billing, Auth)
- AI: Cross-product intelligence, chatbot, predictions, automation
- Marketplace: Third-party extensions, integrations, themes, AI agents
- Billing: Subscription management, invoicing, metering
- Auth: Identity, SSO, MFA, device management
- Notifications: Push, email, SMS, in-app
- Analytics: Cross-product reporting, dashboards, data exports

### 2.9 Bounded Context Communication

```
┌─────────────┐     Events      ┌─────────────┐
│   Context A │ ──────────────> │   Context B │
│              │                │              │
│  Publishes:  │                │  Consumes:   │
│  - order.created              │  - order.created
│  - invoice.paid               │  - invoice.paid
│  - employee.hired             │  - employee.hired
└─────────────┘                └─────────────┘
```

Shared events cross boundaries via an internal event bus (initially direct API calls, later message queue):

| Event | Publisher | Consumers |
|-------|-----------|-----------|
| `user.created` | Auth | All contexts (welcome email, default config) |
| `organization.created` | Platform | Billing (create subscription), all contexts (init) |
| `subscription.changed` | Billing | Products (enable/disable features) |
| `employee.hired` | HR | Payroll (create payroll profile), Accounting (budget tracking) |
| `invoice.paid` | Accounting | Projects (update budget), CRM (update customer) |
| `order.created` | POS | Inventory (reserve stock), Accounting (revenue recognition) |
| `payment.received` | Payments | All contexts that care about AR |

---

## 3. Multi-Tenant Architecture

### 3.1 Tenant Isolation Model

**Strategy:** Row-level isolation with shared schema.

- **Single PostgreSQL database** with a shared schema
- **All tenant tables** have an `org_id` column (indexed)
- **Middleware-enforced scoping:** Every API query is automatically scoped to the requesting org
- **No cross-tenant data leakage:** Application-level enforcement via middleware + `verifyOrgMembership`
- **Future option:** Dedicate separate database instances for enterprise-tier tenants

```
┌─────────────────────────────────────────────────────────────┐
│                      PostgreSQL (Single DB)                  │
│                                                              │
│  organizations                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ Org A    │  │ Org B    │  │ Org C    │  │ Org D    │    │
│  │ ID: 1    │  │ ID: 2    │  │ ID: 3    │  │ ID: 4    │    │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘    │
│       │              │              │              │         │
│  ┌────┴─────┐  ┌────┴─────┐  ┌────┴─────┐  ┌────┴─────┐    │
│  │ Org A    │  │ Org B    │  │ Org C    │  │ Org D    │    │
│  │ Products │  │ Products │  │ Products │  │ Products │    │
│  │ Teams    │  │ Teams    │  │ Teams    │  │ Teams    │    │
│  │ Data     │  │ Data     │  │ Data     │  │ Data     │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Org Creation Flow

```
User signs up
  → Creates organization (slug auto-generated or chosen)
  → Organization gets default subscription (Free plan)
  → System roles created (Admin, Manager, Member, Viewer)
  → Admin user added as member with Admin role
  → Default feature flags set
  → Welcome email sent
  → Workspace created with default team
```

### 3.3 Product Enablement

Products are not automatically enabled. The organization admin (or billing) must enable each product:

```
ORG → organization_products → product_id → products
                                    ↓
                              settings JSONB
                              (per-product config)
```

Each product has its own `settings` blob for per-org configuration (e.g., chart of accounts template for Accounting, class structure for School).

### 3.4 Tenant Schema Objects

All multi-tenant tables have:

| Column | Type | Purpose |
|--------|------|---------|
| `id` | SERIAL PK | Primary key |
| `org_id` | INT FK → organizations(id) | Tenant scope |
| `created_at` | TIMESTAMPTZ | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | Last update timestamp |

Every query across these tables must include `WHERE org_id = $org_id`.

---

## 4. User Roles & Permission Matrix

### 4.1 Global Platform Roles

Applied at the platform level across all contexts:

| Role | Hierarchy Level | Scope | Description |
|------|----------------|-------|-------------|
| `super_admin` | 100 | Global | Platform operators — full access to all orgs, all data |
| `admin` | 80 | Per-Org | Org owner — full access within org |
| `manager` | 50 | Per-Org | Department or team lead — elevated permissions |
| `member` | 20 | Per-Org | Standard user — day-to-day operations |
| `viewer` | 10 | Per-Org | Read-only access |

### 4.2 Permission Resources & Actions

| Resource | Actions | Description |
|----------|---------|-------------|
| `organization` | `read`, `update`, `delete`, `manage` | Org settings, branding, deletion |
| `workspace` | `create`, `read`, `update`, `delete` | Workspace CRUD |
| `team` | `create`, `read`, `update`, `delete`, `manage_members` | Team management |
| `department` | `create`, `read`, `update`, `delete`, `manage_members` | Department management |
| `product` | `read`, `enable`, `disable`, `configure` | Product enablement per org |
| `subscription` | `read`, `update`, `cancel` | Subscription management |
| `member` | `read`, `invite`, `update_role`, `remove` | Team member management |
| `role` | `read`, `create`, `update`, `delete` | Custom role management |
| `feature_flag` | `read`, `toggle` | Feature flag management |
| `audit_log` | `read`, `export` | Audit trail access |
| `billing` | `read`, `manage` | Billing & invoices |
| `notification` | `read`, `send`, `manage_templates` | Notifications |
| `api_key` | `create`, `read`, `revoke` | API key management |
| `ai_config` | `read`, `update` | AI settings per org |
| `marketplace` | `read`, `install`, `uninstall`, `review` | Marketplace access |

### 4.3 Default Role Permissions

| Resource | Action | Viewer | Member | Manager | Admin | Super Admin |
|----------|--------|--------|--------|---------|-------|-------------|
| organization | read | ✓ | ✓ | ✓ | ✓ | ✓ |
| organization | update | — | — | — | ✓ | ✓ |
| organization | manage | — | — | — | ✓ | ✓ |
| workspace | read | ✓ | ✓ | ✓ | ✓ | ✓ |
| workspace | create | — | ✓ | ✓ | ✓ | ✓ |
| workspace | update | — | — | ✓ | ✓ | ✓ |
| workspace | delete | — | — | — | ✓ | ✓ |
| team | read | ✓ | ✓ | ✓ | ✓ | ✓ |
| team | create | — | — | ✓ | ✓ | ✓ |
| team | manage_members | — | — | ✓ | ✓ | ✓ |
| department | read | ✓ | ✓ | ✓ | ✓ | ✓ |
| department | manage | — | — | — | ✓ | ✓ |
| product | read | ✓ | ✓ | ✓ | ✓ | ✓ |
| product | enable | — | — | — | ✓ | ✓ |
| subscription | read | — | — | ✓ | ✓ | ✓ |
| subscription | update | — | — | — | ✓ | ✓ |
| member | read | ✓ | ✓ | ✓ | ✓ | ✓ |
| member | invite | — | — | ✓ | ✓ | ✓ |
| member | remove | — | — | — | ✓ | ✓ |
| audit_log | read | — | — | ✓ | ✓ | ✓ |
| billing | read | — | — | — | ✓ | ✓ |
| billing | manage | — | — | — | ✓ | ✓ |
| marketplace | read | ✓ | ✓ | ✓ | ✓ | ✓ |
| marketplace | install | — | — | ✓ | ✓ | ✓ |

### 4.4 Permission Inheritance Logic

```typescript
type Role = 'super_admin' | 'admin' | 'manager' | 'member' | 'viewer';

const ROLE_HIERARCHY: Record<Role, number> = {
  viewer: 10,
  member: 20,
  manager: 50,
  admin: 80,
  super_admin: 100,
};

function hasPermission(userRole: Role, requiredRole: Role): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}
```

### 4.5 Product-Specific Roles

Each product may define additional roles scoped to that product domain:

| Product | Role | Scope |
|---------|------|-------|
| ERP | `entity_admin`, `entity_viewer` | Per entity within org |
| School | `teacher`, `student`, `parent` | Per institution |
| Hospital | `doctor`, `nurse`, `patient` | Per facility |
| Hotel | `front_desk`, `housekeeping`, `manager` | Per property |
| Church | `pastor`, `ministry_lead`, `volunteer` | Per organization |

---

## 5. Shared Platform Services

### 5.1 Authentication Service (`@tesle/auth`)

**Type:** Library package (interfaces and types) + API route module

**Capabilities:**
- Email/password registration and login
- JWT access tokens (15-minute expiry)
- Refresh token rotation (7-day expiry, single-use)
- Multi-tenant session management
- Optional: OAuth2 providers (Google, Microsoft, Apple)
- MFA via TOTP (future)

**Token Schema:**

```typescript
interface AuthTokens {
  accessToken: string;    // JWT, 15m
  refreshToken: string;   // Opaque, 7d, single-use
}

interface AuthPayload {
  userId: number;
  orgId: number;
  role: string;
  permissions: string[];
}
```

**Endpoints:**
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `GET  /api/v1/auth/me`
- `PUT  /api/v1/auth/password`
- `POST /api/v1/auth/mfa/setup` (future)
- `POST /api/v1/auth/mfa/verify` (future)

### 5.2 Billing Service (`@tesle/billing`)

**Type:** Library package + API route module + background jobs

**Capabilities:**
- Subscription plan management
- Per-org subscription lifecycle (active, past_due, canceled, expired)
- Usage metering and tier enforcement
- Invoice generation (periodic + on-demand)
- Payment gateway integration (Paystack, Flutterwave, Stripe)
- Trial management
- Dunning (failed payment retry logic)

**Plan Model:**

```typescript
interface SubscriptionPlan {
  id: number;
  name: string;           // "Business", "Enterprise"
  slug: string;           // "business", "enterprise"
  price: number;          // In cents (or smallest currency unit)
  interval: 'month' | 'year';
  tier: 'starter' | 'business' | 'enterprise';
  popular: boolean;
  features: string[];     // Feature list for marketing
  limits: Record<string, number>;  // { products: 5, users: 50, storage: 10 }
}
```

**Subscription Lifecycle:**

```
Created → Active → Past Due → Canceled
    ↘         ↘         ↘
   Trial    Expired    Expired
```

**Endpoints:**
- `GET  /api/v1/subscriptions/plans`
- `POST /api/v1/subscriptions/subscribe`
- `GET  /api/v1/subscriptions/current`
- `PUT  /api/v1/subscriptions/:id`
- `POST /api/v1/subscriptions/:id/cancel`
- `POST /api/v1/subscriptions/:id/reactivate`
- `GET  /api/v1/subscriptions/invoices`
- `POST /api/v1/subscriptions/payment-method`

### 5.3 Notification Service (`@tesle/notifications`)

**Type:** Library package + API route module + worker

**Delivery channels:**
- In-app (real-time via Socket.IO)
- Email (SendGrid / AWS SES)
- SMS (Twilio / Africa's Talking)
- Push (Firebase / OneSignal)

**Notification Model:**

```typescript
interface Notification {
  id: number;
  userId: number;
  orgId: number;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  channel: 'in_app' | 'email' | 'sms' | 'push';
  read: boolean;
  link?: string;           // Deep link
  metadata?: Record<string, unknown>;
}
```

**Endpoints:**
- `GET    /api/v1/notifications` (paginated, filterable)
- `GET    /api/v1/notifications/unread-count`
- `PUT    /api/v1/notifications/:id/read`
- `PUT    /api/v1/notifications/read-all`
- `DELETE /api/v1/notifications/:id`
- `POST   /api/v1/notifications/send` (admin only)

### 5.4 AI Service

**Type:** Internal service (initially in-app, later standalone microservice)

**Capabilities (60 total — 4 per product):**
- Product-specific AI assistants (contextual help)
- Natural language query → structured data
- Anomaly detection and predictions
- Document analysis and generation
- Automated workflow suggestions

**Architecture:**

```
Frontend (AIAssistant.tsx)
  │
  ├── capability selection
  ├── prompt + context payload
  │
  ▼
POST /api/v1/ai/generate
  {
    product: "erp",
    capability: "inventory-forecast",
    prompt: "What should I reorder this month?",
    context: { orgId: 1, additionalData: {...} }
  }
  │
  ▼
AI Service
  │
  ├── 1. Prompt template selection (from /api/v1/ai/capabilities)
  ├── 2. Context enrichment (fetch org data, product data)
  ├── 3. LLM call (OpenAI / Anthropic / self-hosted)
  └── 4. Response formatting
  │
  ▼
{
  response: "Based on your sales data, you need to reorder...",
  data: { ... },
  suggestions: [...],
  actions: [...]
}
```

**Mock Mode:** When no LLM is configured, the service falls back to `src/data/ai.ts` mock response generators — deterministic, product-aware, context-sensitive templates.

**Endpoints:**
- `GET  /api/v1/ai/capabilities` — list all 60 capabilities
- `POST /api/v1/ai/generate` — generate response
- `POST /api/v1/ai/stream` — SSE streaming response (future)
- `GET  /api/v1/ai/conversations` — conversation history
- `POST /api/v1/ai/feedback` — thumbs up/down on responses

### 5.5 File Service

**Type:** Internal service + S3-compatible storage

**Capabilities:**
- File upload with progress (presigned URLs)
- Image optimization (resize, format conversion)
- Virus scanning
- Access control (per-org, per-user, per-resource)
- Version history

**Storage Backend:**
- Development: Local filesystem
- Production: AWS S3 / Cloudflare R2 / MinIO (self-hosted)

**Endpoints:**
- `POST  /api/v1/files/upload` (or presigned URL)
- `GET   /api/v1/files/:id`
- `GET   /api/v1/files/:id/download`
- `DELETE /api/v1/files/:id`
- `GET   /api/v1/files` (list per resource)

### 5.6 Analytics Service (`@tesle/analytics`)

**Type:** Library package + API route module + reporting engine

**Capabilities:**
- Cross-product reporting (financial, operational, HR, sales)
- Dashboard definitions (widgets, KPIs, charts)
- Scheduled report generation (PDF, CSV, Excel)
- Data export API

**Endpoints:**
- `GET  /api/v1/analytics/dashboards`
- `GET  /api/v1/analytics/dashboards/:id`
- `POST /api/v1/analytics/dashboards` (save custom)
- `GET  /api/v1/analytics/reports/:type` (predefined)
- `POST /api/v1/analytics/reports/generate`
- `GET  /api/v1/analytics/metrics` (KPI data)

### 5.7 Marketplace Service

**Capabilities:**
- Extension/app marketplace (third-party + Tesle-built)
- 7 item types: Apps, Integrations, Themes, Templates, Reports, AI Agents, Extensions
- Per-org install management
- Ratings and reviews
- Developer profiles
- Version management and updates

**Endpoints:**
- `GET  /api/v1/marketplace/items`
- `GET  /api/v1/marketplace/items/:id`
- `GET  /api/v1/marketplace/developers`
- `GET  /api/v1/marketplace/developers/:id`
- `POST /api/v1/marketplace/install`
- `DELETE /api/v1/marketplace/install/:itemId`
- `GET  /api/v1/marketplace/installed`
- `POST /api/v1/marketplace/items/:id/review`

---

## 6. Data Model & ER Diagrams

### 6.1 Entity Relationship Overview

```
┌──────────────┐       ┌──────────────────┐       ┌──────────────┐
│  Platform    │───────│  Organization    │───────│  Billing     │
│  Users       │       │  (Tenant)        │       │  Subscriptn  │
└──────┬───────┘       └───┬──────┬───────┘       └──────────────┘
       │                   │      │
       │                   │      └────────────────────┐
       │                   │                           │
       │         ┌─────────┴─────────┐       ┌────────┴────────┐
       │         │  Org Products     │       │  Feature Flags  │
       │         │  (enabled prods)  │       │                 │
       │         └───────────────────┘       └─────────────────┘
       │
       ├─── Org Members ─── Role ─── Permissions
       │
       ├─── Workspaces
       │       │
       │       ├─── Teams ─── Team Members
       │       └─── Departments ─── Dept Members
       │
       ├─── Products (domain-specific data)
       │       ├─── ERP: Entities, Ledgers, Journals
       │       ├─── CRM: Contacts, Deals, Pipelines
       │       ├─── HR: Employees, Positions, Timesheets
       │       ├─── Payroll: Payruns, Tax Tables, Payslips
       │       ├─── Accounting: Chart of Accounts, Transactions
       │       ├─── Inventory: Warehouses, SKUs, Stock Movements
       │       ├─── POS: Registers, Orders, Payments
       │       ├─── School: Students, Classes, Grades, Fees
       │       ├─── Hospital: Patients, Appointments, EHR
       │       ├─── Church: Members, Donations, Events
       │       ├─── Hotel: Reservations, Rooms, Housekeeping
       │       └─── Logistics: Fleets, Routes, Shipments
       │
       ├─── Audit Logs
       └─── Notifications
```

### 6.2 Core Schema (Multi-Tenant)

```
organizations
══════════════
  id              SERIAL PK
  name            VARCHAR(255)
  slug            VARCHAR(255) UNIQUE
  logo            TEXT
  domain          VARCHAR(255)
  plan            VARCHAR(50) DEFAULT 'free'
  settings        JSONB
  status          VARCHAR(50) DEFAULT 'active'
  created_at      TIMESTAMPTZ
  updated_at      TIMESTAMPTZ

org_users (platform users, not CMS admin users)
══════════
  id              SERIAL PK
  email           VARCHAR(255) UNIQUE
  password_hash   VARCHAR(255)
  name            VARCHAR(255)
  role            VARCHAR(50) DEFAULT 'user'
  avatar          TEXT
  is_active       BOOLEAN DEFAULT true
  last_login      TIMESTAMPTZ
  created_at      TIMESTAMPTZ
  updated_at      TIMESTAMPTZ

organization_members
════════════════════
  id              SERIAL PK
  user_id         INT FK → org_users(id) CASCADE
  org_id          INT FK → organizations(id) CASCADE
  role_id         INT FK → org_team_roles(id)
  status          VARCHAR(50) DEFAULT 'active'
  joined_at       TIMESTAMPTZ
  UNIQUE(user_id, org_id)

org_team_roles (org-scoped roles)
══════════════
  id              SERIAL PK
  org_id          INT FK → organizations(id) CASCADE
  name            VARCHAR(255)
  hierarchy_level INT
  description     TEXT
  is_system       BOOLEAN DEFAULT false

org_permissions
═══════════════
  id              SERIAL PK
  name            VARCHAR(255)
  resource        VARCHAR(255)
  action          VARCHAR(255)
  description     TEXT
  UNIQUE(resource, action)

role_permissions
════════════════
  id              SERIAL PK
  role_id         INT FK → org_team_roles(id) CASCADE
  permission_id   INT FK → org_permissions(id) CASCADE
  UNIQUE(role_id, permission_id)

refresh_tokens
══════════════
  id              SERIAL PK
  user_id         INT FK → org_users(id) CASCADE
  token           VARCHAR(255) UNIQUE
  expires_at      TIMESTAMPTZ
  revoked         BOOLEAN DEFAULT false
  created_at      TIMESTAMPTZ

audit_logs
══════════
  id              SERIAL PK
  org_id          INT FK → organizations(id) SET NULL
  user_id         INT FK → org_users(id) SET NULL
  action          VARCHAR(255)    -- "member.invited", "subscription.updated"
  resource        VARCHAR(255)    -- "organization", "team", "subscription"
  resource_id     VARCHAR(255)
  details         JSONB
  ip              VARCHAR(45)
  user_agent      TEXT
  created_at      TIMESTAMPTZ
```

### 6.3 Product Availability

```
org_products (master product catalog)
═══════════
  id              SERIAL PK
  name            VARCHAR(255)
  slug            VARCHAR(255) UNIQUE
  description     TEXT
  category        VARCHAR(100)
  price           NUMERIC(12,2)
  version         VARCHAR(50)
  status          VARCHAR(50)
  metadata        JSONB

organization_products (per-org enablement)
══════════════════════
  id              SERIAL PK
  org_id          INT FK → organizations(id) CASCADE
  product_id      INT FK → org_products(id) CASCADE
  enabled         BOOLEAN DEFAULT false
  settings        JSONB
  UNIQUE(org_id, product_id)
```

### 6.4 Billing

```
subscription_plans
═════════════════
  id              SERIAL PK
  name            VARCHAR(255)
  slug            VARCHAR(255) UNIQUE
  price           NUMERIC(12,2)
  interval        VARCHAR(20)     -- 'month', 'year'
  tier            VARCHAR(50)     -- 'starter', 'business', 'enterprise'
  popular         BOOLEAN DEFAULT false
  features        JSONB
  limits          JSONB
  is_active       BOOLEAN DEFAULT true

subscriptions
═══════════════
  id              SERIAL PK
  org_id          INT FK → organizations(id) CASCADE
  plan_id         INT FK → subscription_plans(id)
  status          VARCHAR(50)     -- 'active', 'past_due', 'canceled', 'expired'
  start_date      TIMESTAMPTZ
  end_date        TIMESTAMPTZ
  cancel_at       TIMESTAMPTZ     -- scheduled cancellation
  trial_end       TIMESTAMPTZ
  metadata        JSONB
```

### 6.5 Workspace Structure

```
workspaces
══════════
  id              SERIAL PK
  org_id          INT FK → organizations(id) CASCADE
  name            VARCHAR(255)
  slug            VARCHAR(255)
  description     TEXT
  settings        JSONB

teams
═════
  id              SERIAL PK
  org_id          INT FK → organizations(id) CASCADE
  workspace_id    INT FK → workspaces(id) SET NULL
  name            VARCHAR(255)
  description     TEXT
  lead_id         INT FK → org_users(id) SET NULL

team_members
════════════
  id              SERIAL PK
  team_id         INT FK → teams(id) CASCADE
  user_id         INT FK → org_users(id) CASCADE
  role            VARCHAR(50)
  UNIQUE(team_id, user_id)

departments
═══════════
  id              SERIAL PK
  org_id          INT FK → organizations(id) CASCADE
  name            VARCHAR(255)
  head_id         INT FK → org_users(id) SET NULL
  parent_id       INT FK → departments(id) SET NULL (self-referential)

department_members
══════════════════
  id              SERIAL PK
  dept_id         INT FK → departments(id) CASCADE
  user_id         INT FK → org_users(id) CASCADE
  UNIQUE(dept_id, user_id)
```

### 6.6 Marketplace

```
marketplace_items
═════════════════
  id              VARCHAR PK      -- e.g., "com.tesle.inventory-ai"
  name            VARCHAR(255)
  tagline         TEXT
  description     TEXT
  item_type       VARCHAR(50)     -- 'app', 'integration', 'theme', 'template', 'report', 'ai_agent', 'extension'
  category        VARCHAR(100)
  provider        VARCHAR(255)    -- "Tesle" or third-party name
  developer_id    VARCHAR FK → marketplace_developers(id)
  icon            TEXT
  color           VARCHAR(50)
  rating          DECIMAL(2,1)
  rating_count    INT
  install_count   INT
  featured        BOOLEAN
  verified        BOOLEAN
  pricing         VARCHAR(50)     -- 'free', 'paid', 'freemium'
  price           NUMERIC(12,2)
  version         VARCHAR(50)
  size            VARCHAR(50)     -- human-readable: "2.4 MB"
  requirements    TEXT[]           -- product dependencies
  permissions     TEXT[]           -- what the item can access
  works_with      TEXT[]           -- compatible products
  screenshots     TEXT[]
  metadata        JSONB

marketplace_developers
══════════════════════
  id              VARCHAR PK      -- e.g., "tesle", "acme-corp"
  name            VARCHAR(255)
  avatar          TEXT
  bio             TEXT
  website         VARCHAR(255)
  email           VARCHAR(255)
  items_count     INT
  total_installs  INT
  verified        BOOLEAN

marketplace_installs
════════════════════
  id              SERIAL PK
  item_id         VARCHAR FK → marketplace_items(id) CASCADE
  org_id          INT             -- (not FK, cross-db ref in future)
  installed_by    INT
  status          VARCHAR(50) DEFAULT 'active'
  config          JSONB
  UNIQUE(item_id, org_id)

marketplace_reviews
═══════════════════
  id              SERIAL PK
  item_id         VARCHAR FK → marketplace_items(id) CASCADE
  user_id         INT
  rating          INT CHECK(1-5)
  review          TEXT
  created_at      TIMESTAMPTZ
  UNIQUE(item_id, user_id)
```

### 6.7 Domain-Specific Data (Illustrative — Expanded Per Product)

Each product will have 3–10 domain tables. Example for Accounting:

```
chart_of_accounts
═════════════════
  id              SERIAL PK
  org_id          INT FK
  code            VARCHAR(20)     -- e.g., "1-1000"
  name            VARCHAR(255)
  type            VARCHAR(50)     -- 'asset', 'liability', 'equity', 'revenue', 'expense'
  normal_side     VARCHAR(5)      -- 'debit', 'credit'
  is_active       BOOLEAN

journal_entries
═════════════
  id              SERIAL PK
  org_id          INT FK
  entry_number    VARCHAR(50)
  description     TEXT
  entry_date      DATE
  created_by      INT FK
  approved_by     INT FK
  status          VARCHAR(50)     -- 'draft', 'posted', 'reversed'

journal_lines
═════════════
  id              SERIAL PK
  entry_id        INT FK → journal_entries(id) CASCADE
  account_id      INT FK → chart_of_accounts(id)
  debit           NUMERIC(15,2)
  credit          NUMERIC(15,2)
  description     TEXT
```

---

## 7. API Standards & Naming Conventions

### 7.1 Base URL Structure

```
/api/v1/{resource}
/api/v1/{resource}/{id}
/api/v1/{resource}/{id}/{sub-resource}
/api/v1/{resource}/{id}/{sub-resource}/{sub-id}
```

### 7.2 URL Naming

| Convention | Good | Bad |
|-----------|------|-----|
| Lowercase kebab-case | `/api/v1/marketplace-items` | `/api/v1/marketplaceItems` |
| Plural for collections | `/api/v1/users` | `/api/v1/user` |
| Singular for single | `/api/v1/users/me` | `/api/v1/users/me` (exception) |
| Nest related resources | `/api/v1/orgs/1/members` | `/api/v1/org-members?org=1` |
| Actions as last segment | `/api/v1/invoices/123/pay` | `/api/v1/pay-invoice?id=123` |

### 7.3 HTTP Methods

| Method | Purpose | Response |
|--------|---------|----------|
| `GET` | List (with filters) or single | `200 OK` with body |
| `POST` | Create resource or action | `201 Created` with location header |
| `PUT` | Full replace | `200 OK` |
| `PATCH` | Partial update | `200 OK` |
| `DELETE` | Remove resource | `204 No Content` |

### 7.4 Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Authorization` | Yes (most) | `Bearer {jwt_token}` |
| `X-Org-Id` | Yes (tenant) | Organization ID for multi-tenant scoping |
| `X-Idempotency-Key` | For mutating | Prevents duplicate operations |
| `Accept-Language` | No | `en`, `fr`, `sw`, `ha`, `yo`, `ig` |
| `Content-Type` | For body | `application/json` |

### 7.5 Response Format

**Success:**

```json
{
  "data": { ... },
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

**List response:**

```json
{
  "data": [ ... ],
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

**Error response:**

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": {
      "field": "email",
      "reason": "required"
    },
    "requestId": "req_abc123"
  }
}
```

### 7.6 Error Codes

| HTTP | Code | Meaning |
|------|------|---------|
| 400 | `VALIDATION_ERROR` | Invalid input |
| 401 | `UNAUTHORIZED` | Missing or invalid token |
| 403 | `FORBIDDEN` | Insufficient permissions |
| 404 | `NOT_FOUND` | Resource does not exist |
| 409 | `CONFLICT` | Duplicate or state conflict |
| 422 | `UNPROCESSABLE` | Semantic error |
| 429 | `RATE_LIMITED` | Too many requests |
| 500 | `INTERNAL_ERROR` | Server error |

### 7.7 Pagination

- **Default:** `page=1`, `pageSize=20`
- **Max page size:** `100`
- **Cursor-based pagination** for high-volume streams (audit logs, notifications)
- **Offset-based** for standard CRUD

```
GET /api/v1/users?page=2&pageSize=50
```

### 7.8 Filtering & Sorting

```
GET /api/v1/users?status=active&role=admin
GET /api/v1/users?search=john      (multi-field search)
GET /api/v1/users?sort=-created_at (descending)
GET /api/v1/users?sort=name        (ascending)
```

### 7.9 API Versioning

- **Strategy:** URL path versioning (`/api/v1/`)
- **Deprecation:** Endpoints marked `Deprecated` in response header 6 months before removal
- **Changelog:** Maintained in `docs/api/changelog.md`

---

## 8. Monorepo Package Strategy

### 8.1 Package Topology

```
tesle-platform (root)
│
├── apps/           (deployable applications)
│   ├── website/    @tesle/website    — Marketing site + public routes
│   ├── admin/      @tesle/admin      — Enterprise admin panel
│   ├── portal/     @tesle/portal     — Client portal
│   ├── workspace/  @tesle/workspace  — Workspace app
│   └── api/        @tesle/api        — Express API server
│
├── packages/       (shared libraries)
│   ├── ui/         @tesle/ui         — Design system (30+ components)
│   ├── auth/       @tesle/auth       — Auth types & utilities
│   ├── database/   @tesle/database   — DB client & helpers
│   ├── permissions/@tesle/permissions— RBAC types & helpers
│   ├── sdk/        @tesle/sdk        — API client SDK
│   ├── notifications/ @tesle/notifications — Notification types
│   ├── analytics/  @tesle/analytics  — Analytics types
│   └── billing/    @tesle/billing    — Billing types & helpers
│
├── products/       (product domain packages)
│   ├── shared/     @tesle/products-shared  — Common product types
│   ├── erp/        @tesle/erp        — ERP types & logic
│   ├── crm/        @tesle/crm        — CRM types & logic
│   ├── ...         (one per product)
│   └── ai/         @tesle/ai         — AI product types
```

### 8.2 Dependency Rules

```
Allowed:
  app  → package  ✓
  app  → product  ✓
  app  → app      ✗ (no cross-app deps)
  package → package ✓ (exceptions: permissions ↔ auth via types)
  product → product ✓ (via products-shared)
  product → package ✓

Disallowed:
  package → app    ✗
  product → app    ✗
```

### 8.3 Package Maturity Levels

| Level | Description | Examples |
|-------|-------------|----------|
| **Interface** | Types only, zero runtime | auth, permissions, notifications, analytics, billing, products-shared |
| **Library** | Runtime utilities, testable | database (DB client), sdk (API client), ui (components) |
| **Service** | Deployable with API routes | api (Express server with route modules) |

### 8.4 Build Order

```
1. packages/ (all interfaces + libraries, in any order)
2. products/ (depend on packages)
3. apps/     (depend on packages + products)
```

### 8.5 npm Workspaces Configuration

```json
{
  "workspaces": ["apps/*", "packages/*", "products/*"]
}
```

All internal dependencies use `"@tesle/*": "workspace:*"` (pnpm) or `"@tesle/*": "*"` (npm).

---

## 9. Folder Structure

```
tesle-platform/
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml               # Lint, typecheck, test
│   │   ├── deploy.yml           # Production deployment
│   │   └── release.yml          # Tagged release pipeline
│   └── CODEOWNERS               # Per-package ownership
│
├── docs/
│   ├── TECHNICAL_BLUEPRINT.md   # This document
│   ├── api/
│   │   ├── README.md            # API overview
│   │   ├── changelog.md         # API version changelog
│   │   └── examples/            # Curl/HTTPie examples
│   ├── architecture/
│   │   ├── multi-tenant.md      # Tenant isolation details
│   │   ├── security.md          # Security model
│   │   └── deployment.md        # Infra & deployment
│   ├── dev/
│   │   ├── setup.md             # Local development setup
│   │   ├── design-tokens.md     # Design tokens reference
│   │   └── components.md        # Component usage guide
│   └── products/
│       └── *.md                 # Per-product domain spec
│
├── scripts/
│   ├── dev.sh                   # Start all dev servers
│   ├── seed.sh                  # Run database seed
│   └── build.sh                 # Build all packages
│
├── apps/
│   ├── website/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │   ├── index.html
│   │   ├── public/
│   │   │   ├── favicon.ico
│   │   │   └── robots.txt
│   │   └── src/
│   │       ├── main.tsx
│   │       ├── App.tsx
│   │       ├── index.css
│   │       ├── vite-env.d.ts
│   │       ├── components/
│   │       │   ├── ai/
│   │       │   ├── cinematic/
│   │       │   ├── hero3d/
│   │       │   ├── layout/        # Navbar, Footer, MainSite
│   │       │   ├── marketplace/
│   │       │   ├── sections/      # Page sections
│   │       │   ├── ui/            # Website-specific UI
│   │       │   └── workspace/     # Workspace components
│   │       ├── data/
│   │       │   ├── products.ts    # 15 product definitions
│   │       │   ├── ai.ts          # 60 AI capabilities
│   │       │   ├── marketplace.ts # 30 marketplace items
│   │       │   └── ...            # Other data files
│   │       ├── hooks/
│   │       ├── lib/
│   │       ├── pages/
│   │       └── types/
│   │
│   ├── admin/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │   ├── index.html
│   │   └── src/
│   │       ├── main.tsx
│   │       ├── App.tsx
│   │       ├── index.css
│   │       ├── components/
│   │       │   ├── Sidebar.tsx
│   │       │   └── ...
│   │       ├── context/
│   │       ├── data/
│   │       ├── lib/
│   │       └── pages/           # 21 admin pages
│   │
│   ├── portal/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │   ├── index.html
│   │   └── src/
│   │       ├── main.tsx
│   │       ├── components/
│   │       ├── context/
│   │       ├── lib/
│   │       └── pages/           # 11 portal pages
│   │
│   ├── workspace/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │   ├── index.html
│   │   └── src/
│   │       ├── main.tsx
│   │       └── ...
│   │
│   └── api/
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           ├── index.ts           # Express entry point
│           ├── app.ts             # Express app setup
│           ├── config/
│           │   ├── database.ts    # PG pool setup
│           │   └── env.ts         # Environment config
│           ├── middleware/
│           │   ├── auth.ts        # JWT verification
│           │   ├── tenant.ts      # Tenant scoping
│           │   ├── permissions.ts # RBAC checks
│           │   └── audit.ts       # Audit logging
│           ├── routes/
│           │   ├── auth.ts
│           │   ├── organizations.ts
│           │   ├── workspaces.ts
│           │   ├── teams.ts
│           │   ├── departments.ts
│           │   ├── products.ts
│           │   ├── roles.ts
│           │   ├── permissions.ts
│           │   ├── feature-flags.ts
│           │   ├── subscriptions.ts
│           │   ├── audit-logs.ts
│           │   ├── notifications.ts
│           │   ├── marketplace.ts
│           │   ├── ai.ts (future)
│           │   ├── files.ts (future)
│           │   └── analytics.ts (future)
│           ├── socket/            # Socket.IO setup
│           ├── db.js              # Legacy CMS DB
│           └── schema.ts          # Full DB schema SQL
│
├── packages/
│   ├── ui/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts          # Barrel exports
│   │       ├── primitives/       # Button, Input, Badge, Card, etc.
│   │       ├── data-display/     # Table, List, Avatar, etc.
│   │       ├── feedback/         # Modal, Toast, Alert, etc.
│   │       ├── navigation/       # Tabs, Breadcrumbs, Sidebar, etc.
│   │       ├── overlays/         # Tooltip, Popover, Dropdown, etc.
│   │       ├── charts/           # Bar, Line, Pie/Donut charts
│   │       ├── layout/           # Stack, Container, Grid, Section
│   │       └── utils/            # cn(), colors, variants
│   │
│   ├── auth/
│   │   ├── package.json
│   │   └── src/index.ts          # AuthPayload, LoginRequest, AuthTokens, etc.
│   │
│   ├── database/
│   │   ├── package.json
│   │   └── src/
│   │       ├── index.ts          # getPool, query, paginate
│   │       └── client.ts         # PG pool singleton
│   │
│   ├── permissions/
│   │   ├── package.json
│   │   └── src/index.ts          # Role, ROLE_HIERARCHY, hasPermission
│   │
│   ├── sdk/
│   │   ├── package.json
│   │   └── src/index.ts          # ApiClient (GET/POST/PUT/DELETE)
│   │
│   ├── notifications/
│   │   ├── package.json
│   │   └── src/index.ts          # Notification, NotificationPayload
│   │
│   ├── analytics/
│   │   ├── package.json
│   │   └── src/index.ts          # AnalyticsEvent, AnalyticsDashboard
│   │
│   └── billing/
│       ├── package.json
│       └── src/index.ts          # SubscriptionPlan, Invoice
│
├── products/
│   ├── shared/
│   │   ├── package.json
│   │   └── src/index.ts          # ProductData, ProductFeature, ProductSlug
│   │
│   ├── erp/                      # (repeat pattern for all 15 products)
│   │   ├── package.json
│   │   └── src/index.ts
│   │
│   ├── crm/
│   ├── hr/
│   ├── payroll/
│   ├── accounting/
│   ├── procurement/
│   ├── inventory/
│   ├── pos/
│   ├── projects/
│   ├── school/
│   ├── hospital/
│   ├── church/
│   ├── hotel/
│   ├── logistics/
│   └── ai/
│
├── .gitignore
├── .prettierrc
├── package.json                  # Root workspace config
├── tsconfig.base.json            # Shared TS config
└── README.md
```

---

## 10. Coding Standards

### 10.1 General Principles

- **Convention over configuration** — follow established patterns, don't invent new ones
- **Explicit is better than implicit** — avoid magic
- **Fail fast** — validate early, crash loudly
- **Composability** — small, single-purpose functions and components
- **Accessibility** — all UI must meet WCAG 2.1 AA minimum
- **Dark mode first** — components default to dark-friendly; light mode is an override

### 10.2 TypeScript

- **Strict mode** enabled in all `tsconfig.json` files
- **No `any`** — prefer `unknown` + type guards, or well-defined interfaces
- **Named exports** only — no default exports (consistency, better tree-shaking)
- **Interface vs Type:** Use `interface` for objects that may be extended, `type` for unions, intersections, and primitives
- **File naming:** kebab-case for utilities (`format-currency.ts`), PascalCase for components (`DataTable.tsx`)
- **Implicit return types:** Required for public API surfaces; inferred OK for internal functions

### 10.3 React / Frontend

- **Functional components only** — no class components
- **Hooks first:** Use React hooks for state, context for shared state, custom hooks for reusable logic
- **Component structure:**

```tsx
// Imports
import { useState } from 'react';
import { cn } from '@tesle/ui';

// Types
interface DataTableProps {
  columns: Column[];
  data: Row[];
  onRowClick?: (row: Row) => void;
}

// Component
export function DataTable({ columns, data, onRowClick }: DataTableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  // ...
}
```

- **Props interface naming:** `{ComponentName}Props`
- **State interface naming:** `{ComponentName}State`
- **Event handlers:** Prefix with `handle` (`handleClick`, `handleSubmit`)
- **File organization:** One component per file, except tightly coupled small components
- **Tailwind CSS:** Use `cn()` utility for conditional classes; prefer Tailwind over custom CSS

### 10.4 Server / Node.js

- **ESM only** (`import`/`export`, no `require`)
- **Route handler pattern:**

```typescript
import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { requirePermission } from '../middleware/permissions';

const router = Router();

router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const items = await db.query('SELECT * FROM items WHERE org_id = $1', [req.orgId]);
    res.json({ data: items });
  } catch (err) {
    next(err);
  }
});

export default router;
```

- **Error handling:** Centralized error middleware; never catch + swallow
- **Async handlers:** Always wrap with try/catch and pass to `next(err)`
- **Validation:** Zod schemas for request validation at the route boundary

### 10.5 Database

- **Parameterized queries** — never interpolate user input into SQL
- **Naming:** `snake_case` for columns, `snake_case` for table names
- **Timestamps:** Use `TIMESTAMPTZ` always; handle timezone conversion application-side
- **Migrations:** Sequential SQL files (`001_initial.sql`, `002_add_marketplace.sql`)
- **Indexes:** Index all foreign keys, frequently filtered columns, and sort columns
- **Soft deletes preferred** over hard deletes (add `deleted_at` TIMESTAMPTZ column)

### 10.6 Git

- **Branch naming:** `feature/description`, `fix/description`, `refactor/description`
- **Commit messages:** Conventional Commits (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`)
- **Squash commits** on merge to main — keep main history clean

### 10.7 Testing

- **Framework:** Vitest (frontend), Jest (backend)
- **Coverage target:** 80%+ for packages, 60%+ for apps
- **What to test:**
  - Utils and helpers (unit tests)
  - Hooks (render hook tests)
  - Components (interaction tests, not snapshot tests)
  - API routes (integration tests with test DB)
  - Critical user flows (E2E with Playwright)

### 10.8 Linting & Formatting

- **ESLint** with `@typescript-eslint` rules
- **Prettier** for formatting (single config, no per-package overrides)
- **Husky** pre-commit hooks: lint → typecheck → test

---

## 11. Security Architecture

### 11.1 Authentication Flow

```
┌─────────┐         ┌─────────┐         ┌─────────┐
│ Client  │         │  API    │         │   DB    │
└────┬────┘         └────┬────┘         └────┬────┘
     │  POST /auth/login │                   │
     │──────────────────>│                   │
     │                   │  SELECT user      │
     │                   │──────────────────>│
     │                   │<──────────────────│
     │                   │                   │
     │                   │ bcrypt.compare    │
     │                   │                   │
     │  { access,       │                   │
     │    refresh }      │                   │
     │<──────────────────│                   │
     │                   │                   │
     │  (store refresh   │                   │
     │   in httpOnly     │                   │
     │   cookie)         │                   │
```

- **Access token:** JWT signed with RS256, 15-minute expiry
- **Refresh token:** Opaque random string, 7-day expiry, single-use rotation
- **Token storage:** Access token in memory (JS variable); refresh token in httpOnly secure cookie
- **Password hashing:** bcrypt with cost factor 12

### 11.2 JWT Token Structure

```json
{
  "sub": "user_123",
  "orgId": 1,
  "role": "admin",
  "iat": 1680000000,
  "exp": 1680000900,
  "jti": "unique-token-id"
}
```

### 11.3 Authorization Middleware Stack

```
Request
  │
  ├── authMiddleware
  │     ├── Extract Bearer token from Authorization header
  │     ├── Verify JWT signature (RS256)
  │     ├── Check token expiry
  │     └── Attach req.user { id, email, name, role, orgId }
  │
  ├── optionalAuth (same but skip if no token)
  │
  ├── requireOrg
  │     ├── Read from X-Org-Id header
  │     └── Attach req.orgId
  │
  ├── verifyOrgMembership
  │     ├── Check org_members for (user, org)
  │     ├── Verify status = 'active'
  │     └── Attach req.orgRole
  │
  ├── requireHierarchy(minRole)
  │     └── Check user.role >= minRole (numeric hierarchy)
  │
  ├── requirePermission(resource, action)
  │     └── Check role_permissions DB join
  │
  └── auditLog(action, resource)
        └── Intercept res.json and write audit_log entry
```

### 11.4 API Security

- **Rate limiting:** 100 req/min per user (standard), 20 req/min for auth endpoints
- **CORS:** Whitelist of allowed origins per environment
- **Helmet:** Standard security headers (X-Frame-Options, CSP, HSTS, etc.)
- **Request validation:** Zod schemas on all mutation endpoints
- **Idempotency:** `X-Idempotency-Key` header for payment and subscription mutations

### 11.5 Data Security

- **At rest:** Database encryption (TDE) at the storage layer
- **In transit:** TLS 1.3 for all API traffic
- **PII:** Email, phone, and tax IDs encrypted with application-level AES-256-GCM
- **Backups:** Encrypted daily backups with 30-day retention; cross-region for disaster recovery
- **Audit trail:** All CUD operations logged in `audit_logs` with user, action, timestamp, IP

### 11.6 Marketplace Security

- **Item isolation:** Marketplace items run in sandboxed environments (VM isolation for future)
- **Permissions:** Items declare required permissions on install; user must approve
- **Review process:** All third-party items reviewed before publishing
- **Update policy:** Automatic security patches; major versions require re-approval

### 11.7 Vulnerability Management

- **Dependencies:** Weekly `npm audit` scan; monthly full dependency review
- **SAST:** Semgrep or CodeQL in CI pipeline
- **DAST:** Quarterly penetration testing
- **Bug bounty:** Private bug bounty program (HackerOne)
- **Incident response:** Documented in `docs/architecture/security.md`

---

## 12. Deployment Architecture

### 12.1 Environment Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      PRODUCTION                              │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ Website  │  │ Admin    │  │ Portal   │  │ Workspace│    │
│  │ (Vercel) │  │ (Vercel) │  │ (Vercel) │  │ (Vercel) │    │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘    │
│       │              │              │              │         │
│       └──────────────┴──────────────┴──────────────┘         │
│                              │                               │
│                              ▼                               │
│                    ┌─────────────────┐                       │
│                    │   Cloudflare    │                       │
│                    │   (CDN + DNS)   │                       │
│                    └────────┬────────┘                       │
│                             │                                │
│                             ▼                                │
│                    ┌─────────────────┐                       │
│                    │  API Server(s)   │                       │
│                    │  (Docker/EKS)   │                       │
│                    └────────┬────────┘                       │
│                             │                                │
│                    ┌────────┴────────┐                       │
│                    │                 │                        │
│                    ▼                 ▼                        │
│           ┌──────────────┐  ┌──────────────┐                │
│           │  PostgreSQL  │  │    Redis     │                │
│           │  (RDS/Aurora)│  │  (ElastiCache)│               │
│           └──────────────┘  └──────────────┘                │
│                                                              │
│           ┌──────────────┐  ┌──────────────┐                │
│           │   S3 / R2    │  │   Open AI    │                │
│           │  (File Store)│  │  (AI API)    │                │
│           └──────────────┘  └──────────────┘                │
└─────────────────────────────────────────────────────────────┘
```

### 12.2 Infrastructure Stack

| Tier | Technology | Provider |
|------|-----------|----------|
| Frontend | Vite + React + Tailwind | Vercel (static export) |
| API Server | Express 5 + TypeScript | Docker on AWS EKS |
| Database | PostgreSQL 16 | AWS RDS Aurora / Supabase |
| Cache | Redis 7 | AWS ElastiCache / Upstash |
| File Storage | S3-compatible | Cloudflare R2 / AWS S3 |
| CDN | Cloudflare | Cloudflare |
| AI | OpenAI / Anthropic API | External |
| Email | SendGrid / AWS SES | External |
| SMS | Africa's Talking / Twilio | External |
| Monitoring | Sentry + Grafana + Prometheus | Self-hosted / SaaS |

### 12.3 Docker Setup

```dockerfile
# Multi-stage build
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-slim AS runner
WORKDIR /app
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
EXPOSE 3001
CMD ["node", "dist/index.js"]
```

### 12.4 CI/CD Pipeline

```
Git Push (main)
  │
  ├── 1. Lint (ESLint + Prettier)
  ├── 2. TypeScript check (tsc --noEmit)
  ├── 3. Unit Tests (vitest / jest)
  ├── 4. Build packages (npm run build)
  ├── 5. Build apps (vite build / tsc for server)
  ├── 6. Docker build & push (API only)
  ├── 7. E2E tests (Playwright)
  └── 8. Deploy
        ├── Frontends → Vercel
        └── API → EKS rolling update
```

### 12.5 Scaling Strategy

| Stage | Users | DB | API Servers | Cache |
|-------|-------|----|-------------|-------|
| Launch | < 1,000 | Single instance | 1–2 | Optional |
| Growth | 1,000–10,000 | Read replica + primary | 2–5 | Redis primary |
| Scale | 10,000–100,000 | Connection pooling, sharding | 5–20 | Cluster |
| Enterprise | 100,000+ | Dedicated per-tier tenants | 20+ auto-scale | Cluster + local |

### 12.6 Disaster Recovery

- **RPO (Recovery Point Objective):** 5 minutes (streaming WAL to standby)
- **RTO (Recovery Time Objective):** 15 minutes (auto-failover)
- **Backup:** Full daily backup, WAL archiving continuous
- **DR region:** Secondary AWS region with passive standby

---

## 13. 3–5 Year Product Roadmap

### Phase 1: Foundation (Year 1 — Current)

**Core Platform:**
- [x] 15 product landing pages
- [x] Platform ecosystem page
- [x] Enterprise page
- [x] Developer portal
- [x] Workspace (full-screen, sidebar, app grid, KPI dashboard)
- [x] Admin panel (21 pages, CRUD framework)
- [x] Backend API (29 route files, multi-tenant middleware)
- [x] Design system (30+ components, dark mode)
- [x] AI platform (60 capabilities, mock mode)
- [x] Marketplace (30 items, installs, reviews)
- [x] Monorepo structure

**Key deliverables:**
- Full migration from root to monorepo apps
- Authentication v2 (JWT + refresh rotation)
- Multi-tenant row-level security
- Database seed with demo data

### Phase 2: Core Product Depth (Year 1–2)

**ERP:**
- Multi-entity consolidation
- Financial period close
- Inter-company transactions
- Approval workflows

**CRM:**
- Email integration (IMAP/SMTP)
- Lead scoring engine
- Pipeline analytics
- Customer portal enhancements

**HR + Payroll:**
- Employee self-service portal
- Leave management
- Performance reviews (OKR framework)
- Payroll engine: Nigeria (FIRS, ITF, NSITF, NHF)
- Payroll engine: Ghana (SSNIT), Kenya (NSSF, NHIF)

**Accounting:**
- Chart of accounts templates
- Bank reconciliation (CSV import)
- Fixed asset management
- Multi-currency support
- Fiscal year management

**Infrastructure:**
- Real AI integration (OpenAI API, not mock)
- File upload service (S3)
- Email notification delivery
- Background job queue (Bull/BullMQ)

### Phase 3: Operations Depth (Year 2)

**Inventory:**
- Multi-warehouse support
- Barcode / QR code generation
- Stock transfer workflows
- Low-stock alerts

**POS:**
- Offline mode (IndexedDB)
- Receipt printing (ESC/POS)
- Payment gateway integration (Paystack, Flutterwave)
- Customer display

**Procurement:**
- Purchase order approval workflow
- Vendor portal
- RFQ / RFP management
- Contract management

**Logistics:**
- Fleet management (vehicle tracking)
- Route optimization
- Delivery proof (photo)
- Real-time tracking (websocket)

**Platform:**
- SSO / SAML
- Audit log export (CSV, PDF)
- API rate limiting
- Webhook system

### Phase 4: Vertical Solutions (Year 2–3)

**School:**
- Student admission workflow
- Class scheduling (timetable)
- Gradebook
- Fee management (payment plans)
- Parent portal
- LMS integration (basic)

**Hospital:**
- Patient registration (NHIS)
- Appointment scheduling
- EHR (SOAP notes)
- Pharmacy management
- Lab test tracking
- NHIS billing

**Hotel:**
- Reservation system (direct + OTA channel manager)
- Check-in / check-out
- Housekeeping task management
- Guest profiles
- Payment processing

**Church:**
- Member directory
- Donation tracking (offline + online)
- Event management
- Small group management
- Communication tools

**Platform:**
- Marketplace payment processing
- Developer SDK
- OAuth2 API for third-party apps

### Phase 5: Scale & Ecosystem (Year 3–4)

**Intelligence:**
- Predictive analytics across all products
- Anomaly detection (fraud, churn, stock-outs)
- Natural language reporting
- Automated workflow suggestions

**Marketplace:**
- Developer revenue sharing
- App review automation
- Usage analytics for developers
- Enterprise app store (private listings)

**Platform:**
- Multi-region deployment
- Performance optimization (caching, CDN)
- SOC 2 compliance
- GDPR compliance
- Custom domain support (per-org)

**Payments:**
- Unified payment processing across all products
- Recurring billing engine
- Payment reconciliation
- Multi-gateway support

### Phase 6: Enterprise + Ecosystem (Year 4–5)

**Enterprise:**
- On-premise deployment option
- Dedicated infrastructure
- SLA guarantees (99.95%+)
- Advanced audit & compliance
- Data residency controls

**Integration:**
- Pre-built connectors (Salesforce, QuickBooks, Xero, SAP)
- Zapier-style integration builder
- Public REST API v2
- GraphQL API

**AI/ML:**
- Self-hosted LLM options
- Custom model training
- Document AI (OCR, classification)
- Voice interface

**Platform:**
- Mobile apps (React Native)
- Offline-first mobile
- Public SDK for mobile
- Multi-language support (Swahili, Hausa, Yoruba, Igbo, French)

---

## Appendix

### A. Glossary

| Term | Definition |
|------|------------|
| **Tenant** | An organization using the Tesle platform |
| **Org** | Short for organization — the tenant entity |
| **Workspace** | Per-org dashboard environment for managing products |
| **Product** | One of 15 Tesle business applications (ERP, CRM, etc.) |
| **Bounded Context** | A domain boundary with its own data model and logic |
| **RBAC** | Role-Based Access Control |
| **JWT** | JSON Web Token |
| **EHR** | Electronic Health Record |
| **OTA** | Online Travel Agency (e.g., Booking.com, Expedia) |

### B. Design Tokens Reference

```typescript
// Key design tokens for @tesle/ui
const tokens = {
  // Primary brand color
  primary: '#D4A853',  // Amber/gold — warmth, trust, Africa
  primaryDark: '#B8913E',

  // Semantic colors
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Typography
  fontFamily: "'Inter', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },

  // Spacing (4px base)
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
  },

  // Border radius
  radius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },

  // Shadows
  shadow: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px rgba(0,0,0,0.07)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
    xl: '0 20px 25px rgba(0,0,0,0.15)',
  },
};
```

### C. Technology Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-01 | TypeScript over JavaScript | Type safety at scale; monorepo needs it |
| 2026-01 | Express 5 over Fastify / NestJS | Team familiarity, ecosystem maturity |
| 2026-01 | PostgreSQL over MySQL | JSONB, CTEs, better analytics, African startup ecosystem standard |
| 2026-02 | npm workspaces over pnpm/turborepo | No pnpm available in CI; monorepo simplicity |
| 2026-02 | Vite over Next.js (for workspace) | Full-screen app doesn't need SSR; simpler deployment |
| 2026-02 | Tailwind v4 over styled-components | Build-time CSS, better performance, team velocity |
| 2026-02 | framer-motion over CSS animations | Complex orchestrated animations easier; spring physics |
| 2026-03 | Row-level isolation (shared schema) over DB-per-tenant | Operational simplicity; can migrate later |
| 2026-03 | JWT + refresh rotation over sessions | Stateless API servers, mobile-friendly |
| 2026-03 | Socket.IO over SSE (for portal) | Bidirectional, room support, reconnection built-in |
| 2026-04 | uuid VARCHAR PKs for marketplace | Items referenced across orgs; need stable IDs |
| 2026-04 | Mock AI first, real LLM later | Ship AI UX without API key dependency |
| 2026-06 | Monorepo with 5 apps + 8 packages + 15 products | Separation of concerns, independent deployability |

---

*This blueprint is the single source of truth for the Tesle Platform architecture. All implementation decisions must be consistent with this document. Deviations should be discussed and reflected in an updated version.*
