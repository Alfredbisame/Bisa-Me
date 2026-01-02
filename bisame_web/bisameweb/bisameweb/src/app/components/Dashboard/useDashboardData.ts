import useSWR from "swr";
import { DashboardData } from "@/app/components/Dashboard/types";
import { authHttpClient, buildListingsUrl, PROFILE_ENDPOINTS } from "@/lib";

const fetcher = async (url: string): Promise<DashboardData> => {
  const response = await authHttpClient.get<DashboardData>(url);
  return response;
};

export function useDashboardData() {
  const apiUrl = buildListingsUrl(PROFILE_ENDPOINTS.dashboard);
  
  const { data, error, isLoading, mutate } = useSWR<DashboardData, Error>(
    apiUrl,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      onErrorRetry: (_err, _key, _config, revalidate, { retryCount }) => {
        if (retryCount < 3) {
          setTimeout(() => revalidate({ retryCount }), 1000);
        }
      },
    }
  );

  return {
    data,
    loading: isLoading,
    error,
    mutate,
  };
}
