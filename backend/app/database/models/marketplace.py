"""Marketplace models."""

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, Numeric, String, Text, UniqueConstraint, func
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import ARRAY, JSONB

from app.database.connection import Base


class MarketplaceItem(Base):
    __tablename__ = "marketplace_items"

    id = Column(String(50), primary_key=True)
    name = Column(String(255), nullable=False)
    tagline = Column(String(500))
    description = Column(Text)
    item_type = Column(String(50), nullable=False)
    category = Column(String(100))
    provider = Column(String(255))
    developer_id = Column(String(100))
    icon = Column(String(100))
    color = Column(String(100))
    rating = Column(Numeric(2, 1), nullable=False, default=0)
    rating_count = Column(Integer, nullable=False, default=0)
    install_count = Column(Integer, nullable=False, default=0)
    featured = Column(Boolean, nullable=False, default=False)
    verified = Column(Boolean, nullable=False, default=False)
    pricing = Column(String(50), nullable=False, default="free")
    price = Column(String(100))
    version = Column(String(50))
    size = Column(String(50))
    requirements = Column(ARRAY(Text), nullable=False, default=[])
    permissions = Column(ARRAY(Text), nullable=False, default=[])
    works_with = Column(ARRAY(Text), nullable=False, default=[])
    screenshots = Column(ARRAY(Text), nullable=False, default=[])
    metadata_ = Column("metadata", JSONB, nullable=False, default={})
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    installs = relationship("MarketplaceInstall", back_populates="item")
    reviews = relationship("MarketplaceReview", back_populates="item")


class MarketplaceDeveloper(Base):
    __tablename__ = "marketplace_developers"

    id = Column(String(100), primary_key=True)
    name = Column(String(255), nullable=False)
    avatar = Column(String(500))
    bio = Column(Text)
    website = Column(String(500))
    email = Column(String(255))
    items_count = Column(Integer, nullable=False, default=0)
    total_installs = Column(Integer, nullable=False, default=0)
    verified = Column(Boolean, nullable=False, default=False)
    joined_at = Column(DateTime(timezone=True), server_default=func.now())
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class MarketplaceInstall(Base):
    __tablename__ = "marketplace_installs"
    __table_args__ = (UniqueConstraint("item_id", "org_id"),)

    id = Column(Integer, primary_key=True, autoincrement=True)
    item_id = Column(String(50), ForeignKey("marketplace_items.id", ondelete="CASCADE"), nullable=False)
    org_id = Column(String(100), nullable=False)
    installed_by = Column(Integer, ForeignKey("users.id"))
    status = Column(String(50), nullable=False, default="active")
    config = Column(JSONB, nullable=False, default={})
    installed_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    item = relationship("MarketplaceItem", back_populates="installs")
    installed_by_user = relationship("User", back_populates="marketplace_installs")



class MarketplaceReview(Base):
    __tablename__ = "marketplace_reviews"
    __table_args__ = (UniqueConstraint("item_id", "user_id"),)

    id = Column(Integer, primary_key=True, autoincrement=True)
    item_id = Column(String(50), ForeignKey("marketplace_items.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    rating = Column(Integer, nullable=False)
    review = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    item = relationship("MarketplaceItem", back_populates="reviews")
    user = relationship("User", back_populates="marketplace_reviews")
