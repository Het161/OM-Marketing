'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Collection' },
  { href: '/categories', label: 'Categories' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.getTotalItems());

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setIsMenuOpen(false), 0);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#14110F]/92 backdrop-blur-md border-b border-[rgba(196,166,107,0.15)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        {/* Top utility strip — visible always */}
        <div className="hidden lg:block border-b border-[rgba(196,166,107,0.08)]">
          <div className="max-w-[1400px] mx-auto px-8 h-9 flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-brand-muted">
            <span>Est. 2010 · Naroda, Ahmedabad</span>
            <span>Pan-India dispatch · ISO 9001:2008</span>
          </div>
        </div>

        <nav className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center h-20">

            {/* ── Left: Desktop nav links ── */}
            <div className="hidden lg:flex items-center gap-9">
              {navLinks.map((link) => {
                const isActive =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`link-gold text-[11px] uppercase tracking-[0.25em] font-medium transition-colors ${
                      isActive ? 'text-brand-gold' : 'text-brand-ivory/85 hover:text-brand-ivory'
                    }`}
                    data-active={isActive}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* ── Mobile: hamburger left ── */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden btn-touch flex items-center justify-start text-brand-ivory -ml-2"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X strokeWidth={1} size={26} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ opacity: 0, rotate: 45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -45 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu strokeWidth={1} size={26} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* ── Center: Wordmark ── */}
            <Link
              href="/"
              className="font-display text-[1.65rem] sm:text-[1.85rem] tracking-[0.32em] text-brand-ivory text-center whitespace-nowrap select-none"
            >
              OM&nbsp;MARKETING
            </Link>

            {/* ── Right: Utility icons ── */}
            <div className="flex items-center justify-end gap-1 sm:gap-2">
              <button
                aria-label="Search"
                className="btn-touch flex items-center justify-center text-brand-ivory/80 hover:text-brand-gold transition-colors"
              >
                <Search strokeWidth={1} size={20} />
              </button>
              <Link
                href="/contact"
                aria-label="Account"
                className="hidden sm:flex btn-touch items-center justify-center text-brand-ivory/80 hover:text-brand-gold transition-colors"
              >
                <User strokeWidth={1} size={20} />
              </Link>
              <Link
                href="/cart"
                aria-label="Bag"
                className="relative btn-touch flex items-center justify-center text-brand-ivory/80 hover:text-brand-gold transition-colors"
              >
                <ShoppingBag strokeWidth={1} size={20} />
                {totalItems > 0 && (
                  <span
                    className="absolute top-1.5 right-1 min-w-[16px] h-[16px] px-[3px] bg-brand-gold text-[10px] font-medium text-brand-canvas flex items-center justify-center"
                    style={{ borderRadius: 2 }}
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </nav>

        {/* ── Mobile drawer ── */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden overflow-hidden bg-[#14110F] border-t border-[rgba(196,166,107,0.15)]"
            >
              <div className="px-6 py-8 flex flex-col gap-1">
                {navLinks.map((link, idx) => {
                  const isActive =
                    link.href === '/'
                      ? pathname === '/'
                      : pathname.startsWith(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + idx * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={link.href}
                        className={`block py-4 font-display text-2xl tracking-wide border-b border-[rgba(196,166,107,0.1)] ${
                          isActive ? 'text-brand-gold italic' : 'text-brand-ivory'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.35 }}
                  className="mt-6 pt-6 border-t border-[rgba(196,166,107,0.12)]"
                >
                  <p className="eyebrow mb-3">Naroda, Ahmedabad</p>
                  <a href="tel:9825247312" className="link-gold block text-sm text-brand-ivory mb-1.5">
                    +91 98252 47312
                  </a>
                  <a
                    href="mailto:ommarketing.weighingscale1@gmail.com"
                    className="link-gold block text-sm text-brand-muted break-all"
                  >
                    ommarketing.weighingscale1@gmail.com
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer so content starts below fixed header */}
      <div className="h-20 lg:h-[116px]" />
    </>
  );
}
