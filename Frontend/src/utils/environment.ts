/**
 * Utility functions for environment detection and configuration
 */

// Check if the app is running in development mode
export const isDevelopment = (): boolean => {
   return import.meta.env.MODE === 'development' || process.env.NODE_ENV === 'development'
}

// Check if the app is running in production mode
export const isProduction = (): boolean => {
   return import.meta.env.MODE === 'production' || process.env.NODE_ENV === 'production'
}

// Get the current environment name
export const getEnvironment = (): string => {
   return isProduction() ? 'production' : 'development'
}

// Log the current environment
export const logEnvironment = (): void => {
   console.log(`Application running in ${getEnvironment()} mode`)
   console.log('API URL:', import.meta.env.VITE_API_URL)
}
