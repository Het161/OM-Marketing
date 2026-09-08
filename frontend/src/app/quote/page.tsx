// frontend/src/app/quote/page.tsx

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiFileText,
  FiMinus,
  FiPlus,
  FiSend,
  FiTrash2,
} from 'react-icons/fi';

import ProductImage from '@/components/products/ProductImage';
import { Field, Honeypot, TextArea } from '@/components/ui/Field';
import { site, whatsappLink } from '@/lib/site';
import {
  isClean,
  validateEmail,
  validateName,
  validatePhone,
  type Errors,
} from '@/lib/validation';
import { enquiryApi, friendlyError } from '@/services/enquiries';
import { useQuoteStore } from '@/store/quoteStore';

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  website: string;
}

const EMPTY: FormState = {
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  website: '',
};

export default function QuotePage() {
  const pathname = usePathname();

  const items = useQuoteStore((s) => s.items);
  const updateQuantity = useQuoteStore((s) => s.updateQuantity);
  const removeItem = useQuoteStore((s) => s.removeItem);
  const clear = useQuoteStore((s) => s.clear);

  const [hydrated, setHydrated] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors<FormState>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [reference, setReference] = useState('');
  const [serverError, setServerError] = useState('');

  useEffect(() => setHydrated(true), []);

  const set = (key: keyof FormState) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setServerError('');

    const found: Errors<FormState> = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      phone: validatePhone(form.phone),
    };
    setErrors(found);
    if (!isClean(found)) {
      document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    setStatus('sending');

    try {
      const ack = await enquiryApi.quote({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        company: form.company || undefined,
        message: form.message || undefined,
        source: pathname,
        website: form.website || undefined,
        items: items.map((item) => ({
          product_id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      });

      setReference(ack.reference);
      setStatus('sent');
      clear();
      setForm(EMPTY);
    } catch (error) {
      setServerError(friendlyError(error));
      setStatus('error');
    }
  };

  /* ---------------------------------------------------------------- states */

  if (status === 'sent') {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          role="status"
          className="card w-full p-8 text-center sm:p-12"
        >
          <span className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary-50 text-primary-600">
            <FiCheckCircle size={42} aria-hidden />
          </span>
          <h1 className="mb-3 text-3xl font-extrabold">Quote request sent!</h1>
          <p className="mx-auto mb-2 max-w-md leading-relaxed text-muted">
            We&apos;ve emailed you a confirmation with your item list, and our team
            is preparing your pricing now.
          </p>
          <p className="mb-8 font-semibold text-primary-600">
            Your reference: {reference}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={whatsappLink(`Hi, I just requested a quote (${reference}).`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Follow up on WhatsApp
            </a>
            <Link href="/products" className="btn-outline">
              Keep browsing
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Until hydration finishes we don't know what's in the persisted list
  if (!hydrated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="spinner" role="status" aria-label="Loading your quote list" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center px-4 py-16">
        <div className="w-full text-center">
          <span className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-surface-3 text-subtle">
            <FiFileText size={38} aria-hidden />
          </span>
          <h1 className="mb-3 text-3xl font-extrabold">Your quote list is empty</h1>
          <p className="mx-auto mb-8 max-w-md leading-relaxed text-muted">
            Add the products you&apos;re interested in and send them across in one
            go — we&apos;ll come back with our best pricing.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/products" className="btn-primary">
              Browse products
            </Link>
            <Link href="/scale-finder" className="btn-outline">
              Help me choose
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const sending = status === 'sending';

  /* ------------------------------------------------------------------ view */

  return (
    <div className="px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Request a quote</h1>
          <p className="mt-2 text-muted">
            {totalUnits} item{totalUnits === 1 ? '' : 's'} ready to send. We reply
            with firm pricing, usually the same working day.
          </p>
        </header>

        <div className="grid items-start gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* Items */}
          <section aria-label="Items in your quote" className="space-y-4">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.22 }}
                  className="card flex gap-4 overflow-hidden p-4"
                >
                  <Link
                    href={`/products/${item.id}`}
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-surface-3"
                  >
                    <ProductImage
                      src={item.image_url}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <h2 className="mb-1 line-clamp-2 font-semibold leading-snug">
                      <Link
                        href={`/products/${item.id}`}
                        className="transition-colors hover:text-primary-600"
                      >
                        {item.name}
                      </Link>
                    </h2>
                    <p className="mb-3 text-sm text-muted">
                      ₹{item.price.toLocaleString('en-IN')} each
                    </p>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-1 rounded-lg border border-line-strong p-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-3 hover:text-content"
                        >
                          <FiMinus size={15} aria-hidden />
                        </button>
                        <span
                          className="min-w-10 text-center font-semibold tabular-nums"
                          aria-live="polite"
                          aria-label={`Quantity: ${item.quantity}`}
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                          className="flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-3 hover:text-content"
                        >
                          <FiPlus size={15} aria-hidden />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-bold text-primary-600">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name} from your quote`}
                          className="flex h-9 w-9 items-center justify-center rounded-md text-subtle transition-colors hover:bg-red-50 hover:text-red-600"
                        >
                          <FiTrash2 size={17} aria-hidden />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <Link href="/products" className="btn-ghost">
                ← Add more products
              </Link>
              <button type="button" onClick={clear} className="btn-ghost text-red-600">
                <FiTrash2 aria-hidden /> Clear list
              </button>
            </div>
          </section>

          {/* Form */}
          <div className="space-y-5 lg:sticky lg:top-28">
            <div className="card p-6">
              <h2 className="mb-4 font-bold">Summary</h2>
              <dl className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted">Items</dt>
                  <dd className="font-semibold">{totalUnits}</dd>
                </div>
                <div className="flex justify-between border-t border-line pt-2.5">
                  <dt className="text-muted">Indicative subtotal</dt>
                  <dd className="font-bold text-primary-600">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </dd>
                </div>
              </dl>
              <p className="mt-4 rounded-lg bg-accent-50 p-3 text-[13px] leading-relaxed text-ink-700">
                <strong>This is a guide price only.</strong> Your final quotation
                depends on quantity, configuration, GST and delivery — and there is
                usually room to negotiate.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="card p-6">
              <h2 className="mb-1 font-bold">Where should we send it?</h2>
              <p className="mb-5 text-sm text-muted">
                Fields marked <span className="text-red-600">*</span> are required.
              </p>

              <Honeypot value={form.website} onChange={set('website')} />

              {serverError && (
                <div
                  role="alert"
                  className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
                >
                  <FiAlertTriangle aria-hidden className="mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold">We couldn&apos;t send that</p>
                    <p className="mt-0.5">{serverError}</p>
                    <p className="mt-2">
                      Your list is safe — nothing was lost. You can also{' '}
                      <a href={`tel:${site.phoneDial}`} className="font-semibold underline">
                        call {site.phoneDisplay}
                      </a>
                      .
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <Field
                  label="Your name"
                  required
                  autoComplete="name"
                  placeholder="Ramesh Patel"
                  value={form.name}
                  error={errors.name}
                  disabled={sending}
                  onChange={(e) => set('name')(e.target.value)}
                />
                <Field
                  label="Phone number"
                  required
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="98252 47312"
                  value={form.phone}
                  error={errors.phone}
                  disabled={sending}
                  onChange={(e) => set('phone')(e.target.value)}
                />
                <Field
                  label="Email address"
                  required
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  hint="Your quotation is sent here."
                  value={form.email}
                  error={errors.email}
                  disabled={sending}
                  onChange={(e) => set('email')(e.target.value)}
                />
                <Field
                  label="Company"
                  autoComplete="organization"
                  placeholder="Optional"
                  value={form.company}
                  disabled={sending}
                  onChange={(e) => set('company')(e.target.value)}
                />
                <TextArea
                  label="Anything else we should know?"
                  rows={3}
                  placeholder="Delivery location, required capacity, GST details…"
                  value={form.message}
                  disabled={sending}
                  onChange={(e) => set('message')(e.target.value)}
                />
              </div>

              <button type="submit" disabled={sending} className="btn-primary mt-6 w-full">
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
                    <FiSend aria-hidden /> Send quote request
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-[13px] text-subtle">
                Prefer to talk?{' '}
                <a
                  href={whatsappLink(
                    `Hello OM Marketing, I'd like a quote for: ${items
                      .map((i) => `${i.name} x${i.quantity}`)
                      .join(', ')}`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary-600 underline"
                >
                  Send this list on WhatsApp
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
