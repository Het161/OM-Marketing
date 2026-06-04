'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Check,
  MessageCircle,
  Phone,
  Mail,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Wrench,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { type Product, parseSpecifications } from '@/data/products';

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];
const WHATSAPP_NUMBER = '919825247312';

export default function ProductDetailClient({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const specifications = parseSpecifications(product.specifications);
  const inStock = product.stock_quantity > 0;
  const lowStock = inStock && product.stock_quantity < 5;
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello, I am enquiring about ${product.name}. Could you share availability and pricing?`
  )}`;

  const handleAddToBag = () => {
    if (!inStock) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image_url: product.image_url,
      category: product.category,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-10 sm:py-14">

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: E }}
          className="mb-10"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 label-sm text-brand-muted hover:text-brand-gold transition-colors"
          >
            <ArrowLeft strokeWidth={1} size={14} />
            Back to the Collection
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-start">

          {/* ── Image ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: E }}
            className="surface relative aspect-square overflow-hidden bg-[#0F0D0B]"
          >
            <Image
              src={product.image_url || '/images/placeholder.jpg'}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-contain p-10 sm:p-16"
              priority
            />

            {!inStock && (
              <div
                className="absolute top-6 left-6 px-3 py-1.5 border border-[rgba(196,166,107,0.4)] text-[10px] tracking-[0.25em] uppercase text-brand-muted bg-brand-canvas/85"
                style={{ borderRadius: 2 }}
              >
                Reserved
              </div>
            )}
            {lowStock && (
              <div
                className="absolute top-6 left-6 px-3 py-1.5 border border-brand-gold/60 text-[10px] tracking-[0.25em] uppercase text-brand-gold bg-brand-canvas/85"
                style={{ borderRadius: 2 }}
              >
                Last {product.stock_quantity}
              </div>
            )}
          </motion.div>

          {/* ── Info ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: E }}
            className="flex flex-col"
          >
            <p className="eyebrow text-brand-muted mb-5">
              {product.category.replace(/_/g, ' ')}
            </p>

            <h1 className="font-display text-[2.2rem] sm:text-[2.8rem] lg:text-[3.2rem] leading-[1.05] text-brand-ivory mb-8">
              {product.name}
            </h1>

            <div className="font-display text-[2.4rem] text-brand-gold mb-10 leading-none">
              ₹{product.price.toLocaleString('en-IN')}
            </div>

            <div className="hairline-h mb-10" />

            {/* Description */}
            <p className="text-base text-brand-muted leading-[1.75] mb-10">
              {product.description ||
                'A precision instrument crafted for the discerning operator — built to deliver exact measurements over decades of service.'}
            </p>

            {/* Availability + warranty row */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="flex items-start gap-3">
                <div className="text-brand-gold mt-0.5">
                  <Check strokeWidth={1} size={18} />
                </div>
                <div>
                  <p className="label-sm text-brand-ivory mb-1">
                    {inStock ? 'In Stock' : 'Made to Order'}
                  </p>
                  <p className="text-xs text-brand-muted">
                    {inStock ? 'Ready for dispatch' : 'Available on enquiry'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-brand-gold mt-0.5">
                  <ShieldCheck strokeWidth={1} size={18} />
                </div>
                <div>
                  <p className="label-sm text-brand-ivory mb-1">Warranty</p>
                  <p className="text-xs text-brand-muted">
                    Lifetime atelier service
                  </p>
                </div>
              </div>
            </div>

            {/* Specifications */}
            {Object.keys(specifications).length > 0 && (
              <div className="mb-10">
                <p className="eyebrow text-brand-muted mb-5">Specifications</p>
                <dl className="border-t border-[rgba(196,166,107,0.15)]">
                  {Object.entries(specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="grid grid-cols-[140px_1fr] gap-6 py-3.5 border-b border-[rgba(196,166,107,0.12)]"
                    >
                      <dt className="label-sm text-brand-muted">
                        {key.replace(/_/g, ' ')}
                      </dt>
                      <dd className="text-sm text-brand-ivory font-medium">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Actions */}
            <div className="mt-auto pt-2 space-y-3">
              <button
                onClick={handleAddToBag}
                disabled={!inStock}
                className="btn-gold w-full"
              >
                <ShoppingBag strokeWidth={1.25} size={16} />
                {!inStock
                  ? 'Reserved · Enquire to Order'
                  : added
                  ? 'Added to Bag'
                  : 'Add to Bag'}
              </button>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline w-full"
              >
                <MessageCircle strokeWidth={1.25} size={16} />
                Enquire on WhatsApp
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a href="tel:9825247312" className="btn-outline">
                  <Phone strokeWidth={1.25} size={16} />
                  Call
                </a>
                <Link href="/contact" className="btn-outline">
                  <Mail strokeWidth={1.25} size={16} />
                  Email
                </Link>
              </div>
            </div>

            {/* Trust strip */}
            <div className="mt-12 pt-8 border-t border-[rgba(196,166,107,0.12)] grid grid-cols-3 gap-4 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
                <Truck strokeWidth={1} size={20} className="text-brand-gold flex-shrink-0" />
                <p className="text-[11px] tracking-[0.15em] uppercase text-brand-muted leading-snug">
                  Pan-India<br />Dispatch
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
                <Wrench strokeWidth={1} size={20} className="text-brand-gold flex-shrink-0" />
                <p className="text-[11px] tracking-[0.15em] uppercase text-brand-muted leading-snug">
                  On-site<br />Installation
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
                <ShieldCheck strokeWidth={1} size={20} className="text-brand-gold flex-shrink-0" />
                <p className="text-[11px] tracking-[0.15em] uppercase text-brand-muted leading-snug">
                  ISO<br />9001:2008
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
