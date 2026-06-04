import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title:
    'Weighing Scales, Note Counters & Mobile Accessories in Ahmedabad | OM Marketing',
  description:
    'Authorised dealer of Unique, Deluxe & JB weighing scales in Naroda, Ahmedabad. ISO 9001:2008. Free installation, stamping certificate included, pan-India dispatch.',
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    title:
      'Weighing Scales, Note Counters & Mobile Accessories in Ahmedabad | OM Marketing',
    description:
      'Authorised dealer of Unique, Deluxe & JB weighing scales in Naroda, Ahmedabad. ISO 9001:2008. Free installation, pan-India dispatch.',
  },
};

export default function HomePage() {
  return <HomeClient />;
}
