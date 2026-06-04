// frontend/app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SiteSchema from '@/components/SiteSchema';

// Body / UI — Inter
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

// Display / headings — Cormorant Garamond (with italics for accent words)
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ommarketing.co.in'),
  title: {
    default:
      'Weighing Scales, Note Counters & Mobile Accessories in Ahmedabad | OM Marketing',
    template: '%s | OM Marketing',
  },
  description:
    'Authorised dealer of weighing scales, note counters & mobile accessories in Naroda, Ahmedabad. ISO 9001:2008. Free installation, stamping certificate included, pan-India dispatch.',
  keywords: [
    'weighing scale Ahmedabad',
    'weighing scale dealer Naroda',
    'platform scale Gujarat',
    'note counter Ahmedabad',
    'OM Marketing',
    'Unique scale dealer',
    'Deluxe scale',
    'JB scale',
    'jewellery scale Ahmedabad',
    'crane scale India',
  ],
  applicationName: 'OM Marketing',
  authors: [{ name: 'OM Marketing' }],
  creator: 'OM Marketing',
  publisher: 'OM Marketing',
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://ommarketing.co.in',
    siteName: 'OM Marketing',
    title:
      'Weighing Scales, Note Counters & Mobile Accessories in Ahmedabad | OM Marketing',
    description:
      'Authorised dealer of weighing scales, note counters & mobile accessories in Naroda, Ahmedabad. ISO 9001:2008 certified. Free installation, stamping certificate, pan-India dispatch.',
    images: [
      {
        url: '/om-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'OM Marketing — Weighing Solutions Ahmedabad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Weighing Scales, Note Counters & Mobile Accessories in Ahmedabad | OM Marketing',
    description:
      'Authorised dealer of weighing scales in Naroda, Ahmedabad. ISO 9001:2008, free installation, pan-India dispatch.',
    images: ['/om-logo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    // Add your Google Search Console verification token here when ready:
    // google: 'xxx',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="min-h-screen flex flex-col bg-brand-canvas text-brand-ivory antialiased">
        <SiteSchema />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
