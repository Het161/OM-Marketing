// frontend/src/components/forms/EnquiryForm.tsx

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FiAlertTriangle, FiCheckCircle, FiSend } from 'react-icons/fi';

import { Field, Honeypot, Select, TextArea } from '@/components/ui/Field';
import { serviceTypes, site, whatsappLink } from '@/lib/site';
import {
  isClean,
  validateEmail,
  validateMessage,
  validateName,
  validatePhone,
  validateRequired,
  type Errors,
} from '@/lib/validation';
import { enquiryApi, friendlyError } from '@/services/enquiries';

type Variant = 'contact' | 'service';

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  serviceType: string;
  preferredDate: string;
  message: string;
  website: string;
}

const EMPTY: FormState = {
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  serviceType: '',
  preferredDate: '',
  message: '',
  website: '',
};

export default function EnquiryForm({
  variant = 'contact',
  defaultServiceType = '',
  title,
  submitLabel,
}: {
  variant?: Variant;
  defaultServiceType?: string;
  title?: string;
  submitLabel?: string;
}) {
  const pathname = usePathname();
  const [form, setForm] = useState<FormState>({
    ...EMPTY,
    serviceType: defaultServiceType,
  });
  const [errors, setErrors] = useState<Errors<FormState>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [reference, setReference] = useState('');
  const [serverError, setServerError] = useState('');

  const set = (key: keyof FormState) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear a field's error as soon as the customer starts fixing it
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const validate = (): Errors<FormState> => ({
    name: validateName(form.name),
    email: validateEmail(form.email),
    phone: validatePhone(form.phone),
    serviceType:
      variant === 'service' ? validateRequired(form.serviceType, 'a service') : undefined,
    message: validateMessage(form.message, { required: variant === 'contact' }),
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setServerError('');

    const found = validate();
    setErrors(found);

    if (!isClean(found)) {
      // Move focus to the first problem so screen readers announce it
      const firstKey = (Object.keys(found) as (keyof FormState)[]).find((k) => found[k]);
      if (firstKey) {
        document
          .querySelector<HTMLElement>(`[aria-invalid="true"]`)
          ?.focus({ preventScroll: false });
      }
      return;
    }

    setStatus('sending');

    try {
      const shared = {
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        company: form.company || undefined,
        message: form.message || undefined,
        source: pathname,
        website: form.website || undefined,
      };

      const ack =
        variant === 'service'
          ? await enquiryApi.service({
              ...shared,
              service_type:
                serviceTypes.find((s) => s.value === form.serviceType)?.label ??
                form.serviceType,
              preferred_date: form.preferredDate || undefined,
            })
          : await enquiryApi.contact({
              ...shared,
              subject: form.subject || undefined,
              message: form.message,
            });

      setReference(ack.reference);
      setStatus('sent');
      setForm({ ...EMPTY, serviceType: defaultServiceType });
    } catch (error) {
      setServerError(friendlyError(error));
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        role="status"
        className="card flex flex-col items-center p-8 text-center sm:p-10"
      >
        <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-600">
          <FiCheckCircle size={34} aria-hidden />
        </span>
        <h3 className="mb-2 text-2xl font-bold">Thank you — we&apos;ve got it!</h3>
        <p className="mb-1 max-w-md text-muted">
          A confirmation email is on its way to you, and our team has been notified.
          We usually reply within a few working hours.
        </p>
        <p className="mb-6 text-sm font-semibold text-primary-600">
          Your reference: {reference}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={whatsappLink(`Hi, I just submitted an enquiry (${reference}).`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Chat on WhatsApp
          </a>
          <button type="button" onClick={() => setStatus('idle')} className="btn-outline">
            Send another message
          </button>
        </div>
      </motion.div>
    );
  }

  const sending = status === 'sending';

  return (
    <form onSubmit={handleSubmit} noValidate className="card relative p-6 sm:p-8">
      {title && <h2 className="mb-1 text-2xl font-bold">{title}</h2>}
      <p className="mb-6 text-sm text-muted">
        Fields marked <span className="text-red-600">*</span> are required. We reply
        by email and phone — never any spam.
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
              You can also{' '}
              <a href={`tel:${site.phoneDial}`} className="font-semibold underline">
                call {site.phoneDisplay}
              </a>{' '}
              or{' '}
              <a
                href={whatsappLink('Hello, I tried the website form but it failed.')}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline"
              >
                message us on WhatsApp
              </a>
              .
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
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
          hint="We may call you to understand your requirement."
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
          hint="Your quotation and confirmation are sent here."
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
          error={errors.company}
          disabled={sending}
          onChange={(e) => set('company')(e.target.value)}
        />

        {variant === 'service' ? (
          <>
            <Select
              label="What do you need?"
              required
              value={form.serviceType}
              error={errors.serviceType}
              disabled={sending}
              onChange={(e) => set('serviceType')(e.target.value)}
            >
              <option value="">Choose a service…</option>
              {serviceTypes.map((service) => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </Select>
            <Field
              label="Preferred date"
              type="date"
              hint="We'll confirm the slot by phone."
              min={new Date().toISOString().split('T')[0]}
              value={form.preferredDate}
              error={errors.preferredDate}
              disabled={sending}
              onChange={(e) => set('preferredDate')(e.target.value)}
            />
          </>
        ) : (
          <div className="sm:col-span-2">
            <Field
              label="Subject"
              placeholder="e.g. Need a 500 kg platform scale"
              value={form.subject}
              error={errors.subject}
              disabled={sending}
              onChange={(e) => set('subject')(e.target.value)}
            />
          </div>
        )}

        <div className="sm:col-span-2">
          <TextArea
            label={variant === 'service' ? 'Describe the problem' : 'Your message'}
            required={variant === 'contact'}
            rows={5}
            placeholder={
              variant === 'service'
                ? 'Which scale is it, what capacity, and what is going wrong?'
                : 'Tell us the capacity, platform size and where the scale will be used…'
            }
            value={form.message}
            error={errors.message}
            disabled={sending}
            onChange={(e) => set('message')(e.target.value)}
          />
        </div>
      </div>

      <button type="submit" disabled={sending} className="btn-primary mt-6 w-full">
        {sending ? (
          <>
            <span
              className="spinner h-5 w-5 border-2"
              style={{ borderTopColor: '#fff', borderColor: 'rgba(255,255,255,.35)' }}
              aria-hidden
            />
            Sending…
          </>
        ) : (
          <>
            <FiSend aria-hidden /> {submitLabel ?? 'Send message'}
          </>
        )}
      </button>

      <p className="mt-4 text-center text-[13px] text-subtle">
        By sending this you agree to our{' '}
        <Link href="/privacy" className="underline hover:text-primary-600">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
