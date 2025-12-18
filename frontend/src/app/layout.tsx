// frontend/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// ✅ Optimized font loading
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // CRITICAL for performance!
  preload: true,
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'], // Only weights you use
});

export const metadata: Metadata = {
  title: 'OM Marketing - Premium Weighing Solutions',
  description: 'Leading supplier of weighing scales, note counters, and mobile accessories in Naroda, Ahmedabad, Gujarat, India',
  keywords: 'weighing scales, note counter, mobile accessories, OM Marketing, Ahmedabad',
  // ✅ Add Open Graph tags for better SEO
  openGraph: {
    title: 'OM Marketing - Premium Weighing Solutions',
    description: 'Leading supplier of weighing scales, note counters, and mobile accessories',
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
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
