'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, MessageCircle, Mail, Phone, MapPin, Instagram as InstagramIcon, Linkedin as LinkedinIcon } from 'lucide-react';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Collection' },
  { href: '/categories', label: 'Categories' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const categoryLinks = [
  { href: '/products?category=weighing_scale', label: 'Weighing Scales' },
  { href: '/products?category=note_counter', label: 'Note Counters' },
  { href: '/products?category=mobile_accessory', label: 'Mobile Accessories' },
];

const WHATSAPP_NUMBER = '919825247312';
const whatsappMessage = encodeURIComponent(
  "Hi, I'd like to enquire about your weighing solutions."
);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <footer className="bg-brand-canvas border-t border-[rgba(196,166,107,0.15)]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8">

          {/* ── Editorial top band ── */}
          <div className="py-20 grid lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-12 lg:gap-16">

            {/* Brand */}
            <div>
              <Link
                href="/"
                className="font-display text-3xl tracking-[0.32em] text-brand-ivory block mb-6"
              >
                OM&nbsp;MARKETING
              </Link>
              <p className="text-sm text-brand-muted leading-relaxed mb-6 max-w-xs">
                Precision weighing solutions for India&rsquo;s most discerning retailers.
                Curated since 2010 from Naroda, Ahmedabad.
              </p>
              <p className="eyebrow text-brand-dim">ISO 9001:2008 Certified</p>

              <div className="mt-8 flex gap-3">
                <a
                  href="https://instagram.com/om_marketing"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 flex items-center justify-center border border-[rgba(196,166,107,0.25)] text-brand-ivory/80 hover:border-brand-gold hover:text-brand-gold transition-colors"
                  style={{ borderRadius: 2 }}
                >
                  <InstagramIcon strokeWidth={1} size={16} />
                </a>
                <a
                  href="https://www.linkedin.com/in/hetkumar-sanjaykumar-patel-54730933b"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 flex items-center justify-center border border-[rgba(196,166,107,0.25)] text-brand-ivory/80 hover:border-brand-gold hover:text-brand-gold transition-colors"
                  style={{ borderRadius: 2 }}
                >
                  <LinkedinIcon strokeWidth={1} size={16} />
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="eyebrow mb-6">Navigate</h3>
              <ul className="space-y-3.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="link-gold text-sm text-brand-ivory/80 hover:text-brand-ivory"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="eyebrow mb-6">Collection</h3>
              <ul className="space-y-3.5">
                {categoryLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="link-gold text-sm text-brand-ivory/80 hover:text-brand-ivory"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="eyebrow mb-6">Atelier</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm">
                  <MapPin strokeWidth={1} size={16} className="text-brand-gold mt-0.5 flex-shrink-0" />
                  <span className="text-brand-muted leading-relaxed">
                    Naroda, Ahmedabad<br />Gujarat, India
                  </span>
                </li>
                <li>
                  <a
                    href="tel:9825247312"
                    className="flex items-center gap-3 text-sm text-brand-ivory/85 hover:text-brand-gold transition-colors"
                  >
                    <Phone strokeWidth={1} size={16} className="text-brand-gold flex-shrink-0" />
                    <span>+91 98252 47312</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-brand-ivory/85 hover:text-brand-gold transition-colors"
                  >
                    <MessageCircle strokeWidth={1} size={16} className="text-brand-gold flex-shrink-0" />
                    <span>WhatsApp Concierge</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:ommarketing.weighingscale1@gmail.com"
                    className="flex items-start gap-3 text-sm text-brand-ivory/85 hover:text-brand-gold transition-colors"
                  >
                    <Mail strokeWidth={1} size={16} className="text-brand-gold flex-shrink-0 mt-0.5" />
                    <span className="break-all leading-relaxed">
                      ommarketing.weighingscale1<br />@gmail.com
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* ── Bottom strip ── */}
          <div className="border-t border-[rgba(196,166,107,0.12)] py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-brand-dim tracking-[0.15em] uppercase">
              © {currentYear} OM Marketing · All rights reserved
            </p>
            <p className="text-xs text-brand-dim tracking-[0.15em] uppercase">
              Crafted by{' '}
              <a
                href="https://buildbyhet.me"
                target="_blank"
                rel="noopener noreferrer"
                className="link-gold text-brand-ivory/80 hover:text-brand-gold"
              >
                Het Patel
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp — quiet, gold */}
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -2 }}
        className="fixed bottom-6 right-6 w-12 h-12 bg-brand-canvas border border-brand-gold text-brand-gold flex items-center justify-center hover:bg-brand-gold hover:text-brand-canvas transition-colors z-40"
        style={{ borderRadius: 2 }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle strokeWidth={1} size={20} />
      </motion.a>

      {/* Back-to-top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -2 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 w-12 h-12 bg-brand-canvas border border-[rgba(196,166,107,0.3)] text-brand-ivory/80 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-colors z-40"
            style={{ borderRadius: 2 }}
            aria-label="Back to top"
          >
            <ArrowUp strokeWidth={1} size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
