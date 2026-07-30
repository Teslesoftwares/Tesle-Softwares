"""User models: users, org_users, client_users."""

from datetime import datetime
from sqlalchemy import Boolean, Column, DateTime, Integer, String, Text, func
from sqlalchemy.orm import relationship

from app.database.connection import Base


class User(Base):
    """Legacy admin users table."""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False, default="admin")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    ticket_comments = relationship("TicketComment", back_populates="admin")
    marketplace_installs = relationship("MarketplaceInstall", back_populates="installed_by_user")
    marketplace_reviews = relationship("MarketplaceReview", back_populates="user")


class OrgUser(Base):
    """Multi-tenant org-level users."""
    __tablename__ = "org_users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False, default="user")
    avatar = Column(String(500))
    is_active = Column(Boolean, nullable=False, default=True)
    last_login = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    memberships = relationship("OrganizationMember", back_populates="user")
    org_roles = relationship("UserOrgRole", back_populates="user")
    team_memberships = relationship("TeamMember", back_populates="user")
    department_memberships = relationship("DepartmentMember", back_populates="user")
    refresh_tokens = relationship("RefreshToken", back_populates="user")
    audit_logs = relationship("AuditLog", back_populates="user")
    org_notifications = relationship("OrgNotification", back_populates="user")
    teams_led = relationship("Team", back_populates="lead")
    departments_headed = relationship("Department", back_populates="head")


class ClientUser(Base):
    """Client portal users."""
    __tablename__ = "client_users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    company = Column(String(255))
    phone = Column(String(50))
    avatar = Column(String(500))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    projects = relationship("ClientProject", back_populates="client")
    tickets = relationship("SupportTicket", back_populates="client")
    ticket_comments = relationship("TicketComment", back_populates="client")
    file_shares = relationship("FileShare", back_populates="client")
    invoices = relationship("Invoice", back_populates="client")
    meetings = relationship("Meeting", back_populates="client")
    notifications = relationship("ClientNotification", back_populates="client")
