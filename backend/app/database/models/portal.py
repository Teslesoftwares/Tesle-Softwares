"""Client portal models: projects, tickets, files, invoices, meetings, notifications."""

from sqlalchemy import Boolean, Column, DateTime, Date, ForeignKey, Integer, Numeric, String, Text, func
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB

from app.database.connection import Base


class ClientProject(Base):
    __tablename__ = "client_projects"

    id = Column(Integer, primary_key=True, autoincrement=True)
    client_id = Column(Integer, ForeignKey("client_users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    status = Column(String(50), nullable=False, default="active")
    progress = Column(Integer, nullable=False, default=0)
    start_date = Column(Date)
    deadline = Column(Date)
    budget = Column(Numeric(12, 2))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    client = relationship("ClientUser", back_populates="projects")
    milestones = relationship("ProjectMilestone", back_populates="project")
    tickets = relationship("SupportTicket", back_populates="project")
    file_shares = relationship("FileShare", back_populates="project")
    invoices = relationship("Invoice", back_populates="project")


class ProjectMilestone(Base):
    __tablename__ = "project_milestones"

    id = Column(Integer, primary_key=True, autoincrement=True)
    project_id = Column(Integer, ForeignKey("client_projects.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    due_date = Column(Date)
    completed = Column(Boolean, nullable=False, default=False)
    completed_date = Column(Date)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    project = relationship("ClientProject", back_populates="milestones")


class SupportTicket(Base):
    __tablename__ = "support_tickets"

    id = Column(Integer, primary_key=True, autoincrement=True)
    client_id = Column(Integer, ForeignKey("client_users.id", ondelete="CASCADE"), nullable=False)
    project_id = Column(Integer, ForeignKey("client_projects.id", ondelete="SET NULL"))
    subject = Column(String(255), nullable=False)
    description = Column(Text)
    priority = Column(String(50), nullable=False, default="medium")
    status = Column(String(50), nullable=False, default="open")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    client = relationship("ClientUser", back_populates="tickets")
    project = relationship("ClientProject", back_populates="tickets")
    comments = relationship("TicketComment", back_populates="ticket")


class TicketComment(Base):
    __tablename__ = "ticket_comments"

    id = Column(Integer, primary_key=True, autoincrement=True)
    ticket_id = Column(Integer, ForeignKey("support_tickets.id", ondelete="CASCADE"), nullable=False)
    client_id = Column(Integer, ForeignKey("client_users.id", ondelete="SET NULL"))
    admin_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"))
    message = Column(Text, nullable=False)
    is_admin = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    ticket = relationship("SupportTicket", back_populates="comments")
    client = relationship("ClientUser", back_populates="ticket_comments")
    admin = relationship("User", back_populates="ticket_comments")


class FileShare(Base):
    __tablename__ = "file_shares"

    id = Column(Integer, primary_key=True, autoincrement=True)
    client_id = Column(Integer, ForeignKey("client_users.id", ondelete="CASCADE"), nullable=False)
    project_id = Column(Integer, ForeignKey("client_projects.id", ondelete="SET NULL"))
    file_name = Column(String(255), nullable=False)
    file_size = Column(Integer, nullable=False)
    file_type = Column(String(100))
    file_url = Column(String(500), nullable=False)
    uploaded_by = Column(String(50), nullable=False, default="client")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    client = relationship("ClientUser", back_populates="file_shares")
    project = relationship("ClientProject", back_populates="file_shares")


class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(Integer, primary_key=True, autoincrement=True)
    client_id = Column(Integer, ForeignKey("client_users.id", ondelete="CASCADE"), nullable=False)
    project_id = Column(Integer, ForeignKey("client_projects.id", ondelete="SET NULL"))
    invoice_number = Column(String(100), unique=True, nullable=False)
    amount = Column(Numeric(12, 2), nullable=False)
    description = Column(Text)
    status = Column(String(50), nullable=False, default="pending")
    issue_date = Column(Date)
    due_date = Column(Date)
    paid_date = Column(Date)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    client = relationship("ClientUser", back_populates="invoices")
    project = relationship("ClientProject", back_populates="invoices")


class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(Integer, primary_key=True, autoincrement=True)
    client_id = Column(Integer, ForeignKey("client_users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    meeting_date = Column(DateTime(timezone=True), nullable=False)
    duration = Column(Integer, nullable=False, default=30)
    meeting_url = Column(String(500))
    status = Column(String(50), nullable=False, default="scheduled")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    client = relationship("ClientUser", back_populates="meetings")


class ClientNotification(Base):
    """Client portal notifications (table name: notifications)."""
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, autoincrement=True)
    client_id = Column(Integer, ForeignKey("client_users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    message = Column(Text)
    type = Column(String(50), nullable=False, default="info")
    read = Column(Boolean, nullable=False, default=False)
    link = Column(String(500))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    client = relationship("ClientUser", back_populates="notifications")
