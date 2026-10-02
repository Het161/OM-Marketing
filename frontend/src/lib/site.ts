// frontend/src/lib/site.ts

/**
 * Single source of truth for business details.
 * Change a phone number here and it updates everywhere on the site.
 */

export const site = {
  name: 'OM Marketing',
  tagline: 'Weighing Solutions You Can Trust',
  owner: 'Het Patel',

  /**
   * Legal entity as registered under Udyam (MSME). Printed on invoices.
   * The shop address below is deliberately the same: Google's local ranking
   * rewards an identical name/address/phone across the site, the bills and
   * the Google Business Profile.
   */
  registeredName: 'OM Marketing',
  registeredAddress:
    'A-104, Het Patel Building, Nikol, Ahmedabad, Gujarat 382350',
  udyam: 'UDYAM-GJ-01-0593027',

  phoneDisplay: '98252 47312',
  phoneDial: '+919825247312',
  whatsapp: '919825247312',

  email: 'ommarketing.weighingscale1@gmail.com',
  instagram: 'hetpatel0812',
  instagramUrl: 'https://www.instagram.com/hetpatel0812/',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61585876964104',

  /**
   * The shop as a customer finds it. The landmarks matter more than the
   * building name here — people navigate to the fire station or the D-Mart,
   * so they lead. `mapsUrl` is the owner's own Google Maps pin, not a search
   * query, so the link always lands on the right place.
   */
  addressLine: 'Suhas Auram, Opp. Nikol Fire Station, Near Nikol D-Mart',
  addressRegion: 'Nikol, Ahmedabad, Gujarat 382350',
  addressFull:
    'Suhas Auram, Opp. Nikol Fire Station, Near Nikol D-Mart, Nikol, Ahmedabad, Gujarat 382350',
  mapsUrl: 'https://maps.app.goo.gl/4fpvqnKqFjkUGpJV8',

  certification: 'ISO 9001:2008 Certified',
  msme: 'MSME / Udyam Registered',

  hours: [{ days: 'Every day', time: 'Open 24 hours' }],
  hoursShort: 'Open 24 hours',
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
    blurb:
      'Table top, platform, crane and industrial scales from 10 kg to 15 ton.',
    image: '/images/600-600mm-ss-Regular.jpg',
  },
  {
    value: 'note_counter',
    label: 'Note Counters',
    blurb:
      'High-speed banknote counters with fake-note detection for banks and retail.',
    image: '/images/note-counter.jpg',
  },
] as const;

export const categoryLabels: Record<string, string> = {
  weighing_scale: 'Weighing Scale',
  note_counter: 'Note Counter',
};

export const serviceTypes = [
  {
    value: 'calibration',
    label: 'Calibration & Stamping',
    icon: 'target',
    blurb:
      'On-site calibration against traceable reference weights, plus help with Legal Metrology verification and stamping.',
  },
  {
    value: 'repair',
    label: 'Repair',
    icon: 'tool',
    blurb:
      'Load cell, indicator, display and battery faults diagnosed and repaired — most jobs finished the same visit.',
  },
  {
    value: 'amc',
    label: 'Annual Maintenance (AMC)',
    icon: 'calendar',
    blurb:
      'Scheduled preventive servicing and priority breakdown cover so your scales never hold up production.',
  },
  {
    value: 'installation',
    label: 'Installation & Training',
    icon: 'package',
    blurb:
      'Delivery, levelling, commissioning and staff training so your team is confident from day one.',
  },
  {
    value: 'rental',
    label: 'Scale on Rent',
    icon: 'clock',
    blurb:
      'Short-term platform and crane scale hire for audits, seasonal peaks and one-off projects.',
  },
  {
    value: 'other',
    label: 'Something else',
    icon: 'message',
    blurb: 'Tell us what you need and we will point you to the right solution.',
  },
] as const;

/**
 * Published repair-parts and service rates, exactly as quoted by the owner.
 * Transparent pricing is a real differentiator in this trade, and it is what
 * people searching "weighing scale PCB price" actually land on.
 */
export const spareParts = [
  {
    group: 'Boards',
    items: [
      { part: 'PCB — 6 V', price: 1250 },
      { part: 'PCB — 4 V', price: 750 },
    ],
  },
  {
    group: 'Batteries',
    items: [
      { part: 'Battery — 6 V', price: 850 },
      { part: 'Battery — 6 V lithium, 4000 cycles', price: 1250 },
      { part: 'Battery — 4 V', price: 550 },
    ],
  },
  {
    group: 'Power',
    items: [
      { part: 'Transformer — 6 V', price: 300 },
      { part: 'Transformer — 4 V', price: 200 },
      { part: 'Mains cord', price: 150 },
      { part: 'Cable', price: 100 },
    ],
  },
  {
    group: 'Display & labour',
    items: [
      { part: 'Display', price: 150 },
      { part: 'Indicator light', price: 50 },
      { part: 'Service charge — per visit', price: 250 },
    ],
  },
] as const;
