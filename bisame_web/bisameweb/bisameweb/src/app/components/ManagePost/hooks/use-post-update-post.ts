import { useState } from "react";
import { authHttpClient, buildListingsUrl, PROFILE_ENDPOINTS } from "@/lib";

type ResultProps = { success: boolean; message?: string; error?: unknown };

const usePostUpdatePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [result, setResult] = useState<ResultProps | null>(null);

  const updatePost = async (
    id: string,
    body: { [k: string]: unknown } | FormData
  ) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      // Build URL - Note: Using profile listings endpoint for updates
      // If there's a specific update endpoint, it should be added to api-endpoints.ts
      const apiUrl = buildListingsUrl(PROFILE_ENDPOINTS.listings);
      
      // If it's FormData, we need to handle it differently
      const isFormData = body instanceof FormData;
      
      let response;
      if (isFormData) {
        // For FormData, we need to use fetch directly as authHttpClient expects JSON
        // But we'll convert FormData to a regular object if possible
        const formDataObj: { [k: string]: unknown } = {};
        body.forEach((value, key) => {
          formDataObj[key] = value;
        });
        response = await authHttpClient.put(apiUrl, { ...formDataObj, id });
      } else {
        response = await authHttpClient.put(apiUrl, { ...body, id });
      }

      const json = response as any;
      setResult({ success: true, ...json });
      setLoading(false);
      return { success: true, ...json };
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to update product";
      setError(errorMessage);
      setResult({ success: false, error: errorMessage });
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  return { loading, error, result, updatePost };
};

export default usePostUpdatePost;
