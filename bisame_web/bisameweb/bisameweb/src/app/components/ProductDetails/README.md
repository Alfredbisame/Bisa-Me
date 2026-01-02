# ProductDetails Components

This directory contains all components, hooks, and types related to the product details page, including product information, images, reviews, seller info, related products, and supporting utilities.

## Directory Structure

```
ProductDetails/
├── ProductDetail.tsx                # Main product details page orchestrator
├── ProductInformation.tsx           # Main product info section (tabs, seller, description)
├── ProductInfo.tsx                  # Summary info (title, price, etc.)
├── AdditionalInformation.tsx        # Extra product details/specs
├── ProductActionButtons.tsx         # Action buttons (contact, save, follow, etc.)
├── MainImageDisplay.tsx             # Main product image display
├── ThumbnailNavigation.tsx          # Thumbnail navigation for images
├── ProductImageGallery.tsx          # Image gallery modal
├── FullscreenModal.tsx              # Fullscreen modal for images
├── ViewsAndFollow.tsx               # Views and follow count display
├── Views.tsx                        # Views count display
├── Follow.tsx                       # Follow/unfollow button
├── SaveIcon.tsx                     # Save/favorite icon
├── Reviews.tsx                      # Product reviews section
├── WriteReviewButton.tsx            # Button/modal for writing a review
├── RelatedProducts.tsx              # Section for related products
├── ErrorDisplay.tsx                 # Error message display
├── LoadingSkeleton.tsx              # Skeleton loader for product details
├── types.ts                         # TypeScript types for product details
├── index.ts                         # Barrel file for exports
├── hooks/                           # Custom hooks for product details
├── utils/                           # Utility functions (e.g., image utils)
├── ProductInformation/              # Subcomponents for product info tabs, seller, etc.
├── RelatedProducts/                 # Related products section (components, hooks, utils)
```

## Component & Hook Overview

### Core Components

- **ProductDetail.tsx**  
  Main orchestrator for the product details page. Handles data fetching, layout, and renders all subcomponents (images, info, actions, reviews, related products, etc.).

- **ProductInformation.tsx**  
  Main section for product information, including tab navigation, seller info, and product description/specs.

- **ProductInfo.tsx**  
  Displays summary info (title, price, location, etc.).

- **AdditionalInformation.tsx**  
  Shows extra product details/specs.

- **ProductActionButtons.tsx**  
  Renders action buttons (contact seller, save, follow, etc.).

- **MainImageDisplay.tsx, ThumbnailNavigation.tsx, ProductImageGallery.tsx, FullscreenModal.tsx**  
  Components for displaying and navigating product images, including fullscreen and modal views.

- **ViewsAndFollow.tsx, Views.tsx, Follow.tsx, SaveIcon.tsx**  
  Components for displaying and interacting with views, follows, and saves.

- **Reviews.tsx, WriteReviewButton.tsx**  
  Product reviews section and button/modal for writing a review.

- **RelatedProducts.tsx**  
  Section for displaying related products, with its own subcomponents, hooks, and utils.

- **ErrorDisplay.tsx, LoadingSkeleton.tsx**  
  Error and loading state components for the product details page.

### Hooks & Types

- **hooks/**  
  Custom React hooks for product details, e.g.:
  - `useProductData.ts`: Fetches product data
  - `useImageGallery.ts`: Manages image gallery state
  - `useSellerData.ts`, `useSellerProducts.ts`: Fetches seller info and products

- **types.ts**  
  TypeScript types for product details, reviews, seller, etc.

- **utils/**  
  Utility functions for image URLs and other helpers.

### ProductInformation Subdirectory

- **ProductInformation/**  
  Subcomponents for product info tabs, seller info, description, report, etc.

### RelatedProducts Subdirectory

- **RelatedProducts/**  
  Section for related products, with its own components, hooks, and utils:
  - `RelatedProducts.tsx`: Main related products section
  - `components/`: Product grid, card, loading/error/empty states
  - `hooks/`: Data fetching for related products
  - `utils/`: Helpers for related products
  - `types.ts`: Types for related products

## Usage Example

```tsx
import ProductDetail from './components/ProductDetails/ProductDetail';

export default function ProductPage() {
  return <ProductDetail productId={productId} />;
}
```

## Extending & Maintaining

- **Add new product info or actions:**  
  Add or update components in the main directory or `ProductInformation/`.
- **Change API endpoints:**  
  Update fetch URLs in hooks (e.g., `useProductData.ts`).
- **Customize UI:**  
  All components use Tailwind CSS. Adjust classes or add new styles as needed.
- **Add new related product logic:**  
  Extend the `RelatedProducts/` section as needed.

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