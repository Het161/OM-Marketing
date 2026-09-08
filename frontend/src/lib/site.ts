// frontend/src/lib/site.ts

/**
 * Single source of truth for business details.
 * Change a phone number here and it updates everywhere on the site.
 */

export const site = {
  name: 'OM Marketing',
  tagline: 'Weighing Solutions You Can Trust',
  owner: 'Het Patel',
  established: 2008,

  phoneDisplay: '98252 47312',
  phoneDial: '+919825247312',
  whatsapp: '919825247312',

  email: 'ommarketing.weighingscale1@gmail.com',
  instagram: 'ommarketing_scales',
  instagramUrl: 'https://instagram.com/ommarketing_scales',

  addressLine: 'Naroda, Ahmedabad',
  addressRegion: 'Gujarat, India',
  addressFull: 'Naroda, Ahmedabad, Gujarat, India',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=OM+Marketing+Weighing+Scales+Naroda+Ahmedabad',

  certification: 'ISO 9001:2008 Certified',

  hours: [
    { days: 'Monday – Saturday', time: '9:00 AM – 7:00 PM' },
    { days: 'Sunday', time: 'Closed' },
  ],
} as const;

/** Build a WhatsApp deep link with a pre-filled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/services', label: 'Services' },
  { href: '/scale-finder', label: 'Find My Scale' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

export const categories = [
  {
    value: 'weighing_scale',
    label: 'Weighing Scales',
    blurb: 'Table top, platform, crane and industrial scales from 10 kg to 15 ton.',
    image: '/images/platform-scale.jpg',
  },
  {
    value: 'note_counter',
    label: 'Note Counters',
    blurb: 'High-speed banknote counters with fake-note detection for banks and retail.',
    image: '/images/note-counter.jpg',
  },
  {
    value: 'mobile_accessory',
    label: 'Mobile Accessories',
    blurb: 'Chargers, cables, batteries and everyday accessories at wholesale rates.',
    image: '/images/micro-mini-scale.jpg',
  },
] as const;

export const categoryLabels: Record<string, string> = {
  weighing_scale: 'Weighing Scale',
  note_counter: 'Note Counter',
  mobile_accessory: 'Mobile Accessory',
};

export const serviceTypes = [
  {
    value: 'calibration',
    label: 'Calibration & Stamping',
    icon: '🎯',
    blurb:
      'On-site calibration against traceable reference weights, plus help with Legal Metrology verification and stamping.',
  },
  {
    value: 'repair',
    label: 'Repair',
    icon: '🔧',
    blurb:
      'Load cell, indicator, display and battery faults diagnosed and repaired — most jobs finished the same visit.',
  },
  {
    value: 'amc',
    label: 'Annual Maintenance (AMC)',
    icon: '🗓️',
    blurb:
      'Scheduled preventive servicing and priority breakdown cover so your scales never hold up production.',
  },
  {
    value: 'installation',
    label: 'Installation & Training',
    icon: '📦',
    blurb:
      'Delivery, levelling, commissioning and staff training so your team is confident from day one.',
  },
  {
    value: 'rental',
    label: 'Scale on Rent',
    icon: '📅',
    blurb:
      'Short-term platform and crane scale hire for audits, seasonal peaks and one-off projects.',
  },
  {
    value: 'other',
    label: 'Something else',
    icon: '💬',
    blurb: 'Tell us what you need and we will point you to the right solution.',
  },
] as const;
