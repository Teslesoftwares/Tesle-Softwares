"""Department routes."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.database.models.workspace import Department, DepartmentMember
from app.database.models.users import OrgUser
from app.middleware.auth import get_current_user, AuthPayload
from app.middleware.tenant import get_org_id
from app.schemas.organizations import DepartmentCreate, DepartmentUpdate, DepartmentMemberAdd

router = APIRouter(prefix="/api/v1/departments", tags=["departments"])


@router.get("")
async def list_departments(
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    result = await db.execute(
        select(Department, OrgUser.name.label("head_name"))
        .outerjoin(OrgUser, OrgUser.id == Department.head_id)
        .where(Department.org_id == org_id)
        .order_by(Department.name)
    )
    data = []
    for row in result.all():
        d = dict(row[0]._mapping)
        d["head_name"] = row.head_name
        data.append(d)
    return {"success": True, "data": data}


@router.post("", status_code=201)
async def create_department(
    data: DepartmentCreate,
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    dept = Department(org_id=org_id, name=data.name, head_id=data.head_id, parent_id=data.parent_id)
    db.add(dept)
    await db.flush()
    await db.refresh(dept)
    return {"success": True, "data": dict(dept._mapping)}


@router.get("/{id}")
async def get_department(
    id: int,
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    result = await db.execute(
        select(Department, OrgUser.name.label("head_name"))
        .outerjoin(OrgUser, OrgUser.id == Department.head_id)
        .where(Department.id == id, Department.org_id == org_id)
    )
    row = result.first()
    if not row:
        raise HTTPException(status_code=404, detail="Department not found")
    data = dict(row[0]._mapping)
    data["head_name"] = row.head_name

    members_result = await db.execute(
        select(OrgUser.id, OrgUser.name, OrgUser.email, OrgUser.avatar)
        .join(DepartmentMember, DepartmentMember.user_id == OrgUser.id)
        .where(DepartmentMember.dept_id == id)
    )
    data["members"] = [dict(r._mapping) for r in members_result.all()]
    return {"success": True, "data": data}


@router.put("/{id}")
async def update_department(
    id: int, data: DepartmentUpdate,
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    result = await db.execute(select(Department).where(Department.id == id, Department.org_id == org_id))
    dept = result.scalar_one_or_none()
    if not dept:
        raise HTTPException(status_code=404, detail="Department not found")
    for k, v in data.model_dump(exclude_unset=True).items():
        setattr(dept, k, v)
    await db.flush()
    await db.refresh(dept)
    return {"success": True, "data": dict(dept._mapping)}


@router.delete("/{id}")
async def delete_department(
    id: int,
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    await db.execute(delete(Department).where(Department.id == id, Department.org_id == org_id))
    return {"success": True, "data": {"message": "Department deleted"}}


@router.post("/{id}/members", status_code=201)
async def add_member(
    id: int, data: DepartmentMemberAdd,
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    member = DepartmentMember(dept_id=id, user_id=data.user_id)
    db.add(member)
    await db.flush()
    return {"success": True, "data": {"message": "Member added"}}


@router.delete("/{id}/members/{user_id}")
async def remove_member(
    id: int, user_id: int,
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    await db.execute(delete(DepartmentMember).where(DepartmentMember.dept_id == id, DepartmentMember.user_id == user_id))
    return {"success": True, "data": {"message": "Member removed"}}
