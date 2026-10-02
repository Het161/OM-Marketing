// frontend/src/app/layout.tsx

/**
 * Root layout — wraps every page.
 *
 * Fonts are self-hosted via @fontsource so builds never depend on a network
 * round-trip to Google Fonts.
 */

import type { Metadata, Viewport } from 'next';

import '@fontsource-variable/archivo';
import '@fontsource-variable/inter';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import './globals.css';

import SiteChrome from '@/components/layout/SiteChrome';
import { site } from '@/lib/site';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.ommarketing.co.in';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'OM Marketing — Weighing Scales & Note Counters in Ahmedabad',
    template: '%s · OM Marketing',
  },
  description:
    'ISO 9001:2008 certified supplier of weighing scales, note counters and mobile accessories in Nikol, Ahmedabad. MSME registered. Sales, calibration, repair and AMC across Gujarat.',
  keywords: [
    'weighing scale Ahmedabad',
    'platform scale Gujarat',
    'crane scale supplier',
    'note counter machine',
    'weighing scale calibration',
    'weighing scale repair Nikol Ahmedabad',
    'weighing scale supplier Nikol',
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
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0b0a' },
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
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'A-104, Het Patel Building, Nikol',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    postalCode: '382350',
    addressCountry: 'IN',
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Gujarat' },
    { '@type': 'City', name: 'Ahmedabad' },
  ],
  // Open 24 hours, seven days — must match the Google Business Profile.
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
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
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

        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
