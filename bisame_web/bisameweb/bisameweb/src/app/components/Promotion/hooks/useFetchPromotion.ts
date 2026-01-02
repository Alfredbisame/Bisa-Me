"use client";
import useSWR from "swr";
import { get } from "@/lib/client";
import { buildListingsUrl, PROMOTION_ENDPOINTS } from "@/lib/api-endpoints";
import { NewPromotionPlanData } from "../interfaces";

const useFetchPromotion = (category: string) => {
  const fetcher = async () => {
    try {
      const url = buildListingsUrl(
        `${PROMOTION_ENDPOINTS.plans}?group=${encodeURIComponent(category)}`
      );
      const data = await get<NewPromotionPlanData>(url);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(String(error));
      }
      return null;
    }
  };

  const { data, error, isLoading } = useSWR<NewPromotionPlanData | null>(
    category ? `promotions-${category}` : null,
    fetcher,
    {
      refreshWhenOffline: false,
      errorRetryCount: 3,
      revalidateIfStale: false,
    }
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useFetchPromotion;
