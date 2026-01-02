# AccountSettings Components Directory

This directory contains React components and TypeScript types for managing user account settings in the Bisame web application. These components provide a modular, user-friendly interface for updating profile information, changing passwords, managing store data, and handling account deletion.

## Components Overview

### 1. `AccountSettings.tsx`
- **Purpose:** The main container for the account settings page.
- **Features:**
  - Fetches and displays user profile data.
  - Handles loading and error states.
  - Integrates profile, password, store data, and account deletion sections.
  - Uses subcomponents for modularity.

### 2. `ProfileSection.tsx`
- **Purpose:** Displays and allows editing of the user's profile information.
- **Features:**
  - Shows profile image, username, and phone number.
  - Edit button triggers profile editing.
  - Uses `BlobRing` for a decorative profile image effect.

### 3. `PasswordSection.tsx`
- **Purpose:** Allows users to change their account password.
- **Features:**
  - Form for current, new, and confirm password fields.
  - Handles password validation and submission.
  - (See file for detailed logic.)

### 4. `StoreDataComponent.tsx`
- **Purpose:** Manages and displays store-related data for users with store accounts.
- **Features:**
  - Displays store information and allows updates.
  - (See file for detailed logic.)

### 5. `DeleteAccountButton.tsx`
- **Purpose:** Provides a button and confirmation flow for account deletion.
- **Features:**
  - Prompts user for confirmation before deleting account.
  - Calls deletion handler on confirmation.

### 6. `BlobRing.tsx`
- **Purpose:** Renders an animated SVG ring around the profile image for visual enhancement.
- **Features:**
  - SVG-based animated ring with gradient.
  - Accepts children (typically a profile image).

### 7. `useAccountData.ts`
- **Purpose:** Custom React hook for fetching and managing account data.
- **Features:**
  - Handles API calls, loading, and error states.
  - Returns user info for use in settings components.

### 8. `types.ts`
- **Purpose:** Centralizes TypeScript interfaces for account settings components.
- **Exports:**
  - Interfaces for profile data, password forms, and other account-related types.

## Usage

- Import these components into your account or settings pages as needed.
- All components are designed for use with Next.js and Tailwind CSS.
- Use the provided types for type safety in your own components or hooks.

## Contribution

- Keep components modular and focused.
- Update or add new types in `types.ts` as needed.
- Follow the existing design and animation patterns for consistency.

---
