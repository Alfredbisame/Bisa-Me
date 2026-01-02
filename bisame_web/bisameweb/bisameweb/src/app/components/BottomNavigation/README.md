# Bottom Navigation Components

This directory contains modular, reusable bottom navigation components for the Bisame Web application.

## Components

### 1. BottomNavigation
The main navigation component that renders a bottom navigation bar with customizable items.

**Props:**
- `className?: string` - Additional CSS classes
- `items?: NavigationItem[]` - Custom navigation items
- `defaultActive?: string` - ID of the default active item

### 2. BottomNavItem
Individual navigation item component used within BottomNavigation.

**Props:**
- `icon: IconType` - React icon component
- `label?: string` - Display text (shown when active)
- `isActive?: boolean` - Whether the item is currently active
- `onClick?: () => void` - Click handler
- `href?: string` - Link URL (renders as anchor tag if provided)
- `className?: string` - Additional CSS classes

### 3. BottomNavigationWrapper
Wrapper component that provides the full page layout with bottom navigation positioned at the bottom.

**Props:**
- `children?: React.ReactNode` - Page content
- `className?: string` - Additional CSS classes for the wrapper
- `navClassName?: string` - Additional CSS classes for the navigation
- `items?: NavigationItem[]` - Custom navigation items
- `defaultActive?: string` - ID of the default active item

## Usage Examples

### Basic Usage
```tsx
import { BottomNavigation } from '@/app/components/BottomNavigation';

function MyPage() {
  return (
    <div>
      <h1>My Page Content</h1>
      <BottomNavigation />
    </div>
  );
}
```

### Custom Navigation Items
```tsx
import { BottomNavigation } from '@/app/components/BottomNavigation';
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';

const customItems = [
  {
    id: 'search',
    icon: FaSearch,
    label: 'Search',
    onClick: () => console.log('Search clicked')
  },
  {
    id: 'favorites',
    icon: FaHeart,
    label: 'Favorites',
    onClick: () => console.log('Favorites clicked')
  },
  {
    id: 'cart',
    icon: FaShoppingCart,
    label: 'Cart',
    onClick: () => console.log('Cart clicked')
  },
  {
    id: 'user',
    icon: FaUser,
    label: 'Profile',
    onClick: () => console.log('Profile clicked')
  }
];

function MyPage() {
  return (
    <BottomNavigation 
      items={customItems} 
      defaultActive="search" 
    />
  );
}
```

### Full Page Layout
```tsx
import { BottomNavigationWrapper } from '@/app/components/BottomNavigation';

function MyPage() {
  return (
    <BottomNavigationWrapper>
      <div className="flex-1">
        <h1>My Page Content</h1>
        <p>This content will be above the bottom navigation</p>
      </div>
    </BottomNavigationWrapper>
  );
}
```

## Features

- ✅ **Responsive Design**: Works on all screen sizes
- ✅ **Accessibility**: Proper ARIA labels and keyboard navigation
- ✅ **Customizable**: Easy to customize icons, labels, and behavior
- ✅ **TypeScript Support**: Full TypeScript support with proper interfaces
- ✅ **Modern Icons**: Uses react-icons for crisp, scalable icons
- ✅ **Tailwind CSS**: Styled with Tailwind CSS for consistency
- ✅ **Active States**: Visual feedback for active navigation items
- ✅ **Hover Effects**: Smooth hover animations
- ✅ **Modular**: Separate concerns with individual components

## Design Features

- Gradient background (blue-600 to blue-500)
- Rounded corners (rounded-3xl)
- Glowing shadow effect
- Active item highlighting with purple background
- Smooth transitions and hover effects
- Icon and text combination for active items

## Dependencies

- `react-icons` - For FontAwesome icons
- `tailwindcss` - For styling
- `react` - React framework

## File Structure

```
BottomNavigation/
├── BottomNavigation.tsx      # Main navigation component
├── BottomNavItem.tsx         # Individual navigation item
├── BottomNavigationWrapper.tsx # Page wrapper component
├── BottomNavigationDemo.tsx  # Demo component
├── index.ts                  # Export file
└── README.md                 # This documentation
``` 