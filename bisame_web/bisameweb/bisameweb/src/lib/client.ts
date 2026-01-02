/**
 * HTTP Client with Axios
 * Generic HTTP client with retry logic and SWR compatibility
 */

import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { logger } from '@/app/utils/logger';

/**
 * Custom request config with retry tracking
 */
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    __retryCount?: number;
}

/**
 * Standardized API error shape
 */
export class ApiError extends Error {
    constructor(
        public status: number,
        public statusText: string,
        public data?: any,
        message?: string
    ) {
        super(message || `API Error: ${status} ${statusText}`);
        this.name = 'ApiError';
    }
}

/**
 * Request configuration interface
 */
export interface RequestConfig extends AxiosRequestConfig {
    params?: Record<string, string | number | boolean>;
}

/**
 * Create HTTP client instance
 */
function createHttpClient(): AxiosInstance {
    const instance = axios.create({
        timeout: 15000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Request interceptor: log requests
    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            logger.debug('HTTP request', {
                url: config.url,
                method: config.method,
                baseURL: config.baseURL,
            });
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Response interceptor: handle errors and retry logic
    const MAX_RETRIES = 2;
    instance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            const config = error.config as CustomAxiosRequestConfig;
            const status = error.response?.status;

            // Log error
            logger.error('HTTP error', {
                url: config?.url,
                status: error.response?.status,
                data: error.response?.data,
            }, error);

            // Determine if we should retry
            const isRetryableStatus = status ? status >= 500 || status === 429 : true;
            const shouldRetry = isRetryableStatus && (config?.__retryCount || 0) < MAX_RETRIES;

            if (shouldRetry && config) {
                config.__retryCount = (config.__retryCount || 0) + 1;
                const delayMs = 300 * Math.pow(2, config.__retryCount);

                await new Promise((resolve) => setTimeout(resolve, delayMs));
                return instance(config);
            }

            // Create normalized error
            const apiError = new ApiError(
                status || 500,
                error.response?.statusText || 'Request failed',
                error.response?.data,
                (error.response?.data as any)?.message || error.message
            );

            return Promise.reject(apiError);
        }
    );

    return instance;
}

// Create singleton instance
const httpClient = createHttpClient();

/**
 * GET request
 * @param url - The endpoint URL
 * @param config - Optional request configuration
 * @returns Promise with typed response data
 */
export const get = async <T>(url: string, config?: RequestConfig): Promise<T> => {
    const response = await httpClient.get<T>(url, config);
    return response.data;
};

/**
 * POST request
 * @param url - The endpoint URL
 * @param data - The data to send in the request body
 * @param config - Optional request configuration
 * @returns Promise with typed response data
 */
export const post = async <T>(url: string, data?: any, config?: RequestConfig): Promise<T> => {
    const response = await httpClient.post<T>(url, data, config);
    return response.data;
};

/**
 * PUT request
 * @param url - The endpoint URL
 * @param data - The data to send in the request body
 * @param config - Optional request configuration
 * @returns Promise with typed response data
 */
export const put = async <T>(url: string, data?: any, config?: RequestConfig): Promise<T> => {
    const response = await httpClient.put<T>(url, data, config);
    return response.data;
};

/**
 * PATCH request
 * @param url - The endpoint URL
 * @param data - The data to send in the request body
 * @param config - Optional request configuration
 * @returns Promise with typed response data
 */
export const patch = async <T>(url: string, data?: any, config?: RequestConfig): Promise<T> => {
    const response = await httpClient.patch<T>(url, data, config);
    return response.data;
};

/**
 * DELETE request
 * @param url - The endpoint URL
 * @param config - Optional request configuration
 * @returns Promise with typed response data
 */
export const del = async <T>(url: string, config?: RequestConfig): Promise<T> => {
    const response = await httpClient.delete<T>(url, config);
    return response.data;
};

// Export as 'httpDelete' for clarity
export { del as httpDelete };

/**
 * HTTP Client object with all methods
 */
export const client = {
    get,
    post,
    put,
    patch,
    delete: del,
    httpDelete: del,
} as const;

/**
 * Default export
 */
export default client;
