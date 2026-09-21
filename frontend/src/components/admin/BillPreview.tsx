// frontend/src/components/admin/BillPreview.tsx

import Image from 'next/image';

import { site } from '@/lib/site';
import type { Invoice } from '@/services/admin';

const inr = (value: number) =>
  value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** en-IN gives "03:49 pm"; the PDF uses "03:49 PM", so match it. */
const formatTime = (date: Date) =>
  date
    .toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
    .toUpperCase();

/**
 * On-screen rendering of the bill.
 *
 * Deliberately mirrors the PDF so what Het sees here is what the customer
 * receives. Also used for the public link and for browser printing.
 */
export default function BillPreview({ invoice }: { invoice: Invoice }) {
  const issued = new Date(invoice.issued_at);

  return (
    <article className="bill-sheet mx-auto w-full max-w-[210mm] overflow-hidden rounded-2xl border border-line bg-white text-ink-900 shadow-sm">
      {/* Logo band — the mark is dark navy artwork, so it needs a white ground */}
      <div className="bg-white px-6 pb-2 pt-5">
        <Image
          src="/images/om-solutions-logo.png"
          alt="OM Marketing Solutions"
          width={982}
          height={503}
          priority
          className="h-14 w-auto object-contain"
        />
      </div>

      {/* Masthead */}
      <header className="flex flex-wrap items-start justify-between gap-4 bg-primary-700 px-7 py-6 text-white">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight">
            {site.registeredName.toUpperCase()}
          </p>
          {/* A bill is a legal document, so it carries the registered address
              rather than the Naroda shop address shown on the website. */}
          <p className="mt-1.5 text-[12px] leading-relaxed text-primary-100">
            {site.registeredAddress}
            <br />
            {site.phoneDisplay} · {site.email}
            <br />
            Udyam Reg. No. {site.udyam}
          </p>
        </div>
        <div className="text-right">
          <p className="font-[family-name:var(--font-display)] text-xl font-extrabold">INVOICE</p>
          <p className="mt-1 text-[12px] text-primary-100">
            {invoice.invoice_number}
            <br />
            {issued.toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}{' '}
            at{' '}
            {formatTime(issued)}
          </p>
        </div>
      </header>

      <div className="px-7 py-6">
        {/* Parties */}
        <div className="mb-6 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ink-500">
              Bill to
            </p>
            {invoice.business_name ? (
              <>
                <p className="font-bold">{invoice.business_name}</p>
                <p className="text-sm">Attn: {invoice.customer_name}</p>
              </>
            ) : (
              <p className="font-bold">{invoice.customer_name}</p>
            )}
            {invoice.customer_address && (
              <p className="whitespace-pre-line text-sm text-ink-700">
                {invoice.customer_address}
              </p>
            )}
            <p className="text-sm text-ink-700">
              {[invoice.customer_phone, invoice.customer_email].filter(Boolean).join(' · ')}
            </p>
            {invoice.business_gstin && (
              <p className="mt-0.5 text-[12px] text-ink-500">GSTIN: {invoice.business_gstin}</p>
            )}
          </div>

          <div className="sm:justify-self-end">
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ink-500">
              Invoice details
            </p>
            <dl className="space-y-1 text-sm">
              <div className="flex gap-3">
                <dt className="w-24 text-ink-500">Invoice No.</dt>
                <dd className="font-bold">{invoice.invoice_number}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-24 text-ink-500">Date</dt>
                <dd className="font-bold">
                  {issued.toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-24 text-ink-500">Time</dt>
                <dd className="font-bold">{formatTime(issued)}</dd>
              </div>
              {invoice.payment_mode && (
                <div className="flex gap-3">
                  <dt className="w-24 text-ink-500">Payment</dt>
                  <dd className="font-bold">{invoice.payment_mode}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* Items */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-sm">
            <caption className="sr-only">Items on invoice {invoice.invoice_number}</caption>
            <thead>
              <tr className="bg-primary-500 text-white">
                <th scope="col" className="px-3 py-2.5 text-left font-bold">
                  #
                </th>
                <th scope="col" className="px-3 py-2.5 text-left font-bold">
                  Description
                </th>
                <th scope="col" className="px-3 py-2.5 text-right font-bold">
                  Qty
                </th>
                <th scope="col" className="px-3 py-2.5 text-right font-bold">
                  Rate (₹)
                </th>
                <th scope="col" className="px-3 py-2.5 text-right font-bold">
                  Amount (₹)
                </th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={item.id ?? index} className="border-b border-ink-100 even:bg-ink-50/60">
                  <td className="px-3 py-2.5 align-top">{index + 1}</td>
                  <td className="px-3 py-2.5 align-top">{item.description}</td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-right align-top">
                    {item.quantity} {item.unit}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-right align-top">
                    {inr(item.rate)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-right align-top font-bold">
                    {inr(item.amount ?? item.quantity * item.rate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ink-500">
              Amount in words
            </p>
            <p className="font-bold">{invoice.amount_in_words}</p>
            <p className="mt-3 text-[12px] text-ink-500">
              GST is not applicable — {site.registeredName} is not registered under GST.
            </p>

            {invoice.payment_details && invoice.payment_details.length > 0 && (
              <div className="mt-4 rounded-lg border border-primary-200 bg-primary-50 p-3">
                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ink-500">
                  Payment details
                </p>
                <p className="text-[11.5px] leading-relaxed text-ink-700">
                  {invoice.payment_details.map((detail, index) => (
                    <span key={detail.label}>
                      {index > 0 && <span aria-hidden> · </span>}
                      {detail.label}{' '}
                      <strong className="text-ink-900">{detail.value}</strong>
                    </span>
                  ))}
                </p>
              </div>
            )}
          </div>

          <dl className="space-y-0 self-start text-sm sm:justify-self-end sm:min-w-[16rem]">
            <div className="flex justify-between gap-6 px-3 py-2">
              <dt className="text-ink-700">Subtotal</dt>
              <dd>₹ {inr(invoice.subtotal)}</dd>
            </div>
            {invoice.discount_amount > 0 && (
              <div className="flex justify-between gap-6 px-3 py-2">
                <dt className="text-ink-700">Discount</dt>
                <dd>- ₹ {inr(invoice.discount_amount)}</dd>
              </div>
            )}
            {invoice.delivery_charge > 0 && (
              <div className="flex justify-between gap-6 px-3 py-2">
                <dt className="text-ink-700">Delivery / Installation</dt>
                <dd>₹ {inr(invoice.delivery_charge)}</dd>
              </div>
            )}
            <div className="flex justify-between gap-6 border-t-2 border-primary-500 bg-primary-50 px-3 py-2.5">
              <dt className="font-bold text-primary-800">TOTAL</dt>
              <dd className="font-[family-name:var(--font-display)] font-extrabold text-primary-800">
                ₹ {inr(invoice.total)}
              </dd>
            </div>
          </dl>
        </div>

        {invoice.notes && (
          <div className="mt-6">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.1em] text-ink-500">
              Notes
            </p>
            <p className="whitespace-pre-line text-sm">{invoice.notes}</p>
          </div>
        )}

        {invoice.terms && (
          <div className="mt-6">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.1em] text-ink-500">
              Terms &amp; conditions
            </p>
            <p className="whitespace-pre-line text-[11.5px] leading-relaxed text-ink-600">
              {invoice.terms}
            </p>
          </div>
        )}

        <div className="mt-10 flex justify-between gap-6 text-[12px] text-ink-500">
          <div>
            Customer&apos;s acknowledgement
            <div className="mt-10 w-44 border-t border-ink-300" />
          </div>
          <div className="text-right">
            For <strong className="text-ink-900">{site.registeredName.toUpperCase()}</strong>
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/public/bill/${invoice.public_token}/signature`}
              alt=""
              width={560}
              height={424}
              unoptimized
              className="ml-auto mt-1 h-14 w-auto object-contain"
            />
            <div className="ml-auto w-44 border-t border-ink-300" />
            <span className="mt-1 block">Authorised Signatory</span>
          </div>
        </div>

        <p className="mt-8 border-t border-ink-100 pt-4 text-center text-[11px] text-ink-500">
          Computer-generated invoice. GST is not applicable — {site.registeredName} is
          not registered under GST.
        </p>
      </div>
    </article>
  );
}
