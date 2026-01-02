# ManagePost Components

This directory contains all components, hooks, and types related to managing user product posts, including tabs for different product states, product cards, and data fetching logic.

## Directory Structure

```
ManagePost/
├── ProductTabs.tsx       # Main tabbed interface for managing posts
├── ActiveProducts.tsx    # List of active products
├── ReviewProducts.tsx    # List of products under review
├── DeclinedProducts.tsx  # List of declined products
├── UpdateProducts.tsx    # List of recently updated products
├── ClosedProducts.tsx    # List of closed products
├── useMyPostData.ts      # Custom hook for fetching and mapping post data
├── types.ts              # TypeScript types for products and API response
```

## Component & Hook Overview

### Core Components

- **ProductTabs.tsx**  
  Main orchestrator for the manage post UI. Provides tab navigation for product states (Active, Review, Declined, Update, Closed) and renders the appropriate product list component for each tab.

- **ActiveProducts.tsx**  
  Displays a grid of active products. Handles loading, error, and empty states. Includes edit and close actions for each product.

- **ReviewProducts.tsx**  
  Displays products currently under review. Handles loading, error, and empty states. Includes edit and close actions.

- **DeclinedProducts.tsx**  
  Displays products that have been declined. Handles loading, error, and empty states. Includes edit and close actions.

- **UpdateProducts.tsx**  
  Displays products that have been recently updated. Handles loading, error, and empty states. Includes edit and close actions.

- **ClosedProducts.tsx**  
  Displays products that have been closed. Handles loading, error, and empty states. Includes a reactivate action for each product.

### Hooks & Types

- **useMyPostData.ts**  
  Custom React hook using SWR to fetch and map product data from `/api/Dashboard/MyPost`. Handles loading, error, and data mapping for all product states.

- **types.ts**  
  TypeScript types for product and API response, e.g.:
  ```ts
  export type TabType = 'ACTIVE' | 'REVIEW' | 'DECLINED' | 'UPDATE' | 'CLOSED';
  export interface Product {
    id: string;
    name: string;
    image: string;
    description: string;
    location: string;
    price: string;
    badge?: { text: string; color: string; };
  }
  export interface MyPostResponse {
    reviewing: Product[];
    active: Product[];
    update: Product[];
    declined: Product[];
    closed: Product[];
  }
  ```

## Usage Example

```tsx
import ProductTabs from './components/ManagePost/ProductTabs';

export default function MyPostsPage() {
  return <ProductTabs />;
}
```

## Extending & Maintaining

- **Add new product states:**  
  Update the `TabType` in `types.ts` and add new components as needed.
- **Change API endpoints:**  
  Update fetch URLs in `useMyPostData.ts`.
- **Customize UI:**  
  All components use Tailwind CSS. Adjust classes or add new styles as needed.
- **Implement real edit/close/reactivate logic:**  
  Replace the placeholder actions in product components with actual API calls.

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