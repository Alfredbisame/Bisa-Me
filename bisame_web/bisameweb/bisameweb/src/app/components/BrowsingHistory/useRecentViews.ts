import { useEffect, useState, useCallback } from "react";
import useSWR from "swr";
import { RecentViewListing, RecentViewsResponse } from "./types";
import useSocket from "../../Socket/useSocket";
import { authHttpClient, buildListingsUrl, LISTINGS_ENDPOINTS } from "@/lib";

interface UseRecentViewsProps {
  userId?: string;
  page?: number;
  pageSize?: number;
}

// Fetcher function using the new API client
const fetcher = async (url: string): Promise<RecentViewsResponse> => {
  const response = await authHttpClient.get<RecentViewsResponse>(url);
  return response;
};

const useRecentViews = ({
  userId,
  page = 1,
  pageSize = 10,
}: UseRecentViewsProps) => {
  const [error, setError] = useState<string | null>(null);

  // Use the socket hook for real-time updates
  const { isConnected, emit, on, connect } = useSocket("/", userId, false);

  // Build URL with query parameters
  const endpoint = LISTINGS_ENDPOINTS.recentViews;
  const apiUrl = userId
    ? `${buildListingsUrl(endpoint)}?page=${page}&pageSize=${pageSize}&sortDir=asc`
    : null;

  // Use SWR for data fetching and caching
  const {
    data,
    isLoading,
    mutate: refresh,
  } = useSWR(apiUrl, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    dedupingInterval: 3600000, // 1 hour
    refreshInterval: 0,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    shouldRetryOnError: true,
    errorRetryCount: 3,
    onError: (err) => {
      console.error("Error fetching recent views:", err);
      setError(err.message);
    },
  });

  // Extract data from SWR response
  const recentViews = data?.data?.results || [];
  const totalPages = data?.data?.totalPages || 0;
  const totalCount = data?.data?.totalCount || 0;

  // Set up socket listeners for real-time updates
  useEffect(() => {
    if (!userId) {
      console.log(
        "[useRecentViews] No userId provided, skipping socket initialization"
      );
      return;
    }

    const initializeSocket = async () => {
      try {
        console.log("[useRecentViews] Initializing socket connection", {
          userId,
        });
        await connect();
        console.log("[useRecentViews] Socket connected successfully", {
          userId,
          isConnected,
        });

        // Listen for real-time updates
        on("recent-views", (data: { results: RecentViewListing[] }) => {
          console.log(
            "[useRecentViews] Received real-time recent views update:",
            data
          );
          if (data.results) {
            // Update SWR cache
            refresh();
          }
        });

        // Subscribe to recent views updates
        emit("subscribe:recent-views", { userId });
      } catch (err) {
        console.error("[useRecentViews] Error initializing socket:", err);
      }
    };

    initializeSocket();

    // Cleanup function - unsubscribe when component unmounts
    return () => {
      console.log("[useRecentViews] Cleaning up socket connection", { userId });
      try {
        emit("unsubscribe:recent-views", { userId });
      } catch (err) {
        console.error("[useRecentViews] Error during cleanup:", err);
      }
    };
  }, [userId, isConnected, emit, on, connect, refresh]);

  // Function to record a new recent view
  const recordRecentView = useCallback(
    async (listingId: string) => {
      if (!userId) {
        console.log("[useRecentViews] Cannot record recent view - no userId");
        return;
      }

      try {
        // Ensure socket is connected before emitting
        if (!isConnected) {
          console.log(
            "[useRecentViews] Socket not connected, attempting to connect"
          );
          await connect();
          console.log("[useRecentViews] Socket connection established");
        }

        console.log(
          `[useRecentViews] Recording recent view for listing ${listingId} by user ${userId}`
        );
        emit("recent-view", { listingId, userId });

        // Trigger a refresh to get updated recent views
        console.log("[useRecentViews] Triggering recent views refresh", {
          userId,
        });
        emit("recent-views:refresh", { userId });
      } catch (err) {
        console.error("[useRecentViews] Failed to record recent view:", err);
        setError(
          err instanceof Error ? err.message : "Failed to record recent view"
        );
      }
    },
    [userId, isConnected, emit, connect]
  );

  return {
    recentViews,
    loading: isLoading,
    error,
    totalPages,
    totalCount,
    isConnected,
    recordRecentView,
  };
};

export default useRecentViews;
