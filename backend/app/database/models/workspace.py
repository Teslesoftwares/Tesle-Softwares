"""Workspace, team, and department models."""

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, Text, UniqueConstraint, func
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB

from app.database.connection import Base


class Workspace(Base):
    __tablename__ = "workspaces"

    id = Column(Integer, primary_key=True, autoincrement=True)
    org_id = Column(Integer, ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(255), nullable=False)
    slug = Column(String(255))
    description = Column(Text)
    settings = Column(JSONB, nullable=False, default={})
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    org = relationship("Organization", back_populates="workspaces")
    teams = relationship("Team", back_populates="workspace")


class Team(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, autoincrement=True)
    org_id = Column(Integer, ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    workspace_id = Column(Integer, ForeignKey("workspaces.id", ondelete="SET NULL"))
    name = Column(String(255), nullable=False)
    description = Column(Text)
    lead_id = Column(Integer, ForeignKey("org_users.id", ondelete="SET NULL"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    org = relationship("Organization", back_populates="teams")
    workspace = relationship("Workspace", back_populates="teams")
    lead = relationship("OrgUser", back_populates="teams_led")
    members = relationship("TeamMember", back_populates="team")


class TeamMember(Base):
    __tablename__ = "team_members"
    __table_args__ = (UniqueConstraint("team_id", "user_id"),)

    id = Column(Integer, primary_key=True, autoincrement=True)
    team_id = Column(Integer, ForeignKey("teams.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("org_users.id", ondelete="CASCADE"), nullable=False)
    role = Column(String(50), nullable=False, default="member")

    team = relationship("Team", back_populates="members")
    user = relationship("OrgUser", back_populates="team_memberships")


class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, autoincrement=True)
    org_id = Column(Integer, ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(255), nullable=False)
    head_id = Column(Integer, ForeignKey("org_users.id", ondelete="SET NULL"))
    parent_id = Column(Integer, ForeignKey("departments.id", ondelete="SET NULL"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    org = relationship("Organization", back_populates="departments")
    head = relationship("OrgUser", back_populates="departments_headed", foreign_keys=[head_id])
    parent = relationship("Department", remote_side=[id], back_populates="children")
    children = relationship("Department", back_populates="parent")
    members = relationship("DepartmentMember", back_populates="department")


class DepartmentMember(Base):
    __tablename__ = "department_members"
    __table_args__ = (UniqueConstraint("dept_id", "user_id"),)

    id = Column(Integer, primary_key=True, autoincrement=True)
    dept_id = Column(Integer, ForeignKey("departments.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("org_users.id", ondelete="CASCADE"), nullable=False)

    department = relationship("Department", back_populates="members")
    user = relationship("OrgUser", back_populates="department_memberships")
