import toast from "react-hot-toast";
import useSWR from "swr";
import { useMemo } from "react";
import { ConversationProps } from "../interfaces"; 
import { authGet } from "@/lib/auth-client";
import { buildListingsUrl, CHAT_ENDPOINTS } from "@/lib/api-endpoints";

interface ChatContactsResponse {
  data: {
    results: ConversationProps[];
  };
}

const useChatContact = (page = 1, pageSize = 10, sortColumn = "asc") => {
  const fetcher = async (): Promise<ConversationProps[]> => {
    try {
      const url = buildListingsUrl(
        `${CHAT_ENDPOINTS.contacts}?page=${encodeURIComponent(
          page
        )}&pageSize=${encodeURIComponent(
          pageSize
        )}&sortColumn=${encodeURIComponent(sortColumn)}`
      );
      const data = await authGet<ChatContactsResponse>(url);

      if (!data?.data?.results) {
        throw new Error("Invalid response format");
      }

      return data.data.results as ConversationProps[];
    } catch (error) {
      console.error("Error fetching chat contacts:", error);
      toast.error("Failed to load conversations");
      throw error;
    }
  };

  const apiUrl = useMemo(
    () => (page && pageSize && sortColumn ? `chat-contacts-${page}-${pageSize}-${sortColumn}` : null),
    [page, pageSize, sortColumn]
  );

  const {
    data: chatContactsData,
    error: chatContactsError,
    isLoading: isLoadingChatContacts,
    mutate,
  } = useSWR<ConversationProps[]>(apiUrl, fetcher, {
    refreshInterval: 5000,
    dedupingInterval: 2000,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    keepPreviousData: true,
    revalidateIfStale: false,
    shouldRetryOnError: true,
    errorRetryCount: 3,
    errorRetryInterval: 5000,
  });

  return {
    chatContactsData,
    chatContactsError,
    isLoadingChatContacts,
    mutate,
  };
};

export default useChatContact;
