// frontend/src/app/products/[id]/page.tsx

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
  FiArrowLeft,
  FiAward,
  FiCheck,
  FiFilePlus,
  FiMessageCircle,
  FiMinus,
  FiPhone,
  FiPlus,
  FiShare2,
  FiTool,
  FiTruck,
} from 'react-icons/fi';

import ProductCard, { type Product } from '@/components/products/ProductCard';
import ProductImage from '@/components/products/ProductImage';
import { ProductGridSkeleton } from '@/components/products/ProductCardSkeleton';
import { categoryLabels, site, whatsappLink } from '@/lib/site';
import { productApi } from '@/services/api';
import { useQuoteStore } from '@/store/quoteStore';

const assurances = [
  { icon: FiAward, text: '1-year warranty on manufacturing defects' },
  { icon: FiTool, text: 'Installation, calibration & AMC available' },
  { icon: FiTruck, text: 'Delivery across Gujarat' },
];

/** Product specs are stored as a JSON string; parse defensively. */
function parseSpecs(raw?: string): Array<[string, string]> {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return [];
    return Object.entries(parsed).map(([key, value]) => [
      key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      String(value),
    ]);
  } catch {
    return [];
  }
}

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [copied, setCopied] = useState(false);

  const addItem = useQuoteStore((s) => s.addItem);

  useEffect(() => {
    if (!Number.isFinite(productId)) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setNotFound(false);

    async function load() {
      try {
        const data: Product = await productApi.getById(productId);
        if (cancelled) return;
        setProduct(data);

        // Sibling products from the same category
        const siblings: Product[] = await productApi.getAll({
          category: data.category,
          limit: 8,
        });
        if (!cancelled) {
          setRelated(siblings.filter((p) => p.id !== data.id).slice(0, 3));
        }
      } catch (error) {
        console.error(error);
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [productId]);

  const specs = useMemo(() => parseSpecs(product?.specifications), [product]);

  const handleAdd = () => {
    if (!product) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      category: product.category,
      quantity,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product?.name, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // The customer dismissed the share sheet — nothing to do.
    }
  };

  /* ------------------------------------------------------------- loading */

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="skeleton aspect-[4/3] rounded-2xl" />
          <div>
            <div className="skeleton mb-4 h-6 w-32" />
            <div className="skeleton mb-3 h-9 w-full" />
            <div className="skeleton mb-6 h-9 w-3/4" />
            <div className="skeleton mb-3 h-4 w-full" />
            <div className="skeleton mb-8 h-4 w-2/3" />
            <div className="skeleton mb-6 h-12 w-48" />
            <div className="skeleton h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  /* ----------------------------------------------------------- not found */

  if (notFound || !product) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl items-center px-4 py-16">
        <div className="w-full text-center">
          <span className="mb-5 block text-6xl" aria-hidden>
            ⚖️
          </span>
          <h1 className="mb-3 text-3xl font-extrabold">We couldn&apos;t find that product</h1>
          <p className="mx-auto mb-8 max-w-md leading-relaxed text-muted">
            It may have been renamed or replaced by a newer model. Browse the full
            range, or tell us what you were looking for.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/products" className="btn-primary">
              Browse all products
            </Link>
            <a href={`tel:${site.phoneDial}`} className="btn-outline">
              <FiPhone aria-hidden /> Call {site.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- view */

  const inStock = product.stock_quantity > 0;

  return (
    <div className="px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
            <li>
              <Link href="/" className="hover:text-primary-600 hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/products" className="hover:text-primary-600 hover:underline">
                Products
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link
                href={`/products?category=${product.category}`}
                className="hover:text-primary-600 hover:underline"
              >
                {categoryLabels[product.category] ?? product.category}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="max-w-[16rem] truncate font-medium text-content">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="card relative aspect-[4/3] overflow-hidden p-0">
              <ProductImage
                src={product.image_url}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <span className="pill absolute left-4 top-4 bg-primary-500 text-white">
                {categoryLabels[product.category] ?? product.category}
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {assurances.map((item) => (
                <div
                  key={item.text}
                  className="flex items-start gap-2.5 rounded-xl border border-line bg-surface-2 p-3"
                >
                  <item.icon aria-hidden className="mt-0.5 shrink-0 text-primary-500" />
                  <span className="text-[13px] leading-snug text-muted">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span
                className={`pill ${
                  inStock ? 'bg-green-100 text-green-800' : 'bg-accent-100 text-accent-800'
                }`}
              >
                {inStock ? `In stock · ${product.stock_quantity} available` : 'Made to order'}
              </span>
              <span className="pill bg-primary-50 text-primary-700">
                {site.certification}
              </span>
            </div>

            {product.description && (
              <p className="mt-5 text-[16px] leading-relaxed text-muted">
                {product.description}
              </p>
            )}

            <div className="mt-7 rounded-2xl border border-line bg-surface-2 p-5">
              <span className="block text-[11px] font-bold uppercase tracking-wide text-subtle">
                Indicative price
              </span>
              <span className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-primary-600">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                Guide price excluding GST and delivery. Request a quote for firm
                pricing — there is usually room to negotiate on quantity.
              </p>
            </div>

            {/* Quantity + actions */}
            <div className="mt-6">
              <label
                htmlFor="quantity"
                className="mb-2 block text-sm font-semibold"
              >
                Quantity
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 rounded-lg border border-line-strong p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="flex h-11 w-11 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-3 hover:text-content"
                  >
                    <FiMinus size={16} aria-hidden />
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    min={1}
                    max={999}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.min(999, Math.max(1, Number(e.target.value) || 1)))
                    }
                    className="w-14 border-0 bg-transparent text-center font-semibold tabular-nums focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(999, q + 1))}
                    aria-label="Increase quantity"
                    className="flex h-11 w-11 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-3 hover:text-content"
                  >
                    <FiPlus size={16} aria-hidden />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleShare}
                  className="btn-ghost h-11"
                  aria-label="Share this product"
                >
                  {copied ? (
                    <>
                      <FiCheck aria-hidden /> Link copied
                    </>
                  ) : (
                    <>
                      <FiShare2 aria-hidden /> Share
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="btn-primary"
                  aria-live="polite"
                >
                  {added ? (
                    <>
                      <FiCheck aria-hidden /> Added to quote
                    </>
                  ) : (
                    <>
                      <FiFilePlus aria-hidden /> Add to quote
                    </>
                  )}
                </button>

                <a
                  href={whatsappLink(
                    `Hello OM Marketing, I'm interested in "${product.name}" (quantity ${quantity}). Could you share your best price and availability?`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <FiMessageCircle aria-hidden /> Enquire on WhatsApp
                </a>
              </div>

              {added && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-center text-sm"
                >
                  <Link href="/quote" className="font-semibold text-primary-600 underline">
                    View your quote list →
                  </Link>
                </motion.p>
              )}

              <a
                href={`tel:${site.phoneDial}`}
                className="btn-outline mt-3 w-full"
              >
                <FiPhone aria-hidden /> Call {site.phoneDisplay}
              </a>
            </div>

            {/* Specifications */}
            {specs.length > 0 && (
              <section className="mt-9">
                <h2 className="mb-4 text-xl font-bold">Specifications</h2>
                <div className="overflow-hidden rounded-2xl border border-line">
                  <table className="w-full text-sm">
                    <caption className="sr-only">
                      Technical specifications for {product.name}
                    </caption>
                    <tbody>
                      {specs.map(([label, value], index) => (
                        <tr
                          key={label}
                          className={index % 2 === 0 ? 'bg-surface-2' : 'bg-surface'}
                        >
                          <th
                            scope="row"
                            className="w-2/5 px-4 py-3 text-left font-semibold text-muted"
                          >
                            {label}
                          </th>
                          <td className="px-4 py-3 font-medium">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </motion.div>
        </div>

        {/* Related */}
        <section className="mt-16 border-t border-line pt-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold sm:text-3xl">You might also need</h2>
              <p className="mt-1.5 text-muted">
                Other {categoryLabels[product.category]?.toLowerCase() ?? 'products'} we
                stock.
              </p>
            </div>
            <Link href="/products" className="btn-outline">
              View all
            </Link>
          </div>

          {related.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.id} {...item} />
              ))}
            </div>
          ) : (
            <ProductGridSkeleton count={3} />
          )}
        </section>

        <div className="mt-12">
          <Link href="/products" className="btn-ghost px-0">
            <FiArrowLeft aria-hidden /> Back to all products
          </Link>
        </div>
      </div>
    </div>
  );
}
