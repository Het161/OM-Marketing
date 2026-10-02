// frontend/src/components/products/ProductGallery.tsx

'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import ProductImage from '@/components/products/ProductImage';

/**
 * Product photo gallery: one plate, a thumbnail rail, arrow keys.
 *
 * Falls back to a plain single image when a product only has one photo, so
 * the controls never appear with nothing to control.
 */
export default function ProductGallery({
  images,
  alt,
  badge,
}: {
  images: string[];
  alt: string;
  badge?: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const count = images.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  // Reset if the product changes under us
  useEffect(() => setIndex(0), [images]);

  const single = count <= 1;

  return (
    <div>
      <div
        className="relative aspect-[4/3] overflow-hidden border border-line bg-surface-2"
        role={single ? undefined : 'group'}
        aria-roledescription={single ? undefined : 'carousel'}
        aria-label={single ? undefined : `${alt} — photo gallery`}
        onKeyDown={(e) => {
          if (single) return;
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            go(index + 1);
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            go(index - 1);
          }
        }}
        tabIndex={single ? undefined : 0}
      >
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={images[index]}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <ProductImage
              src={images[index]}
              alt={count > 1 ? `${alt} — view ${index + 1} of ${count}` : alt}
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {badge}

        {!single && (
          <>
            <p aria-live="polite" aria-atomic className="sr-only">
              Photo {index + 1} of {count}
            </p>

            <div className="absolute bottom-3 right-3 flex">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous photo"
                className="flex h-9 w-9 items-center justify-center border border-white/25 bg-ink-950/80 text-steel-200 transition-colors hover:border-white hover:text-white"
              >
                <FiArrowLeft size={14} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next photo"
                className="-ml-px flex h-9 w-9 items-center justify-center border border-white/25 bg-ink-950/80 text-steel-200 transition-colors hover:border-white hover:text-white"
              >
                <FiArrowRight size={14} aria-hidden />
              </button>
            </div>

            <span className="label absolute bottom-3 left-3 bg-ink-950/80 px-2 py-1.5 text-steel-200">
              {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
          </>
        )}
      </div>

      {/* Thumbnail rail */}
      {!single && (
        <ul className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
                className={`relative block aspect-square w-full overflow-hidden border transition-colors ${
                  i === index
                    ? 'border-ink-900'
                    : 'border-line opacity-60 hover:opacity-100'
                }`}
              >
                <ProductImage
                  src={src}
                  alt=""
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
