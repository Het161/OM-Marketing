// frontend/src/components/sections/Hero.tsx

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiCheckCircle, FiPhone } from 'react-icons/fi';

import { site } from '@/lib/site';

const highlights = [
  'Scales from 10 kg to 15 ton',
  'On-site calibration & repair',
  'Same-day support in Ahmedabad',
];

const stats = [
  { value: `${new Date().getFullYear() - site.established}+`, label: 'Years in business' },
  { value: '1000+', label: 'Businesses served' },
  { value: '15 T', label: 'Max capacity' },
  { value: 'ISO', label: '9001:2008' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-950">
      {/* Ambient brand glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-primary-500/25 blur-3xl" />
        <div className="absolute -bottom-40 right-[-10%] h-[30rem] w-[30rem] rounded-full bg-accent-500/12 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
        {/* Copy */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-4 py-1.5 text-[13px] font-bold tracking-wide text-accent-300"
          >
            ⚖️ {site.certification} · Since {site.established}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl"
          >
            Weighing solutions
            <br />
            <span className="text-gradient">Ahmedabad trusts</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-ink-200"
          >
            Table-top, platform and crane scales, note counters and mobile
            accessories — supplied, installed, calibrated and serviced by a team
            that answers the phone.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5"
          >
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-ink-200">
                <FiCheckCircle aria-hidden className="shrink-0 text-primary-400" />
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link href="/products" className="btn-primary">
              Browse Products <FiArrowRight aria-hidden />
            </Link>
            <Link
              href="/scale-finder"
              className="btn-outline border-white/35 text-white hover:border-white hover:bg-white hover:text-ink-900"
            >
              Which scale do I need?
            </Link>
            <a
              href={`tel:${site.phoneDial}`}
              className="btn-ghost text-ink-200 hover:bg-white/10 hover:text-white"
            >
              <FiPhone aria-hidden /> {site.phoneDisplay}
            </a>
          </motion.div>

          {/* Stats */}
          <motion.dl
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-11 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-7 sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-[family-name:var(--font-display)] text-2xl font-extrabold text-white">
                    {stat.value}
                  </span>
                  <span className="mt-0.5 block text-xs text-ink-400">{stat.label}</span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Imagery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 shadow-2xl sm:aspect-[4/3] lg:aspect-[4/5]">
            <Image
              src="/images/heavy-platform-scale.jpg"
              alt="Heavy-duty chequered-plate platform scale with digital indicator, supplied by OM Marketing"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent"
            />
          </div>

          {/* Floating spec chip */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="absolute -bottom-5 -left-3 rounded-2xl border border-line bg-surface p-4 shadow-xl sm:-left-6"
          >
            <span className="block text-[11px] font-bold uppercase tracking-wide text-subtle">
              Platform scales from
            </span>
            <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-primary-600">
              ₹8,500
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="absolute -right-3 top-6 rounded-2xl border border-line bg-surface px-4 py-3 shadow-xl sm:-right-6"
          >
            <span className="flex items-center gap-2 text-sm font-bold text-content">
              <span className="flex h-2.5 w-2.5 shrink-0 rounded-full bg-green-500" />
              Service in 24 hrs
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
