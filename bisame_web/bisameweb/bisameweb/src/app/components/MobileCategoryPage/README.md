# MobileCategoryPage Components

A modular, accessible, and feature-rich category selection component system built with React and TypeScript.

## Features

- 🎨 **Modern Design**: Clean, responsive UI with smooth animations
- ♿ **Accessibility**: Full keyboard navigation and screen reader support
- 📱 **Mobile-First**: Optimized for mobile devices with touch interactions
- 🔧 **Modular**: Separated concerns with reusable components
- 🎯 **TypeScript**: Fully typed for better development experience
- 🚀 **Performance**: Optimized with React hooks and efficient rendering
- 🎭 **Customizable**: Easy to customize colors, data, and behavior
- 🎪 **Modal System**: Modern modal-based interaction instead of dropdowns

## Components

### MobileCategoryPage
The main component that orchestrates all sub-components.

```tsx
import { MobileCategoryPage } from './MobileCategoryPage';

<MobileCategoryPage
  onCategorySelect={(category) => console.log('Category selected:', category)}
  onSubcategorySelect={(subcategory) => console.log('Subcategory selected:', subcategory)}
  onChildCategorySelect={(childCategory) => console.log('Child category selected:', childCategory)}
  categories={customCategories}
/>
```

### CategoryCard
Individual category display component with modal functionality.

```tsx
import { CategoryCard } from './MobileCategoryPage';

<CategoryCard
  category={categoryData}
  isActive={isActive}
  onToggle={handleToggle}
  onSubcategoryClick={handleSubcategoryClick}
  onChildCategoryClick={handleChildCategoryClick}
/>
```

### Modal
Displays subcategories and child categories in a centered modal overlay.

```tsx
import { Modal } from './MobileCategoryPage';

<Modal
  category={categoryData}
  isActive={isActive}
  onSubcategoryClick={handleSubcategoryClick}
  onChildCategoryClick={handleChildCategoryClick}
  onClose={handleClose}
  cardPosition={cardPosition}
/>
```

## Data Structure

### CategoryData
```typescript
interface CategoryData {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  borderColor: string;
  textColor: string;
  subcategories: Subcategory[];
  childCategories?: ChildCategory[];
}
```

### Subcategory
```typescript
interface Subcategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}
```

### ChildCategory
```typescript
interface ChildCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}
```

### CardPosition
```typescript
interface CardPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}
```

## Key Changes

### Modal System
- **Replaced dropdowns with modals**: Categories now open in centered modals instead of dropdown menus
- **Localized blur effects**: Each modal has its own localized blur overlay instead of full-screen overlay
- **Better positioning**: Modals are positioned relative to the category card for better UX
- **Improved accessibility**: Enhanced keyboard navigation and screen reader support

### Animation Updates
- **Modal slide-in/out**: Smooth animations for modal appearance and disappearance
- **Scale effects**: Subtle scale animations for better visual feedback
- **Blur transitions**: Smooth blur effect transitions for the overlay

### Tailwind Config Updates
- Added new animations: `modalSlideIn`, `modalSlideOut`, `fadeIn`, `fadeOut`
- Added backdrop blur utilities: `backdrop-blur-xs`
- Enhanced keyframe definitions for better animation control 