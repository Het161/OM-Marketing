// frontend/src/components/sections/Hero.tsx

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiPhone } from 'react-icons/fi';

import { site } from '@/lib/site';

/* Capability strip — reads as factory signage, and every claim is checkable. */
const capabilities = [
  'Table-top scales',
  'Platform scales',
  'Crane scales 15 T',
  'Explosion-proof indicators',
  'Note counters',
  'On-site calibration',
  'Legal Metrology stamping',
  'Load cell replacement',
  'Annual maintenance',
  'Scale on rent',
];

/* The spec block. Figures only — no invented customer counts. */
const specs = [
  { k: 'Capacity', v: '10 kg – 15 T' },
  { k: 'Quality', v: 'ISO 9001:2008' },
  { k: 'Registered', v: 'MSME Udyam' },
  { k: 'Coverage', v: 'Gujarat' },
];

export default function Hero() {
  const reduced = useReducedMotion();

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section className="relative bg-ink-950 text-steel-50">
      {/* Engineering grid, not a colour blob */}
      <div aria-hidden className="pointer-events-none absolute inset-0 text-white/70">
        <div className="grid-rule absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 border-x border-white/10 lg:grid-cols-12 lg:gap-x-10">
          {/* ---------------------------------------------------- copy */}
          <div className="px-4 pb-14 pt-14 sm:px-8 lg:col-span-7 lg:pb-24 lg:pt-20">
            <motion.div {...rise(0)} className="flex items-center gap-3">
              <span className="label label-accent text-primary-200">
                Naroda &amp; Nikol, Ahmedabad
              </span>
              <span aria-hidden className="h-px flex-1 bg-white/15" />
              <span className="label text-steel-400">Est. Gujarat</span>
            </motion.div>

            <motion.h1
              {...rise(0.06)}
              className="display mt-8 text-[clamp(2.75rem,7.2vw,5.25rem)] text-white"
            >
              Weighing equipment,
              <br />
              <span className="text-primary-300">supplied and serviced.</span>
            </motion.h1>

            <motion.p
              {...rise(0.12)}
              className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-steel-300"
            >
              Table-top, platform and crane scales, note counters and
              industrial indicators — installed, calibrated and repaired by our
              own technicians across Gujarat.
            </motion.p>

            <motion.div {...rise(0.18)} className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/products"
                className="btn-secondary group h-12 px-6 text-[0.9375rem]"
              >
                View the range
                <FiArrowRight
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="/scale-finder"
                className="btn-outline h-12 border-white/25 px-6 text-[0.9375rem] text-white hover:border-white hover:bg-white hover:text-ink-950"
              >
                Specify my scale
              </Link>
              <a
                href={`tel:${site.phoneDial}`}
                className="data ml-1 inline-flex h-12 items-center gap-2 text-[0.9375rem] text-steel-300 transition-colors hover:text-white"
              >
                <FiPhone aria-hidden size={15} /> {site.phoneDisplay}
              </a>
            </motion.div>

            {/* Spec table — a drawing block, not stat cards */}
            <motion.dl
              {...rise(0.26)}
              className="mt-14 grid max-w-xl grid-cols-2 border-t border-white/12 sm:grid-cols-4"
            >
              {specs.map((spec) => (
                <div
                  key={spec.k}
                  className="border-b border-r border-white/12 py-4 pr-4 last:border-r-0 sm:border-b-0"
                >
                  <dt className="label text-steel-400">{spec.k}</dt>
                  <dd className="data mt-2 text-[0.9375rem] font-medium text-white">
                    {spec.v}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* --------------------------------------------------- image */}
          <motion.figure
            {...rise(0.1)}
            className="relative border-white/10 lg:col-span-5 lg:border-l"
          >
            <div className="relative h-full min-h-[22rem] overflow-hidden lg:min-h-full">
              <Image
                src="/images/heavy-platform-scale.jpg"
                alt="Chequered-plate platform scale with pole-mounted digital indicator"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              {/* Unify an uneven phone photo: desaturate, deepen, cool it */}
              <div
                aria-hidden
                className="absolute inset-0 bg-ink-950/35 mix-blend-multiply"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/10 to-transparent"
              />

              {/* Corner register marks — a drawing convention */}
              <span aria-hidden className="absolute left-4 top-4 h-5 w-5 border-l border-t border-white/35" />
              <span aria-hidden className="absolute right-4 top-4 h-5 w-5 border-r border-t border-white/35" />

              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                <span className="label text-steel-300">
                  MS platform · 400×400 mm
                </span>
                <span className="data text-right text-sm text-white">
                  <span className="label block text-steel-400">From</span>₹8,500
                </span>
              </figcaption>
            </div>
          </motion.figure>
        </div>
      </div>

      {/* Capability ticker */}
      <div className="marquee relative overflow-hidden border-y border-white/10 bg-ink-900/60 py-3.5">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center"
            >
              {capabilities.map((item) => (
                <li key={item} className="flex items-center whitespace-nowrap px-6">
                  <span className="label text-steel-400">{item}</span>
                  <span aria-hidden className="ml-6 h-1 w-1 bg-primary-400" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
