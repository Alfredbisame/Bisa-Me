/**
 * useVerificationForm Hook - Updated to use new API client
 * Handles OTP verification form state and API calls
 */

import { useState, useEffect, useCallback } from "react";
import useSWRMutation from "swr/mutation";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { httpClient, buildAuthUrl, AUTH_ENDPOINTS, tokenManager } from "@/lib";
import { useAuth } from "@/app/hooks/useAuth";

interface VerificationRequest {
  verificationCode: string;
  authToken: string;
}

interface VerificationResponse {
  code: number;
  data: {
    token: string;
    user: {
      id: string;
      email: string | null;
      phoneNumber: string;
      countryCode: string;
      countryName: string;
      countryShortName: string;
      profilePicture: string | null;
      referralCode: string;
      userReferralCode: string;
      referralType: string;
      status: string;
      role: string;
      lastName: string;
      firstName: string;
      otherNames: string;
      authenticated: boolean;
      dateOfBirth: string | null;
    };
  };
  message: string;
}

// Function to handle verification API call
async function verifyUser(
  url: string,
  { arg }: { arg: VerificationRequest }
): Promise<VerificationResponse> {
  const apiUrl = buildAuthUrl(AUTH_ENDPOINTS.verifyOtp);

  return httpClient.post<VerificationResponse>(
    apiUrl,
    {
      verificationCode: arg.verificationCode,
    },
    {
      headers: {
        Authorization: `Bearer ${arg.authToken}`,
      },
    }
  );
}

export const useVerificationForm = () => {
  const [verificationCode, setVerificationCode] = useState<string[]>(
    Array(6).fill("")
  );
  const [authToken, setAuthToken] = useState<string>("");
  const [previousPathname, setPreviousPathname] = useState<string | null>(null);

  const router = useRouter();
  const { login } = useAuth();

  // Get authToken + prevNav from localStorage on mount (client only)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedAuthToken = window.localStorage.getItem("authToken");
    if (storedAuthToken) {
      setAuthToken(storedAuthToken);
    }

    const prev = window.localStorage.getItem("prevNav");
    if (prev) {
      setPreviousPathname(prev);
    }
  }, []);

  // SWR Mutation for verification
  const { trigger: verifyTrigger, isMutating: isVerifying } = useSWRMutation(
    buildAuthUrl(AUTH_ENDPOINTS.verifyOtp), // Cache key is the actual API endpoint
    verifyUser,
    {
      onSuccess: (data: VerificationResponse) => {
        console.log("Verification successful:", data);

        // Check if the response is successful
        if (data.code === 200 && data.data) {
          // Use login from AuthContext to store token and user
          if (data.data.token && data.data.user) {
            login(data.data.token, data.data.user);
          }

          // Use the message from the API response
          toast.success(data.message || "Account verified successfully!");

          // Clean up temporary storage
          if (typeof window !== "undefined") {
            localStorage.removeItem("authToken");
            localStorage.removeItem("prevNav");
            localStorage.removeItem("phoneNumber");
            localStorage.removeItem("userId");
            localStorage.removeItem("verificationCodeExpiresAt");
            localStorage.removeItem("verifyTime");
          }

          localStorage.setItem("auth-token", data.data.token ?? "");

          tokenManager.setToken(data.data.token, true);

          // Navigate to previous path or home
          if (previousPathname && previousPathname !== "/userVerification") {
            try {
              // Handle case where prevNav might be stored as JSON string
              const parsedPath = previousPathname.startsWith('"')
                ? JSON.parse(previousPathname)
                : previousPathname;

              // Ensure it's a valid path
              if (
                parsedPath &&
                parsedPath !== "/" &&
                parsedPath.startsWith("/") &&
                parsedPath !== "/UserAccounts/forget_password"
              ) {
                router.push(parsedPath);
              } else if (
                parsedPath &&
                parsedPath == "/UserAccounts/forget_password" &&
                parsedPath.startsWith("/")
              ) {
                router.push("/UserAccounts/Reset_password");
              } else if (
                parsedPath &&
                parsedPath == "/UserAccounts/SignIn" &&
                parsedPath.startsWith("/")
              ) {
                router.push("/");
              } else {
                router.push("/");
              }
            } catch {
              router.push("/");
            }
          } else {
            router.push("/");
          }
        } else {
          toast.error(data.message || "Verification failed. Please try again.");
        }
      },
      onError: (error: any) => {
        console.error("Verification failed:", error.message);
        const errorMessage =
          error.message || "Verification failed. Please try again.";
        toast.error(errorMessage);
      },
    }
  );

  // Handle verification code input changes
  const handleCodeChange = useCallback(
    (index: number, value: string) => {
      if (value.length > 1) return;

      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
    },
    [verificationCode]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!authToken) {
        toast.error("Authentication token not found. Please sign in again.");
        return;
      }

      const code = verificationCode.join("");
      if (code.length !== 6) {
        toast.error("Please enter the complete 6-digit verification code.");
        return;
      }

      try {
        await verifyTrigger({
          verificationCode: code,
          authToken: authToken,
        });
      } catch (error) {
        // Error is handled by SWR onError
        console.error("Verification error:", error);
      }
    },
    [authToken, verificationCode, verifyTrigger]
  );

  // Reset verification code
  const resetCode = useCallback(() => {
    setVerificationCode(Array(6).fill(""));
  }, []);

  return {
    // State
    verificationCode,
    authToken,

    // Actions
    handleCodeChange,
    handleSubmit,
    resetCode,

    // Loading states
    isVerifying,
    isSubmitting: isVerifying,
  };
};
