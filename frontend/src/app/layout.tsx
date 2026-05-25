// frontend/app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
  title: 'OM Marketing — Precision Instruments | Naroda, Ahmedabad',
  description:
    'Curated weighing scales, note counters, and mobile accessories for India\'s most discerning retailers. Established 2010, Naroda, Ahmedabad.',
  keywords:
    'weighing scales, note counter, mobile accessories, OM Marketing, Ahmedabad, Naroda, precision instruments',
  openGraph: {
    title: 'OM Marketing — Precision Instruments',
    description:
      'Curated weighing scales, note counters, and mobile accessories for India\'s most discerning retailers.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'OM Marketing',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="min-h-screen flex flex-col bg-brand-canvas text-brand-ivory antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
