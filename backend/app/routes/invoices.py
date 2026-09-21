# backend/app/routes/invoices.py

"""
Billing endpoints for the admin portal.

Everything under /api/invoices requires a signed-in admin. The only public
route is the shareable bill link, which is protected by an unguessable token
rather than a login, so a customer can open the bill we send them.
"""

import logging
from datetime import datetime
from typing import Optional

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Query, Response
from sqlalchemy import or_
from sqlalchemy.orm import Session, selectinload

from ..config import settings
from ..database import get_db
from ..email_service import send_invoice_email
from ..invoice_pdf import build_invoice_pdf
from ..invoicing import DEFAULT_TERMS, compute_totals, new_public_token, next_invoice_number
from ..models import Invoice, InvoiceItem, User
from ..schemas import (
    InvoiceCreate,
    InvoiceResponse,
    InvoiceStatusUpdate,
    InvoiceSummary,
    InvoiceUpdate,
)
from ..security import get_current_user

logger = logging.getLogger(__name__)
router = APIRouter()

PUBLIC_STATUSES = {"sent", "paid"}


def _load(db: Session, invoice_id: int) -> Invoice:
    invoice = (
        db.query(Invoice)
        .options(selectinload(Invoice.items))
        .filter(Invoice.id == invoice_id)
        .first()
    )
    if not invoice:
        raise HTTPException(status_code=404, detail="That bill no longer exists.")
    return invoice


def _apply(invoice: Invoice, payload: InvoiceCreate, db: Session) -> Invoice:
    """Write the submitted fields onto an invoice and recompute its money."""
    invoice.customer_name = payload.customer_name.strip()
    invoice.customer_email = (payload.customer_email or None)
    invoice.customer_phone = payload.customer_phone
    invoice.customer_address = (payload.customer_address or "").strip() or None

    invoice.business_name = (payload.business_name or "").strip() or None
    invoice.business_gstin = payload.business_gstin
    invoice.business_notes = (payload.business_notes or "").strip() or None

    invoice.payment_mode = (payload.payment_mode or "").strip() or None
    invoice.notes = (payload.notes or "").strip() or None
    invoice.terms = (payload.terms or "").strip() or DEFAULT_TERMS

    # Totals are always computed here — a total sent by the browser is ignored.
    totals = compute_totals(payload.items, payload.discount_amount, payload.delivery_charge)

    invoice.subtotal = totals["subtotal"]
    invoice.discount_amount = totals["discount_amount"]
    invoice.delivery_charge = totals["delivery_charge"]
    invoice.total = totals["total"]
    invoice.amount_in_words = totals["amount_in_words"]

    # Replace the lines wholesale — simpler and safer than diffing them
    invoice.items.clear()
    db.flush()

    for index, (item, amount) in enumerate(zip(payload.items, totals["line_amounts"])):
        invoice.items.append(
            InvoiceItem(
                position=index,
                description=item.description.strip(),
                unit=(item.unit or "Nos").strip() or "Nos",
                quantity=item.quantity,
                rate=item.rate,
                amount=amount,
            )
        )

    return invoice


# ---------------------------------------------------------------------------
# Admin: list / create / read / update / delete
# ---------------------------------------------------------------------------


