# ShopSideBar Components

This directory contains all components related to the shop sidebar, including filtering, sorting, searching, and displaying popular brands and tags. These components are used to help users refine and navigate product listings in the shop/catalog pages.

## Directory Structure

```
ShopSideBar/
├── SortDropdown.tsx      # Dropdown for sorting products (e.g., by price, popularity)
├── ActiveFilters.tsx     # Displays currently active filters and allows removal
├── SearchBar.tsx         # Search input for filtering products in the sidebar
├── PopularBrands.tsx     # Checkbox list of popular brands
├── PopularTags.tsx       # Button list of popular tags
├── FilterPage.tsx        # Example page for filter usage (composes ActiveFilters)
├── FilterCategory.tsx    # Radio list for selecting product categories
├── PriceRange.tsx        # Slider and inputs for selecting price range
```

## Component Overview

### Core Components

- **SortDropdown.tsx**  
  Dropdown for selecting sort order (e.g., Most Popular, Newest, Price, Rating). Calls `onSort` callback when changed.

- **ActiveFilters.tsx**  
  Displays a list of currently active filters (e.g., category, rating) and allows users to remove them. Shows the total results count.

- **SearchBar.tsx**  
  Simple search input for filtering products within the sidebar. Calls `onSearch` callback on input or button click.

- **PopularBrands.tsx**  
  Checkbox list of popular brands. Maintains local state for selected brands.

- **PopularTags.tsx**  
  Button list of popular tags. Maintains local state for selected tags.

- **FilterCategory.tsx**  
  Radio button list for selecting a single product category. Maintains local state for selected category.

- **PriceRange.tsx**  
  Allows users to select a price range using a slider, text inputs, or predefined radio options. Maintains local state for selected range and min/max values.

- **FilterPage.tsx**  
  Example page that composes `ActiveFilters` and demonstrates filter usage.

## Types

Example type definitions:
```ts
// SortDropdown
interface SortOption {
  value: string;
  label: string;
}
// ActiveFilters
interface Filter {
  id: string;
  label: string;
}
// PopularBrands
interface Brand {
  id: string;
  name: string;
  defaultChecked: boolean;
}
// PopularTags
interface Tag {
  id: string;
  name: string;
  isSelected?: boolean;
}
// FilterCategory
interface CategoryOption {
  id: string;
  label: string;
}
// PriceRange
interface PriceOption {
  id: string;
  label: string;
  min: number;
  max: number;
}
```

## Usage Example

```tsx
import ShopSideBar from './components/ShopSideBar';
// Or import individual components as needed
import SortDropdown from './components/ShopSideBar/SortDropdown';
import ActiveFilters from './components/ShopSideBar/ActiveFilters';
import SearchBar from './components/ShopSideBar/SearchBar';
import PopularBrands from './components/ShopSideBar/PopularBrands';
import PopularTags from './components/ShopSideBar/PopularTags';
import FilterCategory from './components/ShopSideBar/FilterCategory';
import PriceRange from './components/ShopSideBar/PriceRange';

export default function ShopPage() {
  return (
    <aside className="w-80 p-4 bg-gray-50 border-r">
      <SearchBar onSearch={(term) => {/* filter logic */}} />
      <SortDropdown onSort={(sort) => {/* sort logic */}} />
      <ActiveFilters filters={[]} resultsCount={0} onRemoveFilter={() => {}} />
      <FilterCategory />
      <PopularBrands />
      <PopularTags />
      <PriceRange />
    </aside>
  );
}
```

## Extending & Maintaining

- **Add new filter types:**  
  Create new components or extend existing ones for additional filter options.
- **Change filter logic or data:**  
  Update state management and callbacks in the relevant components.
- **Customize UI:**  
  All components use Tailwind CSS. Adjust classes or add new styles as needed.
- **Improve accessibility:**  
  Ensure all controls are keyboard accessible and have proper ARIA labels.

## Best Practices

- **Keep types in sync** with backend filter/sort options.
- **Handle empty and edge states** gracefully in all components.
- **Use reusable components** for consistency.
- **Test all features** for both desktop and mobile layouts.

## Contribution Guidelines

- Follow the existing component and type patterns.
- Document any new features or changes in this README.
- Test all changes for usability and responsiveness.

--- 