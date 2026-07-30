"""Portal routes — projects, tickets, files, invoices, meetings, notifications, AI.

All routes use client auth (JWT with role='client').
Mounted at /api/portal.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.database.models.portal import (
    ClientProject, ProjectMilestone, SupportTicket, TicketComment,
    FileShare, Invoice, Meeting, ClientNotification,
)
from app.middleware.auth import get_current_user, AuthPayload
from app.schemas.portal import (
    TicketCreate, TicketCommentCreate, FileShareCreate,
    MeetingCreate, AIChatRequest, AIChatResponse,
)

router = APIRouter(prefix="/api/portal", tags=["portal"])


async def require_client(user: AuthPayload = Depends(get_current_user)) -> AuthPayload:
    if user.role != "client":
        raise HTTPException(status_code=403, detail="Forbidden")
    return user


# ─── Projects ────────────────────────────────────────────────────────────────


@router.get("/projects")
async def list_projects(
    client: AuthPayload = Depends(require_client),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(ClientProject).where(ClientProject.client_id == client.id).order_by(ClientProject.created_at.desc())
    )
    return [dict(r._mapping) for r in result.all()]


@router.get("/projects/{id}")
async def get_project(
    id: int,
    client: AuthPayload = Depends(require_client),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(ClientProject).where(ClientProject.id == id, ClientProject.client_id == client.id)
    )
    project = result.scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=404, detail="Not found")
    data = dict(project._mapping)
    milestones = await db.execute(
        select(ProjectMilestone).where(ProjectMilestone.project_id == id).order_by(ProjectMilestone.due_date)
    )
    data["milestones"] = [dict(r._mapping) for r in milestones.all()]
    return data


# ─── Tickets ─────────────────────────────────────────────────────────────────


@router.get("/tickets")
async def list_tickets(
    client: AuthPayload = Depends(require_client),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(SupportTicket).where(SupportTicket.client_id == client.id).order_by(SupportTicket.created_at.desc())
    )
    return [dict(r._mapping) for r in result.all()]


@router.get("/tickets/{id}")
async def get_ticket(
    id: int,
    client: AuthPayload = Depends(require_client),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(SupportTicket).where(SupportTicket.id == id, SupportTicket.client_id == client.id)
    )
    ticket = result.scalar_one_or_none()
    if not ticket:
        raise HTTPException(status_code=404, detail="Not found")
    data = dict(ticket._mapping)
    comments = await db.execute(
        select(TicketComment).where(TicketComment.ticket_id == id).order_by(TicketComment.created_at)
    )
    data["comments"] = [dict(r._mapping) for r in comments.all()]
    return data


@router.post("/tickets", status_code=201)
async def create_ticket(
    data: TicketCreate,
    client: AuthPayload = Depends(require_client),
    db: AsyncSession = Depends(get_db),
):
    ticket = SupportTicket(
        client_id=client.id, project_id=data.project_id,
        subject=data.subject, description=data.description, priority=data.priority,
    )
    db.add(ticket)
    await db.flush()
    await db.refresh(ticket)
    return dict(ticket._mapping)


@router.post("/tickets/{id}/comments", status_code=201)
async def add_comment(
    id: int, data: TicketCommentCreate,
    client: AuthPayload = Depends(require_client),
    db: AsyncSession = Depends(get_db),
):
    ticket = await db.execute(
        select(SupportTicket).where(SupportTicket.id == id, SupportTicket.client_id == client.id)
    )
    if not ticket.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Ticket not found")
    comment = TicketComment(ticket_id=id, client_id=client.id, message=data.message, is_admin=False)
    db.add(comment)
    await db.flush()
    await db.refresh(comment)
    return dict(comment._mapping)


# ─── Files ───────────────────────────────────────────────────────────────────


@router.get("/files")
async def list_files(
    client: AuthPayload = Depends(require_client),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(FileShare).where(FileShare.client_id == client.id).order_by(FileShare.created_at.desc())
    )
    return [dict(r._mapping) for r in result.all()]


@router.post("/files", status_code=201)
async def create_file(
    data: FileShareCreate,
    client: AuthPayload = Depends(require_client),
    db: AsyncSession = Depends(get_db),
):
    file = FileShare(
        client_id=client.id, project_id=data.project_id,
        file_name=data.file_name, file_size=data.file_size,
        file_type=data.file_type, file_url=data.file_url, uploaded_by="client",
    )
    db.add(file)
    await db.flush()
    await db.refresh(file)
    return dict(file._mapping)


# ─── Invoices ────────────────────────────────────────────────────────────────


@router.get("/invoices")
async def list_invoices(
    client: AuthPayload = Depends(require_client),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Invoice).where(Invoice.client_id == client.id).order_by(Invoice.created_at.desc())
    )
    return [dict(r._mapping) for r in result.all()]


@router.get("/invoices/{id}")
async def get_invoice(
    id: int,
    client: AuthPayload = Depends(require_client),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Invoice).where(Invoice.id == id, Invoice.client_id == client.id)
    )
    inv = result.scalar_one_or_none()
    if not inv:
        raise HTTPException(status_code=404, detail="Not found")
    return dict(inv._mapping)


# ─── Meetings ────────────────────────────────────────────────────────────────


@router.get("/meetings")
async def list_meetings(
    client: AuthPayload = Depends(require_client),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Meeting).where(Meeting.client_id == client.id).order_by(Meeting.meeting_date.desc())
    )
    return [dict(r._mapping) for r in result.all()]


@router.post("/meetings", status_code=201)
async def create_meeting(
    data: MeetingCreate,
    client: AuthPayload = Depends(require_client),
    db: AsyncSession = Depends(get_db),
):
    meeting = Meeting(
        client_id=client.id, title=data.title, description=data.description,
        meeting_date=data.meeting_date, duration=data.duration, meeting_url=data.meeting_url,
    )
    db.add(meeting)
    await db.flush()
    await db.refresh(meeting)
    return dict(meeting._mapping)


# ─── Notifications ──────────────────────────────────────────────────────────


@router.get("/notifications")
async def list_client_notifications(
    client: AuthPayload = Depends(require_client),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(ClientNotification).where(ClientNotification.client_id == client.id)
        .order_by(ClientNotification.created_at.desc()).limit(50)
    )
    return [dict(r._mapping) for r in result.all()]


@router.put("/notifications/{id}/read")
async def mark_client_notification_read(
    id: int,
    client: AuthPayload = Depends(require_client),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(ClientNotification).where(ClientNotification.id == id, ClientNotification.client_id == client.id)
    )
    notif = result.scalar_one_or_none()
    if notif:
        notif.read = True
        await db.flush()
    return {"ok": True}


@router.put("/notifications/read-all")
async def mark_all_client_notifications_read(
    client: AuthPayload = Depends(require_client),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(ClientNotification).where(ClientNotification.client_id == client.id, ClientNotification.read == False)
    )
    for notif in result.scalars().all():
        notif.read = True
    await db.flush()
    return {"ok": True}


# ─── AI Chat ─────────────────────────────────────────────────────────────────

AI_RESPONSES = {
    "project": "You can view all your projects on the Dashboard. Each project shows progress, milestones, and deadlines.",
    "ticket": "To create a support ticket, go to the Tickets page and click \"New Ticket\". Our team will respond within 24 hours.",
    "invoice": "All your invoices are available on the Invoices page. You can view amounts, due dates, and payment status.",
    "meeting": "To schedule a meeting, go to the Meetings page and click \"Schedule Meeting\". You will receive a confirmation with the meeting link.",
    "file": "Files shared with you are available on the Files page. You can upload and download project-related documents.",
    "notification": "Notifications keep you updated on project progress, ticket responses, and upcoming meetings.",
    "payment": "Payments can be made via bank transfer or mobile money. Invoice details are available on the Invoices page.",
    "deadline": "Your project deadlines are visible on each project detail page. We send reminders before important dates.",
}

AI_KEYWORDS = {
    "project": ["project", "milestone"],
    "ticket": ["ticket", "support", "help"],
    "invoice": ["invoice", "bill", "pay"],
    "meeting": ["meeting", "schedule", "appointment"],
    "file": ["file", "document", "upload"],
    "notification": ["notification", "alert"],
    "payment": ["payment", "pay"],
    "deadline": ["deadline", "due", "progress"],
}


@router.post("/ai/chat")
async def ai_chat(
    data: AIChatRequest,
    client: AuthPayload = Depends(require_client),
):
    msg = data.message.lower()
    reply = "I am Tesle AI Assistant. I can help you with: projects, support tickets, invoices, meetings, file sharing, notifications, and deadlines. How can I assist you today?"

    for key, keywords in AI_KEYWORDS.items():
        if any(kw in msg for kw in keywords):
            reply = AI_RESPONSES[key]
            break

    return {"reply": reply}
