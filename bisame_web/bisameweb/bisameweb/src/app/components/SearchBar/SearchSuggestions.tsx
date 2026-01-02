'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { FaSearch, FaSpinner, FaClock, FaTimes } from 'react-icons/fa';
import { HiOutlineSparkles, HiOutlineTrendingUp } from 'react-icons/hi';
import useSWR from 'swr';
import axios from 'axios';

// Define types
interface SuggestionItem {
  _id?: { $oid: string };
  id?: string;
  name: string;
}

interface ApiResponse {
  success: boolean;
  suggestions?: SuggestionItem[];
  message?: string;
  count?: number;
  query?: string;
}

interface SearchSuggestionsProps {
  query: string;
  isVisible: boolean;
  onSuggestionClick: (suggestion: string) => void;
  onClose: () => void;
  className?: string;
  maxSuggestions?: number;
}

// Fetcher function
const fetcher = async (url: string): Promise<ApiResponse> => {
  const response = await axios.get(url, { timeout: 8000 });
  return response.data;
};

// Highlight matched text with modern styling
const highlightMatch = (text: string, query: string): React.ReactNode => {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);
  return parts.filter(Boolean).map((part, index) => (
    regex.test(part) ? (
      <mark key={index} className="bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-700 font-semibold px-1 rounded-sm">
        {part}
      </mark>
    ) : part
  ));
};

