"""Document generation API routes — invoices, contracts, reports, file management."""

from __future__ import annotations

import logging
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import Response

from app.middleware.auth import AuthPayload, get_current_user
from app.schemas.documents import (
    ClauseLibraryResponse,
    ContractRequest,
    ContractResponse,
    DocumentRequest,
    DocumentResponse,
    FileListResponse,
    FileMetadata,
    FinancialReportRequest,
    FinancialReportResponse,
    InvoiceRequest,
    InvoiceResponse,
    ReportRequest,
    ReportResponse,
    TemplateRenderRequest,
    TemplateRenderResponse,
)
from app.services.documents.base import CONTENT_TYPES, get_document_service
from app.services.documents.contract_generator import ContractGenerator
from app.services.documents.invoice_generator import InvoiceGenerator
from app.services.documents.report_generator import ReportGenerator
from app.services.documents.templates import get_template_engine

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/documents", tags=["documents"])


# ── Invoices ────────────────────────────────────────────────────────────


@router.post("/invoices/generate", response_model=InvoiceResponse)
async def generate_invoice(
    body: InvoiceRequest,
    user: AuthPayload = Depends(get_current_user),
):
    """Generate an invoice in PDF, DOCX, or XLSX format."""
    try:
        gen = InvoiceGenerator()
        result = gen.generate(
            data=body.model_dump(exclude={"fmt", "product", "filename"}),
            fmt=body.fmt,
            product=body.product,
            filename=body.filename,
        )
        return InvoiceResponse(**result)
    except Exception as exc:
        logger.exception("Invoice generation failed")
        raise HTTPException(status_code=500, detail=f"Invoice generation failed: {exc}")


@router.post("/invoices/preview")
async def preview_invoice(
    body: InvoiceRequest,
    user: AuthPayload = Depends(get_current_user),
):
    """Generate invoice bytes without storing (for preview)."""
    try:
        gen = InvoiceGenerator()
        raw = gen.generate_bytes(
            data=body.model_dump(exclude={"fmt", "product", "filename"}),
            fmt=body.fmt,
            product=body.product,
        )
        content_type = CONTENT_TYPES.get(body.fmt, "application/octet-stream")
        filename = body.filename or f"Invoice_{body.invoice_number}.{body.fmt}"
        return Response(
            content=raw,
            media_type=content_type,
            headers={"Content-Disposition": f'inline; filename="{filename}"'},
        )
    except Exception as exc:
        logger.exception("Invoice preview failed")
        raise HTTPException(status_code=500, detail=f"Invoice preview failed: {exc}")


# ── Contracts ───────────────────────────────────────────────────────────


@router.post("/contracts/generate", response_model=ContractResponse)
async def generate_contract(
    body: ContractRequest,
    user: AuthPayload = Depends(get_current_user),
):
    """Generate a contract in PDF or DOCX format with optional clause library."""
    try:
        gen = ContractGenerator()
        result = gen.generate(
            data=body.model_dump(exclude={"fmt", "product", "filename", "clause_library"}),
            fmt=body.fmt,
            product=body.product,
            filename=body.filename,
            clause_library=body.clause_library,
        )
        return ContractResponse(**result)
    except Exception as exc:
        logger.exception("Contract generation failed")
        raise HTTPException(status_code=500, detail=f"Contract generation failed: {exc}")


@router.post("/contracts/preview")
async def preview_contract(
    body: ContractRequest,
    user: AuthPayload = Depends(get_current_user),
):
    """Generate contract bytes without storing (for preview)."""
    try:
        gen = ContractGenerator()
        raw = gen.generate_bytes(
            data=body.model_dump(exclude={"fmt", "product", "filename", "clause_library"}),
            fmt=body.fmt,
            product=body.product,
            clause_library=body.clause_library,
        )
        content_type = CONTENT_TYPES.get(body.fmt, "application/octet-stream")
        filename = body.filename or f"Contract.{body.fmt}"
        return Response(
            content=raw,
            media_type=content_type,
            headers={"Content-Disposition": f'inline; filename="{filename}"'},
        )
    except Exception as exc:
        logger.exception("Contract preview failed")
        raise HTTPException(status_code=500, detail=f"Contract preview failed: {exc}")


@router.get("/contracts/clause-libraries")
async def list_clause_libraries(
    product: Optional[str] = Query(default=None),
    user: AuthPayload = Depends(get_current_user),
):
    """List available clause libraries for contracts."""
    gen = ContractGenerator()
    libs = gen.list_clause_libraries(product=product)
    result = []
    for prod, lib_names in libs.items():
        result.append(ClauseLibraryResponse(product=prod, libraries=lib_names))
    return result


# ── Business Reports ────────────────────────────────────────────────────


@router.post("/reports/generate", response_model=ReportResponse)
async def generate_report(
    body: ReportRequest,
    user: AuthPayload = Depends(get_current_user),
):
    """Generate a business report in PDF, DOCX, or XLSX format."""
    try:
        gen = ReportGenerator()
        result = gen.generate(
            data=body.model_dump(exclude={"fmt", "product", "filename", "include_summary"}),
            fmt=body.fmt,
            product=body.product,
            filename=body.filename,
            include_summary=body.include_summary,
        )
        return ReportResponse(**result)
    except Exception as exc:
        logger.exception("Report generation failed")
        raise HTTPException(status_code=500, detail=f"Report generation failed: {exc}")


