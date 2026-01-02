import axios, { AxiosError, AxiosHeaders, AxiosInstance, InternalAxiosRequestConfig } from "axios";

// Extend AxiosRequestConfig to include custom retry properties
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  __retryCount?: number;
}

export interface ApiErrorShape {
  message: string;
  statusCode?: number;
  details?: unknown;
}

function getBaseURL(): string {
  const publicUrl = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL;
  const serverUrl = process.env.API_BASE_URL;
  return (publicUrl || serverUrl || "http://195.35.36.122:1991").replace(/\/+$/, "");
}

function createHttpClient(): AxiosInstance {
  const instance = axios.create({
    baseURL: getBaseURL(),
    withCredentials: true,
    timeout: 15000,
  });

  // Request interceptor: attach auth token if available
  instance.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("auth_token");
      if (token) {
        const headers = AxiosHeaders.from(config.headers);
        headers.set("Authorization", `Bearer ${token}`);
        config.headers = headers;
      }
    }
    return config;
  });

  // Simple retry policy
  const MAX_RETRIES = 2;
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const config: CustomAxiosRequestConfig = error.config || {} as CustomAxiosRequestConfig;
      const status = error.response?.status;

      // Normalize error shape
      const normalized: ApiErrorShape = {
        message:
          (error.response?.data as { message?: string })?.message || error.message || "Request failed",
        statusCode: status,
        details: error.response?.data,
      };

      // Do not retry for client errors except 429
      const isRetryableStatus = status ? status >= 500 || status === 429 : true;
      const shouldRetry = isRetryableStatus && (config.__retryCount || 0) < MAX_RETRIES;

      if (shouldRetry) {
        config.__retryCount = (config.__retryCount || 0) + 1;
        const delayMs = 300 * Math.pow(2, config.__retryCount);
        await new Promise((r) => setTimeout(r, delayMs));
        return instance(config);
      }

      return Promise.reject(normalized);
    }
  );

  return instance;
}

export const httpClient = createHttpClient();