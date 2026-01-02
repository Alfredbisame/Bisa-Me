# Affiliate Components

This directory contains the refactored affiliate management components, organized for better maintainability, reusability, and separation of concerns.

## Structure

```
Affiliate/
├── components/           # Reusable UI components
│   ├── AffiliateHeader.tsx
│   ├── AffiliateSearchFilters.tsx
│   ├── AffiliateTable.tsx
│   ├── AffiliateTableRow.tsx
│   ├── AffiliateEmptyState.tsx
│   ├── AffiliateLoadingState.tsx
│   ├── AffiliateErrorState.tsx
│   └── index.ts
├── hooks/               # Custom hooks for business logic
│   ├── useAffiliateFilters.ts
│   ├── useAffiliateImageManager.ts
│   └── index.ts
├── AffiliateTab.tsx     # Main component (orchestrator)
├── AffiliateManager.tsx
├── InviteFriendTab.tsx
├── RevenueTab.tsx
├── ShareButtons.tsx
├── types.ts
├── useAffiliateData.ts
└── README.md
```

## Components

### Core Components

#### `AffiliateTab.tsx`
The main orchestrator component that combines all smaller components and hooks. It handles the overall layout and state management.

#### `AffiliateHeader.tsx`
Displays the section title, description, and affiliate count. Reusable for any affiliate-related section.

**Props:**
- `totalAffiliates: number` - Total number of affiliates
- `filteredCount: number` - Number of affiliates after filtering

#### `AffiliateSearchFilters.tsx`
Handles search input and sorting controls. Completely self-contained with its own styling.

**Props:**
- `searchTerm: string` - Current search term
- `sortBy: 'name' | 'date'` - Current sort field
- `sortOrder: 'asc' | 'desc'` - Current sort order
- `onSearchChange: (e: ChangeEvent) => void` - Search change handler
- `onSort: (field: 'name' | 'date') => void` - Sort change handler
- `onClearSearch: () => void` - Clear search handler

#### `AffiliateTable.tsx`
Renders the table structure with headers and maps through affiliate rows.

**Props:**
- `affiliates: AffiliateUser[]` - Array of affiliates to display
- `imgSrcMap: Record<string, string>` - Image source mapping for fallbacks
- `onImageError: (name: string) => void` - Image error handler

#### `AffiliateTableRow.tsx`
Individual table row component with avatar, name, date, and status.

**Props:**
- `affiliate: AffiliateUser` - Single affiliate data
- `imgSrcMap: Record<string, string>` - Image source mapping
- `onImageError: (name: string) => void` - Image error handler

### State Components

#### `AffiliateLoadingState.tsx`
Displays loading spinner and message. Reusable across the application.

#### `AffiliateErrorState.tsx`
Displays error message with retry button.

**Props:**
- `error: string` - Error message to display

#### `AffiliateEmptyState.tsx`
Displays when no affiliates are found, with search-specific messaging.

**Props:**
- `searchTerm: string` - Current search term
- `onClearSearch: () => void` - Clear search handler

## Hooks

### `useAffiliateFilters.ts`
Custom hook that handles all filtering, sorting, and pagination logic.

**Parameters:**
- `affiliates: AffiliateUser[]` - Array of affiliates to filter
- `itemsPerPage?: number` - Items per page (default: 10)

**Returns:**
- `searchTerm: string` - Current search term
- `sortBy: 'name' | 'date'` - Current sort field
- `sortOrder: 'asc' | 'desc'` - Current sort order
- `currentPage: number` - Current page number
- `filteredAndSortedAffiliates: AffiliateUser[]` - Filtered and sorted results
- `paginatedAffiliates: AffiliateUser[]` - Current page results
- `totalPages: number` - Total number of pages
- `handleSearchChange: (e: ChangeEvent) => void` - Search handler
- `handleSort: (field: 'name' | 'date') => void` - Sort handler
- `handlePageChange: (page: number) => void` - Page change handler
- `clearSearch: () => void` - Clear search handler

### `useAffiliateImageManager.ts`
Custom hook that manages image loading and error handling for affiliate avatars.

**Returns:**
- `imgSrcMap: Record<string, string>` - Image source mapping
- `handleImageError: (name: string) => void` - Image error handler

## Benefits of This Refactor

1. **Separation of Concerns**: Each component has a single responsibility
2. **Reusability**: Components can be used in other parts of the application
3. **Testability**: Smaller components are easier to unit test
4. **Maintainability**: Changes to one component don't affect others
5. **Developer Experience**: Clear component structure and documentation
6. **Performance**: Better memoization opportunities with smaller components
7. **Type Safety**: Strong TypeScript interfaces for all props

## Usage Example

```tsx
import { AffiliateTab } from './components/Affiliate';

// The main component handles everything internally
<AffiliateTab />

// Or use individual components for custom layouts
import { 
  AffiliateHeader, 
  AffiliateSearchFilters, 
  AffiliateTable 
} from './components/Affiliate/components';
import { useAffiliateFilters } from './components/Affiliate/hooks';

const CustomAffiliateSection = () => {
  const { affiliates } = useAffiliateData();
  const filterProps = useAffiliateFilters({ affiliates });
  
  return (
    <div>
      <AffiliateHeader {...headerProps} />
      <AffiliateSearchFilters {...filterProps} />
      <AffiliateTable {...tableProps} />
    </div>
  );
};
```
