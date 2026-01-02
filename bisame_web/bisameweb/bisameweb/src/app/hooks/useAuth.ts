/**
 * useAuth Hook
 * Provides authentication state and methods from AuthContext
 */

'use client';

import { useContext } from 'react';
import { AuthContext, AuthContextType } from '@/lib/context/AuthContext';

/**
 * Hook to access authentication context
 * Must be used within AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};