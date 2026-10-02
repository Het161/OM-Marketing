// frontend/src/app/services/page.tsx

'use client';

import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import {
  FiCalendar,
  FiCheck,
  FiClock,
  FiMessageCircle,
  FiPackage,
  FiPhone,
  FiShield,
  FiTarget,
  FiTool,
} from 'react-icons/fi';

/** Named icons for serviceTypes — emoji read as clip-art on this palette. */
const SERVICE_ICONS = {
  target: FiTarget,
  tool: FiTool,
  calendar: FiCalendar,
  package: FiPackage,
  clock: FiClock,
  message: FiMessageCircle,
} as const;

import EnquiryForm from '@/components/forms/EnquiryForm';
import PageHeader from '@/components/layout/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import { serviceTypes, site, spareParts } from '@/lib/site';

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
  const preselected = serviceTypes.some((s) => s.value === requested)
    ? requested
    : '';

  return (
    <>
      <PageHeader
        index="/ 04"
        eyebrow="Service & support"
        title={<>Calibration, repair &amp; AMC</>}
        lead="An inaccurate scale quietly costs you money on every transaction. Keep yours accurate, compliant and working."
      />

      {/* Promises */}
      <section className="border-b border-line bg-surface-2 py-10">
        <div className="shell grid gap-6 sm:grid-cols-3">
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
                <p className="text-sm leading-relaxed text-muted">
                  {promise.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services grid */}
      <section className="border-b border-line py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            index="01"
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
                className={`flex h-full flex-col border border-line bg-surface p-6 transition-colors hover:border-ink-900 ${
                  preselected === service.value
                    ? 'border-ink-900 bg-surface-2'
                    : ''
                }`}
              >
                <span className="mb-5 flex h-10 w-10 items-center justify-center border border-line text-brand">
                  {(() => {
                    const Icon =
                      SERVICE_ICONS[
                        service.icon as keyof typeof SERVICE_ICONS
                      ] ?? FiTool;
                    return <Icon size={18} aria-hidden />;
                  })()}
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

      {/* Spare parts price list */}
      <section className="border-b border-line py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            index="02"
            eyebrow="Parts & rates"
            title="What a repair costs"
            description="Our published rates for the parts that actually fail. No quotation needed to find out the price of a board or a battery."
          />

          <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {spareParts.map((group) => (
              <div key={group.group} className="bg-surface p-6">
                <h3 className="label mb-5">{group.group}</h3>
                <dl>
                  {group.items.map((item) => (
                    <div
                      key={item.part}
                      className="grid grid-cols-[minmax(0,1fr)_minmax(0,auto)] items-baseline gap-3 border-b border-line py-3 last:border-b-0"
                    >
                      <dt className="text-[0.9375rem] leading-snug text-muted">
                        {item.part}
                      </dt>
                      <dd className="data text-right text-[0.9375rem] font-semibold">
                        ₹{item.price.toLocaleString('en-IN')}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          <p className="mt-6 max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
            Parts are fitted by our own technicians. The service charge covers
            the visit; parts are billed at the rates above. Load cells and
            indicators are quoted separately, since the price depends on the
            capacity and the make of your scale.
          </p>
        </div>
      </section>

      {/* AMC highlight + booking form */}
      <section id="book" className="scroll-mt-28 bg-surface-2 py-20 lg:py-28">
        <div className="shell grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading
              align="left"
              index="03"
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
                  <span className="text-[15px] leading-relaxed text-muted">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-accent-200 bg-accent-50 p-6">
              <h3 className="mb-2 font-bold text-ink-900">
                Not sure what you need?
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-ink-700">
                Describe the symptom — drifting readings, a blank display, a
                scale that won&apos;t zero — and we&apos;ll tell you whether it
                needs a calibration or a repair before anyone travels.
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
