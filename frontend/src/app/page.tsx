// frontend/src/app/page.tsx

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  FiArrowRight,
  FiAward,
  FiHeadphones,
  FiMapPin,
  FiPhone,
  FiTool,
  FiTruck,
} from 'react-icons/fi';

import Hero from '@/components/sections/Hero';
import ProductCard, { type Product } from '@/components/products/ProductCard';
import { ProductGridSkeleton } from '@/components/products/ProductCardSkeleton';
import Accordion from '@/components/ui/Accordion';
import SectionHeading from '@/components/ui/SectionHeading';
import { categories, serviceTypes, site, whatsappLink } from '@/lib/site';
import { productApi } from '@/services/api';

const whyUs = [
  {
    icon: FiAward,
    title: 'ISO 9001:2008 certified',
    body: 'Every scale we supply is quality-checked and comes ready for Legal Metrology verification and stamping.',
  },
  {
    icon: FiTool,
    title: 'Service, not just sales',
    body: 'Calibration, repair, AMC and installation handled by our own technicians — not passed to a third party.',
  },
  {
    icon: FiTruck,
    title: 'Full range in stock',
    body: 'From a 10 kg counter scale to a 15-ton crane scale, plus note counters and mobile accessories.',
  },
  {
    icon: FiHeadphones,
    title: 'A real person answers',
    body: `Call ${site.phoneDisplay} during business hours and speak to someone who knows the products.`,
  },
];

