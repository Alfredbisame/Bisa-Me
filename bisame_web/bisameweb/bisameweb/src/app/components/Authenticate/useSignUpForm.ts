/**
 * useSignUpForm Hook - Updated to use new API client
 * Handles signup form state and API calls using new axios-based client
 */

import useSWRMutation from "swr/mutation";
import { toast } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { validateSignUpForm, type FormData } from "./validationUtils";
import { useFormState } from "./useFormState";
import { httpClient, buildAuthUrl, AUTH_ENDPOINTS } from "@/lib";
import { getTime } from "@/app/utils/verify";

interface RegisterRequestBody {
  first: string;
  last: string;
  phone: string;
  email: string;
  password: string;
  refecode: string;
  countryname: string;
  countryiso2: string;
  countrycode: string;
  choose: string;
  type: string;
}

interface RegisterResponse {
  code: number;
  data: {
    token: string;
    phoneNumber: string;
    verificationCodeExpiresAt: string;
  };
  message: string;
}

async function registerUser(
  url: string,
  { arg }: { arg: RegisterRequestBody }
): Promise<RegisterResponse> {
  const apiUrl = buildAuthUrl(AUTH_ENDPOINTS.signup);

  return httpClient.post<RegisterResponse>(apiUrl, {
    firstName: arg.first,
    lastName: arg.last,
    phoneNumber: arg.phone.replace("+", ""),
    email: arg.email || "",
    password: arg.password,
    referralCode: arg.refecode,
    countryName: arg.countryname,
    countryShortName: arg.countryiso2 || "GH",
    countryCode: arg.countrycode.replace("+", ""),
    choose: arg.choose,
    type: arg.type,
  });
}

export const useSignUpForm = () => {
  const router = useRouter();
  const previousPathname = usePathname();

  // Use the custom form state hook
  const formState = useFormState();

  // SWR Mutation for Form Submission
  const { trigger, isMutating, error } = useSWRMutation(
    buildAuthUrl(AUTH_ENDPOINTS.signup), // Cache key is the actual API endpoint
    registerUser,
    {
      onSuccess: (data: RegisterResponse) => {
        console.log("Registration successful:", data);

        // Check if the response is successful
        if (data.code === 200 && data.data) {
          // Store token and verification-related data in localStorage
          if (data.data.token) {
            if (typeof window !== "undefined") {
              // Store verification-related data in localStorage
              localStorage.setItem("phoneNumber", data.data.phoneNumber);
              localStorage.setItem("userId", data.data.phoneNumber);

              // console.log(data.data.token)

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

              // Store authToken for verification flow
              localStorage.setItem("authToken", data.data.token);
            }
          }

          // Show success message from API response
          toast.success(
            data.message ||
              "Registration successful! Please verify your account."
          );

          // Dispatch custom event to notify other components
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("registrationSuccess"));
          }

          // Reset form using the custom hook method
          formState.resetForm();

          // Navigate to verification page after successful registration
          // localStorage.setItem("prevNav", previousPathname);
          router.push("/userVerification");
        } else {
          // Handle unsuccessful response
          toast.error(data.message || "Registration failed. Please try again.");
        }
      },
      onError: (err: any) => {
        console.error("Registration failed:", + err);

        console.log(err);
        console.log(err);
        console.log(err);
        console.log(err);

        const errorMessage =
          err.message || "Registration failed. Please try again.";
        toast.error(`Registration failed: ${errorMessage}`);
      },
    }
  );

  /**
   * Handles form submission with validation
   */
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // Create form data object for validation
      const formData: FormData = {
        firstName: formState.firstName,
        lastName: formState.lastName,
        phoneNumber: formState.phoneNumber || "",
        email: formState.email,
        password: formState.password,
        confirmPassword: formState.confirmPassword,
        termsAccepted: formState.termsAccepted,
      };


      // Validate form data
      const validation = validateSignUpForm(formData);

      if (!validation.isValid) {
        // Show first error message
        toast.error(validation.errors[0]);
        return;
      }

      // Create request body with default verification method (sms)
      const requestBody: RegisterRequestBody = {
        first: formState.firstName,
        last: formState.lastName,
        phone: formState.phoneNumber!,
        email: formState.email || "",
        password: formState.password,
        refecode: formState.referralCode,
        countryname: "Ghana",
        countryiso2: "GH",
        countrycode: "+233",
        choose: formState.hearAboutUs,
        type: "sms", // Default to SMS verification
      };

      // Directly trigger the registration without showing modal
      trigger(requestBody);
    },
    [formState, trigger]
  );

  return {
    // Form state (destructured from the custom hook)
    ...formState,

    // Actions
    handleSubmit,

    // SWR state
    isMutating,
    error,
  };
};
