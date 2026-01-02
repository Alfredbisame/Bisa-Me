import { fetcher } from "@/app/Messages/utils";
import { useEffect } from "react";
import useSWR from "swr";

type ListingDetailsResponse<T = unknown> = {
  data: T;
  message?: string;
  success?: boolean;
};

interface UseFetchProductByIdReturn<T> {
  newProductData: T | undefined;
  isLoadingProduct: boolean;
  errorProduct: Error | undefined;
  refetch: () => void;
}

const useFetchProductById = <T = unknown>(
  productId: string,
  enabled: boolean = true // Add enabled flag to control fetching
): UseFetchProductByIdReturn<T> => {
  // Only create the API URL if enabled and productId exists
  const apiUrl =
    enabled && productId ? `/api/listing-details?id=${productId}` : null;

  const jsonFetcher = async (
    url: string
  ): Promise<ListingDetailsResponse<T>> => {
    const res = await fetcher(url);

    if (!res) {
      throw new Error("No response from server");
    }

    if (res instanceof Response) {
      const json = (await res.json()) as unknown;
      return json as ListingDetailsResponse<T>;
    }

    return res as unknown as ListingDetailsResponse<T>;
  };

  const {
    data: productData,
    error,
    isLoading: isLoadingProduct,
    mutate: refresh,
  } = useSWR<ListingDetailsResponse<T>>(apiUrl, jsonFetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    if (productId && enabled) {
      void refresh();
    }
  }, [productId, enabled, refresh]);

  const newProductData = productData?.data;

  const refetch = () => {
    if (enabled) {
      void refresh();
    }
  };

  return {
    newProductData,
    isLoadingProduct,
    errorProduct: error,
    refetch,
  };
};

export default useFetchProductById;
