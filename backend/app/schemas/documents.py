"""Document generation request/response schemas."""

from __future__ import annotations

from datetime import date, datetime
from typing import Any, Optional
from pydantic import BaseModel, Field


# ── Shared ──────────────────────────────────────────────────────────────


class CompanyInfo(BaseModel):
    name: Optional[str] = None
    address: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    website: Optional[str] = None
    logo_url: Optional[str] = None


class LineItem(BaseModel):
    description: str
    quantity: int = 1
    unit_price: float = Field(ge=0)
    amount: Optional[float] = None


class Clause(BaseModel):
    heading: str
    content: str


class Party(BaseModel):
    name: str
    role: str = "Party"
    address: Optional[str] = None
    email: Optional[str] = None


class ReportSection(BaseModel):
    heading: str
    content: str


class DataTable(BaseModel):
    title: Optional[str] = None
    headers: list[str] = []
    rows: list[list[Any]] = []


class ChartData(BaseModel):
    title: Optional[str] = None
    chart_type: str = "bar"
    labels: list[str] = []
    datasets: list[dict[str, Any]] = []


# ── Invoice ─────────────────────────────────────────────────────────────


class InvoiceRequest(BaseModel):
    invoice_number: str = Field(default="INV-0000")
    date: Optional[str] = None
    due_date: Optional[str] = None
    status: str = "pending"
    company: Optional[CompanyInfo] = None
    bill_to: Optional[dict[str, Any]] = None
    items: list[LineItem] = []
    subtotal: Optional[float] = None
    tax_rate: Optional[float] = Field(default=None, ge=0, le=100)
    discount: Optional[float] = Field(default=None, ge=0)
    total: Optional[float] = None
    notes: Optional[str] = None
    footer: Optional[str] = None
    fmt: str = Field(default="pdf", pattern="^(pdf|docx|xlsx)$")
    product: str = "general"
    filename: Optional[str] = None


class InvoiceResponse(BaseModel):
    path: str
    filename: str
    size: int
    content_type: str
    stored_at: str


# ── Contract ────────────────────────────────────────────────────────────


class ContractRequest(BaseModel):
    title: str = "Contract Agreement"
    effective_date: Optional[str] = None
    parties: list[Party] = []
    party_a_name: Optional[str] = None
    party_a_role: Optional[str] = "First Party"
    party_b_name: Optional[str] = None
    party_b_role: Optional[str] = "Second Party"
    clauses: list[Clause] = []
    clause_library: Optional[str] = None
    content: Optional[str] = None
    fmt: str = Field(default="pdf", pattern="^(pdf|docx)$")
    product: str = "general"
    filename: Optional[str] = None


class ContractResponse(BaseModel):
    path: str
    filename: str
    size: int
    content_type: str
    stored_at: str


# ── Business Report ─────────────────────────────────────────────────────


class ReportRequest(BaseModel):
    title: str = "Business Report"
    subtitle: Optional[str] = None
    author: Optional[str] = None
    date: Optional[str] = None
    summary: Optional[str] = None
    sections: list[ReportSection] = []
    tables: list[DataTable] = []
    charts: list[ChartData] = []
    footer: Optional[str] = None
    include_summary: bool = True
    fmt: str = Field(default="pdf", pattern="^(pdf|docx|xlsx)$")
    product: str = "general"
    filename: Optional[str] = None


class ReportResponse(BaseModel):
    path: str
    filename: str
    size: int
    content_type: str
    stored_at: str


# ── Generic Document ────────────────────────────────────────────────────


class DocumentRequest(BaseModel):
    doc_type: str = "document"
    title: Optional[str] = None
    subtitle: Optional[str] = None
    content: Optional[str] = None
    template: Optional[str] = None
    data: dict[str, Any] = {}
    options: dict[str, Any] = {}
    fmt: str = Field(default="pdf", pattern="^(pdf|docx|xlsx)$")
    product: str = "general"
    filename: Optional[str] = None


class DocumentResponse(BaseModel):
    path: str
    filename: str
    size: int
    content_type: str
    stored_at: str


# ── Financial Report ────────────────────────────────────────────────────


class KPI(BaseModel):
    name: str
    value: Any
    change: Optional[str] = None
    period: Optional[str] = None


class FinancialReportRequest(BaseModel):
    title: Optional[str] = None
    kpis: list[KPI] = []
    tables: list[DataTable] = []
    fmt: str = Field(default="xlsx", pattern="^(pdf|docx|xlsx)$")
    product: str = "general"
    filename: Optional[str] = None


class FinancialReportResponse(BaseModel):
    path: str
    filename: str
    size: int
    content_type: str
    stored_at: str


# ── File Management ─────────────────────────────────────────────────────


class FileMetadata(BaseModel):
    path: str
    filename: str
    size: int
    content_type: Optional[str] = None
    stored_at: Optional[str] = None


class FileListResponse(BaseModel):
    files: list[FileMetadata]
    total: int


class ClauseLibraryResponse(BaseModel):
    product: str
    libraries: list[str]


class TemplateRenderRequest(BaseModel):
    template: str
    data: dict[str, Any]


class TemplateRenderResponse(BaseModel):
    rendered: str
