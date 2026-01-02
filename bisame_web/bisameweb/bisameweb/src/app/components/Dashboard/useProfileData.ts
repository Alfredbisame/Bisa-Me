/**
 * useProfileData Hook - Updated to use AuthContext
 * Returns user profile data from AuthContext instead of fetching separately
 */

import { useAuth } from '@/app/hooks/useAuth';

// Re-export the User interface from AuthContext
export type { User as ProfileData } from '@/lib/context/AuthContext';

/**
 * Get full name from profile data
 */
const getFullName = (firstName?: string, lastName?: string): string => {
  if (!firstName && !lastName) return '';
  return `${firstName || ''} ${lastName || ''}`.trim();
};

/**
 * Custom hook to get profile data
 * Now uses AuthContext instead of separate SWR fetch
 */
export function useProfileData() {
  const { user, isLoading, refreshUser } = useAuth();

  const fullName = getFullName(user?.firstName, user?.lastName);

  return {
    data: user,
    fullName,
    loading: isLoading,
    error: null, // AuthContext handles errors silently
    mutate: refreshUser, // Refresh user profile
  };
}
