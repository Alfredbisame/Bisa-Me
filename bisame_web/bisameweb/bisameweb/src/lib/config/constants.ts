/**
 * Application Configuration Constants
 * Centralized configuration for API base URLs and application settings
 */

// API Base URLs
export const AUTH_API_BASE_URL = process.env.NEXT_PUBLIC_AUTH_API_BASE_URL || 'https://auth.bisame.com/';
export const LISTINGS_BASE_URL = process.env.NEXT_PUBLIC_LISTINGS_BASE_URL || 'https://api.bisame.com';

// Firebase Configuration
export const FIREBASE_CONFIG = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyBef4v8czkS-OjR_YkZXAVfrSmP2FHgS84',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'bisame-7e19a',
    projectNumber: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_NUMBER || '391332604377',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'bisame-7e19a.firebaseapp.com',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'bisame-7e19a.firebasestorage.app',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:391332604377:android:dbbc5c488c061649ecd1c8',
} as const;

// Google OAuth Configuration
export const GOOGLE_OAUTH = {
    clientId: process.env.GOOGLE_CLIENT_ID || '1078796681059-koka000hp81814r1i2h5jh1us2ks9u74.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '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',
} as const;

// NextAuth Configuration
export const NEXTAUTH = {
    secret: process.env.NEXTAUTH_SECRET || 'w0JZFc/1dwVSfOZq/FaCrLALG7H2iD9EWuhB28ZaLyw-',
    url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
} as const;

// Application Settings
export const APP_CONFIG = {
    defaultCountryCode: process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_CODE || 'GH',
    tvLiveStream: process.env.NEXT_PUBLIC_TV_LIVE_STREAM || 'https://live.bisame.com/hls/bisame.m3u8',
} as const;

// Storage Keys - Consolidated to single token key
export const STORAGE_KEYS = {
    authToken: 'auth-token', 
    user: 'user', 
} as const;
