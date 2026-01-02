"use client";
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import type { Product } from '../../ProductDetails/hooks/useSellerData';

import { httpClient, buildListingsUrl, LISTINGS_ENDPOINTS } from '@/lib';

// Fetcher function using the new API client
const fetcher = async (url: string) => {
  const response = await httpClient.get<Product[]>(url);
  return response;
};

export const useSellerProducts = (sellerId?: string) => {
  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);

  // Fetch all products from listings API endpoint
  const { data: allProducts, error: productsError, isLoading } = useSWR(
    buildListingsUrl(LISTINGS_ENDPOINTS.list),
    fetcher,
    {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    dedupingInterval: 3600000, // 1 hour
    refreshInterval: 0,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    shouldRetryOnError: true,
    errorRetryCount: 3
  });

  useEffect(() => {
    if (sellerId && allProducts && Array.isArray(allProducts)) {
      // Filter products by seller ID (userid)
      const sellerAds = allProducts.filter((product: Product) => product.userid === sellerId);
      setSellerProducts(sellerAds);
    } else {
      setSellerProducts([]);
    }
  }, [sellerId, allProducts]);

  // Convert to the format expected by SellerAdsGrid
  const convertToGridFormat = (products: Product[]) => {
    return products.map(product => ({
      id: product._id.$oid,
      title: product.title,
      description: product.description,
      price: product.price,
      location: product.location,
      image: product.image,
      category: product.category,
      subcategory: product.subcategory,
      childcategory: product.childcategory,
      phone: product.phone,
      userid: product.userid,
      status: product.status,
      postdate: product.postdate,
      info: product.info,
      // Add any other fields needed by SellerAdsGrid
    }));
  };

  return {
    products: convertToGridFormat(sellerProducts),
    rawProducts: sellerProducts,
    isLoading,
    hasError: !!productsError,
    error: productsError,
    hasProducts: sellerProducts.length > 0,
    activeProducts: sellerProducts.filter(product => product.status === 'Active'),
    totalCount: sellerProducts.length,
    activeCount: sellerProducts.filter(product => product.status === 'Active').length,
  };
};
