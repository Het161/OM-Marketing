import type { Metadata } from 'next';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'Buy Weighing Scales, Note Counters & Mobile Accessories Online in Ahmedabad',
  description:
    'Browse our full catalog of weighing scales, platform scales, note counters and mobile accessories. Stamping certificate included, free installation in Ahmedabad.',
  alternates: { canonical: '/products' },
  openGraph: {
    url: '/products',
    title: 'Buy Weighing Scales Online in Ahmedabad | OM Marketing',
    description:
      'Browse our full catalog of weighing scales, platform scales, note counters and mobile accessories.',
  },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
