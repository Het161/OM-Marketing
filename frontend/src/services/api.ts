// frontend/src/services/api.ts

/**
 * API Service for communicating with the backend
 * This is like making HTTP requests from your FastAPI frontend!
 * All backend communication goes through this file.
 */

import axios from 'axios';

import catalogue from '@/data/products.json';

// Base URL for your API (change this for production!)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Static snapshot of the catalogue, bundled at build time.
 *
 * The live site must never show an empty shop. If the backend is asleep,
 * unreachable or not deployed yet, product browsing falls back to this so
 * customers still see the range and can enquire by WhatsApp or phone.
 * Regenerate it whenever products change (see README).
 */
const FALLBACK_PRODUCTS = catalogue as Array<{
  id: number;
  name: string;
  category: string;
  description: string | null;
  price: number;
  stock_quantity: number;
  image_url: string | null;
  specifications: string | null;
}>;

function logFallback(context: string, error: unknown) {
  console.warn(
    `[api] ${context} failed — serving the bundled catalogue snapshot instead.`,
    error,
  );
}

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor (runs before every request)
api.interceptors.request.use(
  (config) => {
    // Attach the auth token when one exists. Guarded because this module can
    // be imported during server rendering, where `localStorage` does not exist.
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor (runs after every response)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // An expired token should just be dropped. We deliberately do NOT redirect:
    // the public pages (products, contact, quote) work fine signed-out, and a
    // hard redirect would throw a customer out of a half-filled form.
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      window.localStorage.removeItem('auth_token');
    }
    return Promise.reject(error);
  }
);

// ============ PRODUCT API METHODS ============

export const productApi = {
  /**
   * Get all products with optional filtering
   * Example: productApi.getAll({ category: 'weighing_scale', limit: 20 })
   */
  getAll: async (params?: {
    skip?: number;
    limit?: number;
    category?: string;
  }) => {
    try {
      const response = await api.get('/api/products/', { params });
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
      throw new Error('empty catalogue response');
    } catch (error) {
      logFallback('products.getAll', error);
      let items = FALLBACK_PRODUCTS;
      if (params?.category) {
        items = items.filter((p) => p.category === params.category);
      }
      const skip = params?.skip ?? 0;
      return items.slice(skip, skip + (params?.limit ?? items.length));
    }
  },

  /**
   * Get a single product by ID
   * Example: productApi.getById(5)
   */
  getById: async (id: number) => {
    try {
      const response = await api.get(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      const match = FALLBACK_PRODUCTS.find((p) => p.id === id);
      if (!match) throw error; // genuinely unknown product — let the page 404
      logFallback(`products.getById(${id})`, error);
      return match;
    }
  },

  /**
   * Search products by name or description
   * Example: productApi.search('digital scale')
   */
  search: async (query: string) => {
    try {
      const response = await api.get('/api/products/search/', {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      logFallback('products.search', error);
      const needle = query.trim().toLowerCase();
      return FALLBACK_PRODUCTS.filter((p) =>
        `${p.name} ${p.description ?? ''}`.toLowerCase().includes(needle),
      );
    }
  },
  
  /**
   * Create a new product (admin only)
   */
  create: async (productData: any) => {
    const response = await api.post('/api/products/', productData);
    return response.data;
  },
  
  /**
   * Update an existing product (admin only)
   */
  update: async (id: number, productData: any) => {
    const response = await api.put(`/api/products/${id}`, productData);
    return response.data;
  },
  
  /**
   * Delete a product (admin only)
   */
  delete: async (id: number) => {
    const response = await api.delete(`/api/products/${id}`);
    return response.data;
  },
};

// ============ ORDER API METHODS ============

export const orderApi = {
  /**
   * Create a new order
   */
  create: async (orderData: {
    items: Array<{ product_id: number; quantity: number }>;
    shipping_address: string;
  }) => {
    const response = await api.post('/api/orders/', orderData);
    return response.data;
  },
  
  /**
   * Get user's orders
   */
  getMyOrders: async () => {
    const response = await api.get('/api/orders/my-orders');
    return response.data;
  },
  
  /**
   * Get a specific order by ID
   */
  getById: async (id: number) => {
    const response = await api.get(`/api/orders/${id}`);
    return response.data;
  },
};

// ============ AUTH API METHODS ============

export const authApi = {
  /**
   * User registration
   */
  register: async (userData: {
    email: string;
    username: string;
    password: string;
    full_name?: string;
    phone_number?: string;
  }) => {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  },
  
  /**
   * User login
   */
  login: async (credentials: {
    username: string;
    password: string;
  }) => {
    const response = await api.post('/api/auth/login', credentials);
    // Store token in localStorage
    if (response.data.access_token) {
      localStorage.setItem('auth_token', response.data.access_token);
    }
    return response.data;
  },
  
  /**
   * User logout
   */
  logout: () => {
    localStorage.removeItem('auth_token');
  },
  
  /**
   * Get current user info
   */
  getCurrentUser: async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },
};

export default api;
