"use client";

import useSWR from "swr";

export interface Product {
  _id: string;
  id: string;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  price: number;
  location: string;
  images: Array<{
    imageUrl: string;
    id: string;
  }>;
  userInfo: {
    name: string;
    profilePicture: string;
  };
  attributes: {
    [key: string]: string | number | boolean | null;
  };
  city: string;
  region: string;
  childCategory: string | null;
  contactNumber: string;
  totalViews: number;
  userId: string;
  isPromoted: boolean;
  status: string;
  message: string;
  negotiable: boolean;
  __v: number;
  _textScore: number;
  textScoreNorm: number;
  finalScore: number;
  badge?: {
    text: string;
    color: string;
  };
}

// Define the API response structure based on the sample response
interface ApiResponse {
  code: number;
  data: ProductFromAPI[];
  message: string;
}

// Define the raw product structure from API
interface ProductFromAPI {
  _id: string;
  id: string;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  price: number;
  location: string;
  images: Array<{
    imageUrl: string;
    id: string;
  }>;
  userInfo: {
    name: string;
    profilePicture: string;
  };
  attributes: {
    [key: string]: string | number | boolean | null;
  };
  city: string;
  region: string;
  childCategory: string | null;
  contactNumber: string;
  totalViews: number;
  userId: string;
  isPromoted: boolean;
  status: string;
  message: string;
  negotiable: boolean;
  __v: number;
}

import { httpClient, buildListingsUrl, LISTINGS_ENDPOINTS } from "@/lib";

// Fetcher function using the new API client
const fetcher = async (url: string) => {
  const response = await httpClient.get<ApiResponse>(url);
  return response;
};

// Helper function to create latest badge
const createLatestBadge = () => ({
  badge: {
    text: "NEW ARRIVAL",
    color: "bg-green-500",
  },
});

// Helper function to create base product properties
const createBaseProductProperties = (sourceProduct: ProductFromAPI, textScore: number) => ({
  _id: sourceProduct._id,
  id: sourceProduct.id,
  title: sourceProduct.title,
  description: sourceProduct.description,
  category: sourceProduct.category,
  subCategory: sourceProduct.subCategory,
  price: sourceProduct.price,
  location: sourceProduct.location,
  images: sourceProduct.images.map((img) => ({
    imageUrl: img.imageUrl,
    id: img.id,
  })),
  userInfo: sourceProduct.userInfo,
  attributes: sourceProduct.attributes,
  city: sourceProduct.city || "",
  region: sourceProduct.region || "",
  childCategory: sourceProduct.childCategory,
  contactNumber: sourceProduct.contactNumber,
  totalViews: sourceProduct.totalViews,
  userId: sourceProduct.userId,
  isPromoted: sourceProduct.isPromoted,
  status: sourceProduct.status,
  message: sourceProduct.message,
  negotiable: sourceProduct.negotiable,
  __v: sourceProduct.__v,
  _textScore: textScore,
  textScoreNorm: textScore / 100,
  finalScore: textScore,
});

const convertApiSourceProductToProduct = (sourceProduct: ProductFromAPI): Product => {
  // Calculate scores (using dummy values since they're not in the source)
  const textScore = Math.floor(Math.random() * 100);

  return {
    ...createBaseProductProperties(sourceProduct, textScore),
    // Always add the latest badge for latest listings
    ...createLatestBadge(),
  };
};

export const useLatestListingsData = (
  page: number = 1,
  pageSize: number = 12
) => {
  // Build the URL with query parameters
  const endpoint = LISTINGS_ENDPOINTS.newArrivals;
  const url = `${buildListingsUrl(endpoint)}?page=${page}&pageSize=${pageSize}`;
  
  // Fetch paginated data
  const { data, error, isLoading, mutate } = useSWR(
    url,
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

  // Extract products from the response
  let apiSourceProducts: ProductFromAPI[] = [];

  // Handle different response structures
  if (data) {
    if (data.code === 200 && Array.isArray(data.data)) {
      // API structure with code and data array
      apiSourceProducts = data.data;
    } else if (Array.isArray(data)) {
      // Direct array response
      apiSourceProducts = data;
    }
  }

  // Convert to the format expected by AllProducts
  const products: Product[] = apiSourceProducts.map(
    convertApiSourceProductToProduct
  );

  // Use a default totalPages value since the API response structure doesn't include pagination info
  const totalPages = 10;

  return {
    data: products,
    error,
    isLoading,
    retry: mutate,
    totalPages,
  };
};