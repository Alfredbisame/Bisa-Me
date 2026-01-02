# BuySellMenu Components

This directory contains all components and data structures related to the Buy & Sell menu system, including dropdowns, submenus, and static data for categories and subcategories.

## Directory Structure

```
BuySellMenu/
├── BuySellDropDown.tsx   # Main dropdown menu for Buy & Sell categories
├── BuySellSubMenu.tsx    # Submenu for displaying subcategories
├── BuySellData.ts        # Static data for categories and subcategories
```

## Component & Data Overview

### Core Components

- **BuySellDropDown.tsx**  
  Main dropdown component for displaying all Buy & Sell categories. Fetches categories from the API (`/api/category/buysell`) and displays them in a styled dropdown. Handles loading and error states. When a category with subcategories is clicked, it shows the corresponding submenu.

- **BuySellSubMenu.tsx**  
  Submenu component for displaying subcategories of a selected category. Accepts a category name and category data as props. Fetches subcategories from the API if not provided, or falls back to static data from `BuySellData.ts` if API data is unavailable. Each subcategory links to a filtered Buy & Sell page.

### Data

- **BuySellData.ts**  
  Contains a static JavaScript object mapping each main category to an array of subcategory objects. Each subcategory has a `name` and a `href` for navigation. Used as a fallback if API data is not available.

## Usage Example

```tsx
import BuySellDropDown from './components/BuySellMenu/BuySellDropDown';

export default function BuySellMenuSection() {
  return <BuySellDropDown />;
}
```

## Extending & Maintaining

- **Add new categories or subcategories:**  
  Update `BuySellData.ts` to add or modify static categories and subcategories. If your backend API changes, ensure the new structure matches the expected format in the dropdown and submenu components.
- **Change API endpoints:**  
  Update the fetch URLs in `BuySellDropDown.tsx` and `BuySellSubMenu.tsx` as needed.
- **Customize UI:**  
  All components are styled with Tailwind CSS. You can adjust classes or add new styles as needed.
- **Fallback logic:**  
  The submenu will use static data if the API is unavailable, ensuring the menu always works for users.

## Best Practices

- **Keep data structures in `BuySellData.ts` up to date** with your backend for consistency.
- **Handle loading and error states** gracefully in all menu components.
- **Use clear, descriptive prop types and interfaces** for all components.
- **Keep UI/UX consistent** with the rest of the app.

## Contribution Guidelines

- Follow the existing component and data patterns.
- Document any new components or data structures in this README.
- Test all changes to ensure the menu works with both API and static data.

---
