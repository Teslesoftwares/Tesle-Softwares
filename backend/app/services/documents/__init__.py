"""
Enterprise Document Generation Service — Tesle Business OS

Multi-format document generation: PDF, Word, Excel.
Supports invoices, contracts, business reports, and custom templates.
Architecture: Frontend → FastAPI → Document Service → ReportLab / python-docx / openpyxl
"""

from app.services.documents.base import DocumentService, get_document_service
from app.services.documents.pdf_generator import PDFGenerator
from app.services.documents.docx_generator import DOCXGenerator
from app.services.documents.excel_generator import ExcelGenerator
from app.services.documents.invoice_generator import InvoiceGenerator
from app.services.documents.contract_generator import ContractGenerator
from app.services.documents.report_generator import ReportGenerator
from app.services.documents.storage import FileStorage, get_file_storage
from app.services.documents.templates import TemplateEngine, get_template_engine

__all__ = [
    "DocumentService",
    "get_document_service",
    "PDFGenerator",
    "DOCXGenerator",
    "ExcelGenerator",
    "InvoiceGenerator",
    "ContractGenerator",
    "ReportGenerator",
    "FileStorage",
    "get_file_storage",
    "TemplateEngine",
    "get_template_engine",
]
