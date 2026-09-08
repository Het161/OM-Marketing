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

import EnquiryForm from '@/components/forms/EnquiryForm';
import { site, whatsappLink } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get in touch with OM Marketing in Naroda, Ahmedabad. Call ${site.phoneDisplay}, WhatsApp us, or send an enquiry — we reply within a few working hours.`,
  alternates: { canonical: '/contact' },
};

const channels = [
  {
    icon: FiPhone,
    label: 'Phone',
    value: site.phoneDisplay,
    href: `tel:${site.phoneDial}`,
    note: 'Fastest during business hours',
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
      <header className="gradient-primary relative overflow-hidden px-4 py-16 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="mb-3 inline-block text-[13px] font-bold uppercase tracking-[0.14em] text-accent-300">
            We&apos;d love to hear from you
          </span>
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-primary-100">
            Tell us what you need to weigh and we&apos;ll recommend the right
            equipment — with honest pricing and no pressure.
          </p>
        </div>
      </header>

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
                className="card group flex flex-col p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-500 group-hover:text-white">
                  <channel.icon size={20} aria-hidden />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wide text-subtle">
                  {channel.label}
                </span>
                <span className="mt-0.5 break-words font-semibold text-content transition-colors group-hover:text-primary-600">
                  {channel.value}
                </span>
                <span className="mt-1 text-[13px] text-subtle">{channel.note}</span>
              </a>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
            <EnquiryForm variant="contact" title="Send us a message" />

            <aside className="space-y-5">
              <div className="card p-6">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <FiClock aria-hidden className="text-primary-500" /> Business hours
                </h2>
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
                  Outside these hours, send a message or WhatsApp — we pick it up
                  first thing the next working morning.
                </p>
              </div>

              <div className="card overflow-hidden">
                <iframe
                  title="Map showing OM Marketing in Naroda, Ahmedabad"
                  src="https://www.google.com/maps?q=Naroda,Ahmedabad,Gujarat,India&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-64 w-full border-0"
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

              <div className="rounded-2xl border border-accent-200 bg-accent-50 p-6">
                <h2 className="mb-2 font-bold text-ink-900">Need service, not sales?</h2>
                <p className="mb-4 text-sm leading-relaxed text-ink-700">
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
                className="card flex items-center gap-4 p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <FiInstagram size={20} aria-hidden />
                </span>
                <span>
                  <span className="block font-semibold">See our latest stock</span>
                  <span className="block text-sm text-muted">@{site.instagram}</span>
                </span>
              </a>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
