# backend/app/invoice_pdf.py

"""
Render an invoice to PDF with ReportLab.

ReportLab is pure Python, so this works on Render's free tier without any
system libraries (unlike WeasyPrint, which needs cairo and pango).

OM Marketing is MSME registered but NOT registered under GST, so this is a
plain invoice: no GSTIN of ours, no tax columns, and no tax is collected.
"""

import io
import logging
from datetime import datetime
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.platypus import (
    HRFlowable,
    Image as RLImage,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

from .config import settings
from .invoicing import format_inr

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Fonts
#
# The PDF base-14 fonts (Helvetica et al.) have no glyph for the rupee sign
# U+20B9 — it renders as a black box. So we ship a subset of DejaVu Sans
# (public-domain changes over the permissive Bitstream Vera licence), cut down
# to Latin-1 plus ₹, which keeps it at ~75 KB for both weights.
# ---------------------------------------------------------------------------

FONT_DIR = Path(__file__).parent / "fonts"
FONT_REGULAR = "Helvetica"
FONT_BOLD = "Helvetica-Bold"


def _register_fonts() -> None:
    global FONT_REGULAR, FONT_BOLD

    from reportlab.pdfbase import pdfmetrics
    from reportlab.pdfbase.ttfonts import TTFont

    regular, bold = FONT_DIR / "OMSans.ttf", FONT_DIR / "OMSans-Bold.ttf"
    if not (regular.exists() and bold.exists()):
        logger.warning("Invoice fonts missing from %s — falling back to Helvetica, "
                       "where the rupee sign will not render.", FONT_DIR)
        return

    try:
        pdfmetrics.registerFont(TTFont("OMSans", str(regular)))
        pdfmetrics.registerFont(TTFont("OMSans-Bold", str(bold)))
        pdfmetrics.registerFontFamily("OMSans", normal="OMSans", bold="OMSans-Bold")
        FONT_REGULAR, FONT_BOLD = "OMSans", "OMSans-Bold"
    except Exception:
        logger.exception("Could not register invoice fonts; falling back to Helvetica.")


_register_fonts()

RUPEE = "₹" if FONT_REGULAR == "OMSans" else "Rs."

TEAL = colors.HexColor("#008080")
TEAL_DARK = colors.HexColor("#005757")
TEAL_PALE = colors.HexColor("#e6f6f6")
AMBER = colors.HexColor("#ffa500")
INK = colors.HexColor("#171f24")
MUTED = colors.HexColor("#4a5f69")
LINE = colors.HexColor("#dde3e6")

_base = getSampleStyleSheet()


def _style(name, size=9, leading=12.5, colour=INK, bold=False, align=None, space=0):
    return ParagraphStyle(
        name,
        parent=_base["Normal"],
        fontName=FONT_BOLD if bold else FONT_REGULAR,
        fontSize=size,
        leading=leading,
        textColor=colour,
        alignment=align if align is not None else 0,
        spaceAfter=space,
    )


S = {
    "brand": _style("brand", 19, 22, colors.white, bold=True),
    "brand_sub": _style("brand_sub", 8, 11, colors.HexColor("#bfe6e5")),
    "title": _style("title", 15, 18, colors.white, bold=True, align=TA_RIGHT),
    "title_sub": _style("title_sub", 8.5, 12, colors.HexColor("#bfe6e5"), align=TA_RIGHT),
    "label": _style("label", 7.5, 10, MUTED, bold=True),
    "body": _style("body", 9, 12.5),
    "body_bold": _style("body_bold", 9, 12.5, bold=True),
    "small": _style("small", 8, 11, MUTED),
    "right": _style("right", 9, 12.5, align=TA_RIGHT),
    "right_bold": _style("right_bold", 9, 12.5, bold=True, align=TA_RIGHT),
    "th": _style("th", 8.5, 11, colors.white, bold=True),
    "th_r": _style("th_r", 8.5, 11, colors.white, bold=True, align=TA_RIGHT),
    "terms": _style("terms", 7.6, 10.5, MUTED),
    "foot": _style("foot", 7.5, 10, MUTED, align=TA_CENTER),
}


def _esc(value) -> str:
    """Escape text for ReportLab's mini-HTML paragraphs."""
    return (
        str(value if value is not None else "")
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def _logo_flowable(max_w_mm: float, max_h_mm: float):
    """The invoice logo, scaled to fit. Returns None if the file is missing."""
    path = Path(settings.INVOICE_LOGO_PATH)
    if not path.is_file():
        return None
    try:
        reader = ImageReader(str(path))
        iw, ih = reader.getSize()
        scale = min((max_w_mm * mm) / iw, (max_h_mm * mm) / ih)
        return RLImage(str(path), width=iw * scale, height=ih * scale, mask="auto")
    except Exception:
        logger.exception("Could not load the invoice logo at %s", path)
        return None


def _header(invoice):
    """Teal masthead: business identity on the left, invoice meta on the right."""
    # The registered address goes on the bill, not the shop address — an
    # invoice is a legal document and must match the Udyam registration.
    registration = []
    if settings.UDYAM_NUMBER:
        registration.append(f"Udyam Reg. No. {_esc(settings.UDYAM_NUMBER)}")

    left = [
        Paragraph(_esc(settings.REGISTERED_NAME).upper(), S["brand"]),
        Paragraph(
            f"{_esc(settings.REGISTERED_ADDRESS)}<br/>"
            f"{_esc(settings.BUSINESS_PHONE_DISPLAY)} &nbsp;·&nbsp; {_esc(settings.BUSINESS_EMAIL)}"
            + (f"<br/>{registration[0]}" if registration else ""),
            S["brand_sub"],
        ),
    ]
    right = [
        Paragraph("INVOICE", S["title"]),
        Paragraph(
            f"{_esc(invoice.invoice_number)}<br/>"
            f"{invoice.issued_at:%d %b %Y} at {invoice.issued_at:%I:%M %p}",
            S["title_sub"],
        ),
    ]

    table = Table([[left, right]], colWidths=[105 * mm, 65 * mm])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), TEAL_DARK),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 12),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
            ]
        )
    )

    # The logo is dark navy artwork on white, so it sits on its own white band
    # above the teal masthead rather than disappearing into it.
    logo = _logo_flowable(52, 18)
    if logo is None:
        return [table]

    band = Table([[logo]], colWidths=[170 * mm])
    band.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.white),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("ALIGN", (0, 0), (-1, -1), "LEFT"),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 2),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    return [band, table]


