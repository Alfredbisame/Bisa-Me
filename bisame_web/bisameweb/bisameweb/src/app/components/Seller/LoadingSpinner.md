# LoadingSpinner Component

A modern, customizable loading spinner component with smooth animations and professional design.

## Features

- **Modern Design**: Clean, professional spinner with multiple animation layers
- **Customizable**: Different sizes and customizable messages
- **Smooth Animations**: Pulsing outer ring, spinning inner ring, and bouncing dots
- **Responsive**: Works well on all screen sizes
- **Accessible**: Proper contrast and semantic structure

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `string` | `"Loading seller data..."` | The loading message to display |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the spinner |
| `className` | `string` | `''` | Additional CSS classes |

## Usage

```tsx
import LoadingSpinner from './LoadingSpinner';

// Basic usage
<LoadingSpinner />

// Custom message and size
<LoadingSpinner 
  message="Loading products..." 
  size="lg" 
  className="my-custom-class"
/>
```

## Animation Details

- **Outer Ring**: Pulsing animation with gray background
- **Inner Ring**: Spinning animation with orange accent color
- **Center Dot**: Pulsing animation for additional visual interest
- **Bouncing Dots**: Three dots with staggered bounce animation

## Design System Integration

The component uses the existing design system colors:
- Orange accent color (`orange-500`) for primary elements
- Gray colors for secondary elements
- Consistent with the overall Bisame Web design language 