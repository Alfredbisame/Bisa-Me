import { useState } from "react";
import useSWRMutation from "swr/mutation";
import {
  post,
  del,
  buildListingsUrl,
  FAVORITES_ENDPOINTS,
  replacePathParams,
  tokenManager,
} from "@/lib";

const ADD_FAVORITE_API = buildListingsUrl(FAVORITES_ENDPOINTS.base);

async function addFavoriteFetcher(
  url: string,
  { arg }: { arg: { id: string } }
) {
  const token = tokenManager.getToken();
  if (!token) {
    throw new Error("Authentication required");
  }

  return await post<any>(
    url,
    { listingId: arg.id },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

async function deleteFavoriteFetcher(
  url: string,
  { arg }: { arg: { listingId: string } }
) {
  const token = tokenManager.getToken();
  if (!token) {
    throw new Error("Authentication required");
  }

  // Determine dynamic URL if the fetcher logic requires it, 
  // but SWR mutation usually takes a fixed key or function.
  // Here we reconstruct the URL properly for the delete request.
  const endpoint = replacePathParams(FAVORITES_ENDPOINTS.delete, {
    listingId: arg.listingId,
  });
  const deleteUrl = buildListingsUrl(endpoint);

  return await del<any>(deleteUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function useSave() {
  const { trigger: addTrigger, isMutating: isAdding } = useSWRMutation(
    ADD_FAVORITE_API,
    addFavoriteFetcher
  );

  // For delete, since the URL is dynamic based on ID, we might need a generic key
  // or handle the URL construction inside the fetcher purely.
  // The original code tried to construct key based on ID, but we want this hook to be generic.
  // We'll use a constant key for the mutation hook registration, and do URL building in fetcher.
  const { trigger: deleteTrigger, isMutating: isDeleting } = useSWRMutation(
    FAVORITES_ENDPOINTS.delete, // Generic key
    deleteFavoriteFetcher
  );

  const save = async (listingId: string) => {
    return await addTrigger({ id: listingId });
  };

  const unsave = async (listingId: string) => {
    return await deleteTrigger({ listingId });
  };

  return {
    save,
    unsave,
    loading: isAdding || isDeleting,
  };
}