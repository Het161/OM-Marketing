// frontend/src/components/layout/PageHeader.tsx

'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * The masthead every inner page opens with.
 *
 * One component so the pages cannot drift apart, and so the ruled, indexed
 * language established on the home page carries through the whole site.
 */
export default function PageHeader({
  index,
  eyebrow,
  title,
  lead,
  actions,
  meta,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  actions?: React.ReactNode;
  meta?: Array<{ k: string; v: string }>;
}) {
  const reduced = useReducedMotion();

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <header className="relative overflow-hidden border-b border-line bg-ink-950 text-steel-50">
      <div
        aria-hidden
        className="grid-rule pointer-events-none absolute inset-0 text-white/70"
      />

      <div className="relative mx-auto max-w-[88rem] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <motion.div {...rise(0)} className="flex items-center gap-4">
          <span className="section-index text-steel-400">{index}</span>
          <span className="label text-primary-300">{eyebrow}</span>
          <span aria-hidden className="h-px flex-1 bg-white/15" />
        </motion.div>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <motion.div {...rise(0.06)} className="lg:col-span-7">
            <h1 className="display text-[clamp(2.25rem,5.2vw,4rem)] text-white">
              {title}
            </h1>
          </motion.div>

          {lead && (
            <motion.div {...rise(0.12)} className="lg:col-span-5">
              <p className="max-w-xl text-[1.0625rem] leading-relaxed text-steel-300">
                {lead}
              </p>
              {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
            </motion.div>
          )}
        </div>

        {meta && meta.length > 0 && (
          <motion.dl
            {...rise(0.2)}
            className="mt-14 grid border-t border-white/12 sm:grid-cols-2 lg:grid-cols-4"
          >
            {meta.map((item) => (
              <div
                key={item.k}
                className="border-b border-white/12 py-4 pr-6 sm:border-b-0 sm:border-r sm:last:border-r-0"
              >
                <dt className="label text-steel-400">{item.k}</dt>
                <dd className="data mt-2 text-[0.9375rem] text-white">{item.v}</dd>
              </div>
            ))}
          </motion.dl>
        )}
      </div>
    </header>
  );
}
