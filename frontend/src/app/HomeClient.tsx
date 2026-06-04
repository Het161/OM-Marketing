'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Wrench, BadgeCheck, ArrowRight } from 'lucide-react';
import Hero3D from '@/components/Hero3D';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];

const stats = [
  { value: '15', suffix: '+', label: 'Years of Practice' },
  { value: '2,400', suffix: '+', label: 'Retailers Served' },
  { value: '4.8', suffix: '★', label: 'Client Rating' },
];

const trustItems = [
  {
    icon: ShieldCheck,
    title: 'Lifetime Warranty',
    copy: 'Every instrument is backed by our standing repair and replacement promise.',
  },
  {
    icon: Wrench,
    title: 'White-glove Installation',
    copy: 'On-site setup, calibration, and staff training across Gujarat & beyond.',
  },
  {
    icon: BadgeCheck,
    title: 'Certified Accuracy',
    copy: 'ISO 9001:2008 certified · W&M legal-for-trade where applicable.',
  },
];

export default function HomePage() {
  const { products, isLoading } = useProducts({ limit: 6 });
  const featured = products.slice(0, 3);

  return (
    <>
      <Hero3D />

      {/* ─────────────────────────────────────────────────────────────
         Stats band
         ───────────────────────────────────────────────────────────── */}
      <section className="border-y border-[rgba(196,166,107,0.15)]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: E }}
            className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(196,166,107,0.15)]"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="py-12 sm:py-16 px-4 sm:px-8 text-center"
              >
                <div className="font-display text-[3.4rem] sm:text-[4rem] leading-none text-brand-ivory">
                  {stat.value}
                  <span className="text-brand-gold ml-1">{stat.suffix}</span>
                </div>
                <p className="mt-4 label text-brand-muted">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
         Featured collection
         ───────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 lg:py-40">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: E }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-20"
          >
            <div className="max-w-2xl">
              <p className="eyebrow mb-5">The Collection</p>
              <h2 className="font-display text-[2.4rem] sm:text-[3.2rem] leading-[1.05] text-brand-ivory">
                Selected pieces,
                <br />
                <em className="italic text-brand-gold font-light">quietly engineered.</em>
              </h2>
            </div>
            <Link
              href="/products"
              className="link-gold text-[11px] tracking-[0.25em] uppercase text-brand-ivory/80 hover:text-brand-gold inline-flex items-center gap-2 self-start lg:self-end"
            >
              View the full archive
              <ArrowRight strokeWidth={1.25} size={14} />
            </Link>
          </motion.div>

          {/* Skeleton */}
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="surface aspect-[3/4] animate-pulse"
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          ) : featured.length === 0 ? (
            <div className="surface p-16 text-center">
              <p className="text-brand-muted text-sm tracking-[0.15em] uppercase">
                Loading the archive…
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featured.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  category={product.category}
                  price={product.price}
                  image_url={product.image_url}
                  description={product.description}
                  stock_quantity={product.stock_quantity}
                  priority={idx < 2}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
         Trust band
         ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-[rgba(196,166,107,0.15)] bg-[#1A1612]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-20 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: E }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
          >
            {trustItems.map(({ icon: Icon, title, copy }) => (
              <div
                key={title}
                className="text-center md:text-left flex flex-col items-center md:items-start"
              >
                <div className="mb-6 text-brand-gold">
                  <Icon strokeWidth={1} size={36} />
                </div>
                <h3 className="font-display text-2xl text-brand-ivory mb-3">
                  {title}
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed max-w-xs">
                  {copy}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
         Editorial closing CTA
         ───────────────────────────────────────────────────────────── */}
      <section className="py-28 sm:py-36">
        <div className="max-w-[900px] mx-auto px-6 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: E }}
          >
            <p className="eyebrow mb-6">A Personal Consultation</p>
            <h2 className="font-display text-[2.4rem] sm:text-[3.4rem] leading-[1.05] text-brand-ivory">
              Visit the atelier, or
              <br />
              <em className="italic text-brand-gold font-light">we&apos;ll come to you.</em>
            </h2>
            <p className="mt-8 text-brand-muted leading-relaxed max-w-xl mx-auto">
              For volume enquiries, calibration services, or a private demonstration —
              speak with our team in Naroda.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact" className="btn-gold">
                Arrange a Visit
              </Link>
              <a href="tel:9825247312" className="btn-outline">
                +91 98252 47312
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
