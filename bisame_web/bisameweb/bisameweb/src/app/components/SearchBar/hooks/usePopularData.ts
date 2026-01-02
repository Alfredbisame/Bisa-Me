import useSWR from "swr";
import { httpClient, buildListingsUrl, SEARCH_ENDPOINTS } from "@/lib";

interface PopularSearchResponse {
  code: number;
  data: string[];
  message?: string;
}

const usePopularData = () => {
  const fetcher = async (url: string): Promise<string[]> => {
    try {
      const response = await httpClient.get<PopularSearchResponse>(url);
      
      if (response.code === 200 && Array.isArray(response.data)) {
        return response.data;
      }
      
      return [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const apiUrl = buildListingsUrl(SEARCH_ENDPOINTS.popular);
  
  const { data } = useSWR(apiUrl, fetcher, {
    revalidateOnFocus: true,
    revalidateOnMount: false,
    revalidateIfStale: false,
    refreshInterval: 0,
    dedupingInterval: Infinity,
  });

  const getData: string[] = data || [];

  return { getData };
};

export default usePopularData;
