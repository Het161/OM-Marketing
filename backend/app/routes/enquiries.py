# backend/app/routes/enquiries.py

"""
Endpoints that capture leads from the website.

Every submission does the same three things:
  1. validate the input (Pydantic schemas + a honeypot field)
  2. save an Enquiry row, so a lead is never lost even if email fails
  3. queue two emails in the background — welcome to the customer,
     full details to the owner

Emails are queued rather than awaited so the customer gets an instant response.
"""

import json
import logging
import time
from dataclasses import dataclass
from datetime import datetime
from typing import Optional

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from ..database import get_db
from ..email_service import send_enquiry_emails
from ..models import Enquiry
from ..schemas import ContactCreate, EnquiryAck, QuoteCreate, ServiceCreate

logger = logging.getLogger(__name__)
router = APIRouter()


# ---------------------------------------------------------------------------
# very small in-memory rate limiter: 5 submissions per IP per 10 minutes
# ---------------------------------------------------------------------------

_WINDOW_SECONDS = 600
_MAX_PER_WINDOW = 5
_hits: dict[str, list[float]] = {}


def _rate_limit(request: Request) -> None:
    ip = (request.client.host if request.client else "unknown") or "unknown"
    now = time.time()

    recent = [t for t in _hits.get(ip, []) if now - t < _WINDOW_SECONDS]
    if len(recent) >= _MAX_PER_WINDOW:
        raise HTTPException(
            status_code=429,
            detail="Too many enquiries from this device. Please try again in a few minutes, or call us on 98252 47312.",
        )

    recent.append(now)
    _hits[ip] = recent

    # keep the dict from growing forever
    if len(_hits) > 2000:
        for key in [k for k, v in _hits.items() if not v or now - v[-1] > _WINDOW_SECONDS]:
            _hits.pop(key, None)


# ---------------------------------------------------------------------------
# a detached snapshot, safe to hand to a background task after the session closes
# ---------------------------------------------------------------------------

@dataclass
class EnquirySnapshot:
    id: int
    enquiry_type: str
    name: str
    email: str
    phone: Optional[str]
    company: Optional[str]
    subject: Optional[str]
    message: Optional[str]
    items_summary: Optional[str]
    service_type: Optional[str]
    preferred_date: Optional[str]
    source: Optional[str]
    created_at: datetime

    @classmethod
    def of(cls, row: Enquiry) -> "EnquirySnapshot":
        return cls(
            id=row.id,
            enquiry_type=row.enquiry_type,
            name=row.name,
            email=row.email,
            phone=row.phone,
            company=row.company,
            subject=row.subject,
            message=row.message,
            items_summary=row.items_summary,
            service_type=row.service_type,
            preferred_date=row.preferred_date,
            source=row.source,
            created_at=row.created_at or datetime.utcnow(),
        )


def _save(db: Session, **fields) -> Enquiry:
    row = Enquiry(**fields)
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


def _ack(row: Enquiry, message: str) -> EnquiryAck:
    return EnquiryAck(id=row.id, reference=f"#{row.id:05d}", message=message)


def _reject_bots(payload) -> None:
    """The hidden `website` field is a honeypot — only bots fill it in."""
    if getattr(payload, "website", None):
        logger.info("Rejected honeypot submission from %s", payload.email)
        raise HTTPException(status_code=400, detail="Submission rejected.")


# ---------------------------------------------------------------------------
# POST /api/enquiries/contact
# ---------------------------------------------------------------------------

@router.post("/contact", response_model=EnquiryAck, status_code=201)
async def create_contact_enquiry(
    payload: ContactCreate,
    background_tasks: BackgroundTasks,
    request: Request,
    db: Session = Depends(get_db),
):
    """General contact-form message."""
    _reject_bots(payload)
    _rate_limit(request)

    row = _save(
        db,
        enquiry_type="contact",
        name=payload.name.strip(),
        email=payload.email.lower().strip(),
        phone=(payload.phone or "").strip() or None,
        company=(payload.company or "").strip() or None,
        subject=(payload.subject or "").strip() or None,
        message=payload.message.strip(),
        source=payload.source,
    )

    background_tasks.add_task(send_enquiry_emails, EnquirySnapshot.of(row))
    return _ack(row, "Thanks! We've received your message and emailed you a confirmation.")


# ---------------------------------------------------------------------------
# POST /api/enquiries/quote
# ---------------------------------------------------------------------------

@router.post("/quote", response_model=EnquiryAck, status_code=201)
async def create_quote_request(
    payload: QuoteCreate,
    background_tasks: BackgroundTasks,
    request: Request,
    db: Session = Depends(get_db),
):
    """Quote request submitted from the quote cart."""
    _reject_bots(payload)
    _rate_limit(request)

    lines = []
    total = 0.0
    for item in payload.items:
        line = f"• {item.name} × {item.quantity}"
        if item.price:
            line_total = item.price * item.quantity
            total += line_total
            line += f"  —  ₹{line_total:,.0f}"
        lines.append(line)

    if total:
        lines.append(f"\nIndicative total: ₹{total:,.0f} (excl. GST, before negotiation)")

    row = _save(
        db,
        enquiry_type="quote",
        name=payload.name.strip(),
        email=payload.email.lower().strip(),
        phone=(payload.phone or "").strip() or None,
        company=(payload.company or "").strip() or None,
        subject=f"Quote request — {len(payload.items)} item(s)",
        message=(payload.message or "").strip() or None,
        items_summary="\n".join(lines),
        payload=json.dumps([item.model_dump() for item in payload.items]),
        source=payload.source,
    )

    background_tasks.add_task(send_enquiry_emails, EnquirySnapshot.of(row))
    return _ack(row, "Quote request received. We'll email your pricing shortly.")


# ---------------------------------------------------------------------------
# POST /api/enquiries/service
# ---------------------------------------------------------------------------

@router.post("/service", response_model=EnquiryAck, status_code=201)
async def create_service_request(
    payload: ServiceCreate,
    background_tasks: BackgroundTasks,
    request: Request,
    db: Session = Depends(get_db),
):
    """Repair, calibration, installation, AMC or rental booking."""
    _reject_bots(payload)
    _rate_limit(request)

    row = _save(
        db,
        enquiry_type="service",
        name=payload.name.strip(),
        email=payload.email.lower().strip(),
        phone=(payload.phone or "").strip() or None,
        company=(payload.company or "").strip() or None,
        subject=f"Service request — {payload.service_type}",
        message=(payload.message or "").strip() or None,
        service_type=payload.service_type,
        preferred_date=payload.preferred_date,
        source=payload.source,
    )

    background_tasks.add_task(send_enquiry_emails, EnquirySnapshot.of(row))
    return _ack(row, "Service request booked. Our team will call you to confirm a slot.")
