// frontend/src/components/admin/AdminGuard.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiFilePlus, FiFileText, FiLogOut, FiSettings } from 'react-icons/fi';

import { adminAuth } from '@/services/admin';

const tabs = [
  { href: '/admin/bills', label: 'Bills', icon: FiFileText },
  { href: '/admin/bills/new', label: 'New bill', icon: FiFilePlus },
  { href: '/admin/settings', label: 'Settings', icon: FiSettings },
];

/**
 * Wraps every admin page: confirms the session with the server before
 * rendering anything, and provides the portal chrome.
 */
export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState<'checking' | 'ok'>('checking');
  const [user, setUser] = useState<{ username: string; full_name?: string } | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      if (!adminAuth.token()) {
        router.replace(`/admin?next=${encodeURIComponent(pathname)}`);
        return;
      }
      try {
        // Ask the server — a token can be expired or revoked.
        const me = await adminAuth.verify();
        if (cancelled) return;
        setUser({ username: me.username, full_name: me.full_name });
        setState('ok');
      } catch {
        if (cancelled) return;
        adminAuth.logout();
        router.replace(`/admin?next=${encodeURIComponent(pathname)}`);
      }
    }

    check();
    return () => {
      cancelled = true;
    };
  }, [router, pathname]);

  if (state === 'checking') {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="spinner" role="status" aria-label="Checking your session" />
      </div>
    );
  }

  const signOut = () => {
    adminAuth.logout();
    router.replace('/admin');
  };

  return (
    <div className="min-h-screen bg-surface-2">
      <header className="sticky top-0 z-40 border-b border-line bg-surface">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link href="/admin/bills" className="flex items-center gap-2.5">
            <Image
              src="/images/om-mark.png"
              alt=""
              width={34}
              height={34}
              className="only-light h-[34px] w-[34px] object-contain"
            />
            <Image
              src="/images/om-mark-white.png"
              alt=""
              width={34}
              height={34}
              className="only-dark h-[34px] w-[34px] object-contain"
            />
            <span className="leading-tight">
              <span className="block font-[family-name:var(--font-display)] font-extrabold text-brand">
                Billing Portal
              </span>
              <span className="block text-[11px] text-subtle">OM Marketing</span>
            </span>
          </Link>

          <nav aria-label="Admin sections" className="order-3 w-full sm:order-2 sm:w-auto">
            <ul className="flex gap-1">
              {tabs.map((tab) => {
                const active =
                  tab.href === '/admin/bills'
                    ? pathname === '/admin/bills'
                    : pathname.startsWith(tab.href);
                return (
                  <li key={tab.href}>
                    <Link
                      href={tab.href}
                      aria-current={active ? 'page' : undefined}
                      className={`flex h-11 items-center gap-2 rounded-lg px-3.5 text-sm font-semibold transition-colors ${
                        active
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-muted hover:bg-surface-3 hover:text-content'
                      }`}
                    >
                      <tab.icon aria-hidden size={16} /> {tab.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="order-2 flex items-center gap-3 sm:order-3">
            <span className="hidden text-sm text-muted sm:inline">
              {user?.full_name || user?.username}
            </span>
            <button type="button" onClick={signOut} className="btn-ghost h-11 px-3 text-sm">
              <FiLogOut aria-hidden /> Sign out
            </button>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}
