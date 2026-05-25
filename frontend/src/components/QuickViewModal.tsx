// frontend/src/components/QuickViewModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { X, MessageCircle, Phone, ArrowUpRight } from 'lucide-react';
import { productApi } from '@/services/api';

interface QuickViewModalProps {
  productId: number;
  onClose: () => void;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image_url: string;
  description?: string;
  stock_quantity: number;
  specifications?: string;
}

const WHATSAPP_NUMBER = '919825247312';

export default function QuickViewModal({ productId, onClose }: QuickViewModalProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const data = await productApi.getById(productId);
        if (alive) setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [productId]);

  // Lock body scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  let specifications: Record<string, string> = {};
  if (product?.specifications) {
    try {
      specifications = JSON.parse(product.specifications);
    } catch {
      specifications = {};
    }
  }

  const whatsappHref = product
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        `Hello, I am enquiring about ${product.name}. Could you share availability and pricing?`
      )}`
    : '#';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md z-[60] flex items-center justify-center p-4 sm:p-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="bg-brand-canvas border border-[rgba(196,166,107,0.2)] max-w-5xl w-full max-h-[92vh] overflow-y-auto relative"
          style={{ borderRadius: 2 }}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center border border-[rgba(196,166,107,0.25)] text-brand-ivory/80 hover:border-brand-gold hover:text-brand-gold transition-colors bg-brand-canvas/80"
            style={{ borderRadius: 2 }}
          >
            <X strokeWidth={1} size={18} />
          </button>

          {loading ? (
            <div className="flex items-center justify-center py-32">
              <div className="w-10 h-10 border border-brand-gold/30 border-t-brand-gold rounded-full animate-spin" />
            </div>
          ) : product ? (
            <div className="grid md:grid-cols-2">

              {/* Image */}
              <div className="relative aspect-square bg-[#0F0D0B] border-b md:border-b-0 md:border-r border-[rgba(196,166,107,0.15)]">
                <Image
                  src={product.image_url || '/images/placeholder.jpg'}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-10"
                />

                {product.stock_quantity === 0 && (
                  <div
                    className="absolute top-5 left-5 px-3 py-1.5 border border-[rgba(196,166,107,0.4)] text-[10px] tracking-[0.25em] uppercase text-brand-muted bg-brand-canvas/80"
                    style={{ borderRadius: 2 }}
                  >
                    Reserved
                  </div>
                )}
                {product.stock_quantity > 0 && product.stock_quantity < 5 && (
                  <div
                    className="absolute top-5 left-5 px-3 py-1.5 border border-brand-gold/60 text-[10px] tracking-[0.25em] uppercase text-brand-gold bg-brand-canvas/80"
                    style={{ borderRadius: 2 }}
                  >
                    Last {product.stock_quantity}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-8 sm:p-10 flex flex-col">
                <span className="eyebrow text-brand-muted mb-4">
                  {product.category.replace(/_/g, ' ')}
                </span>

                <h2 className="font-display text-3xl sm:text-[2.4rem] leading-[1.1] text-brand-ivory mb-6">
                  {product.name}
                </h2>

                <div className="font-display text-4xl text-brand-gold mb-8">
                  ₹{product.price.toLocaleString('en-IN')}
                </div>

                {product.description && (
                  <p className="text-sm text-brand-muted leading-relaxed mb-8 line-clamp-4">
                    {product.description}
                  </p>
                )}

                {Object.keys(specifications).length > 0 && (
                  <div className="mb-8">
                    <p className="eyebrow text-brand-muted mb-4">Specifications</p>
                    <dl className="space-y-3">
                      {Object.entries(specifications).slice(0, 4).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between gap-4 py-2.5 border-b border-[rgba(196,166,107,0.12)] text-sm"
                        >
                          <dt className="text-brand-muted capitalize">
                            {key.replace(/_/g, ' ')}
                          </dt>
                          <dd className="text-brand-ivory font-medium text-right">
                            {String(value)}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                <div className="mt-auto pt-4 flex flex-col gap-3">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold w-full"
                  >
                    <MessageCircle strokeWidth={1.25} size={16} />
                    Enquire on WhatsApp
                  </a>
                  <div className="grid grid-cols-2 gap-3">
                    <a href="tel:9825247312" className="btn-outline">
                      <Phone strokeWidth={1.25} size={16} />
                      Call
                    </a>
                    <Link href={`/products/${product.id}`} className="btn-outline" onClick={onClose}>
                      Full Detail
                      <ArrowUpRight strokeWidth={1.25} size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-16 text-center">
              <p className="text-brand-muted text-sm tracking-[0.15em] uppercase">
                This piece could not be loaded.
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
