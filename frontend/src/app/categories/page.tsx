import type { Metadata } from 'next';
import CategoriesClient from './CategoriesClient';

export const metadata: Metadata = {
  title: 'Categories — Weighing Scales, Note Counters & Mobile Accessories',
  description:
    'Browse weighing scales (₹1,950–₹8,500), note counters, and mobile accessories. Stamping certificate included, pan-India dispatch from Naroda, Ahmedabad.',
  alternates: { canonical: '/categories' },
  openGraph: {
    url: '/categories',
    title: 'Product Categories | OM Marketing Ahmedabad',
    description:
      'Three categories: weighing scales, note counters, mobile accessories — all from authorised brands with stamping certificate.',
  },
};

export default function CategoriesPage() {
  return <CategoriesClient />;
}
