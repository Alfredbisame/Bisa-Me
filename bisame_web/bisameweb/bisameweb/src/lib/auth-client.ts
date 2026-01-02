/**
 * Authenticated HTTP Client with Axios
 * HTTP client with automatic token injection
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-hot-toast';
import { logger } from '@/app/utils/logger';
import { STORAGE_KEYS } from './config/constants';
import { ApiError, RequestConfig } from './client';

/**
 * Custom request config with retry tracking
 */
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    __retryCount?: number;
}

/**
 * Cookie helper functions
 */
const cookieHelpers = {
    /**
     * Set a cookie
     */
    setCookie: (name: string, value: string, days: number = 7): void => {
        if (typeof document === 'undefined') return;
        
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax${secure}`;
    },

    /**
     * Get a cookie value
     */
    getCookie: (name: string): string | null => {
        if (typeof document === 'undefined') return null;
        
        const nameEQ = name + '=';
        const cookies = document.cookie.split(';');
        
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(nameEQ) === 0) {
                const value = cookie.substring(nameEQ.length);
                return value ? decodeURIComponent(value) : null;
            }
        }
        
        return null;
    },

    /**
     * Remove a cookie
     */
    removeCookie: (name: string): void => {
        if (typeof document === 'undefined') return;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    },
};

/**
 * Token management utilities
 */
export const tokenManager = {
    /**
     * Get auth token from storage (checks cookies first, then localStorage/sessionStorage)
     */
    getToken: (): string | null => {
        if (typeof window === 'undefined') return null;

        // Check cookies first (for server-side compatibility)
        const cookieToken = cookieHelpers.getCookie('auth-token');
        if (cookieToken) {
            return cookieToken;
        }

        // Fallback to localStorage/sessionStorage
        const token =
            localStorage.getItem(STORAGE_KEYS.authToken) ||
            sessionStorage.getItem(STORAGE_KEYS.authToken) ||
            null;

        return token;
    },

    /**
     * Set auth token in storage and cookies
     */
    setToken: (token: string, persistent: boolean = true): void => {
        if (typeof window === 'undefined') return;

        // Set cookie (always persistent, 7 days)
        cookieHelpers.setCookie('auth-token', token, 7);

        // Set localStorage/sessionStorage
        if (persistent) {
            localStorage.setItem(STORAGE_KEYS.authToken, token);
        } else {
            sessionStorage.setItem(STORAGE_KEYS.authToken, token);
        }
    },

    /**
     * Remove auth token from storage and cookies
     */
    removeToken: (): void => {
        if (typeof window === 'undefined') return;

        // Remove cookie
        cookieHelpers.removeCookie('auth-token');

        // Remove from localStorage/sessionStorage
        localStorage.removeItem(STORAGE_KEYS.authToken);
        sessionStorage.removeItem(STORAGE_KEYS.authToken);
    },

    /**
     * Check if token exists
     */
    hasValidToken: (): boolean => {
        const token = tokenManager.getToken();
        return token !== null && token.length > 0;
    },
};

/**
 * Session management utilities
 */
export const sessionManager = {
    /**
     * Check if user is authenticated
     */
    isAuthenticated: (): boolean => {
        return tokenManager.hasValidToken();
    },

    /**
     * Get user data from storage
     */
    getUser: (): any | null => {
        if (typeof window === 'undefined') return null;

        const userStr = localStorage.getItem(STORAGE_KEYS.user) || sessionStorage.getItem(STORAGE_KEYS.user);
        if (!userStr) return null;

        try {
            return JSON.parse(userStr);
        } catch {
            return null;
        }
    },

    /**
     * Set user data in storage
     */
    setUser: (user: any, persistent: boolean = true): void => {
        if (typeof window === 'undefined') return;

        const userStr = JSON.stringify(user);
        if (persistent) {
            localStorage.setItem(STORAGE_KEYS.user, userStr);
        } else {
            sessionStorage.setItem(STORAGE_KEYS.user, userStr);
        }
    },

    /**
     * Remove user data from storage
     */
    removeUser: (): void => {
        if (typeof window === 'undefined') return;

        localStorage.removeItem(STORAGE_KEYS.user);
        sessionStorage.removeItem(STORAGE_KEYS.user);
    },

    /**
     * Clear session (logout)
     */
    clearSession: (): void => {
        tokenManager.removeToken();
        sessionManager.removeUser();

        // Dispatch logout event
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('logout'));
        }
    },
};

/**
 * Create authenticated HTTP client instance
 */
function createAuthClient(): AxiosInstance {
    const instance = axios.create({
        timeout: 15000,
        headers: {
            'Content-Type': 'application/json',
        },
        // NOTE: withCredentials removed - we use Bearer tokens, not cookies
    });

    // Request interceptor: Add auth token
    instance.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
            logger.debug('Auth HTTP request', {
                url: config.url,
                method: config.method,
            });

            const token = tokenManager.getToken();

            if (!token) {
                throw new ApiError(401, 'Unauthorized', null, 'No authentication token found');
            }

            // Add authorization header
            config.headers.Authorization = `Bearer ${token}`;

            return config;
        },
        (error) => Promise.reject(error)
    );

    // Response interceptor: Handle errors and retry
    const MAX_RETRIES = 2;
    instance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            const config = error.config as CustomAxiosRequestConfig;
            const status = error.response?.status;

            // Log error
            logger.error('Auth HTTP error', {
                url: config?.url,
                status,
                data: error.response?.data,
            }, error);

            // Handle 401 Unauthorized
            if (status === 401) {
                sessionManager.clearSession();

                if (typeof window !== 'undefined') {
                    toast.error('Your session has expired. Please log in again.');
                    // Redirect to login after a short delay
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 1500);
                }

                throw new ApiError(401, 'Unauthorized', error.response?.data, 'Authentication required');
            }

            // Handle 403 Forbidden
            if (status === 403) {
                if (typeof window !== 'undefined') {
                    toast.error('You do not have permission to perform this action.');
                }
                throw new ApiError(403, 'Forbidden', error.response?.data, 'Access forbidden');
            }

            // Retry logic for server errors
            const isRetryableStatus = status ? status >= 500 || status === 429 : true;
            const shouldRetry = isRetryableStatus && (config?.__retryCount || 0) < MAX_RETRIES;

            if (shouldRetry && config) {
                config.__retryCount = (config.__retryCount || 0) + 1;
                const delayMs = 300 * Math.pow(2, config.__retryCount);

                await new Promise((resolve) => setTimeout(resolve, delayMs));
                return instance(config);
            }

            // Show toast for other errors
            if (typeof window !== 'undefined') {
                let message = 'An error occurred';
                if (error.response?.data) {
                    const data = error.response.data as any;
                    if (typeof data.message === 'string') {
                        message = data.message;
                    } else if (typeof data.message === 'object' && data.message?.message) {
                        message = String(data.message.message);
                    } else if (typeof data === 'string') {
                        message = data;
                    }
                } else if (error.message) {
                    message = typeof error.message === 'string' ? error.message : String(error.message);
                }
                toast.error(message);
            }

            // Create normalized error with string message
            let errorMessage = 'An error occurred';
            if (error.response?.data) {
                const data = error.response.data as any;
                if (typeof data.message === 'string') {
                    errorMessage = data.message;
                } else if (typeof data.message === 'object' && data.message?.message) {
                    errorMessage = String(data.message.message);
                }
            } else if (error.message) {
                errorMessage = typeof error.message === 'string' ? error.message : String(error.message);
            }
            
            const apiError = new ApiError(
                status || 500,
                error.response?.statusText || 'Request failed',
                error.response?.data,
                errorMessage
            );

            return Promise.reject(apiError);
        }
    );

    return instance;
}

// Create singleton instance
const authClient = createAuthClient();

/**
 * Authenticated GET request
 */
export const authGet = async <T>(url: string, config?: RequestConfig): Promise<T> => {
    const response = await authClient.get<T>(url, config);
    return response.data;
};

/**
 * Authenticated POST request
 */
export const authPost = async <T>(url: string, data?: any, config?: RequestConfig): Promise<T> => {
    const response = await authClient.post<T>(url, data, config);
    return response.data;
};

/**
 * Authenticated PUT request
 */
export const authPut = async <T>(url: string, data?: any, config?: RequestConfig): Promise<T> => {
    const response = await authClient.put<T>(url, data, config);
    return response.data;
};

/**
 * Authenticated PATCH request
 */
export const authPatch = async <T>(url: string, data?: any, config?: RequestConfig): Promise<T> => {
    const response = await authClient.patch<T>(url, data, config);
    return response.data;
};

/**
 * Authenticated DELETE request
 */
export const authDelete = async <T>(url: string, config?: RequestConfig): Promise<T> => {
    const response = await authClient.delete<T>(url, config);
    return response.data;
};

/**
 * Authenticated HTTP client object
 */
export const authHttpClient = {
    get: authGet,
    post: authPost,
    put: authPut,
    patch: authPatch,
    delete: authDelete,
    httpDelete: authDelete,
} as const;

/**
 * Default export
 */
export default authHttpClient;
