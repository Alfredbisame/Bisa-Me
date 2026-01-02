# PurchaseHistory Components

This directory contains all components, hooks, and types related to displaying a user's purchase history, including tables, pagination, status badges, and data fetching logic.

## Directory Structure

```
PurchaseHistory/
├── PurchaseHistory.tsx        # Main purchase history page/component
├── PurchaseHistoryHeader.tsx  # Header for the purchase history section
├── PurchaseTable.tsx          # Table for displaying purchase records
├── PurchaseTableRow.tsx       # Row component for a single purchase record
├── PurchasePagination.tsx     # Pagination controls for the table
├── StatusBadge.tsx            # Badge for purchase status (Paid, Unpaid, etc.)
├── usePurchasesData.ts        # Custom hook for fetching purchase data
├── types.ts                   # TypeScript types for purchase records and API response
```

## Component & Hook Overview

### Core Components

- **PurchaseHistory.tsx**  
  Main orchestrator for the purchase history page. Handles loading, error, and empty states. Paginates purchase records and renders the table, header, and pagination controls.

- **PurchaseHistoryHeader.tsx**  
  Displays the section title and total number of purchases.

- **PurchaseTable.tsx**  
  Renders a table of purchase records using `PurchaseTableRow` for each row.

- **PurchaseTableRow.tsx**  
  Displays a single purchase record, including name, invoice ID, amount, status badge, and formatted date/time.

- **PurchasePagination.tsx**  
  Pagination controls for navigating between pages of purchase records. Shows current page, total pages, and allows navigation.

- **StatusBadge.tsx**  
  Displays a colored badge for the purchase status (Paid, Unpaid, FAILED, SUCCESSFUL, PENDING).

### Hooks & Types

- **usePurchasesData.ts**  
  Custom React hook using SWR to fetch purchase data from `/api/Dashboard/Purchases`. Handles loading, error, and data mapping.

- **types.ts**  
  TypeScript types for purchase records and API response, e.g.:
  ```ts
  export interface PurchaseRecord {
    invocieID: string;
    name: string;
    amount: string;
    status: 'Paid' | 'Unpaid' | 'FAILED' | 'SUCCESSFUL' | 'PENDING';
    datetime: string;
  }
  export interface PurchasesResponse {
    purchases: PurchaseItem[];
  }
  ```

## Usage Example

```tsx
import PurchaseHistory from './components/PurchaseHistory/PurchaseHistory';

export default function MyPurchasesPage() {
  return <PurchaseHistory />;
}
```

## Extending & Maintaining

- **Add new purchase fields:**  
  Update the `PurchaseRecord` interface in `types.ts` and adjust table components as needed.
- **Change API endpoints:**  
  Update fetch URLs in `usePurchasesData.ts`.
- **Customize UI:**  
  All components use Tailwind CSS. Adjust classes or add new styles as needed.
- **Improve pagination or filtering:**  
  Update logic in `PurchaseHistory.tsx` and `PurchasePagination.tsx`.

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