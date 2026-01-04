/**
 * useSignInForm Hook - Updated to use new API client
 * Handles login form state and API calls using new axios-based client
 */

import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { toast } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { getTime } from "@/app/utils/verify";
import { httpClient, buildAuthUrl, AUTH_ENDPOINTS } from "@/lib";
import { useAuth } from "@/app/hooks/useAuth";

interface LoginRequest {
  phoneNumber: string;
  password: string;
  countryShortName: string;
}

interface LoginResponse {
  code: number;
  data: {
    token: string;
    phoneNumber: string;
    verificationCodeExpiresAt: string;
  };
  message: string;
}

// Function to handle login API call using new httpClient
async function loginUser(
  url: string,
  { arg }: { arg: LoginRequest }
): Promise<LoginResponse> {
  const apiUrl = buildAuthUrl(AUTH_ENDPOINTS.login);

  return httpClient.post<LoginResponse>(apiUrl, {
    phoneNumber: arg.phoneNumber,
    password: arg.password,
    countryShortName: arg.countryShortName,
  });
}

export const useSignInForm = (onLoginSuccess?: () => void) => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { login } = useAuth();

  // SWR Mutation for handling login API call
  const { trigger, isMutating } = useSWRMutation(
    buildAuthUrl(AUTH_ENDPOINTS.login), // Cache key is the actual API endpoint
    loginUser,
    {
      onSuccess: (data: LoginResponse) => {
        // Check if the response is successful
        if (data.code === 200 && data.data) {
          // Store token using tokenManager (via AuthContext)
          if (data.data.token) {
            if (typeof window !== "undefined") {
              // Store verification-related data in localStorage
              localStorage.setItem("phoneNumber", data.data.phoneNumber);
              localStorage.setItem("userId", data.data.phoneNumber);

              if (data.data.verificationCodeExpiresAt) {
                localStorage.setItem(
                  "verificationCodeExpiresAt",
                  data.data.verificationCodeExpiresAt
                );
                localStorage.setItem(
                  "verifyTime",
                  JSON.stringify(getTime(data.data.verificationCodeExpiresAt))
                );
              }

              // Store authToken temporarily for verification flow
              localStorage.setItem("authToken", data.data.token);
            }
          }

          // Show success message from API response
          toast.success(
            data.message ||
              "Successfully logged in! Please verify your account."
          );

          // Dispatch custom event to notify other components
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("loginSuccess"));
          }

          // Call the callback to notify parent components
          if (onLoginSuccess) {
            onLoginSuccess();
          }

          // Navigate to verification page after successful login
          // localStorage.setItem("prevNav", pathname);
          router.push("/userVerification");
        } else {
          // Handle unsuccessful response
          toast.error(data.message || "Login failed. Please try again.");
        }
      },
      onError: (error: any) => {
        console.error("Login Error:", error);

        // Error already handled by httpClient with toast
        // Just log additional details if needed
        const errorMessage = error.message || "An unexpected error occurred.";

        if (error.status == 401) {
          // Incorrect credentials
          toast.error(
            "Incorrect phone number or password"
          );
        }

        if (!error.status) {
          // Network error
          toast.error(
            "Unable to connect to the server. Please check your internet connection."
          );
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

    if (!password.trim()) {
      toast.error("Please enter your password.");
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
      password: password,
      countryShortName: "GH", // Default to Ghana, can be made configurable later
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    // State
    phoneNumber,
    setPhoneNumber,
    password,
    setPassword,
    showPassword,

    // Actions
    handleSubmit,
    togglePasswordVisibility,

    // SWR state
    isMutating,
  };
};
