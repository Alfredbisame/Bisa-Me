// import useSWR from 'swr'; // unused variable
import useSWRInfinite from 'swr/infinite';
import type { Review } from '../types';

interface ApiResponse {
  code: number;
  data: {
    page: number;
    pageSize: number;
    results: Review[];
    totalCount: number;
    totalPages: number;
  };
  message: string;
}

// function formatDate(dateString: string): string { // unused variable
//   const date = new Date(dateString);
//   if (isNaN(date.getTime())) return dateString;
//   const day = date.getDate();
//   const month = date.toLocaleString('default', { month: 'short' });
//   const year = date.getFullYear();
//   return `${day} ${month}, ${year}`;
// }

function ceilToOneDecimal(num: number): number {
  return Math.ceil(num * 10) / 10; 
}

// function capitalizeWords(str: string): string { // unused variable
//   return str.replace(/\b\w+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
// }

import { httpClient, buildListingsUrl, REVIEW_ENDPOINTS } from "@/lib";

const fetcher = async (url: string): Promise<ApiResponse> => {
  const response = await httpClient.get<ApiResponse>(url);
  return response;
};

// Function to get the key for SWR Infinite
const getKey = (pageIndex: number, previousPageData: ApiResponse | null, userId: string | null) => {
  // Reached the end
  if (previousPageData && previousPageData.data && previousPageData.data.results.length === 0) return null;
  
  // First page, we don't have previousPageData
  if (pageIndex === 0) {
    return userId ? `${buildListingsUrl(REVIEW_ENDPOINTS.listingReviews)}?userId=${userId}&page=1&pageSize=5` : null;
  }
  
  // Add the cursor to the API endpoint
  return userId ? `${buildListingsUrl(REVIEW_ENDPOINTS.listingReviews)}?userId=${userId}&page=${pageIndex + 1}&pageSize=5` : null;
};

export function useProductReviewsData(userId: string | null) {
  const { data, error, isLoading, isValidating, size, setSize, mutate } = useSWRInfinite<ApiResponse>(
    (...args) => getKey(args[0], args[1], userId),
    fetcher,
    {
      dedupingInterval: 2 * 60 * 1000, // 2 minutes
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // Flatten the paginated data
  const flatData = data ? data.flatMap(page => page.data?.results || []) : [];
  
  // Check if there is more data to load
  const isEmpty = data?.[0]?.data?.results?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.data?.results?.length < 5);
  
  // Calculate total count and average rating
  let mapped: { reviews: Review[]; total: number; average_rating: number; totalPages: number } | null = null;
  if (data && data[0] && data[0].code === 200) {
    // Calculate average rating from the reviews
    let totalRating = 0;
    const reviewCount = flatData.length || 0;
    
    // Use the reviews directly from the API response
    const reviews = flatData as Review[];
    
    // Calculate total rating for average
    reviews.forEach((review: Review) => {
      totalRating += review.rating;
    });
      
    const averageRating = reviewCount > 0 ? totalRating / reviewCount : 0;

    mapped = {
      reviews,
      total: data[0].data?.totalCount || 0,
      average_rating: ceilToOneDecimal(averageRating),
      totalPages: data[0].data?.totalPages || 0
    };
  }

  const loadMore = () => {
    setSize(size + 1);
  };

  return {
    data: mapped,
    loading: isLoading,
    isValidating,
    error: error ? error.message : null,
    refetch: mutate,
    loadMore,
    isReachingEnd,
    size
  };
}