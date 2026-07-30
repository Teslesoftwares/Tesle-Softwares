"""System routes — feature flags, audit logs, org notifications."""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select, func, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.database.models.system import FeatureFlag, AuditLog, OrgNotification
from app.middleware.auth import get_current_user, AuthPayload
from app.middleware.tenant import get_org_id
from app.schemas.system import FeatureFlagCreate, FeatureFlagUpdate, MarkReadRequest

router = APIRouter(prefix="/api/v1", tags=["system"])


# ─── Feature Flags ───────────────────────────────────────────────────────────


@router.get("/feature-flags")
async def list_feature_flags(
    environment: str | None = Query(None),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    stmt = select(FeatureFlag)
    if environment:
        stmt = stmt.where(FeatureFlag.environment == environment)
    stmt = stmt.order_by(FeatureFlag.name)
    result = await db.execute(stmt)
    return {"success": True, "data": [dict(r._mapping) for r in result.all()]}


@router.post("/feature-flags", status_code=201)
async def create_feature_flag(data: FeatureFlagCreate, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    flag = FeatureFlag(**data.model_dump())
    db.add(flag)
    await db.flush()
    await db.refresh(flag)
    return {"success": True, "data": dict(flag._mapping)}


@router.put("/feature-flags/{id}")
async def update_feature_flag(id: int, data: FeatureFlagUpdate, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(select(FeatureFlag).where(FeatureFlag.id == id))
    flag = result.scalar_one_or_none()
    if not flag:
        raise HTTPException(status_code=404, detail="Feature flag not found")
    for k, v in data.model_dump(exclude_unset=True).items():
        setattr(flag, k, v)
    await db.flush()
    await db.refresh(flag)
    return {"success": True, "data": dict(flag._mapping)}


@router.delete("/feature-flags/{id}")
async def delete_feature_flag(id: int, db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    await db.execute(delete(FeatureFlag).where(FeatureFlag.id == id))
    return {"success": True, "data": {"message": "Feature flag deleted"}}


# ─── Audit Logs ──────────────────────────────────────────────────────────────


@router.get("/audit-logs")
async def list_audit_logs(
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
    page: int = Query(1, ge=1),
    limit: int = Query(50, ge=1, le=100),
    action: str | None = Query(None),
    resource: str | None = Query(None),
):
    offset = (page - 1) * limit
    stmt = select(AuditLog).where(AuditLog.org_id == org_id)
    count_stmt = select(func.count(AuditLog.id)).where(AuditLog.org_id == org_id)

    if action:
        stmt = stmt.where(AuditLog.action == action)
        count_stmt = count_stmt.where(AuditLog.action == action)
    if resource:
        stmt = stmt.where(AuditLog.resource == resource)
        count_stmt = count_stmt.where(AuditLog.resource == resource)

    total = (await db.execute(count_stmt)).scalar() or 0
    stmt = stmt.order_by(AuditLog.created_at.desc()).offset(offset).limit(limit)
    result = await db.execute(stmt)

    return {
        "success": True,
        "data": [dict(r._mapping) for r in result.all()],
        "meta": {"page": page, "limit": limit, "total": total, "total_pages": -(-total // limit)},
    }


@router.get("/audit-logs/actions")
async def list_audit_actions(db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(select(AuditLog.action).distinct().order_by(AuditLog.action))
    return {"success": True, "data": [r.action for r in result.all()]}


@router.get("/audit-logs/resources")
async def list_audit_resources(db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(select(AuditLog.resource).distinct().order_by(AuditLog.resource))
    return {"success": True, "data": [r.resource for r in result.all()]}


# ─── Org Notifications ──────────────────────────────────────────────────────


@router.get("/notifications")
async def list_notifications(
    user: AuthPayload = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
    org_id: int | None = Query(None),
):
    stmt = select(OrgNotification).where(OrgNotification.user_id == user.id)
    if org_id:
        stmt = stmt.where(OrgNotification.org_id == org_id)
    stmt = stmt.order_by(OrgNotification.created_at.desc()).limit(50)
    result = await db.execute(stmt)
    return {"success": True, "data": [dict(r._mapping) for r in result.all()]}


@router.get("/notifications/unread-count")
async def unread_count(user: AuthPayload = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(func.count(OrgNotification.id)).where(
            OrgNotification.user_id == user.id, OrgNotification.read == False
        )
    )
    return {"success": True, "data": {"count": result.scalar() or 0}}


@router.put("/notifications/{id}/read")
async def mark_read(id: int, user: AuthPayload = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(OrgNotification).where(OrgNotification.id == id, OrgNotification.user_id == user.id))
    notif = result.scalar_one_or_none()
    if notif:
        notif.read = True
        await db.flush()
    return {"success": True, "data": {"message": "Marked as read"}}


@router.put("/notifications/read-all")
async def mark_all_read(
    user: AuthPayload = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
    data: MarkReadRequest | None = None,
):
    org_id = data.org_id if data else None
    stmt = select(OrgNotification).where(OrgNotification.user_id == user.id, OrgNotification.read == False)
    if org_id:
        stmt = stmt.where(OrgNotification.org_id == org_id)
    result = await db.execute(stmt)
    for notif in result.scalars().all():
        notif.read = True
    await db.flush()
    return {"success": True, "data": {"message": "All marked as read"}}


@router.delete("/notifications/{id}")
async def delete_notification(id: int, user: AuthPayload = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    await db.execute(delete(OrgNotification).where(OrgNotification.id == id, OrgNotification.user_id == user.id))
    return {"success": True, "data": {"message": "Notification deleted"}}
