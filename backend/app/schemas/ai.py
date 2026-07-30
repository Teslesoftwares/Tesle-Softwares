"""AI request/response schemas."""

from __future__ import annotations

from typing import Any, Optional
from pydantic import BaseModel, Field


# ── Chat ─────────────────────────────────────────────────────────────────


class ChatMessage(BaseModel):
    role: str = Field(description="Message role: user, assistant, or system")
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage] = Field(
        min_length=1, description="Conversation history"
    )
    system_prompt: Optional[str] = Field(
        default=None, description="Optional system-level instruction"
    )
    temperature: Optional[float] = Field(
        default=None, ge=0, le=2, description="Override model temperature"
    )
    max_tokens: Optional[int] = Field(
        default=None, ge=1, le=4096, description="Max response tokens"
    )


class ChatResponse(BaseModel):
    content: str
    model: str
    usage: dict[str, Any] = {}


# ── Document Generation ─────────────────────────────────────────────────


class GenerateReportRequest(BaseModel):
    prompt: str = Field(min_length=1, description="Document instructions or content")
    doc_type: str = Field(
        default="report",
        description="Document type: report, proposal, summary, email, contract, invoice, meeting_notes, custom",
    )
    context: Optional[dict[str, Any]] = Field(
        default=None, description="Optional context data"
    )
    output_format: str = Field(
        default="markdown", description="Output format: markdown, text, html"
    )
    title: Optional[str] = Field(default=None, description="Document title")


class GenerateReportResponse(BaseModel):
    content: str
    doc_type: str
    format: str


# ── Data Analysis ────────────────────────────────────────────────────────


class AnalyzeDataRequest(BaseModel):
    data: Any = Field(description="Data to analyze (list, dict, or JSON string)")
    analysis_type: str = Field(
        default="summary",
        description="Analysis type: summary, trends, comparison, prediction, anomaly, recommendation, custom",
    )
    instructions: Optional[str] = Field(
        default=None, description="Additional analysis instructions"
    )
    schema_hint: Optional[dict] = Field(
        default=None, alias="schema", description="Expected output schema"
    )


class AnalyzeDataResponse(BaseModel):
    analysis_type: str
    result: dict[str, Any]
    summary: str
