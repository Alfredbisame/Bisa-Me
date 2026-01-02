# TrendingProducts Component

A modular, refactored version of the TrendingProducts component with separated concerns and reusable components.

## Structure

```
TrendingProducts/
├── components/
│   ├── TrendingHeader.tsx          # Header component with title and view all link
│   ├── LoadingSkeleton.tsx         # Loading state skeleton
│   ├── ErrorState.tsx              # Error handling component
│   ├── TrendingProductCard.tsx     # Individual product card
│   ├── TrendingProductGrid.tsx     # Grid layout for products
│   └── index.ts                    # Component exports
├── hooks/
│   ├── useTrendingProducts.ts      # Custom hook for data fetching
│   ├── useProductNavigation.ts     # Custom hook for navigation
│   └── index.ts                    # Hook exports
├── types.ts                        # TypeScript interfaces and types
├── TrendingProducts.tsx            # Main component
└── README.md                       # This file
```

## Components

### TrendingProducts (Main Component)
The main component that orchestrates all other components and hooks.

**Props:**
- `maxProducts?: number` - Maximum number of products to display (default: 16)
- `showHeader?: boolean` - Whether to show the header (default: true)
- `showViewAllLink?: boolean` - Whether to show the "Browse All Trending" link (default: true)

### TrendingHeader
Displays the "Trending" title and optional "Browse All Trending" link.

### LoadingSkeleton
Shows a loading skeleton while data is being fetched.

### ErrorState
Displays error message with retry functionality.

### TrendingProductCard
Individual product card with image, title, description, location, and price.

### TrendingProductGrid
Grid layout container for product cards.

## Hooks

### useTrendingProducts
Custom hook that handles data fetching using SWR with caching and error handling.

### useProductNavigation
Custom hook that handles product click navigation and localStorage management.

## Types

All TypeScript interfaces are defined in `types.ts`:
- `Product` - Product data structure
- `TrendingProductsProps` - Main component props
- `ProductCardProps` - Product card props
- `TrendingHeaderProps` - Header component props
- `LoadingSkeletonProps` - Loading skeleton props

## Usage

```tsx
import TrendingProducts from './TrendingProducts/TrendingProducts';

// Basic usage
<TrendingProducts />

// With custom props
<TrendingProducts 
  maxProducts={8} 
  showHeader={true} 
  showViewAllLink={false} 
/>
```

## Benefits of Refactoring

1. **Separation of Concerns**: Each component has a single responsibility
2. **Reusability**: Components can be reused in other parts of the application
3. **Maintainability**: Easier to maintain and update individual components
4. **Testability**: Each component can be tested independently
5. **Type Safety**: Strong TypeScript typing throughout
6. **Custom Hooks**: Logic is separated into reusable hooks
7. **Modular Structure**: Clear organization with dedicated directories

## Dependencies

- Uses `imageUtils.ts` from `ProductDetails/utils/` for image URL processing
- Uses SWR for data fetching and caching
- Uses Next.js Image component for optimized image loading
- Uses React Icons for icons 