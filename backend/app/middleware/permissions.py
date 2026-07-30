"""Permission middleware — hierarchy-based role checks."""

from fastapi import Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.database.models.organizations import OrganizationMember, OrgTeamRole
from app.middleware.auth import AuthPayload, get_current_user

ROLE_HIERARCHY = {
    "super_admin": 100,
    "admin": 80,
    "manager": 50,
    "member": 20,
    "viewer": 10,
    "user": 0,
}


def require_hierarchy(min_role: str):
    async def checker(
        user: AuthPayload = Depends(get_current_user),
    ) -> AuthPayload:
        user_level = ROLE_HIERARCHY.get(user.role, 0)
        required_level = ROLE_HIERARCHY.get(min_role, 0)
        if user_level < required_level:
            raise HTTPException(
                status_code=403,
                detail=f"Minimum role required: {min_role}",
            )
        return user

    return checker
