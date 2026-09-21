// frontend/src/app/admin/bills/page.tsx

'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FiAlertTriangle,
  FiDownload,
  FiFilePlus,
  FiMail,
  FiMessageCircle,
  FiPhone,
  FiSearch,
} from 'react-icons/fi';

import AdminGuard from '@/components/admin/AdminGuard';
import StatusPill from '@/components/admin/StatusPill';
import {
  adminError,
  billWhatsappLink,
  invoiceApi,
  type InvoiceStats,
  type InvoiceSummary,
} from '@/services/admin';

const filters = [
  { value: 'all', label: 'All' },
  { value: 'draft', label: 'Drafts' },
  { value: 'sent', label: 'Sent' },
  { value: 'paid', label: 'Paid' },
  { value: 'cancelled', label: 'Cancelled' },
];

const inr = (value: number) =>
  `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

function BillsList() {
  const [bills, setBills] = useState<InvoiceSummary[]>([]);
  const [stats, setStats] = useState<InvoiceStats | null>(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setError('');
    try {
      const [list, summary] = await Promise.all([
        invoiceApi.list({ search: search.trim() || undefined, status }),
        invoiceApi.stats(),
      ]);
      setBills(list);
      setStats(summary);
    } catch (err) {
      setError(adminError(err));
    } finally {
      setLoading(false);
    }
  }, [search, status]);

  // Debounce so typing in the search box doesn't hammer the API
  useEffect(() => {
    const timer = window.setTimeout(load, search ? 350 : 0);
    return () => window.clearTimeout(timer);
  }, [load, search]);

  const tiles = useMemo(
    () => [
      { label: 'Bills raised', value: stats ? String(stats.count) : '—' },
      { label: 'Total billed', value: stats ? inr(stats.billed) : '—' },
      { label: 'Received', value: stats ? inr(stats.paid) : '—', tone: 'good' },
      { label: 'Outstanding', value: stats ? inr(stats.outstanding) : '—', tone: 'warn' },
    ],
    [stats],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">Bills</h1>
          <p className="mt-1 text-muted">Create a bill, then send it by WhatsApp or email.</p>
        </div>
        <Link href="/admin/bills/new" className="btn-primary">
          <FiFilePlus aria-hidden /> New bill
        </Link>
      </header>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile) => (
          <div key={tile.label} className="card p-5">
            <span className="block text-[11px] font-bold uppercase tracking-wide text-subtle">
              {tile.label}
            </span>
            <span
              className={`mt-1 block font-[family-name:var(--font-display)] text-2xl font-extrabold ${
                tile.tone === 'good'
                  ? 'text-green-600'
                  : tile.tone === 'warn'
                    ? 'text-accent-700'
                    : 'text-content'
              }`}
            >
              {tile.value}
            </span>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[16rem] flex-1">
          <label htmlFor="bill-search" className="sr-only">
            Search bills
          </label>
          <FiSearch
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle"
          />
          <input
            id="bill-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, company, phone or bill number…"
            className="field pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by status">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setStatus(filter.value)}
              aria-pressed={status === filter.value}
              className={`h-11 rounded-lg px-3.5 text-sm font-semibold transition-colors ${
                status === filter.value
                  ? 'bg-primary-500 text-white'
                  : 'bg-surface text-muted ring-1 ring-line hover:text-content'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <FiAlertTriangle aria-hidden className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="space-y-3" role="status" aria-label="Loading bills">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="skeleton h-24 rounded-2xl" />
          ))}
        </div>
      ) : bills.length === 0 ? (
        <div className="card p-12 text-center">
          <h2 className="mb-2 text-xl font-bold">
            {search || status !== 'all' ? 'No bills match' : 'No bills yet'}
          </h2>
          <p className="mx-auto mb-6 max-w-md text-muted">
            {search || status !== 'all'
              ? 'Try a different search or filter.'
              : 'Create your first bill — it takes about a minute.'}
          </p>
          <Link href="/admin/bills/new" className="btn-primary">
            <FiFilePlus aria-hidden /> New bill
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {bills.map((bill) => (
            <li key={bill.id} className="card p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2.5">
                    <Link
                      href={`/admin/bills/${bill.id}`}
                      className="font-[family-name:var(--font-display)] font-bold hover:text-primary-600 hover:underline"
                    >
                      {bill.invoice_number}
                    </Link>
                    <StatusPill status={bill.status} />
                    {bill.emailed_at && (
                      <span className="text-[11px] text-subtle">
                        emailed {new Date(bill.emailed_at).toLocaleDateString('en-IN')}
                      </span>
                    )}
                  </div>

                  <p className="truncate font-semibold">
                    {bill.business_name || bill.customer_name}
                  </p>
                  {bill.business_name && (
                    <p className="truncate text-sm text-muted">{bill.customer_name}</p>
                  )}
                  <p className="mt-0.5 text-sm text-subtle">
                    {new Date(bill.issued_at).toLocaleString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <span className="font-[family-name:var(--font-display)] text-xl font-extrabold text-primary-600">
                    ₹{bill.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>

                  {/* Per-customer actions */}
                  <div className="flex items-center gap-1.5">
                    {bill.customer_phone && (
                      <>
                        <a
                          href={billWhatsappLink(bill)}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Send ${bill.invoice_number} to ${bill.customer_name} on WhatsApp`}
                          title="Send on WhatsApp"
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#25D366] text-white transition-transform hover:scale-105"
                        >
                          <FiMessageCircle size={17} aria-hidden />
                        </a>
                        <a
                          href={`tel:+91${bill.customer_phone}`}
                          aria-label={`Call ${bill.customer_name}`}
                          title={`Call ${bill.customer_phone}`}
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-3 text-muted transition-colors hover:text-content"
                        >
                          <FiPhone size={17} aria-hidden />
                        </a>
                      </>
                    )}
                    {bill.customer_email && (
                      <Link
                        href={`/admin/bills/${bill.id}#send`}
                        aria-label={`Email ${bill.invoice_number} to ${bill.customer_name}`}
                        title="Email this bill"
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500 text-white transition-transform hover:scale-105"
                      >
                        <FiMail size={17} aria-hidden />
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => invoiceApi.downloadPdf(bill.id, bill.invoice_number)}
                      aria-label={`Download ${bill.invoice_number} as PDF`}
                      title="Download PDF"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-3 text-muted transition-colors hover:text-content"
                    >
                      <FiDownload size={17} aria-hidden />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function BillsPage() {
  return (
    <AdminGuard>
      <BillsList />
    </AdminGuard>
  );
}
