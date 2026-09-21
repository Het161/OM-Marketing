// frontend/src/components/layout/SiteChrome.tsx

'use client';

import { usePathname } from 'next/navigation';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import FloatingContact from '@/components/ui/FloatingContact';

/**
 * Decides which shell a route gets.
 *
 * The billing portal has its own header and must not show the marketing nav,
 * footer or the floating WhatsApp button. A customer's bill page keeps the
 * brand nav and footer for context, but drops the floating button — the page
 * already offers call and WhatsApp, and the button sits on top of the bill.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '/';

  const isAdmin = pathname.startsWith('/admin');
  const isBill = pathname.startsWith('/bill');

  if (isAdmin) {
    return <main id="main">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen">
        {children}
      </main>
      <Footer />
      {!isBill && <FloatingContact />}
    </>
  );
}
