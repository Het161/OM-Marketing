// frontend/src/components/ui/FloatingContact.tsx

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiMail, FiMessageCircle, FiPhone, FiPlus } from 'react-icons/fi';

import { site, whatsappLink } from '@/lib/site';

/**
 * Floating contact dial: WhatsApp, call and email, always one tap away.
 * WhatsApp is the primary channel for Indian B2B buyers, so it stays visible
 * on its own; the rest expand from the "+" button.
 */
export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setIsOpen(false), [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const actions = [
    {
      href: `tel:${site.phoneDial}`,
      label: `Call ${site.phoneDisplay}`,
      short: 'Call us',
      icon: FiPhone,
      className: 'bg-primary-500 text-white hover:bg-primary-600',
      external: false,
    },
    {
      href: `mailto:${site.email}`,
      label: `Email ${site.email}`,
      short: 'Email us',
      icon: FiMail,
      className: 'bg-accent-500 text-ink-900 hover:bg-accent-400',
      external: false,
    },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 print:hidden">
      <AnimatePresence>
        {isOpen &&
          actions.map((action, index) => (
            <motion.a
              key={action.href}
              href={action.href}
              aria-label={action.label}
              initial={{ opacity: 0, y: 12, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.85 }}
              transition={{ duration: 0.18, delay: index * 0.04 }}
              className="group flex items-center gap-3"
            >
              <span className="rounded-lg bg-ink-900 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                {action.short}
              </span>
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-colors ${action.className}`}
              >
                <action.icon size={20} aria-hidden />
              </span>
            </motion.a>
          ))}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Hide contact options' : 'Show more contact options'}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-muted shadow-lg ring-1 ring-line transition-colors hover:text-primary-600"
        >
          <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
            <FiPlus size={22} aria-hidden />
          </motion.span>
        </button>

        <a
          href={whatsappLink(
            `Hello OM Marketing, I'd like to enquire about your weighing scales.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with OM Marketing on WhatsApp"
          className="flex h-14 items-center gap-2.5 rounded-full bg-[#25D366] px-5 font-semibold text-white shadow-[0_8px_28px_rgb(37,211,102,0.45)] transition-transform duration-200 hover:scale-105 active:scale-100"
        >
          <FiMessageCircle size={22} aria-hidden />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
