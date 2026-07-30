from datetime import datetime
from pydantic import BaseModel


class ChatMessageOut(BaseModel):
    id: int
    sender: str
    message: str
    created_at: datetime

    model_config = {"from_attributes": True}


class ChatSessionOut(BaseModel):
    session_id: str
    visitor_name: str | None = None
    visitor_email: str | None = None
    status: str
    created_at: datetime
    messages: list[ChatMessageOut] = []

    model_config = {"from_attributes": True}


class SendMessageIn(BaseModel):
    session_id: str
    message: str
    sender: str = "visitor"


class CreateSessionIn(BaseModel):
    visitor_name: str | None = None
    visitor_email: str | None = None


class CreateSessionOut(BaseModel):
    session_id: str
