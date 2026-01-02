"use client";
import { useState, useEffect } from 'react';
import useSWR from 'swr';

// Product interface based on your API response
interface ProductImage {
  image_link: string;
}

interface ProductInfo {
  name: string;
  image: string;
  upgrade: string;
  date: string;
}

export interface Product {
  _id: {
    $oid: string;
  };
  userid: string;
  title: string;
  category: string;
  subcategory: string;
  childcategory: string;
  description: string;
  phone: string;
  price: string;
  promoted: string;
  pageview: string;
  location: string;
  keyFeatures: string;
  image: ProductImage[];
  addimage: unknown[];
  testimonials: unknown[];
  shops: unknown[];
  info: ProductInfo;
  status: string;
  message: string;
  postdate: string;
  pageid: string;
  updatepostdate: string;
  reviews: unknown[];
}

interface SellerStats {
  phoneNumber: string;
  totalAds: number;
  activeAds: number;
  memberSince: string;
  location: string;
  name: string;
  image: string;
  upgrade: string;
}

import { httpClient, buildListingsUrl, LISTINGS_ENDPOINTS } from '@/lib';

// Fetcher function using the new API client
const fetcher = async (url: string) => {
  const response = await httpClient.get<Product[]>(url);
  return response;
};

export const useSellerData = (sellerId?: string) => {
  const [sellerStats, setSellerStats] = useState<SellerStats | null>(null);
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

      if (sellerAds.length > 0) {
        // Get seller info from the first product
        const firstProduct = sellerAds[0];
        
        // Calculate stats
        const activeAds = sellerAds.filter(product => product.status === 'Active');
        
        const stats: SellerStats = {
          totalAds: sellerAds.length,
          activeAds: activeAds.length,
          memberSince: firstProduct.info?.date || '',
          location: firstProduct.location || '',
          phoneNumber: firstProduct.phone,
          name: firstProduct.info?.name || 'Unknown Seller',
          image: firstProduct.info?.image || '',
          upgrade: firstProduct.info?.upgrade || ''
        };
        
        setSellerStats(stats);
        
        // Store seller data in localStorage for the seller page
        localStorage.setItem(`seller_${sellerId}_ads`, JSON.stringify(sellerAds));
        localStorage.setItem(`seller_${sellerId}_info`, JSON.stringify({
          id: sellerId,
          name: firstProduct.info?.name || '',
          image: firstProduct.info?.image || '',
          stats: stats,
          fullData: firstProduct.info // Store complete info object
        }));
      } else {
        // No products found for this seller
        setSellerStats(null);
        setSellerProducts([]);
      }
    }
  }, [sellerId, allProducts]);

  // Get all products by category for the seller
  const getProductsByCategory = (category: string) => {
    return sellerProducts.filter(product => product.category === category);
  };

  // Get all products by status for the seller
  const getProductsByStatus = (status: string) => {
    return sellerProducts.filter(product => product.status === status);
  };

  // Get seller's most recent products
  const getRecentProducts = (limit: number = 5) => {
    return sellerProducts
      .sort((a, b) => new Date(b.postdate).getTime() - new Date(a.postdate).getTime())
      .slice(0, limit);
  };

  // Get seller's categories
  const getSellerCategories = () => {
    const categories = sellerProducts.map(product => product.category);
    return [...new Set(categories)]; // Remove duplicates
  };

  // Get seller's locations (in case they have multiple)
  const getSellerLocations = () => {
    const locations = sellerProducts
      .map(product => product.location)
      .filter(location => location && location.trim() !== '');
    return [...new Set(locations)]; // Remove duplicates
  };

  return {
    // Core data
    sellerStats,
    sellerProducts,
    allProducts, // Return all products in case needed
    
    // Loading and error states
    isLoading,
    hasError: !!productsError,
    error: productsError,
    
    // Utility functions
    getProductsByCategory,
    getProductsByStatus,
    getRecentProducts,
    getSellerCategories,
    getSellerLocations,
    
    // Computed values
    hasSellerData: !!sellerStats && sellerProducts.length > 0,
    activeProducts: sellerProducts.filter(product => product.status === 'Active'),
    inactiveProducts: sellerProducts.filter(product => product.status !== 'Active'),
  };
};
