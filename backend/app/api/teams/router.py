"""Team routes."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.database.models.workspace import Team, TeamMember
from app.database.models.users import OrgUser
from app.middleware.auth import get_current_user, AuthPayload
from app.middleware.tenant import get_org_id
from app.schemas.organizations import TeamCreate, TeamUpdate, TeamMemberAdd

router = APIRouter(prefix="/api/v1/teams", tags=["teams"])


@router.get("")
async def list_teams(
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    result = await db.execute(
        select(Team, OrgUser.name.label("lead_name"))
        .outerjoin(OrgUser, OrgUser.id == Team.lead_id)
        .where(Team.org_id == org_id)
        .order_by(Team.created_at.desc())
    )
    data = []
    for row in result.all():
        d = dict(row[0]._mapping)
        d["lead_name"] = row.lead_name
        data.append(d)
    return {"success": True, "data": data}


@router.post("", status_code=201)
async def create_team(
    data: TeamCreate,
    user: AuthPayload = Depends(get_current_user),
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
):
    team = Team(org_id=org_id, name=data.name, description=data.description,
                workspace_id=data.workspace_id, lead_id=data.lead_id)
    db.add(team)
    await db.flush()
    await db.refresh(team)
    member = TeamMember(team_id=team.id, user_id=user.id, role="lead")
    db.add(member)
    await db.flush()
    return {"success": True, "data": dict(team._mapping)}


@router.get("/{id}")
async def get_team(
    id: int,
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    result = await db.execute(
        select(Team, OrgUser.name.label("lead_name"))
        .outerjoin(OrgUser, OrgUser.id == Team.lead_id)
        .where(Team.id == id, Team.org_id == org_id)
    )
    row = result.first()
    if not row:
        raise HTTPException(status_code=404, detail="Team not found")
    data = dict(row[0]._mapping)
    data["lead_name"] = row.lead_name

    members_result = await db.execute(
        select(OrgUser.id, OrgUser.name, OrgUser.email, OrgUser.avatar, TeamMember.role)
        .join(TeamMember, TeamMember.user_id == OrgUser.id)
        .where(TeamMember.team_id == id)
    )
    data["members"] = [dict(r._mapping) for r in members_result.all()]
    return {"success": True, "data": data}


@router.put("/{id}")
async def update_team(
    id: int, data: TeamUpdate,
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    result = await db.execute(select(Team).where(Team.id == id, Team.org_id == org_id))
    team = result.scalar_one_or_none()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    for k, v in data.model_dump(exclude_unset=True).items():
        setattr(team, k, v)
    await db.flush()
    await db.refresh(team)
    return {"success": True, "data": dict(team._mapping)}


@router.delete("/{id}")
async def delete_team(
    id: int,
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    await db.execute(delete(Team).where(Team.id == id, Team.org_id == org_id))
    return {"success": True, "data": {"message": "Team deleted"}}


@router.post("/{id}/members", status_code=201)
async def add_team_member(
    id: int, data: TeamMemberAdd,
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    member = TeamMember(team_id=id, user_id=data.user_id, role=data.role)
    db.add(member)
    await db.flush()
    return {"success": True, "data": {"message": "Member added"}}


@router.delete("/{id}/members/{user_id}")
async def remove_team_member(
    id: int, user_id: int,
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_user),
):
    await db.execute(delete(TeamMember).where(TeamMember.team_id == id, TeamMember.user_id == user_id))
    return {"success": True, "data": {"message": "Member removed"}}
