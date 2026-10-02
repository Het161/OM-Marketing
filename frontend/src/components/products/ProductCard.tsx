// frontend/src/components/products/ProductCard.tsx

'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { FiCheck, FiPlus } from 'react-icons/fi';

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

/* Which spec keys are worth showing on a card, in priority order. A scale
   buyer scans for capacity and platform size — not marketing prose. */
const SPEC_PRIORITY = [
  'capacity',
  'platform_size',
  'accuracy',
  'accuracy_class',
  'graduation',
  'display',
  'material',
  'power',
  'brand',
  'model',
];

function readSpecs(raw?: string): Array<[string, string]> {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return [];
    const entries = Object.entries(parsed as Record<string, unknown>);
    entries.sort((a, b) => {
      const ia = SPEC_PRIORITY.indexOf(a[0].toLowerCase());
      const ib = SPEC_PRIORITY.indexOf(b[0].toLowerCase());
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });
    return entries
      .slice(0, 3)
      .map(([k, v]) => [k.replace(/_/g, ' '), String(v)] as [string, string]);
  } catch {
    return [];
  }
}

export default function ProductCard(product: Product) {
  const { id, name, category, price, image_url, description, stock_quantity } = product;
  const addItem = useQuoteStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const specs = useMemo(() => readSpecs(product.specifications), [product.specifications]);
  const inStock = stock_quantity > 0;

  const handleAdd = () => {
    addItem({ id, name, price, image_url, category });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <article className="group relative flex h-full flex-col border border-line bg-surface transition-colors duration-200 hover:border-ink-900">
      {/* Image plate */}
      <Link
        href={`/products/${id}`}
        tabIndex={-1}
        aria-hidden
        className="relative block aspect-[5/4] overflow-hidden bg-surface-3"
      >
        <ProductImage
          src={image_url}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-ink-950/0 transition-colors duration-200 group-hover:bg-ink-950/5"
        />

        {/* Reference code, bottom-left, like a part number */}
        <span className="label absolute bottom-0 left-0 bg-ink-950 px-2.5 py-1.5 text-steel-300">
          {categoryLabels[category]?.replace(/\s+/g, '-').toUpperCase() ?? category}
          <span className="ml-1.5 text-white">·{String(id).padStart(3, '0')}</span>
        </span>

        {!inStock ? (
          <span className="pill absolute right-3 top-3 bg-accent-300 text-ink-900">
            To order
          </span>
        ) : stock_quantity < 10 ? (
          <span className="pill absolute right-3 top-3 bg-ink-950/85 text-accent-200">
            {stock_quantity} left
          </span>
        ) : null}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em]">
          <Link href={`/products/${id}`} className="after:absolute after:inset-0">
            {name}
          </Link>
        </h3>

        {/* Spec rows — the real content */}
        {specs.length > 0 ? (
          <dl className="mt-4 border-t border-line">
            {specs.map(([key, value]) => (
              <div
                key={key}
                className="grid grid-cols-[minmax(0,1fr)_minmax(0,auto)] items-baseline gap-3 border-b border-line py-2"
              >
                <dt className="label">{key}</dt>
                <dd className="data min-w-0 truncate text-right text-[0.8125rem] text-content">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          description && (
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
              {description}
            </p>
          )
        )}

        {/* Price + action */}
        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <div>
            <span className="label block">From</span>
            <span className="data mt-1 block text-[1.375rem] font-semibold tracking-tight">
              ₹{price.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="relative z-10 flex items-center gap-2">
            <a
              href={whatsappLink(
                `Hello OM Marketing, I'd like details on "${name}" (ref ${String(id).padStart(3, '0')}).`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ask about ${name} on WhatsApp`}
              className="label flex h-10 items-center border border-line px-3 text-content transition-colors hover:border-ink-900 hover:bg-ink-950 hover:text-white"
            >
              Ask
            </a>
            <button
              type="button"
              onClick={handleAdd}
              aria-live="polite"
              className="label flex h-10 items-center gap-1.5 bg-ink-950 px-3.5 text-white transition-colors hover:bg-primary-500"
            >
              {added ? (
                <>
                  <FiCheck aria-hidden size={13} /> Added
                </>
              ) : (
                <>
                  <FiPlus aria-hidden size={13} /> Quote
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </article>
  );
}