@router.get("/", response_model=list[InvoiceSummary])
async def list_invoices(
    search: Optional[str] = Query(None, max_length=120),
    status: Optional[str] = Query(None, max_length=20),
    limit: int = Query(100, ge=1, le=500),
    skip: int = Query(0, ge=0),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    query = db.query(Invoice)

    if status and status != "all":
        query = query.filter(Invoice.status == status)

    if search:
        like = f"%{search.strip()}%"
        query = query.filter(
            or_(
                Invoice.customer_name.ilike(like),
                Invoice.business_name.ilike(like),
                Invoice.invoice_number.ilike(like),
                Invoice.customer_phone.ilike(like),
                Invoice.customer_email.ilike(like),
            )
        )

    return (
        query.order_by(Invoice.issued_at.desc(), Invoice.id.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


@router.get("/stats")
async def invoice_stats(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    """Headline numbers for the portal dashboard."""
    rows = db.query(Invoice.status, Invoice.total).all()

    stats = {"count": len(rows), "billed": 0.0, "paid": 0.0, "outstanding": 0.0}
    by_status: dict[str, int] = {}

    for status_value, total in rows:
        by_status[status_value] = by_status.get(status_value, 0) + 1
        if status_value == "cancelled":
            continue
        stats["billed"] += total or 0
        if status_value == "paid":
            stats["paid"] += total or 0
        else:
            stats["outstanding"] += total or 0

    stats = {k: (round(v, 2) if isinstance(v, float) else v) for k, v in stats.items()}
    stats["by_status"] = by_status
    return stats


@router.post("/", response_model=InvoiceResponse, status_code=201)
async def create_invoice(
    payload: InvoiceCreate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    invoice = Invoice(
        invoice_number=next_invoice_number(db),
        public_token=new_public_token(),
        issued_at=datetime.now(),
        status=payload.status if payload.status in {"draft", "sent", "paid"} else "draft",
    )
    db.add(invoice)

    _apply(invoice, payload, db)
    db.commit()
    db.refresh(invoice)

    logger.info("Created invoice %s for %s", invoice.invoice_number, invoice.customer_name)
    return invoice


@router.get("/{invoice_id}", response_model=InvoiceResponse)
async def get_invoice(
    invoice_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    return _load(db, invoice_id)


@router.put("/{invoice_id}", response_model=InvoiceResponse)
async def update_invoice(
    invoice_id: int,
    payload: InvoiceUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    invoice = _load(db, invoice_id)
    _apply(invoice, payload, db)

    if payload.status in {"draft", "sent", "paid", "cancelled"}:
        invoice.status = payload.status

    db.commit()
    db.refresh(invoice)
    return invoice


@router.patch("/{invoice_id}/status", response_model=InvoiceResponse)
async def set_status(
    invoice_id: int,
    payload: InvoiceStatusUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    invoice = _load(db, invoice_id)
    invoice.status = payload.status
    db.commit()
    db.refresh(invoice)
    return invoice


@router.delete("/{invoice_id}", status_code=204)
async def delete_invoice(
    invoice_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    """
    Delete a bill. Only drafts may be removed — an issued invoice is part of
    the books and should be cancelled instead, so its number is never reused.
    """
    invoice = _load(db, invoice_id)

    if invoice.status != "draft":
        raise HTTPException(
            status_code=400,
            detail="Only drafts can be deleted. Mark this bill as cancelled instead — "
            "an issued invoice number must stay in your records.",
        )

    db.delete(invoice)
    db.commit()


# ---------------------------------------------------------------------------
# PDF + email
# ---------------------------------------------------------------------------


def _pdf_response(invoice: Invoice, download: bool) -> Response:
    pdf = build_invoice_pdf(invoice)
    safe_number = invoice.invoice_number.replace("/", "-")
    disposition = "attachment" if download else "inline"
    return Response(
        content=pdf,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f'{disposition}; filename="Invoice-{safe_number}.pdf"',
            "Cache-Control": "no-store",
        },
    )


@router.get("/{invoice_id}/pdf")
async def invoice_pdf(
    invoice_id: int,
    download: bool = Query(True),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    return _pdf_response(_load(db, invoice_id), download)


@router.post("/{invoice_id}/email")
async def email_invoice(
    invoice_id: int,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    """Email the bill to the customer with the PDF attached."""
    invoice = _load(db, invoice_id)

    if not invoice.customer_email:
        raise HTTPException(
            status_code=400,
            detail="This bill has no customer email address. Add one and save, then try again.",
        )

    if not settings.email_enabled:
        raise HTTPException(
            status_code=503,
            detail="Email is not configured on the server, so the bill can't be sent. "
            "You can still download the PDF and send it yourself.",
        )

    # Render now, while the row is definitely loaded, then hand plain data to
    # the background task.
    pdf = build_invoice_pdf(invoice)
    snapshot = {
        "invoice_number": invoice.invoice_number,
        "customer_name": invoice.customer_name,
        "customer_email": invoice.customer_email,
        "business_name": invoice.business_name,
        "total": invoice.total,
        "amount_in_words": invoice.amount_in_words,
        "issued_at": invoice.issued_at,
        "public_url": f"{settings.SITE_URL}/bill/{invoice.public_token}",
        "items": [
            {"description": i.description, "quantity": i.quantity, "amount": i.amount}
            for i in invoice.items
        ],
    }

    background_tasks.add_task(send_invoice_email, snapshot, pdf)

    invoice.emailed_at = datetime.utcnow()
    if invoice.status == "draft":
        invoice.status = "sent"
    db.commit()

    return {
        "message": f"Bill {invoice.invoice_number} is on its way to {invoice.customer_email}.",
        "emailed_at": invoice.emailed_at,
    }


# ---------------------------------------------------------------------------
# Public: the link we send the customer
# ---------------------------------------------------------------------------

public_router = APIRouter()


def _load_public(db: Session, token: str) -> Invoice:
    invoice = (
        db.query(Invoice)
        .options(selectinload(Invoice.items))
        .filter(Invoice.public_token == token)
        .first()
    )
    # A draft has not been issued yet, and a cancelled bill should not be
    # viewable — both look the same as a wrong link from outside.
    if not invoice or invoice.status not in PUBLIC_STATUSES:
        raise HTTPException(status_code=404, detail="This bill link is not valid.")
    return invoice


@public_router.get("/bill/{token}", response_model=InvoiceResponse)
async def public_invoice(token: str, db: Session = Depends(get_db)):
    return _load_public(db, token)


@public_router.get("/bill/{token}/pdf")
async def public_invoice_pdf(
    token: str,
    download: bool = Query(True),
    db: Session = Depends(get_db),
):
    return _pdf_response(_load_public(db, token), download)
