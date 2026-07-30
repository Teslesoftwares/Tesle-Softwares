"""Invoice generator — multi-format invoice creation with product-specific templates."""

from __future__ import annotations

import io
import logging
from typing import Any

from app.services.documents.base import DocumentService, get_document_service

logger = logging.getLogger(__name__)

# Product-specific invoice templates
PRODUCT_TEMPLATES = {
    "business_os": {
        "company": {
            "name": "Tesle Business OS",
            "address": "Enterprise Suite, Nairobi, Kenya",
            "email": "billing@tesle.com",
            "phone": "+254 700 000 000",
        },
        "footer": "Powered by Tesle Business OS | Enterprise Management Platform",
    },
    "medclinic": {
        "company": {
            "name": "Tesle MedClinic",
            "address": "Healthcare Division, Nairobi, Kenya",
            "email": "billing@tesle-medclinic.com",
            "phone": "+254 700 000 001",
        },
        "footer": "Powered by Tesle MedClinic | Healthcare Management Platform",
    },
    "erp": {
        "company": {
            "name": "Tesle ERP",
            "address": "Enterprise Resource Planning, Nairobi, Kenya",
            "email": "billing@tesle-erp.com",
            "phone": "+254 700 000 002",
        },
        "footer": "Powered by Tesle ERP | Enterprise Resource Planning",
    },
}


class InvoiceGenerator:
    """High-level invoice generator.

    Generates invoices in PDF, DOCX, or XLSX format with
    product-specific branding and templates.
    """

    def __init__(self) -> None:
        self._doc_service: DocumentService = get_document_service()

    def generate(
        self,
        data: dict[str, Any],
        fmt: str = "pdf",
        product: str = "general",
        filename: str | None = None,
    ) -> dict:
        """Generate an invoice document.

        Args:
            data: Invoice data (items, bill_to, amounts, etc.)
            fmt: Output format (pdf, docx, xlsx)
            product: Tesle product line (business_os, medclinic, erp)
            filename: Override filename

        Returns:
            Storage metadata dict
        """
        merged = self._merge_product_defaults(data, product)

        # Calculate totals if not provided
        merged = self._calculate_totals(merged)

        if not filename:
            inv_num = merged.get("invoice_number", "INV-0000")
            filename = f"Invoice_{inv_num}.{fmt}"

        return self._doc_service.generate(
            doc_type="invoice",
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
    ) -> bytes:
        """Generate invoice as raw bytes (no storage)."""
        merged = self._merge_product_defaults(data, product)
        merged = self._calculate_totals(merged)
        return self._doc_service.generate_bytes(
            doc_type="invoice",
            fmt=fmt,
            data=merged,
        )

    def _merge_product_defaults(self, data: dict, product: str) -> dict:
        """Merge product-specific defaults into invoice data."""
        defaults = PRODUCT_TEMPLATES.get(product, {})
        company = {**defaults.get("company", {}), **(data.get("company") or {})}
        merged = {**data, "company": company}
        if not merged.get("footer") and defaults.get("footer"):
            merged["footer"] = defaults["footer"]
        return merged

    @staticmethod
    def _calculate_totals(data: dict) -> dict:
        """Auto-calculate subtotal and total if not explicitly set."""
        items = data.get("items", [])
        if not items:
            return data

        if not data.get("subtotal"):
            subtotal = sum(
                float(it.get("quantity", 1)) * float(it.get("unit_price", it.get("price", 0)))
                for it in items
            )
            data["subtotal"] = subtotal

        if not data.get("total"):
            tax_rate = data.get("tax_rate", 0)
            discount = data.get("discount", 0)
            data["total"] = data["subtotal"] * (1 + tax_rate / 100) - discount

        return data
