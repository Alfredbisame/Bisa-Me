# Category Components

This directory contains all components and types related to the display and interaction of product categories, including scrollable sections, cards, and mobile-friendly layouts.

## Directory Structure

```
Category/
├── CategorySection.tsx                # Main section for displaying categories (desktop & mobile)
├── CategorySectionMobile.tsx          # Mobile-optimized category section (pills)
├── CategoryCard.tsx                   # Card component for individual categories
├── ScrollableCategoriesContainer.tsx  # Scrollable container for category cards
├── ScrollButton.tsx                   # Reusable scroll button for navigation
├── types/
│   └── Category.ts                    # TypeScript interface for Category
├── Samples.txt                        # Sample code and data (for reference/testing)
```

## Component & Type Overview

### Core Components

- **CategorySection.tsx**  
  Main orchestrator for the category section. Handles responsive rendering (desktop vs. mobile), scroll logic, and deduplication of categories. Uses scroll buttons and a scrollable container for desktop, and a pill-style layout for mobile.

- **CategorySectionMobile.tsx**  
  Mobile-optimized version of the category section. Displays categories as horizontally scrollable pills for easy navigation on small screens.

- **CategoryCard.tsx**  
  Displays an individual category with image and name. Used within scrollable containers.

- **ScrollableCategoriesContainer.tsx**  
  Wraps and horizontally scrolls multiple `CategoryCard` components. Accepts a ref for scroll control.

- **ScrollButton.tsx**  
  Reusable button for scrolling left or right. Used in the desktop category section.

### Types

- **types/Category.ts**  
  TypeScript interface for a category object:
  ```ts
  export interface Category {
    name: string;
    imageUrl: string;
    alt: string;
  }
  ```

### Samples

- **Samples.txt**  
  Contains sample code and data for reference or testing. Not used in production.

## Usage Example

```tsx
import CategorySection from './components/Category/CategorySection';

export default function HomePage() {
  return <CategorySection />;
}
```

## Extending & Maintaining

- **Add new categories:**  
  Update the categories array in `CategorySection.tsx` to add or modify categories.
- **Change category card design:**  
  Edit `CategoryCard.tsx` for layout, image, or text changes.
- **Adjust scroll behavior:**  
  Update logic in `CategorySection.tsx` and `ScrollableCategoriesContainer.tsx` as needed.
- **Mobile layout:**  
  Tweak `CategorySectionMobile.tsx` for pill style, spacing, or responsiveness.

## Best Practices

- **Keep the `Category` type in sync** across all components for type safety.
- **Use unique category names** to avoid duplicates in the UI.
- **Test scroll and responsive behavior** on all device sizes.
- **Keep sample code in `Samples.txt`** for onboarding or testing, but do not import it in production code.

## Contribution Guidelines

- Follow the existing component and type patterns.
- Document any new components or types in this README.
- Test all changes for both desktop and mobile layouts.

--- 