@router.post("/reports/preview")
async def preview_report(
    body: ReportRequest,
    user: AuthPayload = Depends(get_current_user),
):
    """Generate report bytes without storing (for preview)."""
    try:
        gen = ReportGenerator()
        raw = gen.generate_bytes(
            data=body.model_dump(exclude={"fmt", "product", "filename", "include_summary"}),
            fmt=body.fmt,
            product=body.product,
            include_summary=body.include_summary,
        )
        content_type = CONTENT_TYPES.get(body.fmt, "application/octet-stream")
        filename = body.filename or f"Report.{body.fmt}"
        return Response(
            content=raw,
            media_type=content_type,
            headers={"Content-Disposition": f'inline; filename="{filename}"'},
        )
    except Exception as exc:
        logger.exception("Report preview failed")
        raise HTTPException(status_code=500, detail=f"Report preview failed: {exc}")


@router.post("/reports/financial", response_model=FinancialReportResponse)
async def generate_financial_report(
    body: FinancialReportRequest,
    user: AuthPayload = Depends(get_current_user),
):
    """Generate a financial report (best in Excel format with KPIs and data tables)."""
    try:
        gen = ReportGenerator()
        result = gen.generate_financial(
            data=body.model_dump(exclude={"fmt", "product", "filename"}),
            fmt=body.fmt,
            product=body.product,
            filename=body.filename,
        )
        return FinancialReportResponse(**result)
    except Exception as exc:
        logger.exception("Financial report generation failed")
        raise HTTPException(
            status_code=500, detail=f"Financial report generation failed: {exc}"
        )


# ── Generic Document ────────────────────────────────────────────────────


@router.post("/generate", response_model=DocumentResponse)
async def generate_document(
    body: DocumentRequest,
    user: AuthPayload = Depends(get_current_user),
):
    """Generate any document type in any format using the unified endpoint."""
    try:
        svc = get_document_service()
        data = {
            "title": body.title,
            "subtitle": body.subtitle,
            "content": body.content,
            **body.data,
        }
        result = svc.generate(
            doc_type=body.doc_type,
            fmt=body.fmt,
            data=data,
            product=body.product,
            filename=body.filename,
            template=body.template,
            options=body.options,
        )
        return DocumentResponse(**result)
    except Exception as exc:
        logger.exception("Document generation failed")
        raise HTTPException(status_code=500, detail=f"Document generation failed: {exc}")


@router.post("/preview")
async def preview_document(
    body: DocumentRequest,
    user: AuthPayload = Depends(get_current_user),
):
    """Generate document bytes without storing (for preview)."""
    try:
        svc = get_document_service()
        data = {
            "title": body.title,
            "subtitle": body.subtitle,
            "content": body.content,
            **body.data,
        }
        raw = svc.generate_bytes(
            doc_type=body.doc_type,
            fmt=body.fmt,
            data=data,
            template=body.template,
            options=body.options,
        )
        content_type = CONTENT_TYPES.get(body.fmt, "application/octet-stream")
        filename = body.filename or f"{body.doc_type}.{body.fmt}"
        return Response(
            content=raw,
            media_type=content_type,
            headers={"Content-Disposition": f'inline; filename="{filename}"'},
        )
    except Exception as exc:
        logger.exception("Document preview failed")
        raise HTTPException(status_code=500, detail=f"Document preview failed: {exc}")


# ── File Management ─────────────────────────────────────────────────────


@router.get("/files", response_model=FileListResponse)
async def list_files(
    product: Optional[str] = Query(default=None),
    doc_type: Optional[str] = Query(default=None),
    user: AuthPayload = Depends(get_current_user),
):
    """List all stored generated documents."""
    try:
        svc = get_document_service()
        files = svc.list_files(product=product, doc_type=doc_type)
        return FileListResponse(
            files=[FileMetadata(**f) for f in files],
            total=len(files),
        )
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to list files: {exc}")


@router.get("/files/download/{path:path}")
async def download_file(
    path: str,
    user: AuthPayload = Depends(get_current_user),
):
    """Download a stored document by its storage path."""
    try:
        svc = get_document_service()
        raw = svc.get_file(path)
        # Determine content type from extension
        ext = path.rsplit(".", 1)[-1] if "." in path else "bin"
        content_type = CONTENT_TYPES.get(ext, "application/octet-stream")
        filename = path.rsplit("/", 1)[-1]
        return Response(
            content=raw,
            media_type=content_type,
            headers={"Content-Disposition": f'attachment; filename="{filename}"'},
        )
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="File not found")
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Download failed: {exc}")


@router.delete("/files/{path:path}")
async def delete_file(
    path: str,
    user: AuthPayload = Depends(get_current_user),
):
    """Delete a stored document."""
    try:
        svc = get_document_service()
        deleted = svc.delete_file(path)
        if not deleted:
            raise HTTPException(status_code=404, detail="File not found")
        return {"deleted": True, "path": path}
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Delete failed: {exc}")


# ── Template Engine ─────────────────────────────────────────────────────


@router.post("/templates/render", response_model=TemplateRenderResponse)
async def render_template(
    body: TemplateRenderRequest,
    user: AuthPayload = Depends(get_current_user),
):
    """Render a template string with data injection (for preview/testing)."""
    engine = get_template_engine()
    rendered = engine.render(body.template, body.data)
    return TemplateRenderResponse(rendered=rendered)
