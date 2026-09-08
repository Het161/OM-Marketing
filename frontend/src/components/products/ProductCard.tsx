// frontend/src/components/products/ProductCard.tsx

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { FiCheck, FiFilePlus, FiMessageCircle } from 'react-icons/fi';

import ProductImage from '@/components/products/ProductImage';
import { categoryLabels, whatsappLink } from '@/lib/site';
import { useQuoteStore } from '@/store/quoteStore';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image_url: string;
  description?: string;
  stock_quantity: number;
  specifications?: string;
}

const categoryStyles: Record<string, string> = {
  weighing_scale: 'bg-primary-500 text-white',
  note_counter: 'bg-accent-500 text-ink-900',
  mobile_accessory: 'bg-purple-600 text-white',
};

export default function ProductCard(product: Product) {
  const { id, name, category, price, image_url, description, stock_quantity } = product;
  const addItem = useQuoteStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const inStock = stock_quantity > 0;

  const handleAdd = () => {
    addItem({ id, name, price, image_url, category });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="card group flex h-full flex-col"
    >
      <Link
        href={`/products/${id}`}
        className="relative block aspect-[4/3] overflow-hidden bg-surface-3"
        tabIndex={-1}
        aria-hidden
      >
        <ProductImage
          src={image_url}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span
          className={`pill absolute left-3 top-3 ${
            categoryStyles[category] ?? 'bg-ink-700 text-white'
          }`}
        >
          {categoryLabels[category] ?? category.replace(/_/g, ' ')}
        </span>

        {!inStock && (
          <span className="pill absolute right-3 top-3 bg-ink-900/85 text-white">
            Made to order
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-[17px] font-bold leading-snug">
          <Link
            href={`/products/${id}`}
            className="line-clamp-2 transition-colors hover:text-primary-600"
          >
            {name}
          </Link>
        </h3>

        {description && (
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted">
            {description}
          </p>
        )}

        <div className="mt-auto">
          <div className="mb-4 flex items-end justify-between gap-2">
            <div>
              <span className="block text-[11px] font-semibold uppercase tracking-wide text-subtle">
                Starting at
              </span>
              <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-primary-600">
                ₹{price.toLocaleString('en-IN')}
              </span>
            </div>
            {inStock && stock_quantity < 10 && (
              <span className="pill bg-accent-100 text-accent-800">
                Only {stock_quantity} left
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAdd}
              className="btn-primary h-11 flex-1 px-3 text-sm"
              aria-live="polite"
            >
              {added ? (
                <>
                  <FiCheck aria-hidden /> Added
                </>
              ) : (
                <>
                  <FiFilePlus aria-hidden /> Add to Quote
                </>
              )}
            </button>

            <a
              href={whatsappLink(
                `Hello OM Marketing, I'm interested in "${name}" (₹${price.toLocaleString('en-IN')}). Could you share the best price and availability?`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Enquire about ${name} on WhatsApp`}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.625rem] bg-[#25D366] text-white transition-transform duration-200 hover:scale-105"
            >
              <FiMessageCircle size={19} aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
