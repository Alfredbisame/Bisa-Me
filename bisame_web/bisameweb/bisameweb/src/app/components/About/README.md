# About Components Directory

This directory contains React components and TypeScript types used for the "About" and informational sections of the Bisame web application. Each component is designed to be modular, visually appealing, and focused on communicating the platform's mission, values, safety, and user engagement.

## Components Overview

### 1. `HeroSection.tsx`
- **Purpose:** The main hero/banner section for the About page. Highlights Bisame's brand, trust, and technology with animated stats and a bold headline.
- **Features:**
  - Animated entrance using Framer Motion.
  - Displays key platform statistics (active users, products, deals, uptime).
  - Gradient text and modern UI.

### 2. `OurStorySection.tsx`
- **Purpose:** Tells the story and mission of Bisame, emphasizing its origins, vision, and growth.
- **Features:**
  - Animated content blocks.
  - Mission statement with icon.
  - Responsive layout for storytelling.

### 3. `ValuesSection.tsx`
- **Purpose:** Showcases the core values that guide Bisame (Security, Innovation, Trust, Community).
- **Features:**
  - Animated value cards with icons.
  - Clean, grid-based layout.

### 4. `SafetyTipsSection.tsx`
- **Purpose:** Educates users on safe trading practices with categorized safety tips.
- **Features:**
  - Multiple safety categories (Meeting, Payment, Communication, Product Verification).
  - Animated, color-coded cards for each tip category.
  - Emphasizes user safety and platform trust.

### 5. `EmergencyContact.tsx`
- **Purpose:** Provides emergency contact information for users to report suspicious activity or seek help.
- **Features:**
  - Hotline and email support details.
  - Safety reminder and callout for urgent situations.
  - Visually distinct with gradients and icons.

### 6. `CallToAction.tsx`
- **Purpose:** Encourages users to start trading or browse products, serving as a conversion-focused section.
- **Features:**
  - Prominent call-to-action buttons.
  - Animated entrance and background pattern.
  - Responsive and visually engaging.

### 7. `BackgroundAnimation.tsx`
- **Purpose:** Adds interactive, animated background effects to enhance the visual appeal of the About page.
- **Features:**
  - Mouse-tracking gradient blobs.
  - Subtle, animated background elements.
  - Non-intrusive and performance-friendly.

## Types Subdirectory

### `types/index.ts`
- **Purpose:** Centralizes TypeScript interfaces used by the About components for type safety and maintainability.
- **Exports:**
  - `StatItem`: For hero stats (number, label, icon).
  - `ValueItem`: For value cards (icon, title, description).
  - `SafetyTip`: For safety tips (category, tips, icon, color).
  - `MousePosition`: For background animation (x, y coordinates).

## Usage
- Import these components into your About or landing pages as needed.
- All components are designed for use with Next.js and Tailwind CSS.
- Animations are powered by [Framer Motion](https://www.framer.com/motion/).

## Contribution
- Keep components modular and focused.
- Update or add new types in `types/index.ts` as needed.
- Follow the existing design and animation patterns for consistency.
