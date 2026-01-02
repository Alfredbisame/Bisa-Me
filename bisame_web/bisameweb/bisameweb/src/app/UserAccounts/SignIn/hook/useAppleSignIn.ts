/**
 * useAppleAuth Hook - Fixed toast cancellation issue
 * Handles Apple authentication using Firebase and new httpClient
 */

import { auth } from "@/firebase/firebaseConfig";
import {
  OAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  setPersistence,
  browserLocalPersistence,
  User,
  UserCredential,
  AuthError,
} from "firebase/auth";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { httpClient, buildAuthUrl, AUTH_ENDPOINTS } from "@/lib";
import { useAuth } from "@/app/hooks/useAuth";

let inFlight = false;

type UseAppleAuthOptions = {
  preferRedirect?: boolean;
  locale?: string;
};

const useAppleAuth = (options: UseAppleAuthOptions = {}) => {
  const { preferRedirect = true, locale } = options;

  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true);
  const { login } = useAuth();

  const provider = useMemo(() => {
    const p = new OAuthProvider("apple.com");
    p.addScope("email");
    p.addScope("name");
    if (locale) p.setCustomParameters({ locale });
    return p;
  }, [locale]);

  const finishSession = useCallback(
    async (user: User) => {
      const idToken = await user.getIdToken();
      if (!idToken) throw new Error("Unable to retrieve authentication token.");

      const payload = {
        accessToken: idToken,
        fcmToken: null,
        referralCode: null,
      };

      // Use new httpClient and buildAuthUrl
      const apiUrl = buildAuthUrl(AUTH_ENDPOINTS.appleLogin);

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
    },
    [login]
  );

  useEffect(() => {
    isMounted.current = true;

    const run = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (!result?.user) return;

        const t = toast.loading("Completing sign-in…");
        await finishSession(result.user);
        toast.dismiss(t);
      } catch {
        // ignore: no redirect result / transient errors
      }
    };

    run();
    return () => {
      isMounted.current = false;
    };
  }, [finishSession]);

  const signIn = useCallback(async () => {
    if (inFlight) return;
    inFlight = true;

    setLoading(true);
    const loadingToast = toast.loading("Signing you in securely. Please wait…");

    try {
      await setPersistence(auth, browserLocalPersistence);

      if (preferRedirect) {
        toast.dismiss(loadingToast);
        toast.loading("Opening sign-in…");
        await signInWithRedirect(auth, provider);
        return;
      }

      let firebaseResponse: UserCredential;

      try {
        firebaseResponse = await signInWithPopup(auth, provider);
      } catch (e) {
        const message = e instanceof Error ? e.message.toLowerCase() : "";
        const code = (e as AuthError)?.code || "";

        // Handle popup cancellation - dismiss toast immediately
        if (
          code === "auth/popup-closed-by-user" ||
          code === "auth/cancelled-popup-request" ||
          message.includes("popup-closed-by-user")
        ) {
          console.log("User cancelled the Apple sign-in popup");
          toast.dismiss(loadingToast);
          toast.error("Sign-in was cancelled.", { duration: 2000 });
          return;
        }

        // Handle popup-related errors including COOP
        if (
          code === "auth/popup-blocked" ||
          message.includes("popup-blocked") ||
          message.includes("cross-origin-opener-policy") ||
          message.includes("window.closed")
        ) {
          console.log("Popup blocked or COOP issue, using redirect flow");
          toast.dismiss(loadingToast);
          toast.loading("Opening sign-in…");
          await signInWithRedirect(auth, provider);
          return;
        }

        throw e;
      }

      if (!firebaseResponse.user)
        throw new Error("User authentication failed.");
      await finishSession(firebaseResponse.user);

      toast.dismiss(loadingToast);
      toast.success("You have been signed in successfully.");
    } catch (error) {
      toast.dismiss(loadingToast);

      console.error(error);

      if (error instanceof Error) {
        const message = error.message.toLowerCase();

        if (message.includes("popup-closed-by-user"))
          toast.error("Sign-in was cancelled.");
        else if (message.includes("popup-blocked"))
          toast.error(
            "Sign-in popup was blocked. Please enable popups and try again."
          );
        else toast.error("Sign-in was unsuccessful. Please try again.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      if (isMounted.current) setLoading(false);
      inFlight = false;
    }
  }, [preferRedirect, provider, finishSession]);

  return { signIn, loading };
};

export default useAppleAuth;
