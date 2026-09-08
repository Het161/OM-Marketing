// frontend/src/app/services/page.tsx

'use client';

import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { FiCheck, FiClock, FiPhone, FiShield, FiTool } from 'react-icons/fi';

import EnquiryForm from '@/components/forms/EnquiryForm';
import SectionHeading from '@/components/ui/SectionHeading';
import { serviceTypes, site } from '@/lib/site';

const promises = [
  {
    icon: FiClock,
    title: 'Fast response',
    body: 'On-site visits in and around Ahmedabad are usually arranged within 24 hours.',
  },
  {
    icon: FiShield,
    title: 'Compliance handled',
    body: 'Calibration against traceable weights, plus guidance on Legal Metrology verification and stamping.',
  },
  {
    icon: FiTool,
    title: 'Our own technicians',
    body: 'Load cells, indicators, displays and batteries — repaired in-house, with spares in stock.',
  },
];

const amcIncludes = [
  'Scheduled preventive servicing visits through the year',
  'Calibration check and adjustment at every visit',
  'Priority response when something breaks down',
  'Discounted rates on spare parts and load cells',
  'Service records kept for your audits and inspections',
];

function ServicesContent() {
  const searchParams = useSearchParams();
  const requested = searchParams.get('type') ?? '';
  const preselected = serviceTypes.some((s) => s.value === requested) ? requested : '';

  return (
    <>
      <header className="gradient-primary relative overflow-hidden px-4 py-16 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -bottom-28 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="mb-3 inline-block text-[13px] font-bold uppercase tracking-[0.14em] text-accent-300">
            Service &amp; support
          </span>
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            Calibration, repair &amp; AMC
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-primary-100">
            An inaccurate scale quietly costs you money on every single
            transaction. Keep yours accurate, compliant and working.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#book" className="btn-secondary">
              Book a service
            </a>
            <a
              href={`tel:${site.phoneDial}`}
              className="btn-outline border-white/40 text-white hover:border-white hover:bg-white hover:text-primary-700"
            >
              <FiPhone aria-hidden /> {site.phoneDisplay}
            </a>
          </div>
        </div>
      </header>

      {/* Promises */}
      <section className="border-b border-line bg-surface-2 px-4 py-10">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-3">
          {promises.map((promise, index) => (
            <motion.div
              key={promise.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="flex gap-4"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-500 text-white">
                <promise.icon size={20} aria-hidden />
              </span>
              <div>
                <h2 className="mb-1 font-bold">{promise.title}</h2>
                <p className="text-sm leading-relaxed text-muted">{promise.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services grid */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="What we do"
            title="Services we offer"
            description="From a one-off repair to a full annual maintenance contract."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceTypes.map((service, index) => (
              <motion.article
                key={service.value}
                id={service.value}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
                className={`card flex h-full flex-col p-6 ${
                  preselected === service.value ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                <span className="mb-4 text-3xl" aria-hidden>
                  {service.icon}
                </span>
                <h3 className="mb-2 font-bold">{service.label}</h3>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-muted">
                  {service.blurb}
                </p>
                <a href="#book" className="btn-outline h-11 w-full text-sm">
                  Request this
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* AMC highlight + booking form */}
      <section id="book" className="scroll-mt-28 bg-surface-2 px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Annual maintenance"
              title="What an AMC covers"
              description="Predictable costs, no surprises, and a scale that is always ready for inspection."
            />

            <ul className="mt-8 space-y-3.5">
              {amcIncludes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white">
                    <FiCheck size={12} aria-hidden />
                  </span>
                  <span className="text-[15px] leading-relaxed text-muted">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-accent-200 bg-accent-50 p-6">
              <h3 className="mb-2 font-bold text-ink-900">Not sure what you need?</h3>
              <p className="mb-4 text-sm leading-relaxed text-ink-700">
                Describe the symptom — drifting readings, a blank display, a scale
                that won&apos;t zero — and we&apos;ll tell you whether it needs a
                calibration or a repair before anyone travels.
              </p>
              <a href={`tel:${site.phoneDial}`} className="btn-secondary">
                <FiPhone aria-hidden /> Call {site.phoneDisplay}
              </a>
            </div>
          </div>

          <EnquiryForm
            variant="service"
            defaultServiceType={preselected}
            title="Book a service visit"
            submitLabel="Book service"
          />
        </div>
      </section>
    </>
  );
}

export default function ServicesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="spinner" role="status" aria-label="Loading" />
        </div>
      }
    >
      <ServicesContent />
    </Suspense>
  );
}
