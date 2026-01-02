import { PromoPlanRoot } from "../interfaces";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { authHttpClient, buildListingsUrl, PROMOTION_ENDPOINTS } from "@/lib";

const useCheckout = (postData: PromoPlanRoot) => {
  const router = useRouter();
  const apiUrl = buildListingsUrl(PROMOTION_ENDPOINTS.purchase);
  
  const fetcher = async (url: string) => {
    try {
      const response = await authHttpClient.post<{ 
        message?: string; 
        data?: unknown;
        code?: number;
      }>(url, postData);
      
      if (response) {
        const message = typeof response.message === 'string' 
          ? response.message 
          : "Purchase successful";
        toast.success(message);
        router.push("/dashboard/purchases");
        return response.data || response;
      }
    } catch (error: any) {
      console.error(error);
      const errorMessage = error?.message || error?.data?.message || "Purchase failed";
      toast.error(typeof errorMessage === 'string' ? errorMessage : "Purchase failed");
      throw error;
    }
  };

  const { trigger, data, error, isMutating } = useSWRMutation(
    apiUrl,
    fetcher
  );

  return { trigger, data, isMutating, error };
};

export default useCheckout;
