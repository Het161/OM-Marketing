// frontend/src/components/layout/Footer.tsx

import Image from 'next/image';
import Link from 'next/link';
import { FiClock, FiInstagram, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

import { categories, serviceTypes, site } from '@/lib/site';

const quickLinks = [
  { href: '/products', label: 'All Products' },
  { href: '/scale-finder', label: 'Find My Scale' },
  { href: '/services', label: 'Service & AMC' },
  { href: '/about', label: 'About Us' },
  { href: '/faq', label: 'FAQs' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-950 text-ink-200">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <Image
                src="/images/om-mark-white.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span className="font-[family-name:var(--font-display)] text-lg font-extrabold text-white">
                OM MARKETING
              </span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-ink-300">
              {site.certification} supplier of weighing scales, note counters and
              mobile accessories — serving businesses across Gujarat since{' '}
              {site.established}.
            </p>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-3 py-1 text-xs font-bold tracking-wide text-accent-300">
              ⚖️ {site.certification}
            </span>

            <div className="mt-5">
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="OM Marketing on Instagram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white/5 text-ink-200 transition-colors hover:bg-accent-500 hover:text-ink-900"
              >
                <FiInstagram size={19} aria-hidden />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-labelledby="footer-links">
            <h2 id="footer-links" className="mb-4 font-semibold text-white">
              Quick Links
            </h2>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-[38px] items-center text-sm text-ink-300 transition-colors hover:text-accent-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Products + services */}
          <nav aria-labelledby="footer-catalogue">
            <h2 id="footer-catalogue" className="mb-4 font-semibold text-white">
              What We Do
            </h2>
            <ul className="space-y-1">
              {categories.map((category) => (
                <li key={category.value}>
                  <Link
                    href={`/products?category=${category.value}`}
                    className="inline-flex min-h-[38px] items-center text-sm text-ink-300 transition-colors hover:text-accent-400"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
              {serviceTypes.slice(0, 3).map((service) => (
                <li key={service.value}>
                  <Link
                    href={`/services?type=${service.value}`}
                    className="inline-flex min-h-[38px] items-center text-sm text-ink-300 transition-colors hover:text-accent-400"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="mb-4 font-semibold text-white">Get in Touch</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <FiMapPin aria-hidden className="mt-0.5 shrink-0 text-accent-400" />
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-300 transition-colors hover:text-accent-400"
                >
                  {site.addressLine}
                  <br />
                  {site.addressRegion}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone aria-hidden className="shrink-0 text-accent-400" />
                <a
                  href={`tel:${site.phoneDial}`}
                  className="text-ink-300 transition-colors hover:text-accent-400"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiMail aria-hidden className="mt-0.5 shrink-0 text-accent-400" />
                <a
                  href={`mailto:${site.email}`}
                  className="break-all text-ink-300 transition-colors hover:text-accent-400"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiClock aria-hidden className="mt-0.5 shrink-0 text-accent-400" />
                <span className="text-ink-300">
                  {site.hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}: {h.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-7 text-sm text-ink-400 sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-4">
            <Link href="/privacy" className="transition-colors hover:text-accent-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-accent-400">
              Terms &amp; Conditions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
