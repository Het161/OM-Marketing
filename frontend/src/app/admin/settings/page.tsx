// frontend/src/app/admin/settings/page.tsx

'use client';

import { useState } from 'react';
import { FiAlertTriangle, FiCheck, FiKey } from 'react-icons/fi';

import AdminGuard from '@/components/admin/AdminGuard';
import { Field } from '@/components/ui/Field';
import { site } from '@/lib/site';
import { adminAuth, adminError } from '@/services/admin';

function Settings() {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setDone(false);

    if (next.length < 8) {
      setError('Choose a new password of at least 8 characters.');
      return;
    }
    if (next !== confirm) {
      setError("The new passwords don't match.");
      return;
    }

    setBusy(true);
    try {
      await adminAuth.changePassword(current, next);
      setDone(true);
      setCurrent('');
      setNext('');
      setConfirm('');
    } catch (err) {
      setError(adminError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold">Settings</h1>
        <p className="mt-1 text-muted">Your account and the details printed on every bill.</p>
      </header>

      <section className="card mb-6 p-6">
        <h2 className="mb-1 flex items-center gap-2 text-lg font-bold">
          <FiKey aria-hidden className="text-primary-500" /> Change password
        </h2>
        <p className="mb-5 text-sm text-muted">
          Do this once after your first sign-in, so the password from the server
          configuration is no longer in use.
        </p>

        {done && (
          <div
            role="status"
            className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
          >
            <FiCheck aria-hidden className="mt-0.5 shrink-0" />
            <span>Password changed. Use the new one next time you sign in.</span>
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
          >
            <FiAlertTriangle aria-hidden className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={submit} noValidate className="space-y-4">
          <Field
            label="Current password"
            required
            type="password"
            autoComplete="current-password"
            value={current}
            disabled={busy}
            onChange={(e) => setCurrent(e.target.value)}
          />
          <Field
            label="New password"
            required
            type="password"
            autoComplete="new-password"
            hint="At least 8 characters."
            value={next}
            disabled={busy}
            onChange={(e) => setNext(e.target.value)}
          />
          <Field
            label="Confirm new password"
            required
            type="password"
            autoComplete="new-password"
            value={confirm}
            disabled={busy}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <button type="submit" disabled={busy} className="btn-primary">
            {busy ? 'Saving…' : 'Change password'}
          </button>
        </form>
      </section>

      <section className="card p-6">
        <h2 className="mb-1 text-lg font-bold">Business details on bills</h2>
        <p className="mb-5 text-sm text-muted">
          These come from the server configuration. To change them, edit{' '}
          <code className="rounded bg-surface-2 px-1.5 py-0.5 text-[13px]">backend/.env</code>{' '}
          (or the environment variables on your host) and restart.
        </p>

        <dl className="divide-y divide-line text-sm">
          {[
            ['Business name', site.name],
            ['Address', site.addressFull],
            ['Phone', site.phoneDisplay],
            ['Email', site.email],
            ['GST', 'Not registered — no tax is charged on bills'],
            ['Udyam / MSME number', 'Set UDYAM_NUMBER in backend/.env to print it'],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-wrap justify-between gap-3 py-3">
              <dt className="text-muted">{label}</dt>
              <dd className="font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <AdminGuard>
      <Settings />
    </AdminGuard>
  );
}
