// frontend/src/app/faq/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { FiMessageCircle, FiPhone } from 'react-icons/fi';

import Accordion from '@/components/ui/Accordion';
import { site, whatsappLink } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Calibration frequency, Legal Metrology stamping, choosing capacity, warranty, delivery and service — the questions weighing scale buyers in Gujarat ask most.',
  alternates: { canonical: '/faq' },
};

/**
 * Answers are kept as plain strings here so the same text can feed both the
 * page and the FAQPage structured data below.
 */
const groups = [
  {
    heading: 'Buying a scale',
    faqs: [
      {
        question: 'What capacity should I choose?',
        answer:
          'Pick a capacity roughly 25% above your heaviest routine load. Running a scale near its maximum every day wears the load cell out faster and costs you accuracy. Equally, an oversized scale gives you coarser graduations, so you lose precision on small weights.',
      },
      {
        question: 'What does "graduation" or "accuracy" mean?',
        answer:
          'Graduation is the smallest step the scale can display — a 30 kg scale with 5 g graduation moves in 5 g steps. Accuracy class (I, II, III, IIII under OIML) tells you how tightly the scale must hold that reading. For most trade use in India, Class III is the relevant one.',
      },
      {
        question: 'Mild steel or stainless steel platform?',
        answer:
          'Mild steel is cheaper and fine for dry warehouse and godown floors. Choose stainless steel for anywhere wet or corrosive — food processing, dairy, fish, chemicals, or any area that gets washed down. Mild steel rusts through quickly in those conditions.',
      },
      {
        question: 'Do you supply explosion-proof scales?',
        answer:
          'Yes. Chemical, paint, solvent and similar hazardous zones need flameproof-rated indicators and enclosures. Standard equipment is neither safe nor legal in those areas — tell us the zone classification and we will supply the correct rating.',
      },
    ],
  },
  {
    heading: 'Calibration & compliance',
    faqs: [
      {
        question: 'How often should a weighing scale be calibrated?',
        answer:
          'Once every 6 to 12 months suits most retail and warehouse use. Pharmaceutical, food and laboratory users often need monthly or quarterly checks. Recalibrate immediately if the scale has been moved, knocked, or if readings start to drift.',
      },
      {
        question: 'Do your scales come with Legal Metrology stamping?',
        answer:
          'Scales used for trade in India must be verified and stamped under the Legal Metrology Act, 2009. We supply verification-ready equipment and guide you through the stamping process with the local Legal Metrology department.',
      },
      {
        question: 'Can I calibrate the scale myself?',
        answer:
          'Many scales have a self-calibration routine you can run with a known test weight, and that is useful as a routine check. For anything used in trade, or where accuracy is audited, you need professional calibration against traceable reference weights with documentation.',
      },
      {
        question: 'My readings look wrong. What should I check first?',
        answer:
          'Check the scale is level and nothing is touching or resting against the platform, then make sure it zeroes with nothing on it. Look for debris under the pan and a stable, vibration-free surface. If it still reads wrong, call us before adjusting anything.',
      },
    ],
  },
  {
    heading: 'Service, warranty & delivery',
    faqs: [
      {
        question: 'What warranty do you offer?',
        answer:
          'Standard equipment carries a one-year warranty covering manufacturing defects. Load cells and indicators are the parts that usually need attention over time, and we stock spares for the brands we sell so repairs are fast.',
      },
      {
        question: 'Do you offer annual maintenance contracts?',
        answer:
          'Yes. An AMC covers scheduled preventive servicing, calibration checks at every visit, priority breakdown response, discounted spares, and service records you can show at an audit or inspection.',
      },
      {
        question: 'Which areas do you serve?',
        answer:
          'We are based in Naroda, Ahmedabad and serve customers across Gujarat. On-site service in and around Ahmedabad is usually arranged within 24 hours; elsewhere in Gujarat we schedule a visit or arrange a courier repair.',
      },
      {
        question: 'How do I get a price?',
        answer:
          'Add the products you are interested in to your quote list and send it across, or simply call or WhatsApp us. We reply with firm pricing, usually the same working day. Prices depend on quantity, configuration, GST and delivery.',
      },
    ],
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: groups.flatMap((group) =>
    group.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  ),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className="gradient-primary relative overflow-hidden px-4 py-16 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="mb-3 inline-block text-[13px] font-bold uppercase tracking-[0.14em] text-accent-300">
            Straight answers
          </span>
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            Frequently asked questions
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-primary-100">
            Everything worth knowing before you buy, calibrate or service a
            weighing scale in Gujarat.
          </p>
        </div>
      </header>

      <section className="px-4 py-14 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-12">
          {groups.map((group) => (
            <div key={group.heading}>
              <h2 className="mb-5 text-2xl font-extrabold">{group.heading}</h2>
              <Accordion items={group.faqs} />
            </div>
          ))}

          <div className="card p-8 text-center">
            <h2 className="mb-2 text-xl font-bold">Still not sure?</h2>
            <p className="mx-auto mb-6 max-w-md leading-relaxed text-muted">
              Describe your requirement and we&apos;ll tell you what actually fits —
              no obligation, no sales pressure.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={`tel:${site.phoneDial}`} className="btn-primary">
                <FiPhone aria-hidden /> Call {site.phoneDisplay}
              </a>
              <a
                href={whatsappLink('Hello OM Marketing, I have a question about scales.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <FiMessageCircle aria-hidden /> WhatsApp us
              </a>
              <Link href="/scale-finder" className="btn-ghost">
                Try the scale finder
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
