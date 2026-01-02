"use client";
import useSWRMutation from "swr/mutation";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  API_ENDPOINTS,
  AUTH_ENDPOINTS,
  authHttpClient,
  buildAuthUrl,
  buildListingsUrl,
  FILE_ENDPOINTS,
  httpClient,
  tokenManager,
} from "@/lib";

interface ResetPasswordResponse {
  message: string;
  data: string;
  code: number;
}

async function resetPasswordFetcher(
  url: string,
  { arg }: { arg: { password: string } }
): Promise<ResetPasswordResponse> {
  if (typeof window === "undefined") {
    throw new Error("localStorage is not available on the server");
  }

  // const token = localStorage.getItem("auth-token-new");

  const token = tokenManager.getToken()

  if (!token) {
    throw new Error("Authentication token not found");
  }

  console.log(`Bearer ${token}`);

  const response = await httpClient.post<ResetPasswordResponse>(url, arg, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

export function useResetPassword() {
  const apiUrl = buildAuthUrl(AUTH_ENDPOINTS.resetPassword);
  const router = useRouter();

  const {
    trigger,
    data: resetPasswordData,
    error,
    isMutating: isResetting,
    reset,
  } = useSWRMutation(apiUrl, resetPasswordFetcher, {
    onSuccess: (data: ResetPasswordResponse) => {
      console.log("Password reset successful:", data);

      if (data.code === 200) {
        // Show success message
        toast.success(
          data.message || "Password reset successfully! Redirecting to login..."
        );

        // Clear stored credentials
        if (typeof window !== "undefined") {
          localStorage.removeItem("userId");
          localStorage.removeItem("auth-token-new");
          localStorage.removeItem("authToken");
          localStorage.removeItem("phoneNumber");
          localStorage.removeItem("verificationCodeExpiresAt");
          localStorage.removeItem("verifyTime");
        }

        // Redirect to login page after successful password reset
        setTimeout(() => {
          router.push("/UserAccounts/SignIn");
        }, 2000);
      } else {
        // Handle unsuccessful response
        toast.error(
          data.message || "Failed to reset password. Please try again."
        );
      }
    },
    onError: (err: any) => {
      console.error("Password reset failed:", err);

      // Check for specific error scenarios
      if (err.message === "Authentication token not found") {
        toast.error(
          "Session expired. Please request a new password reset link."
        );

        // Redirect to forgot password page
        setTimeout(() => {
          router.push("/UserAccounts/forgot_password");
        }, 2000);
      } else if (err.status === 401 || err.status === 403) {
        toast.error(
          "Invalid or expired reset token. Please request a new one."
        );

        setTimeout(() => {
          router.push("/UserAccounts/ForgotPassword");
        }, 2000);
      } else if (err.status === 503) {
        toast.error("Service temporarily unavailable. Please try again later.");
      } else {
        const errorMessage =
          err.message || "Failed to reset password. Please try again.";
        toast.error(errorMessage);
      }
    },
  });

  const triggerResetPassword = useCallback(
    async (passwordPayload: { password: string }) => {
      try {
        return await trigger(passwordPayload);
      } catch (error) {
        // Error already handled by onError callback
        console.error("Error in triggerResetPassword:", error);
        throw error;
      }
    },
    [trigger]
  );

  return { triggerResetPassword, resetPasswordData, isResetting };
}
