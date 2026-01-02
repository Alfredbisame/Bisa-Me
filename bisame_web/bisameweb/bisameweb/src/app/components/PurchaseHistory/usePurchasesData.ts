import useSWR from 'swr';
import { PurchasesResponse } from './types';

const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) throw new Error('Failed to fetch Purchases data');
  return res.json();
});

export function usePurchasesData() {
  const { data, error, isLoading } = useSWR('/api/Dashboard/Purchases', fetcher, {
    dedupingInterval: 2 * 60 * 60 * 1000, // 2 hours
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  let mapped: PurchasesResponse | null = null;
  if (data) {
    mapped = {
      purchases: data.purchases || data || [], 
    };
  }

  return {
    data: mapped,
    loading: isLoading,
    error: error ? error.message : null,
  };
} 