export default function SearchSuggestions({
  query,
  isVisible,
  onSuggestionClick,
  onClose,
  className = '',
  maxSuggestions = 200
}: SearchSuggestionsProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Debounce query input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 150);
    return () => clearTimeout(timer);
  }, [query]);

  // Load recent searches
  useEffect(() => {
    try {
      const saved = localStorage.getItem('bisame_recent_searches');
      setRecentSearches(saved ? JSON.parse(saved) : []);
    } catch (err) {
      console.error('Failed to load recent searches:', err);
      setRecentSearches([]);
    }
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isVisible, onClose]);

  // Only fetch if query is valid
  const shouldFetch = debouncedQuery.trim().length >= 1;
  const apiUrl = shouldFetch ? `/api/searchsuggestion?q=${encodeURIComponent(debouncedQuery.trim())}` : null;

  // Use SWR to fetch suggestions
  const { data, error, isLoading } = useSWR<ApiResponse>(
    apiUrl,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: true,
      dedupingInterval: 0
    }
  );

  // Extract suggestions from API response
  const suggestions = data?.success && data.suggestions ? data.suggestions : [];
  const displayedSuggestions = suggestions.slice(0, maxSuggestions);

  // Handle suggestion click
  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      const trimmed = suggestion.trim();
      const updated = [
        trimmed,
        ...recentSearches.filter((s) => s !== trimmed)
      ].slice(0, 5);
      setRecentSearches(updated);
      try {
        localStorage.setItem('bisame_recent_searches', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save recent searches:', err);
      }
      onSuggestionClick(trimmed);
      setSelectedIndex(-1);
    },
    [recentSearches, onSuggestionClick]
  );

  // Clear recent searches
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('bisame_recent_searches');
    } catch (err) {
      console.error('Failed to clear recent searches:', err);
    }
  }, []);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && scrollContainerRef.current) {
      const selectedElement = scrollContainerRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  }, [selectedIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isVisible) return;
      const totalItems = shouldFetch ? displayedSuggestions.length : recentSearches.length;
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1));
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0) {
            if (shouldFetch && displayedSuggestions[selectedIndex]) {
              handleSuggestionClick(displayedSuggestions[selectedIndex].name);
            } else if (!shouldFetch && recentSearches[selectedIndex]) {
              handleSuggestionClick(recentSearches[selectedIndex]);
            }
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handler);
      return () => document.removeEventListener('keydown', handler);
    }
  }, [isVisible, displayedSuggestions, recentSearches, selectedIndex, shouldFetch, handleSuggestionClick, onClose]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(-1);
  }, [debouncedQuery]);

  if (!isVisible) return null;

  return (
    <div 
      ref={suggestionsRef} 
      className={`absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-lg border border-gray-200/50 rounded-2xl shadow-2xl z-50 overflow-hidden transition-all duration-200 ${className}`}
      style={{
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)'
      }}
    >
      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-3 text-orange-500">
            <FaSpinner className="animate-spin text-lg" />
            <span className="text-sm font-medium">Searching...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-6 text-center">
          <div className="text-red-500 mb-2">
            <HiOutlineSparkles className="w-6 h-6 mx-auto" />
          </div>
          <p className="text-red-600 text-sm font-medium">Unable to load suggestions</p>
          <p className="text-gray-500 text-xs mt-1">Please try again</p>
        </div>
      )}

      {/* Recent Searches */}
      {!shouldFetch && !isLoading && recentSearches.length > 0 && (
        <div className="border-b border-gray-100">
          <div className="px-5 py-3 flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100/50">
            <div className="flex items-center gap-2 text-gray-600">
              <FaClock className="text-sm" />
              <span className="text-sm font-semibold">Recent Searches</span>
            </div>
            <button 
              onClick={clearRecentSearches}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors duration-200 flex items-center gap-1 hover:bg-red-50 px-2 py-1 rounded-lg"
            >
              <FaTimes className="text-xs" />
              Clear
            </button>
          </div>
          <div 
            ref={scrollContainerRef}
            className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
          >
            {recentSearches.map((search, i) => (
              <button
                key={`recent-${i}`}
                onClick={() => handleSuggestionClick(search)}
                className={`block w-full text-left px-5 py-3 transition-all duration-150 hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 group ${
                  selectedIndex === i ? 'bg-gradient-to-r from-orange-100 to-yellow-100 border-r-2 border-orange-400' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <FaClock className="text-gray-400 text-sm group-hover:text-orange-500 transition-colors" />
                  <span className="text-gray-700 group-hover:text-gray-900 font-medium">{search}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {!isLoading && !error && shouldFetch && displayedSuggestions.length > 0 && (
        <div>
          <div className="px-5 py-3 bg-gradient-to-r from-orange-50 to-yellow-50 border-b border-orange-100">
            <div className="flex items-center gap-2 text-orange-700">
              <HiOutlineTrendingUp className="text-sm" />
              <span className="text-sm font-semibold">
                Suggestions ({suggestions.length > maxSuggestions ? `${maxSuggestions} of ${suggestions.length}` : suggestions.length})
              </span>
            </div>
          </div>
          <div 
            ref={!shouldFetch ? undefined : scrollContainerRef}
            className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-transparent"
          >
            {displayedSuggestions.map((suggestion, i) => (
              <button
                key={suggestion.id || `suggestion-${i}`}
                onClick={() => handleSuggestionClick(suggestion.name)}
                className={`block w-full text-left px-4 py-3 transition-all duration-200 hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 group border-l-4 border-transparent hover:border-blue-500 ${
                  selectedIndex === i ? 'bg-gradient-to-r from-orange-100 to-yellow-100 border-r-2 border-orange-400' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <FaSearch className="text-gray-400 text-sm group-hover:text-orange-500 transition-colors" />
                  <span className="text-gray-700 group-hover:text-gray-900 font-medium">
                    {highlightMatch(suggestion.name, debouncedQuery)}
                  </span>
                </div>
              </button>
            ))}
            {suggestions.length > maxSuggestions && (
              <div className="px-5 py-3 text-center border-t border-gray-100 bg-gray-50/50">
                <p className="text-xs text-gray-500">
                  Showing {maxSuggestions} of {suggestions.length} results
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* No Results */}
      {!isLoading && !error && shouldFetch && suggestions.length === 0 && (
        <div className="p-8 text-center">
          <div className="text-gray-400 mb-3">
            <FaSearch className="w-8 h-8 mx-auto opacity-50" />
          </div>
          <p className="text-gray-600 font-medium mb-1">No results found</p>
          <p className="text-gray-400 text-sm">Try different keywords or check spelling</p>
        </div>
      )}

      {/* Empty State */}
      {!shouldFetch && !isLoading && recentSearches.length === 0 && (
        <div className="p-8 text-center">
          <div className="text-gray-400 mb-3">
            <HiOutlineSparkles className="w-8 h-8 mx-auto opacity-50" />
          </div>
          <p className="text-gray-600 font-medium mb-1">Start your search</p>
          <p className="text-gray-400 text-sm">Type to see suggestions and results</p>
        </div>
      )}
    </div>
  );
}
