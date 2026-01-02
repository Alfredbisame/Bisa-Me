import useSWR from "swr";
import { useMemo } from "react";
import { MyPostResponse, Product } from "./types";
import { authHttpClient, buildListingsUrl, PROFILE_ENDPOINTS } from "@/lib";

// ============================================
// Optimized mapper with proper null checks
// ============================================
function mapToProduct(item: Product): Product {
  return {
    _id: item._id,
    id: item.id || item._id || "",
    name: item.title || item.name || "",
    title: item.title,
    images: item.images,
    description: item.description || "",
    location: item.location || "",
    price: item.price?.toString() || item.price || "",
    status: item.status,
    message: item.message,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

// ============================================
// Optimized fetcher with error handling
// ============================================
const fetcher = async (url: string): Promise<MyPostResponse> => {
  try {
    const response = await authHttpClient.get<MyPostResponse>(url);
    return response;
  } catch (error) {
    // Enhanced error handling
    if (error instanceof Error) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }
    throw new Error("Failed to fetch posts");
  }
};

// ============================================
// Hook options interface
// ============================================
interface UseMyPostDataOptions {
  page?: number;
  pageSize?: number;
  status?: string;
  revalidateOnFocus?: boolean;
  revalidateOnReconnect?: boolean;
  refreshInterval?: number;
}

// ============================================
// Main Hook
// ============================================
export function useMyPostData(
  statusOrOptions?: string | UseMyPostDataOptions,
  optionsOnly?: UseMyPostDataOptions
) {
  // Handle both old signature (status) and new signature (options)
  const options: UseMyPostDataOptions = useMemo(() => {
    if (typeof statusOrOptions === "string") {
      return { status: statusOrOptions, ...optionsOnly };
    }
    return statusOrOptions || {};
  }, [statusOrOptions, optionsOnly]);

  const {
    page = 1,
    pageSize = 12,
    status,
    revalidateOnFocus = false,
    revalidateOnReconnect = false,
    refreshInterval,
  } = options;

  // Memoize URL construction
  const apiUrl = useMemo(() => {
    const baseUrl = buildListingsUrl(PROFILE_ENDPOINTS.listings);
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("pageSize", pageSize.toString());
    if (status) {
      params.append("status", status);
    }
    return `${baseUrl}?${params.toString()}`;
  }, [page, pageSize, status]);

  // SWR configuration
  const { data, error, isLoading, mutate, isValidating } =
    useSWR<MyPostResponse>(apiUrl, fetcher, {
      dedupingInterval: 5 * 60 * 1000, // 5 minutes (reduced from 2 hours for better UX)
      revalidateIfStale: false,
      revalidateOnFocus,
      revalidateOnReconnect,
      refreshInterval,
      keepPreviousData: true, // Keep previous data while fetching new data
      shouldRetryOnError: true,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
    });

  // Memoize mapped data to prevent unnecessary recalculations
  const mappedData = useMemo(() => {
    if (!data?.data?.results) {
      return null;
    }

    return {
      results: data.data.results.map(mapToProduct),
      totalCount: data.data.totalCount,
      totalPages: data.data.totalPages,
      page: data.data.page,
      pageSize: data.data.pageSize,
    };
  }, [data]);

  return {
    data: mappedData,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    mutate, // Expose mutate for manual revalidation
    isValidating, // Expose validation state
    refresh: () => mutate(), // Convenience method for refresh
  };
}

// ============================================
// Enhanced hook with pagination support
// ============================================
export function useMyPostDataPaginated(
  status?: string,
  initialPage: number = 1,
  initialPageSize: number = 12
) {
  const { data, loading, error, mutate, isValidating } = useMyPostData({
    status,
    page: initialPage,
    pageSize: initialPageSize,
  });

  return {
    data,
    loading,
    error,
    mutate,
    isValidating,
    // Pagination helpers
    hasNextPage: data ? data.page < data.totalPages : false,
    hasPreviousPage: data ? data.page > 1 : false,
    totalPages: data?.totalPages || 0,
    currentPage: data?.page || initialPage,
    totalCount: data?.totalCount || 0,
  };
}

// ============================================
// Hook for infinite scroll / load more
// ============================================
export function useMyPostDataInfinite(status?: string, pageSize: number = 12) {
  // This would require useSWRInfinite for true infinite scroll
  // For now, returning a simplified version
  const { data, loading, error, mutate } = useMyPostData({
    status,
    pageSize,
  });

  return {
    data,
    loading,
    error,
    mutate,
    loadMore: () => {
      // Placeholder for load more functionality
      // Implement with useSWRInfinite if needed
      console.warn("Load more functionality requires useSWRInfinite");
    },
  };
}
