"""Auth request/response schemas."""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)
    name: str = Field(min_length=1, max_length=255)
    company: Optional[str] = None
    phone: Optional[str] = None
    org_name: Optional[str] = None


class PasswordChangeRequest(BaseModel):
    current_password: str
    new_password: str = Field(min_length=8)


class RefreshRequest(BaseModel):
    refresh_token: str


class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    role: str
    avatar: Optional[str] = None
    is_active: Optional[bool] = None
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class ClientUserResponse(BaseModel):
    id: int
    email: str
    name: str
    company: Optional[str] = None
    phone: Optional[str] = None
    avatar: Optional[str] = None
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class OrgMembership(BaseModel):
    id: int
    name: str
    slug: str
    plan: Optional[str] = None
    role: Optional[int] = None


class OrgUserResponse(BaseModel):
    id: int
    email: str
    name: str
    role: str
    org_id: Optional[int] = None
    avatar: Optional[str] = None
    is_active: Optional[bool] = None
    last_login: Optional[datetime] = None
    created_at: Optional[datetime] = None
    organizations: list[OrgMembership] = []

    model_config = {"from_attributes": True}


class TokenResponse(BaseModel):
    token: str
    refresh_token: str
    expires_in: str = "15m"


class LegacyTokenResponse(BaseModel):
    token: str
    user: UserResponse


class LegacyClientTokenResponse(BaseModel):
    token: str
    client: ClientUserResponse


class OrgTokenResponse(BaseModel):
    token: str
    refresh_token: str
    expires_in: str = "15m"
    user: OrgUserResponse


class MessageResponse(BaseModel):
    message: str
