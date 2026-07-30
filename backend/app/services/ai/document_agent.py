"""
Document Generation Agent — Tesle AI.

Generates business documents: reports, proposals, summaries, emails, contracts, etc.
Independent module — only depends on AIService, not on business data models.
"""

from __future__ import annotations

import logging
from enum import Enum
from typing import Any

from app.services.ai.ai_service import AIService, get_ai_service

logger = logging.getLogger(__name__)


class DocumentType(str, Enum):
    REPORT = "report"
    PROPOSAL = "proposal"
    SUMMARY = "summary"
    EMAIL = "email"
    CONTRACT = "contract"
    INVOICE = "invoice"
    MEETING_NOTES = "meeting_notes"
    CUSTOM = "custom"


# System prompts keyed by document type
DOCUMENT_PROMPTS: dict[DocumentType, str] = {
    DocumentType.REPORT: (
        "You are a professional report writer for Tesle Platform. "
        "Generate clear, well-structured business reports with sections, "
        "bullet points, and data-driven insights. Use markdown formatting."
    ),
    DocumentType.PROPOSAL: (
        "You are a business proposal writer for Tesle Platform. "
        "Create compelling proposals with executive summary, scope, "
        "timeline, deliverables, and pricing sections."
    ),
    DocumentType.SUMMARY: (
        "You are a concise summarization agent for Tesle Platform. "
        "Extract key points and present them in a clear, scannable format. "
        "Use bullet points and bold headers."
    ),
    DocumentType.EMAIL: (
        "You are a professional email composer for Tesle Platform. "
        "Write clear, professional emails with appropriate tone, "
        "greeting, body, and sign-off. Match the formality to the context."
    ),
    DocumentType.CONTRACT: (
        "You are a contract drafting assistant for Tesle Platform. "
        "Generate formal contract language with clear terms, obligations, "
        "payment schedules, and termination clauses. Use numbered sections."
    ),
    DocumentType.INVOICE: (
        "You are an invoice assistant for Tesle Platform. "
        "Generate professional invoice descriptions and line items "
        "with clear amounts and terms."
    ),
    DocumentType.MEETING_NOTES: (
        "You are a meeting notes assistant for Tesle Platform. "
        "Organize meeting transcripts or notes into structured minutes "
        "with attendees, topics, decisions, and action items."
    ),
    DocumentType.CUSTOM: (
        "You are a professional document writer for Tesle Platform. "
        "Generate high-quality content based on the user's instructions. "
        "Use appropriate formatting and structure."
    ),
}


class DocumentAgent:
    """Generates business documents using the AI service.

    Usage:
        agent = DocumentAgent()
        result = await agent.generate(
            doc_type=DocumentType.REPORT,
            prompt="Q4 sales performance...",
            context={"data": "..."},
        )
    """

    def __init__(self, ai: AIService | None = None) -> None:
        self._ai = ai or get_ai_service()

    async def generate(
        self,
        prompt: str,
        doc_type: DocumentType = DocumentType.REPORT,
        context: dict[str, Any] | None = None,
        output_format: str = "markdown",
        max_tokens: int | None = None,
    ) -> dict[str, Any]:
        """Generate a document of the specified type.

        Args:
            prompt: User's instructions or content to work with.
            doc_type: Type of document to generate.
            context: Optional context data to include (as formatted string).
            output_format: Desired output format (markdown, text, html).
            max_tokens: Optional response length cap.

        Returns:
            {"content": str, "doc_type": str, "format": str}
        """
        system_prompt = DOCUMENT_PROMPTS.get(doc_type, DOCUMENT_PROMPTS[DocumentType.CUSTOM])

        if output_format == "html":
            system_prompt += "\n\nFormat the output as clean HTML (no <html>/<body> wrapper, just content elements)."
        elif output_format == "markdown":
            system_prompt += "\n\nUse markdown formatting with headers, bold, lists, and code blocks where appropriate."

        full_prompt = prompt
        if context:
            context_str = self._format_context(context)
            full_prompt = f"Context:\n{context_str}\n\nTask:\n{prompt}"

        content = await self._ai.complete(
            prompt=full_prompt,
            system_prompt=system_prompt,
        )

        return {
            "content": content,
            "doc_type": doc_type.value,
            "format": output_format,
        }

    async def generate_from_data(
        self,
        data: dict[str, Any],
        doc_type: DocumentType = DocumentType.REPORT,
        title: str | None = None,
        output_format: str = "markdown",
    ) -> dict[str, Any]:
        """Generate a document directly from structured data.

        Useful for auto-generating reports from API data, analytics results, etc.
        """
        data_str = self._format_context(data)
        prompt = (
            f"Generate a professional {doc_type.value} from the following data."
            + (f"\nTitle: {title}" if title else "")
            + f"\n\nData:\n{data_str}"
        )
        return await self.generate(
            prompt=prompt,
            doc_type=doc_type,
            output_format=output_format,
        )

    async def polish(
        self,
        content: str,
        instruction: str = "Polish and improve this document for clarity, grammar, and professionalism.",
        max_tokens: int | None = None,
    ) -> dict[str, Any]:
        """Refine existing content based on instructions."""
        result = await self._ai.complete(
            prompt=f"Original content:\n\n{content}\n\nInstruction: {instruction}",
            system_prompt=(
                "You are a professional editor for Tesle Platform. "
                "Improve the provided content while maintaining its intent and structure. "
                "Return the polished version only."
            ),
        )
        return {"content": result, "format": "polished"}

    @staticmethod
    def _format_context(context: dict[str, Any]) -> str:
        """Format context data into a readable string."""
        parts = []
        for key, value in context.items():
            if isinstance(value, dict):
                items = ", ".join(f"{k}: {v}" for k, v in value.items())
                parts.append(f"- {key}: {items}")
            elif isinstance(value, list):
                items = ", ".join(str(v) for v in value)
                parts.append(f"- {key}: {items}")
            else:
                parts.append(f"- {key}: {value}")
        return "\n".join(parts)
