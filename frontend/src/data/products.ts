// frontend/src/data/products.ts
//
// Static product data layer. Reads from the committed JSON snapshot at
// src/data/products.json. Refresh the snapshot via `node scripts/sync-products.mjs`
// (run from repo root) when products change, then commit + push.
//
// All public pages should import from this module — never from services/api for
// browsing. The FastAPI backend stays out of the request path.

import raw from './products.json';

export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  stock_quantity: number;
  image_url: string;
  specifications?: string;
  created_at?: string;
  updated_at?: string;
}

export type ProductCategory =
  | 'weighing_scale'
  | 'note_counter'
  | 'mobile_accessory';

const PRODUCTS = raw as Product[];

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductById(id: number): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts(limit = 3): Product[] {
  // Deterministic "featured" selection — first N in-stock items.
  // Swap for editorial picks later by adding a `featured: true` flag in the JSON.
  return PRODUCTS.filter((p) => p.stock_quantity > 0).slice(0, limit);
}

export function getProductIds(): number[] {
  return PRODUCTS.map((p) => p.id);
}

export function parseSpecifications(
  raw?: string
): Record<string, string> {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return Object.fromEntries(
        Object.entries(parsed).map(([k, v]) => [k, String(v)])
      );
    }
  } catch {
    /* fall through */
  }
  return {};
}
