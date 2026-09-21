// frontend/src/app/bill/[token]/page.tsx

'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiDownload, FiMessageCircle, FiPhone, FiPrinter } from 'react-icons/fi';

import BillPreview from '@/components/admin/BillPreview';
import { site, whatsappLink } from '@/lib/site';
import api from '@/services/api';
import type { Invoice } from '@/services/admin';

/**
 * The customer's view of a bill — reached by the private link we send them.
 * No sign-in: the unguessable token in the URL is the credential.
 */
export default function PublicBillPage() {
  const params = useParams();
  const token = String(params.token ?? '');

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    api
      .get<Invoice>(`/api/public/bill/${token}`)
      .then(({ data }) => {
        if (!cancelled) setInvoice(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [token]);

  const pdfUrl = `${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/public/bill/${token}/pdf`;

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="spinner" role="status" aria-label="Loading your bill" />
      </div>
    );
  }

  if (failed || !invoice) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-xl items-center px-4 py-16">
        <div className="w-full text-center">
          <span className="mb-4 block text-6xl" aria-hidden>
            🧾
          </span>
          <h1 className="mb-3 text-2xl font-extrabold">This bill link isn&apos;t valid</h1>
          <p className="mx-auto mb-8 max-w-md leading-relaxed text-muted">
            The link may be incomplete, or the bill may have been withdrawn. Please
            check the message we sent you, or get in touch and we&apos;ll resend it.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`tel:${site.phoneDial}`} className="btn-primary">
              <FiPhone aria-hidden /> Call {site.phoneDisplay}
            </a>
            <a
              href={whatsappLink('Hello, I need help opening my bill from OM Marketing.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <FiMessageCircle aria-hidden /> WhatsApp us
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-2 px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-[210mm]">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <div>
            <h1 className="text-2xl font-extrabold">Your bill</h1>
            <p className="mt-0.5 text-muted">
              {invoice.invoice_number} from {site.name}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => window.print()} className="btn-outline h-11 text-sm">
              <FiPrinter aria-hidden /> Print
            </button>
            <a href={pdfUrl} className="btn-primary h-11 text-sm" download>
              <FiDownload aria-hidden /> Download PDF
            </a>
          </div>
        </header>

        <BillPreview invoice={invoice} />

        <footer className="mt-8 text-center print:hidden">
          <p className="mb-4 text-sm text-muted">
            Questions about this bill? We&apos;re happy to help.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`tel:${site.phoneDial}`} className="btn-outline">
              <FiPhone aria-hidden /> {site.phoneDisplay}
            </a>
            <a
              href={whatsappLink(
                `Hello OM Marketing, I have a question about invoice ${invoice.invoice_number}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <FiMessageCircle aria-hidden /> WhatsApp
            </a>
          </div>
          <p className="mt-6 text-sm text-subtle">
            <Link href="/" className="hover:text-primary-600 hover:underline">
              {site.name} · {site.addressFull}
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
