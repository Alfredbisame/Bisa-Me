/**
 * Authentication Context
 * Centralized authentication state management
 */

'use client';

import { createContext } from 'react';

/**
 * User interface
 */
export interface User {
    id: string;
    email: string | null;
    phoneNumber: string;
    countryCode: string;
    countryName: string;
    countryShortName: string;
    profilePicture: string | null;
    referralCode: string;
    userReferralCode: string;
    referralType: string;
    status: string;
    role: string;
    lastName: string;
    firstName: string;
    otherNames: string;
    authenticated: boolean;
    dateOfBirth: string | null;
}

/**
 * Auth context interface
 */
export interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    refreshUser: () => Promise<void>;
    checkLoginStatus: () => void;
}

/**
 * Auth context
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
