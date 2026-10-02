// frontend/src/app/not-found.tsx

import Link from 'next/link';
import { FiHome, FiPhone, FiSearch } from 'react-icons/fi';
import { TbScale } from 'react-icons/tb';

import { site } from '@/lib/site';

export default function NotFound() {
  return (
    <div className="shell mx-auto flex min-h-[70vh] max-w-2xl items-center py-16">
      <div className="w-full text-center">
        <span className="mx-auto mb-6 flex h-12 w-12 items-center justify-center border border-line text-subtle">
          <TbScale size={22} aria-hidden />
        </span>
        <p className="label mb-3">Error 404</p>
        <h1 className="mb-3 text-3xl font-extrabold">
          This page is off balance
        </h1>
        <p className="mx-auto mb-8 max-w-md leading-relaxed text-muted">
          We couldn&apos;t find the page you were after. It may have moved, or
          the link might have a typo.
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
