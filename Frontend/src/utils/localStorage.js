const AUTH_TOKEN_STORE_KEY = 'token'
const LINKEDIN_NOTIFICATION_KEY = 'hideLinkedinNotification'

export const removeAuthToken = () => {
    return localStorage.removeItem(AUTH_TOKEN_STORE_KEY)
}

export const setAuthToken = (token) => {
    return localStorage.setItem(AUTH_TOKEN_STORE_KEY, token)
}

export const getAuthToken = () => {
    return localStorage.getItem(AUTH_TOKEN_STORE_KEY)
}

export const hasAuthToken = () => {
    return !!getAuthToken()
}

export const removeItem = (name) => {
    return localStorage.removeItem(name)
}

export const setItem = (name, value) => {
    return localStorage.setItem(name, value)
}

export const getItem = (name) => {
    return localStorage.getItem(name)
}

// LinkedIn notification preference functions
export const setHideLinkedinNotification = (hide) => {
    return localStorage.setItem(LINKEDIN_NOTIFICATION_KEY, JSON.stringify(hide))
}

export const getHideLinkedinNotification = () => {
    const value = localStorage.getItem(LINKEDIN_NOTIFICATION_KEY)
    return value ? JSON.parse(value) : false
}
