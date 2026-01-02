"use client";

import {
  API_ENDPOINTS,
  buildProfileUrl,
  httpClient,
  tokenManager,
} from "@/lib";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";

export interface PaymentPayload {
  promotionId: string;
  paymentMethod: string;
  provider: string;
  bankCode: string | null;
  accountNumber: string;
}

const paymentFetcher = async (
  url: string,
  { arg }: { arg: PaymentPayload }
) => {
  // Setup full api url
  const apiUrl = buildProfileUrl(API_ENDPOINTS.transactions.initiate);

  // Get token
  const token = tokenManager.getToken();
  console.log(apiUrl);
  const res: AxiosResponse = await httpClient.post(apiUrl, arg, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // For success cases
  if (res.data) {
    toast.success(res.data.message || "Payment initialized success");
    return res;
  } else {
    toast.error("Failed to initialize payment");
    throw Error("Error occurred initializing payment");
  }
};

const usePayment = () => {
  const { trigger, data, error, isMutating, reset, } = useSWRMutation(
    "initiate-payment",
    paymentFetcher
  );

  const initiatePayment = async (payload: PaymentPayload) => {
    return trigger(payload);
  };

  return {
    initiatePayment,
    paymentResponse: data,
    isMutating,
    isError: !!error,
    reset,
  };
};

export default usePayment;
