/**
 * Environment configuration utility
 * Access environment variables safely with fallbacks
 */

// Get environment name
export const ENV = import.meta.env.VITE_ENV || process.env.VITE_ENV || 'local'

// API URL based on environment
export const API_URL = import.meta.env.VITE_API_URL || process.env.VITE_API_URL || 'http://localhost:3456'

// Web push notification key
export const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY || process.env.VITE_VAPID_PUBLIC_KEY

// Current mode (development or production)
export const IS_PRODUCTION = import.meta.env.MODE === 'production'
export const IS_DEVELOPMENT = import.meta.env.MODE === 'development'
