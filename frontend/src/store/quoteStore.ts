// frontend/src/store/quoteStore.ts

/**
 * The quote list — the items a customer wants pricing on.
 *
 * OM Marketing sells B2B: buyers ask for a quotation rather than paying
 * online, so this behaves like a cart but ends in a quote request, not
 * a checkout.
 */

import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface QuoteItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
  category: string;
}

interface QuoteStore {
  items: QuoteItem[];
  addItem: (item: Omit<QuoteItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clear: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          const add = item.quantity ?? 1;

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + add } : i,
              ),
            };
          }

          return { items: [...state.items, { ...item, quantity: add }] };
        }),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((i) => i.id !== id) };
          }
          return {
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity: Math.min(quantity, 999) } : i,
            ),
          };
        }),

      clear: () => set({ items: [] }),

      getTotalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'om-quote-storage' },
  ),
);

/**
 * Reading persisted state during the first render causes a hydration mismatch:
 * the server renders 0 items, the browser knows better. This hook returns the
 * server-safe value until hydration finishes, then the real one.
 */
export function useHydratedQuote<T>(selector: (state: QuoteStore) => T, fallback: T): T {
  const value = useQuoteStore(selector);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  return hydrated ? value : fallback;
}
