// frontend/src/components/admin/BillForm.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { FiAlertTriangle, FiPlus, FiSave, FiTrash2 } from 'react-icons/fi';

import { Field, Select, TextArea } from '@/components/ui/Field';
import catalogue from '@/data/products.json';
import { isClean, validateEmail, validateName, validatePhone, type Errors } from '@/lib/validation';
import {
  adminError,
  invoiceApi,
  type Invoice,
  type InvoiceItem,
  type InvoicePayload,
} from '@/services/admin';

const PAYMENT_MODES = ['Cash', 'UPI', 'Bank transfer', 'Cheque', 'Credit / on account'];
const UNITS = ['Nos', 'Set', 'Kg', 'Visit', 'Hour', 'Pair', 'Box'];

const DEFAULT_TERMS = `1. Goods once sold will not be taken back or exchanged.
2. Warranty covers manufacturing defects only, as per the manufacturer's terms.
3. Warranty is void for physical damage, overloading, water ingress or repairs carried out by a third party.
4. Calibration and stamping under the Legal Metrology Act, 2009 is the buyer's responsibility unless stated otherwise.
5. Payment is due within 45 days as per the MSMED Act, 2006.
6. Interest at 18% per annum is chargeable on overdue amounts.
7. Delivery timelines are estimates and subject to stock availability.
8. All disputes are subject to Ahmedabad, Gujarat jurisdiction.`;

interface CustomerFields {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  business_name: string;
  business_gstin: string;
}

const emptyItem = (): InvoiceItem => ({ description: '', unit: 'Nos', quantity: 1, rate: 0 });

