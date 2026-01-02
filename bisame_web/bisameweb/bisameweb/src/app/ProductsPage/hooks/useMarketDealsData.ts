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

// Define the API response structure
interface ApiResponse {
  code: number;
  data: {
    results: ProductFromAPI[];
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
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

import { httpClient, buildListingsUrl, MISC_ENDPOINTS } from "@/lib";

// Fetcher function using the new API client
const fetcher = async (url: string) => {
  const response = await httpClient.get<ApiResponse>(url);
  return response;
};

// Helper function to create promoted badge
const createPromotedBadge = () => ({
  badge: {
    text: "MARKET DEALS",
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
    ...(sourceProduct.isPromoted && createPromotedBadge()),
  };
};

export const useMarketDealsData = (
  page: number = 1,
  pageSize: number = 12
) => {
  // Build the URL with query parameters
  const endpoint = MISC_ENDPOINTS.homePageSections;
  const sectionTitle = 'Top Marketplace Deals';
  const url = `${buildListingsUrl(endpoint)}?page=${page}&pageSize=${pageSize}&sectionTitle=${encodeURIComponent(sectionTitle)}`;
  
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
    if (data.code === 200 && Array.isArray(data.data.results)) {
      // API structure with code and data.results
      apiSourceProducts = data.data.results;
    } else if (Array.isArray(data)) {
      // Direct array response
      apiSourceProducts = data;
    }
  }

  // Convert to the format expected by AllProducts
  const products: Product[] = apiSourceProducts.map(
    convertApiSourceProductToProduct
  );

  // Get total pages from API response
  const totalPages = data?.data?.totalPages || 10;

  return {
    data: products,
    error,
    isLoading,
    retry: mutate,
    totalPages,
  };
};