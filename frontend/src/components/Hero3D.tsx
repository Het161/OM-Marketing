'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero3D() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Subtle radial wash to lift the canvas slightly */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(196,166,107,0.06) 0%, transparent 65%)',
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-8 pt-16 sm:pt-24 lg:pt-32 pb-20 sm:pb-28 lg:pb-36">
        <div className="max-w-4xl mx-auto text-center">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: E }}
            className="eyebrow mb-8"
          >
            Est. 2010 · Naroda, Ahmedabad
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: E }}
            className="font-display text-[2.6rem] sm:text-[3.6rem] md:text-[4.5rem] lg:text-[5.4rem] leading-[1.02] text-brand-ivory tracking-[-0.01em]"
          >
            Precision{' '}
            <em className="italic text-brand-gold font-light">instruments</em>
            <br className="hidden sm:block" />
            <span className="sm:inline"> for industry.</span>
          </motion.h1>

          {/* Subcopy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: E }}
            className="mt-10 text-base sm:text-lg text-brand-muted leading-[1.7] max-w-2xl mx-auto"
          >
            Curated weighing scales, note counters, and mobile accessories —
            supplied to 2,400&nbsp;retailers across India from our Naroda
            atelier since&nbsp;2010.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease: E }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/products" className="btn-gold">
              Explore Collection
              <ArrowRight strokeWidth={1.25} size={16} />
            </Link>
            <Link href="/contact" className="btn-outline">
              Book a Demo
            </Link>
          </motion.div>

          {/* Hairline accent below CTAs */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1.0, ease: E }}
            className="mt-20 mx-auto h-px w-24 bg-brand-gold/60 origin-center"
          />
        </div>
      </div>
    </section>
  );
}
