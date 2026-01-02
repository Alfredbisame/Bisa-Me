import { useState } from "react";
import { authHttpClient, buildAuthUrl, AUTH_ENDPOINTS } from "@/lib";
import toast from "react-hot-toast";

interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
}

interface PasswordChangeResponse {
  message: string;
}

interface PasswordChangeError {
  message: string;
  error?: unknown;
}

interface UsePasswordChangeReturn {
  changePassword: (
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => Promise<boolean>;
  loading: boolean;
  error: PasswordChangeError | null;
  success: boolean;
  resetState: () => void;
}

export function usePasswordChange(): UsePasswordChangeReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PasswordChangeError | null>(null);
  const [success, setSuccess] = useState(false);

  const resetState = () => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  };

  const changePassword = async (
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ): Promise<boolean> => {
    // Reset state
    resetState();

    const loadingUpdatePassword = toast.loading("Updating Password");

    // Validation
    if (!oldPassword.trim()) {
      setError({ message: "Old password is required" });
      return false;
    }

    if (!newPassword.trim()) {
      setError({ message: "New password is required" });
      return false;
    }

    if (!confirmPassword.trim()) {
      setError({ message: "Confirm password is required" });
      return false;
    }

    if (newPassword.length < 6) {
      setError({ message: "New password must be at least 6 characters long" });
      return false;
    }

    if (newPassword !== confirmPassword) {
      setError({ message: "New password and confirm password do not match" });
      return false;
    }

    if (oldPassword === newPassword) {
      setError({ message: "New password must be different from old password" });
      return false;
    }

    setLoading(true);

    try {
      const requestBody: PasswordChangeRequest = {
        currentPassword: oldPassword,
        newPassword: newPassword,
      };

      const apiUrl = buildAuthUrl(AUTH_ENDPOINTS.changePassword);
      await authHttpClient.patch<PasswordChangeResponse>(apiUrl, requestBody);

      setSuccess(true);
      return true;
    } catch (err: unknown) {
      let message = "An unexpected error occurred";
      if (err instanceof Error) {
        message = err.message;
      }
      setError({
        message,
        error: err,
      });
      return false;
    } finally {
      setLoading(false);
      toast.dismiss(loadingUpdatePassword);
    }
  };

  return {
    changePassword,
    loading,
    error,
    success,
    resetState,
  };
}
