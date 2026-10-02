// frontend/src/components/ui/FloatingContact.tsx

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiMail, FiMessageCircle, FiPhone, FiX } from 'react-icons/fi';

import { site, whatsappLink } from '@/lib/site';

/**
 * Persistent contact bar.
 *
 * Deliberately not a bright green floating pill: on this palette that reads
 * as a bolted-on widget. It is a squared, ink-coloured bar that matches the
 * rest of the system, with WhatsApp's green kept only as a small indicator.
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
      href: whatsappLink(
        `Hello OM Marketing, I'd like to enquire about your weighing equipment.`,
      ),
      label: 'WhatsApp',
      detail: site.phoneDisplay,
      icon: FiMessageCircle,
      external: true,
      dot: '#25D366',
    },
    {
      href: `tel:${site.phoneDial}`,
      label: 'Call',
      detail: site.phoneDisplay,
      icon: FiPhone,
      external: false,
    },
    {
      href: `mailto:${site.email}`,
      label: 'Email',
      detail: site.email,
      icon: FiMail,
      external: false,
    },
  ];

  return (
    <div className="fixed bottom-0 right-0 z-40 p-4 sm:bottom-6 sm:right-6 sm:p-0 print:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mb-2 w-[min(19rem,calc(100vw-2rem))] border border-ink-800 bg-ink-950"
          >
            {actions.map((action) => (
              <li key={action.label}>
                <a
                  href={action.href}
                  target={action.external ? '_blank' : undefined}
                  rel={action.external ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3.5 border-b border-ink-800 px-4 py-3.5 transition-colors last:border-b-0 hover:bg-ink-900"
                >
                  <action.icon aria-hidden size={16} className="shrink-0 text-steel-400" />
                  <span className="min-w-0 flex-1">
                    <span className="label block text-steel-500">{action.label}</span>
                    <span className="data mt-1 block truncate text-[0.8125rem] text-steel-200">
                      {action.detail}
                    </span>
                  </span>
                  {action.dot && (
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 shrink-0"
                      style={{ background: action.dot }}
                    />
                  )}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close contact options' : 'Contact OM Marketing'}
        className="label ml-auto flex h-12 items-center gap-2.5 border border-ink-800 bg-ink-950 px-4 text-white transition-colors hover:bg-ink-900"
      >
        {isOpen ? (
          <>
            <FiX aria-hidden size={15} /> Close
          </>
        ) : (
          <>
            <span aria-hidden className="h-1.5 w-1.5 bg-[#25D366]" />
            Contact us
          </>
        )}
      </button>
    </div>
  );
}
