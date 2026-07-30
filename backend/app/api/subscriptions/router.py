"""Subscription routes."""

from datetime import date
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.database.models.billing import SubscriptionPlan, Subscription
from app.database.models.organizations import Organization
from app.middleware.auth import get_current_user
from app.middleware.tenant import get_org_id
from app.schemas.organizations import PlanCreate, PlanUpdate, SubscriptionCreate, SubscriptionUpdate

router = APIRouter(prefix="/api/v1/subscriptions", tags=["subscriptions"])


@router.get("/plans")
async def list_plans(db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(select(SubscriptionPlan).where(SubscriptionPlan.is_active == True).order_by(SubscriptionPlan.price))
    return {"success": True, "data": [dict(r._mapping) for r in result.all()]}


@router.post("/plans", status_code=201)
async def create_plan(data: PlanCreate, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    slug = data.slug or data.name.lower().replace(" ", "-")
    plan = SubscriptionPlan(name=data.name, slug=slug, price=data.price, interval=data.interval,
                            tier=data.tier, popular=data.popular, features=data.features, limits=data.limits)
    db.add(plan)
    await db.flush()
    await db.refresh(plan)
    return {"success": True, "data": dict(plan._mapping)}


@router.put("/plans/{id}")
async def update_plan(id: int, data: PlanUpdate, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(select(SubscriptionPlan).where(SubscriptionPlan.id == id))
    plan = result.scalar_one_or_none()
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")
    for k, v in data.model_dump(exclude_unset=True).items():
        setattr(plan, k, v)
    await db.flush()
    await db.refresh(plan)
    return {"success": True, "data": dict(plan._mapping)}


@router.get("")
async def list_subscriptions(
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    result = await db.execute(
        select(Subscription, SubscriptionPlan.name.label("plan_name"), SubscriptionPlan.tier,
               SubscriptionPlan.price, SubscriptionPlan.interval, SubscriptionPlan.features)
        .join(SubscriptionPlan, SubscriptionPlan.id == Subscription.plan_id)
        .where(Subscription.org_id == org_id)
        .order_by(Subscription.created_at.desc())
    )
    data = []
    for row in result.all():
        d = dict(row[0]._mapping)
        d["plan_name"] = row.plan_name
        d["tier"] = row.tier
        d["price"] = float(row.price) if row.price else None
        d["interval"] = row.interval
        d["features"] = row.features
        data.append(d)
    return {"success": True, "data": data}


@router.get("/current")
async def get_current_subscription(
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    result = await db.execute(
        select(Subscription, SubscriptionPlan.name.label("plan_name"), SubscriptionPlan.tier,
               SubscriptionPlan.price, SubscriptionPlan.interval, SubscriptionPlan.features, SubscriptionPlan.limits)
        .join(SubscriptionPlan, SubscriptionPlan.id == Subscription.plan_id)
        .where(Subscription.org_id == org_id, Subscription.status.in_(["active", "trialing"]))
        .order_by(Subscription.created_at.desc())
        .limit(1)
    )
    row = result.first()
    if not row:
        return {"success": True, "data": None}
    d = dict(row[0]._mapping)
    d["plan_name"] = row.plan_name
    return {"success": True, "data": d}


@router.post("", status_code=201)
async def create_subscription(
    data: SubscriptionCreate,
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    start = data.start_date or date.today().isoformat()
    status = "trialing" if data.trial_end else "active"
    sub = Subscription(org_id=org_id, plan_id=data.plan_id, start_date=start, trial_end=data.trial_end, status=status)
    db.add(sub)
    await db.flush()
    await db.refresh(sub)

    plan_result = await db.execute(select(SubscriptionPlan).where(SubscriptionPlan.id == data.plan_id))
    plan = plan_result.scalar_one_or_none()
    if plan:
        await db.execute(
            select(Organization).where(Organization.id == org_id)
        )
        org_result = await db.execute(select(Organization).where(Organization.id == org_id))
        org = org_result.scalar_one_or_none()
        if org:
            org.plan = plan.tier
            await db.flush()

    return {"success": True, "data": dict(sub._mapping)}


@router.put("/{id}")
async def update_subscription(
    id: int, data: SubscriptionUpdate,
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    result = await db.execute(select(Subscription).where(Subscription.id == id, Subscription.org_id == org_id))
    sub = result.scalar_one_or_none()
    if not sub:
        raise HTTPException(status_code=404, detail="Subscription not found")
    for k, v in data.model_dump(exclude_unset=True).items():
        setattr(sub, k, v)
    await db.flush()
    await db.refresh(sub)
    return {"success": True, "data": dict(sub._mapping)}