def _parties(invoice):
    """Who it's billed to, and our registration details."""
    bill_to = [Paragraph("BILL TO", S["label"]), Spacer(1, 3)]

    if invoice.business_name:
        bill_to.append(Paragraph(_esc(invoice.business_name), S["body_bold"]))
        bill_to.append(Paragraph(f"Attn: {_esc(invoice.customer_name)}", S["body"]))
    else:
        bill_to.append(Paragraph(_esc(invoice.customer_name), S["body_bold"]))

    if invoice.customer_address:
        bill_to.append(
            Paragraph(_esc(invoice.customer_address).replace("\n", "<br/>"), S["body"])
        )
    contact = []
    if invoice.customer_phone:
        contact.append(_esc(invoice.customer_phone))
    if invoice.customer_email:
        contact.append(_esc(invoice.customer_email))
    if contact:
        bill_to.append(Paragraph(" · ".join(contact), S["body"]))
    if invoice.business_gstin:
        bill_to.append(Paragraph(f"GSTIN: {_esc(invoice.business_gstin)}", S["small"]))

    details = [Paragraph("INVOICE DETAILS", S["label"]), Spacer(1, 3)]
    rows = [
        ("Invoice No.", invoice.invoice_number),
        ("Date", f"{invoice.issued_at:%d %b %Y}"),
        ("Time", f"{invoice.issued_at:%I:%M %p}"),
    ]
    if invoice.payment_mode:
        rows.append(("Payment", invoice.payment_mode))
    meta = Table(
        [[Paragraph(f"{k}", S["small"]), Paragraph(_esc(v), S["body_bold"])] for k, v in rows],
        colWidths=[24 * mm, 44 * mm],
    )
    meta.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 1.5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5),
            ]
        )
    )
    details.append(meta)

    table = Table([[bill_to, details]], colWidths=[102 * mm, 68 * mm])
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    return table


def _items(invoice):
    header = [
        Paragraph("#", S["th"]),
        Paragraph("Description", S["th"]),
        Paragraph("Qty", S["th_r"]),
        Paragraph(f"Rate ({RUPEE})", S["th_r"]),
        Paragraph(f"Amount ({RUPEE})", S["th_r"]),
    ]

    rows = [header]
    for index, item in enumerate(invoice.items, start=1):
        qty = item.quantity
        qty_text = f"{qty:g} {item.unit or ''}".strip()
        rows.append(
            [
                Paragraph(str(index), S["body"]),
                Paragraph(_esc(item.description), S["body"]),
                Paragraph(qty_text, S["right"]),
                Paragraph(format_inr(item.rate), S["right"]),
                Paragraph(format_inr(item.amount), S["right_bold"]),
            ]
        )

    table = Table(
        rows,
        colWidths=[9 * mm, 86 * mm, 20 * mm, 27 * mm, 28 * mm],
        repeatRows=1,
    )
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), TEAL),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("LINEBELOW", (0, 1), (-1, -1), 0.4, LINE),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f7f9fa")]),
                ("BOX", (0, 0), (-1, -1), 0.6, LINE),
            ]
        )
    )
    return table


