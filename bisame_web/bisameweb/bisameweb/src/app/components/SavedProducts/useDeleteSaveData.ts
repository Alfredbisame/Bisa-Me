import useSWRMutation from "swr/mutation";
import { authHttpClient, buildListingsUrl, FAVORITES_ENDPOINTS, replacePathParams } from "@/lib";

interface DeleteSaveResult {
  success: boolean;
  message: string;
  [key: string]: unknown;
}

// Fetcher for delete operation
async function deleteSaveFetcher(
  _url: string, // We construct the URL dynamically based on arg
  { arg }: { arg: { listingId: string } }
): Promise<DeleteSaveResult> {
  const endpoint = replacePathParams(FAVORITES_ENDPOINTS.delete, {
    listingId: arg.listingId,
  });
  const url = buildListingsUrl(endpoint);

  const response = await authHttpClient.delete<DeleteSaveResult>(url);
  return response;
}

// Hook now expects to be called with listingId in the trigger function, 
// or we can keep the `deleteId` prop if the component relies on it, 
// but SWRMutation is usually better without fixed args in the hook init.
// However, to maintain compatibility with existing usage (if any), 
// we'll keep the signature but `deleteId` might be redundant if we pass it to trigger.
// Assuming `deleteId` is passed to the hook to set up the mutation for a specific item,
// BUT standard SWRMutation allows passing arg to trigger.
// Let's stick to the previous pattern but safe-guard it.
export function useDeleteSaveData() {
  const {
    trigger: deleteSave,
    isMutating: loading,
    error,
    data: result,
    reset,
  } = useSWRMutation(
    FAVORITES_ENDPOINTS.delete, // Key
    deleteSaveFetcher
  );

  return {
    deleteSave, // now expects { listingId: string } when called
    loading,
    error: error ? (error.message || "Failed to delete") : null,
    result,
    reset,
  };
}
