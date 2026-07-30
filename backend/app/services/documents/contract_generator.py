"""Contract generator — multi-format contract creation with clause management."""

from __future__ import annotations

import logging
from typing import Any

from app.services.documents.base import DocumentService, get_document_service

logger = logging.getLogger(__name__)

# Pre-built clause libraries per product
CLAUSE_LIBRARIES = {
    "business_os": {
        "service_agreement": [
            {
                "heading": "Scope of Services",
                "content": (
                    "The Service Provider agrees to deliver the agreed-upon services "
                    "as outlined in the attached Statement of Work (SOW). Any changes "
                    "to the scope must be documented in a formal change order signed by both parties."
                ),
            },
            {
                "heading": "Service Level Agreement",
                "content": (
                    "The Service Provider guarantees 99.9% uptime for all cloud-hosted services. "
                    "Downtime exceeding this threshold will result in service credits as defined "
                    "in Schedule A. Planned maintenance windows are excluded from uptime calculations."
                ),
            },
            {
                "heading": "Data Protection",
                "content": (
                    "Both parties agree to comply with applicable data protection regulations. "
                    "The Service Provider shall implement appropriate technical and organizational "
                    "measures to ensure the security of personal data processed under this agreement."
                ),
            },
        ],
        "nda": [
            {
                "heading": "Confidential Information",
                "content": (
                    "Confidential Information means any information disclosed by either party "
                    "that is designated as confidential or that reasonably should be understood "
                    "to be confidential given the nature of the information and circumstances of disclosure."
                ),
            },
            {
                "heading": "Obligations",
                "content": (
                    "The receiving party shall: (a) hold all Confidential Information in strict confidence; "
                    "(b) not disclose Confidential Information to any third party without prior written consent; "
                    "(c) use Confidential Information solely for the purposes of this Agreement."
                ),
            },
        ],
    },
    "medclinic": {
        "service_agreement": [
            {
                "heading": "Healthcare Services",
                "content": (
                    "The Provider agrees to deliver healthcare management services including "
                    "patient record management, appointment scheduling, and clinical workflow "
                    "optimization as specified in the attached service schedule."
                ),
            },
            {
                "heading": "Patient Data Confidentiality",
                "content": (
                    "All patient data shall be handled in strict compliance with applicable "
                    "healthcare privacy regulations. The Provider shall implement HIPAA-compliant "
                    "safeguards for all Protected Health Information (PHI)."
                ),
            },
        ],
    },
    "erp": {
        "service_agreement": [
            {
                "heading": "Implementation Scope",
                "content": (
                    "The Provider shall implement and configure the ERP system modules as "
                    "specified in the project plan. This includes data migration, system "
                    "configuration, user training, and post-go-live support."
                ),
            },
            {
                "heading": "Data Migration",
                "content": (
                    "The Provider shall migrate existing business data into the new ERP system "
                    "according to the agreed data mapping specification. Data integrity "
                    "validation shall be performed and documented upon completion."
                ),
            },
        ],
    },
}


class ContractGenerator:
    """High-level contract generator.

    Supports pre-built clause libraries per product and
    custom clause injection.
    """

    def __init__(self) -> None:
        self._doc_service: DocumentService = get_document_service()

    def generate(
        self,
        data: dict[str, Any],
        fmt: str = "pdf",
        product: str = "general",
        filename: str | None = None,
        clause_library: str | None = None,
    ) -> dict:
        """Generate a contract document.

        Args:
            data: Contract data (title, parties, clauses, etc.)
            fmt: Output format (pdf, docx)
            product: Tesle product line
            filename: Override filename
            clause_library: Pre-built clause library key (e.g., 'service_agreement', 'nda')

        Returns:
            Storage metadata dict
        """
        merged = self._prepare_contract(data, product, clause_library)

        if not filename:
            title_slug = merged.get("title", "Contract").replace(" ", "_")
            filename = f"{title_slug}.{fmt}"

        return self._doc_service.generate(
            doc_type="contract",
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
        clause_library: str | None = None,
    ) -> bytes:
        """Generate contract as raw bytes."""
        merged = self._prepare_contract(data, product, clause_library)
        return self._doc_service.generate_bytes(
            doc_type="contract",
            fmt=fmt,
            data=merged,
        )

    def list_clause_libraries(self, product: str | None = None) -> dict[str, list[str]]:
        """List available clause libraries."""
        if product:
            libs = CLAUSE_LIBRARIES.get(product, {})
            return {product: list(libs.keys())}
        return {p: list(libs.keys()) for p, libs in CLAUSE_LIBRARIES.items()}

    def _prepare_contract(
        self,
        data: dict,
        product: str,
        clause_library: str | None,
    ) -> dict:
        """Prepare contract data with merged clauses."""
        merged = dict(data)

        # Merge clause library if specified
        if clause_library:
            product_libs = CLAUSE_LIBRARIES.get(product, {})
            lib_clauses = product_libs.get(clause_library, [])
            existing = merged.get("clauses", [])
            merged["clauses"] = lib_clauses + existing

        # Ensure parties list exists
        if "parties" not in merged:
            merged["parties"] = []
            if merged.get("party_a_name"):
                merged["parties"].append({
                    "name": merged["party_a_name"],
                    "role": merged.get("party_a_role", "First Party"),
                })
            if merged.get("party_b_name"):
                merged["parties"].append({
                    "name": merged["party_b_name"],
                    "role": merged.get("party_b_role", "Second Party"),
                })

        return merged
