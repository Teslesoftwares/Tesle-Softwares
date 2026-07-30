# Tesle Platform — Production Deployment Guide

## Overview

This guide covers deploying the Tesle Platform to production:
- **Frontend**: Vercel (recommended) or Docker/Nginx
- **Backend**: Railway, Render, AWS (ECS/Fargate), or Docker
- **Database**: Managed PostgreSQL (Neon, Supabase, AWS RDS, Railway)
- **Cache**: Managed Redis (Upstash, Railway, AWS ElastiCache)

---

## Prerequisites

- Docker & Docker Compose
- PostgreSQL 16+ (local or managed)
- Python 3.12+
- Node.js 22+
- Domain names for frontend apps

---

## 1. Environment Variables

Copy `.env.example` to `.env` and fill in production values:

```bash
cp .env.example .env
```

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `JWT_SECRET` | Random 64+ char string | `openssl rand -hex 32` |
| `JWT_REFRESH_SECRET` | Different random string | `openssl rand -hex 32` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql+asyncpg://user:pass@host:5432/tesle_admin` |
| `CORS_ORIGIN` | Comma-separated allowed origins | `https://tesle.com,https://admin.tesle.com` |
| `OPENAI_API_KEY` | OpenAI API key | `sk-...` |

### Generate Secrets

```bash
# Generate JWT secrets
openssl rand -hex 32
openssl rand -hex 32
```

---

## 2. Docker Deployment (All-in-One)

### Start All Services

```bash
# Set secrets in .env first, then:
docker compose up -d

# Check status
docker compose ps
docker compose logs -f backend
```

### Services

| Service | Port | Description |
|---------|------|-------------|
| `postgres` | 5432 | PostgreSQL 16 |
| `redis` | 6379 | Redis 7 |
| `backend` | 3000 | FastAPI backend |
| `frontend` | 80/443 | Nginx + static apps |

### Run Migrations

```bash
docker compose exec backend alembic upgrade head
```

### View Logs

```bash
docker compose logs -f backend
docker compose logs -f frontend
```

---

## 3. Frontend Deployment (Vercel)

### Deploy Website

```bash
cd apps/website

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set environment variables
vercel env add VITE_API_URL production
# Enter: https://api.tesle.com
```

### Deploy Admin

```bash
cd apps/admin
vercel --prod

vercel env add VITE_API_URL production
# Enter: https://api.tesle.com
```

### Deploy Portal

```bash
cd apps/portal
vercel --prod

vercel env add VITE_API_URL production
# Enter: https://api.tesle.com
```

### Vercel Configuration

Create `apps/website/vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": null,
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ],
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 4. Backend Deployment

### Option A: Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Init project
railway init tesle-backend

# Set environment variables
railway variables set NODE_ENV=production
railway variables set DATABASE_URL="postgresql+asyncpg://..."
railway variables set JWT_SECRET="$(openssl rand -hex 32)"
railway variables set JWT_REFRESH_SECRET="$(openssl rand -hex 32)"
railway variables set CORS_ORIGIN="https://tesle.com,https://admin.tesle.com"
railway variables set OPENAI_API_KEY="sk-..."

# Deploy
railway up

# Add PostgreSQL plugin
railway add postgresql

# Run migrations
railway run alembic upgrade head
```

### Option B: Render

```yaml
# render.yaml
services:
  - type: web
    name: tesle-backend
    runtime: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn app.main:app --host 0.0.0.0 --port $PORT --workers 4
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        sync: false
      - key: JWT_SECRET
        generateValue: true
      - key: JWT_REFRESH_SECRET
        generateValue: true
      - key: CORS_ORIGIN
        value: https://tesle.com
      - key: OPENAI_API_KEY
        sync: false
```

```bash
# Deploy
render deploy
```

### Option C: AWS ECS/Fargate

```bash
# Build and push to ECR
aws ecr create-repository --repository-name tesle-backend
docker build -t tesle-backend ./backend
docker tag tesle-backend:latest <account>.dkr.ecr.<region>.amazonaws.com/tesle-backend:latest
docker push <account>.dkr.ecr.<region>.amazonaws.com/tesle-backend:latest

# Create ECS task definition
aws ecs register-task-definition --cli-input-json file://ecs-task.json

# Create ECS service
aws ecs create-service --cluster tesle --service-name tesle-backend --task-definition tesle-backend:1 --desired-count 2
```

---

## 5. Database Setup

### Managed PostgreSQL

**Neon (Recommended for startup)**:
```bash
# Create account at neon.tech
# Create project, copy connection string
DATABASE_URL=postgresql+asyncpg://user:pass@ep-xxx.us-east-2.aws.neon.cloud/tesle_admin
```

**Supabase**:
```bash
# Create project at supabase.com
# Settings → Database → Connection string
DATABASE_URL=postgresql+asyncpg://postgres:password@db.xxx.supabase.co:5432/postgres
```

