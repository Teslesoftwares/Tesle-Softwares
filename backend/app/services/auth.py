"""Auth business logic: password hashing, JWT tokens, user CRUD."""

import secrets
from datetime import datetime, timedelta, timezone

from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.config import get_settings
from app.database.models.users import User, OrgUser, ClientUser
from app.database.models.organizations import Organization, OrganizationMember
from app.database.models.billing import RefreshToken

settings = get_settings()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


def create_access_token(payload: dict) -> str:
    to_encode = payload.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire, "iat": datetime.now(timezone.utc)})
    return jwt.encode(to_encode, settings.JWT_SECRET, algorithm="HS256")


def create_refresh_token() -> str:
    return secrets.token_hex(40)


def decode_access_token(token: str) -> dict | None:
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
        return payload
    except JWTError:
        return None


def parse_expires_in(expires_in: str) -> timedelta:
    unit = expires_in[-1]
    value = int(expires_in[:-1])
    if unit == "m":
        return timedelta(minutes=value)
    elif unit == "h":
        return timedelta(hours=value)
    elif unit == "d":
        return timedelta(days=value)
    return timedelta(minutes=15)


async def get_user_by_email(db: AsyncSession, email: str) -> User | None:
    result = await db.execute(select(User).where(User.email == email))
    return result.scalar_one_or_none()


async def get_org_user_by_email(db: AsyncSession, email: str) -> OrgUser | None:
    result = await db.execute(select(OrgUser).where(OrgUser.email == email))
    return result.scalar_one_or_none()


async def get_client_user_by_email(db: AsyncSession, email: str) -> ClientUser | None:
    result = await db.execute(select(ClientUser).where(ClientUser.email == email))
    return result.scalar_one_or_none()


async def create_user(db: AsyncSession, email: str, password: str, name: str) -> User:
    user = User(email=email, password_hash=hash_password(password), name=name)
    db.add(user)
    await db.flush()
    await db.refresh(user)
    return user


async def create_org_user(
    db: AsyncSession, email: str, password: str, name: str
) -> OrgUser:
    user = OrgUser(email=email, password_hash=hash_password(password), name=name)
    db.add(user)
    await db.flush()
    await db.refresh(user)
    return user


async def create_client_user(
    db: AsyncSession,
    email: str,
    password: str,
    name: str,
    company: str | None = None,
    phone: str | None = None,
) -> ClientUser:
    user = ClientUser(
        email=email,
        password_hash=hash_password(password),
        name=name,
        company=company,
        phone=phone,
    )
    db.add(user)
    await db.flush()
    await db.refresh(user)
    return user


async def create_org_with_member(
    db: AsyncSession,
    user_id: int,
    org_name: str,
) -> tuple[Organization, str]:
    slug = org_name.lower()
    for ch in slug:
        if ch not in "abcdefghijklmnopqrstuvwxyz0123456789-":
            slug = slug.replace(ch, "-")
    slug = slug.strip("-")

    org = Organization(name=org_name, slug=slug)
    db.add(org)
    await db.flush()

    admin_role = await db.execute(
        select(OrganizationMember).where(
            OrganizationMember.org_id == org.id
        )
    )

    member = OrganizationMember(user_id=user_id, org_id=org.id, status="active")
    db.add(member)
    await db.flush()

    return org, "admin"


async def store_refresh_token(
    db: AsyncSession, user_id: int, token: str
) -> RefreshToken:
    refresh_token = RefreshToken(
        user_id=user_id,
        token=token,
        expires_at=datetime.now(timezone.utc) + timedelta(days=7),
    )
    db.add(refresh_token)
    await db.flush()
    return refresh_token


async def revoke_refresh_token(db: AsyncSession, token: str) -> bool:
    result = await db.execute(
        select(RefreshToken).where(
            RefreshToken.token == token, RefreshToken.revoked == False
        )
    )
    rt = result.scalar_one_or_none()
    if rt:
        rt.revoked = True
        await db.flush()
        return True
    return False


async def get_valid_refresh_token(db: AsyncSession, token: str) -> RefreshToken | None:
    result = await db.execute(
        select(RefreshToken).where(
            RefreshToken.token == token,
            RefreshToken.revoked == False,
            RefreshToken.expires_at > datetime.now(timezone.utc),
        )
    )
    return result.scalar_one_or_none()


async def update_user_password(
    db: AsyncSession, user_id: int, new_password: str
) -> None:
    await db.execute(
        update(User).where(User.id == user_id).values(
            password_hash=hash_password(new_password),
            updated_at=datetime.now(timezone.utc),
        )
    )
    await db.flush()


async def update_org_user_last_login(db: AsyncSession, user_id: int) -> None:
    await db.execute(
        update(OrgUser).where(OrgUser.id == user_id).values(
            last_login=datetime.now(timezone.utc)
        )
    )
    await db.flush()


async def get_user_organizations(
    db: AsyncSession, user_id: int
) -> list[dict]:
    result = await db.execute(
        select(
            Organization.id,
            Organization.name,
            Organization.slug,
            Organization.plan,
            OrganizationMember.role_id,
        )
        .join(OrganizationMember, OrganizationMember.org_id == Organization.id)
        .where(
            OrganizationMember.user_id == user_id,
            OrganizationMember.status == "active",
        )
    )
    return [
        {
            "id": row.id,
            "name": row.name,
            "slug": row.slug,
            "plan": row.plan,
            "role": row.role_id,
        }
        for row in result.all()
    ]


async def get_org_user_with_orgs(db: AsyncSession, user_id: int) -> dict | None:
    result = await db.execute(
        select(OrgUser).where(OrgUser.id == user_id)
    )
    user = result.scalar_one_or_none()
    if not user:
        return None

    orgs = await get_user_organizations(db, user_id)
    return {
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "role": user.role,
        "avatar": user.avatar,
        "is_active": user.is_active,
        "last_login": user.last_login,
        "created_at": user.created_at,
        "organizations": orgs,
    }
