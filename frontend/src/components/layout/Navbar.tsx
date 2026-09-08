// frontend/src/components/layout/Navbar.tsx

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FiChevronRight,
  FiClock,
  FiFileText,
  FiMail,
  FiMenu,
  FiPhone,
  FiSearch,
  FiX,
} from 'react-icons/fi';

import { navLinks, site, whatsappLink } from '@/lib/site';
import { useHydratedQuote, useQuoteStore } from '@/store/quoteStore';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState('');

  const router = useRouter();
  const pathname = usePathname();

  const panelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // 0 until hydration completes, so server and client markup agree
  const quoteCount = useHydratedQuote((s) => s.getTotalItems(), 0);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes
  useEffect(() => setIsMenuOpen(false), [pathname]);

  // Lock body scroll and trap focus while the mobile menu is open
  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea',
      );
      if (focusable.length === 0) return;

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
      document.body.style.overflow = previousOverflow;
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
      {/* Utility bar — phone, email, hours. Hidden on small screens. */}
      <div className="hidden bg-primary-800 text-primary-50 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 text-[13px]">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${site.phoneDial}`}
              className="flex items-center gap-2 transition-colors hover:text-accent-300"
            >
              <FiPhone aria-hidden size={14} /> {site.phoneDisplay}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 transition-colors hover:text-accent-300"
            >
              <FiMail aria-hidden size={14} /> {site.email}
            </a>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-primary-100">
              <FiClock aria-hidden size={14} /> Mon–Sat, 9:00 AM – 7:00 PM
            </span>
            <span className="rounded-full bg-accent-500/20 px-3 py-0.5 font-semibold text-accent-200">
              {site.certification}
            </span>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b transition-shadow duration-300 ${
          isScrolled ? 'shadow-[0_4px_20px_rgb(13_19_22/0.08)]' : ''
        }`}
        style={{
          background: 'var(--header-bg)',
          backdropFilter: 'blur(14px)',
          borderColor: 'var(--border)',
        }}
      >
        <nav aria-label="Main" className="mx-auto max-w-7xl px-4">
          <div className="flex h-[72px] items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex shrink-0 items-center gap-2.5"
              aria-label={`${site.name} — home`}
            >
              <Image
                src="/images/om-mark.png"
                alt=""
                width={44}
                height={44}
                priority
                className="only-light h-11 w-11 object-contain"
              />
              <Image
                src="/images/om-mark-white.png"
                alt=""
                width={44}
                height={44}
                className="only-dark h-11 w-11 object-contain"
              />
              <span className="leading-tight">
                <span className="block font-[family-name:var(--font-display)] text-lg font-extrabold tracking-tight text-brand">
                  OM MARKETING
                </span>
                <span className="block text-[11px] font-medium tracking-wide text-subtle">
                  Weighing Solutions Since {site.established}
                </span>
              </span>
            </Link>

            {/* Desktop links */}
            <ul className="hidden items-center gap-1 xl:flex">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={`relative flex h-11 items-center rounded-lg px-3 text-[15px] font-medium transition-colors ${
                      isActive(link.href)
                        ? 'text-brand'
                        : 'text-muted hover:text-brand'
                    }`}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 bottom-1.5 h-0.5 rounded-full bg-primary-500"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <form onSubmit={handleSearch} role="search" className="hidden md:block">
                <label htmlFor="nav-search" className="sr-only">
                  Search products
                </label>
                <div className="relative">
                  <FiSearch
                    aria-hidden
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle"
                  />
                  <input
                    id="nav-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search scales…"
                    className="field h-11 w-40 pl-9 lg:w-56"
                  />
                </div>
              </form>

              <Link
                href="/quote"
                className="relative flex h-11 w-11 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-3 hover:text-brand"
                aria-label={
                  quoteCount > 0
                    ? `Your quote list, ${quoteCount} item${quoteCount === 1 ? '' : 's'}`
                    : 'Your quote list, empty'
                }
              >
                <FiFileText size={21} aria-hidden />
                {quoteCount > 0 && (
                  <span className="animate-scale-in absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-500 px-1 text-[11px] font-bold text-ink-900">
                    {quoteCount > 99 ? '99+' : quoteCount}
                  </span>
                )}
              </Link>

              <a
                href={whatsappLink(
                  `Hello OM Marketing, I'd like to know more about your weighing scales.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary hidden h-11 px-4 text-sm sm:inline-flex"
              >
                Get a Quote
              </a>

              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                className="flex h-11 w-11 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-3 xl:hidden"
              >
                {isMenuOpen ? <FiX size={24} aria-hidden /> : <FiMenu size={24} aria-hidden />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-ink-950/45 xl:hidden"
              aria-hidden
            />
            <motion.div
              ref={panelRef}
              id="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(22rem,88vw)] flex-col overflow-y-auto bg-surface shadow-2xl xl:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <span className="font-[family-name:var(--font-display)] font-bold text-brand">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    menuButtonRef.current?.focus();
                  }}
                  aria-label="Close menu"
                  className="flex h-11 w-11 items-center justify-center rounded-lg text-muted hover:bg-surface-3"
                >
                  <FiX size={22} aria-hidden />
                </button>
              </div>

              <form onSubmit={handleSearch} role="search" className="border-b border-line p-5">
                <label htmlFor="mobile-search" className="sr-only">
                  Search products
                </label>
                <div className="relative">
                  <FiSearch
                    aria-hidden
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle"
                  />
                  <input
                    id="mobile-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products…"
                    className="field pl-9"
                  />
                </div>
              </form>

              <ul className="flex-1 p-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive(link.href) ? 'page' : undefined}
                      className={`flex min-h-[52px] items-center justify-between rounded-xl px-4 text-[15px] font-medium transition-colors ${
                        isActive(link.href)
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-content hover:bg-surface-3'
                      }`}
                    >
                      {link.label}
                      <FiChevronRight aria-hidden className="text-subtle" />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="space-y-2 border-t border-line p-5">
                <a href={`tel:${site.phoneDial}`} className="btn-outline w-full">
                  <FiPhone aria-hidden /> {site.phoneDisplay}
                </a>
                <a
                  href={whatsappLink('Hello OM Marketing, I have an enquiry.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
