import useSWR from "swr";
import { AffiliateResponse, RevenueData, AffiliateEarningItem } from "./types";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import {
  buildProfileUrl,
  EARNING_ENDPOINTS,
  httpClient,
  tokenManager,
} from "@/lib";

const fetcher = async (url: string) => {
  try {
    // Configure api url
    const apiUrl = buildProfileUrl(EARNING_ENDPOINTS.userEarning);

    // Get token
    const token = tokenManager.getToken();

    const response: AxiosResponse = await httpClient.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 404) {
      toast.error(response.data.message);
      return [];
    }

    if (!response.data) {
      toast.error(response.data.message);
      throw new Error("Error occurred fetching earning data");
    }

    toast.success(response.data.message);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export function useAffiliateData() {
  const { data, error, isLoading } = useSWR(
    "user-earnings",
    fetcher,
    {
      dedupingInterval: 2 * 60 * 60 * 1000, // 2 hours
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  console.log(data);
  console.log(data)
  console.log(data)
  console.log(data)
  console.log(data)
  console.log(data)
  console.log(data)
  console.log(data)

  let mapped: AffiliateResponse | null = null;
  let revenueData: RevenueData[] = [];

  if (data) {
    mapped = {
      affiliate: data.affiliate || [],
      earnings: data.earnings || [],
      invitecode: data.invitecode || "",
    };
    // Map earnings to RevenueData[]
    if (Array.isArray(data.earnings)) {
      revenueData = data.earnings.map(
        (item: AffiliateEarningItem, idx: number) => ({
          id: idx + 1,
          affiliateName: item.name || "",
          totalAffiliates: 0,
          direct: parseFloat((item.Direct || "0").replace(",", ".")),
          indirect: parseFloat((item.Indirect || "0").replace(",", ".")),
          total: parseFloat((item.total || "0").replace(",", ".")),
          status: "Pending",
        })
      );
    }
  }

  return {
    data: mapped,
    revenueData,
    loading: isLoading,
    error: error ? error.message : null,
  };
}
