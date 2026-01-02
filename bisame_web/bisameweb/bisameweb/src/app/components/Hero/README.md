# Hero Components

This directory contains all components related to the main hero/banner section of the homepage, including the main banner, side banners, and loading skeletons.

## Directory Structure

```
Hero/
├── Hero.tsx         # Main hero section layout (combines banners)
├── MainBanner.tsx   # Main rotating banner with slides
├── SideBanner.tsx   # Side banners for TV and Trade Assurance
├── loading.tsx      # Skeleton loading components for banners
```

## Component Overview

### Core Components

- **Hero.tsx**  
  Main layout for the hero section. Uses a grid to display the `MainBanner` and two `SideBanner` components (e.g., Bisame TV and Trade Assurance). Responsive and styled for desktop and mobile.

- **MainBanner.tsx**  
  Rotating banner with multiple slides. Each slide includes a title, subtitle, description, price, and image. Slides auto-advance every 5 seconds and can be manually selected. Uses Framer Motion for smooth transitions and animations.

- **SideBanner.tsx**  
  Displays a smaller banner with a title and a call-to-action button (e.g., "WATCH NOW" or "SHOP NOW"). Supports dark/light themes and different types (TV, shop). Navigates to the appropriate page on click.

- **loading.tsx**  
  Contains skeleton loading components (`MainBannerSkeleton`, `SideBannerSkeleton`) for use while banner data is loading or during SSR/CSR transitions.

## Usage Example

```tsx
import Hero from './components/Hero/Hero';

export default function HomePage() {
  return <Hero />;
}
```

## Extending & Maintaining

- **Add new slides:**  
  Update the `slides` array in `MainBanner.tsx` to add or modify banner slides.
- **Change banner links or text:**  
  Update props and logic in `SideBanner.tsx`.
- **Customize UI:**  
  All components use Tailwind CSS. Adjust classes or add new styles as needed.
- **Add new banner types:**  
  Extend `SideBanner.tsx` to support additional types or actions.

## Best Practices

- **Keep slide data and links up to date** for promotions and campaigns.
- **Use skeletons for loading states** to improve perceived performance.
- **Test responsiveness** on all device sizes.

## Contribution Guidelines

- Follow the existing component and prop patterns.
- Document any new features or changes in this README.
- Test all changes for usability and responsiveness.

--- 