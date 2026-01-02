"use client"
import { useCallback } from "react";
import useSWRMutation from "swr/mutation";
import { toast } from "react-hot-toast";
import { getTime } from "@/app/utils/verify";
import { httpClient, buildAuthUrl, AUTH_ENDPOINTS } from "@/lib";

interface ResendOTPResponse {
  code: number;
  data: {
    user: null;
    token: string;
    phoneNumber: string;
    verificationCodeExpiresAt: string;
  };
  message: string;
}

// Mutation fetcher for SWR
async function resendOTPCode(url: string): Promise<ResendOTPResponse> {
  if (typeof window === "undefined") {
    throw new Error("Resend OTP can only be used in the browser");
  }

  // Get auth token from localStorage
  const authToken = window.localStorage.getItem("authToken");

  console.log("Resend OTP - Auth token exists:", !!authToken);

  if (!authToken) {
    throw new Error("Authentication token not found. Please sign in again.");
  }

  const apiUrl = buildAuthUrl(AUTH_ENDPOINTS.resendOtp);
  console.log("Resend OTP - Making request to:", apiUrl);

  const response = await httpClient.post<ResendOTPResponse>(
    apiUrl,
    {},
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  console.log(response.data);

  return response;
}

interface UseResendOTPOptions {
  onTimerUpdate?: (newTimestamp: number) => void;
}

export const useResendOTP = (options?: UseResendOTPOptions) => {
  // SWR Mutation for resend OTP
  const { trigger: resendTrigger, isMutating: isResending } = useSWRMutation<
    ResendOTPResponse,
    Error
  >(buildAuthUrl(AUTH_ENDPOINTS.resendOtp), resendOTPCode, {
    onSuccess: (data: ResendOTPResponse) => {
      console.log("Resend OTP successful:", data);

      if (data.code === 200) {
        toast.success(data.message || "Verification code resent successfully!");

        // Update token if new one provided
        if (data.data?.token && typeof window !== "undefined") {
          window.localStorage.setItem("authToken", data.data.token);
          console.log("Resend OTP - Token updated in localStorage");
        }

        // Update expiry time in localStorage
        if (
          data.data?.verificationCodeExpiresAt &&
          typeof window !== "undefined"
        ) {
          const newTimestamp = getTime(data.data.verificationCodeExpiresAt);

          window.localStorage.setItem(
            "verificationCodeExpiresAt",
            data.data.verificationCodeExpiresAt
          );
          window.localStorage.setItem(
            "verifyTime",
            JSON.stringify(newTimestamp)
          );

          console.log("New verification expiry timestamp:", newTimestamp);

          // Call the callback to update parent component state
          if (options?.onTimerUpdate) {
            options.onTimerUpdate(newTimestamp);
          }
        }

        console.log(
          "Verification code expires at:",
          data.data.verificationCodeExpiresAt
        );
      } else {
        toast.error(data.message || "Failed to resend code. Please try again.");
      }
    },
    onError: (error: Error) => {
      console.error("Resend OTP failed - Full error:", error);
      console.error("Resend OTP failed - Error type:", typeof error);

      const errorMessage = error.message || "An unexpected error occurred";

      toast.error(`Failed to resend code: ${errorMessage}`);
    },
  });

  // Handle resend OTP
  const handleResendOTP = useCallback(async () => {
    console.log("Resend OTP button clicked");
    try {
      await resendTrigger();
    } catch (error) {
      // Error is handled by SWR onError
      console.error("Resend OTP error in handler:", error);
    }
  }, [resendTrigger]);

  return {
    handleResendOTP,
    isResending,
  };
};
