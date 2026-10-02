// frontend/src/components/layout/Footer.tsx

import Image from 'next/image';
import Link from 'next/link';
import {
  FiClock,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
} from 'react-icons/fi';

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
    <footer className="border-t border-line bg-ink-950 text-steel-300">
      <div className="shell py-16">
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
            <p className="mb-5 max-w-xs text-[0.9375rem] leading-relaxed text-steel-400">
              {site.certification} supplier of weighing scales, note counters
              and mobile accessories — serving businesses across Gujarat.
            </p>
            <dl className="border-t border-white/10">
              {[
                ['Quality', site.certification],
                ['Registered', site.msme],
                ['Udyam', site.udyam],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between gap-4 border-b border-white/10 py-2.5"
                >
                  <dt className="label text-steel-500">{k}</dt>
                  <dd className="data text-xs text-steel-300">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5">
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="OM Marketing on Instagram"
                className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-steel-300 transition-colors hover:border-white hover:bg-white hover:text-ink-950"
              >
                <FiInstagram size={19} aria-hidden />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-labelledby="footer-links">
            <h2 id="footer-links" className="label mb-5 text-steel-500">
              Quick Links
            </h2>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-[34px] items-center text-[0.9375rem] text-steel-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Products + services */}
          <nav aria-labelledby="footer-catalogue">
            <h2 id="footer-catalogue" className="label mb-5 text-steel-500">
              What We Do
            </h2>
            <ul className="space-y-1">
              {categories.map((category) => (
                <li key={category.value}>
                  <Link
                    href={`/products?category=${category.value}`}
                    className="inline-flex min-h-[34px] items-center text-[0.9375rem] text-steel-300 transition-colors hover:text-white"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
              {serviceTypes.slice(0, 3).map((service) => (
                <li key={service.value}>
                  <Link
                    href={`/services?type=${service.value}`}
                    className="inline-flex min-h-[34px] items-center text-[0.9375rem] text-steel-300 transition-colors hover:text-white"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="label mb-5 text-steel-500">Get in Touch</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <FiMapPin
                  aria-hidden
                  className="mt-0.5 shrink-0 text-steel-500"
                />
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-steel-300 transition-colors hover:text-white"
                >
                  {site.addressLine}
                  <br />
                  {site.addressRegion}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone aria-hidden className="shrink-0 text-steel-500" />
                <a
                  href={`tel:${site.phoneDial}`}
                  className="text-steel-300 transition-colors hover:text-white"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiMail
                  aria-hidden
                  className="mt-0.5 shrink-0 text-steel-500"
                />
                <a
                  href={`mailto:${site.email}`}
                  className="break-all text-steel-300 transition-colors hover:text-white"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiClock
                  aria-hidden
                  className="mt-0.5 shrink-0 text-steel-500"
                />
                <span className="text-steel-300">
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

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-7 sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms &amp; Conditions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
