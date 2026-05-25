'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Eye } from 'lucide-react';
import QuickViewModal from './QuickViewModal';

interface ProductCardProps {
  id: number;
  name: string;
  category: string;
  price: number;
  image_url: string;
  description?: string;
  stock_quantity: number;
  priority?: boolean;
}

const PLACEHOLDER_BLUR =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzFDMTgxNCIvPjwvc3ZnPg==';

function formatCategory(c: string) {
  return c.replace(/_/g, ' ');
}

export default function ProductCard({
  id,
  name,
  category,
  price,
  image_url,
  stock_quantity,
  priority = false,
}: ProductCardProps) {
  const [showQuickView, setShowQuickView] = useState(false);
  const [imageError, setImageError] = useState(false);

  const displayImageUrl = imageError
    ? '/images/placeholder.jpg'
    : image_url || '/images/placeholder.jpg';

  const outOfStock = stock_quantity === 0;
  const lowStock = stock_quantity > 0 && stock_quantity < 5;

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="surface group relative h-full flex flex-col"
      >
        {/* ── Status label (top-right) ── */}
        {outOfStock && (
          <div
            className="absolute top-4 right-4 z-10 px-2.5 py-1 border border-[rgba(196,166,107,0.4)] text-[10px] tracking-[0.2em] uppercase text-brand-muted bg-brand-canvas/85 backdrop-blur-sm"
            style={{ borderRadius: 2 }}
          >
            Reserved
          </div>
        )}
        {lowStock && !outOfStock && (
          <div
            className="absolute top-4 right-4 z-10 px-2.5 py-1 border border-brand-gold/60 text-[10px] tracking-[0.2em] uppercase text-brand-gold bg-brand-canvas/85 backdrop-blur-sm"
            style={{ borderRadius: 2 }}
          >
            Last {stock_quantity}
          </div>
        )}

        <Link href={`/products/${id}`} className="block flex-1 flex flex-col">
          {/* ── Image ── */}
          <div className="relative aspect-square overflow-hidden bg-[#0F0D0B]">
            <Image
              src={displayImageUrl}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              className="object-contain p-8 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              quality={92}
              placeholder="blur"
              blurDataURL={PLACEHOLDER_BLUR}
              onError={() => setImageError(true)}
            />

            {/* Soft vignette on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-canvas/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Quick view trigger */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowQuickView(true);
              }}
              aria-label="Quick view"
              className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center border border-[rgba(196,166,107,0.3)] text-brand-ivory/80 bg-brand-canvas/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 hover:border-brand-gold hover:text-brand-gold"
              style={{ borderRadius: 2 }}
            >
              <Eye strokeWidth={1} size={16} />
            </button>
          </div>

          {/* ── Hairline ── */}
          <div className="hairline-h" />

          {/* ── Details ── */}
          <div className="p-6 sm:p-7 flex-1 flex flex-col gap-4">
            <span className="label-sm text-brand-muted">
              {formatCategory(category)}
            </span>

            <h3 className="font-display text-[1.4rem] leading-[1.15] text-brand-ivory line-clamp-2">
              {name}
            </h3>

            <div className="mt-auto flex items-baseline justify-between gap-4 pt-2">
              <span className="font-display text-2xl text-brand-gold">
                ₹{price.toLocaleString('en-IN')}
              </span>
              <span className="link-gold text-[10px] tracking-[0.25em] uppercase text-brand-ivory/75 hover:text-brand-gold">
                Discover
              </span>
            </div>
          </div>
        </Link>
      </motion.article>

      {showQuickView && (
        <QuickViewModal
          productId={id}
          onClose={() => setShowQuickView(false)}
        />
      )}
    </>
  );
}
