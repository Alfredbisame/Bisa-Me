"use client";

import axios, { AxiosResponse } from "axios";
import useSWRMutation from "swr/mutation";
import { usePromoContext } from "../context/PromotionContext";
import useSWR from "swr";
import {
  API_ENDPOINTS,
  buildProfileUrl,
  httpClient,
  tokenManager,
} from "@/lib";
import toast from "react-hot-toast";

interface PaymentPayload {
  promotions: string[];
}

const usePaymentStatus = (id: string) => {
  console.log(id);
  console.log(id);
  console.log(id);
  console.log(id);
  const paymentStatusFetcher = async (url: string) => {
    if (!id) return;
    // Configure apiUrl
    const apiUrl = buildProfileUrl(
      API_ENDPOINTS.transactions.status.replace("{id}", id)
    );

    // Retrieve token
    const token = tokenManager.getToken();
    const res: AxiosResponse = await httpClient.get(apiUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // For success cases
    if (res.data) {
      toast.success(res.data.message || "Payment initialized success");
      return res.data;
    } else {
      toast.error("Failed to initialize payment");
      throw Error("Error occurred initializing payment");
    }
  };

  const {
    data: paymentStatus,
    isLoading: isLoadingStatus,
    mutate: refresh,
    error: paymentStatusError,
  } = useSWR("payment-status", paymentStatusFetcher);

  return {
    paymentStatus,
    isLoadingStatus,
    paymentStatusError,
    refresh,
  };
};

export default usePaymentStatus;
