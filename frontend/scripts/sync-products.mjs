#!/usr/bin/env node
// frontend/scripts/sync-products.mjs
//
// Refresh the committed product snapshot at src/data/products.json.
// Run manually when products are added/edited via the backend, then commit + push
// to trigger a Vercel rebuild — visitors hit the new data from the CDN.
//
// Usage (run from frontend/):
//   cd frontend && node scripts/sync-products.mjs
//   API_URL=https://staging.example.com node scripts/sync-products.mjs

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const API_URL = process.env.API_URL || 'https://om-marketing.onrender.com';
const ENDPOINT = `${API_URL}/api/products/`;

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, '..', 'src', 'data', 'products.json');

async function main() {
  console.log(`[sync-products] fetching ${ENDPOINT}`);
  const start = Date.now();

  // Generous timeout — Render free tier can take 60+ seconds when cold.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 120_000);

  let res;
  try {
    res = await fetch(ENDPOINT, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok) {
    console.error(`[sync-products] HTTP ${res.status} ${res.statusText}`);
    process.exit(1);
  }

  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) {
    console.error('[sync-products] response was empty or not an array, aborting');
    process.exit(1);
  }

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(data, null, 2) + '\n', 'utf-8');

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`[sync-products] wrote ${data.length} products to ${OUT_PATH} in ${elapsed}s`);
  console.log('[sync-products] next: cd .. && git add frontend/src/data/products.json && git commit && git push');
}

main().catch((err) => {
  console.error('[sync-products] failed:', err.message);
  process.exit(1);
});
