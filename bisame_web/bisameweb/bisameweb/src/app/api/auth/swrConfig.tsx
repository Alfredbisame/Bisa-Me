"use client";
import React from "react";
import useSWR, { SWRConfig } from "swr";
import { apiClient } from "./authClient";

export const defaultFetcher = async (url: string) => {
  return apiClient.get(url);
};

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: defaultFetcher,
        revalidateOnFocus: true,
        shouldRetryOnError: true,
        errorRetryCount: 2,
        dedupingInterval: 2000,
      }}
    >
      {children}
    </SWRConfig>
  );
}

// Convenience hook example
export function useProfile() {
  return useSWR("/auth/profile");
}


