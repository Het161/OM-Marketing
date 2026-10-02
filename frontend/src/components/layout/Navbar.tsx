// frontend/src/components/layout/Navbar.tsx

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FiFileText, FiMenu, FiSearch, FiX } from 'react-icons/fi';

import { navLinks, site, whatsappLink } from '@/lib/site';
import { useHydratedQuote } from '@/store/quoteStore';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState('');

  const router = useRouter();
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const quoteCount = useHydratedQuote((s) => s.getTotalItems(), 0);

  useEffect(() => setIsMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen]);

  const handleSearch = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      const trimmed = query.trim();
      if (!trimmed) return;
      router.push(`/products?search=${encodeURIComponent(trimmed)}`);
      setQuery('');
      setIsMenuOpen(false);
    },
    [query, router],
  );

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* Utility rail — contact details as data, not decoration */}
      <div className="hidden border-b border-ink-800 bg-ink-950 text-steel-300 lg:block">
        <div className="shell flex items-center justify-between gap-6 py-2">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${site.phoneDial}`}
              className="label text-steel-300 transition-colors hover:text-white"
            >
              T {site.phoneDisplay}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="label text-steel-300 transition-colors hover:text-white"
            >
              E {site.email}
            </a>
          </div>
          <div className="flex items-center gap-6">
            <span className="label text-steel-400">{site.hoursShort}</span>
            <span className="label text-primary-300">{site.certification}</span>
          </div>
        </div>
      </div>

      <header
        className="sticky top-0 z-50 border-b border-line"
        style={{ background: 'var(--header-bg)', backdropFilter: 'blur(10px)' }}
      >
        <nav aria-label="Main" className="shell">
          <div className="flex h-[68px] items-center justify-between gap-3 sm:gap-6">
            <Link
              href="/"
              className="flex min-w-0 items-center gap-2.5 sm:gap-3"
              aria-label={`${site.name} — home`}
            >
              <Image
                src="/images/om-mark.png"
                alt=""
                width={38}
                height={38}
                priority
                className="only-light h-[38px] w-[38px] object-contain"
              />
              <Image
                src="/images/om-mark-white.png"
                alt=""
                width={38}
                height={38}
                className="only-dark h-[38px] w-[38px] object-contain"
              />
              <span className="min-w-0 leading-none">
                <span className="block truncate font-[family-name:var(--font-display)] text-[0.9375rem] font-extrabold tracking-[-0.02em] sm:text-[1.0625rem]">
                  OM MARKETING
                </span>
                <span className="label mt-1.5 hidden truncate sm:block">
                  Weighing equipment
                </span>
              </span>
            </Link>

            <ul className="hidden items-center xl:flex">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={`relative flex h-[68px] items-center px-4 text-[0.9375rem] font-medium transition-colors ${
                      isActive(link.href)
                        ? 'text-content'
                        : 'text-muted hover:text-content'
                    }`}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 bottom-0 h-[2px] bg-ink-950"
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <form
                onSubmit={handleSearch}
                role="search"
                className="hidden md:block"
              >
                <label htmlFor="nav-search" className="sr-only">
                  Search products
                </label>
                <div className="relative">
                  <FiSearch
                    aria-hidden
                    size={15}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle"
                  />
                  <input
                    id="nav-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search"
                    className="field h-10 w-36 pl-9 text-sm lg:w-48"
                  />
                </div>
              </form>

              <Link
                href="/quote"
                className="relative flex h-10 items-center gap-2 border border-line px-3 transition-colors hover:border-ink-900"
                aria-label={
                  quoteCount > 0
                    ? `Quote list, ${quoteCount} item${quoteCount === 1 ? '' : 's'}`
                    : 'Quote list, empty'
                }
              >
                <FiFileText size={16} aria-hidden />
                <span className="data text-xs font-medium tabular-nums">
                  {quoteCount > 99 ? '99+' : quoteCount}
                </span>
              </Link>

              <a
                href={whatsappLink(
                  `Hello OM Marketing, I'd like to know more about your weighing equipment.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary hidden h-10 px-4 text-[0.8125rem] sm:inline-flex"
              >
                Request a quote
              </a>

              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                className="flex h-10 w-10 items-center justify-center border border-line transition-colors hover:border-ink-900 xl:hidden"
              >
                {isMenuOpen ? (
                  <FiX size={18} aria-hidden />
                ) : (
                  <FiMenu size={18} aria-hidden />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-ink-950/55 xl:hidden"
              aria-hidden
            />
            <motion.div
              ref={panelRef}
              id="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(23rem,90vw)] flex-col overflow-y-auto border-l border-line bg-surface xl:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <span className="label">Menu</span>
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    menuButtonRef.current?.focus();
                  }}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center border border-line hover:border-ink-900"
                >
                  <FiX size={18} aria-hidden />
                </button>
              </div>

              <form
                onSubmit={handleSearch}
                role="search"
                className="border-b border-line p-5"
              >
                <label htmlFor="mobile-search" className="sr-only">
                  Search products
                </label>
                <div className="relative">
                  <FiSearch
                    aria-hidden
                    size={15}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle"
                  />
                  <input
                    id="mobile-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products"
                    className="field pl-9"
                  />
                </div>
              </form>

              <ul className="flex-1">
                {navLinks.map((link, i) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive(link.href) ? 'page' : undefined}
                      className={`flex min-h-[56px] items-center gap-5 border-b border-line px-5 text-[0.9375rem] transition-colors ${
                        isActive(link.href)
                          ? 'bg-surface-2 font-semibold text-content'
                          : 'text-muted hover:bg-surface-2 hover:text-content'
                      }`}
                    >
                      <span className="section-index">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="space-y-2 border-t border-line p-5">
                <a
                  href={`tel:${site.phoneDial}`}
                  className="btn-outline w-full"
                >
                  {site.phoneDisplay}
                </a>
                <a
                  href={whatsappLink('Hello OM Marketing, I have an enquiry.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full"
                >
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
