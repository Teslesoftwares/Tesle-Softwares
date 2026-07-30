"""JWT auth dependencies for FastAPI routes."""

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.services.auth import decode_access_token

security = HTTPBearer()


class AuthPayload:
    """Decoded JWT token data."""

    def __init__(
        self,
        id: int,
        email: str,
        name: str,
        role: str,
        org_id: int | None = None,
    ):
        self.id = id
        self.email = email
        self.name = name
        self.role = role
        self.org_id = org_id


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> AuthPayload:
    token = credentials.credentials
    payload = decode_access_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )
    return AuthPayload(
        id=payload.get("id"),
        email=payload.get("email"),
        name=payload.get("name"),
        role=payload.get("role", "user"),
        org_id=payload.get("orgId"),
    )


async def get_optional_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(
        HTTPBearer(auto_error=False)
    ),
) -> AuthPayload | None:
    if not credentials:
        return None
    payload = decode_access_token(credentials.credentials)
    if payload is None:
        return None
    return AuthPayload(
        id=payload.get("id"),
        email=payload.get("email"),
        name=payload.get("name"),
        role=payload.get("role", "user"),
        org_id=payload.get("orgId"),
    )


def require_role(*roles: str):
    async def role_checker(
        user: AuthPayload = Depends(get_current_user),
    ) -> AuthPayload:
        if user.role not in roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions",
            )
        return user

    return role_checker
