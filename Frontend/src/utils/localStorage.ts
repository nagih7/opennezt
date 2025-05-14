/**
 * TypeScript version of the localStorage utilities
 */

const AUTH_TOKEN_STORE_KEY = 'token'
const LINKEDIN_NOTIFICATION_KEY = 'hideLinkedinNotification'

/**
 * Removes the authentication token from localStorage
 */
export const removeAuthToken = (): void => {
    localStorage.removeItem(AUTH_TOKEN_STORE_KEY)
}

/**
 * Sets the authentication token in localStorage
 * @param token The authentication token to store
 */
export const setAuthToken = (token: string): void => {
    localStorage.setItem(AUTH_TOKEN_STORE_KEY, token)
}

/**
 * Gets the authentication token from localStorage
 * @returns The stored authentication token or null if not found
 */
export const getAuthToken = (): string | null => {
    return localStorage.getItem(AUTH_TOKEN_STORE_KEY)
}

/**
 * Checks if an authentication token exists in localStorage
 * @returns true if a token exists, false otherwise
 */
export const hasAuthToken = (): boolean => {
    return !!getAuthToken()
}

/**
 * Removes an item from localStorage by name
 * @param name The key of the item to remove
 */
export const removeItem = (name: string): void => {
    localStorage.removeItem(name)
}

/**
 * Sets an item in localStorage
 * @param name The key to store the item under
 * @param value The value to store
 */
export const setItem = (name: string, value: string): void => {
    localStorage.setItem(name, value)
}

/**
 * Gets an item from localStorage by name
 * @param name The key of the item to retrieve
 * @returns The stored item or null if not found
 */
export const getItem = (name: string): string | null => {
    return localStorage.getItem(name)
}

/**
 * Sets the LinkedIn notification preference in localStorage
 * @param hide Whether to hide LinkedIn notifications
 */
export const setHideLinkedinNotification = (hide: boolean): void => {
    localStorage.setItem(LINKEDIN_NOTIFICATION_KEY, JSON.stringify(hide))
}

/**
 * Gets the LinkedIn notification preference from localStorage
 * @returns The stored preference or false if not found
 */
export const getHideLinkedinNotification = (): boolean => {
    const value = localStorage.getItem(LINKEDIN_NOTIFICATION_KEY)
    return value ? JSON.parse(value) : false
}
