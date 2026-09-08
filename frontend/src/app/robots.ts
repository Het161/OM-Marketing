// frontend/src/app/robots.ts

import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ommarketing.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The quote list is personal to the visitor and has nothing to index.
      disallow: ['/quote', '/cart', '/account'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
