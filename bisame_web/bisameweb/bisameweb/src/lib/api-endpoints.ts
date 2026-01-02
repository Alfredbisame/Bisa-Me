/**
 * API Endpoints Configuration
 * Centralized endpoint definitions organized by domain
 */

import {
  AUTH_API_BASE_URL,
  LISTINGS_BASE_URL,
  APP_CONFIG,
} from "./config/constants";

/**
 * Authentication Endpoints
 * Base URL: AUTH_API_BASE_URL
 */
export const AUTH_ENDPOINTS = {
  login: "/api/authentication/login",
  googleLogin: "/api/authentication/google",
  appleLogin: "/api/authentication/apple",
  verifyOtp: "/api/authentication/verify-otp",
  forgotPassword: "/api/authentication/forgot-password",
  resendOtp: "/api/authentication/resend-otp",
  resetPassword: "/api/authentication/reset-password",
  signup: "/api/authentication/signup",
  profile: "/api/authentication/profile",
  logout: "/api/authentication/logout",
  changePassword: "/api/authentication/change-password",
  deleteAccount: "/api/authentication/delete-account",
  updateProfile: "/api/authentication/update-profile",
} as const;

/**
 * Listings Endpoints
 * Base URL: LISTINGS_BASE_URL
 */
export const LISTINGS_ENDPOINTS = {
  trending: "/v1/api/listings/trending",
  favorites: "/v1/api/listings/favorites",
  details: "/v1/api/listings/{id}",
  list: "/v1/api/listings",
  search: "/v1/api/listings/search",
  newArrivals: "/v1/api/listings/new-arrivals",
  recentViews: "/v1/api/listings/recent-views",
} as const;

/**
 * Category Endpoints
 * Base URL: LISTINGS_BASE_URL
 */
export const CATEGORY_ENDPOINTS = {
  all: "/v1/api/categories/all",
  base: "/v1/api/categories/all",
  dropdownOptions: "/v1/api/forms/category-attribute-dropdown-options",
} as const;

/**
 * Region Endpoints
 * Base URL: LISTINGS_BASE_URL
 */
export const REGION_ENDPOINTS = {
  listingsSummary: "/v1/api/regions/listings-summary",
  ranked: "/v1/api/regions/ranked",
} as const;

/**
 * Profile Endpoints
 * Base URL: LISTINGS_BASE_URL
 */
export const PROFILE_ENDPOINTS = {
  listings: "/v1/api/profile/listings",
  customerReviews: "/v1/api/profile/customer-reviews",
  referralStats: "/v1/api/profile/referral-stats",
  dashboard: "/v1/api/profile/listings/stats",
  promotions: "/v1/api/profile/promotions",
  activatePosts: "/v1/api/profile/listing/status/{id}",
} as const;

/**
 * Favorites Endpoints
 * Base URL: LISTINGS_BASE_URL
 */
export const FAVORITES_ENDPOINTS = {
  base: "/v1/api/favorites",
  delete: "/v1/api/favorites/{listingId}",
} as const;

/**
 * Review Endpoints
 * Base URL: LISTINGS_BASE_URL
 */
export const REVIEW_ENDPOINTS = {
  base: "/v1/api/customer-reviews",
  listingReviews: "/v1/api/customer-reviews",
  reply: "/v1/api/customer-reviews/{id}/reply",
} as const;

/**
 * Follow Endpoints
 * Base URL: LISTINGS_BASE_URL
 */
export const FOLLOW_ENDPOINTS = {
  following: "/v1/api/follows/following",
  followers: "/v1/api/follows/followers",
  follow: "/v1/api/follows/follow",
  unfollow: "/v1/api/follows/unfollow",
  summary: "/v1/api/follows/summary/user/{userId}",
} as const;

/**
 * Chat Endpoints
 * Base URL: LISTINGS_BASE_URL
 */
export const CHAT_ENDPOINTS = {
  contacts: "/v1/api/chat-contacts",
  messages: "/v1/api/chat-messages",
} as const;

/**
 * Promotion Endpoints
 * Base URL: LISTINGS_BASE_URL
 */
export const PROMOTION_ENDPOINTS = {
  plans: "/v1/api/promotions/plans",
  purchase: "/v1/api/promotions/purchase",
} as const;

/**
 * File Upload Endpoints
 * Base URL: LISTINGS_BASE_URL
 */
export const FILE_ENDPOINTS = {
  upload: "/v1/api/files/upload",
} as const;

