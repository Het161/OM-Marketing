// frontend/src/app/admin/page.tsx

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { FiAlertTriangle, FiLock, FiLogIn } from 'react-icons/fi';

import { Field } from '@/components/ui/Field';
import { site } from '@/lib/site';
import { adminAuth, adminError } from '@/services/admin';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/admin/bills';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  // Already signed in? Go straight through.
  useEffect(() => {
    if (adminAuth.token()) {
      adminAuth
        .verify()
        .then(() => router.replace(next))
        .catch(() => adminAuth.logout());
    }
  }, [router, next]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!username.trim() || !password) {
      setError('Enter your username and password.');
      return;
    }

    setBusy(true);
    try {
      await adminAuth.login(username.trim(), password);
      router.replace(next);
    } catch (err) {
      setError(adminError(err));
      setPassword('');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-2 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <Image
            src="/images/om-mark.png"
            alt=""
            width={56}
            height={56}
            className="only-light mx-auto mb-3 h-14 w-14 object-contain"
          />
          <Image
            src="/images/om-mark-white.png"
            alt=""
            width={56}
            height={56}
            className="only-dark mx-auto mb-3 h-14 w-14 object-contain"
          />
          <h1 className="text-2xl font-extrabold">Billing Portal</h1>
          <p className="mt-1 text-sm text-muted">OM Marketing · staff access only</p>
        </div>

        <form onSubmit={submit} noValidate className="card p-6 sm:p-8">
          {error && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
            >
              <FiAlertTriangle aria-hidden className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <Field
              label="Username"
              required
              autoComplete="username"
              autoFocus
              value={username}
              disabled={busy}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Field
              label="Password"
              required
              type="password"
              autoComplete="current-password"
              value={password}
              disabled={busy}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={busy} className="btn-primary mt-6 w-full">
            {busy ? (
              <>
                <span
                  className="spinner h-5 w-5 border-2"
                  style={{ borderTopColor: '#fff', borderColor: 'rgba(255,255,255,.35)' }}
                  aria-hidden
                />
                Signing in…
              </>
            ) : (
              <>
                <FiLogIn aria-hidden /> Sign in
              </>
            )}
          </button>

          <p className="mt-5 flex items-center justify-center gap-1.5 text-[13px] text-subtle">
            <FiLock aria-hidden size={13} /> Sessions expire automatically.
          </p>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          <Link href="/" className="hover:text-primary-600 hover:underline">
            ← Back to {site.name}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="spinner" role="status" aria-label="Loading" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
