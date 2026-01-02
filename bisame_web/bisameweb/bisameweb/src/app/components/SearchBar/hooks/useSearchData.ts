import { useState, FormEvent, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import type { SearchResult } from "../types";

interface UseSearchDataOptions {
  defaultLocation?: string;
  navigateOnSearch?: boolean;
  onSearchResults?: (results: SearchResult[]) => void;
  onSearchError?: (error: string) => void;
}

export const useSearchData = ({
  defaultLocation: _defaultLocation,
  navigateOnSearch,
  onSearchResults: _onSearchResults,
  onSearchError,
}: UseSearchDataOptions) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSuggestionsVisible, setIsSuggestionsVisible] =
    useState<boolean>(false);
  const [manualError, setManualError] = useState<string>("");
  const router = useRouter();

  // Use refs for callbacks to avoid recreating functions
  const onSearchErrorRef = useRef(onSearchError);
  const navigateOnSearchRef = useRef(navigateOnSearch);

  // Update refs when props change (doesn't cause re-render)
  onSearchErrorRef.current = onSearchError;
  navigateOnSearchRef.current = navigateOnSearch;

  // Stable callback - no dependencies
  const handleInputChange = useCallback((value: string) => {
    setSearchTerm(value);
    setIsSuggestionsVisible(value.trim().length > 0);
    setManualError("");
  }, []);

  // Stable callback - uses refs instead of direct dependencies
  const performSearch = useCallback(
    async (term: string) => {
      if (!term.trim()) {
        const errorMsg = "Please enter a search term";
        setManualError(errorMsg);
        onSearchErrorRef.current?.(errorMsg);
        return;
      }

      setManualError("");

      if (navigateOnSearchRef.current) {
        const searchParams = new URLSearchParams({
          query: term.trim(),
        });
        router.push(`/SearchPage?${searchParams.toString()}`);
        setIsSuggestionsVisible(false);
        return;
      }
    },
    [router] // Only router dependency
  );

  const handleSearch = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await performSearch(searchTerm);
    },
    [performSearch, searchTerm]
  );

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      setSearchTerm(suggestion);
      setIsSuggestionsVisible(false);
      performSearch(suggestion);
    },
    [performSearch]
  );

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    setIsSuggestionsVisible(false);
    setManualError("");
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    isLoading: false,
    error: manualError,
    setError: setManualError,
    isSuggestionsVisible,
    setIsSuggestionsVisible,
    handleSearch,
    handleSuggestionClick,
    handleInputChange,
    retrySearch: () => {},
    clearSearch,
    isValidating: false,
  };
};
