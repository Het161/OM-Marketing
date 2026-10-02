// frontend/src/app/contact/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FiClock,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
} from 'react-icons/fi';

import PageHeader from '@/components/layout/PageHeader';
import EnquiryForm from '@/components/forms/EnquiryForm';
import { site, whatsappLink } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get in touch with OM Marketing in Nikol, Ahmedabad. Call ${site.phoneDisplay}, WhatsApp us, or send an enquiry — we reply within a few working hours.`,
  alternates: { canonical: '/contact' },
};

const channels = [
  {
    icon: FiPhone,
    label: 'Phone',
    value: site.phoneDisplay,
    href: `tel:${site.phoneDial}`,
    note: 'We answer round the clock',
  },
  {
    icon: FiMessageCircle,
    label: 'WhatsApp',
    value: 'Message us',
    href: whatsappLink('Hello OM Marketing, I have an enquiry.'),
    note: 'Share photos of your scale or requirement',
    external: true,
  },
  {
    icon: FiMail,
    label: 'Email',
    value: site.email,
    href: `mailto:${site.email}`,
    note: 'Best for detailed specifications',
  },
  {
    icon: FiMapPin,
    label: 'Visit',
    value: site.addressLine,
    href: site.mapsUrl,
    note: site.addressRegion,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        index="/ 01"
        eyebrow="Contact"
        title={<>Talk to us</>}
        lead="Tell us what you need to weigh and we'll recommend the right equipment — with honest pricing and no pressure."
        meta={[
          { k: 'Telephone', v: site.phoneDisplay },
          { k: 'Hours', v: site.hoursShort },
          { k: 'Location', v: 'Nikol, Ahmedabad' },
          { k: 'Reply', v: 'Same working day' },
        ]}
      />

      <section className="px-4 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl">
          {/* Contact channels */}
          <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.external ? '_blank' : undefined}
                rel={channel.external ? 'noopener noreferrer' : undefined}
                className="group flex flex-col border border-line p-5 transition-colors duration-200 hover:border-ink-900"
              >
                <span className="flex items-center justify-between">
                  <span className="label">{channel.label}</span>
                  <channel.icon
                    size={15}
                    aria-hidden
                    className="text-subtle transition-colors group-hover:text-brand"
                  />
                </span>
                <span className="mt-4 text-[0.9375rem] font-semibold tracking-[-0.01em] text-content [overflow-wrap:anywhere]">
                  {channel.value}
                </span>
                <span className="mt-1.5 text-[13px] leading-relaxed text-muted">
                  {channel.note}
                </span>
              </a>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
            <EnquiryForm variant="contact" title="Send us a message" />

            <aside className="space-y-5">
              <div className="border border-line p-6">
                <h2 className="label mb-5">Business hours</h2>
                <dl className="space-y-2.5 text-sm">
                  {site.hours.map((entry) => (
                    <div
                      key={entry.days}
                      className="flex items-center justify-between gap-4 border-b border-line pb-2.5 last:border-0 last:pb-0"
                    >
                      <dt className="text-muted">{entry.days}</dt>
                      <dd className="font-semibold">{entry.time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-[13px] leading-relaxed text-subtle">
                  We answer the phone round the clock. For a detailed quote, a
                  message or WhatsApp is often quicker.
                </p>
              </div>

              <div className="border border-line">
                <iframe
                  title="Map showing OM Marketing in Nikol, Ahmedabad"
                  src="https://www.google.com/maps?q=Nikol,Ahmedabad,Gujarat+382350&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-64 w-full border-0 grayscale-[35%]"
                />
                <div className="p-5">
                  <h2 className="mb-1 font-bold">{site.addressLine}</h2>
                  <p className="mb-4 text-sm text-muted">{site.addressRegion}</p>
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline w-full"
                  >
                    Get directions
                  </a>
                </div>
              </div>

              <div className="border border-line bg-surface-2 p-6">
                <h2 className="label mb-3">Need service, not sales?</h2>
                <p className="mb-5 text-[0.9375rem] leading-relaxed text-muted">
                  Book a calibration, repair, AMC or installation visit and we&apos;ll
                  call to confirm a slot.
                </p>
                <Link href="/services" className="btn-secondary w-full">
                  Book a service
                </Link>
              </div>

              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 border border-line p-5 transition-colors duration-200 hover:border-ink-900"
              >
                <FiInstagram size={18} aria-hidden className="shrink-0 text-subtle" />
                <span>
                  <span className="block text-[0.9375rem] font-semibold">See our latest stock</span>
                  <span className="data block text-[0.8125rem] text-muted">@{site.instagram}</span>
                </span>
              </a>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
