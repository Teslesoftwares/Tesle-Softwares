"""Multi-tenant schemas."""

from typing import Any, Optional
from pydantic import BaseModel


class OrganizationCreate(BaseModel):
    name: str
    slug: Optional[str] = None
    domain: Optional[str] = None


class OrganizationUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    domain: Optional[str] = None
    settings: Optional[Any] = None
    status: Optional[str] = None


class MemberInvite(BaseModel):
    email: str
    role_id: Optional[int] = None


class MemberUpdate(BaseModel):
    role_id: Optional[int] = None
    status: Optional[str] = None


class WorkspaceCreate(BaseModel):
    name: str
    slug: Optional[str] = None


class WorkspaceUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    settings: Optional[Any] = None


class TeamCreate(BaseModel):
    name: str
    description: Optional[str] = None
    workspace_id: Optional[int] = None
    lead_id: Optional[int] = None


class TeamUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    workspace_id: Optional[int] = None
    lead_id: Optional[int] = None


class TeamMemberAdd(BaseModel):
    user_id: int
    role: Optional[str] = "member"


class DepartmentCreate(BaseModel):
    name: str
    head_id: Optional[int] = None
    parent_id: Optional[int] = None


class DepartmentUpdate(BaseModel):
    name: Optional[str] = None
    head_id: Optional[int] = None
    parent_id: Optional[int] = None


class DepartmentMemberAdd(BaseModel):
    user_id: int


class RoleCreate(BaseModel):
    name: str
    hierarchy_level: Optional[int] = 0
    description: Optional[str] = None


class RoleUpdate(BaseModel):
    name: Optional[str] = None
    hierarchy_level: Optional[int] = None
    description: Optional[str] = None


class RolePermissionsUpdate(BaseModel):
    permission_ids: list[int]


class ProductCreate(BaseModel):
    name: str
    slug: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = "general"
    price: Optional[float] = 0
    version: Optional[str] = "1.0.0"
    metadata: Optional[Any] = None


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    version: Optional[str] = None
    status: Optional[str] = None
    metadata: Optional[Any] = None


class OrgProductUpdate(BaseModel):
    enabled: Optional[bool] = True
    settings: Optional[Any] = None


class PlanCreate(BaseModel):
    name: str
    slug: Optional[str] = None
    price: float
    interval: Optional[str] = "month"
    tier: Optional[str] = "standard"
    popular: Optional[bool] = False
    features: Optional[list] = []
    limits: Optional[dict] = {}


class PlanUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    interval: Optional[str] = None
    tier: Optional[str] = None
    popular: Optional[bool] = None
    features: Optional[list] = None
    limits: Optional[dict] = None
    is_active: Optional[bool] = None


class SubscriptionCreate(BaseModel):
    plan_id: int
    start_date: Optional[str] = None
    trial_end: Optional[str] = None


class SubscriptionUpdate(BaseModel):
    status: Optional[str] = None
    end_date: Optional[str] = None
    cancel_at: Optional[str] = None
