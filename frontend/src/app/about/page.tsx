'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Award,
  Wrench,
  Truck,
  Heart,
  Sparkles,
  ArrowUpRight,
  MessageCircle,
  Phone,
} from 'lucide-react';

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];
const WHATSAPP_NUMBER = '919825247312';

const stats = [
  { value: '15', suffix: '+', label: 'Years of Practice' },
  { value: '2,400', suffix: '+', label: 'Retailers Served' },
  { value: '4.8', suffix: '★', label: 'Client Rating' },
  { value: '3', suffix: '', label: 'Trusted Brands' },
];

const milestones = [
  {
    year: '2010',
    title: 'Founded in Naroda',
    desc: 'OM Marketing established as a single-shop scale dealer in Naroda, Ahmedabad.',
  },
  {
    year: '2013',
    title: 'ISO 9001:2008 Certified',
    desc: 'Achieved international quality certification — a commitment we still uphold today.',
  },
  {
    year: '2017',
    title: '1,000 Retailers',
    desc: 'Crossed the first thousand-shop milestone across Gujarat.',
  },
  {
    year: '2021',
    title: 'Pan-India Dispatch',
    desc: 'Expanded logistics to deliver to retailers across India within 3–7 days.',
  },
  {
    year: '2026',
    title: '2,400+ Retailers',
    desc: 'Serving kirana, poultry, jewellery and industrial counters nationwide.',
  },
];

const brands = [
  {
    name: 'Deluxe',
    tagline: 'Stainless steel mini & platform scales',
    detail: '10–500 kg · Stamping certificate included · Table-top to 24×24″ chicken platform',
  },
  {
    name: 'JB',
    tagline: 'Heavy-duty platform & checker-plate scales',
    detail: 'Industrial-grade structure · Pole-mount displays · Floor scales for godowns',
  },
  {
    name: 'Unique',
    tagline: 'ISO 9001 certified electronic scales',
    detail: 'By Shiva Industries · Mini, platform, crane & PRC variants · 4V battery backup',
  },
];

const values = [
  {
    icon: Award,
    title: 'Authorised Dealer',
    copy: 'Direct supply from Deluxe, JB and Unique — never grey-market.',
  },
  {
    icon: ShieldCheck,
    title: 'Stamping Certificate',
    copy: 'Every scale ships with W&M Legal Metrology certification.',
  },
  {
    icon: Wrench,
    title: 'On-site Installation',
    copy: 'Calibration, training and setup at your premises in Gujarat.',
  },
  {
    icon: Truck,
    title: 'Pan-India Dispatch',
    copy: 'Full-box packing, dispatched within 24 hours of confirmation.',
  },
  {
    icon: Heart,
    title: 'Repair-first Service',
    copy: 'We service what we sell. Lifetime atelier support, never throw-and-replace.',
  },
  {
    icon: Sparkles,
    title: 'Fair, Honest Pricing',
    copy: 'Catalog pricing with no hidden margins. GST optional, +18% if needed.',
  },
];

