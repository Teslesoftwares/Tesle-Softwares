"""Multi-tenant organization models."""

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, Text, UniqueConstraint, func
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB

from app.database.connection import Base


class Organization(Base):
    __tablename__ = "organizations"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False)
    logo = Column(String(500))
    domain = Column(String(255))
    plan = Column(String(50), nullable=False, default="free")
    settings = Column(JSONB, nullable=False, default={})
    status = Column(String(50), nullable=False, default="active")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    members = relationship("OrganizationMember", back_populates="org")
    roles = relationship("OrgTeamRole", back_populates="org")
    workspaces = relationship("Workspace", back_populates="org")
    teams = relationship("Team", back_populates="org")
    departments = relationship("Department", back_populates="org")
    org_products = relationship("OrganizationProduct", back_populates="org")
    subscriptions = relationship("Subscription", back_populates="org")
    audit_logs = relationship("AuditLog", back_populates="org")
    org_notifications = relationship("OrgNotification", back_populates="org")



class OrganizationMember(Base):
    __tablename__ = "organization_members"
    __table_args__ = (UniqueConstraint("user_id", "org_id"),)

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("org_users.id", ondelete="CASCADE"), nullable=False)
    org_id = Column(Integer, ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    role_id = Column(Integer)
    status = Column(String(50), nullable=False, default="active")
    joined_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("OrgUser", back_populates="memberships")
    org = relationship("Organization", back_populates="members")


class OrgTeamRole(Base):
    __tablename__ = "org_team_roles"

    id = Column(Integer, primary_key=True, autoincrement=True)
    org_id = Column(Integer, ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(255), nullable=False)
    hierarchy_level = Column(Integer, nullable=False, default=0)
    description = Column(Text)
    is_system = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    org = relationship("Organization", back_populates="roles")
    permissions = relationship("RolePermission", back_populates="role")
    user_org_roles = relationship("UserOrgRole", back_populates="role")


class UserOrgRole(Base):
    __tablename__ = "user_org_roles"
    __table_args__ = (UniqueConstraint("user_id", "role_id", "org_id"),)

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("org_users.id", ondelete="CASCADE"), nullable=False)
    role_id = Column(Integer, ForeignKey("org_team_roles.id", ondelete="CASCADE"), nullable=False)
    org_id = Column(Integer, ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)

    user = relationship("OrgUser", back_populates="org_roles")
    role = relationship("OrgTeamRole", back_populates="user_org_roles")


class OrgPermission(Base):
    __tablename__ = "org_permissions"
    __table_args__ = (UniqueConstraint("resource", "action"),)

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    resource = Column(String(100), nullable=False)
    action = Column(String(50), nullable=False)
    description = Column(Text)

    role_permissions = relationship("RolePermission", back_populates="permission")


class RolePermission(Base):
    __tablename__ = "role_permissions"
    __table_args__ = (UniqueConstraint("role_id", "permission_id"),)

    id = Column(Integer, primary_key=True, autoincrement=True)
    role_id = Column(Integer, ForeignKey("org_team_roles.id", ondelete="CASCADE"), nullable=False)
    permission_id = Column(Integer, ForeignKey("org_permissions.id", ondelete="CASCADE"), nullable=False)

    role = relationship("OrgTeamRole", back_populates="permissions")
    permission = relationship("OrgPermission", back_populates="role_permissions")
