import {
  API_ENDPOINTS,
  buildProfileUrl,
  httpClient,
  tokenManager,
} from "@/lib";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";

type Status =
  | "Active"
  | "Reviewing"
  | "Declined"
  | "Update"
  | "Closed"
  | "Delete";

interface Payload {
  status: Status;
}

const useActivatePosts = (status: Status) => {
  const changePostStatus = async (
    url: string,
    { arg: productId }: { arg: string }
  ) => {
    const payload: Payload = { status } as const;
    const endpoint = API_ENDPOINTS.profile.activatePosts.replace(
      "{id}",
      productId
    );

    const token = tokenManager.getToken();
    const response = httpClient.patch(buildProfileUrl(endpoint), payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Product Status changed successfully");
    return response;
  };

  const {
    data,
    isMutating: isLoading,
    trigger: refresh,
  } = useSWRMutation("activate-post", changePostStatus);

  return { data, isLoading, refresh };
};

export default useActivatePosts;