const inr = (value: number) =>
  value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function BillForm({ existing }: { existing?: Invoice }) {
  const router = useRouter();

  const [fields, setFields] = useState<CustomerFields>({
    customer_name: existing?.customer_name ?? '',
    customer_email: existing?.customer_email ?? '',
    customer_phone: existing?.customer_phone ?? '',
    customer_address: existing?.customer_address ?? '',
    business_name: existing?.business_name ?? '',
    business_gstin: existing?.business_gstin ?? '',
  });

  const [items, setItems] = useState<InvoiceItem[]>(
    existing?.items?.length ? existing.items.map((i) => ({ ...i })) : [emptyItem()],
  );
  const [discount, setDiscount] = useState(existing?.discount_amount ?? 0);
  const [delivery, setDelivery] = useState(existing?.delivery_charge ?? 0);
  const [paymentMode, setPaymentMode] = useState(existing?.payment_mode ?? '');
  const [notes, setNotes] = useState(existing?.notes ?? '');
  const [terms, setTerms] = useState(existing?.terms ?? DEFAULT_TERMS);
  const [showTerms, setShowTerms] = useState(false);

  const [errors, setErrors] = useState<Errors<CustomerFields>>({});
  const [itemError, setItemError] = useState('');
  const [serverError, setServerError] = useState('');
  const [busy, setBusy] = useState(false);

  const set = (key: keyof CustomerFields) => (value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const updateItem = (index: number, patch: Partial<InvoiceItem>) => {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
    setItemError('');
  };

  /* Totals mirror the server's arithmetic so the preview matches the bill. */
  const totals = useMemo(() => {
    const lines = items.map((i) => Math.round((i.quantity || 0) * (i.rate || 0) * 100) / 100);
    const subtotal = Math.round(lines.reduce((a, b) => a + b, 0) * 100) / 100;
    const clampedDiscount = Math.min(Math.max(discount || 0, 0), subtotal);
    const total = Math.round((subtotal - clampedDiscount + Math.max(delivery || 0, 0)) * 100) / 100;
    return { lines, subtotal, discount: clampedDiscount, total };
  }, [items, discount, delivery]);

  // Warn before losing a half-filled bill
  useEffect(() => {
    const dirty = fields.customer_name || items.some((i) => i.description);
    if (!dirty || busy) return;

    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [fields.customer_name, items, busy]);

  const submit = async (status: 'draft' | 'sent') => {
    setServerError('');
    setItemError('');

    const found: Errors<CustomerFields> = {
      customer_name: validateName(fields.customer_name),
      customer_phone: validatePhone(fields.customer_phone, false),
      customer_email: fields.customer_email
        ? validateEmail(fields.customer_email)
        : undefined,
    };
    setErrors(found);

    const usable = items.filter((i) => i.description.trim() && i.quantity > 0);
    if (usable.length === 0) {
      setItemError('Add at least one item with a description and quantity.');
    }

    if (!isClean(found) || usable.length === 0) {
      document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    setBusy(true);
    try {
      const payload: InvoicePayload = {
        customer_name: fields.customer_name.trim(),
        customer_email: fields.customer_email.trim() || undefined,
        customer_phone: fields.customer_phone.trim() || undefined,
        customer_address: fields.customer_address.trim() || undefined,
        business_name: fields.business_name.trim() || undefined,
        business_gstin: fields.business_gstin.trim() || undefined,
        discount_amount: totals.discount,
        delivery_charge: Math.max(delivery || 0, 0),
        payment_mode: paymentMode || undefined,
        notes: notes.trim() || undefined,
        terms: terms.trim() || undefined,
        status,
        items: usable.map((i) => ({
          description: i.description.trim(),
          unit: i.unit || 'Nos',
          quantity: Number(i.quantity),
          rate: Number(i.rate),
        })),
      };

      const saved = existing
        ? await invoiceApi.update(existing.id, payload)
        : await invoiceApi.create(payload);

      router.push(`/admin/bills/${saved.id}`);
    } catch (err) {
      setServerError(adminError(err));
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit('draft');
      }}
      noValidate
      className="grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-start"
    >
      <div className="space-y-6">
        {serverError && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
          >
            <FiAlertTriangle aria-hidden className="mt-0.5 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        {/* Customer */}
        <section className="card p-6">
          <h2 className="mb-1 text-lg font-bold">Customer</h2>
          <p className="mb-5 text-sm text-muted">
            Name is required. Add a phone number or email to send the bill from the portal.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Customer name"
              required
              autoComplete="off"
              placeholder="Rameshbhai Patel"
              value={fields.customer_name}
              error={errors.customer_name}
              disabled={busy}
              onChange={(e) => set('customer_name')(e.target.value)}
            />
            <Field
              label="Phone number"
              type="tel"
              inputMode="tel"
              placeholder="98252 47312"
              hint="Needed for the WhatsApp button."
              value={fields.customer_phone}
              error={errors.customer_phone}
              disabled={busy}
              onChange={(e) => set('customer_phone')(e.target.value)}
            />
            <Field
              label="Email address"
              type="email"
              placeholder="customer@company.com"
              hint="Needed to email the bill."
              value={fields.customer_email}
              error={errors.customer_email}
              disabled={busy}
              onChange={(e) => set('customer_email')(e.target.value)}
            />
            <Field
              label="Business name"
              placeholder="Optional"
              value={fields.business_name}
              disabled={busy}
              onChange={(e) => set('business_name')(e.target.value)}
            />
            <div className="sm:col-span-2">
              <TextArea
                label="Address"
                rows={2}
                placeholder="Plot 42, GIDC Estate, Odhav, Ahmedabad 382415"
                value={fields.customer_address}
                disabled={busy}
                onChange={(e) => set('customer_address')(e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <Field
                label="Customer's GSTIN"
                placeholder="Optional — 24ABCDE1234F1Z5"
                hint="Only for the customer's own records. OM Marketing is not GST-registered, so no tax is charged."
                value={fields.business_gstin}
                error={errors.business_gstin}
                disabled={busy}
                onChange={(e) => set('business_gstin')(e.target.value.toUpperCase())}
              />
            </div>
          </div>
        </section>

        {/* Items */}
        <section className="card p-6">
          <h2 className="mb-1 text-lg font-bold">Items</h2>
          <p className="mb-5 text-sm text-muted">
            Pick from your catalogue or type anything — services and charges included.
          </p>

          {itemError && (
            <p role="alert" className="field-error mb-4">
              <FiAlertTriangle aria-hidden size={14} /> {itemError}
            </p>
          )}

          <ul className="space-y-4">
            {items.map((item, index) => (
              <li key={index} className="rounded-xl border border-line bg-surface-2 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-subtle">
                    Item {index + 1}
                  </span>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setItems((prev) => prev.filter((_, i) => i !== index))}
                      aria-label={`Remove item ${index + 1}`}
                      className="flex h-9 w-9 items-center justify-center rounded-md text-subtle transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      <FiTrash2 size={16} aria-hidden />
                    </button>
                  )}
                </div>

                <div className="mb-3">
                  <label
                    htmlFor={`desc-${index}`}
                    className="field-label"
                  >
                    Description
                  </label>
                  <input
                    id={`desc-${index}`}
                    list="catalogue-products"
                    className="field"
                    placeholder="Start typing, or pick a product…"
                    value={item.description}
                    disabled={busy}
                    onChange={(e) => {
                      const description = e.target.value;
                      const match = (catalogue as Array<{ name: string; price: number }>).find(
                        (p) => p.name === description,
                      );
                      updateItem(index, match ? { description, rate: match.price } : { description });
                    }}
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-[6rem_7rem_1fr_auto]">
                  <div>
                    <label htmlFor={`qty-${index}`} className="field-label">
                      Qty
                    </label>
                    <input
                      id={`qty-${index}`}
                      type="number"
                      min={0.01}
                      step="any"
                      className="field"
                      value={item.quantity}
                      disabled={busy}
                      onChange={(e) => updateItem(index, { quantity: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label htmlFor={`unit-${index}`} className="field-label">
                      Unit
                    </label>
                    <select
                      id={`unit-${index}`}
                      className="field"
                      value={item.unit || 'Nos'}
                      disabled={busy}
                      onChange={(e) => updateItem(index, { unit: e.target.value })}
                    >
                      {UNITS.map((u) => (
                        <option key={u}>{u}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`rate-${index}`} className="field-label">
                      Rate (₹)
                    </label>
                    <input
                      id={`rate-${index}`}
                      type="number"
                      min={0}
                      step="0.01"
                      className="field"
                      value={item.rate}
                      disabled={busy}
                      onChange={(e) => updateItem(index, { rate: Number(e.target.value) })}
                    />
                  </div>
                  <div className="sm:text-right">
                    <span className="field-label sm:block">Amount</span>
                    <span className="inline-flex h-11 items-center font-[family-name:var(--font-display)] text-lg font-extrabold text-primary-600">
                      ₹{inr(totals.lines[index] ?? 0)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <datalist id="catalogue-products">
            {(catalogue as Array<{ id: number; name: string }>).map((p) => (
              <option key={p.id} value={p.name} />
            ))}
          </datalist>

          <button
            type="button"
            onClick={() => setItems((prev) => [...prev, emptyItem()])}
            disabled={busy || items.length >= 50}
            className="btn-outline mt-4 w-full"
          >
            <FiPlus aria-hidden /> Add another item
          </button>
        </section>

        {/* Charges + notes */}
        <section className="card p-6">
          <h2 className="mb-5 text-lg font-bold">Charges &amp; notes</h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="discount" className="field-label">
                Discount (₹)
              </label>
              <input
                id="discount"
                type="number"
                min={0}
                step="0.01"
                className="field"
                value={discount}
                disabled={busy}
                onChange={(e) => setDiscount(Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="delivery" className="field-label">
                Delivery / installation (₹)
              </label>
              <input
                id="delivery"
                type="number"
                min={0}
                step="0.01"
                className="field"
                value={delivery}
                disabled={busy}
                onChange={(e) => setDelivery(Number(e.target.value))}
              />
            </div>
            <Select
              label="Payment mode"
              value={paymentMode}
              disabled={busy}
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <option value="">Not specified</option>
              {PAYMENT_MODES.map((mode) => (
                <option key={mode}>{mode}</option>
              ))}
            </Select>
          </div>

          <div className="mt-4">
            <TextArea
              label="Notes on the bill"
              rows={2}
              placeholder="Delivered to Odhav plant. Warranty card handed over."
              value={notes}
              disabled={busy}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={() => setShowTerms((open) => !open)}
              aria-expanded={showTerms}
              className="btn-ghost px-0 text-sm"
            >
              {showTerms ? 'Hide' : 'Edit'} terms &amp; conditions
            </button>
            {showTerms && (
              <div className="mt-2">
                <TextArea
                  label="Terms & conditions"
                  rows={9}
                  value={terms}
                  disabled={busy}
                  onChange={(e) => setTerms(e.target.value)}
                  hint="These print at the bottom of every bill."
                />
                <button
                  type="button"
                  onClick={() => setTerms(DEFAULT_TERMS)}
                  className="btn-ghost mt-2 px-0 text-sm"
                >
                  Reset to default terms
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Summary */}
      <aside className="card p-6 lg:sticky lg:top-24">
        <h2 className="mb-4 text-lg font-bold">Summary</h2>

        <dl className="space-y-2.5 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Subtotal</dt>
            <dd className="font-semibold">₹{inr(totals.subtotal)}</dd>
          </div>
          {totals.discount > 0 && (
            <div className="flex justify-between">
              <dt className="text-muted">Discount</dt>
              <dd className="font-semibold text-red-600">- ₹{inr(totals.discount)}</dd>
            </div>
          )}
          {delivery > 0 && (
            <div className="flex justify-between">
              <dt className="text-muted">Delivery</dt>
              <dd className="font-semibold">₹{inr(delivery)}</dd>
            </div>
          )}
          <div className="flex justify-between border-t border-line pt-2.5">
            <dt className="font-bold">Total</dt>
            <dd className="font-[family-name:var(--font-display)] text-xl font-extrabold text-primary-600">
              ₹{inr(totals.total)}
            </dd>
          </div>
        </dl>

        <p className="mt-4 rounded-lg bg-surface-2 p-3 text-[12px] leading-relaxed text-subtle">
          GST is not charged — OM Marketing is MSME registered but not registered
          under GST. This prints on the bill.
        </p>

        <div className="mt-5 space-y-2">
          <button type="button" onClick={() => submit('sent')} disabled={busy} className="btn-primary w-full">
            {busy ? (
              <>
                <span
                  className="spinner h-5 w-5 border-2"
                  style={{ borderTopColor: '#fff', borderColor: 'rgba(255,255,255,.35)' }}
                  aria-hidden
                />
                Saving…
              </>
            ) : (
              <>
                <FiSave aria-hidden /> {existing ? 'Save changes' : 'Create bill'}
              </>
            )}
          </button>
          {!existing && (
            <button type="submit" disabled={busy} className="btn-outline w-full">
              Save as draft
            </button>
          )}
        </div>

        <p className="mt-3 text-center text-[12px] text-subtle">
          You can send it by WhatsApp or email on the next screen.
        </p>
      </aside>
    </form>
  );
}
