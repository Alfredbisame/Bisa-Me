import { useState, useCallback } from 'react';
import useSWR from 'swr';

interface ApiResponse {
  data: {
    results: Array<{
      _id?: string;
      id?: string;
      title?: string;
      description?: string;
      category?: string;
      subCategory?: string;
      childCategory?: string;
      price?: number;
      contactNumber?: string;
      totalViews?: number;
      location?: string;
      userId?: string;
      isPromoted?: boolean;
      images?: Array<{ imageUrl: string; id: string }>;
      userInfo?: { name: string; profilePicture: string };
      status?: string;
      negotiable?: boolean;
      attributes?: { [key: string]: unknown };
      createdAt?: string;
      updatedAt?: string;
    }>;
    totalCount?: number;
    totalPages?: number;
    page?: number;
    pageSize?: number;
  };
}

import { httpClient, buildListingsUrl, LISTINGS_ENDPOINTS } from '@/lib';

const fetcher = async (url: string): Promise<ApiResponse> => {
  const response = await httpClient.get<ApiResponse>(url);
  return response;
};

export const useRelatedProducts = (category?: string, subCategory?: string, childCategory?: string, page: number = 1, pageSize: number = 12) => {
  const [retryCount, setRetryCount] = useState(0);

  const shouldFetch = !!category;

  // Build URL with query parameters
  const buildUrl = () => {
    if (!shouldFetch) return null;
    const baseUrl = buildListingsUrl(LISTINGS_ENDPOINTS.list);
    const params = new URLSearchParams({
      category: category!,
      page: String(page),
      pageSize: String(pageSize),
    });
    if (subCategory) params.append('subCategory', subCategory);
    if (childCategory) params.append('childCategory', childCategory);
    return `${baseUrl}?${params.toString()}`;
  };

  const { data, error, isLoading, mutate, isValidating } = useSWR<ApiResponse>(
    buildUrl,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      dedupingInterval: 3600000,
      refreshInterval: 0,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      shouldRetryOnError: true,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Don't retry on 404
        if (error?.status === 404) return;

        // Don't retry if we've exceeded max retries
        if (retryCount >= 3) return;

        // Exponential backoff
        const timeout = Math.min(1000 * Math.pow(2, retryCount), 30000);
        setTimeout(() => revalidate({ retryCount }), timeout);
      },
    }
  );

  const retry = useCallback(async () => {
    setRetryCount(prev => prev + 1);
    return mutate();
  }, [mutate]);

  const isRetrying = isValidating && !isLoading;

  // Extract products from the API response structure
  const products = data?.data?.results || [];

  // Transform products to match the expected format
  const transformedProducts = products.map((item) => ({
    _id: item._id || item.id || '',
    id: item.id || item._id || '',
    title: item.title || '',
    description: item.description || '',
    category: item.category || '',
    subCategory: item.subCategory || '',
    childCategory: item.childCategory || '',
    price: item.price || 0,
    contactNumber: item.contactNumber || '',
    totalViews: item.totalViews || 0,
    location: item.location || '',
    userId: item.userId || '',
    isPromoted: item.isPromoted || false,
    images: item.images || [],
    userInfo: item.userInfo || { name: '', profilePicture: '' },
    status: item.status || '',
    negotiable: item.negotiable || false,
    attributes: item.attributes || {},
    createdAt: item.createdAt || '',
    updatedAt: item.updatedAt || '',
  }));

  return {
    products: transformedProducts,
    isLoading: isLoading || (retryCount === 0 && isValidating),
    isRetrying,
    error,
    retry,
    retryCount,
    totalCount: data?.data?.totalCount || 0,
    totalPages: data?.data?.totalPages || 0,
    currentPage: data?.data?.page || page,
    pageSize: data?.data?.pageSize || pageSize,
  };
};