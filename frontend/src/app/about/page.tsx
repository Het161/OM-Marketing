// frontend/src/app/about/page.tsx

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  FiAward,
  FiCheckCircle,
  FiHeart,
  FiMapPin,
  FiPhone,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi';

import SectionHeading from '@/components/ui/SectionHeading';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About Us',
  description: `OM Marketing is an ISO 9001:2008 certified weighing scale supplier in Naroda, Ahmedabad, serving businesses across Gujarat since ${site.established}.`,
  alternates: { canonical: '/about' },
};

const years = new Date().getFullYear() - site.established;

const stats = [
  { value: `${years}+`, label: 'Years in business', icon: FiTrendingUp },
  { value: '1000+', label: 'Businesses served', icon: FiUsers },
  { value: 'ISO', label: '9001:2008 certified', icon: FiAward },
  { value: '24 hr', label: 'Typical service response', icon: FiHeart },
];

const values = [
  {
    title: 'Honest advice first',
    body: 'If a smaller, cheaper scale does the job, we will say so. Selling you the wrong equipment costs us a customer, not just a sale.',
  },
  {
    title: 'Accuracy is the product',
    body: 'A scale that drifts by even a fraction quietly erodes your margin on every transaction. Everything we supply is checked, and we keep it accurate afterwards.',
  },
  {
    title: 'Service is not optional',
    body: 'We repair and calibrate what we sell with our own technicians and our own spares — you are never handed off to someone else.',
  },
  {
    title: 'Answer the phone',
    body: `Call ${site.phoneDisplay} in business hours and you get a person who knows the products, not a call queue.`,
  },
];

const industries = [
  'Grocery & kirana stores',
  'Warehouses & godowns',
  'Chemical & paint plants',
  'Food processing & dairy',
  'Scrap & recycling yards',
  'Pharmaceuticals',
  'Transport & logistics',
  'Banks & cash handling',
];

export default function AboutPage() {
  return (
    <>
      <header className="gradient-primary relative overflow-hidden px-4 py-16 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="mb-3 inline-block text-[13px] font-bold uppercase tracking-[0.14em] text-accent-300">
            Since {site.established} · Naroda, Ahmedabad
          </span>
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            The people behind the scales
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-primary-100">
            {site.name} has spent {years} years helping Gujarat&apos;s shops,
            warehouses and factories weigh accurately — and stay that way.
          </p>
        </div>
      </header>

      {/* Stats */}
      <section aria-label="Company at a glance" className="border-b border-line bg-surface-2 px-4 py-10">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-500 text-white">
                <stat.icon size={21} aria-hidden />
              </span>
              <div>
                <span className="block font-[family-name:var(--font-display)] text-2xl font-extrabold">
                  {stat.value}
                </span>
                <span className="text-sm text-muted">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our story"
              title="Built on repeat customers"
              as="h2"
            />
            <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-muted">
              <p>
                {site.name} started in {site.established} with a simple idea: sell
                weighing equipment that actually suits the job, then look after it
                properly. Two decades on, most of our business still comes from
                customers who came back, or who were sent by someone who did.
              </p>
              <p>
                From our base in Naroda, Ahmedabad we supply the full range — 10 kg
                counter scales for a kirana shop, 500 kg platforms for a godown,
                15-ton crane scales for a factory floor, explosion-proof indicators
                for chemical plants, and high-speed note counters for anyone
                handling cash.
              </p>
              <p>
                Being {site.certification} means our processes are audited, and the
                equipment we supply is ready for Legal Metrology verification and
                stamping. But the part customers mention most is simpler: when
                something goes wrong, someone picks up the phone and turns up.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary">
                See our range
              </Link>
              <a href={`tel:${site.phoneDial}`} className="btn-outline">
                <FiPhone aria-hidden /> {site.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card overflow-hidden p-0 sm:mt-8">
              <div className="relative aspect-[3/4]">
                <Image
                  src="/images/certificate-plate.jpg"
                  alt="OM Marketing ISO 9001:2008 certification plate"
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="card overflow-hidden p-0">
              <div className="relative aspect-[3/4]">
                <Image
                  src="/images/heavy-platform-scale.jpg"
                  alt="Heavy-duty platform scale with digital indicator at the OM Marketing premises"
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface-2 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="How we work"
            title="What we stand by"
            description="Four things we do not compromise on, whatever the size of the order."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="card p-6">
                <h3 className="mb-2 text-lg font-bold">{value.title}</h3>
                <p className="leading-relaxed text-muted">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Who we work with"
            title="Industries we serve"
            description="If it needs weighing or counting, we have almost certainly kitted out someone doing it."
          />

          <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
            {industries.map((industry) => (
              <li
                key={industry}
                className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-medium"
              >
                <FiCheckCircle aria-hidden className="shrink-0 text-primary-500" />
                {industry}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="gradient-primary relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl">
                Come and see us in Naroda
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-primary-100">
                Bring your requirement — or your faulty scale — and we&apos;ll tell
                you honestly what it needs.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <FiMapPin aria-hidden /> Get directions
                </a>
                <Link
                  href="/contact"
                  className="btn-outline border-white/40 text-white hover:border-white hover:bg-white hover:text-primary-700"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
