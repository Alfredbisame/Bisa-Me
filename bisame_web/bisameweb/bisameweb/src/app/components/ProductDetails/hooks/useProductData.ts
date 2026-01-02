"use client";

import useSWR from "swr";
import { httpClient, buildListingsUrl, LISTINGS_ENDPOINTS, replacePathParams } from "@/lib";

export interface Product {
  _id: string;
  id: string;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  childCategory?: string | null;
  price: number | string;
  contactNumber: string;
  totalViews: number;
  location: string;
  userId: string;
  isPromoted: boolean;
  images: Array<{
    imageUrl: string;
    id: string;
    [key: string]: unknown;
  }>;
  userInfo: {
    name: string;
    profilePicture: string;
    [key: string]: unknown;
  };
  status: string;
  negotiable: boolean;
  attributes: {
    [key: string]: unknown;
  };
  isFavorite: boolean;
  totalReviews: number;
  isFollowed: boolean;
  createdAt: string;
  updatedAt: string;
  brand?: string;
  availability?: string;
  rating?: number;
  reviews?: number | unknown[];
  categoryGroup?: string;
  city?: string;
  region?: string;
  [key: string]: unknown;
}

// Fetcher function using the new API client
const fetcher = async (url: string) => {
  const response = await httpClient.get<{ code: number; data: Product }>(url);
  return response.data;
};

export const useProductData = (listingId: string | null) => {
  // Build the URL with path parameters
  const endpoint = listingId ? replacePathParams(LISTINGS_ENDPOINTS.details, { id: listingId }) : null;
  const apiUrl = endpoint ? buildListingsUrl(endpoint) : null;
  
  // Fetch listing details by ID
  const {
    data: product,
    error,
    isLoading,
    mutate,
  } = useSWR(
    apiUrl,
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
    }
  );

  return {
    product,
    isLoading,
    hasError: !!error,
    error,
    mutate,
  };
};
