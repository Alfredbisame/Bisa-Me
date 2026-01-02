# Products Components

This directory contains all components related to product listing, display, and grid/pagination logic, including featured and trending products, product cards, and loading skeletons.

## Directory Structure

```
Products/
├── ProductCard.tsx         # Card component for displaying a single product
├── ProductGrid.tsx         # Grid layout and pagination for products
├── AllProducts .tsx        # Main all-products listing page/component
├── FeaturedProducts.tsx    # Section for featured products (API + grid)
├── TrendingProducts.tsx    # Section for trending products (API + grid)
├── SearchSort.tsx          # Search/sort bar (uses ShopSideBar components)
├── loading.tsx             # Skeleton loaders for product grid/cards
```

## Component Overview

### Core Components

- **ProductCard.tsx**  
  Displays a single product with image, name, price, rating, reviews, badge, and location. Handles image fallback and click navigation to product details.

- **ProductGrid.tsx**  
  Renders a paginated grid of `ProductCard` components. Includes pagination controls and smooth scrolling to active page.

- **AllProducts .tsx**  
  Main all-products listing page/component. Handles pagination, default product data, and passes products to `ProductGrid`.

- **FeaturedProducts.tsx**  
  Fetches and displays a grid of featured products from the API. Handles loading, error, and empty states. Includes navigation to all featured products.

- **TrendingProducts.tsx**  
  Fetches and displays a grid of trending products from the API. Handles loading, error, and empty states. Includes navigation to all trending products.

- **SearchSort.tsx**  
  Renders a search/sort bar (uses `SortDropdown` from ShopSideBar). Can be extended to include search functionality.

- **loading.tsx**  
  Contains skeleton loaders for product cards and grid, used during data fetching or SSR/CSR transitions.

## Usage Example

```tsx
import AllProducts from './components/Products/AllProducts ';

export default function ProductsPage() {
  return <AllProducts products={products} />;
}
```

## Extending & Maintaining

- **Add new product sections:**  
  Add new components for other product categories or features.
- **Change API endpoints:**  
  Update fetch URLs in `FeaturedProducts.tsx` and `TrendingProducts.tsx`.
- **Customize UI:**  
  All components use Tailwind CSS. Adjust classes or add new styles as needed.
- **Improve search/sort:**  
  Extend `SearchSort.tsx` to include a search bar or more sorting options.

## Best Practices

- **Handle loading, error, and empty states** gracefully in all product sections.
- **Use reusable components** (e.g., `ProductCard`, `ProductGrid`) for consistency.
- **Test all features** for both desktop and mobile layouts.

## Contribution Guidelines

- Follow the existing component and prop patterns.
- Document any new features or changes in this README.
- Test all changes for usability and responsiveness.

--- 