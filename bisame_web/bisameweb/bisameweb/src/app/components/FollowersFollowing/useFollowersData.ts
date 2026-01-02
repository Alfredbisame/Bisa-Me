import useSWR from "swr";
import { FollowingResponse, FollowingApiResponse } from "./types";
import { get, buildListingsUrl, FOLLOW_ENDPOINTS, tokenManager } from "@/lib";

const fetcher = async (url: string): Promise<FollowingResponse> => {
  const token = tokenManager.getToken();
  if (!token) {
    throw new Error("Authentication required");
  }

  const response = await get<FollowingApiResponse>(
    url,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return {
    success: true,
    data: response,
  };
};

export function useFollowersData(page: number = 1, pageSize: number = 10) {
  const baseUrl = buildListingsUrl(FOLLOW_ENDPOINTS.followers);
  const apiUrl = `${baseUrl}?page=${page}&pageSize=${pageSize}`;
  
  const { data, error, isLoading, mutate } = useSWR(
    apiUrl,
    fetcher,
    {
      dedupingInterval: 2 * 60 * 60 * 1000, // 2 hours
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data: data as FollowingResponse | null,
    loading: isLoading,
    error: error ? error.message : null,
    mutate,
  };
}
