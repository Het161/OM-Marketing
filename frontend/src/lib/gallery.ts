// frontend/src/lib/gallery.ts

/**
 * Extra photographs per product, beyond the single `image_url` the API
 * returns. Each entry was checked by opening the file — the names alone are
 * not reliable, and several files in /public/images are byte-identical
 * copies under different names.
 */
const GALLERY: Record<number, string[]> = {
  1: ['/images/30KG-Table-Top.jpg'],
  2: [
    '/images/400*400mm-SS.jpg',
    '/images/400*400mm-chicken-MS.jpeg',
    '/images/400*400mm.jpg',
  ],
  3: ['/images/crane-scale.jpeg', '/images/crane-scale.jpg'],
  4: ['/images/Mini-20KG.jpeg', '/images/Mini-20KG1.jpeg'],
  5: ['/images/ms-platform-500.jpg'],
  6: [
    '/images/600-600mm-ss-Regular.jpg',
    '/images/600*600mm-SS.jpg',
    '/images/heavy-platform-scale.jpg',
  ],
  9: ['/images/300*300mm-Chicken-ss.jpeg', '/images/platform-300x300.jpg'],
  10: ['/images/Jewellery.jpeg', '/images/Jewellery2.jpeg'],
  31: ['/images/10KG-Unique-company.jpg', '/images/Micro-mini.jpeg'],
  33: ['/images/500*500ms-chicken.jpeg', '/images/400*400mm-chicken-MS.jpeg'],
  34: ['/images/600*600mm-SS-chicken-top.jpeg'],
  35: ['/images/400*400mm-MS.jpg', '/images/400*400mm.jpg'],
  36: ['/images/900*900mm-1200*1200mm.jpeg'],
  37: ['/images/900*900mm-1200*1200mm.jpeg'],
};

/** All photos for a product, main image first, never duplicated. */
export function galleryFor(id: number, mainImage?: string | null): string[] {
  const extra = GALLERY[id] ?? [];
  const all = extra.length > 0 ? extra : mainImage ? [mainImage] : [];
  if (mainImage && !all.includes(mainImage)) all.unshift(mainImage);
  return Array.from(new Set(all.filter(Boolean)));
}
