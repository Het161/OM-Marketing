// frontend/src/app/cart/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingBag,
  ArrowLeft,
  Trash2,
  Minus,
  Plus,
  MessageCircle,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const E: [number, number, number, number] = [0.16, 1, 0.3, 1];
const WHATSAPP_NUMBER = '919825247312';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Avoid Zustand-persist hydration mismatch
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border border-brand-gold/30 border-t-brand-gold rounded-full animate-spin" />
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  // ── Empty state ──
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: E }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center border border-[rgba(196,166,107,0.3)] text-brand-gold" style={{ borderRadius: 2 }}>
            <ShoppingBag strokeWidth={1} size={28} />
          </div>
          <p className="eyebrow text-brand-muted mb-5">Your Bag</p>
          <h2 className="font-display text-4xl text-brand-ivory mb-4">
            Quietly <em className="italic text-brand-gold font-light">empty.</em>
          </h2>
          <p className="text-sm text-brand-muted leading-relaxed mb-10">
            You haven&apos;t reserved any pieces yet. Browse the collection
            and add something to your bag.
          </p>
          <Link href="/products" className="btn-gold">
            Explore the Collection
          </Link>
        </motion.div>
      </div>
    );
  }

  // ── Filled state ──
  const buildWhatsappMessage = () => {
    const lines = [
      'Hello, I would like to confirm the following order:',
      '',
      ...items.map(
        (i) => `· ${i.name} × ${i.quantity}  —  ₹${(i.price * i.quantity).toLocaleString('en-IN')}`
      ),
      '',
      `Subtotal: ₹${subtotal.toLocaleString('en-IN')}`,
      `GST (18%): ₹${Math.round(gst).toLocaleString('en-IN')}`,
      `Total: ₹${Math.round(total).toLocaleString('en-IN')}`,
    ];
    return encodeURIComponent(lines.join('\n'));
  };

  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-12 sm:py-16">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: E }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14"
        >
          <div>
            <p className="eyebrow text-brand-muted mb-4">Your Bag</p>
            <h1 className="font-display text-[2.4rem] sm:text-[3.2rem] leading-[1.05] text-brand-ivory">
              {items.length} {items.length === 1 ? 'piece' : 'pieces'}
              <br />
              <em className="italic text-brand-gold font-light">awaiting confirmation.</em>
            </h1>
          </div>
          <Link
            href="/products"
            className="link-gold text-[11px] tracking-[0.25em] uppercase text-brand-ivory/80 hover:text-brand-gold inline-flex items-center gap-2 self-start"
          >
            <ArrowLeft strokeWidth={1.25} size={14} />
            Continue browsing
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-16">

          {/* ── Items ── */}
          <div>
            <div className="hairline-h mb-6" />
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.45, ease: E }}
                  className="grid grid-cols-[88px_1fr] sm:grid-cols-[120px_1fr_auto] gap-5 sm:gap-8 py-8 border-b border-[rgba(196,166,107,0.12)]"
                >
                  {/* Thumbnail */}
                  <Link
                    href={`/products/${item.id}`}
                    className="relative aspect-square bg-[#0F0D0B] border border-[rgba(196,166,107,0.15)] overflow-hidden"
                    style={{ borderRadius: 2 }}
                  >
                    <Image
                      src={item.image_url || '/images/placeholder.jpg'}
                      alt={item.name}
                      fill
                      sizes="120px"
                      className="object-contain p-3"
                    />
                  </Link>

                  {/* Info */}
                  <div className="min-w-0 flex flex-col">
                    <p className="label-sm text-brand-muted mb-2">
                      {item.category.replace(/_/g, ' ')}
                    </p>
                    <Link
                      href={`/products/${item.id}`}
                      className="font-display text-xl sm:text-2xl text-brand-ivory leading-tight hover:text-brand-gold transition-colors line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-2 text-xs text-brand-muted">
                      ₹{item.price.toLocaleString('en-IN')} each
                    </p>

                    {/* Mobile actions */}
                    <div className="sm:hidden mt-4 flex items-center justify-between">
                      <QuantityControl
                        value={item.quantity}
                        onMinus={() => updateQuantity(item.id, item.quantity - 1)}
                        onPlus={() => updateQuantity(item.id, item.quantity + 1)}
                      />
                      <button
                        onClick={() => removeItem(item.id)}
                        className="btn-touch flex items-center justify-center text-brand-muted hover:text-brand-gold transition-colors"
                        aria-label="Remove"
                      >
                        <Trash2 strokeWidth={1} size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Desktop actions */}
                  <div className="hidden sm:flex flex-col items-end justify-between min-w-[140px]">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-brand-dim hover:text-brand-gold transition-colors flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase"
                      aria-label="Remove"
                    >
                      <Trash2 strokeWidth={1} size={14} />
                      Remove
                    </button>
                    <QuantityControl
                      value={item.quantity}
                      onMinus={() => updateQuantity(item.id, item.quantity - 1)}
                      onPlus={() => updateQuantity(item.id, item.quantity + 1)}
                    />
                    <p className="font-display text-2xl text-brand-gold">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <button
              onClick={clearCart}
              className="mt-8 text-[10px] tracking-[0.25em] uppercase text-brand-dim hover:text-brand-gold transition-colors"
            >
              Clear the bag
            </button>
          </div>

          {/* ── Summary ── */}
          <aside>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: E }}
              className="surface p-8 sticky top-32"
            >
              <p className="eyebrow text-brand-muted mb-6">Summary</p>

              <dl className="space-y-4 text-sm mb-8">
                <div className="flex justify-between">
                  <dt className="text-brand-muted">Subtotal</dt>
                  <dd className="text-brand-ivory font-medium">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-brand-muted">Dispatch</dt>
                  <dd className="text-brand-gold tracking-[0.15em] uppercase text-xs">
                    Complimentary
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-brand-muted">GST · 18%</dt>
                  <dd className="text-brand-ivory font-medium">
                    ₹{Math.round(gst).toLocaleString('en-IN')}
                  </dd>
                </div>
              </dl>

              <div className="hairline-h mb-6" />

              <div className="flex justify-between items-baseline mb-8">
                <span className="eyebrow text-brand-muted">Total</span>
                <span className="font-display text-3xl text-brand-gold leading-none">
                  ₹{Math.round(total).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="space-y-3">
                <Link href="/checkout" className="btn-gold w-full">
                  <ShoppingBag strokeWidth={1.25} size={16} />
                  Proceed to Checkout
                </Link>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsappMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full"
                >
                  <MessageCircle strokeWidth={1.25} size={16} />
                  Confirm via WhatsApp
                </a>
              </div>

              <ul className="mt-8 pt-6 border-t border-[rgba(196,166,107,0.12)] space-y-2.5">
                {[
                  'Secure payment via your bank',
                  'White-glove installation included',
                  'Lifetime atelier service',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2 text-xs text-brand-muted">
                    <span className="text-brand-gold mt-0.5">·</span>
                    <span className="tracking-[0.05em]">{line}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function QuantityControl({
  value,
  onMinus,
  onPlus,
}: {
  value: number;
  onMinus: () => void;
  onPlus: () => void;
}) {
  return (
    <div
      className="inline-flex items-center border border-[rgba(196,166,107,0.25)]"
      style={{ borderRadius: 2 }}
    >
      <button
        onClick={onMinus}
        aria-label="Decrease quantity"
        className="w-9 h-9 flex items-center justify-center text-brand-ivory/80 hover:text-brand-gold hover:bg-[rgba(196,166,107,0.08)] transition-colors"
      >
        <Minus strokeWidth={1} size={14} />
      </button>
      <span className="w-10 text-center font-mono text-sm text-brand-ivory tabular-nums select-none">
        {value}
      </span>
      <button
        onClick={onPlus}
        aria-label="Increase quantity"
        className="w-9 h-9 flex items-center justify-center text-brand-ivory/80 hover:text-brand-gold hover:bg-[rgba(196,166,107,0.08)] transition-colors"
      >
        <Plus strokeWidth={1} size={14} />
      </button>
    </div>
  );
}
