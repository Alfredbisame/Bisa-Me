"use client";

import { useEffect, useRef, useCallback, memo } from "react";
import { FaSearch, FaTimes, FaArrowLeft } from "react-icons/fa";
import { ErrorMessage } from "./";
import SearchSuggestions from "../SearchSuggestions";
import { useSearchData } from "../hooks";
import { SearchBarProps } from "../types";
import usePopularData from "../hooks/usePopularData";

interface MobileSearchModalProps extends Omit<SearchBarProps, "className"> {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSearchModal: React.FC<MobileSearchModalProps> = ({
  isOpen,
  onClose,
  onSearchError,
  placeholder = "Search for anything...",
  defaultLocation = "Ghana",
  navigateOnSearch = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get popular searches from api from custom hook
  const { getData } = usePopularData();

  // Use the same search logic as the main SearchBar
  const {
    searchTerm,
    isLoading,
    error,
    isSuggestionsVisible,
    setIsSuggestionsVisible,
    handleSearch,
    handleSuggestionClick,
    handleInputChange,
  } = useSearchData({
    defaultLocation,
    navigateOnSearch,
    onSearchError,
  });

  // Memoized handlers
  const handleSearchClick = useCallback(() => {
    const form = document.getElementById(
      "mobile-search-form"
    ) as HTMLFormElement;
    if (form) {
      form.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  }, []);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearchClick();
      }
      if (e.key === "Escape") {
        onClose();
      }
    },
    [handleSearchClick, onClose]
  );

  const handleClearInput = useCallback(() => {
    handleInputChange("");
  }, [handleInputChange]);

  const handleCloseSuggestions = useCallback(() => {
    setIsSuggestionsVisible(false);
  }, [setIsSuggestionsVisible]);

  const handlePopularSearchClick = useCallback(
    (term: string) => {
      handleInputChange(term);
      handleSuggestionClick(term);
      onClose();
    },
    [handleInputChange, handleSuggestionClick, onClose]
  );

  const handleSuggestionClickWithClose = useCallback(
    (suggestion: string) => {
      handleSuggestionClick(suggestion);
      onClose();
    },
    [handleSuggestionClick, onClose]
  );

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close modal on outside click and prevent body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Close suggestions when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsSuggestionsVisible(false);
    }
  }, [isOpen, setIsSuggestionsVisible]);

  // Wrap the original handleSearch so we can close the modal after searching
  const handleFormSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        const res = handleSearch(e as any);
        await Promise.resolve(res);
      } catch (err) {
        // parent handler should surface errors via onSearchError; ignore here
      } finally {
        onClose();
      }
    },
    [handleSearch, onClose]
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 bg-black/20 backdrop-blur-sm z-40
          transition-opacity duration-300 ease-out
          ${isOpen ? "opacity-100" : "opacity-0"}
        `}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={`
          fixed top-0 left-0 right-0 bg-white shadow-2xl z-50
          transform transition-all duration-300 ease-out
          ${
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Close search"
          >
            <FaArrowLeft className="text-gray-600 text-lg" />
          </button>

          <h2 className="text-lg font-semibold text-gray-800">Search</h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Close search"
          >
            <FaTimes className="text-gray-600 text-lg" />
          </button>
        </div>

        {/* Search Form */}
        <div className="p-4">
          <form
            id="mobile-search-form"
            onSubmit={handleFormSubmit}
            className="relative"
          >
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <FaSearch size={15} className="text-gray-400 text-lg" />
              </div>

              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={placeholder}
                disabled={isLoading}
                className={`
                  w-full pl-12 pr-4 py-2 text-sm rounded-xl bg-gray-50 text-gray-800
                  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200
                  ${error ? "ring-2 ring-red-500" : ""}
                `}
                aria-label="Search input"
              />

              {/* Clear button */}
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearInput}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
                  aria-label="Clear search"
                >
                  <FaTimes className="text-gray-400 text-sm" />
                </button>
              )}
            </div>

            <ErrorMessage error={error} />

            {/* Search Suggestions */}
            {isSuggestionsVisible && searchTerm && (
              <div className="mt-4 hidden">
                <SearchSuggestions
                  query={searchTerm}
                  isVisible={isSuggestionsVisible}
                  onSuggestionClick={handleSuggestionClickWithClose}
                  onClose={handleCloseSuggestions}
                  className="rounded-xl shadow-lg border border-gray-100"
                  maxSuggestions={8}
                />
              </div>
            )}
          </form>
        </div>

        {/* Popular Searches */}
        {!searchTerm && getData && (
          <div className="px-4 pb-6">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Popular Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {getData.map((term: string) => (
                  <button
                    key={term}
                    onClick={() => handlePopularSearchClick(term)}
                    className="px-4 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors duration-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default memo(MobileSearchModal);