def _totals(invoice):
    rows = [("Subtotal", format_inr(invoice.subtotal))]
    if invoice.discount_amount:
        rows.append(("Discount", f"- {format_inr(invoice.discount_amount)}"))
    if invoice.delivery_charge:
        rows.append(("Delivery / Installation", format_inr(invoice.delivery_charge)))

    data = [
        [Paragraph(label, S["body"]), Paragraph(f"{RUPEE} {value}", S["right"])]
        for label, value in rows
    ]
    data.append(
        [
            Paragraph("TOTAL", S["body_bold"]),
            Paragraph(f"{RUPEE} {format_inr(invoice.total)}", S["right_bold"]),
        ]
    )

    totals = Table(data, colWidths=[42 * mm, 33 * mm])
    totals.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("LINEABOVE", (0, -1), (-1, -1), 0.8, TEAL),
                ("BACKGROUND", (0, -1), (-1, -1), TEAL_PALE),
                ("TEXTCOLOR", (0, -1), (-1, -1), TEAL_DARK),
            ]
        )
    )

    words = [
        Paragraph("AMOUNT IN WORDS", S["label"]),
        Spacer(1, 3),
        Paragraph(_esc(invoice.amount_in_words or ""), S["body_bold"]),
        Spacer(1, 8),
        Paragraph(
            "GST is not applicable — OM Marketing is not registered under GST.",
            S["small"],
        ),
    ]

    wrapper = Table([[words, totals]], colWidths=[95 * mm, 75 * mm])
    wrapper.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
            ]
        )
    )
    return wrapper


def _footer_blocks(invoice):
    blocks = []

    if invoice.notes:
        blocks += [
            Spacer(1, 10),
            Paragraph("NOTES", S["label"]),
            Spacer(1, 2),
            Paragraph(_esc(invoice.notes).replace("\n", "<br/>"), S["body"]),
        ]

    terms = invoice.terms
    if terms:
        blocks += [
            Spacer(1, 10),
            Paragraph("TERMS &amp; CONDITIONS", S["label"]),
            Spacer(1, 2),
            Paragraph(_esc(terms).replace("\n", "<br/>"), S["terms"]),
        ]

    # The scanned signature sits above the rule when the file is available.
    signature_image = None
    sig_path = Path(settings.SIGNATURE_PATH)
    if sig_path.is_file():
        try:
            reader = ImageReader(str(sig_path))
            iw, ih = reader.getSize()
            scale = min((42 * mm) / iw, (16 * mm) / ih)
            signature_image = RLImage(
                str(sig_path), width=iw * scale, height=ih * scale, mask="auto"
            )
            signature_image.hAlign = "RIGHT"
        except Exception:
            logger.exception("Could not load the signature at %s", sig_path)
    else:
        logger.info("No signature file at %s — printing a blank signing line.", sig_path)

    ours = [Paragraph(f"For <b>{_esc(settings.REGISTERED_NAME).upper()}</b>", S["small"])]
    if signature_image is not None:
        ours += [Spacer(1, 4), signature_image, Spacer(1, 1)]
    else:
        ours.append(Spacer(1, 20))
    ours.append(
        Paragraph(
            '<para align="right">______________________<br/>Authorised Signatory</para>',
            S["small"],
        )
    )

    signature = Table(
        [
            [
                Paragraph(
                    "Customer's acknowledgement<br/><br/><br/>______________________",
                    S["small"],
                ),
                ours,
            ]
        ],
        colWidths=[85 * mm, 85 * mm],
    )
    signature.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("ALIGN", (1, 0), (1, 0), "RIGHT"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 18),
            ]
        )
    )
    blocks.append(signature)
    return blocks


def _page_furniture(canvas, doc):
    """Footer drawn on every page."""
    canvas.saveState()
    width, _ = A4
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.5)
    canvas.line(20 * mm, 16 * mm, width - 20 * mm, 16 * mm)

    canvas.setFont(FONT_REGULAR, 7.2)
    canvas.setFillColor(MUTED)
    footer_bits = [settings.REGISTERED_NAME, settings.REGISTERED_ADDRESS,
                   settings.BUSINESS_PHONE_DISPLAY]
    if settings.UDYAM_NUMBER:
        footer_bits.append(f"Udyam {settings.UDYAM_NUMBER}")
    canvas.drawString(20 * mm, 11.5 * mm, " · ".join(b for b in footer_bits if b))
    canvas.drawRightString(width - 20 * mm, 11.5 * mm, f"Page {doc.page}")
    canvas.restoreState()


def build_invoice_pdf(invoice) -> bytes:
    """Render the invoice and return the PDF bytes."""
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        leftMargin=20 * mm,
        rightMargin=20 * mm,
        topMargin=14 * mm,
        bottomMargin=22 * mm,
        title=f"Invoice {invoice.invoice_number} — {settings.BUSINESS_NAME}",
        author=settings.BUSINESS_NAME,
        subject=f"Invoice for {invoice.customer_name}",
    )

    story = [
        *_header(invoice),
        _parties(invoice),
        HRFlowable(width="100%", thickness=0.6, color=LINE, spaceAfter=8),
        _items(invoice),
        _totals(invoice),
    ]
    story += _footer_blocks(invoice)
    story += [
        Spacer(1, 12),
        Paragraph(
            "Computer-generated invoice. GST is not applicable — "
            f"{_esc(settings.REGISTERED_NAME)} is not registered under GST.",
            S["foot"],
        ),
    ]

    doc.build(story, onFirstPage=_page_furniture, onLaterPages=_page_furniture)
    return buffer.getvalue()
