// frontend/src/app/layout.tsx

/**
 * Root layout — wraps every page.
 *
 * Fonts are self-hosted via @fontsource so builds never depend on a network
 * round-trip to Google Fonts.
 */

import type { Metadata, Viewport } from 'next';

import '@fontsource-variable/inter';
import '@fontsource-variable/plus-jakarta-sans';
import './globals.css';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import FloatingContact from '@/components/ui/FloatingContact';
import { site } from '@/lib/site';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ommarketing.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'OM Marketing — Weighing Scales & Note Counters in Ahmedabad',
    template: '%s · OM Marketing',
  },
  description:
    'ISO 9001:2008 certified supplier of weighing scales, note counters and mobile accessories in Naroda, Ahmedabad. Sales, calibration, repair and AMC across Gujarat since 2008.',
  keywords: [
    'weighing scale Ahmedabad',
    'platform scale Gujarat',
    'crane scale supplier',
    'note counter machine',
    'weighing scale calibration',
    'weighing scale repair Naroda',
    'OM Marketing',
  ],
  authors: [{ name: site.name }],
  applicationName: site.name,
  category: 'business',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: site.name,
    title: 'OM Marketing — Weighing Scales & Note Counters in Ahmedabad',
    description:
      'ISO 9001:2008 certified weighing solutions: scales from 10 kg to 15 ton, note counters, plus calibration, repair and AMC across Gujarat.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OM Marketing — weighing scales, note counters and service in Ahmedabad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OM Marketing — Weighing Scales & Note Counters in Ahmedabad',
    description:
      'ISO 9001:2008 certified weighing solutions, calibration, repair and AMC across Gujarat.',
    images: ['/og-image.png'],
  },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#008080' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1619' },
  ],
  width: 'device-width',
  initialScale: 1,
};

/** Structured data so Google can show the shop in local results. */
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HardwareStore',
  '@id': `${SITE_URL}/#business`,
  name: site.name,
  description:
    'Supplier of weighing scales, note counters and mobile accessories, with calibration, repair and AMC services.',
  url: SITE_URL,
  logo: `${SITE_URL}/images/om-mark.png`,
  image: `${SITE_URL}/og-image.png`,
  telephone: site.phoneDial,
  email: site.email,
  foundingDate: String(site.established),
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Naroda',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    addressCountry: 'IN',
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Gujarat' },
    { '@type': 'City', name: 'Ahmedabad' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '09:00',
      closes: '19:00',
    },
  ],
  sameAs: [site.instagramUrl],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <head>
        {/*
          Scroll-reveal sections are server-rendered with inline opacity:0 and
          only animate in once JavaScript observes them. Without JS they would
          stay invisible, so force everything visible in that case.
        */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <script
          type="application/ld+json"
          // Static, developer-authored JSON — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />

        <a href="#main" className="skip-link">
          Skip to main content
        </a>

        <Navbar />
        <main id="main" className="min-h-screen">
          {children}
        </main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
