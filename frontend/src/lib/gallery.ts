// frontend/src/lib/gallery.ts

/**
 * Extra photographs per product, beyond the single `image_url` the API
 * returns. Verified by eye and de-duplicated by file hash — several files in
 * /public/images are byte-identical copies under different names, and showing
 * the same photo twice in a gallery looks like a mistake.
 */
const GALLERY: Record<number, string[]> = {
  1: ['/images/30kg-tebal-scale.jpg', '/images/tebal-top-scale.jpg'],
  3: ['/images/crane-scale.jpeg', '/images/crane-scale.jpg'],
  4: [
    '/images/Mini-20KG.jpeg',
    '/images/Mini-20KG1.jpeg',
    '/images/mini-scale-ms-10-20kg.jpg',
  ],
  6: [
    '/images/600-600mm-ss-Regular.jpg',
    '/images/ss-platform-600.jpg',
    '/images/heavy-platform-scale.jpg',
  ],
  9: ['/images/300*300mm-Chicken-ss.jpeg', '/images/platform-300x300.jpg'],
  10: ['/images/Jewellery.jpeg', '/images/Jewellery2.jpeg'],
  35: [
    '/images/platform-scale.jpg',
    '/images/platform-scale-detail.jpg',
    '/images/platform-Scale.jpeg',
  ],
};

/** All photos for a product, main image first, never duplicated. */
export function galleryFor(id: number, mainImage?: string | null): string[] {
  const extra = GALLERY[id] ?? [];
  const all = extra.length > 0 ? extra : mainImage ? [mainImage] : [];
  if (mainImage && !all.includes(mainImage)) all.unshift(mainImage);
  return Array.from(new Set(all.filter(Boolean)));
}
