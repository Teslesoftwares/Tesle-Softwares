"""Auth routes — legacy admin, v2 multi-tenant, and client portal.

Compatibility layer that replaces Express auth.ts, auth.v2.ts, and portal-auth.ts.
All three systems share the same JWT secret and token format.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.middleware.auth import get_current_user, AuthPayload
from app.schemas.auth import (
    LoginRequest,
    RegisterRequest,
    PasswordChangeRequest,
    RefreshRequest,
    UserResponse,
    ClientUserResponse,
    OrgUserResponse,
    LegacyTokenResponse,
    LegacyClientTokenResponse,
    OrgTokenResponse,
    MessageResponse,
)
from app.services.auth import (
    create_access_token,
    create_refresh_token,
    verify_password,
    get_user_by_email,
    get_org_user_by_email,
    get_client_user_by_email,
    create_user,
    create_org_user,
    create_client_user,
    create_org_with_member,
    store_refresh_token,
    revoke_refresh_token,
    get_valid_refresh_token,
    update_org_user_last_login,
    get_user_organizations,
    get_org_user_with_orgs,
)

router = APIRouter(prefix="/api/auth", tags=["auth"])


# ─── Legacy Admin Auth (apps/api/src/routes/auth.ts) ─────────────────────────
# Compatible with admin portal: apps/admin/src/lib/api.ts


@router.post("/login", response_model=LegacyTokenResponse)
async def login(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    user = await get_user_by_email(db, data.email)
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(
        {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "role": user.role,
        }
    )
    return {
        "token": token,
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "role": user.role,
        },
    }


@router.get("/me", response_model=UserResponse)
async def me(user: AuthPayload = Depends(get_current_user)):
    return {
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "role": user.role,
    }


# ─── V2 Multi-Tenant Auth (apps/api/src/routes/auth.v2.ts) ───────────────────


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_v2(data: RegisterRequest, db: AsyncSession = Depends(get_db)):
    existing = await get_org_user_by_email(db, data.email)
    if existing:
        raise HTTPException(status_code=409, detail="Email already registered")

    user = await create_org_user(db, data.email, data.password, data.name)

    org_id = None
    org_role = "user"

    if data.org_name:
        org, org_role = await create_org_with_member(db, user.id, data.org_name)
        org_id = org.id

    token = create_access_token(
        {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "role": org_role,
            "orgId": org_id,
        }
    )
    refresh_token = create_refresh_token()
    await store_refresh_token(db, user.id, refresh_token)

    return {
        "token": token,
        "refreshToken": refresh_token,
        "expiresIn": "15m",
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "role": user.role,
            "orgId": org_id,
        },
    }


@router.post("/login-v2")
async def login_v2(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    user = await get_org_user_by_email(db, data.email)
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not user.is_active:
        raise HTTPException(status_code=403, detail="Account is deactivated")

    orgs = await get_user_organizations(db, user.id)
    org_id = orgs[0]["id"] if orgs else None
    org_role = orgs[0]["role"] if orgs else "user"

    token = create_access_token(
        {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "role": org_role or "user",
            "orgId": org_id,
        }
    )
    refresh_token = create_refresh_token()
    await store_refresh_token(db, user.id, refresh_token)
    await update_org_user_last_login(db, user.id)

    return {
        "token": token,
        "refreshToken": refresh_token,
        "expiresIn": "15m",
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "role": org_role or "user",
            "orgId": org_id,
        },
    }


@router.post("/refresh")
async def refresh(data: RefreshRequest, db: AsyncSession = Depends(get_db)):
    token_record = await get_valid_refresh_token(db, data.refresh_token)
    if not token_record:
        raise HTTPException(status_code=401, detail="Invalid or expired refresh token")

    await revoke_refresh_token(db, data.refresh_token)

    user = await get_org_user_by_email(
        db, token_record.user.email if hasattr(token_record, "user") else ""
    )

    from sqlalchemy import select
    from app.database.models.users import OrgUser

    result = await db.execute(select(OrgUser).where(OrgUser.id == token_record.user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    orgs = await get_user_organizations(db, user.id)
    org_id = orgs[0]["id"] if orgs else None
    org_role = orgs[0]["role"] if orgs else "user"

    new_token = create_access_token(
        {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "role": org_role or "user",
            "orgId": org_id,
        }
    )
    new_refresh_token = create_refresh_token()
    await store_refresh_token(db, user.id, new_refresh_token)

    return {
        "token": new_token,
        "refreshToken": new_refresh_token,
        "expiresIn": "15m",
    }


@router.post("/logout", response_model=MessageResponse)
async def logout(data: RefreshRequest, db: AsyncSession = Depends(get_db)):
    await revoke_refresh_token(db, data.refresh_token)
    return {"message": "Logged out"}


@router.get("/me-v2")
async def me_v2(
    user: AuthPayload = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    org_user = await get_org_user_with_orgs(db, user.id)
    if not org_user:
        raise HTTPException(status_code=404, detail="User not found")
    return org_user


@router.put("/password", response_model=MessageResponse)
async def change_password(
    data: PasswordChangeRequest,
    user: AuthPayload = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    from sqlalchemy import select
    from app.database.models.users import OrgUser

    result = await db.execute(select(OrgUser).where(OrgUser.id == user.id))
    db_user = result.scalar_one_or_none()
    if not db_user or not verify_password(data.current_password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="Current password is incorrect")

    from app.services.auth import hash_password
    from sqlalchemy import update
    from datetime import datetime, timezone

    await db.execute(
        update(OrgUser)
        .where(OrgUser.id == user.id)
        .values(
            password_hash=hash_password(data.new_password),
            updated_at=datetime.now(timezone.utc),
        )
    )
    await db.flush()

    return {"message": "Password updated"}


# ─── Client Portal Auth (apps/api/src/routes/portal-auth.ts) ─────────────────
# Compatible with client portal: apps/portal/src/lib/api.ts
# Mounted at /api/portal in main.py, so these paths are relative to /api/portal


portal_router = APIRouter(prefix="/api/portal/auth", tags=["portal-auth"])


@portal_router.post("/register", response_model=LegacyClientTokenResponse)
async def register_portal(data: RegisterRequest, db: AsyncSession = Depends(get_db)):
    existing = await get_client_user_by_email(db, data.email)
    if existing:
        raise HTTPException(status_code=409, detail="Email already registered")

    user = await create_client_user(
        db, data.email, data.password, data.name, data.company, data.phone
    )
    token = create_access_token(
        {"id": user.id, "email": user.email, "name": user.name, "role": "client"}
    )
    return {
        "token": token,
        "client": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "company": user.company,
            "phone": user.phone,
            "avatar": user.avatar,
            "created_at": user.created_at,
        },
    }


@portal_router.post("/login")
async def login_portal(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    user = await get_client_user_by_email(db, data.email)
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(
        {"id": user.id, "email": user.email, "name": user.name, "role": "client"}
    )
    return {
        "token": token,
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "company": user.company,
            "phone": user.phone,
            "avatar": user.avatar,
        },
    }


@portal_router.get("/me")
async def me_portal(user: AuthPayload = Depends(get_current_user)):
    return {
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "role": user.role,
    }
