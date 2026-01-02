import useSWR from 'swr';
import { httpClient, buildListingsUrl, REGION_ENDPOINTS } from '@/lib';

export interface City {
  name: string;
  ads: number;
}

export interface Region {
  region: string;
  ads: number;
  cities: City[];
}

interface ApiCity {
  city: string;
  totalListings: number;
}

interface RegionData {
  totalListings: number;
  cities: ApiCity[];
  region: string;
}

interface ApiResponse {
  code: number;
  data: RegionData[];
  message: string;
}

interface UseLocationsResult {
  data: Region[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const fetcher = async (url: string): Promise<Region[]> => {
  const response = await httpClient.get<ApiResponse>(url);
  
  // Transform API response to match expected format
  if (response && response.data && Array.isArray(response.data)) {
    return response.data.map(region => ({
      region: region.region,
      ads: region.totalListings,
      cities: region.cities.map(city => ({
        name: city.city,
        ads: city.totalListings
      }))
    }));
  }
  
  // Fallback: if response is already in the correct format
  if (Array.isArray(response)) {
    return response;
  }
  
  return [];
};

// Cache key for consistent caching
const LOCATIONS_CACHE_KEY = buildListingsUrl(REGION_ENDPOINTS.listingsSummary);

// 24 hours in milliseconds
const CACHE_DURATION = 24 * 60 * 60 * 1000;

export function useLocations(): UseLocationsResult {
  const { data, error, isLoading, mutate } = useSWR<Region[]>(LOCATIONS_CACHE_KEY, fetcher, {
    dedupingInterval: CACHE_DURATION, 
    refreshInterval: 0, 
    revalidateOnFocus: false, 
    revalidateOnReconnect: false,
    revalidateIfStale: false, 
    refreshWhenHidden: false, 
    refreshWhenOffline: false, 
    shouldRetryOnError: true, 
    errorRetryCount: 3, 
    errorRetryInterval: 5000, 
    keepPreviousData: true,
    provider: () => new Map(),
  });

  return {
    data: data ?? null,
    loading: isLoading,
    error: error ? (error.message || 'Unknown error') : null,
    refetch: () => { mutate(); },
  };
}