import logging
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.database.models.chat import ChatSession, ChatMessage
from app.schemas.chat import (
    ChatMessageOut,
    ChatSessionOut,
    SendMessageIn,
    CreateSessionIn,
    CreateSessionOut,
)
from app.websocket.chat_handler import chat_manager

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/chat", tags=["chat"])


@router.post("/sessions", response_model=CreateSessionOut)
async def create_session(body: CreateSessionIn, db: AsyncSession = Depends(get_db)):
    session = ChatSession(visitor_name=body.visitor_name, visitor_email=body.visitor_email)
    db.add(session)
    await db.flush()
    await db.refresh(session)
    return CreateSessionOut(session_id=session.session_id)


@router.get("/sessions/{session_id}", response_model=ChatSessionOut)
async def get_session(session_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ChatSession).where(ChatSession.session_id == session_id))
    session = result.scalar_one_or_none()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session


@router.get("/sessions/{session_id}/messages", response_model=list[ChatMessageOut])
async def get_messages(session_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ChatSession).where(ChatSession.session_id == session_id))
    session = result.scalar_one_or_none()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    msg_result = await db.execute(
        select(ChatMessage)
        .where(ChatMessage.session_id == session.id)
        .order_by(ChatMessage.created_at)
    )
    return msg_result.scalars().all()


@router.post("/messages", response_model=ChatMessageOut)
async def send_message(body: SendMessageIn, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ChatSession).where(ChatSession.session_id == body.session_id))
    session = result.scalar_one_or_none()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    if session.status != "active":
        raise HTTPException(status_code=400, detail="Session is closed")

    msg = ChatMessage(session_id=session.id, sender=body.sender, message=body.message)
    db.add(msg)
    await db.flush()
    await db.refresh(msg)

    await chat_manager.broadcast_to_session(body.session_id, "chat:message", {
        "id": msg.id,
        "sender": msg.sender,
        "message": msg.message,
        "created_at": msg.created_at.isoformat(),
    })

    return msg
