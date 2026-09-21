// frontend/src/components/admin/StatusPill.tsx

import type { InvoiceStatus } from '@/services/admin';

const styles: Record<InvoiceStatus, { label: string; className: string }> = {
  draft: { label: 'Draft', className: 'bg-surface-3 text-muted' },
  sent: { label: 'Sent', className: 'bg-primary-50 text-primary-700' },
  paid: { label: 'Paid', className: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800' },
};

export default function StatusPill({ status }: { status: InvoiceStatus }) {
  const style = styles[status] ?? styles.draft;
  return <span className={`pill ${style.className}`}>{style.label}</span>;
}
