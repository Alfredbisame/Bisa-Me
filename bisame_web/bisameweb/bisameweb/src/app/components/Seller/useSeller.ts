import useSWR from 'swr';
import { getImageUrl } from '@/app/components/ProductDetails/utils/imageUtils';
import { SellerInfoResponse } from './types';
import { authHttpClient, buildListingsUrl, PROFILE_ENDPOINTS } from '@/lib';

const fetcher = async (url: string): Promise<SellerInfoResponse> => {
  const response = await authHttpClient.get<SellerInfoResponse | { data: SellerInfoResponse; code: number }>(url);
  
  // Handle wrapped response structure (if API returns { data: {...}, code: 200 })
  if (response && typeof response === 'object' && 'data' in response && 'code' in response) {
    return (response as { data: SellerInfoResponse; code: number }).data;
  }
  
  return response as SellerInfoResponse;
};

export function useSeller(productId?: string) {
  // Try to get productId from localStorage if not provided
  let id = productId;
  if (typeof window !== 'undefined' && !id) {
    id = localStorage.getItem('selectedProductId') || undefined;
  }
  
  // Note: SellerInfo endpoint is not in the standard endpoints file
  // Using profile listings as a fallback - may need to be updated based on actual API structure
  // If you have a specific seller info endpoint, add it to api-endpoints.ts
  const baseUrl = buildListingsUrl(PROFILE_ENDPOINTS.listings);
  const endpoint = id ? `${baseUrl}?productId=${id}` : baseUrl;
  
  const { data, error, isLoading } = useSWR<SellerInfoResponse>(
    endpoint,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      shouldRetryOnError: true,
      errorRetryCount: 3,
    }
  );

  // Process images only if data is available
  const processedData = data
    ? {
        ...data,
        profile: getImageUrl(data.profile || ''),
        data: Array.isArray(data.data) 
          ? data.data.map((ad) => ({
              ...ad,
              image: Array.isArray(ad.image) 
                ? ad.image.map(img => ({
                    ...img,
                    image_link: getImageUrl(img.image_link),
                  }))
                : [],
              addimage: Array.isArray(ad.addimage)
                ? ad.addimage.map(img => ({
                    ...img,
                    image_link: getImageUrl(img.image_link),
                  }))
                : [],
              info: {
                ...ad.info,
                image: getImageUrl(ad.info?.image || ''),
              },
            }))
          : [],
      }
    : null;

  return {
    data: processedData,
    loading: isLoading,
    error: error ? error.message : null,
  };
} 