/**
 * Search Endpoints
 * Base URL: LISTINGS_BASE_URL
 */
export const SEARCH_ENDPOINTS = {
  popular: "/v1/api/searches/popular",
} as const;

/**
 * Form Endpoints
 * Base URL: LISTINGS_BASE_URL
 */
export const FORM_ENDPOINTS = {
  adRequest: "/v1/api/forms/ad-request",
  serviceOptions: "/v1/api/services-options",
} as const;

/**
 * Miscellaneous Endpoints
 * Base URL: LISTINGS_BASE_URL
 */
export const MISC_ENDPOINTS = {
  complains: "/v1/api/complains",
  homePageSections: "/v1/api/home-page/home-page-section-ads",
  tvLiveStream: APP_CONFIG.tvLiveStream,
} as const;

export const TRANSACTION_ENDPOINTS = {
  initiate: "/v1/api/transactions/promotion/initiate",
  status: "/v1/api/transactions/{id}",
} as const;

export const EARNING_ENDPOINTS = {
  userEarning: "/v1/api/earnings/user",
} as const;

/**
 * All Endpoints Combined
 * Provides a single object with all endpoints for easy access
 */
export const API_ENDPOINTS = {
  auth: AUTH_ENDPOINTS,
  listings: LISTINGS_ENDPOINTS,
  categories: CATEGORY_ENDPOINTS,
  regions: REGION_ENDPOINTS,
  profile: PROFILE_ENDPOINTS,
  favorites: FAVORITES_ENDPOINTS,
  reviews: REVIEW_ENDPOINTS,
  follows: FOLLOW_ENDPOINTS,
  chat: CHAT_ENDPOINTS,
  promotions: PROMOTION_ENDPOINTS,
  files: FILE_ENDPOINTS,
  search: SEARCH_ENDPOINTS,
  forms: FORM_ENDPOINTS,
  misc: MISC_ENDPOINTS,
  transactions: TRANSACTION_ENDPOINTS,
  earning: EARNING_ENDPOINTS,
} as const;

/**
 * Helper function to build full URL for auth endpoints
 */
export const buildAuthUrl = (endpoint: string): string => {
  const base = AUTH_API_BASE_URL.endsWith("/")
    ? AUTH_API_BASE_URL.slice(0, -1)
    : AUTH_API_BASE_URL;
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
};

/**
 * Helper function to build full URL for listings endpoints
 */
export const buildListingsUrl = (endpoint: string): string => {
  const base = LISTINGS_BASE_URL.endsWith("/")
    ? LISTINGS_BASE_URL.slice(0, -1)
    : LISTINGS_BASE_URL;
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
};

export const buildProfileUrl = (endpoint: string): string => {
  const url = `${LISTINGS_BASE_URL}${endpoint}`;

  return url;
};

/**
 * Helper function to replace path parameters (e.g., {id} with actual value)
 * @param endpoint - Endpoint with placeholders like '/listings/{id}'
 * @param params - Object with key-value pairs to replace, e.g., { id: '123' }
 */
export const replacePathParams = (
  endpoint: string,
  params: Record<string, string | number>
): string => {
  let result = endpoint;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`{${key}}`, String(value));
  });
  return result;
};

/**
 * Type definitions for better TypeScript support
 */
export type AuthEndpoint = keyof typeof AUTH_ENDPOINTS;
export type ListingsEndpoint = keyof typeof LISTINGS_ENDPOINTS;
export type CategoryEndpoint = keyof typeof CATEGORY_ENDPOINTS;
export type RegionEndpoint = keyof typeof REGION_ENDPOINTS;
export type ProfileEndpoint = keyof typeof PROFILE_ENDPOINTS;
export type FavoritesEndpoint = keyof typeof FAVORITES_ENDPOINTS;
export type ReviewEndpoint = keyof typeof REVIEW_ENDPOINTS;
export type FollowEndpoint = keyof typeof FOLLOW_ENDPOINTS;
export type ChatEndpoint = keyof typeof CHAT_ENDPOINTS;
export type PromotionEndpoint = keyof typeof PROMOTION_ENDPOINTS;
export type FileEndpoint = keyof typeof FILE_ENDPOINTS;
export type SearchEndpoint = keyof typeof SEARCH_ENDPOINTS;
export type FormEndpoint = keyof typeof FORM_ENDPOINTS;
export type MiscEndpoint = keyof typeof MISC_ENDPOINTS;
