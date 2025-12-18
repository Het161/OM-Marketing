
// frontend/src/services/api.ts

/**
 * API Service for communicating with the backend
 * Enhanced with retry logic for Render cold starts
 */

import axios, { AxiosError } from 'axios';

// Base URL for your API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://om-marketing.onrender.com';

// ✅ Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000; // Initial delay, increases exponentially

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // ✅ Increased to 30 seconds for cold starts
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Retry logic helper function
async function axiosRetry<T>(
  requestFn: () => Promise<T>,
  retries: number = MAX_RETRIES
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let i = 0; i < retries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error as Error;
      
      // Only retry on network errors or 5xx errors
      const axiosError = error as AxiosError;
      const shouldRetry = 
        !axiosError.response || 
        (axiosError.response.status >= 500 && axiosError.response.status < 600);
      
      if (!shouldRetry || i === retries - 1) {
        throw error;
      }
      
      // Exponential backoff
      const waitTime = Math.min(RETRY_DELAY_MS * Math.pow(2, i), 10000);
      console.log(`Retry ${i + 1}/${retries} after ${waitTime}ms...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
  
  throw lastError || new Error('Failed to fetch after retries');
}

// Add request interceptor (runs before every request)
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor (runs after every response)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ============ PRODUCT API METHODS ============

export const productApi = {
  /**
   * Get all products with optional filtering (with retry logic)
   * Example: productApi.getAll({ category: 'weighing_scale', limit: 20 })
   */
  getAll: async (params?: {
    skip?: number;
    limit?: number;
    category?: string;
  }) => {
    return axiosRetry(async () => {
      const response = await api.get('/api/products/', { params });
      return response.data;
    });
  },
  
  /**
   * Get a single product by ID (with retry logic)
   * Example: productApi.getById(5)
   */
  getById: async (id: number) => {
    return axiosRetry(async () => {
      const response = await api.get(`/api/products/${id}`);
      return response.data;
    });
  },
  
  /**
   * Search products by name or description
   * Example: productApi.search('digital scale')
   */
  search: async (query: string) => {
    return axiosRetry(async () => {
      const response = await api.get('/api/products/search/', {
        params: { q: query },
      });
      return response.data;
    });
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
    return axiosRetry(async () => {
      const response = await api.get('/api/orders/my-orders');
      return response.data;
    });
  },
  
  /**
   * Get a specific order by ID
   */
  getById: async (id: number) => {
    return axiosRetry(async () => {
      const response = await api.get(`/api/orders/${id}`);
      return response.data;
    });
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
    if (response.data.access_token && typeof window !== 'undefined') {
      localStorage.setItem('auth_token', response.data.access_token);
    }
    return response.data;
  },
  
  /**
   * User logout
   */
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  },
  
  /**
   * Get current user info
   */
  getCurrentUser: async () => {
    return axiosRetry(async () => {
      const response = await api.get('/api/auth/me');
      return response.data;
    });
  },
};

export default api;
