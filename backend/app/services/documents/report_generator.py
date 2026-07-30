"""Business report generator — multi-format report creation with data visualization."""

from __future__ import annotations

import logging
from datetime import date, datetime
from typing import Any

from app.services.documents.base import DocumentService, get_document_service

logger = logging.getLogger(__name__)

# Report templates per product
REPORT_TEMPLATES = {
    "business_os": {
        "default_sections": [
            {"heading": "Business Overview", "content": "Executive summary of business performance."},
            {"heading": "Key Metrics", "content": "Analysis of primary KPIs and targets."},
            {"heading": "Recommendations", "content": "Strategic recommendations for improvement."},
        ],
    },
    "medclinic": {
        "default_sections": [
            {"heading": "Clinical Overview", "content": "Summary of clinical operations and patient metrics."},
            {"heading": "Patient Statistics", "content": "Patient demographics, visit volumes, and outcomes."},
            {"heading": "Operational Efficiency", "content": "Staff utilization, appointment metrics, and workflow analysis."},
            {"heading": "Compliance", "content": "Regulatory compliance status and audit findings."},
        ],
    },
    "erp": {
        "default_sections": [
            {"heading": "Operations Summary", "content": "Overview of supply chain, inventory, and production metrics."},
            {"heading": "Financial Performance", "content": "Revenue, costs, margins, and budget variance analysis."},
            {"heading": "Inventory Status", "content": "Stock levels, turnover rates, and procurement activity."},
            {"heading": "Supply Chain", "content": "Vendor performance, lead times, and logistics metrics."},
        ],
    },
}


class ReportGenerator:
    """High-level business report generator.

    Creates multi-section reports with data tables, charts (Excel),
    and professional formatting across all supported formats.
    """

    def __init__(self) -> None:
        self._doc_service: DocumentService = get_document_service()

    def generate(
        self,
        data: dict[str, Any],
        fmt: str = "pdf",
        product: str = "general",
        filename: str | None = None,
        include_summary: bool = True,
    ) -> dict:
        """Generate a business report.

        Args:
            data: Report data (title, sections, tables, charts, etc.)
            fmt: Output format (pdf, docx, xlsx)
            product: Tesle product line
            filename: Override filename
            include_summary: Whether to include auto-generated summary

        Returns:
            Storage metadata dict
        """
        merged = self._prepare_report(data, product, include_summary)

        if not filename:
            title_slug = merged.get("title", "Report").replace(" ", "_")
            ts = datetime.utcnow().strftime("%Y%m%d")
            filename = f"{title_slug}_{ts}.{fmt}"

        return self._doc_service.generate(
            doc_type="report",
            fmt=fmt,
            data=merged,
            product=product,
            filename=filename,
        )

    def generate_bytes(
        self,
        data: dict[str, Any],
        fmt: str = "pdf",
        product: str = "general",
        include_summary: bool = True,
    ) -> bytes:
        """Generate report as raw bytes."""
        merged = self._prepare_report(data, product, include_summary)
        return self._doc_service.generate_bytes(
            doc_type="report",
            fmt=fmt,
            data=merged,
        )

    def generate_financial(
        self,
        data: dict[str, Any],
        fmt: str = "xlsx",
        product: str = "general",
        filename: str | None = None,
    ) -> dict:
        """Generate a financial report (best in Excel)."""
        if not filename:
            ts = datetime.utcnow().strftime("%Y%m%d")
            filename = f"Financial_Report_{ts}.{fmt}"

        return self._doc_service.generate(
            doc_type="financial" if fmt == "xlsx" else "report",
            fmt=fmt,
            data=data,
            product=product,
            filename=filename,
        )

    def _prepare_report(
        self,
        data: dict,
        product: str,
        include_summary: bool,
    ) -> dict:
        """Prepare report data with product defaults."""
        merged = dict(data)

        # Add date if missing
        if not merged.get("date"):
            merged["date"] = date.today().isoformat()

        # Merge default sections if none provided
        if not merged.get("sections"):
            tmpl = REPORT_TEMPLATES.get(product, REPORT_TEMPLATES.get("business_os", {}))
            merged["sections"] = tmpl.get("default_sections", [])

        # Auto-generate summary from sections if requested
        if include_summary and not merged.get("summary") and merged.get("sections"):
            summary_parts = []
            for s in merged["sections"][:3]:
                if s.get("content"):
                    summary_parts.append(s["content"][:100])
            merged["summary"] = " ".join(summary_parts) if summary_parts else ""

        return merged
