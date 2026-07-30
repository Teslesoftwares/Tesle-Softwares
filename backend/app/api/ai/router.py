"""AI API routes — Chat, Document Generation, Data Analysis."""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException

from app.middleware.auth import AuthPayload, get_current_user
from app.schemas.ai import (
    AnalyzeDataRequest,
    AnalyzeDataResponse,
    ChatRequest,
    ChatResponse,
    GenerateReportRequest,
    GenerateReportResponse,
)
from app.services.ai.analytics_agent import AnalysisType, AnalyticsAgent
from app.services.ai.ai_service import get_ai_service
from app.services.ai.document_agent import DocumentAgent, DocumentType

router = APIRouter(prefix="/api/ai", tags=["ai"])


# ── POST /api/ai/chat ──────────────────────────────────────────────────


@router.post("/chat", response_model=ChatResponse)
async def chat(
    body: ChatRequest,
    user: AuthPayload = Depends(get_current_user),
):
    """AI Chat — send a message and get a response.

    Supports multi-turn conversations via the messages array.
    Optionally include a system_prompt for persistent context.
    """
    try:
        service = get_ai_service()
        messages = [m.model_dump() for m in body.messages]
        result = await service.chat(
            messages=messages,
            system_prompt=body.system_prompt,
            temperature=body.temperature,
            max_tokens=body.max_tokens,
        )
        return ChatResponse(
            content=result["content"],
            model=result["model"],
            usage=result.get("usage", {}),
        )
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"AI service error: {exc}")


# ── POST /api/ai/generate-report ───────────────────────────────────────


@router.post("/generate-report", response_model=GenerateReportResponse)
async def generate_report(
    body: GenerateReportRequest,
    user: AuthPayload = Depends(get_current_user),
):
    """Document Generation — generate reports, proposals, emails, etc.

    Use the `doc_type` parameter to control the document format:
    report, proposal, summary, email, contract, invoice, meeting_notes, custom.
    """
    try:
        doc_type = DocumentType(body.doc_type)
    except ValueError:
        valid = [dt.value for dt in DocumentType]
        raise HTTPException(
            status_code=400,
            detail=f"Invalid doc_type '{body.doc_type}'. Must be one of: {valid}",
        )

    try:
        agent = DocumentAgent()
        result = await agent.generate(
            prompt=body.prompt,
            doc_type=doc_type,
            context=body.context,
            output_format=body.output_format,
        )
        return GenerateReportResponse(
            content=result["content"],
            doc_type=result["doc_type"],
            format=result["format"],
        )
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Document generation error: {exc}")


# ── POST /api/ai/analyze-data ──────────────────────────────────────────


@router.post("/analyze-data", response_model=AnalyzeDataResponse)
async def analyze_data(
    body: AnalyzeDataRequest,
    user: AuthPayload = Depends(get_current_user),
):
    """Data Analysis — analyze datasets for insights, trends, anomalies, etc.

    Use the `analysis_type` parameter to control the analysis:
    summary, trends, comparison, prediction, anomaly, recommendation, custom.
    """
    try:
        analysis_type = AnalysisType(body.analysis_type)
    except ValueError:
        valid = [at.value for at in AnalysisType]
        raise HTTPException(
            status_code=400,
            detail=f"Invalid analysis_type '{body.analysis_type}'. Must be one of: {valid}",
        )

    try:
        agent = AnalyticsAgent()
        result = await agent.analyze(
            data=body.data,
            analysis_type=analysis_type,
            instructions=body.instructions,
            schema=body.schema_hint,
        )
        return AnalyzeDataResponse(
            analysis_type=result["analysis_type"],
            result=result["result"],
            summary=result["summary"],
        )
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Analysis error: {exc}")
