// frontend/src/hooks/useProducts.ts
import useSWR from 'swr';
import { productApi } from '@/services/api';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock_quantity: number;
}

const fetcher = async (url: string, options?: any) => {
  return productApi.getAll(options);
};

export function useProducts(options?: { limit?: number; category?: string }) {
  const key = options ? `products-${JSON.stringify(options)}` : 'products';
  
  const { data, error, isLoading } = useSWR<Product[]>(
    key,
    () => fetcher('products', options),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // 1 minute
      refreshInterval: 300000, // 5 minutes
    }
  );

  return {
    products: data || [],
    isLoading,
    isError: error,
  };
}
