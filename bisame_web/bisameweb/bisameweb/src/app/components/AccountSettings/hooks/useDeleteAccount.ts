import { useState } from "react";
import { authHttpClient, buildAuthUrl, AUTH_ENDPOINTS } from "@/lib";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useAuth } from "@/app/hooks/useAuth";

interface DeleteError {
  message: string;
  error?: unknown;
}

interface DeleteAccountResponse {
  message: string;
}

interface UseDeleteAccountReturn {
  // deleteAccount: () => Promise<boolean>;
  loading: boolean;
  error: DeleteError | null;
  success: boolean;
  resetState: () => void;
  handleDeleteAccount: () => void;
}

const useDeleteAccount = (): UseDeleteAccountReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<DeleteError | null>(null);
  const [success, setSuccess] = useState(false);
  const { logout } = useAuth();

  const router = useRouter();

  const resetState = () => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  };

  // const deleteAccount = async (): Promise<boolean> => {
  //   // Reset state
  //   resetState();

  //   const loadingDeleteAccount = toast.loading("Deleting Account...");

  //   setLoading(true);

  //   try {
  //     const apiUrl = buildAuthUrl(AUTH_ENDPOINTS.deleteAccount);
  //     await authHttpClient.delete<DeleteAccountResponse>(apiUrl);

  //     setSuccess(true);
  //     toast.success("Account deleted successfully");
  //     router.push("/UserAccounts/SignIn");

  //     localStorage.removeItem("auth-token");
  //     localStorage.removeItem("auth_token");
  //     return true;
  //   } catch (err: unknown) {
  //     let message = "Failed to delete account";
  //     if (err instanceof Error) {
  //       message = err.message;
  //     }
  //     setError({
  //       message,
  //       error: err,
  //     });

  //     toast.error(message);
  //     return false;
  //   } finally {
  //     setLoading(false);
  //     toast.dismiss(loadingDeleteAccount);
  //   }
  // };

  const handleDeleteAccount = async () => {
    setLoading(true);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Your account would be suspended.",
      icon: "warning",
      iconColor: "#ff0000",
      showCancelButton: true,
      confirmButtonColor: "#ff0000",
      cancelButtonColor: "#3b82f0",
      confirmButtonText: "Yes, delete my account",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-lg shadow-lg",
        title: "text-lg font-semibold",
        confirmButton: "px-4 py-2 rounded-md",
        cancelButton: "px-20 py-2 rounded-md",
      },
    });

    if (result.isConfirmed) {
      try {
        // Call the delete API using new authHttpClient
        const apiUrl = buildAuthUrl(AUTH_ENDPOINTS.deleteAccount);

        try {
          await authHttpClient.delete<DeleteAccountResponse>(apiUrl);
        } catch (apiError) {
          console.warn("Delete API call failed", apiError);
        } finally {
          setLoading(false);
        }
        logout();

        // Show success message
        await Swal.fire({
          title: "Account Deleted!",
          text: "Your account has been deleted successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            popup: "rounded-lg shadow-lg",
          },
        });

        // Redirect to home
        window.location.href = "/";
      } catch (error) {
        console.error("Error during logout:", error);

        // Even if there's an error, clear local state
        logout();

        await Swal.fire({
          title: "Your account failed to be suspended",
          text: "You have the chance to decide before you delete your account.",
          icon: "info",
          confirmButtonColor: "#f97316",
          customClass: {
            popup: "rounded-lg shadow-lg",
          },
        });

        window.location.href = "/";
      }
    }
  };

  return {
    // deleteAccount,
    loading,
    error,
    success,
    resetState,
    handleDeleteAccount,
  };
};

export default useDeleteAccount;
