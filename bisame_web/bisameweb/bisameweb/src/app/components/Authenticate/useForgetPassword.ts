/**
 * useForgetPassword Hook - Updated to use new API client
 * Handles forgot password form state and API calls
 */

import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { toast } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { getTime } from "@/app/utils/verify";
import { httpClient, buildAuthUrl, AUTH_ENDPOINTS } from "@/lib";

interface ForgotPasswordResponse {
  code: number;
  data: {
    token: string;
    phoneNumber: string;
    verificationCodeExpiresAt: string;
  };
  message: string;
}

interface ForgotPasswordRequest {
  phoneNumber: string;
  countryShortName: string;
}

// Function to handle forgot password API call
async function forgotPassword(
  url: string,
  { arg }: { arg: ForgotPasswordRequest }
): Promise<ForgotPasswordResponse> {
  const apiUrl = buildAuthUrl(AUTH_ENDPOINTS.forgotPassword);

  return httpClient.post<ForgotPasswordResponse>(apiUrl, {
    phoneNumber: arg.phoneNumber,
    countryShortName: arg.countryShortName,
  });
}

export const useForgetPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const router = useRouter();
  const pathname = usePathname()

  // SWR Mutation for handling forgot password API call
  const { trigger, isMutating } = useSWRMutation(
    buildAuthUrl(AUTH_ENDPOINTS.forgotPassword), // Cache key is the actual API endpoint
    forgotPassword,
    {
      onSuccess: (data: ForgotPasswordResponse) => {
        // Check if the response is successful
        if (data.code === 200 && data.data) {
          // Store token in localStorage if present
          if (data.data.token) {
            if (typeof window !== "undefined") {
              localStorage.setItem("authToken", data.data.token);

              if (data.data.verificationCodeExpiresAt) {
                localStorage.setItem(
                  "verifyTime",
                  JSON.stringify(getTime(data.data.verificationCodeExpiresAt))
                );
                localStorage.setItem(
                  "verificationCodeExpiresAt",
                  data.data.verificationCodeExpiresAt
                );
              }
            }
          }

          // Store phone number in localStorage if present
          if (data.data.phoneNumber) {
            if (typeof window !== "undefined") {
              localStorage.setItem("phoneNumber", data.data.phoneNumber);
              localStorage.setItem("userId", data.data.phoneNumber);
            }
          }

          // Show success message from API response
          toast.success(
            data.message ||
              "Verification code sent successfully! Please check your phone."
          );

          localStorage.setItem("prevNav", pathname);

          // Navigate to verification page
          router.push("/userVerification");
        } else {
          // Handle unsuccessful response
          toast.error(
            data.message ||
              "Failed to send verification code. Please try again."
          );
        }
      },
      onError: (error: any) => {
        console.error("Forgot Password Error:", error);

        const errorMessage = error.message || "An unexpected error occurred.";

        if (!error.status) {
          toast.error(
            "Unable to connect to the server. Please check your internet connection."
          );
        } else {
          toast.error(errorMessage);
        }
      },
    }
  );

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    const formattedPhone = phoneNumber
      .replace(/\s+/g, "")
      .replace(/[+()-]/g, "");

    if (formattedPhone.length < 10) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    await trigger({
      phoneNumber: formattedPhone,
      countryShortName: "GH", // Default to Ghana, can be made configurable later
    });
  };

  return {
    // State
    phoneNumber,
    setPhoneNumber,

    // Actions
    handleSubmit,

    // SWR state
    isMutating,
  };
};
