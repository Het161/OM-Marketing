import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact OM Marketing — Weighing Scale Dealer in Naroda, Ahmedabad',
  description:
    'Visit our shop at JB Plaza, Naroda, Ahmedabad. Call +91 98252 47312 or WhatsApp for instant quotes. Hours: Mon-Sat 9-19, Sun 10-16.',
  alternates: { canonical: '/contact' },
  openGraph: {
    url: '/contact',
    title: 'Contact OM Marketing — Naroda, Ahmedabad',
    description:
      'Reach our atelier in Naroda, Ahmedabad. WhatsApp concierge, on-site demos, and free quotes for weighing solutions.',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
