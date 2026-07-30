"""Permission routes."""

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.database.models.organizations import OrgPermission
from app.middleware.auth import get_current_user

router = APIRouter(prefix="/api/v1/permissions", tags=["permissions"])


DEFAULT_PERMISSIONS = [
    {"resource": "organization", "actions": ["create", "read", "update", "delete", "manage"]},
    {"resource": "workspace", "actions": ["create", "read", "update", "delete"]},
    {"resource": "team", "actions": ["create", "read", "update", "delete"]},
    {"resource": "department", "actions": ["create", "read", "update", "delete"]},
    {"resource": "product", "actions": ["create", "read", "update", "delete"]},
    {"resource": "subscription", "actions": ["create", "read", "update", "delete"]},
    {"resource": "member", "actions": ["create", "read", "update", "delete"]},
    {"resource": "role", "actions": ["create", "read", "update", "delete"]},
    {"resource": "feature_flag", "actions": ["create", "read", "update", "delete"]},
    {"resource": "audit_log", "actions": ["read"]},
    {"resource": "billing", "actions": ["create", "read", "update"]},
    {"resource": "notification", "actions": ["read", "update"]},
    {"resource": "api_key", "actions": ["create", "read", "update", "delete"]},
    {"resource": "ai_config", "actions": ["create", "read", "update", "delete"]},
]


@router.get("")
async def list_permissions(db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    result = await db.execute(select(OrgPermission).order_by(OrgPermission.resource, OrgPermission.action))
    return {"success": True, "data": [dict(r._mapping) for r in result.all()]}


@router.get("/seed")
async def seed_permissions(db: AsyncSession = Depends(get_db), _=Depends(get_current_user)):
    count = 0
    for perm in DEFAULT_PERMISSIONS:
        for action in perm["actions"]:
            name = f"{perm['resource']}:{action}"
            existing = await db.execute(
                select(OrgPermission).where(OrgPermission.resource == perm["resource"], OrgPermission.action == action)
            )
            if not existing.scalar_one_or_none():
                p = OrgPermission(name=name, resource=perm["resource"], action=action,
                                  description=f"Can {action} {perm['resource'].replace('_', ' ')}")
                db.add(p)
                count += 1
    await db.flush()
    return {"success": True, "data": {"message": f"Seeded {count} permissions"}}
