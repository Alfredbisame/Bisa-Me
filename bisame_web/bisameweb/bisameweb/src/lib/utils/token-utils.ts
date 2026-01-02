/**
 * Token Utility Functions
 * JWT token validation and expiry checking
 */

import { jwtDecode } from 'jwt-decode';

/**
 * JWT payload interface
 */
interface JWTPayload {
    exp: number; 
    iat?: number; // Issued at
    sub?: string; // Subject (user ID)
    [key: string]: any;
}

/**
 * Check if a token is expired
 * @param token - JWT token string
 * @returns true if token is expired or invalid
 */
export const isTokenExpired = (token: string): boolean => {
    if (!token) return true;

    try {
        const decoded = jwtDecode<JWTPayload>(token);
        if (!decoded.exp) return true;

        // Token is expired if expiration time has passed
        return decoded.exp * 1000 < Date.now();
    } catch (error) {
        // If we can't decode the token, consider it expired
        return true;
    }
};

/**
 * Get the time remaining until token expires (in milliseconds)
 * @param token - JWT token string
 * @returns 
 */
export const tokenExpiresIn = (token: string): number => {
    if (!token) return 0;

    try {
        const decoded = jwtDecode<JWTPayload>(token);
        if (!decoded.exp) return 0;

        const expiresIn = decoded.exp * 1000 - Date.now();
        return Math.max(0, expiresIn);
    } catch (error) {
        return 0;
    }
};

/**
 * Check if token should be refreshed
 * Returns true if token expires in less than 5 minutes
 * @param token - 
 * @returns 
 */
export const shouldRefreshToken = (token: string): boolean => {
    const expiresIn = tokenExpiresIn(token);
    const FIVE_MINUTES = 5 * 60 * 1000;

    return expiresIn > 0 && expiresIn < FIVE_MINUTES;
};

/**
 * Decode token payload without validation
 * @param token - 
 * @returns 
 */
export const decodeToken = <T = JWTPayload>(token: string): T | null => {
    if (!token) return null;

    try {
        return jwtDecode<T>(token);
    } catch (error) {
        return null;
    }
};

/**
 * Get token expiration date
 * @param token - JWT token string
 * @returns Date object or null if invalid
 */
export const getTokenExpiration = (token: string): Date | null => {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return null;

    return new Date(decoded.exp * 1000);
};

/**
 * Check if token is valid (not expired and properly formatted)
 * @param token 
 * @returns 
 */
export const isTokenValid = (token: string): boolean => {
    if (!token) return false;

    try {
        const decoded = jwtDecode<JWTPayload>(token);
        return decoded.exp ? decoded.exp * 1000 > Date.now() : false;
    } catch (error) {
        return false;
    }
};
