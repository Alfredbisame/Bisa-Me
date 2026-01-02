# ReviewsSection Components

This directory contains all components, hooks, and types related to displaying and managing user reviews, including review lists, items, modals, actions, and data fetching logic.

## Directory Structure

```
ReviewsSection/
├── ReviewsSection.tsx      # Main reviews section (orchestrator)
├── ReviewsList.tsx         # List of review items
├── ReviewItem.tsx          # Single review item (avatar, header, comment, actions)
├── ReviewHeader.tsx        # Header for a review (name, date, rating)
├── ReviewComment.tsx       # Comment text for a review
├── ReviewActions.tsx       # Like/dislike and reply actions for a review
├── ReviewPostModal.tsx     # Modal for posting a new review
├── ReviewReplyModal.tsx    # Modal for replying to a review
├── Avatar.tsx              # Avatar display for reviewers
├── ReviewsHeader.tsx       # Header for the reviews section (average, total)
├── useReviewsData.ts       # Custom hook for fetching and mapping reviews data
├── types.ts                # TypeScript types for reviews and API response
├── Review.types.ts         # Additional review types (if needed)
```

## Component & Hook Overview

### Core Components

- **ReviewsSection.tsx**  
  Main orchestrator for the reviews section. Handles loading, error, and empty states. Paginates reviews and renders the header, list, and pagination controls.

- **ReviewsList.tsx**  
  Renders a list of `ReviewItem` components for each review.

- **ReviewItem.tsx**  
  Displays a single review, including avatar, header, comment, and actions (like, reply).

- **ReviewHeader.tsx, ReviewComment.tsx, ReviewActions.tsx**  
  Subcomponents for displaying review metadata, comment text, and actions.

- **ReviewPostModal.tsx, ReviewReplyModal.tsx**  
  Modals for posting a new review or replying to an existing review.

- **Avatar.tsx**  
  Displays the reviewer's avatar or initials.

- **ReviewsHeader.tsx**  
  Displays the average rating and total number of reviews.

### Hooks & Types

- **useReviewsData.ts**  
  Custom React hook using SWR to fetch reviews data from `/api/Dashboard/Reviews`. Handles loading, error, and data mapping.

- **types.ts, Review.types.ts**  
  TypeScript types for reviews and API response, e.g.:
  ```ts
  export interface Review {
    reviewid: string;
    name: string;
    profile: string;
    productname: string;
    image: string;
    description: string;
    price: string;
    comment: string;
    rating: number;
    postdate: string;
  }
  export interface ReviewsResponse {
    reviews: Review[];
    total: number;
    average_rating: number;
  }
  ```

## Usage Example

```tsx
import ReviewsSection from './components/ReviewsSection/ReviewsSection';

export default function ProductReviewsPage() {
  return <ReviewsSection />;
}
```

## Extending & Maintaining

- **Add new review fields:**  
  Update the `Review` interface in `types.ts` and adjust components as needed.
- **Change API endpoints:**  
  Update fetch URLs in `useReviewsData.ts`.
- **Customize UI:**  
  All components use Tailwind CSS. Adjust classes or add new styles as needed.
- **Improve pagination or filtering:**  
  Update logic in `ReviewsSection.tsx` and related components.

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