import {
  API_ENDPOINTS,
  buildProfileUrl,
  httpClient,
  tokenManager,
} from "@/lib";
import useSWRMutation from "swr/mutation";

export interface PostUpdateInfo {
  _id: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string | null;
  createdBy: string | null;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  childCategory: string | null;
  price: number;
  contactNumber: string;
  totalViews: number;
  location: string;
  userId: string;
  isPromoted: boolean;
  images: Array<{ imageUrl: string; id: string }>;
  userInfo: {
    name: string;
    profilePicture: string;
  };
  status: string;
  message: string;
  negotiable: boolean;
  attributes: {
    [key: string]: unknown;
  };
  __v: number;
}

interface PostUpdate {
  code: number;
  data: PostUpdateInfo;
  message: string;
}

// ... [PostUpdateInfo and PostUpdate interfaces remain the same]

export function usePostUpdateFetch() {

  const fetcher = async (
    url: string,
    { arg }: { arg: { id: string } }
  ): Promise<PostUpdate> => {
    const apiUrl = buildProfileUrl(
      API_ENDPOINTS.listings.details.replace("{id}", arg.id)
    );

    const token = tokenManager.getToken();

    // Assuming httpClient is an Axios instance
    const response = await httpClient.get<PostUpdate>(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response as PostUpdate;
  };

  const { trigger, data, error, isMutating } = useSWRMutation(
    "post-update",
    fetcher
  );

  return {
    triggerEditProduct: trigger,
    data: data?.data,
    loading: isMutating,
    error:
      error instanceof Error ? error.message : error ? String(error) : null,
  };
}
