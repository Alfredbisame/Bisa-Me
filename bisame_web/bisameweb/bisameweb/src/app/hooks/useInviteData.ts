"use client";

import { useState, useEffect } from 'react';
import useSWR from 'swr';

interface InviteApiResponse {
  invitecode: string;
}

interface UseInviteDataReturn {
  data: InviteApiResponse | null;
  error: unknown;
  isLoading: boolean;
  mutate: () => void;
}

// Fetcher function for SWR
const fetcher = async (url: string): Promise<InviteApiResponse> => {
  const response = await fetch(url);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
  }
  
  return response.json();
};

export const useInviteData = (): UseInviteDataReturn => {
  const [userId, setUserId] = useState<string | null>(null);

  // Get userId from localStorage on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      setUserId(storedUserId);
    }
  }, []);

  // Use SWR to fetch data
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/invite?userid=${userId}` : null,
    fetcher,
    {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: false,
        dedupingInterval: 86400000, // 24 hours
        keepPreviousData: true,
        refreshInterval: 0, 
        refreshWhenHidden: false,
        refreshWhenOffline: false, 
        shouldRetryOnError: true,
        errorRetryInterval: 5000,
        errorRetryCount: 3
    }
  );
  
  return {
    data: data || null,
    error,
    isLoading: isLoading || !userId,
    mutate,
  };
};
