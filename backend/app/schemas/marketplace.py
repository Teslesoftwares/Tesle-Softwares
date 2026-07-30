"""Marketplace schemas."""

from typing import Optional
from pydantic import BaseModel


class MarketplaceReviewCreate(BaseModel):
    rating: int
    review: Optional[str] = None


class MarketplaceInstallRequest(BaseModel):
    item_id: str
