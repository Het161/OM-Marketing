// frontend/src/app/admin/bills/[id]/page.tsx

'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import {
  FiAlertTriangle,
  FiArrowLeft,
  FiCheck,
  FiCopy,
  FiDownload,
  FiEdit2,
  FiExternalLink,
  FiMail,
  FiMessageCircle,
  FiPrinter,
  FiTrash2,
} from 'react-icons/fi';

import AdminGuard from '@/components/admin/AdminGuard';
import BillForm from '@/components/admin/BillForm';
import BillPreview from '@/components/admin/BillPreview';
import StatusPill from '@/components/admin/StatusPill';
import {
  adminError,
  billMailtoLink,
  billWhatsappLink,
  billWhatsappMessage,
  invoiceApi,
  publicBillUrl,
  type Invoice,
  type InvoiceStatus,
} from '@/services/admin';

const STATUSES: InvoiceStatus[] = ['draft', 'sent', 'paid', 'cancelled'];

function BillDetail() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [editing, setEditing] = useState(false);
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState<'link' | 'message' | null>(null);

  const load = useCallback(async () => {
    try {
      setInvoice(await invoiceApi.get(id));
    } catch (err) {
      setError(adminError(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (Number.isFinite(id)) load();
    else {
      setError('That bill reference is not valid.');
      setLoading(false);
    }
  }, [id, load]);

  const copy = async (text: string, what: 'link' | 'message') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(what);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      setError('Your browser blocked the copy. Select the text and copy it manually.');
    }
  };

  const sendEmail = async () => {
    if (!invoice) return;
    setSending(true);
    setError('');
    setNotice('');
    try {
      const result = await invoiceApi.email(invoice.id);
      setNotice(result.message);
      await load();
    } catch (err) {
      setError(adminError(err));
    } finally {
      setSending(false);
    }
  };

  const changeStatus = async (status: InvoiceStatus) => {
    if (!invoice) return;
    try {
      setInvoice(await invoiceApi.setStatus(invoice.id, status));
      setNotice(`Marked as ${status}.`);
    } catch (err) {
      setError(adminError(err));
    }
  };

  const remove = async () => {
    if (!invoice) return;
    if (!window.confirm(`Delete draft ${invoice.invoice_number}? This cannot be undone.`)) return;
    try {
      await invoiceApi.remove(invoice.id);
      router.push('/admin/bills');
    } catch (err) {
      setError(adminError(err));
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="skeleton mb-4 h-10 w-48" />
        <div className="skeleton h-[60vh] rounded-2xl" />
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="mb-3 text-2xl font-extrabold">Bill not found</h1>
        <p className="mb-6 text-muted">{error || 'It may have been deleted.'}</p>
        <Link href="/admin/bills" className="btn-primary">
          Back to bills
        </Link>
      </div>
    );
  }

  const publicUrl = publicBillUrl(invoice.public_token);
  const isLive = invoice.status === 'sent' || invoice.status === 'paid';

  if (editing) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <button type="button" onClick={() => setEditing(false)} className="btn-ghost mb-4 px-0 text-sm">
          <FiArrowLeft aria-hidden /> Cancel editing
        </button>
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold">Edit {invoice.invoice_number}</h1>
          <p className="mt-1 text-muted">
            The invoice number and its original date and time stay the same.
          </p>
        </header>
        <BillForm existing={invoice} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Link href="/admin/bills" className="btn-ghost mb-4 px-0 text-sm print:hidden">
        <FiArrowLeft aria-hidden /> Back to bills
      </Link>

      <header className="mb-6 flex flex-wrap items-start justify-between gap-4 print:hidden">
        <div>
          <div className="mb-1 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-extrabold">{invoice.invoice_number}</h1>
            <StatusPill status={invoice.status} />
          </div>
          <p className="text-muted">
            {invoice.business_name || invoice.customer_name} · ₹
            {invoice.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setEditing(true)} className="btn-outline h-11 text-sm">
            <FiEdit2 aria-hidden /> Edit
          </button>
          <button type="button" onClick={() => window.print()} className="btn-outline h-11 text-sm">
            <FiPrinter aria-hidden /> Print
          </button>
          <button
            type="button"
            onClick={() => invoiceApi.downloadPdf(invoice.id, invoice.invoice_number)}
            className="btn-primary h-11 text-sm"
          >
            <FiDownload aria-hidden /> PDF
          </button>
        </div>
      </header>

      {notice && (
        <div
          role="status"
          className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800 print:hidden"
        >
          <FiCheck aria-hidden className="mt-0.5 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 print:hidden"
        >
          <FiAlertTriangle aria-hidden className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_21rem] lg:items-start">
        <BillPreview invoice={invoice} />

        {/* Send panel */}
        <aside id="send" className="space-y-5 scroll-mt-24 print:hidden lg:sticky lg:top-24">
          <section className="card p-5">
            <h2 className="mb-1 font-bold">Send this bill</h2>
            <p className="mb-4 text-[13px] leading-relaxed text-muted">
              Both options include a ready-made message. The customer can open the bill
              from the link without signing in.
            </p>

            {!isLive && (
              <p className="mb-4 rounded-lg bg-accent-50 p-3 text-[12px] leading-relaxed text-ink-700">
                This bill is a <strong>draft</strong>, so the public link is not live yet.
                Emailing it marks it as sent; you can also mark it sent below.
              </p>
            )}

            <div className="space-y-2">
              {invoice.customer_phone ? (
                <a
                  href={billWhatsappLink(invoice)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full bg-[#25D366] shadow-none hover:bg-[#1eb855]"
                >
                  <FiMessageCircle aria-hidden /> Send on WhatsApp
                </a>
              ) : (
                <p className="rounded-lg bg-surface-2 p-3 text-[12px] text-subtle">
                  Add a phone number to this bill to enable WhatsApp.
                </p>
              )}

              {invoice.customer_email ? (
                <>
                  <button
                    type="button"
                    onClick={sendEmail}
                    disabled={sending}
                    className="btn-primary w-full"
                  >
                    {sending ? (
                      <>
                        <span
                          className="spinner h-5 w-5 border-2"
                          style={{
                            borderTopColor: '#fff',
                            borderColor: 'rgba(255,255,255,.35)',
                          }}
                          aria-hidden
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        <FiMail aria-hidden /> Email bill with PDF
                      </>
                    )}
                  </button>
                  <a href={billMailtoLink(invoice)} className="btn-ghost w-full text-sm">
                    Or open in my mail app
                  </a>
                </>
              ) : (
                <p className="rounded-lg bg-surface-2 p-3 text-[12px] text-subtle">
                  Add an email address to this bill to send it by email.
                </p>
              )}
            </div>

            {invoice.emailed_at && (
              <p className="mt-3 text-[12px] text-subtle">
                Last emailed {new Date(invoice.emailed_at).toLocaleString('en-IN')}.
              </p>
            )}
          </section>

          {/* Shareable link */}
          <section className="card p-5">
            <h2 className="mb-3 font-bold">Bill link</h2>
            <p className="mb-2 break-all rounded-lg bg-surface-2 p-3 font-mono text-[11px] text-muted">
              {publicUrl}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => copy(publicUrl, 'link')}
                className="btn-outline h-11 flex-1 text-sm"
              >
                {copied === 'link' ? (
                  <>
                    <FiCheck aria-hidden /> Copied
                  </>
                ) : (
                  <>
                    <FiCopy aria-hidden /> Copy link
                  </>
                )}
              </button>
              <a
                href={publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost h-11 px-3 text-sm"
                aria-label="Open the customer's view of this bill"
              >
                <FiExternalLink aria-hidden />
              </a>
            </div>
          </section>

          {/* Message preview */}
          <section className="card p-5">
            <h2 className="mb-3 font-bold">WhatsApp message</h2>
            <pre className="mb-3 max-h-56 overflow-y-auto whitespace-pre-wrap rounded-lg bg-surface-2 p-3 font-sans text-[12px] leading-relaxed text-muted">
              {billWhatsappMessage(invoice)}
            </pre>
            <button
              type="button"
              onClick={() => copy(billWhatsappMessage(invoice), 'message')}
              className="btn-outline h-11 w-full text-sm"
            >
              {copied === 'message' ? (
                <>
                  <FiCheck aria-hidden /> Copied
                </>
              ) : (
                <>
                  <FiCopy aria-hidden /> Copy message
                </>
              )}
            </button>
          </section>

          {/* Status */}
          <section className="card p-5">
            <h2 className="mb-3 font-bold">Status</h2>
            <div className="grid grid-cols-2 gap-2">
              {STATUSES.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => changeStatus(value)}
                  aria-pressed={invoice.status === value}
                  className={`h-11 rounded-lg text-sm font-semibold capitalize transition-colors ${
                    invoice.status === value
                      ? 'bg-primary-500 text-white'
                      : 'bg-surface-2 text-muted hover:text-content'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>

            {invoice.status === 'draft' && (
              <button
                type="button"
                onClick={remove}
                className="btn-ghost mt-3 w-full text-sm text-red-600"
              >
                <FiTrash2 aria-hidden /> Delete draft
              </button>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}

export default function BillDetailPage() {
  return (
    <AdminGuard>
      <BillDetail />
    </AdminGuard>
  );
}
