// ============================================
// FILE 1: hooks/useSocialAuth.ts (Google Auth)
// ============================================
/**
 * useSocialAuth Hook - Fixed toast cancellation issue
 * Handles Google authentication using Firebase and new httpClient
 */

import {
  auth,
  googleProvider,
  browserPopupRedirectResolver,
} from "@/firebase/firebaseConfig";
import {
  signInWithPopup,
  signInWithRedirect,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import toast from "react-hot-toast";
import { httpClient, buildAuthUrl, AUTH_ENDPOINTS } from "@/lib";
import { useAuth } from "@/app/hooks/useAuth";

let inFlight = false;

const useSocialAuth = () => {
  const { login } = useAuth();

  const signIn = async () => {
    if (inFlight) return;
    inFlight = true;

    const loadingToast = toast.loading("Signing you in securely. Please wait…");

    try {
      // Ensure persistence before popup
      await setPersistence(auth, browserLocalPersistence);

      let firebaseResponse;

      try {
        // Try popup first
        firebaseResponse = await signInWithPopup(
          auth,
          googleProvider,
          browserPopupRedirectResolver
        );
      } catch (e) {
        const message = e instanceof Error ? e.message.toLowerCase() : "";
        const errorCode = (e as any)?.code || "";

        // Handle popup cancellation - dismiss toast immediately
        if (
          errorCode === "auth/popup-closed-by-user" ||
          errorCode === "auth/cancelled-popup-request" ||
          message.includes("popup-closed-by-user")
        ) {
          console.log("User cancelled the sign-in popup");
          toast.dismiss(loadingToast);
          toast.error("Sign-in was cancelled.", { duration: 2000 });
          return;
        }

        // Handle popup-related errors by falling back to redirect
        if (
          message.includes("popup-blocked") ||
          message.includes("pending promise was never set") ||
          message.includes("internal assertion failed") ||
          message.includes("cross-origin-opener-policy") ||
          message.includes("window.closed") ||
          errorCode === "auth/popup-blocked"
        ) {
          console.log("Popup blocked or COOP issue, using redirect flow");
          toast.dismiss(loadingToast);
          toast.loading("Opening sign-in…");
          await signInWithRedirect(auth, googleProvider);
          return;
        }

        throw e;
      }

      const user = firebaseResponse.user;
      if (!user) throw new Error("User authentication failed.");

      const idToken = await user.getIdToken();
      if (!idToken) throw new Error("Unable to retrieve authentication token.");

      const payload = {
        accessToken: idToken,
        fcmToken: null,
        referralCode: null,
      };

      // Use new httpClient and buildAuthUrl
      const apiUrl = buildAuthUrl(AUTH_ENDPOINTS.googleLogin);

      const response = await httpClient.post<{
        code: number;
        data: {
          token: string;
          user: any;
        };
        message: string;
      }>(apiUrl, payload);

      const authToken = response.data?.token;
      if (!authToken)
        throw new Error("No authentication token returned from server.");

      const userData = response.data?.user;
      if (!userData) throw new Error("No user data returned from server.");

      // Use login from AuthContext to store token and user
      login(authToken, userData);

      toast.dismiss(loadingToast);
      toast.success("You have been signed in successfully.");

      // Dispatch loginSuccess event for cross-component sync
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("loginSuccess"));
      }

      // Final redirect logic - support any valid path
      const params = new URLSearchParams(window.location.search);
      const returnTo = params.get("returnTo");

      // Validate returnTo is a safe internal path
      if (returnTo) {
        try {
          // Decode the URL-encoded path
          const decodedPath = decodeURIComponent(returnTo);

          // Only allow internal paths (starting with /)
          if (decodedPath.startsWith("/") && !decodedPath.startsWith("//")) {
            window.location.href = decodedPath;
            return;
          }
        } catch (error) {
          console.error("Invalid returnTo parameter:", error);
        }
      }

      // Default redirect to home
      window.location.href = "/";
    } catch (error) {
      toast.dismiss(loadingToast);

      if (error instanceof Error) {
        const message = error.message.toLowerCase();

        if (message.includes("popup-closed-by-user"))
          toast.error("Sign-in was cancelled.");
        else if (message.includes("popup-blocked"))
          toast.error(
            "Sign-in popup was blocked. Please enable popups and try again."
          );
        else if (message.includes("network"))
          toast.error(
            "A network error occurred. Please check your connection."
          );
        else if (message.includes("401") || message.includes("unauthorized"))
          toast.error("Authentication failed. Please sign in again.");
        else if (message.includes("403") || message.includes("forbidden"))
          toast.error("You do not have permission to access this account.");
        else if (message.includes("400") || message.includes("bad request"))
          toast.error(
            "The sign-in request could not be processed. Please try again."
          );
        else toast.error("An unexpected error occurred during sign-in.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      inFlight = false;
    }
  };

  return { signIn };
};

export default useSocialAuth;
