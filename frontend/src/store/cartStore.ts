// frontend/src/store/cartStore.ts

/**
 * Shopping Cart State Management using Zustand
 * Think of this as a 'global variable' that any component can access!
 * Similar to how you might share data between different parts of your Python app.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the shape of a cart item
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
  category: string;
}

// Define the cart store interface
interface CartStore {
  items: CartItem[];
  
  // Methods (like class methods in Python!)
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  
  // Computed values (like properties)
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

/**
 * Create the cart store
 * This is like creating a global 'cart' object that persists across the app!
 */
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      // Add item to cart (or increase quantity if exists)
      addItem: (item) => set((state) => {
        // Check if item already exists in cart
        const existingItem = state.items.find(i => i.id === item.id);
        
        if (existingItem) {
          // If exists, increase quantity
          return {
            items: state.items.map(i =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          };
        }
        
        // If new item, add it with quantity 1
        return {
          items: [...state.items, { ...item, quantity: 1 }],
        };
      }),
      
      // Remove item completely from cart
      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id),
      })),
      
      // Update quantity of a specific item
      updateQuantity: (id, quantity) => set((state) => {
        if (quantity <= 0) {
          // If quantity is 0 or negative, remove the item
          return {
            items: state.items.filter(item => item.id !== id),
          };
        }
        
        return {
          items: state.items.map(item =>
            item.id === id
              ? { ...item, quantity }
              : item
          ),
        };
      }),
      
      // Clear all items from cart
      clearCart: () => set({ items: [] }),
      
      // Calculate total price
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      // Calculate total number of items
      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage', // LocalStorage key
    }
  )
);
