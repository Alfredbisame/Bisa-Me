import { useEffect } from "react";
import useSWR from "swr";
import { SellerListing } from "../SellerAdsGrid";
import { httpClient, buildListingsUrl, LISTINGS_ENDPOINTS } from "@/lib";

export interface ListingsBySellerData {
  results: SellerListing[];
  totalCount: number;
  totalPages: number;
}

interface ListingsBySellerResponse<T = unknown> {
  data: T;
  message?: string;
  success?: boolean;
  code?: number;
}

const useFetchListingsBySeller = <T = ListingsBySellerData>(
  sellerId: string,
  page: number,
  pageSize = 10
) => {
  // Build URL with query parameters
  const buildUrl = () => {
    if (!sellerId || page <= 0) return null;
    const baseUrl = buildListingsUrl(LISTINGS_ENDPOINTS.list);
    return `${baseUrl}?page=${page}&pageSize=${pageSize}&userId=${sellerId}`;
  };

  const apiUrl = buildUrl();

  const jsonFetcher = async (
    url: string
  ): Promise<ListingsBySellerResponse<T>> => {
    const response = await httpClient.get<ListingsBySellerResponse<T>>(url);
    
    // Handle wrapped response structure
    if (response && typeof response === 'object' && 'data' in response) {
      return response;
    }

    return { data: response as T };
  };

  const {
    data: productData,
    isLoading: isLoadingProduct,
    mutate: refresh,
    error,
  } = useSWR<ListingsBySellerResponse<T>>(apiUrl, jsonFetcher);

  useEffect(() => {
    if (sellerId && page && refresh) {
      void refresh();
    }
  }, [sellerId, page, refresh]);

  const newProductData = productData?.data as T | undefined;

  return { newProductData, isLoadingProduct, error };
};

export default useFetchListingsBySeller;
