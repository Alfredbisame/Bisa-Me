import useSWR from "swr";
import { Promotion } from "../types";
import { authHttpClient, buildListingsUrl, PROFILE_ENDPOINTS } from "@/lib";

export type categoryGroupType = "Buy and Sell" | "Services";

interface ImageProps {
  id: string;
  imageUrl: string;
}

interface PromotionResponse {
  code?: number;
  results?: Promotion[];
  data?: {
    results: Promotion[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

const fetcher = async (url: string): Promise<Promotion[]> => {
  const response = await authHttpClient.get<PromotionResponse | Promotion[]>(url);
  
  // Handle different response structures
  // Case 1: Response is directly an array
  if (Array.isArray(response)) {
    return response;
  }
  
  // Case 2: Response has results at top level
  if (response && typeof response === 'object' && 'results' in response && Array.isArray(response.results)) {
    return response.results;
  }
  
  // Case 3: Response has nested data.results
  if (response && typeof response === 'object' && 'data' in response) {
    const data = (response as PromotionResponse).data;
    if (data?.results && Array.isArray(data.results)) {
      return data.results;
    }
  }
  
  return [];
};

const useProfilePromotion = () => {
  const apiUrl = buildListingsUrl(PROFILE_ENDPOINTS.promotions);

  const { data, error, isLoading, mutate } = useSWR<Promotion[]>(
    apiUrl,
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export default useProfilePromotion;
