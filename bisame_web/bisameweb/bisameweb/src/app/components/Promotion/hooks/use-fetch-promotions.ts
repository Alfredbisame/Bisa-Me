"use client";
import useSWR from "swr";
import { get } from "@/lib/client";
import {
  buildListingsUrl,
  PROFILE_ENDPOINTS,
  PROMOTION_ENDPOINTS,
} from "@/lib/api-endpoints";
import { NewPromotionPlanData } from "../interfaces";
import { httpClient, tokenManager } from "@/lib";
import { PaginatedUserPromotions, UserPromotionsResponse } from "../types";
import { AxiosResponse } from "axios";

const useFetchPromotions = () => {
  const fetcher = async (): Promise<PaginatedUserPromotions | null> => {
    try {
      const url = buildListingsUrl(
        `${PROFILE_ENDPOINTS.promotions}?page=1&pageSize=10&sortDir=desc`
      );
      // get token
      const token = tokenManager.getToken();
      const data = await httpClient.get<{
        data: PaginatedUserPromotions;
      }>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(String(error));
      }
      return null;
    }
  };

  const {
    data: promoData,
    error,
    isLoading: isLoadingPromo,
  } = useSWR<PaginatedUserPromotions | null>("promotions", fetcher, {
    refreshWhenOffline: false,
    errorRetryCount: 3,
    revalidateIfStale: false,
  });

  return {
    promoData,
    error,
    isLoadingPromo,
  };
};

export default useFetchPromotions;
