
export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  price?: number;
  location?: string;
  image?: string;
  category?: string;
}

export interface SearchResponse {
  data?: SearchResult[];
  results?: SearchResult[];
  message?: string;
  error?: string;
}

export interface SearchBarProps {
  onSearchResults?: (results: SearchResult[]) => void;
  onSearchError?: (error: string) => void;
  placeholder?: string;
  defaultLocation?: string;
  className?: string;
  navigateOnSearch?: boolean;
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  disabled: boolean;
  hasError: boolean;
}

export interface SearchButtonProps {
  isLoading: boolean;
  disabled: boolean;
  onClick: () => void;
}

export interface ErrorMessageProps {
  error: string;
}

export interface UseSearchDataProps {
  defaultLocation: string;
  navigateOnSearch: boolean;
  onSearchResults?: (results: SearchResult[]) => void;
  onSearchError?: (error: string) => void;
}

export interface UseSearchDataReturn {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isLoading: boolean;
  error: string;
  setError: (error: string) => void;
  isSuggestionsVisible: boolean;
  setIsSuggestionsVisible: (visible: boolean) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleSuggestionClick: (suggestion: string) => void;
  handleInputChange: (value: string) => void;
  retrySearch: () => void;
  clearSearch: () => void;
  isValidating: boolean;
}

export interface MobileSearchModalProps extends Omit<SearchBarProps, 'className'> {
  isOpen: boolean;
  onClose: () => void;
}

export interface MobileSearchIconProps {
  onClick: () => void;
  className?: string;
}
