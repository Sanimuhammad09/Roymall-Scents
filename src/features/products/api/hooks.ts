import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';

export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
  order: number;
  isMain: boolean;
}

export interface ProductVariant {
  id: string;
  sku: string;
  color: string;
  colorHex?: string;
  size: string;
  priceOffset: number;
  inventory: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  fabricDetails?: string;
  careInstructions?: string;
  basePrice: number;
  isFeatured: boolean;
  isActive: boolean;
  categoryId: string;
  category: { name: string; slug: string };
  collection?: { name: string; slug: string };
  images: ProductImage[];
  variants: ProductVariant[];
  reviews?: any[];
  _count?: { reviews: number };
  createdAt: string;
}

export interface ProductFilters {
  category?: string;
  collection?: string;
  color?: string;
  size?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.set(key, String(value));
        }
      });
      const { data } = await api.get<PaginatedResponse<Product>>(
        `/products?${params.toString()}`
      );
      return data;
    },
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const { data } = await api.get<{ data: Product }>(`/products/${slug}`);
      return data.data;
    },
    enabled: !!slug,
  });
}

export function useFeaturedProducts(limit = 8) {
  return useQuery({
    queryKey: ['products', 'featured', limit],
    queryFn: async () => {
      const { data } = await api.get<{ data: Product[] }>(
        `/products/featured?limit=${limit}`
      );
      return data.data;
    },
  });
}

export function useRelatedProducts(productId: string, limit = 4) {
  return useQuery({
    queryKey: ['products', 'related', productId, limit],
    queryFn: async () => {
      const { data } = await api.get<{ data: Product[] }>(
        `/products/${productId}/related?limit=${limit}`
      );
      return data.data;
    },
    enabled: !!productId,
  });
}
