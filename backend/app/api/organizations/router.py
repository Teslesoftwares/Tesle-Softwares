"""Organization routes — CRUD, members."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, func, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.database.models.organizations import (
    Organization, OrganizationMember, OrgTeamRole,
)
from app.database.models.users import OrgUser
from app.middleware.auth import get_current_user, AuthPayload
from app.middleware.tenant import verify_org_membership
from app.schemas.organizations import OrganizationCreate, OrganizationUpdate, MemberInvite, MemberUpdate
from app.services.auth import hash_password

router = APIRouter(prefix="/api/v1/organizations", tags=["organizations"])


@router.get("")
async def list_organizations(
    user: AuthPayload = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(
            Organization,
            OrganizationMember.role_id.label("member_role"),
        )
        .join(OrganizationMember, OrganizationMember.org_id == Organization.id)
        .where(
            OrganizationMember.user_id == user.id,
            OrganizationMember.status == "active",
        )
        .order_by(Organization.created_at.desc())
    )
    rows = result.all()
    data = []
    for row in rows:
        org = dict(row[0]._mapping)
        org["member_role"] = row.member_role
        data.append(org)
    return {"success": True, "data": data}


@router.get("/{id}")
async def get_organization(
    id: int,
    _: int = Depends(verify_org_membership),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Organization).where(Organization.id == id))
    org = result.scalar_one_or_none()
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    return {"success": True, "data": dict(org._mapping)}


@router.post("", status_code=201)
async def create_organization(
    data: OrganizationCreate,
    user: AuthPayload = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    slug = data.slug or data.name.lower().replace(" ", "-")
    org = Organization(name=data.name, slug=slug, domain=data.domain)
    db.add(org)
    await db.flush()

    for role_name, level, desc in [
        ("Admin", 80, "Organization administrator"),
        ("Manager", 50, "Team manager"),
        ("Member", 20, "Regular member"),
        ("Viewer", 10, "Read-only access"),
    ]:
        r = OrgTeamRole(org_id=org.id, name=role_name, hierarchy_level=level, description=desc, is_system=True)
        db.add(r)

    await db.flush()

    admin_role = await db.execute(
        select(OrgTeamRole).where(OrgTeamRole.org_id == org.id, OrgTeamRole.name == "Admin").limit(1)
    )
    admin_role_id = admin_role.scalar_one().id

    member = OrganizationMember(user_id=user.id, org_id=org.id, role_id=admin_role_id, status="active")
    db.add(member)
    await db.flush()
    await db.refresh(org)

    return {"success": True, "data": dict(org._mapping)}


@router.put("/{id}")
async def update_organization(
    id: int,
    data: OrganizationUpdate,
    _: AuthPayload = Depends(verify_org_membership),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Organization).where(Organization.id == id))
    org = result.scalar_one_or_none()
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    for k, v in data.model_dump(exclude_unset=True).items():
        setattr(org, k, v)
    await db.flush()
    await db.refresh(org)
    return {"success": True, "data": dict(org._mapping)}


@router.delete("/{id}")
async def delete_organization(
    id: int,
    _: AuthPayload = Depends(verify_org_membership),
    db: AsyncSession = Depends(get_db),
):
    await db.execute(delete(Organization).where(Organization.id == id))
    return {"success": True, "data": {"message": "Organization deleted"}}


@router.get("/{id}/members")
async def list_members(
    id: int,
    _: int = Depends(verify_org_membership),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(
            OrgUser.id, OrgUser.email, OrgUser.name, OrgUser.avatar, OrgUser.is_active,
            OrganizationMember.role_id, OrganizationMember.status, OrganizationMember.joined_at,
        )
        .join(OrganizationMember, OrganizationMember.user_id == OrgUser.id)
        .where(OrganizationMember.org_id == id)
        .order_by(OrganizationMember.joined_at)
    )
    return {"success": True, "data": [dict(r._mapping) for r in result.all()]}


@router.post("/{id}/members", status_code=201)
async def add_member(
    id: int,
    data: MemberInvite,
    _: AuthPayload = Depends(verify_org_membership),
    db: AsyncSession = Depends(get_db),
):
    existing_user = await db.execute(select(OrgUser).where(OrgUser.email == data.email))
    user = existing_user.scalar_one_or_none()

    if not user:
        import secrets
        temp_pw = secrets.token_hex(8)
        user = OrgUser(email=data.email, password_hash=hash_password(temp_pw), name=data.email.split("@")[0], is_active=False)
        db.add(user)
        await db.flush()

    existing_member = await db.execute(
        select(OrganizationMember).where(
            OrganizationMember.user_id == user.id,
            OrganizationMember.org_id == id,
        )
    )
    if existing_member.scalar_one_or_none():
        raise HTTPException(status_code=409, detail="User is already a member")

    member = OrganizationMember(user_id=user.id, org_id=id, role_id=data.role_id, status="active")
    db.add(member)
    await db.flush()
    return {"success": True, "data": {"userId": user.id, "email": data.email}}


@router.put("/{id}/members/{user_id}")
async def update_member(
    id: int, user_id: int,
    data: MemberUpdate,
    _: AuthPayload = Depends(verify_org_membership),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(OrganizationMember).where(
            OrganizationMember.user_id == user_id,
            OrganizationMember.org_id == id,
        )
    )
    member = result.scalar_one_or_none()
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    if data.role_id is not None:
        member.role_id = data.role_id
    if data.status is not None:
        member.status = data.status
    await db.flush()
    return {"success": True, "data": {"message": "Member updated"}}


@router.delete("/{id}/members/{user_id}")
async def remove_member(
    id: int, user_id: int,
    _: AuthPayload = Depends(verify_org_membership),
    db: AsyncSession = Depends(get_db),
):
    await db.execute(
        delete(OrganizationMember).where(
            OrganizationMember.user_id == user_id,
            OrganizationMember.org_id == id,
        )
    )
    return {"success": True, "data": {"message": "Member removed"}}
