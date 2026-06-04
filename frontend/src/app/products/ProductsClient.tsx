'use client';

import { useState, useEffect, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/data/products';

const categories = [
  { id: 'weighing_scale', name: 'Weighing Scales' },
  { id: 'note_counter', name: 'Note Counters' },
  { id: 'mobile_accessory', name: 'Mobile Accessories' },
];

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'price_low', label: 'Price · Low to High' },
  { id: 'price_high', label: 'Price · High to Low' },
];

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Static snapshot — committed at build time, never fetched from the backend.
const PRODUCTS = getAllProducts();

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryFromUrl);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setSelectedCategory(categoryFromUrl), 0);
    return () => clearTimeout(t);
  }, [categoryFromUrl]);

  const filteredProducts = useMemo(() => {
    let filtered = PRODUCTS;
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    if (sortBy === 'price_low')
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    if (sortBy === 'price_high')
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [selectedCategory, searchTerm, priceRange, sortBy]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchTerm('');
    setPriceRange([0, 100000]);
    setSortBy('featured');
  };

  const activeCategory = categories.find((c) => c.id === selectedCategory);

  return (
    <div>
      {/* ── Editorial header ── */}
      <section className="border-b border-[rgba(196,166,107,0.15)]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: E }}
            className="max-w-3xl"
          >
            <nav className="label-sm text-brand-muted mb-6 flex items-center gap-2 flex-wrap">
              <Link href="/" className="link-gold hover:text-brand-gold">Home</Link>
              <span className="text-brand-dim">/</span>
              <span className="text-brand-ivory/70">Collection</span>
              {activeCategory && (
                <>
                  <span className="text-brand-dim">/</span>
                  <span className="text-brand-gold">{activeCategory.name}</span>
                </>
              )}
            </nav>

            <p className="eyebrow mb-5">The Archive</p>
            <h1 className="font-display text-[2.6rem] sm:text-[3.6rem] lg:text-[4.2rem] leading-[1.05] text-brand-ivory">
              {activeCategory ? (
                <>
                  {activeCategory.name.split(' ').slice(0, -1).join(' ')}{' '}
                  <em className="italic text-brand-gold font-light">
                    {activeCategory.name.split(' ').slice(-1)[0].toLowerCase()}
                  </em>
                </>
              ) : (
                <>
                  The full <em className="italic text-brand-gold font-light">collection</em>.
                </>
              )}
            </h1>
            <p className="mt-6 text-brand-muted leading-relaxed max-w-xl">
              {activeCategory
                ? `Browse our complete range of ${activeCategory.name.toLowerCase()} curated for India's most discerning retailers.`
                : 'Every piece in our atelier, available for enquiry or immediate dispatch.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Main grid ── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-[260px_1fr] gap-12 lg:gap-16">

            {/* ── Filter rail ── */}
            <aside className="hidden lg:block">
              <div className="sticky top-32 space-y-10">

                {/* Search */}
                <div>
                  <p className="eyebrow text-brand-muted mb-4">Search</p>
                  <div className="relative">
                    <Search
                      strokeWidth={1}
                      size={14}
                      className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-dim pointer-events-none"
                    />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Find a piece"
                      className="input-luxury pl-6"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <p className="eyebrow text-brand-muted mb-4">Category</p>
                  <ul className="space-y-3">
                    <li>
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className={`link-gold text-sm uppercase tracking-[0.18em] transition-colors ${
                          !selectedCategory ? 'text-brand-gold' : 'text-brand-ivory/70 hover:text-brand-ivory'
                        }`}
                        data-active={!selectedCategory}
                      >
                        All Pieces
                      </button>
                    </li>
                    {categories.map((cat) => {
                      const active = selectedCategory === cat.id;
                      return (
                        <li key={cat.id}>
                          <button
                            onClick={() => setSelectedCategory(active ? null : cat.id)}
                            className={`link-gold text-sm uppercase tracking-[0.18em] text-left transition-colors ${
                              active ? 'text-brand-gold' : 'text-brand-ivory/70 hover:text-brand-ivory'
                            }`}
                            data-active={active}
                          >
                            {cat.name}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Price */}
                <div>
                  <p className="eyebrow text-brand-muted mb-4 flex items-center gap-2">
                    <SlidersHorizontal strokeWidth={1} size={12} />
                    Price Ceiling
                  </p>
                  <input
                    type="range"
                    min={0}
                    max={100000}
                    step={1000}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                    className="w-full accent-brand-gold"
                    style={{ accentColor: '#C4A66B' }}
                  />
                  <div className="flex justify-between text-xs text-brand-muted mt-3 font-mono">
                    <span>₹0</span>
                    <span className="text-brand-gold">
                      ₹{priceRange[1].toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <p className="eyebrow text-brand-muted mb-4">Sort</p>
                  <ul className="space-y-3">
                    {sortOptions.map((opt) => {
                      const active = sortBy === opt.id;
                      return (
                        <li key={opt.id}>
                          <button
                            onClick={() => setSortBy(opt.id)}
                            className={`link-gold text-sm transition-colors ${
                              active ? 'text-brand-gold' : 'text-brand-ivory/70 hover:text-brand-ivory'
                            }`}
                            data-active={active}
                          >
                            {opt.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <button
                  onClick={clearFilters}
                  className="label-sm text-brand-dim hover:text-brand-gold transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            </aside>

            {/* ── Mobile filter strip ── */}
            <div className="lg:hidden -mt-4 mb-2">
              <div className="surface p-4 space-y-3">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="SEARCH THE ARCHIVE"
                  className="input-luxury"
                />
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <select
                      value={selectedCategory || ''}
                      onChange={(e) => setSelectedCategory(e.target.value || null)}
                      className="input-luxury appearance-none pr-6 cursor-pointer"
                    >
                      <option value="">All Categories</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                    <ChevronDown strokeWidth={1} size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
                  </div>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="input-luxury appearance-none pr-6 cursor-pointer"
                    >
                      {sortOptions.map((opt) => (
                        <option key={opt.id} value={opt.id}>{opt.label}</option>
                      ))}
                    </select>
                    <ChevronDown strokeWidth={1} size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Product grid ── */}
            <div>
              <div className="hidden lg:flex items-center justify-between mb-10 pb-6 border-b border-[rgba(196,166,107,0.12)]">
                <p className="label-sm text-brand-muted">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'}
                </p>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="surface p-20 text-center">
                  <p className="eyebrow text-brand-muted mb-4">No matches</p>
                  <h3 className="font-display text-2xl text-brand-ivory mb-3">
                    Nothing in the archive yet
                  </h3>
                  <p className="text-sm text-brand-muted mb-8">
                    Adjust the filters above, or browse the full collection.
                  </p>
                  <button onClick={clearFilters} className="btn-outline">
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      category={product.category}
                      price={product.price}
                      image_url={product.image_url}
                      description={product.description}
                      stock_quantity={product.stock_quantity}
                      priority={index < 3}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-8 h-8 border border-brand-gold/30 border-t-brand-gold rounded-full animate-spin" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
