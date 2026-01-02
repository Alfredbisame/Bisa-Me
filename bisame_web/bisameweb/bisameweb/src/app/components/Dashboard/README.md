# Dashboard Components

This directory contains all components, hooks, and types related to the user/business dashboard, including stats, charts, business info, and store display features.

## Directory Structure

```
Dashboard/
├── DashboardHeader.tsx         # Header with business and account info dropdowns
├── DashboardStats.tsx          # Stats cards for balance, affiliates, earnings
├── PerformanceChart.tsx        # Area chart for affiliate/earnings trends
├── DashboardContent.tsx        # Main dashboard layout and greeting
├── useDashboardData.ts         # Custom hook for fetching dashboard data
├── types.ts                    # TypeScript interfaces for dashboard data
├── AccountInfo.tsx             # User account info dropdown
├── BusinessDetails.tsx         # Business details dropdown
├── StatCard.tsx                # Reusable stat card component
├── StoreDisplay/               # Store display and address info components
├── UpdateBusinessModal/        # Modal and subcomponents for updating business info
```

## Component & Hook Overview

### Core Components

- **DashboardHeader.tsx**  
  Main header for the dashboard. Includes dropdowns for business details and account info, profile image, and uses `useDashboardData` for user/business info.

- **DashboardStats.tsx**  
  Displays key stats (balance, affiliates, earnings) in cards, grouped by lifetime, today, week, and month. Uses `StatCard` for each stat.

- **PerformanceChart.tsx**  
  Area chart (using recharts) showing affiliate and earnings trends over time. Includes custom tooltips and legends.

- **DashboardContent.tsx**  
  Main layout for the dashboard, including greeting, date/time, stats, and performance chart.

- **AccountInfo.tsx**  
  Dropdown with user account details (name, email, phone, profile image).

- **BusinessDetails.tsx**  
  Dropdown with business information and management options.

- **StatCard.tsx**  
  Reusable card for displaying a single stat with icon, label, and value.

### Hooks & Types

- **useDashboardData.ts**  
  Custom React hook using SWR to fetch dashboard data from `/api/Dashboard`. Handles loading, error, and revalidation.

- **types.ts**  
  TypeScript interfaces for dashboard data, e.g.:
  ```ts
  export interface DashboardData {
    info: { name: string; email: string; phone: string; profile: string; };
    lifetime: { total: number; affiliate: number; earnings: number; };
    affiliates: { today: number; week: number; month: number; total?: number; };
    earnings: { today: number; week: number; month: number; total?: number; };
  }
  ```

### StoreDisplay Subdirectory

- **StoreDisplay/**  
  Contains components for displaying store images, address, contact buttons, and tabs:
  - `StoreImageGallery.tsx`, `ImageThumbnails.tsx`, `ImageModal.tsx`: Image gallery and modal for store images
  - `StoreAddressCard.tsx`, `AddressInfoItem.tsx`: Store address display
  - `GetDirectionsButton.tsx`, `CallStoreButton.tsx`: Action buttons for directions/call
  - `StoreDisplay.tsx`, `DisplayTabs.tsx`: Main store display and tab navigation

### UpdateBusinessModal Subdirectory

- **UpdateBusinessModal/**  
  Contains modal and subcomponents for updating business info:
  - `UpdateBusinessModal.tsx`: Main modal logic
  - `ImagePreview.tsx`, `ImageUploadSection.tsx`: Image upload and preview
  - `AddressForm.tsx`, `AddressInput.tsx`: Address form and input
  - `TabNavigation.tsx`, `ModalHeader.tsx`, `ModalFooter.tsx`, `ModalBackdrop.tsx`: Modal UI components

## Usage Example

```tsx
import DashboardContent from './components/Dashboard/DashboardContent';

export default function DashboardPage() {
  return <DashboardContent />;
}
```

## Extending & Maintaining

- **Add new stats or charts:**  
  Update `DashboardStats.tsx` or `PerformanceChart.tsx` and extend types in `types.ts`.
- **Change API endpoints:**  
  Update fetch URLs in `useDashboardData.ts`.
- **Customize UI:**  
  All components use Tailwind CSS. Adjust classes or add new styles as needed.
- **Add new business/store features:**  
  Add components to the relevant subdirectory and document them here.

## Best Practices

- **Keep types in sync** with backend API responses.
- **Handle loading and error states** gracefully in all dashboard components.
- **Use reusable components** (e.g., `StatCard`) for consistency.
- **Test all features** for both desktop and mobile layouts.

## Contribution Guidelines

- Follow the existing component, hook, and type patterns.
- Document any new features or changes in this README.
- Test all changes for usability and responsiveness.

--- 