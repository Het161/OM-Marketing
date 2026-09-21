// frontend/src/app/bill/layout.tsx

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your bill',
  // A customer's bill is private — it must never be indexed.
  robots: { index: false, follow: false, nocache: true },
};

export default function BillLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
