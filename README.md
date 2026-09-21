# OM Marketing

Website for OM Marketing — ISO 9001:2008 certified supplier of weighing scales,
note counters and mobile accessories in Naroda, Ahmedabad.

- **Frontend** — Next.js 16 (App Router) + Tailwind v4 + Framer Motion
- **Backend** — FastAPI + SQLAlchemy + SQLite

---

## Running it locally

You need **two terminals**. The frontend talks to the backend, so start the
backend first.

### 1. Backend

```bash
cd backend

# First time only. Python 3.13 — pydantic 2.9 has no wheels for 3.14 yet.
python3.13 -m venv venv
./venv/bin/pip install -r requirements.txt

# Copy the template and fill in the real values (see "Email setup" below)
cp .env.example .env

./venv/bin/python -m uvicorn app.main:app --reload --port 8000
```

- API: <http://localhost:8000>
- Interactive docs: <http://localhost:8000/docs>
- Health check: <http://localhost:8000/health> — tells you whether email is wired up

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Site: <http://localhost:3000>

### Seeding products

The database is **not** committed (it holds customer enquiries). To populate a
fresh one, start the backend and run:

```bash
cd backend
./venv/bin/pip install requests
./venv/bin/python add_sample_products.py
```

---

## Email setup

When someone submits the contact form, a quote request or a service booking:

1. the enquiry is **saved to the database** (so a lead is never lost, even if
   email fails),
2. the **customer** gets a branded welcome/confirmation email with a reference
   number,
3. **you** get a notification email with the full details, with the customer's
   address set as `Reply-To` so replying goes straight to them.

Emails send through Gmail SMTP in a background task, so a slow mail server
never makes the customer wait.

### Getting a Gmail app password

An app password is **not** your Google account password.

1. Turn on 2-Step Verification: <https://myaccount.google.com/security>
2. Create an app password: <https://myaccount.google.com/apppasswords>
3. Put the 16 characters in `backend/.env` as `SMTP_PASSWORD` (spaces are fine,
   they get stripped)

```env
SMTP_USER=hetpatelsk@gmail.com
SMTP_PASSWORD=your16charapppassword
MAIL_FROM=hetpatelsk@gmail.com
OWNER_EMAIL=hetpatelsk@gmail.com   # where new-enquiry alerts land
```

If these are blank the site still works — enquiries are saved, and the backend
logs a warning instead of sending mail.

### Reading your leads

Every enquiry is in the `enquiries` table:

```bash
cd backend
sqlite3 om_marketing.db "select id, enquiry_type, name, phone, email, created_at from enquiries order by id desc;"
```

---

## Billing portal

Sign in at **`/admin`** to raise bills.

### First sign-in

The account is created from `ADMIN_USERNAME` / `ADMIN_PASSWORD` in
`backend/.env` the first time the backend starts with an empty user table.
**Change the password from `/admin/settings` straight after your first
sign-in** — after that, editing `.env` has no effect on it.

### Raising a bill

1. `/admin/bills/new` — enter the customer (name is the only required field;
   add a phone for WhatsApp and an email to send it by email)
2. Add items — start typing and your catalogue autocompletes with its price,
   or type anything (services, delivery, labour)
3. Discount, delivery charge, payment mode, notes, and editable terms
4. Save — the invoice number (`OM/2026-27/0001`) and the exact date and time
   are stamped automatically

Numbering restarts each Indian financial year and is never reused.

### Sending it

On the bill page:

- **Send on WhatsApp** — opens WhatsApp to the customer's number with a
  ready-made message containing the bill number, date, amount and a private
  link
- **Email bill with PDF** — sends it from your Gmail with the PDF attached and
  a branded HTML summary in the body
- **PDF** / **Print** — download or print an A4 invoice
- The **bill link** (`/bill/<token>`) lets the customer view and download it
  without signing in. The token is unguessable, the page is never indexed, and
  the link only goes live once the bill is marked *sent*.

### Rules worth knowing

- **No GST.** OM Marketing is MSME (Udyam) registered but not registered under
  GST, so bills carry no GSTIN of ours, no tax columns, and collect no tax.
  Every bill states this. A customer's own GSTIN can be recorded for their
  records.
- Totals are always recomputed on the server — a total sent by the browser is
  ignored.
- Only **drafts** can be deleted. An issued bill is cancelled instead, so its
  number stays in your records.

---

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/products/` | List products (`?category=`, `?limit=`) |
| `GET` | `/api/products/{id}` | One product |
| `GET` | `/api/products/search/?q=` | Search |
| `POST` | `/api/enquiries/contact` | Contact form |
| `POST` | `/api/enquiries/quote` | Quote request (with item list) |
| `POST` | `/api/enquiries/service` | Repair / calibration / AMC booking |
| `POST` | `/api/auth/login` | Admin sign-in (returns a JWT) |
| `GET` | `/api/invoices/` | List bills (admin) |
| `POST` | `/api/invoices/` | Create a bill (admin) |
| `GET` | `/api/invoices/{id}/pdf` | Download the PDF (admin) |
| `POST` | `/api/invoices/{id}/email` | Email the bill with PDF (admin) |
| `GET` | `/api/public/bill/{token}` | The customer's private bill link |

All three enquiry endpoints are rate limited to 5 submissions per IP per
10 minutes and reject bot submissions via a hidden honeypot field.

---

## Deploying

### Frontend (Vercel)

Set these in **Settings → Environment Variables**:

| Variable | Example |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | `https://om-marketing-api.onrender.com` |
| `NEXT_PUBLIC_SITE_URL` | `https://ommarketing.vercel.app` |

### Backend (Render, Railway, Fly…)

The frontend needs the backend to be reachable — products and the enquiry
forms both call it. Set every variable from `backend/.env.example` in the host's
dashboard, and importantly add your live site to `CORS_ORIGINS`:

```env
CORS_ORIGINS=https://ommarketing.vercel.app,http://localhost:3000
```

Start command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

> **Note on the database.** SQLite lives on the container's disk, which most
> hosts wipe on redeploy. For production, attach a persistent volume or move
> `DATABASE_URL` to Postgres — otherwise you will lose stored enquiries (the
> notification emails still arrive either way).

---

## Security notes

- `backend/.env`, `frontend/.env.local` and `*.db` are gitignored. Never commit
  them — the `.env` holds your Gmail app password and the database holds
  customer contact details.
- If an app password is ever exposed, revoke it at
  <https://myaccount.google.com/apppasswords> and generate a new one.
