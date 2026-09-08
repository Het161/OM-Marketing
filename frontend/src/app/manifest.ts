// frontend/src/app/manifest.ts

import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'OM Marketing — Weighing Scales & Note Counters',
    short_name: 'OM Marketing',
    description:
      'ISO 9001:2008 certified supplier of weighing scales, note counters and mobile accessories in Ahmedabad, Gujarat.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#008080',
    lang: 'en-IN',
    categories: ['business', 'shopping'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
