import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About OM Marketing — 15 Years of Weighing Scale Dealership in Ahmedabad',
  description:
    'OM Marketing is a Naroda-based authorised dealer of Unique, Deluxe & JB weighing scales since 2010. ISO 9001:2008 certified. Serving 2,400+ retailers across India.',
  alternates: { canonical: '/about' },
  openGraph: {
    url: '/about',
    title: 'About OM Marketing — Weighing Scale Dealer in Naroda, Ahmedabad',
    description:
      '15 years of weighing scale dealership in Naroda, Ahmedabad. Authorised supplier of Unique, Deluxe & JB. ISO 9001:2008 certified.',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
