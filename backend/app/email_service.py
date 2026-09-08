# backend/app/email_service.py

"""
Everything that sends email lives here.

Two mails go out for every enquiry:
  1. a warm welcome / acknowledgement to the customer
  2. a full lead notification to the owner (Het)

Sending happens in a FastAPI BackgroundTask, so a slow or unreachable SMTP
server never makes the customer wait — and never fails their form submission.
"""

import logging
import smtplib
import ssl
from email.message import EmailMessage
from email.utils import formataddr
from typing import Iterable

from .config import settings

logger = logging.getLogger(__name__)

BRAND = "#008080"
BRAND_DARK = "#005757"
ACCENT = "#ffa500"
INK = "#171f24"
MUTED = "#4a5f69"


# ---------------------------------------------------------------------------
# low-level send
# ---------------------------------------------------------------------------

def _send(to: str, subject: str, html: str, text: str, reply_to: str | None = None) -> bool:
    """Send one email. Returns True on success, never raises."""
    if not settings.email_enabled:
        logger.warning(
            "Email not configured (SMTP_USER / SMTP_PASSWORD / OWNER_EMAIL missing) "
            "— skipping mail to %s",
            to,
        )
        return False

    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = formataddr((settings.MAIL_FROM_NAME, settings.MAIL_FROM))
    message["To"] = to
    if reply_to:
        message["Reply-To"] = reply_to

    message.set_content(text)
    message.add_alternative(html, subtype="html")

    try:
        context = ssl.create_default_context()
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=20) as server:
            server.starttls(context=context)
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.send_message(message)
        logger.info("Sent %r to %s", subject, to)
        return True
    except Exception:
        # A failed email must never break the customer's submission — the
        # enquiry is already saved in the database either way.
        logger.exception("Failed sending %r to %s", subject, to)
        return False


# ---------------------------------------------------------------------------
# shared HTML chrome
# ---------------------------------------------------------------------------

def _shell(title: str, preheader: str, body: str) -> str:
    """Wrap body HTML in the branded email shell (table layout for Outlook)."""
    return f"""\
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
</head>
<body style="margin:0;padding:0;background:#eef2f3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<span style="display:none!important;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">{preheader}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f3;padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 14px rgba(13,19,22,.08);">

  <tr><td style="background:linear-gradient(135deg,{BRAND} 0%,{BRAND_DARK} 100%);padding:32px 32px 28px;">
    <div style="color:#ffffff;font-size:24px;font-weight:800;letter-spacing:-.4px;">⚖️ OM MARKETING</div>
    <div style="color:#bfe6e5;font-size:13px;margin-top:6px;letter-spacing:.4px;">
      ISO 9001:2008 CERTIFIED &nbsp;·&nbsp; {settings.BUSINESS_ADDRESS}
    </div>
  </td></tr>

  <tr><td style="padding:32px;">{body}</td></tr>

  <tr><td style="background:#f5f7f8;padding:24px 32px;border-top:1px solid #e3e8ea;">
    <div style="font-size:13px;color:{MUTED};line-height:1.7;">
      <strong style="color:{INK};">{settings.BUSINESS_NAME}</strong><br>
      {settings.BUSINESS_ADDRESS}<br>
      <a href="tel:{settings.BUSINESS_PHONE}" style="color:{BRAND};text-decoration:none;">{settings.BUSINESS_PHONE_DISPLAY}</a>
      &nbsp;·&nbsp;
      <a href="mailto:{settings.BUSINESS_EMAIL}" style="color:{BRAND};text-decoration:none;">{settings.BUSINESS_EMAIL}</a><br>
      <a href="https://instagram.com/ommarketing_scales" style="color:{BRAND};text-decoration:none;">@ommarketing_scales</a>
    </div>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>"""


def _rows(pairs: Iterable[tuple[str, str | None]]) -> str:
    """Render a label/value detail table, skipping empty values."""
    out = []
    for label, value in pairs:
        if not value:
            continue
        safe = str(value).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
        safe = safe.replace("\n", "<br>")
        out.append(
            f'<tr>'
            f'<td style="padding:10px 14px;background:#f5f7f8;border-bottom:1px solid #e3e8ea;'
            f'font-size:13px;color:{MUTED};font-weight:600;white-space:nowrap;vertical-align:top;">{label}</td>'
            f'<td style="padding:10px 14px;border-bottom:1px solid #e3e8ea;'
            f'font-size:14px;color:{INK};">{safe}</td>'
            f'</tr>'
        )
    if not out:
        return ""
    return (
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" '
        'style="border:1px solid #e3e8ea;border-radius:10px;overflow:hidden;margin:8px 0 4px;">'
        + "".join(out)
        + "</table>"
    )


