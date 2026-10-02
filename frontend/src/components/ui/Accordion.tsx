// frontend/src/components/ui/Accordion.tsx

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

export interface AccordionItem {
  question: string;
  answer: React.ReactNode;
}

/**
 * Progressive disclosure for FAQs — answers stay collapsed until asked for,
 * keeping the page scannable.
 */
export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border-t border-line">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                id={`faq-button-${index}`}
                className="group flex w-full items-center justify-between gap-6 border-b border-line py-5 text-left text-[0.9375rem] font-semibold tracking-[-0.01em] transition-colors hover:text-brand"
              >
                <span className="flex items-baseline gap-5">
                  <span className="section-index">{String(index + 1).padStart(2, '0')}</span>
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 text-subtle transition-colors group-hover:text-brand"
                >
                  <FiChevronDown size={20} aria-hidden />
                </motion.span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-button-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="max-w-2xl border-b border-line pb-6 pr-10 text-[0.9375rem] leading-relaxed text-muted">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
