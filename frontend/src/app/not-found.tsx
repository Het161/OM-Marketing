// frontend/src/app/not-found.tsx

import Link from 'next/link';
import { FiHome, FiPhone, FiSearch } from 'react-icons/fi';

import { site } from '@/lib/site';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center px-4 py-16">
      <div className="w-full text-center">
        <span className="mb-4 block text-7xl" aria-hidden>
          ⚖️
        </span>
        <p className="mb-2 font-[family-name:var(--font-display)] text-5xl font-extrabold text-primary-600">
          404
        </p>
        <h1 className="mb-3 text-3xl font-extrabold">This page is off balance</h1>
        <p className="mx-auto mb-8 max-w-md leading-relaxed text-muted">
          We couldn&apos;t find the page you were after. It may have moved, or the
          link might have a typo.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            <FiHome aria-hidden /> Back to home
          </Link>
          <Link href="/products" className="btn-outline">
            <FiSearch aria-hidden /> Browse products
          </Link>
          <a href={`tel:${site.phoneDial}`} className="btn-ghost">
            <FiPhone aria-hidden /> {site.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