const faqs = [
  {
    question: 'How often should a weighing scale be calibrated?',
    answer:
      'For most retail and warehouse use, once every 6 to 12 months is right. Pharmaceutical, food and laboratory users often need it monthly or quarterly. If your readings drift, the scale has been moved, or it has taken a knock, get it checked straight away — we can advise over the phone.',
  },
  {
    question: 'Do your scales come with Legal Metrology stamping?',
    answer:
      'Yes. Scales used for trade in India must be verified and stamped under the Legal Metrology Act, 2009. We supply verification-ready equipment and guide you through the stamping process with the local Legal Metrology department.',
  },
  {
    question: 'What capacity and accuracy do I need?',
    answer: (
      <>
        As a rule of thumb, pick a capacity about 25% above your heaviest routine
        load, and check the graduation (the smallest step it can read) matches how
        precise you need to be. Not sure? Our{' '}
        <Link href="/scale-finder" className="font-semibold text-primary-600 underline">
          scale finder
        </Link>{' '}
        walks you through it in under a minute.
      </>
    ),
  },
  {
    question: 'Do you offer a warranty?',
    answer:
      'Yes — standard equipment carries a one-year warranty covering manufacturing defects. Load cells and indicators are the parts that usually need attention over time, and we stock spares for the brands we sell so repairs are fast.',
  },
  {
    question: 'Which areas do you serve?',
    answer:
      'We are based in Naroda, Ahmedabad and serve customers across Gujarat. On-site service in and around Ahmedabad is usually arranged within 24 hours; elsewhere in Gujarat we schedule a visit or arrange courier repair.',
  },
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await productApi.getAll({ limit: 6 });
        if (!cancelled) setProducts(data);
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("We couldn't load products just now.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Hero />

      {/* Trust bar */}
      <section aria-label="Why customers choose us" className="border-b border-line bg-surface-2">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="flex gap-4"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-500 text-white">
                <item.icon size={20} aria-hidden />
              </span>
              <div>
                <h3 className="mb-1 font-bold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="What we supply"
            title={<>Everything you need to <span className="text-gradient">weigh and count</span></>}
            description="Three product families, one supplier — with service and spares behind all of them."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {categories.map((category, index) => (
              <motion.div
                key={category.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
              >
                <Link
                  href={`/products?category=${category.value}`}
                  className="card group relative block h-72 overflow-hidden"
                >
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink-950/92 via-ink-950/55 to-ink-950/15"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="mb-1.5 text-xl font-bold text-white">{category.label}</h3>
                    <p className="mb-3 text-sm leading-relaxed text-ink-200">
                      {category.blurb}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-400">
                      View range
                      <FiArrowRight
                        aria-hidden
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section id="products" className="bg-surface-2 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
            <SectionHeading
              align="left"
              eyebrow="Best sellers"
              title="Popular right now"
              description="Add anything to your quote list — we'll send sharp pricing, usually the same day."
            />
            <Link href="/products" className="btn-outline">
              View all products <FiArrowRight aria-hidden />
            </Link>
          </div>

          {loading ? (
            <ProductGridSkeleton count={6} />
          ) : error ? (
            <div className="card p-10 text-center">
              <p className="mb-1 text-lg font-semibold">{error}</p>
              <p className="mb-6 text-muted">
                Our catalogue is still a phone call away — we&apos;re happy to talk you
                through the options.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={`tel:${site.phoneDial}`} className="btn-primary">
                  <FiPhone aria-hidden /> Call {site.phoneDisplay}
                </a>
                <a
                  href={whatsappLink('Hello, I would like to see your product range.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  WhatsApp us
                </a>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: Math.min(index, 3) * 0.08 }}
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="After the sale"
            title="Service that keeps you weighing"
            description="A scale that drifts costs you money on every transaction. We keep yours accurate, compliant and running."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceTypes.slice(0, 6).map((service, index) => (
              <motion.div
                key={service.value}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
              >
                <Link
                  href={`/services?type=${service.value}`}
                  className="card group flex h-full flex-col p-6"
                >
                  <span className="mb-4 text-3xl" aria-hidden>
                    {service.icon}
                  </span>
                  <h3 className="mb-2 font-bold transition-colors group-hover:text-primary-600">
                    {service.label}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
                    {service.blurb}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600">
                    Book this
                    <FiArrowRight
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scale finder CTA */}
      <section className="px-4 pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="gradient-primary relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl"
            />
            <div className="relative mx-auto max-w-2xl">
              <span className="mb-4 inline-block text-[13px] font-bold uppercase tracking-[0.14em] text-accent-300">
                Not sure what to buy?
              </span>
              <h2 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl">
                Answer 3 questions. Get the right scale.
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-primary-100">
                Tell us what you weigh, how heavy it gets and where it will live —
                we&apos;ll shortlist the models that fit and put them straight into a
                quote.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/scale-finder"
                  className="btn-secondary"
                >
                  Find my scale <FiArrowRight aria-hidden />
                </Link>
                <a
                  href={whatsappLink(
                    'Hello OM Marketing, I need help choosing the right weighing scale.',
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline border-white/40 text-white hover:border-white hover:bg-white hover:text-primary-700"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface-2 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Good to know"
            title="Questions buyers ask us"
            description="The things worth checking before you buy a scale — answered plainly."
          />
          <div className="mt-10">
            <Accordion items={faqs} />
          </div>
          <p className="mt-8 text-center text-muted">
            Still have a question?{' '}
            <Link href="/contact" className="font-semibold text-primary-600 underline">
              Send us a message
            </Link>{' '}
            — we reply within a few working hours.
          </p>
        </div>
      </section>

      {/* Visit us */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Come and see us"
              title="Naroda, Ahmedabad"
              description="Drop in to see the scales in person, or call ahead and we'll have the models you're considering ready on the counter."
            />

            <dl className="mt-8 space-y-5">
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <FiMapPin size={20} aria-hidden />
                </span>
                <div>
                  <dt className="font-semibold">Address</dt>
                  <dd className="text-muted">
                    <a
                      href={site.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary-600 hover:underline"
                    >
                      {site.addressFull}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <FiPhone size={20} aria-hidden />
                </span>
                <div>
                  <dt className="font-semibold">Phone</dt>
                  <dd className="text-muted">
                    <a
                      href={`tel:${site.phoneDial}`}
                      className="hover:text-primary-600 hover:underline"
                    >
                      {site.phoneDisplay}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <FiHeadphones size={20} aria-hidden />
                </span>
                <div>
                  <dt className="font-semibold">Business hours</dt>
                  <dd className="text-muted">
                    {site.hours.map((h) => (
                      <span key={h.days} className="block">
                        {h.days}: {h.time}
                      </span>
                    ))}
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Contact us
              </Link>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Open in Maps
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="card overflow-hidden p-0"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/certificate-plate.jpg"
                alt="OM Marketing ISO 9001:2008 certification plate"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="mb-1.5 font-bold">Certified since {site.established}</h3>
              <p className="text-sm leading-relaxed text-muted">
                {site.certification} — quality systems audited, so the equipment you
                buy is consistent and ready for Legal Metrology verification.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
