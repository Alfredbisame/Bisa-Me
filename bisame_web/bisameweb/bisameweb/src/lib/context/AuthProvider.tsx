/**
 * Authentication Provider
 * Manages global authentication state
 */

'use client';

import { ReactNode, useState, useEffect, useCallback } from 'react';
import { AuthContext, User } from './AuthContext';
import { tokenManager, sessionManager } from '../auth-client';
import { authGet } from '../auth-client';
import { buildAuthUrl } from '../api-endpoints';

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    /**
     * Check login status from token
     */
    const checkLoginStatus = useCallback(() => {
        const hasToken = tokenManager.hasValidToken();
        setIsAuthenticated(hasToken);

        if (hasToken) {
            // Load user from localStorage
            const storedUser = sessionManager.getUser();
            if (storedUser) {
                setUser(storedUser);
            }
        } else {
            setUser(null);
        }
    }, []);

    /**
     * Fetch user profile from API
     */
    const refreshUser = useCallback(async () => {
        if (!tokenManager.hasValidToken()) {
            setUser(null);
            setIsAuthenticated(false);
            return;
        }

        try {
            const profileUrl = buildAuthUrl('/api/authentication/profile');
            const response = await authGet<{ code: number; data: User; message: string }>(profileUrl);

            if (response.code === 200 && response.data) {
                setUser(response.data);
                sessionManager.setUser(response.data, true);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            // Don't clear session on profile fetch failure
            // Token might still be valid
        }
    }, []);

    /**
     * Login handler
     */
    const login = useCallback((token: string, userData: User) => {
        tokenManager.setToken(token, true);
        sessionManager.setUser(userData, true);
        setUser(userData);
        setIsAuthenticated(true);

        // Dispatch custom event for cross-component communication
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('loginSuccess'));
        }
    }, []);

    /**
     * Logout handler
     */
    const logout = useCallback(() => {
        sessionManager.clearSession();
        setUser(null);
        setIsAuthenticated(false);
    }, []);

    /**
     * Initialize auth state on mount
     */
    useEffect(() => {
        console.log('[AuthProvider] Initializing...');

        // Check if token exists
        const hasToken = tokenManager.hasValidToken();
        console.log('[AuthProvider] Has valid token:', hasToken);

        if (hasToken) {
            // Set authenticated if token exists
            setIsAuthenticated(true);

            // Load user from localStorage
            const storedUser = sessionManager.getUser();
            if (storedUser) {
                console.log('[AuthProvider] Loaded user from localStorage:', storedUser.id);
                setUser(storedUser);
            } else {
                // No stored user, fetch from API
                refreshUser();
            }
        } else {
            console.log('[AuthProvider] No valid token, user not authenticated');
            setIsAuthenticated(false);
            setUser(null);
        }

        setIsLoading(false);
    }, [refreshUser]);

    /**
     * Listen for storage changes (cross-tab sync)
     */
    useEffect(() => {
        const handleStorageChange = () => {
            checkLoginStatus();
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [checkLoginStatus]);

    /**
     * Listen for custom events
     */
    useEffect(() => {
        const handleLoginSuccess = () => {
            checkLoginStatus();
            refreshUser();
        };

        const handleLogout = () => {
            logout();
        };

        window.addEventListener('loginSuccess', handleLoginSuccess);
        window.addEventListener('logout', handleLogout);

        return () => {
            window.removeEventListener('loginSuccess', handleLoginSuccess);
            window.removeEventListener('logout', handleLogout);
        };
    }, [checkLoginStatus, refreshUser, logout]);

    const value = {
        isAuthenticated,
        isLoading,
        user,
        login,
        logout,
        refreshUser,
        checkLoginStatus,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
