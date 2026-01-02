import useSWRMutation from "swr/mutation";
import { useCallback, useEffect } from "react";
import {
  API_ENDPOINTS,
  authHttpClient,
  buildAuthUrl,
  buildListingsUrl,
  FILE_ENDPOINTS,
  tokenManager,
} from "@/lib";
import { useProfileData } from "../Dashboard/useProfileData";
import toast from "react-hot-toast";

interface ChangeProfileImageResponse {
  message: string;
  data: string;
  code: number;
}

// SWR mutation fetcher for multipart/form-data
async function changeProfileImageFetcher(
  url: string,
  { arg }: { arg: File }
): Promise<ChangeProfileImageResponse> {
  const formData = new FormData();
  formData.append("file", arg);

  const response = await authHttpClient.post<ChangeProfileImageResponse>(
    url,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
}

export function useChangeProfileImage() {
  const apiUrl = buildListingsUrl(FILE_ENDPOINTS.upload);

  // get userDetails
  const { data: ProfileData, mutate: refreshUser } = useProfileData();

  const {
    trigger,
    data,
    error,
    isMutating: loading,
    reset,
  } = useSWRMutation(apiUrl, changeProfileImageFetcher);

  const changeProfileImage = useCallback(
    async (file: File) => {
      return trigger(file);
    },
    [trigger]
  );

  const UpdateProfile = async (): Promise<unknown> => {
    try {
      const apiUrl = buildAuthUrl(API_ENDPOINTS.auth.updateProfile);
      const payload = {
        firstName: ProfileData?.firstName,
        lastName: ProfileData?.lastName,
        phoneNumber: ProfileData?.phoneNumber,
        profilePicture: data?.data,
      } as const;

      const token = tokenManager.getToken();
      const response = await authHttpClient.patch(apiUrl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Profile picture updated successfully");
      console.log(response);
      await refreshUser()
      return response;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  // Trigger a patch to update the profile
  useEffect(() => {
    if (data?.data) {
      UpdateProfile();
    }
  }, [data]);

  console.log(data);

  return {
    changeProfileImage,
    loading,
    error: error ? (error as Error).message : null,
    response: data ?? null,
    reset,
  };
}
