"""Role routes."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, delete, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.database.models.organizations import OrgTeamRole, RolePermission, OrgPermission, UserOrgRole
from app.middleware.auth import get_current_user
from app.middleware.tenant import get_org_id
from app.schemas.organizations import RoleCreate, RoleUpdate, RolePermissionsUpdate

router = APIRouter(prefix="/api/v1/roles", tags=["roles"])


@router.get("")
async def list_roles(
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    result = await db.execute(
        select(OrgTeamRole).where(OrgTeamRole.org_id == org_id).order_by(OrgTeamRole.hierarchy_level.desc())
    )
    roles = [dict(r._mapping) for r in result.all()]

    for role in roles:
        uc = await db.execute(select(func.count(UserOrgRole.id)).where(UserOrgRole.role_id == role["id"]))
        role["user_count"] = uc.scalar() or 0

        pr = await db.execute(
            select(OrgPermission.id, OrgPermission.name, OrgPermission.resource, OrgPermission.action)
            .join(RolePermission, RolePermission.permission_id == OrgPermission.id)
            .where(RolePermission.role_id == role["id"])
        )
        role["permissions"] = [dict(x._mapping) for x in pr.all()]

    return {"success": True, "data": roles}


@router.post("", status_code=201)
async def create_role(
    data: RoleCreate,
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    role = OrgTeamRole(org_id=org_id, name=data.name, hierarchy_level=data.hierarchy_level, description=data.description)
    db.add(role)
    await db.flush()
    await db.refresh(role)
    return {"success": True, "data": dict(role._mapping)}


@router.put("/{id}")
async def update_role(
    id: int, data: RoleUpdate,
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    result = await db.execute(select(OrgTeamRole).where(OrgTeamRole.id == id, OrgTeamRole.org_id == org_id))
    role = result.scalar_one_or_none()
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    for k, v in data.model_dump(exclude_unset=True).items():
        setattr(role, k, v)
    await db.flush()
    await db.refresh(role)
    return {"success": True, "data": dict(role._mapping)}


@router.delete("/{id}")
async def delete_role(
    id: int,
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    result = await db.execute(select(OrgTeamRole).where(OrgTeamRole.id == id, OrgTeamRole.org_id == org_id))
    role = result.scalar_one_or_none()
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    if role.is_system:
        raise HTTPException(status_code=403, detail="Cannot delete system role")
    await db.execute(delete(OrgTeamRole).where(OrgTeamRole.id == id, OrgTeamRole.org_id == org_id))
    return {"success": True, "data": {"message": "Role deleted"}}


@router.put("/{id}/permissions")
async def update_permissions(
    id: int, data: RolePermissionsUpdate,
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    await db.execute(delete(RolePermission).where(RolePermission.role_id == id))
    for pid in data.permission_ids:
        rp = RolePermission(role_id=id, permission_id=pid)
        db.add(rp)
    await db.flush()
    return {"success": True, "data": {"message": "Permissions updated"}}
