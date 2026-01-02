import { useState } from 'react';
import { post, buildListingsUrl, FOLLOW_ENDPOINTS, tokenManager } from '@/lib';

interface FollowRequest {
  toUserId: string;
}

interface FollowResponseData {
  id: string;
  createdAt: string;
  updatedAt: string | null;
  fromUserId: string;
  toUserId: string;
  toUserSnapshot: {
    firstName: string;
    lastName: string;
    profilePicture: string;
    email: string | null;
    phoneNumber: string | null;
    [key: string]: unknown;
  };
  fromUserSnapshot: {
    firstName: string;
    lastName: string;
    profilePicture: string;
    email: string | null;
    phoneNumber: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

interface FollowApiResponse {
  code: number;
  data: FollowResponseData;
  message: string;
}

interface FollowResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T | null;
}

interface UseFollowReturn<T = unknown> {
  follow: (toUserId: string) => Promise<FollowResponse<T>>;
  loading: boolean;
  error: string | null;
}

export function useFollow<T = unknown>(): UseFollowReturn<T> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const follow = async (toUserId: string): Promise<FollowResponse<T>> => {
    setLoading(true);
    setError(null);
    
    try {
      const token = tokenManager.getToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const url = buildListingsUrl(FOLLOW_ENDPOINTS.follow);
      const payload: FollowRequest = {
        toUserId,
      };

      const data = await post<FollowApiResponse>(
        url,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.code === 200 && data.data) {
        return {
          success: true,
          message: data.message || 'Followed successfully',
          data: data.data as T,
        };
      } else {
        throw new Error(data.message || 'Failed to follow user');
      }
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
    follow,
    loading,
    error,
  };
}