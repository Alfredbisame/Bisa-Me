import useSWR from "swr";
import { get } from "@/lib/client";
import { buildListingsUrl, LISTINGS_ENDPOINTS, replacePathParams } from "@/lib/api-endpoints";

const useFetchListingById = (listingId: string) => {
  const fetcher = async () => {
    try {
      const endpoint = replacePathParams(LISTINGS_ENDPOINTS.details, { id: listingId });
      const url = buildListingsUrl(endpoint);
      const data = await get(url);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const apiUrl = listingId ? `listing-${listingId}` : null;
  const { data: listingByIdData, isLoading, error } = useSWR(apiUrl, fetcher);
  return { listingByIdData, isLoading, error };
};

export default useFetchListingById;
