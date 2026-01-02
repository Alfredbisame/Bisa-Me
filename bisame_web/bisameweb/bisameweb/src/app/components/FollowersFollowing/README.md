# FollowersFollowing Components

This directory contains all components, hooks, and types related to the followers/following feature, including profile cards, follow buttons, and data fetching logic.

## Directory Structure

```
FollowersFollowing/
├── FollowersFollowing.tsx   # Main tabbed interface for followers/following
├── ProfileCard.tsx          # Card component for displaying user profile info
├── FollowButton.tsx         # Button for follow/unfollow actions
├── useFollowersData.ts      # Custom hook for fetching followers/following data
├── types.ts                 # TypeScript interfaces for user and API response
```

## Component & Hook Overview

### Core Components

- **FollowersFollowing.tsx**  
  Main orchestrator for the followers/following UI. Provides tab navigation, fetches data using `useFollowersData`, and renders a grid of `ProfileCard` components for each user. Handles loading, error, and empty states.

- **ProfileCard.tsx**  
  Displays a user's avatar, name, title/status, and a `FollowButton`. Handles avatar fallback and optional online indicator.

- **FollowButton.tsx**  
  Button for following/unfollowing a user. Shows loading state and disables itself during API calls. Calls the provided `onToggle` callback.

### Hooks & Types

- **useFollowersData.ts**  
  Custom React hook using SWR to fetch followers and following data from `/api/Dashboard/Followers`. Handles loading, error, and data mapping.

- **types.ts**  
  TypeScript interfaces for follower user and API response, e.g.:
  ```ts
  export interface FollowerUser {
    _id: { $oid: string };
    firstname: string;
    lastname: string;
    profilepic: string;
    status: string;
    // ...other fields
  }
  export interface FollowersResponse {
    follows: FollowerUser[];
    following: FollowerUser[];
  }
  ```

## Usage Example

```tsx
import FollowersFollowing from './components/FollowersFollowing/FollowersFollowing';

export default function SocialPage() {
  return <FollowersFollowing />;
}
```

## Extending & Maintaining

- **Add new profile fields:**  
  Update the `FollowerUser` interface in `types.ts` and adjust `ProfileCard.tsx` as needed.
- **Change API endpoints:**  
  Update fetch URLs in `useFollowersData.ts`.
- **Customize UI:**  
  All components use Tailwind CSS. Adjust classes or add new styles as needed.
- **Implement real follow/unfollow logic:**  
  Replace the placeholder in `FollowersFollowing.tsx` with actual API calls.

## Best Practices

- **Keep types in sync** with backend API responses.
- **Handle loading, error, and empty states** gracefully in all components.
- **Use reusable components** (e.g., `ProfileCard`, `FollowButton`) for consistency.
- **Test all features** for both desktop and mobile layouts.

## Contribution Guidelines

- Follow the existing component, hook, and type patterns.
- Document any new features or changes in this README.
- Test all changes for usability and responsiveness.

--- 