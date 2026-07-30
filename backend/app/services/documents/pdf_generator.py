"""PDF generator using ReportLab — invoices, contracts, reports, custom docs."""

from __future__ import annotations

import io
import logging
from typing import Any

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4, letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch, mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

logger = logging.getLogger(__name__)

# ── Brand colors ──────────────────────────────────────────────────────────
TESLE_GOLD = colors.HexColor("#D4A853")
TESLE_DARK = colors.HexColor("#1A1A2E")
TESLE_ACCENT = colors.HexColor("#2D2D44")
TESLE_TEXT = colors.HexColor("#333333")
TESLE_LIGHT = colors.HexColor("#F5F5F5")
TESLE_BORDER = colors.HexColor("#E0E0E0")
TESLE_SUCCESS = colors.HexColor("#27AE60")
TESLE_ERROR = colors.HexColor("#E74C3C")


class PDFGenerator:
    """Generate PDF documents with Tesle branding."""

    PAGE_SIZES = {
        "letter": letter,
        "a4": A4,
    }

    def generate(
        self,
        data: dict[str, Any],
        doc_type: str = "document",
        page_size: str = "a4",
        orientation: str = "portrait",
        margins: dict | None = None,
    ) -> bytes:
        """Generate a PDF document."""
        buf = io.BytesIO()
        ps = self.PAGE_SIZES.get(page_size.lower(), A4)
        m = margins or {"top": 0.75, "bottom": 0.75, "left": 0.75, "right": 0.75}

        doc = SimpleDocTemplate(
            buf,
            pagesize=ps,
            topMargin=m["top"] * inch,
            bottomMargin=m["bottom"] * inch,
            leftMargin=m["left"] * inch,
            rightMargin=m["right"] * inch,
        )

        styles = getSampleStyleSheet()
        elements = self._build_elements(data, doc_type, styles)
        doc.build(elements)

        raw = buf.getvalue()
        buf.close()
        return raw

    def generate_invoice(self, data: dict[str, Any]) -> bytes:
        """Generate a branded invoice PDF."""
        buf = io.BytesIO()
        doc = SimpleDocTemplate(
            buf,
            pagesize=A4,
            topMargin=0.5 * inch,
            bottomMargin=0.5 * inch,
            leftMargin=0.6 * inch,
            rightMargin=0.6 * inch,
        )
        styles = getSampleStyleSheet()
        elements = []

        # Header
        elements.extend(self._invoice_header(data, styles))
        elements.append(Spacer(1, 12))

        # Invoice info bar
        elements.append(self._invoice_info_bar(data, styles))
        elements.append(Spacer(1, 20))

        # Line items table
        elements.append(self._line_items_table(data, styles))
        elements.append(Spacer(1, 12))

        # Totals
        elements.append(self._totals_section(data, styles))
        elements.append(Spacer(1, 20))

        # Notes / footer
        if data.get("notes"):
            elements.extend(self._notes_section(data, styles))

        elements.extend(self._footer(data, styles))

        doc.build(elements)
        raw = buf.getvalue()
        buf.close()
        return raw

    def generate_contract(self, data: dict[str, Any]) -> bytes:
        """Generate a contract PDF with clauses and signature lines."""
        buf = io.BytesIO()
        doc = SimpleDocTemplate(
            buf,
            pagesize=A4,
            topMargin=0.75 * inch,
            bottomMargin=0.75 * inch,
            leftMargin=1 * inch,
            rightMargin=1 * inch,
        )
        styles = getSampleStyleSheet()
        elements = []

        # Title
        title = data.get("title", "Contract Agreement")
        elements.append(Paragraph(title, styles["Title"]))
        elements.append(Spacer(1, 6))
        elements.append(Paragraph(
            f"Effective Date: {data.get('effective_date', 'N/A')}",
            styles["Normal"],
        ))
        elements.append(Spacer(1, 20))

        # Parties
        elements.append(Paragraph("Parties", styles["Heading2"]))
        parties = data.get("parties", [])
        for party in parties:
            name = party.get("name", "")
            role = party.get("role", "")
            elements.append(Paragraph(f"<b>{role}:</b> {name}", styles["Normal"]))
            if party.get("address"):
                elements.append(Paragraph(party["address"], styles["Normal"]))
        elements.append(Spacer(1, 16))

        # Clauses
        clauses = data.get("clauses", [])
        for i, clause in enumerate(clauses, 1):
            heading = clause.get("heading", f"Section {i}")
            content = clause.get("content", "")
            elements.append(Paragraph(f"{i}. {heading}", styles["Heading2"]))
            elements.append(Paragraph(content, styles["Normal"]))
            elements.append(Spacer(1, 10))

        # Custom rendered content
        if data.get("_rendered_content"):
            elements.append(Spacer(1, 12))
            for line in data["_rendered_content"].split("\n"):
                if line.strip():
                    elements.append(Paragraph(line, styles["Normal"]))

        # Signatures
        elements.append(Spacer(1, 30))
        elements.extend(self._signature_blocks(data, styles))

        doc.build(elements)
        raw = buf.getvalue()
        buf.close()
        return raw

    def generate_report(self, data: dict[str, Any]) -> bytes:
        """Generate a business report PDF."""
        buf = io.BytesIO()
        doc = SimpleDocTemplate(
            buf,
            pagesize=A4,
            topMargin=0.75 * inch,
            bottomMargin=0.75 * inch,
            leftMargin=0.75 * inch,
            rightMargin=0.75 * inch,
        )
        styles = getSampleStyleSheet()
        elements = []

        # Cover section
        elements.extend(self._report_cover(data, styles))
        elements.append(PageBreak())

        # Executive summary
        if data.get("summary"):
            elements.append(Paragraph("Executive Summary", styles["Heading1"]))
            elements.append(Paragraph(data["summary"], styles["Normal"]))
            elements.append(Spacer(1, 16))

        # Sections
        sections = data.get("sections", [])
        for section in sections:
            heading = section.get("heading", "")
            content = section.get("content", "")
            elements.append(Paragraph(heading, styles["Heading1"]))
            for para in content.split("\n"):
                if para.strip():
                    elements.append(Paragraph(para.strip(), styles["Normal"]))
            elements.append(Spacer(1, 12))

        # Data tables
        tables = data.get("tables", [])
        for tbl in tables:
            elements.append(Paragraph(tbl.get("title", ""), styles["Heading2"]))
            elements.append(Spacer(1, 6))
            elements.append(self._data_table(tbl, styles))
            elements.append(Spacer(1, 12))

        # Custom rendered content
        if data.get("_rendered_content"):
            elements.append(Spacer(1, 12))
            for line in data["_rendered_content"].split("\n"):
                if line.strip():
                    elements.append(Paragraph(line, styles["Normal"]))

        elements.extend(self._footer(data, styles))
        doc.build(elements)
        raw = buf.getvalue()
        buf.close()
        return raw

    # ── Private helpers ──────────────────────────────────────────────────

    def _build_elements(self, data: dict, doc_type: str, styles) -> list:
        if doc_type == "invoice":
            return self._invoice_elements(data, styles)
        if doc_type == "contract":
            return self._contract_elements(data, styles)
        if doc_type == "report":
            return self._report_elements(data, styles)
        return self._generic_elements(data, styles)

    def _invoice_elements(self, data: dict, styles) -> list:
        elements = []
        elements.extend(self._invoice_header(data, styles))
        elements.append(Spacer(1, 12))
        elements.append(self._invoice_info_bar(data, styles))
        elements.append(Spacer(1, 20))
        elements.append(self._line_items_table(data, styles))
        elements.append(Spacer(1, 12))
        elements.append(self._totals_section(data, styles))
        if data.get("notes"):
            elements.append(Spacer(1, 16))
            elements.extend(self._notes_section(data, styles))
        elements.extend(self._footer(data, styles))
        return elements

    def _contract_elements(self, data: dict, styles) -> list:
        elements = []
        title = data.get("title", "Contract Agreement")
        elements.append(Paragraph(title, styles["Title"]))
        elements.append(Spacer(1, 6))
        elements.append(Paragraph(f"Effective Date: {data.get('effective_date', 'N/A')}", styles["Normal"]))
        elements.append(Spacer(1, 20))

        elements.append(Paragraph("Parties", styles["Heading2"]))
        parties = data.get("parties", [])
        for party in parties:
            elements.append(Paragraph(f"<b>{party.get('role', 'Party')}:</b> {party.get('name', '')}", styles["Normal"]))
            if party.get("address"):
                elements.append(Paragraph(party["address"], styles["Normal"]))
        elements.append(Spacer(1, 16))

        clauses = data.get("clauses", [])
        for i, clause in enumerate(clauses, 1):
            elements.append(Paragraph(f"{i}. {clause.get('heading', f'Section {i}')}", styles["Heading2"]))
            elements.append(Paragraph(clause.get("content", ""), styles["Normal"]))
            elements.append(Spacer(1, 10))

        if data.get("_rendered_content"):
            elements.append(Spacer(1, 12))
            for line in data["_rendered_content"].split("\n"):
                if line.strip():
                    elements.append(Paragraph(line, styles["Normal"]))

        elements.append(Spacer(1, 30))
        elements.extend(self._signature_blocks(data, styles))
        return elements

    def _report_elements(self, data: dict, styles) -> list:
        elements = []
        elements.extend(self._report_cover(data, styles))
        elements.append(PageBreak())

        if data.get("summary"):
            elements.append(Paragraph("Executive Summary", styles["Heading1"]))
            elements.append(Paragraph(data["summary"], styles["Normal"]))
            elements.append(Spacer(1, 16))

        sections = data.get("sections", [])
        for section in sections:
            heading = section.get("heading", "")
            content = section.get("content", "")
            elements.append(Paragraph(heading, styles["Heading1"]))
            for para in content.split("\n"):
                if para.strip():
                    elements.append(Paragraph(para.strip(), styles["Normal"]))
            elements.append(Spacer(1, 12))

        tables = data.get("tables", [])
        for tbl in tables:
            elements.append(Paragraph(tbl.get("title", ""), styles["Heading2"]))
            elements.append(Spacer(1, 6))
            elements.append(self._data_table(tbl, styles))
            elements.append(Spacer(1, 12))

        if data.get("_rendered_content"):
            elements.append(Spacer(1, 12))
            for line in data["_rendered_content"].split("\n"):
                if line.strip():
                    elements.append(Paragraph(line, styles["Normal"]))

        elements.extend(self._footer(data, styles))
        return elements

    def _generic_elements(self, data: dict, styles) -> list:
        elements = []
        if data.get("title"):
            elements.append(Paragraph(data["title"], styles["Title"]))
            elements.append(Spacer(1, 12))
        if data.get("subtitle"):
            elements.append(Paragraph(data["subtitle"], styles["Heading2"]))
            elements.append(Spacer(1, 8))
        content = data.get("content", data.get("_rendered_content", ""))
        if content:
            for line in content.split("\n"):
                if line.strip():
                    elements.append(Paragraph(line.strip(), styles["Normal"]))
        return elements

    def _invoice_header(self, data: dict, styles) -> list:
        elements = []
        company = data.get("company", {})
        elements.append(Paragraph(
            f"<font color='#D4A853' size='22'><b>{company.get('name', 'TESLE')}</b></font>",
            styles["Title"],
        ))
        if company.get("address"):
            elements.append(Paragraph(company["address"], styles["Normal"]))
        if company.get("email") or company.get("phone"):
            contact = " | ".join(filter(None, [company.get("email"), company.get("phone")]))
            elements.append(Paragraph(contact, styles["Normal"]))
        elements.append(Spacer(1, 8))
        # Divider line
        t = Table([[""]],  colWidths=[7 * inch])
        t.setStyle(TableStyle([
            ("LINEBELOW", (0, 0), (-1, -1), 2, TESLE_GOLD),
        ]))
        elements.append(t)
        return elements

    def _invoice_info_bar(self, data: dict, styles) -> Paragraph:
        inv_number = data.get("invoice_number", "INV-0000")
        inv_date = data.get("date", "N/A")
        due_date = data.get("due_date", "N/A")
        status = data.get("status", "pending")
        status_color = "#27AE60" if status == "paid" else "#E74C3C" if status == "overdue" else "#F39C12"

        info = (
            f"<b>Invoice #:</b> {inv_number}  |  "
            f"<b>Date:</b> {inv_date}  |  "
            f"<b>Due:</b> {due_date}  |  "
            f"<font color='{status_color}'><b>Status: {status.upper()}</b></font>"
        )
        return Paragraph(info, styles["Normal"])

    def _line_items_table(self, data: dict, styles) -> Table:
        items = data.get("items", [])
        header = ["#", "Description", "Qty", "Unit Price", "Amount"]
        rows = [header]
        for i, item in enumerate(items, 1):
            qty = item.get("quantity", 1)
            price = float(item.get("unit_price", item.get("price", 0)))
            amount = qty * price
            rows.append([
                str(i),
                item.get("description", item.get("name", "")),
                str(qty),
                f"${price:,.2f}",
                f"${amount:,.2f}",
            ])

        col_widths = [0.4 * inch, 3.2 * inch, 0.6 * inch, 1.2 * inch, 1.2 * inch]
        t = Table(rows, colWidths=col_widths)
        t.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), TESLE_DARK),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, -1), 9),
            ("ALIGN", (0, 0), (0, -1), "CENTER"),
            ("ALIGN", (2, 0), (-1, -1), "RIGHT"),
            ("GRID", (0, 0), (-1, -1), 0.5, TESLE_BORDER),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, TESLE_LIGHT]),
            ("TOPPADDING", (0, 0), (-1, -1), 6),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ("LEFTPADDING", (0, 0), (-1, -1), 6),
            ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ]))
        return t

    def _totals_section(self, data: dict, styles) -> Table:
        subtotal = data.get("subtotal", 0)
        tax_rate = data.get("tax_rate", 0)
        discount = data.get("discount", 0)
        total = data.get("total", 0)

        items = data.get("items", [])
        if not total and items:
            subtotal = sum(
                float(it.get("quantity", 1)) * float(it.get("unit_price", it.get("price", 0)))
                for it in items
            )
            tax_amount = subtotal * (tax_rate / 100) if tax_rate else 0
            total = subtotal + tax_amount - discount

        rows = []
        if subtotal:
            rows.append(["Subtotal:", f"${subtotal:,.2f}"])
        if discount:
            rows.append(["Discount:", f"-${discount:,.2f}"])
        if tax_rate:
            rows.append([f"Tax ({tax_rate}%):", f"${subtotal * tax_rate / 100:,.2f}"])
        rows.append(["Total:", f"${total:,.2f}"])

        t = Table(rows, colWidths=[5 * inch, 1.6 * inch])
        style_cmds = [
            ("ALIGN", (0, 0), (-1, -1), "RIGHT"),
            ("FONTNAME", (0, -1), (-1, -1), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, -1), 10),
            ("LINEABOVE", (0, -1), (-1, -1), 1.5, TESLE_DARK),
            ("TOPPADDING", (0, 0), (-1, -1), 4),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ]
        t.setStyle(TableStyle(style_cmds))
        return t

    def _notes_section(self, data: dict, styles) -> list:
        elements = []
        elements.append(Paragraph("<b>Notes:</b>", styles["Normal"]))
        elements.append(Paragraph(data["notes"], styles["Normal"]))
        return elements

    def _data_table(self, tbl: dict, styles) -> Table:
        headers = tbl.get("headers", [])
        rows = tbl.get("rows", [])
        all_rows = [headers] + rows
        col_w = min(6.5 * inch / max(len(headers), 1), 2 * inch)
        t = Table(all_rows, colWidths=[col_w] * len(headers))
        t.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), TESLE_DARK),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, -1), 8),
            ("GRID", (0, 0), (-1, -1), 0.5, TESLE_BORDER),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, TESLE_LIGHT]),
            ("TOPPADDING", (0, 0), (-1, -1), 4),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ("LEFTPADDING", (0, 0), (-1, -1), 4),
            ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ]))
        return t

    def _report_cover(self, data: dict, styles) -> list:
        elements = []
        elements.append(Spacer(1, 2 * inch))
        elements.append(Paragraph(
            f"<font color='#D4A853' size='28'><b>{data.get('title', 'Business Report')}</b></font>",
            styles["Title"],
        ))
        elements.append(Spacer(1, 12))
        if data.get("subtitle"):
            elements.append(Paragraph(data["subtitle"], styles["Heading2"]))
        if data.get("date"):
            elements.append(Spacer(1, 20))
            elements.append(Paragraph(f"Date: {data['date']}", styles["Normal"]))
        if data.get("author"):
            elements.append(Paragraph(f"Prepared by: {data['author']}", styles["Normal"]))
        return elements

    def _signature_blocks(self, data: dict, styles) -> list:
        elements = []
        parties = data.get("parties", [])
        if len(parties) < 2:
            parties = [
                {"name": data.get("party_a_name", "Party A"), "role": "Authorized Signatory"},
                {"name": data.get("party_b_name", "Party B"), "role": "Authorized Signatory"},
            ]
        for party in parties:
            elements.append(Spacer(1, 24))
            elements.append(Paragraph("_" * 40, styles["Normal"]))
            elements.append(Paragraph(f"<b>{party.get('name', '')}</b>", styles["Normal"]))
            elements.append(Paragraph(party.get("role", ""), styles["Normal"]))
            elements.append(Paragraph(f"Date: {'_' * 20}", styles["Normal"]))
        return elements

    def _footer(self, data: dict, styles) -> list:
        elements = []
        if data.get("footer"):
            elements.append(Spacer(1, 24))
            elements.append(Paragraph(
                f"<font size='8' color='#999999'>{data['footer']}</font>",
                styles["Normal"],
            ))
        return elements
