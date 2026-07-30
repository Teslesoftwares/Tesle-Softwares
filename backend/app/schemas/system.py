"""System schemas (feature flags, audit logs, org notifications)."""

from typing import Any, Optional
from pydantic import BaseModel


class FeatureFlagCreate(BaseModel):
    key: str
    name: str
    description: Optional[str] = None
    enabled: Optional[bool] = False
    environment: Optional[str] = "production"
    owner: Optional[str] = None
    metadata: Optional[Any] = None


class FeatureFlagUpdate(BaseModel):
    key: Optional[str] = None
    name: Optional[str] = None
    description: Optional[str] = None
    enabled: Optional[bool] = None
    environment: Optional[str] = None
    owner: Optional[str] = None
    metadata: Optional[Any] = None


class MarkReadRequest(BaseModel):
    org_id: Optional[int] = None
