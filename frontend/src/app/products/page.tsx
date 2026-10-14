// frontend/src/app/products/page.tsx

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FiFilter, FiPhone, FiSearch, FiX } from 'react-icons/fi';

import ProductCard, { type Product } from '@/components/products/ProductCard';
import { ProductGridSkeleton } from '@/components/products/ProductCardSkeleton';
import { categories, site, whatsappLink } from '@/lib/site';
import { productApi } from '@/services/api';

const PRICE_CEILING = 100000;

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A to Z' },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') ?? '';
  const categoryParam = searchParams.get('category') ?? 'all';

  /* Paint from the bundled catalogue straight away. A search still has to go
     to the API, but browsing does not: the snapshot is the same committed
     file the backend is seeded from, so there is nothing to wait for. */
  const [products, setProducts] = useState<Product[]>(() =>
    searchQuery ? [] : (productApi.getAllInstant({ limit: 100 }) as Product[]),
  );
  const [loading, setLoading] = useState(() => Boolean(searchQuery));
  const [error, setError] = useState<string | null>(null);

  const [category, setCategory] = useState(categoryParam);
  const [maxPrice, setMaxPrice] = useState(PRICE_CEILING);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  /*
   * Narrowing the catalogue makes the page shorter. The filter card is
   * sticky, so once the document is shorter than the current scroll offset
   * the browser clamps the position and the reader is dropped at the foot of
   * the page with the control they just used somewhere off screen above.
   * Bringing the results back under the heading keeps them oriented.
   */
  const resultsRef = useRef<HTMLDivElement>(null);
  const showResults = useCallback(() => {
    const el = resultsRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      // Only move if the results have ended up above the fold — which is the
      // stranded case. On a phone the panel sits above the list and the
      // reader can already see both, so scrolling then would be meddling.
      const rect = el.getBoundingClientRect();
      if (rect.top >= 0) return;
      const reduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      const top = rect.top + window.scrollY - 104; // clears the sticky header
      window.scrollTo({
        top: Math.max(0, top),
        behavior: reduced ? 'auto' : 'smooth',
      });
    });
  }, []);

  // Keep the filter in sync when the URL changes (e.g. footer category links)
  useEffect(() => setCategory(categoryParam), [categoryParam]);

  useEffect(() => {
    let cancelled = false;
    // Only show a spinner when there is nothing on screen yet.
    const instant = searchQuery
      ? []
      : (productApi.getAllInstant({ limit: 100 }) as Product[]);
    setProducts(instant);
    setLoading(instant.length === 0);
    setError(null);

    async function load() {
      try {
        const data: Product[] = searchQuery
          ? await productApi.search(searchQuery)
          : await productApi.getAll({ limit: 100 });
        if (!cancelled) setProducts(data);
      } catch (err) {
        console.error(err);
        // Browsing already has the snapshot on screen; only a search can end
        // up with nothing to show.
        if (!cancelled && instant.length === 0) {
          setError("We couldn't load the catalogue just now.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [searchQuery]);

  const visible = useMemo(() => {
    let result = products.filter(
      (p) =>
        (category === 'all' || p.category === category) && p.price <= maxPrice,
    );

    switch (sortBy) {
      case 'price_low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [products, category, maxPrice, sortBy]);

  const reset = () => {
    setCategory('all');
    setMaxPrice(PRICE_CEILING);
    setSortBy('featured');
    showResults();
  };

  const hasFilters =
    category !== 'all' || maxPrice !== PRICE_CEILING || sortBy !== 'featured';

  return (
    <div className="shell py-12 sm:py-14">
      <div className="w-full">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            {searchQuery ? `Results for “${searchQuery}”` : 'Our Products'}
          </h1>
          <p className="mt-2 text-muted" aria-live="polite">
            {loading
              ? 'Loading products…'
              : `${visible.length} product${visible.length === 1 ? '' : 's'} found`}
          </p>

          {searchQuery && (
            <Link href="/products" className="btn-ghost mt-3 px-0">
              <FiX aria-hidden /> Clear search
            </Link>
          )}
        </header>

        {/* Mobile filter toggle */}
        <button
          type="button"
          onClick={() => setShowFilters((open) => !open)}
          aria-expanded={showFilters}
          aria-controls="product-filters"
          className="btn-outline mb-5 w-full lg:hidden"
        >
          <FiFilter aria-hidden />{' '}
          {showFilters ? 'Hide filters' : 'Show filters'}
          {hasFilters && (
            <span className="ml-1 rounded-full bg-primary-500 px-2 py-0.5 text-xs text-white">
              on
            </span>
          )}
        </button>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Filters */}
          <aside
            id="product-filters"
            className={`lg:col-span-1 lg:block ${showFilters ? 'block' : 'hidden'}`}
          >
            <div className="card p-6 lg:sticky lg:top-28">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold">Filters</h2>
                {hasFilters && (
                  <button
                    type="button"
                    onClick={reset}
                    className="text-sm font-semibold text-primary-600 hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>

              <fieldset className="mb-6">
                <legend className="mb-3 font-semibold">Category</legend>
                <div className="space-y-1">
                  {[{ value: 'all', label: 'All Products' }, ...categories].map(
                    (cat) => (
                      <label
                        key={cat.value}
                        className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg px-2 transition-colors hover:bg-surface-2"
                      >
                        <input
                          type="radio"
                          name="category"
                          value={cat.value}
                          checked={category === cat.value}
                          onChange={(e) => {
                            setCategory(e.target.value);
                            showResults();
                          }}
                          className="h-4 w-4 accent-[var(--color-primary-500)]"
                        />
                        <span className="text-sm">{cat.label}</span>
                      </label>
                    ),
                  )}
                </div>
              </fieldset>

              <div className="mb-6">
                <label htmlFor="max-price" className="mb-3 block font-semibold">
                  Maximum price
                </label>
                <input
                  id="max-price"
                  type="range"
                  min={1000}
                  max={PRICE_CEILING}
                  step={1000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  onPointerUp={showResults}
                  onKeyUp={showResults}
                  className="w-full accent-[var(--color-primary-500)]"
                />
                <div className="mt-2 flex justify-between text-sm text-muted">
                  <span>₹1,000</span>
                  <span className="font-semibold text-primary-600">
                    ₹{maxPrice.toLocaleString('en-IN')}
                    {maxPrice === PRICE_CEILING && '+'}
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="sort-by" className="mb-3 block font-semibold">
                  Sort by
                </label>
                <select
                  id="sort-by"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    showResults();
                  }}
                  className="field"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-6 rounded-xl bg-primary-50 p-4">
                <p className="mb-3 text-sm leading-relaxed text-primary-900">
                  Can&apos;t decide? Answer three questions and we&apos;ll
                  shortlist the right models.
                </p>
                <Link
                  href="/scale-finder"
                  className="btn-primary h-11 w-full text-sm"
                >
                  Find my scale
                </Link>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div ref={resultsRef} className="scroll-mt-28 lg:col-span-3">
            {loading ? (
              <ProductGridSkeleton count={6} />
            ) : error ? (
              <div className="card p-10 text-center">
                <p className="mb-2 text-lg font-semibold">{error}</p>
                <p className="mb-6 text-muted">
                  Our full range is still a phone call away.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <a href={`tel:${site.phoneDial}`} className="btn-primary">
                    <FiPhone aria-hidden /> Call {site.phoneDisplay}
                  </a>
                  <a
                    href={whatsappLink(
                      'Hello, I would like to see your product range.',
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    WhatsApp us
                  </a>
                </div>
              </div>
            ) : visible.length === 0 ? (
              <div className="card p-12 text-center">
                <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-surface-3 text-subtle">
                  <FiSearch size={28} aria-hidden />
                </span>
                <h2 className="mb-2 text-xl font-bold">No products match</h2>
                <p className="mx-auto mb-6 max-w-md text-muted">
                  We stock far more than is listed online. Tell us what you need
                  and we&apos;ll source it.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {hasFilters && (
                    <button
                      type="button"
                      onClick={reset}
                      className="btn-primary"
                    >
                      Reset filters
                    </button>
                  )}
                  <Link href="/contact" className="btn-outline">
                    Ask us for it
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {visible.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: Math.min(index, 5) * 0.05,
                    }}
                  >
                    <ProductCard {...product} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="shell py-12">
          <ProductGridSkeleton count={6} />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
