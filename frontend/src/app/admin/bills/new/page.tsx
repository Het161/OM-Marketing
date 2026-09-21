// frontend/src/app/admin/bills/new/page.tsx

'use client';

import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

import AdminGuard from '@/components/admin/AdminGuard';
import BillForm from '@/components/admin/BillForm';

export default function NewBillPage() {
  return (
    <AdminGuard>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Link href="/admin/bills" className="btn-ghost mb-4 px-0 text-sm">
          <FiArrowLeft aria-hidden /> Back to bills
        </Link>

        <header className="mb-6">
          <h1 className="text-3xl font-extrabold">New bill</h1>
          <p className="mt-1 text-muted">
            The invoice number and the exact date and time are set automatically when you
            save.
          </p>
        </header>

        <BillForm />
      </div>
    </AdminGuard>
  );
}
