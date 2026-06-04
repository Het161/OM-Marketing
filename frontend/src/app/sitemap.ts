import type { MetadataRoute } from 'next';
import { productApi } from '@/services/api';

const SITE_URL = 'https://ommarketing.co.in';

// Revalidate sitemap every hour so newly-added products surface promptly
// without thrashing the backend on every request.
export const revalidate = 3600;

interface ProductLike {
  id: number;
  updated_at?: string;
  created_at?: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/products`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/categories`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Category landing pages (filtered listings)
  const categoryRoutes: MetadataRoute.Sitemap = [
    'weighing_scale',
    'note_counter',
    'mobile_accessory',
  ].map((slug) => ({
    url: `${SITE_URL}/products?category=${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Dynamic product detail pages — fail soft if the API is unreachable
  // (sitemap still ships with static + category routes).
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = (await productApi.getAll()) as ProductLike[];
    productRoutes = products.map((p) => ({
      url: `${SITE_URL}/products/${p.id}`,
      lastModified: p.updated_at
        ? new Date(p.updated_at)
        : p.created_at
        ? new Date(p.created_at)
        : now,
      changeFrequency: 'weekly',
      priority: 0.6,
    }));
  } catch (err) {
    console.error('[sitemap] product fetch failed, omitting product URLs', err);
  }

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
