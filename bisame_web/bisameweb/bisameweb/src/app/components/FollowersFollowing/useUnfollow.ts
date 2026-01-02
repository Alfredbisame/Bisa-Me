import { useState } from 'react';

interface UnfollowData {
  [key: string]: string | number | boolean | null | undefined;
}

interface UnfollowResponse {
  success: boolean;
  message: string;
  data: UnfollowData | null;
}

interface UseUnfollowReturn {
  unfollow: (toUserId: string) => Promise<UnfollowResponse>;
  loading: boolean;
  error: string | null;
}

export function useUnfollow(): UseUnfollowReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const unfollow = async (toUserId: string): Promise<UnfollowResponse> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/Dashboard/Followers/Unfollow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ toUserId }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to unfollow user');
      }
      
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        data: null,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    unfollow,
    loading,
    error,
  };
}