export default function AboutPage() {
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
            <p className="eyebrow mb-5">About the Atelier</p>
            <h1 className="font-display text-[2.6rem] sm:text-[3.6rem] lg:text-[4.4rem] leading-[1.03] text-brand-ivory">
              Fifteen years of{' '}
              <em className="italic text-brand-gold font-light">honest weighing.</em>
            </h1>
            <p className="mt-6 text-brand-muted leading-relaxed max-w-xl">
              OM Marketing is a Naroda-based dealer of premium weighing scales,
              note counters and mobile accessories — serving 2,400+ retailers
              across India since 2010.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats band ── */}
      <section className="border-b border-[rgba(196,166,107,0.15)]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: E }}
            className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[rgba(196,166,107,0.15)]"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="py-10 sm:py-14 px-4 sm:px-8 text-center"
              >
                <div className="font-display text-[2.6rem] sm:text-[3.4rem] leading-none text-brand-ivory">
                  {stat.value}
                  {stat.suffix && (
                    <span className="text-brand-gold ml-1">{stat.suffix}</span>
                  )}
                </div>
                <p className="mt-3 label text-brand-muted">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: E }}
                className="eyebrow mb-5"
              >
                Our Story
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: E }}
                className="font-display text-[2.2rem] sm:text-[2.8rem] leading-[1.05] text-brand-ivory"
              >
                A single Naroda counter,
                <br />
                <em className="italic text-brand-gold font-light">two thousand four hundred</em>{' '}
                shops later.
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.1, ease: E }}
              className="space-y-6 text-brand-muted leading-[1.85] text-[15px]"
            >
              <p>
                We started in 2010 with a single shop in Naroda, supplying
                weighing scales to kirana stores and small businesses across
                Ahmedabad. Word travelled — by year three we were dispatching
                to poultry farms in Anand and jewellery shops in Surat.
              </p>
              <p>
                Today, OM Marketing represents three of India&rsquo;s most
                trusted scale brands —{' '}
                <span className="text-brand-ivory">Deluxe</span>,{' '}
                <span className="text-brand-ivory">JB</span>, and{' '}
                <span className="text-brand-ivory">Unique</span> — and ships
                pan-India. Every instrument leaves our atelier with a
                stamping certificate; every customer gets the same direct line
                to our team in Naroda.
              </p>
              <p>
                Our promise is unchanged from day one:{' '}
                <span className="text-brand-ivory italic">
                  the right scale, at the right price, calibrated correctly.
                </span>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="border-t border-[rgba(196,166,107,0.15)] py-20 sm:py-28">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: E }}
            className="mb-14 text-center"
          >
            <p className="eyebrow mb-5">Milestones</p>
            <h2 className="font-display text-[2.2rem] sm:text-[2.8rem] leading-[1.05] text-brand-ivory">
              The <em className="italic text-brand-gold font-light">long way</em> here.
            </h2>
          </motion.div>

          <div className="relative">
            {/* vertical hairline */}
            <div className="absolute left-[15px] sm:left-1/2 top-2 bottom-2 w-px bg-[rgba(196,166,107,0.25)] sm:-translate-x-px" />

            <div className="space-y-12 sm:space-y-16">
              {milestones.map((m, i) => {
                const flip = i % 2 === 1;
                return (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.7, delay: i * 0.05, ease: E }}
                    className={`relative grid grid-cols-[40px_1fr] sm:grid-cols-2 gap-6 sm:gap-16 ${
                      flip ? 'sm:[&>div:first-child]:order-2' : ''
                    }`}
                  >
                    {/* dot column (mobile) / left content (desktop) */}
                    <div
                      className={`hidden sm:block ${flip ? 'sm:text-left' : 'sm:text-right'}`}
                    >
                      {!flip && (
                        <>
                          <p className="font-display text-3xl text-brand-gold mb-2">
                            {m.year}
                          </p>
                          <h3 className="font-display text-xl text-brand-ivory mb-3">
                            {m.title}
                          </h3>
                          <p className="text-sm text-brand-muted leading-relaxed">
                            {m.desc}
                          </p>
                        </>
                      )}
                    </div>

                    {/* central dot */}
                    <div className="hidden sm:flex absolute left-1/2 top-3 -translate-x-1/2 w-2.5 h-2.5 bg-brand-gold" />

                    {/* mobile dot */}
                    <div className="sm:hidden relative flex justify-center pt-3">
                      <div className="w-2.5 h-2.5 bg-brand-gold" />
                    </div>

                    {/* right content (desktop) / main content (mobile) */}
                    <div className="sm:text-left">
                      {flip ? (
                        <>
                          <p className="font-display text-3xl text-brand-gold mb-2">
                            {m.year}
                          </p>
                          <h3 className="font-display text-xl text-brand-ivory mb-3">
                            {m.title}
                          </h3>
                          <p className="text-sm text-brand-muted leading-relaxed">
                            {m.desc}
                          </p>
                        </>
                      ) : (
                        <div className="sm:hidden">
                          <p className="font-display text-3xl text-brand-gold mb-2">
                            {m.year}
                          </p>
                          <h3 className="font-display text-xl text-brand-ivory mb-3">
                            {m.title}
                          </h3>
                          <p className="text-sm text-brand-muted leading-relaxed">
                            {m.desc}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Brands ── */}
      <section className="border-t border-[rgba(196,166,107,0.15)] bg-[#1A1612] py-20 sm:py-28">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: E }}
            className="mb-14 max-w-2xl"
          >
            <p className="eyebrow mb-5">The Houses We Represent</p>
            <h2 className="font-display text-[2.2rem] sm:text-[2.8rem] leading-[1.05] text-brand-ivory">
              Three brands,
              <br />
              <em className="italic text-brand-gold font-light">one standard.</em>
            </h2>
            <p className="mt-6 text-brand-muted leading-relaxed">
              We are direct authorised dealers for each — no resellers in the
              middle, no compromise on parts or service.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {brands.map((brand, i) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: E }}
                className="surface p-8 sm:p-9 flex flex-col"
              >
                <p className="eyebrow text-brand-muted mb-5">House {i + 1}</p>
                <h3 className="font-display text-[2.4rem] leading-none text-brand-ivory mb-4">
                  {brand.name}
                </h3>
                <p className="text-brand-gold text-sm tracking-[0.05em] mb-5">
                  {brand.tagline}
                </p>
                <p className="text-sm text-brand-muted leading-relaxed flex-1">
                  {brand.detail}
                </p>
                <Link
                  href="/products"
                  className="mt-8 link-gold text-[10px] tracking-[0.25em] uppercase text-brand-ivory/85 hover:text-brand-gold inline-flex items-center gap-2"
                >
                  Browse {brand.name}
                  <ArrowUpRight strokeWidth={1.25} size={12} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why us ── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: E }}
            className="mb-14 max-w-2xl"
          >
            <p className="eyebrow mb-5">What We Stand For</p>
            <h2 className="font-display text-[2.2rem] sm:text-[2.8rem] leading-[1.05] text-brand-ivory">
              Six things we{' '}
              <em className="italic text-brand-gold font-light">never compromise.</em>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {values.map(({ icon: Icon, title, copy }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: E }}
                className="flex flex-col"
              >
                <div className="text-brand-gold mb-5">
                  <Icon strokeWidth={1} size={28} />
                </div>
                <h3 className="font-display text-xl text-brand-ivory mb-3">
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
      <section className="border-t border-[rgba(196,166,107,0.15)] py-24 sm:py-32">
        <div className="max-w-[900px] mx-auto px-6 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: E }}
          >
            <p className="eyebrow mb-5">Speak With Us</p>
            <h2 className="font-display text-[2.2rem] sm:text-[3rem] leading-[1.05] text-brand-ivory">
              The right scale at the
              <br />
              <em className="italic text-brand-gold font-light">right price.</em>
            </h2>
            <p className="mt-8 text-brand-muted leading-relaxed max-w-xl mx-auto">
              Tell us what you weigh, where you weigh, and how often. We&apos;ll
              recommend exactly what you need — usually within an hour.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  'Hello, I would like a recommendation for a weighing scale.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                <MessageCircle strokeWidth={1.25} size={14} />
                WhatsApp Concierge
              </a>
              <a href="tel:9825247312" className="btn-outline">
                <Phone strokeWidth={1.25} size={14} />
                +91 98252 47312
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
