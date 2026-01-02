/**
 * Utility functions for authentication in the socket client
 */

/**
 * Get auth token from cookies in browser environment
 * @returns Auth token or null if not found
 */
export const getAuthTokenFromCookies = (): string | null => {
  if (typeof window === 'undefined') {
    // We're in a server environment
    return null;
  }

  try {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    
    for (const cookie of cookies) {
      if (cookie.startsWith('auth-token=')) {
        const token = cookie.substring('auth-token='.length);
        return token ? decodeURIComponent(token) : null;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error reading auth token from cookies:', error);
    return null;
  }
};

/**
 * Get auth token from request headers (server-side)
 * @param headers - Request headers
 * @returns Auth token or null if not found
 */
export const getAuthTokenFromHeaders = (headers: Headers): string | null => {
  try {
    // Try to get from Authorization header first
    const authHeader = headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7); // Remove 'Bearer ' prefix
    }
    
    // Fallback to cookie header
    const cookieHeader = headers.get('cookie');
    if (!cookieHeader) {
      return null;
    }
    
    const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
    
    for (const cookie of cookies) {
      if (cookie.startsWith('auth-token=')) {
        const token = cookie.substring('auth-token='.length);
        return token ? decodeURIComponent(token) : null;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error reading auth token from headers:', error);
    return null;
  }
};

// Assign object to a variable before exporting as module default
const authUtils = {
  getAuthTokenFromCookies,
  getAuthTokenFromHeaders
};

export default authUtils;