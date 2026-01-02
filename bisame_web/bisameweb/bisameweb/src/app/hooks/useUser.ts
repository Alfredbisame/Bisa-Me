/**
 * useUser Hook  
 * Provides user data with optional SWR integration
 */

'use client';

import { useAuth } from './useAuth';

/**
 * Hook to access user data
 * Returns user from AuthContext (which fetches from API on mount)
 */
export const useUser = () => {
  const { user, isLoading, refreshUser } = useAuth();

  return {
    user,
    userId: user?.id || null,
    loading: isLoading,
    refresh: refreshUser,
  };
};