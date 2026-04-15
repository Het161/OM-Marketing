// frontend/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageLoader from '@/components/PageLoader';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';

// ✅ Optimised font loading
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'OM Marketing - Premium Weighing Solutions',
  description:
    'Leading supplier of weighing scales, note counters, and mobile accessories in Naroda, Ahmedabad, Gujarat, India',
  keywords: 'weighing scales, note counter, mobile accessories, OM Marketing, Ahmedabad',
  openGraph: {
    title: 'OM Marketing - Premium Weighing Solutions',
    description:
      'Leading supplier of weighing scales, note counters, and mobile accessories',
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
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        {/* Initial page load animation */}
        <PageLoader />

        <Navbar />

        {/* Page-level fade+slide transition on route change */}
        <main className="min-h-screen">
          <PageTransitionWrapper>{children}</PageTransitionWrapper>
        </main>

        <Footer />
      </body>
    </html>
  );
}
