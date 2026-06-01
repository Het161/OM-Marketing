'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Scale,
  Banknote,
  Smartphone,
  ArrowUpRight,
  ShieldCheck,
  BadgeCheck,
  Truck,
  Wrench,
  MessageCircle,
} from 'lucide-react';

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];
const WHATSAPP_NUMBER = '919825247312';

const categories = [
  {
    id: 'weighing_scale',
    icon: Scale,
    name: 'Weighing Scales',
    tagline: 'Mini, platform & industrial',
    desc: 'From 10kg table-top counters to 500kg checker-plate platform scales. Stainless steel bodies, LED displays, stamping certificate included.',
    range: '₹1,950 — ₹8,500',
    examples: [
      'Mini table-top · 10/20/30 kg',
      'Chicken platform · 100–500 kg',
      'Regular platform · 200–500 kg',
      'Crane & hanging scales',
    ],
  },
  {
    id: 'note_counter',
    icon: Banknote,
    name: 'Note Counters',
    tagline: 'Cash counting & fake detection',
    desc: 'High-speed currency counters with UV fake-note detection. Built for jewellery shops, banks and retail counters.',
    range: 'On enquiry',
    examples: [
      'Basic note counters',
      'UV / IR / MG detection',
      'Mix-value counters',
      'Multi-currency variants',
    ],
  },
  {
    id: 'mobile_accessory',
    icon: Smartphone,
    name: 'Mobile Accessories',
    tagline: 'Charging, audio & protection',
    desc: 'Curated mobile accessories sourced from trusted brands — chargers, cables, audio gear and screen protection.',
    range: 'On enquiry',
    examples: [
      'Charging cables & adaptors',
      'Power banks',
      'Audio & earphones',
      'Screen protectors',
    ],
  },
];

const features = [
  {
    icon: BadgeCheck,
    title: 'Stamping Certificate',
    copy: 'W&M Legal Metrology certification on every scale.',
  },
  {
    icon: ShieldCheck,
    title: 'Authorised Dealer',
    copy: 'Direct supply from Deluxe, JB and Unique.',
  },
  {
    icon: Truck,
    title: 'Pan-India Dispatch',
    copy: 'Full-box packing · dispatched within 24 hours.',
  },
  {
    icon: Wrench,
    title: 'On-site Installation',
    copy: 'Calibration and training at your premises.',
  },
];

export default function CategoriesPage() {
  return (
    <div>
      {/* ── Editorial header ── */}
      <section className="border-b border-[rgba(196,166,107,0.15)]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: E }}
            className="max-w-3xl"
          >
            <nav className="label-sm text-brand-muted mb-6 flex items-center gap-2">
              <Link href="/" className="link-gold hover:text-brand-gold">Home</Link>
              <span className="text-brand-dim">/</span>
              <span className="text-brand-gold">Categories</span>
            </nav>

            <p className="eyebrow mb-5">The Archive, Sorted</p>
            <h1 className="font-display text-[2.6rem] sm:text-[3.6rem] lg:text-[4.2rem] leading-[1.05] text-brand-ivory">
              Three categories.
              <br />
              <em className="italic text-brand-gold font-light">One standard.</em>
            </h1>
            <p className="mt-6 text-brand-muted leading-relaxed max-w-xl">
              Browse by what you weigh, count or carry. Every piece is sourced
              from an authorised house and dispatched with a stamping
              certificate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Category grid ── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: E }}
                  className="surface p-8 sm:p-10 flex flex-col group"
                >
                  {/* Icon */}
                  <div className="text-brand-gold mb-8">
                    <Icon strokeWidth={1} size={40} />
                  </div>

                  {/* Title */}
                  <p className="eyebrow text-brand-muted mb-3">
                    Category {String(i + 1).padStart(2, '0')}
                  </p>
                  <h2 className="font-display text-[2rem] sm:text-[2.4rem] leading-[1.05] text-brand-ivory mb-3">
                    {cat.name}
                  </h2>
                  <p className="text-brand-gold text-sm tracking-[0.02em] mb-6">
                    {cat.tagline}
                  </p>

                  <div className="hairline-h mb-6" />

                  {/* Description */}
                  <p className="text-sm text-brand-muted leading-[1.75] mb-8">
                    {cat.desc}
                  </p>

                  {/* Examples */}
                  <ul className="space-y-3 mb-10">
                    {cat.examples.map((ex) => (
                      <li
                        key={ex}
                        className="flex items-start gap-3 text-sm text-brand-ivory/85"
                      >
                        <span className="text-brand-gold mt-1.5 text-[10px] flex-shrink-0">
                          ◆
                        </span>
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Footer */}
                  <div className="mt-auto pt-6 border-t border-[rgba(196,166,107,0.12)] flex items-end justify-between gap-4">
                    <div>
                      <p className="label-sm text-brand-muted mb-1">
                        Price range
                      </p>
                      <p className="font-display text-lg text-brand-gold">
                        {cat.range}
                      </p>
                    </div>
                    <Link
                      href={`/products?category=${cat.id}`}
                      className="link-gold text-[10px] tracking-[0.25em] uppercase text-brand-ivory/85 hover:text-brand-gold inline-flex items-center gap-2"
                    >
                      Browse
                      <ArrowUpRight strokeWidth={1.25} size={12} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Trust band ── */}
      <section className="border-t border-[rgba(196,166,107,0.15)] bg-[#1A1612] py-20 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: E }}
            className="mb-14 max-w-2xl"
          >
            <p className="eyebrow mb-5">What every piece includes</p>
            <h2 className="font-display text-[2.2rem] sm:text-[2.6rem] leading-[1.05] text-brand-ivory">
              Standards we hold for{' '}
              <em className="italic text-brand-gold font-light">every category.</em>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
            {features.map(({ icon: Icon, title, copy }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: E }}
              >
                <div className="text-brand-gold mb-5">
                  <Icon strokeWidth={1} size={28} />
                </div>
                <h3 className="font-display text-xl text-brand-ivory mb-2">
                  {title}
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  {copy}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="py-24 sm:py-32">
        <div className="max-w-[900px] mx-auto px-6 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: E }}
          >
            <p className="eyebrow mb-5">Not Sure Which?</p>
            <h2 className="font-display text-[2.2rem] sm:text-[3rem] leading-[1.05] text-brand-ivory">
              We&apos;ll help you{' '}
              <em className="italic text-brand-gold font-light">choose.</em>
            </h2>
            <p className="mt-8 text-brand-muted leading-relaxed max-w-xl mx-auto">
              Tell us what you weigh, where you weigh, and how often. We&apos;ll
              recommend exactly what fits your counter.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  'Hello, I need help choosing a category. My use case is:'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                <MessageCircle strokeWidth={1.25} size={14} />
                WhatsApp Concierge
              </a>
              <Link href="/products" className="btn-outline">
                Browse Everything
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
