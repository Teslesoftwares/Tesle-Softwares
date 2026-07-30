"""System models: feature_flags, audit_logs, org_notifications."""

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB

from app.database.connection import Base


class FeatureFlag(Base):
    __tablename__ = "feature_flags"

    id = Column(Integer, primary_key=True, autoincrement=True)
    key = Column(String(255), unique=True, nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    enabled = Column(Boolean, nullable=False, default=False)
    environment = Column(String(50), nullable=False, default="production")
    owner = Column(String(255))
    metadata_ = Column("metadata", JSONB, nullable=False, default={})
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    org_id = Column(Integer, ForeignKey("organizations.id", ondelete="SET NULL"))
    user_id = Column(Integer, ForeignKey("org_users.id", ondelete="SET NULL"))
    action = Column(String(50), nullable=False)
    resource = Column(String(100), nullable=False)
    resource_id = Column(Integer)
    details = Column(JSONB)
    ip = Column(String(45))
    user_agent = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    org = relationship("Organization", back_populates="audit_logs")
    user = relationship("OrgUser", back_populates="audit_logs")


class OrgNotification(Base):
    """Organization-level notifications (table name: org_notifications)."""
    __tablename__ = "org_notifications"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("org_users.id", ondelete="CASCADE"), nullable=False)
    org_id = Column(Integer, ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    message = Column(Text)
    type = Column(String(50), nullable=False, default="info")
    read = Column(Boolean, nullable=False, default=False)
    link = Column(String(500))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("OrgUser", back_populates="org_notifications")
    org = relationship("Organization", back_populates="org_notifications")
