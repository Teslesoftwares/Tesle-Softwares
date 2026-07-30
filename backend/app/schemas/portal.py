"""Portal schemas."""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class TicketCreate(BaseModel):
    subject: str
    description: Optional[str] = None
    priority: Optional[str] = "medium"
    project_id: Optional[int] = None


class TicketCommentCreate(BaseModel):
    message: str


class FileShareCreate(BaseModel):
    file_name: str
    file_size: Optional[int] = 0
    file_type: Optional[str] = ""
    file_url: str
    project_id: Optional[int] = None


class MeetingCreate(BaseModel):
    title: str
    description: Optional[str] = None
    meeting_date: datetime
    duration: Optional[int] = 30
    meeting_url: Optional[str] = None


class AIChatRequest(BaseModel):
    message: str


class AIChatResponse(BaseModel):
    reply: str
