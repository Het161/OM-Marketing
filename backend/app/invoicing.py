# backend/app/invoicing.py

"""
Invoice numbering, money formatting and totals.

Kept apart from the routes so the same rules apply wherever an invoice is
created, and so they can be unit tested on their own.
"""

import secrets
from datetime import datetime

from sqlalchemy import func
from sqlalchemy.orm import Session

from .models import Invoice

# ---------------------------------------------------------------------------
# Indian financial year: 1 April – 31 March
# ---------------------------------------------------------------------------


def financial_year(when: datetime | None = None) -> str:
    """Return the Indian FY label for a date, e.g. '2026-27'."""
    when = when or datetime.now()
    start = when.year if when.month >= 4 else when.year - 1
    return f"{start}-{str(start + 1)[-2:]}"


def next_invoice_number(db: Session, when: datetime | None = None) -> str:
    """
    Build the next sequential invoice number, e.g. OM/2026-27/0007.

    Numbering restarts each financial year, which is what Indian bookkeeping
    expects. The count is taken from the highest existing number in that year
    rather than a row count, so deleting a draft never reissues a number.
    """
    fy = financial_year(when)
    prefix = f"OM/{fy}/"

    highest = 0
    existing = (
        db.query(Invoice.invoice_number)
        .filter(Invoice.invoice_number.like(f"{prefix}%"))
        .all()
    )
    for (number,) in existing:
        tail = number.rsplit("/", 1)[-1]
        if tail.isdigit():
            highest = max(highest, int(tail))

    return f"{prefix}{highest + 1:04d}"


def new_public_token() -> str:
    """Unguessable token for the shareable bill link."""
    return secrets.token_urlsafe(24)


# ---------------------------------------------------------------------------
# Rupees in words — standard on Indian invoices
# ---------------------------------------------------------------------------

_ONES = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen",
]
_TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]


def _two_digits(n: int) -> str:
    if n < 20:
        return _ONES[n]
    tens, ones = divmod(n, 10)
    return _TENS[tens] + (f" {_ONES[ones]}" if ones else "")


def _three_digits(n: int) -> str:
    hundreds, rest = divmod(n, 100)
    parts = []
    if hundreds:
        parts.append(f"{_ONES[hundreds]} Hundred")
    if rest:
        parts.append(_two_digits(rest))
    return " ".join(parts)


def number_to_words(value: int) -> str:
    """Convert a whole number to words using the Indian lakh/crore system."""
    if value == 0:
        return "Zero"
    if value < 0:
        return f"Minus {number_to_words(abs(value))}"

    parts = []
    crore, value = divmod(value, 10_000_000)
    lakh, value = divmod(value, 100_000)
    thousand, value = divmod(value, 1_000)

    if crore:
        parts.append(f"{number_to_words(crore)} Crore")
    if lakh:
        parts.append(f"{_two_digits(lakh)} Lakh")
    if thousand:
        parts.append(f"{_two_digits(thousand)} Thousand")
    if value:
        parts.append(_three_digits(value))

    return " ".join(p for p in parts if p)


def rupees_in_words(amount: float) -> str:
    """'₹1,250.50' -> 'Rupees One Thousand Two Hundred Fifty and Fifty Paise Only'."""
    rupees = int(amount)
    paise = int(round((amount - rupees) * 100))

    # rounding can tip 99.995 over into the next rupee
    if paise == 100:
        rupees += 1
        paise = 0

    words = f"Rupees {number_to_words(rupees)}"
    if paise:
        words += f" and {number_to_words(paise)} Paise"
    return words + " Only"


def format_inr(amount: float) -> str:
    """Format a number in the Indian digit grouping: 1,25,000.00"""
    negative = amount < 0
    whole, frac = divmod(round(abs(amount) * 100), 100)
    digits = str(whole)

    if len(digits) > 3:
        head, tail = digits[:-3], digits[-3:]
        groups = []
        while len(head) > 2:
            groups.insert(0, head[-2:])
            head = head[:-2]
        if head:
            groups.insert(0, head)
        digits = ",".join(groups) + "," + tail

    return f"{'-' if negative else ''}{digits}.{frac:02d}"


# ---------------------------------------------------------------------------
# Totals
# ---------------------------------------------------------------------------


def compute_totals(items, discount_amount: float = 0, delivery_charge: float = 0):
    """
    Work out line amounts and the invoice total.

    The server always recomputes this — a total submitted by the browser is
    never trusted.
    """
    line_amounts = []
    subtotal = 0.0

    for item in items:
        amount = round(float(item.quantity) * float(item.rate), 2)
        line_amounts.append(amount)
        subtotal += amount

    subtotal = round(subtotal, 2)
    discount = round(min(max(float(discount_amount or 0), 0), subtotal), 2)
    delivery = round(max(float(delivery_charge or 0), 0), 2)
    total = round(subtotal - discount + delivery, 2)

    return {
        "line_amounts": line_amounts,
        "subtotal": subtotal,
        "discount_amount": discount,
        "delivery_charge": delivery,
        "total": total,
        "amount_in_words": rupees_in_words(total),
    }


DEFAULT_TERMS = """1. Goods once sold will not be taken back or exchanged.
2. Warranty covers manufacturing defects only, as per the manufacturer's terms.
3. Warranty is void for physical damage, overloading, water ingress or repairs carried out by a third party.
4. Calibration and stamping under the Legal Metrology Act, 2009 is the buyer's responsibility unless stated otherwise.
5. Payment is due within 45 days as per the MSMED Act, 2006.
6. Interest at 18% per annum is chargeable on overdue amounts.
7. Delivery timelines are estimates and subject to stock availability.
8. All disputes are subject to Ahmedabad, Gujarat jurisdiction."""
