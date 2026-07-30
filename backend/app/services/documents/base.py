"""Base document service — orchestrates generation across all formats."""

from __future__ import annotations

import logging
from typing import Any

from app.services.documents.storage import FileStorage, get_file_storage
from app.services.documents.templates import TemplateEngine, get_template_engine

logger = logging.getLogger(__name__)

# Content types by format
CONTENT_TYPES = {
    "pdf": "application/pdf",
    "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
}


class DocumentService:
    """Unified document generation service.

    Orchestrates PDF, DOCX, and Excel generation with template rendering
    and file storage. Products (Business OS, MedClinic, ERP) are isolated
    by storage path prefix.
    """

    def __init__(self) -> None:
        self._storage: FileStorage = get_file_storage()
        self._templates: TemplateEngine = get_template_engine()
        self._generators: dict[str, Any] = {}

    def _get_generator(self, fmt: str):
        """Lazy-load format-specific generator."""
        if fmt not in self._generators:
            if fmt == "pdf":
                from app.services.documents.pdf_generator import PDFGenerator
                self._generators[fmt] = PDFGenerator()
            elif fmt == "docx":
                from app.services.documents.docx_generator import DOCXGenerator
                self._generators[fmt] = DOCXGenerator()
            elif fmt == "xlsx":
                from app.services.documents.excel_generator import ExcelGenerator
                self._generators[fmt] = ExcelGenerator()
            else:
                raise ValueError(f"Unsupported format: {fmt}")
        return self._generators[fmt]

    def render_template(self, template: str, data: dict[str, Any]) -> str:
        """Render a template with data injection."""
        return self._templates.render(template, data)

    def generate(
        self,
        doc_type: str,
        fmt: str,
        data: dict[str, Any],
        product: str = "general",
        filename: str | None = None,
        template: str | None = None,
        options: dict[str, Any] | None = None,
    ) -> dict:
        """Generate a document and store it.

        Args:
            doc_type: Document category (invoice, contract, report, etc.)
            fmt: Output format (pdf, docx, xlsx)
            data: Template data context
            product: Tesle product (business_os, medclinic, erp, general)
            filename: Override filename (auto-generated if None)
            template: Optional template string for content injection
            options: Format-specific options (page_size, orientation, etc.)

        Returns:
            {"path": str, "filename": str, "size": int, "content_type": str}
        """
        generator = self._get_generator(fmt)

        # Render template if provided
        if template:
            rendered = self._templates.render(template, data)
            data = {**data, "_rendered_content": rendered}

        # Generate raw bytes
        options = options or {}
        if fmt == "pdf":
            raw = generator.generate(data, doc_type=doc_type, **options)
        elif fmt == "docx":
            raw = generator.generate(data, doc_type=doc_type, **options)
        elif fmt == "xlsx":
            raw = generator.generate(data, doc_type=doc_type, **options)
        else:
            raise ValueError(f"Unsupported format: {fmt}")

        # Build filename
        if not filename:
            filename = self._default_filename(doc_type, fmt)

        # Store
        result = self._storage.save_bytes(
            data=raw,
            filename=filename,
            product=product,
            doc_type=doc_type,
            content_type=CONTENT_TYPES.get(fmt, "application/octet-stream"),
        )
        return result

    def generate_bytes(
        self,
        doc_type: str,
        fmt: str,
        data: dict[str, Any],
        template: str | None = None,
        options: dict[str, Any] | None = None,
    ) -> bytes:
        """Generate document bytes without storing."""
        generator = self._get_generator(fmt)
        if template:
            rendered = self._templates.render(template, data)
            data = {**data, "_rendered_content": rendered}
        options = options or {}
        if fmt == "pdf":
            return generator.generate(data, doc_type=doc_type, **options)
        elif fmt == "docx":
            return generator.generate(data, doc_type=doc_type, **options)
        elif fmt == "xlsx":
            return generator.generate(data, doc_type=doc_type, **options)
        raise ValueError(f"Unsupported format: {fmt}")

    def get_file(self, path: str) -> bytes:
        """Retrieve a stored file."""
        return self._storage.get_bytes(path)

    def delete_file(self, path: str) -> bool:
        """Delete a stored file."""
        return self._storage.delete(path)

    def list_files(
        self,
        product: str | None = None,
        doc_type: str | None = None,
    ) -> list[dict]:
        """List stored files."""
        return self._storage.list_files(product=product, doc_type=doc_type)

    @staticmethod
    def _default_filename(doc_type: str, fmt: str) -> str:
        from datetime import datetime, timezone
        ts = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
        return f"{doc_type}_{ts}.{fmt}"


class _SingletonHolder:
    _instance: DocumentService | None = None

    def get_instance(self) -> DocumentService:
        if self._instance is None:
            self._instance = DocumentService()
        return self._instance


_holder = _SingletonHolder()


def get_document_service() -> DocumentService:
    return _holder.get_instance()