def _button(href: str, label: str, colour: str = BRAND, text_colour: str = "#ffffff") -> str:
    return (
        f'<a href="{href}" style="display:inline-block;background:{colour};color:{text_colour};'
        f'text-decoration:none;font-weight:700;font-size:14px;padding:13px 24px;'
        f'border-radius:10px;margin:4px 6px 4px 0;">{label}</a>'
    )


ENQUIRY_LABELS = {
    "contact": "Contact enquiry",
    "quote": "Quote request",
    "service": "Service / AMC request",
}


# ---------------------------------------------------------------------------
# 1. customer welcome / acknowledgement
# ---------------------------------------------------------------------------

def send_customer_welcome(enquiry) -> bool:
    kind = ENQUIRY_LABELS.get(enquiry.enquiry_type, "Enquiry")
    first_name = (enquiry.name or "there").split()[0]

    if enquiry.enquiry_type == "quote":
        intro = (
            "Thank you for requesting a quote from OM Marketing. Our team is "
            "preparing your pricing now and will send it across shortly."
        )
    elif enquiry.enquiry_type == "service":
        intro = (
            "Thank you for booking a service with OM Marketing. Our technician "
            "team has your request and will call you to confirm a visit slot."
        )
    else:
        intro = (
            "Thank you for getting in touch with OM Marketing. We have received "
            "your message and one of our specialists will get back to you shortly."
        )

    items_html = ""
    if enquiry.items_summary:
        items_html = (
            f'<div style="margin-top:24px;">'
            f'<div style="font-size:13px;font-weight:700;color:{INK};margin-bottom:8px;">'
            f'YOUR REQUESTED ITEMS</div>'
            f'<div style="background:#f5f7f8;border:1px solid #e3e8ea;border-radius:10px;'
            f'padding:14px;font-size:14px;color:{INK};line-height:1.8;white-space:pre-line;">'
            f'{enquiry.items_summary}</div></div>'
        )

    body = f"""
<div style="font-size:13px;font-weight:700;color:{BRAND};letter-spacing:.6px;">WE'VE GOT YOUR REQUEST</div>
<h1 style="margin:8px 0 16px;font-size:26px;line-height:1.25;color:{INK};">Welcome, {first_name}! 👋</h1>
<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:{MUTED};">{intro}</p>

<div style="background:#e6f6f6;border-left:4px solid {BRAND};border-radius:8px;padding:14px 16px;margin:0 0 22px;">
  <div style="font-size:14px;color:{INK};line-height:1.6;">
    <strong>We usually reply within a few working hours.</strong><br>
    Business hours: Monday–Saturday, 9:00&nbsp;AM – 7:00&nbsp;PM.
  </div>
</div>

<div style="font-size:13px;font-weight:700;color:{INK};margin-bottom:8px;">WHAT YOU SENT US</div>
{_rows([
    ("Reference", f"#{enquiry.id:05d}"),
    ("Type", kind),
    ("Name", enquiry.name),
    ("Phone", enquiry.phone),
    ("Company", enquiry.company),
    ("Message", enquiry.message),
])}
{items_html}

<p style="margin:26px 0 12px;font-size:15px;line-height:1.7;color:{MUTED};">
  Need something urgently? Reach us directly:
</p>
<div>
  {_button(f"tel:{settings.BUSINESS_PHONE}", "📞 Call us")}
  {_button(f"https://wa.me/{settings.BUSINESS_PHONE.lstrip('+')}", "💬 WhatsApp", "#25D366")}
  {_button(f"{settings.SITE_URL}/products", "Browse products", "#ffffff", BRAND)}
</div>

<p style="margin:26px 0 0;font-size:14px;line-height:1.7;color:{MUTED};">
  Warm regards,<br><strong style="color:{INK};">Het Patel</strong><br>
  <span style="font-size:13px;">OM Marketing · Weighing Scales, Note Counters &amp; Service</span>
</p>
"""

    text = f"""Welcome, {first_name}!

{intro}

Reference: #{enquiry.id:05d}
Type: {kind}
Name: {enquiry.name}
Phone: {enquiry.phone or '-'}
Message: {enquiry.message or '-'}
{enquiry.items_summary or ''}

We usually reply within a few working hours.
Business hours: Monday-Saturday, 9:00 AM - 7:00 PM.

Call {settings.BUSINESS_PHONE_DISPLAY} or WhatsApp us any time.

Warm regards,
Het Patel
{settings.BUSINESS_NAME}
{settings.BUSINESS_ADDRESS}
"""

    return _send(
        to=enquiry.email,
        subject=f"Thanks for contacting OM Marketing — we've got your {kind.lower()} (#{enquiry.id:05d})",
        html=_shell("Welcome to OM Marketing", intro, body),
        text=text,
        reply_to=settings.BUSINESS_EMAIL,
    )


