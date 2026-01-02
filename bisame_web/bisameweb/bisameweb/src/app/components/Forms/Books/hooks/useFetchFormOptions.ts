import toast from "react-hot-toast";
import useSWR from "swr";
import { httpClient, buildListingsUrl, FORM_ENDPOINTS } from "@/lib";

const useFetchFormOptions = (
  group: string,
  category?: string,
  subCategory?: string,
  enabled = true
) => {
  const fetcher = async (url: string) => {
    try {
      const response = await httpClient.get<{
        message?: string;
        [key: string]: unknown;
      }>(url);

      // Only show a success toast when the server explicitly provides a message
      if (
        response &&
        typeof response.message === "string" &&
        response.message.trim()
      ) {
        toast.success(response.message);
      }

      return response;
    } catch (error: any) {
      console.error(error);
      const errorMessage = error?.message || "Failed to fetch form options";
      toast.error(
        typeof errorMessage === "string"
          ? errorMessage
          : "Failed to fetch form options"
      );
      throw error;
    }
  };

  //Run checks for Job Seekers and modify it
  const checkGroup = group === "jobseek" ? "Job Seekers" : group;

  const buildUrl = () => {
    const baseUrl = buildListingsUrl(FORM_ENDPOINTS.adRequest);
    const params = new URLSearchParams({ group: checkGroup });

    if (checkGroup === "health" || checkGroup === "Job Seekers") {
      if (category) params.append("category", category);
    } else if (checkGroup === "Buy and Sell") {
      if (category) params.append("category", category);
      if (subCategory) params.append("subCategory", subCategory);
    }

    return `${baseUrl}?${params.toString()}`;
  };

  const apiUrl = buildUrl();

  // If `enabled` is false, pass a null key to SWR to avoid fetching
  const {
    data,
    error,
    isLoading,
    mutate: refresh,
  } = useSWR(enabled ? apiUrl : null, fetcher);

  return { data, error, isLoading, refresh };
};

export default useFetchFormOptions;
