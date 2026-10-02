// frontend/src/app/page.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiArrowRight, FiArrowUpRight, FiPhone } from 'react-icons/fi';

import Hero from '@/components/sections/Hero';
import ProductCard, { type Product } from '@/components/products/ProductCard';
import { ProductGridSkeleton } from '@/components/products/ProductCardSkeleton';
import Accordion from '@/components/ui/Accordion';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { categories, serviceTypes, site, whatsappLink } from '@/lib/site';
import { productApi } from '@/services/api';

const commitments = [
  {
    n: '01',
    title: 'Verification-ready',
    body: 'Equipment is supplied ready for Legal Metrology verification and stamping, and we take you through the process.',
  },
  {
    n: '02',
    title: 'Our own technicians',
    body: 'Calibration, repair and AMC are done in-house with our own spares — never handed to a third party.',
  },
  {
    n: '03',
    title: '10 kg to 15 ton',
    body: 'Counter scales, platform scales, crane scales, explosion-proof indicators and note counters from one supplier.',
  },
  {
    n: '04',
    title: 'Someone answers',
    body: `Call ${site.phoneDisplay} at any hour and you reach a person who knows the equipment, not a queue.`,
  },
];

const faqs = [
  {
    question: 'How often should a weighing scale be calibrated?',
    answer:
      'For most retail and warehouse use, once every 6 to 12 months. Pharmaceutical, food and laboratory users often need it monthly or quarterly. Recalibrate immediately if the scale has been moved, knocked, or if readings start to drift.',
  },
  {
    question: 'Do your scales come with Legal Metrology stamping?',
    answer:
      'Scales used for trade in India must be verified and stamped under the Legal Metrology Act, 2009. We supply verification-ready equipment and guide you through stamping with the local department.',
  },
  {
    question: 'What capacity and accuracy do I need?',
    answer: (
      <>
        Pick a capacity roughly 25% above your heaviest routine load, and check
        the graduation matches how precise you need to be. Not sure? The{' '}
        <Link
          href="/scale-finder"
          className="font-semibold text-brand underline underline-offset-4"
        >
          scale finder
        </Link>{' '}
        narrows it down in under a minute.
      </>
    ),
  },
  {
    question: 'Do you offer a warranty?',
    answer:
      'Standard equipment carries a one-year warranty covering manufacturing defects. Load cells and indicators are the parts that usually need attention over time, and we stock spares for the brands we sell.',
  },
  {
    question: 'Which areas do you serve?',
    answer:
      'We are based in Nikol, Ahmedabad and serve customers across Gujarat. On-site service in and around Ahmedabad is usually arranged within 24 hours; elsewhere in Gujarat we schedule a visit or arrange courier repair.',
  },
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    productApi
      .getAll({ limit: 6 })
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setError("We couldn't load products just now.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Hero />

      {/* 01 — commitments, as an indexed register */}
      <section className="border-b border-line">
        <div className="shell">
          <div className="grid border-x border-line sm:grid-cols-2 lg:grid-cols-4">
            {commitments.map((item, i) => (
              <Reveal
                key={item.n}
                index={i}
                className="border-b border-line p-7 lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <span className="section-index">{item.n}</span>
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.015em]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — categories */}
      <section className="border-b border-line py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            index="02"
            eyebrow="Range"
            title="What we supply"
            description="Three product families, one supplier — with service and spares behind all of them."
          />

          <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
            {categories.map((category, i) => (
              <Reveal key={category.value} index={i}>
                <Link
                  href={`/products?category=${category.value}`}
                  className="group flex h-full flex-col bg-surface transition-colors duration-200 hover:bg-surface-2"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={category.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-ink-950/10"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-semibold tracking-[-0.02em]">
                        {category.label}
                      </h3>
                      <FiArrowUpRight
                        aria-hidden
                        className="mt-1 shrink-0 text-subtle transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                      />
                    </div>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                      {category.blurb}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — products */}
      <section
        id="products"
        className="border-b border-line bg-surface-2 py-20 lg:py-28"
      >
        <div className="shell">
          <SectionHeading
            index="03"
            eyebrow="Catalogue"
            title="Current stock"
            description="Add anything to a quote list and we'll come back with firm pricing, usually the same working day."
            action={
              <Link href="/products" className="btn-outline h-11">
                All products <FiArrowRight aria-hidden />
              </Link>
            }
          />

          <div className="mt-14">
            {loading ? (
              <ProductGridSkeleton count={6} />
            ) : error ? (
              <div className="border border-line bg-surface p-12 text-center">
                <p className="mb-2 text-lg font-semibold">{error}</p>
                <p className="mb-7 text-muted">
                  The full range is still a phone call away.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <a href={`tel:${site.phoneDial}`} className="btn-primary">
                    <FiPhone aria-hidden /> {site.phoneDisplay}
                  </a>
                  <a
                    href={whatsappLink(
                      'Hello, I would like to see your product range.',
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product, i) => (
                  <Reveal key={product.id} index={i}>
                    <ProductCard {...product} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 04 — services */}
      <section className="border-b border-line py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            index="04"
            eyebrow="Service"
            title="After the sale"
            description="A scale that drifts costs you money on every transaction. We keep yours accurate, compliant and working."
          />

          <ul className="mt-14 border-t border-line">
            {serviceTypes.slice(0, 6).map((service, i) => (
              <Reveal as="li" key={service.value} index={i}>
                <Link
                  href={`/services?type=${service.value}`}
                  className="group grid items-baseline gap-4 border-b border-line py-7 transition-colors duration-200 hover:bg-surface-2 sm:grid-cols-[4rem_1fr_auto] sm:gap-8 sm:px-2"
                >
                  <span className="section-index">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="sm:flex sm:items-baseline sm:gap-8">
                    <h3 className="w-full max-w-[16rem] text-lg font-semibold tracking-[-0.015em] transition-colors group-hover:text-brand">
                      {service.label}
                    </h3>
                    <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-muted sm:mt-0">
                      {service.blurb}
                    </p>
                  </div>
                  <FiArrowUpRight
                    aria-hidden
                    className="hidden shrink-0 text-subtle transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand sm:block"
                  />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 05 — scale finder */}
      <section className="relative overflow-hidden border-b border-line bg-ink-950 py-20 text-steel-50 lg:py-28">
        <div
          aria-hidden
          className="grid-rule pointer-events-none absolute inset-0 text-white/70"
        />
        <div className="relative shell">
          <div className="grid items-end gap-12 border-t border-white/12 pt-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="label text-steel-400">05 / Specify</span>
              <h2 className="display mt-6 text-[clamp(2rem,4.4vw,3.5rem)] text-white">
                Three questions.
                <br />
                <span className="text-primary-300">The right scale.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-[1.0625rem] leading-relaxed text-steel-300">
                Tell us what you weigh, how heavy it gets and where it will
                live. We shortlist the models that fit and put them straight
                into a quote.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/scale-finder" className="btn-secondary h-12 px-6">
                  Start <FiArrowRight aria-hidden />
                </Link>
                <a
                  href={whatsappLink(
                    'Hello OM Marketing, I need help choosing the right weighing scale.',
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline h-12 border-white/25 px-6 text-white hover:border-white hover:bg-white hover:text-ink-950"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — FAQ */}
      <section className="border-b border-line py-20 lg:py-28">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading
                index="06"
                eyebrow="Reference"
                title="Before you buy"
                description="The things worth checking, answered plainly."
              />
              <Reveal className="mt-8">
                <Link href="/contact" className="btn-outline h-11">
                  Ask us something else
                </Link>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Reveal>
                <Accordion items={faqs} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 07 — location */}
      <section className="py-20 lg:py-28">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                index="07"
                eyebrow="Visit"
                title="Nikol, Ahmedabad"
                description="Drop in to see the equipment, or call ahead and we'll have the models you're considering ready on the counter."
              />

              <Reveal className="mt-10">
                <dl className="border-t border-line">
                  {[
                    ['Address', site.addressFull],
                    ['Telephone', site.phoneDisplay],
                    ['Hours', site.hoursShort],
                    ['Udyam', site.udyam],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-4"
                    >
                      <dt className="label pt-0.5">{k}</dt>
                      <dd className="data text-[0.9375rem] leading-relaxed">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary h-11">
                  Contact us
                </Link>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline h-11"
                >
                  Open in Maps
                </a>
              </Reveal>
            </div>

            <Reveal className="lg:col-span-7">
              <div className="relative aspect-[16/11] overflow-hidden border border-line">
                <Image
                  src="/images/certificate-plate.jpg"
                  alt="OM Marketing ISO 9001:2008 certification plate"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink-950/90 to-transparent p-6">
                  <span className="label text-steel-300">
                    ISO 9001:2008 · MSME Udyam registered
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
