import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { toast } from "react-hot-toast";
import { logger } from "@/app/utils/logger";

interface ApiErrorResponse {
  message?: string;
  error?: string;
  details?: unknown;
}

const API_BASE_URL = (process.env.NEXT_PUBLIC_AUTH_API_BASE_URL || "http://195.35.36.122:1991")
  .replace(/\/+$/, "");

function getTokenFromCookies(): string | null {
  if (typeof document === "undefined") return null;
  const cookie = document.cookie || "";
  const match = cookie.split(";").find((c) => c.trim().startsWith("auth-token="));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

export class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string = API_BASE_URL) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    // Request Interceptor: Add auth token (localStorage or cookie)
    this.client.interceptors.request.use(
      (config) => {
        logger.debug("HTTP request", { url: config.url, method: config.method, baseURL: config.baseURL });
        let token: string | null = null;
        if (typeof window !== "undefined") {
          token = window.localStorage.getItem("auth_token") || getTokenFromCookies();
        }
        if (token) {
          // Set the Authorization header
          config.headers = config.headers || {};
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor: Handle errors globally
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiErrorResponse>) => {
        const message = error.response?.data?.message || error.message || "An error occurred";
        logger.error("HTTP error", { 
          url: error.config?.url, 
          status: error.response?.status, 
          data: error.response?.data 
        }, error);
        if (typeof window !== "undefined") {
          if (error.response?.status === 401) {
            try {
              window.localStorage.removeItem("auth_token");
            } catch {}
            window.location.href = "/login";
          }
          toast.error(message);
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data as T;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data as T;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data as T;
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data as T;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data as T;
  }
}

export const apiClient = new ApiClient();