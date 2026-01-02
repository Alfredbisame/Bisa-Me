import useSWR from "swr";
import { authHttpClient, buildListingsUrl, PROFILE_ENDPOINTS } from "@/lib";

export type categoryGroupType = "Buy and Sell" | "Services";

interface ImageProps {
  id: string;
  imageUrl: string;
}

export interface ProfileListings {
  id: string;
  title: string;
  location: string;
  price: number;
  description: string;
  images: ImageProps[];
}

interface ProfileListingsResponse {
  code?: number;
  data: {
    results: ProfileListings[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

const fetcher = async (url: string): Promise<ProfileListings[]> => {
  const response = await authHttpClient.get<ProfileListingsResponse>(url);
  
  // Handle different response structures
  if (response.data?.results && Array.isArray(response.data.results)) {
    return response.data.results;
  }
  
  // Fallback: if response is directly an array
  if (Array.isArray(response)) {
    return response;
  }
  
  return [];
};

const useFetchListings = (categoryGroup: categoryGroupType | undefined) => {
  const buildUrl = () => {
    if (!categoryGroup) return null;
    const baseUrl = buildListingsUrl(PROFILE_ENDPOINTS.listings);
    return `${baseUrl}?categoryGroup=${encodeURIComponent(categoryGroup)}`;
  };

  const apiUrl = buildUrl();

  const { data, error, isLoading, mutate } = useSWR<ProfileListings[]>(
    apiUrl,
    fetcher
  );
  
  return { data, error, isLoading, mutate };
};

export default useFetchListings;
