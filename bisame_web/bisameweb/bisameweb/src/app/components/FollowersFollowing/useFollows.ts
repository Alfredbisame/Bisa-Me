import { useState } from "react";
import { authPost, buildListingsUrl, FOLLOW_ENDPOINTS } from "@/lib";

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

interface FollowsResponse {
  success: boolean;
  message?: string;
  data?: FollowResponseData;
  [key: string]: unknown;
}

export function useFollows() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<FollowsResponse | null>(null);

  const follow = async (userid: string) => {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const url = buildListingsUrl(FOLLOW_ENDPOINTS.follow);
      const payload: FollowRequest = {
        toUserId: userid,
      };
      
      const data = await authPost<FollowApiResponse>(url, payload);
      
      if (data.code === 200 && data.data) {
        const successResponse: FollowsResponse = {
          success: true,
          message: data.message || "Followed successfully",
          data: data.data,
        };
        setResponse(successResponse);
        return successResponse;
      } else {
        throw new Error(data.message || "Failed to follow user");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : JSON.stringify(err);
      setError(message || "Unknown error");
      const errorResponse: FollowsResponse = {
        success: false,
        message: message || "Unknown error",
      };
      return errorResponse;
    } finally {
      setLoading(false);
    }
  };

  return { follow, loading, error, response };
}
