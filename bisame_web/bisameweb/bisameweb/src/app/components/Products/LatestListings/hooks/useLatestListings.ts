import useSWR from 'swr';
import { Product } from '../types';
import { httpClient, buildListingsUrl, LISTINGS_ENDPOINTS } from '@/lib';

// Fetcher function using the new API client
const fetcher = async (url: string) => {
  const response = await httpClient.get<{ code: number; data: Product[] }>(url);
  
  // Extract the data array from the response
  if (response.code === 200 && Array.isArray(response.data)) {
    return response.data;
  }
  
  throw new Error('Invalid response structure');
};

// Add badge to products
const addBadgesToProducts = (products: Product[]): Product[] => {
  return products.map(product => ({
    ...product,
    badge: {
      text: "NEW ARRIVAL",
      color: "bg-green-500"
    }
  }));
};

export const useLatestListings = (maxProducts: number = 5) => {
  // Build the URL with query parameters
  const endpoint = LISTINGS_ENDPOINTS.newArrivals;
  const page = '1';
  const pageSize = String(maxProducts);
  
  const url = `${buildListingsUrl(endpoint)}?page=${page}&pageSize=${pageSize}`;
  
  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    dedupingInterval: 3600000, 
    refreshInterval: 0, 
    refreshWhenHidden: false,
    refreshWhenOffline: false, 
    shouldRetryOnError: true,
    errorRetryCount: 3
  });
  
  // Slice the data to get only the specified number of products
  const products = data ? data.slice(0, maxProducts) : [];
  
  // Add badges to all products
  const productsWithBadges = addBadgesToProducts(products as Product[]);
  
  return {
    products: productsWithBadges,
    error,
    isLoading
  };
};