# ---------------------------------------------------------------------------
# 2. owner lead notification
# ---------------------------------------------------------------------------

def send_owner_notification(enquiry) -> bool:
    kind = ENQUIRY_LABELS.get(enquiry.enquiry_type, "Enquiry")

    items_html = ""
    if enquiry.items_summary:
        items_html = (
            f'<div style="margin-top:20px;">'
            f'<div style="font-size:13px;font-weight:700;color:{INK};margin-bottom:8px;">ITEMS REQUESTED</div>'
            f'<div style="background:#fff8e8;border:1px solid #ffdc8f;border-radius:10px;'
            f'padding:14px;font-size:14px;color:{INK};line-height:1.8;white-space:pre-line;">'
            f'{enquiry.items_summary}</div></div>'
        )

    wa_number = "".join(c for c in (enquiry.phone or "") if c.isdigit())
    if wa_number and len(wa_number) == 10:
        wa_number = "91" + wa_number

    body = f"""
<div style="background:{ACCENT};color:{INK};display:inline-block;padding:6px 12px;border-radius:999px;
     font-size:12px;font-weight:800;letter-spacing:.5px;">🔔 NEW {kind.upper()}</div>
<h1 style="margin:14px 0 6px;font-size:24px;line-height:1.25;color:{INK};">{enquiry.name}</h1>
<p style="margin:0 0 20px;font-size:14px;color:{MUTED};">
  Reference #{enquiry.id:05d} &nbsp;·&nbsp; received {enquiry.created_at:%d %b %Y, %I:%M %p}
</p>

{_rows([
    ("Name", enquiry.name),
    ("Email", enquiry.email),
    ("Phone", enquiry.phone),
    ("Company", enquiry.company),
    ("Subject", enquiry.subject),
    ("Service type", enquiry.service_type),
    ("Preferred date", enquiry.preferred_date),
    ("Message", enquiry.message),
    ("Source page", enquiry.source),
])}
{items_html}

<div style="margin-top:26px;">
  {_button(f"mailto:{enquiry.email}?subject=Re: your enquiry with OM Marketing (%23{enquiry.id:05d})", "✉️ Reply by email")}
  {_button(f"tel:{enquiry.phone}", "📞 Call customer", BRAND_DARK) if enquiry.phone else ""}
  {_button(f"https://wa.me/{wa_number}", "💬 WhatsApp", "#25D366") if wa_number else ""}
</div>

<p style="margin:24px 0 0;font-size:13px;color:{MUTED};line-height:1.6;">
  Replying to this email goes straight to the customer — their address is set as Reply-To.
</p>
"""

    text = f"""NEW {kind.upper()} — #{enquiry.id:05d}

Name:      {enquiry.name}
Email:     {enquiry.email}
Phone:     {enquiry.phone or '-'}
Company:   {enquiry.company or '-'}
Subject:   {enquiry.subject or '-'}
Service:   {enquiry.service_type or '-'}
Date:      {enquiry.preferred_date or '-'}
Source:    {enquiry.source or '-'}
Received:  {enquiry.created_at:%d %b %Y, %I:%M %p}

Message:
{enquiry.message or '-'}

{enquiry.items_summary or ''}
"""

    return _send(
        to=settings.OWNER_EMAIL,
        subject=f"🔔 New {kind.lower()} from {enquiry.name} (#{enquiry.id:05d})",
        html=_shell(f"New {kind}", f"{enquiry.name} — {enquiry.phone or enquiry.email}", body),
        text=text,
        reply_to=enquiry.email,
    )


def send_enquiry_emails(enquiry) -> None:
    """Fire both emails. Used as a FastAPI BackgroundTask."""
    send_customer_welcome(enquiry)
    send_owner_notification(enquiry)