**AWS RDS**:
```bash
aws rds create-db-instance \
  --db-instance-identifier tesle-db \
  --db-instance-class db.t3.medium \
  --engine postgres \
  --engine-version 16 \
  --master-username postgres \
  --master-user-password "$(openssl rand -hex 16)" \
  --allocated-storage 20 \
  --storage-type gp3
```

### Run Migrations

```bash
# Local
cd backend
alembic upgrade head

# Remote (via Railway)
railway run alembic upgrade head

# Remote (via Render)
render exec alembic upgrade head
```

### Create Initial Admin User

```bash
cd backend
python -c "
import asyncio
from app.database.connection import AsyncSessionLocal
from app.services.auth import hash_password

async def create_admin():
    async with AsyncSessionLocal() as db:
        from app.database.models.users import User
        user = User(
            email='admin@tesle.com',
            password_hash=hash_password('admin123'),
            name='Admin',
            role='admin'
        )
        db.add(user)
        await db.commit()
        print('Admin user created')

asyncio.run(create_admin())
"
```

---

## 6. Redis Setup

### Managed Redis

**Upstash (Recommended)**:
```bash
# Create account at upstash.com
# Create Redis database
REDIS_URL=rediss://default:password@xxx.upstash.io:6379
```

**Railway**:
```bash
railway add redis
# REDIS_URL is auto-set
```

**AWS ElastiCache**:
```bash
aws elasticache create-cache-cluster \
  --cache-cluster-id tesle-redis \
  --cache-node-type cache.t3.micro \
  --engine redis \
  --engine-version 7.0
```

---

## 7. SSL/TLS

### With Nginx (Docker)

```bash
# Generate self-signed cert (dev only)
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx-selfsigned.key \
  -out nginx-selfsigned.crt

# For production, use Let's Encrypt
apt install certbot
certbot certonly --standalone -d tesle.com
```

### With Vercel

SSL is automatic on Vercel.

### With Railway/Render

SSL is automatic.

---

## 8. Monitoring

### Health Check Endpoint

```bash
curl https://api.tesle.com/api/health
```

Response:
```json
{
  "status": "ok",
  "checks": {
    "database": "ok",
    "redis": "ok",
    "timestamp": "2026-07-27T15:00:00+00:00"
  }
}
```

### Logging

Logs are structured JSON in production:

```bash
# View logs (Docker)
docker compose logs -f backend

# View logs (Railway)
railway logs

# View logs (Render)
render logs tesle-backend
```

---

## 9. Performance

### Production Settings

- **Workers**: 4 uvicorn workers (adjust based on CPU)
- **Connection pool**: 20 connections, 10 overflow
- **Keep-alive**: 65s (Nginx)
- **Gzip**: Enabled for text-based responses
- **Caching**: Static assets cached for 1 year

### Scaling

```bash
# Docker Compose (scale backend)
docker compose up -d --scale backend=3

# Railway (auto-scaling)
railway variables set RAILWAY_AUTOSCALER_ENABLED=true

# AWS ECS (auto-scaling)
aws autoscaling put-scaling-policy \
  --auto-scaling-group-name tesle-backend \
  --policy-name cpu-scaling \
  --scaling-adjustment 1
```

---

## 10. Backups

### Database Backups

```bash
# Manual backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Automated (Neon)
# Enable point-in-time recovery in dashboard

# Automated (AWS RDS)
aws rds create-db-snapshot \
  --db-instance-identifier tesle-db \
  --db-snapshot-identifier tesle-backup-$(date +%Y%m%d)
```

### Document Storage Backups

```bash
# S3 sync
aws s3 sync ./storage/documents s3://tesle-documents-backup/
```

---

## Troubleshooting

### Database Connection Issues

```bash
# Test connection
psql $DATABASE_URL

# Check pool status
curl https://api.tesle.com/api/health | jq .checks.database
```

### Memory Issues

```bash
# Reduce workers
uvicorn app.main:app --workers 2

# Reduce pool size
DB_POOL_SIZE=10
```

### Slow Queries

```bash
# Enable query logging
DB_ECHO=true

# Check slow queries
docker compose exec postgres psql -U postgres -c "SELECT * FROM pg_stat_activity WHERE state = 'active';"
```

---

## Checklist

- [ ] Generate JWT secrets (`openssl rand -hex 32`)
- [ ] Set up managed PostgreSQL
- [ ] Set up Redis (optional)
- [ ] Configure CORS_ORIGIN with actual domains
- [ ] Set OPENAI_API_KEY
- [ ] Run database migrations
- [ ] Create initial admin user
- [ ] Deploy backend
- [ ] Deploy frontend apps
- [ ] Configure SSL/TLS
- [ ] Test health endpoint
- [ ] Set up monitoring
- [ ] Configure backups
