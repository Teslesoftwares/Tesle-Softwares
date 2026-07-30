"""Tenant middleware — resolve org context from header or JWT."""

from fastapi import Depends, Header, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.database.models.organizations import OrganizationMember
from app.middleware.auth import AuthPayload, get_current_user


async def get_org_id(
    x_org_id: str | None = Header(None),
    org_id: str | None = None,
    user: AuthPayload = Depends(get_current_user),
) -> int:
    raw = x_org_id or org_id
    if raw:
        return int(raw)
    if user.org_id:
        return user.org_id
    raise HTTPException(
        status_code=400,
        detail="Organization ID required (x-org-id header or orgId query param)",
    )


async def verify_org_membership(
    user: AuthPayload = Depends(get_current_user),
    org_id: int = Depends(get_org_id),
    db: AsyncSession = Depends(get_db),
) -> int:
    result = await db.execute(
        select(OrganizationMember).where(
            OrganizationMember.user_id == user.id,
            OrganizationMember.org_id == org_id,
            OrganizationMember.status == "active",
        )
    )
    member = result.scalar_one_or_none()
    if not member:
        raise HTTPException(status_code=403, detail="Not a member of this organization")
    return org_id
