import type { Metadata } from 'next';
import CartClient from './CartClient';

export const metadata: Metadata = {
  title: 'Your Bag',
  description: 'Review the weighing scales and accessories in your bag and confirm your order.',
  alternates: { canonical: '/cart' },
  robots: {
    // Cart is per-user state, never indexed.
    index: false,
    follow: false,
  },
};

export default function CartPage() {
  return <CartClient />;
}
