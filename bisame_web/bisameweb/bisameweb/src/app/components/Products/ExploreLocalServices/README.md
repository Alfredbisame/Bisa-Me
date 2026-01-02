# FeaturedProducts Component

A modular, refactored version of the FeaturedProducts component with separated concerns and reusable components.

## Structure

```
FeaturedProducts/
├── components/
│   ├── FeaturedHeader.tsx          # Header component with title and view all link
│   ├── LoadingSkeleton.tsx         # Loading state skeleton
│   ├── ErrorState.tsx              # Error handling component
│   ├── StarRating.tsx              # Star rating display component
│   ├── FeaturedProductCard.tsx     # Individual featured product card
│   ├── FeaturedProductGrid.tsx     # Grid layout for featured products
│   └── index.ts                    # Component exports
├── hooks/
│   ├── useFeaturedProducts.ts      # Custom hook for data fetching
│   ├── useProductNavigation.ts     # Custom hook for navigation
│   └── index.ts                    # Hook exports
├── types.ts                        # TypeScript interfaces and types
├── FeaturedProducts.tsx            # Main component
└── README.md                       # This file
```

## Components

### FeaturedProducts (Main Component)
The main component that orchestrates all other components and hooks.

**Props:**
- `maxProducts?: number` - Maximum number of products to display (default: 10)
- `showHeader?: boolean` - Whether to show the header (default: true)
- `showViewAllLink?: boolean` - Whether to show the "Browse All Featured" link (default: true)

### FeaturedHeader
Displays the "Featured ads" title and optional "Browse All Featured" link.

### LoadingSkeleton
Shows a loading skeleton while data is being fetched.

### ErrorState
Displays error message with retry functionality.

### StarRating
Reusable component for displaying star ratings with optional label.

### FeaturedProductCard
Individual featured product card with:
- Promoted badge (if applicable)
- Product image
- Star rating
- Title and description
- Location and price
- Hover effects and animations

### FeaturedProductGrid
Grid layout container for featured product cards with responsive design.

## Hooks

### useFeaturedProducts
Custom hook that handles data fetching using SWR with caching and error handling.

### useProductNavigation
Custom hook that handles product click navigation and localStorage management.

## Types

All TypeScript interfaces are defined in `types.ts`:
- `ProductImage` - Product image structure
- `Product` - Product data structure with promoted flag
- `FeaturedProductsProps` - Main component props
- `FeaturedProductCardProps` - Product card props
- `FeaturedHeaderProps` - Header component props
- `LoadingSkeletonProps` - Loading skeleton props
- `StarRatingProps` - Star rating component props

## Usage

```tsx
import FeaturedProducts from './FeaturedProducts/FeaturedProducts';

// Basic usage
<FeaturedProducts />

// With custom props
<FeaturedProducts 
  maxProducts={8} 
  showHeader={true} 
  showViewAllLink={false} 
/>
```

## Key Features

1. **Promoted Badge**: Shows "PROMOTED" badge for featured products
2. **Star Rating**: Displays 5-star rating with "New" label
3. **Responsive Design**: Adapts to different screen sizes
4. **Hover Effects**: Smooth animations and visual feedback
5. **Error Handling**: Graceful error states with retry functionality
6. **Loading States**: Skeleton loading for better UX

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
- Uses React Icons for icons (FaStar, FaMapMarkerAlt, FaArrowRight) 