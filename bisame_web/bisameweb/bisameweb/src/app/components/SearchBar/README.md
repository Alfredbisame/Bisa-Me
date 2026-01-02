# SearchBar Components

This directory contains all components related to the search bar and search suggestions functionality, enabling users to search for products, categories, or other entities with real-time suggestions and navigation.

## Directory Structure

```
SearchBar/
├── SearchBar.tsx           # Main search bar component (refactored)
├── SearchSuggestions.tsx   # Dropdown for real-time search suggestions
├── types.ts               # TypeScript type definitions
├── index.ts               # Main module exports
├── components/            # Sub-components directory
│   ├── SearchInput.tsx    # Search input field component
│   ├── SearchButton.tsx   # Search button component
│   ├── ErrorMessage.tsx   # Error message display component
│   └── index.ts          # Component exports
├── hooks/                 # Custom hooks directory
│   ├── useSearchData.ts   # Search logic and API calls hook
│   └── index.ts          # Hook exports
└── README.md             # This documentation
```

## Component Overview

### Core Components

- **SearchBar.tsx** (Refactored)  
  Main container component that orchestrates all search functionality. Now uses modular sub-components and custom hooks for better separation of concerns. Handles form submission, outside click detection, and coordinates between sub-components.

  **Key Props:**
  - `onSearchResults?`: Callback for handling search results inline (optional)
  - `onSearchError?`: Callback for handling search errors (optional)
  - `placeholder?`: Custom placeholder text
  - `defaultLocation?`: Default location for search queries
  - `className?`: Custom CSS classes
  - `navigateOnSearch?`: If true, navigates to search page; if false, handles results inline

- **SearchSuggestions.tsx**  
  Dropdown component that fetches and displays real-time search suggestions as the user types. Handles keyboard navigation, recent searches, and suggestion highlighting. Uses SWR and Axios for fetching suggestions from `/api/searchsuggestion`.

### Sub-Components

- **SearchInput.tsx**  
  Dedicated input field component with proper styling and event handling.
  
- **SearchButton.tsx**  
  Search button component with loading states and proper accessibility.
  
- **ErrorMessage.tsx**  
  Error message display component with conditional rendering.

### Custom Hooks

- **useSearchData.ts**  
  Custom hook that encapsulates all search-related logic including:
  - State management (search term, loading, errors, suggestions visibility)
  - API calls and error handling
  - Navigation logic
  - Input change handling
  - Suggestion click handling

## Types (types.ts)

Comprehensive type definitions for all components:

```ts
interface SearchResult {
  id: string;
  title: string;
  description?: string;
  price?: number;
  location?: string;
  image?: string;
  category?: string;
}

interface SearchBarProps {
  onSearchResults?: (results: SearchResult[]) => void;
  onSearchError?: (error: string) => void;
  placeholder?: string;
  defaultLocation?: string;
  className?: string;
  navigateOnSearch?: boolean;
}

interface SuggestionItem {
  _id?: { $oid: string };
  id?: string;
  name: string;
}
```

## Usage Example

```tsx
import SearchBar from './components/SearchBar/SearchBar';

export default function HomePage() {
  return (
    <div className="w-full flex justify-center mt-8">
      <SearchBar placeholder="Search for products, categories..." />
    </div>
  );
}
```

## Extending & Maintaining

- **Add new search result fields:**  
  Update the `SearchResult` interface in `SearchBar.tsx` and adjust usage as needed.
- **Change API endpoints:**  
  Update fetch URLs in `SearchBar.tsx` and `SearchSuggestions.tsx`.
- **Customize UI:**  
  All components use Tailwind CSS. Adjust classes or add new styles as needed.
- **Improve suggestion ranking or filtering:**  
  Update logic in `SearchSuggestions.tsx`.

## Best Practices

- **Keep types in sync** with backend API responses.
- **Handle loading, error, and empty states** gracefully in all components.
- **Use debouncing and SWR** for efficient API calls and caching.
- **Test all features** for both desktop and mobile layouts.

## Contribution Guidelines

- Follow the existing component and type patterns.
- Document any new features or changes in this README.
- Test all changes for usability and responsiveness.

--- 