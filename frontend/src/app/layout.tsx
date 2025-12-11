// frontend/src/app/layout.tsx

/**
 * Root Layout Component
 * This wraps around ALL pages in your app
 * Think of it as the 'base template' that every page inherits!
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OM Marketing - Premium Weighing Solutions',
  description: 'Leading supplier of weighing scales, note counters, and mobile accessories in Naroda, Ahmedabad, Gujarat, India',
  keywords: 'weighing scales, note counter, mobile accessories, OM Marketing, Ahmedabad',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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

