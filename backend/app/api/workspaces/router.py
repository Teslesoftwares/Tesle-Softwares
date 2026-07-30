"""Workspace routes."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, func, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.database.models.workspace import Workspace, Team, TeamMember
from app.middleware.auth import get_current_user, AuthPayload
from app.middleware.tenant import get_org_id
from app.schemas.organizations import WorkspaceCreate, WorkspaceUpdate

router = APIRouter(prefix="/api/v1/workspaces", tags=["workspaces"])


@router.get("")
async def list_workspaces(
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    result = await db.execute(
        select(Workspace).where(Workspace.org_id == org_id).order_by(Workspace.created_at.desc())
    )
    return {"success": True, "data": [dict(r._mapping) for r in result.all()]}


@router.post("", status_code=201)
async def create_workspace(
    data: WorkspaceCreate,
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    slug = data.slug or data.name.lower().replace(" ", "-")
    ws = Workspace(org_id=org_id, name=data.name, slug=slug)
    db.add(ws)
    await db.flush()
    await db.refresh(ws)
    return {"success": True, "data": dict(ws._mapping)}


@router.get("/{id}")
async def get_workspace(
    id: int,
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    result = await db.execute(
        select(Workspace).where(Workspace.id == id, Workspace.org_id == org_id)
    )
    ws = result.scalar_one_or_none()
    if not ws:
        raise HTTPException(status_code=404, detail="Workspace not found")
    return {"success": True, "data": dict(ws._mapping)}


@router.put("/{id}")
async def update_workspace(
    id: int,
    data: WorkspaceUpdate,
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    result = await db.execute(
        select(Workspace).where(Workspace.id == id, Workspace.org_id == org_id)
    )
    ws = result.scalar_one_or_none()
    if not ws:
        raise HTTPException(status_code=404, detail="Workspace not found")
    for k, v in data.model_dump(exclude_unset=True).items():
        setattr(ws, k, v)
    await db.flush()
    await db.refresh(ws)
    return {"success": True, "data": dict(ws._mapping)}


@router.delete("/{id}")
async def delete_workspace(
    id: int,
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    await db.execute(delete(Workspace).where(Workspace.id == id, Workspace.org_id == org_id))
    return {"success": True, "data": {"message": "Workspace deleted"}}
