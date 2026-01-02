# SavedProducts Components

This directory contains all components, hooks, and types related to displaying, managing, and interacting with a user's saved products (wishlist/favorites) in the application.

## Directory Structure

```
SavedProducts/
├── SavedProducts.tsx         # Main saved products page (orchestrator)
├── SavedProductsHeader.tsx   # Header for the saved products section
├── SavedProductsGrid.tsx     # Grid layout for displaying saved product cards
├── SavedProductCard.tsx      # Card component for a single saved product
├── EmptySavedProducts.tsx    # Empty state when no products are saved
├── useSavedData.ts           # Custom hook for fetching and mapping saved products data
```

## Component & Hook Overview

### Core Components

- **SavedProducts.tsx**  
  Main orchestrator for the saved products section. Handles loading, error, and empty states. Renders the header, grid, and manages product deletion and navigation.

- **SavedProductsHeader.tsx**  
  Displays the section title and the count of saved products.

- **SavedProductsGrid.tsx**  
  Renders a responsive grid of `SavedProductCard` components.

- **SavedProductCard.tsx**  
  Displays product image, name, description, location, price, and a delete button. Handles product click and delete actions.

- **EmptySavedProducts.tsx**  
  Shown when the user has no saved products. Encourages browsing and saving items.

### Hooks & Types

- **useSavedData.ts**  
  Custom React hook using SWR to fetch saved products from `/api/Dashboard/Saved`. Maps raw API data to a normalized product structure and handles loading/error states.

  Example type definitions:
  ```ts
  interface SavedProduct {
    id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
    reviews: number;
    location: string;
    description: string;
    badge?: {
      text: string;
      color: string;
    };
  }
  interface SavedResponse {
    products: SavedProduct[];
    totalCount: number;
  }
  ```

## Usage Example

```tsx
import SavedProducts from './components/SavedProducts/SavedProducts';

export default function WishlistPage() {
  return <SavedProducts />;
}
```

## Extending & Maintaining

- **Add new product fields:**  
  Update the `SavedProduct` interface in `useSavedData.ts` and adjust components as needed.
- **Change API endpoints:**  
  Update fetch URLs in `useSavedData.ts`.
- **Customize UI:**  
  All components use Tailwind CSS. Adjust classes or add new styles as needed.
- **Improve grid, filtering, or sorting:**  
  Update logic in `SavedProductsGrid.tsx` and related components.

## Best Practices

- **Keep types in sync** with backend API responses.
- **Handle loading, error, and empty states** gracefully in all components.
- **Use reusable components** for consistency.
- **Test all features** for both desktop and mobile layouts.

## Contribution Guidelines

- Follow the existing component, hook, and type patterns.
- Document any new features or changes in this README.
- Test all changes for usability and responsiveness.

--- 