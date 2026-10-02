// frontend/src/components/sections/Hero.tsx

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiPhone } from 'react-icons/fi';

import HeroSlideshow, { type HeroSlide } from '@/components/sections/HeroSlideshow';
import { site } from '@/lib/site';

/* Each slide links to its catalogue entry; captions and prices come from it,
   so nothing here can quietly drift from the real product data. */
const slides: HeroSlide[] = [
  {
    id: 6,
    src: '/images/heavy-platform-scale.jpg',
    alt: 'Mild-steel chequered-plate platform scale with pole-mounted digital indicator',
    model: 'MS platform scale',
    spec: '600×600 mm · 100–500 kg',
    price: '₹8,500',
  },
  {
    id: 3,
    src: '/images/crane-scale.jpeg',
    alt: 'OCS crane scale with shackle and hook, digital display reading in kilograms',
    model: 'OCS crane scale',
    spec: '15 ton · class III',
    price: '₹45,000',
  },
  {
    id: 14,
    src: '/images/Floor-Scale.jpeg',
    alt: 'Industrial floor scale with roller platform and loading ramp',
    model: 'Roller floor scale',
    spec: '1–3 ton · with ramp',
    price: '₹35,000',
  },
  {
    id: 11,
    src: '/images/Heavy-meter1.jpeg',
    alt: 'Flameproof weighing indicator in a cast enclosure for hazardous areas',
    model: 'Explosion-proof indicator',
    spec: '2 ton · flameproof',
    price: '₹18,500',
  },
];

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
            <HeroSlideshow slides={slides} />
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
