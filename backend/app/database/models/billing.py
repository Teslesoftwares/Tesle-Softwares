"""Billing models: subscription_plans, subscriptions, refresh_tokens."""

from sqlalchemy import Boolean, Column, DateTime, Date, ForeignKey, Integer, Numeric, String, func
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB

from app.database.connection import Base


class SubscriptionPlan(Base):
    __tablename__ = "subscription_plans"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False)
    price = Column(Numeric(12, 2), nullable=False)
    interval = Column(String(10), nullable=False, default="month")
    tier = Column(String(50))
    popular = Column(Boolean, nullable=False, default=False)
    features = Column(JSONB, nullable=False, default=[])
    limits = Column(JSONB, nullable=False, default={})
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    subscriptions = relationship("Subscription", back_populates="plan")


class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    org_id = Column(Integer, ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    plan_id = Column(Integer, ForeignKey("subscription_plans.id"))
    status = Column(String(50), nullable=False, default="active")
    start_date = Column(Date, nullable=False)
    end_date = Column(Date)
    cancel_at = Column(Date)
    trial_end = Column(Date)
    metadata_ = Column("metadata", JSONB, nullable=False, default={})
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    org = relationship("Organization", back_populates="subscriptions")
    plan = relationship("SubscriptionPlan", back_populates="subscriptions")


class RefreshToken(Base):
    __tablename__ = "refresh_tokens"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("org_users.id", ondelete="CASCADE"), nullable=False)
    token = Column(String(500), unique=True, nullable=False)
    expires_at = Column(DateTime(timezone=True), nullable=False)
    revoked = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("OrgUser", back_populates="refresh_tokens")
