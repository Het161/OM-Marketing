// frontend/src/app/admin/layout.tsx

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Billing Portal',
  // Staff-only pages must never appear in search results.
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
