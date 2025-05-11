import React, { createContext, useState, useEffect, useContext } from 'react'
import signalService from '../../services/SignalServiceBrowser'

// Create context
const SignalContext = createContext({
    initialized: false,
    initializing: false,
    error: null,
    activeSessions: new Set(),
    establishSession: async () => {},
    hasSession: () => false,
})

/**
 * Provider component for Signal Protocol context
 * This manages encryption state across the application
 */
export const SignalProvider = ({ children }) => {
    const [initialized, setInitialized] = useState(false)
    const [initializing, setInitializing] = useState(false)
    const [error, setError] = useState(null)
    const [activeSessions, setActiveSessions] = useState(new Set()) // Initialize Signal Protocol when the app starts
    useEffect(() => {
        // Create a flag to track if the component is mounted
        let isMounted = true

        const initSignal = async () => {
            // Don't run initialization if already initialized or in progress
            if (initialized || initializing) return

            setInitializing(true)

            try {
                // Only initialize if not already initialized and component is still mounted
                if (!signalService.initialized && isMounted) {
                    await signalService.initializeKeys()
                }

                // Only update state if component is still mounted
                if (isMounted) {
                    setInitialized(true)
                    setError(null)
                }
            } catch (err) {
                if (isMounted) {
                    setError(`Failed to initialize Signal Protocol: ${err.message}`)
                    console.error('Error initializing Signal Protocol:', err)
                }
            } finally {
                if (isMounted) {
                    setInitializing(false)
                }
            }
        }

        initSignal()

        // Cleanup function to prevent state updates after unmounting
        return () => {
            isMounted = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Update active sessions whenever they change
    useEffect(() => {
        // Create a function to check active sessions
        const updateActiveSessions = () => {
            setActiveSessions(new Set(signalService.activeSessions))
        }

        // Check initial state
        updateActiveSessions()

        // Set up interval to periodically check (every 30 seconds)
        const interval = setInterval(updateActiveSessions, 30000)

        // Clean up interval
        return () => clearInterval(interval)
    }, [])

    /**
     * Establish a session with another user
     * @param {String} userId - User ID to establish session with
     */
    const establishSession = async (userId) => {
        if (!initialized) {
            throw new Error('Signal Protocol not initialized')
        }

        try {
            await signalService.establishSession(userId)
            setActiveSessions(new Set(signalService.activeSessions))
            return true
        } catch (err) {
            console.error('Error establishing session:', err)
            throw err
        }
    }

    /**
     * Check if a session exists with a user
     * @param {String} userId - User ID
     * @returns {Boolean} Whether a session exists
     */
    const hasSession = (userId) => {
        return signalService.hasSession(userId)
    }

    // Context value
    const contextValue = {
        initialized,
        initializing,
        error,
        activeSessions,
        establishSession,
        hasSession,
    }

    return <SignalContext.Provider value={contextValue}>{children}</SignalContext.Provider>
}

/**
 * Hook to use the Signal Protocol context
 */
export const useSignal = () => {
    const context = useContext(SignalContext)

    if (!context) {
        throw new Error('useSignal must be used within a SignalProvider')
    }

    return context
}

export default SignalContext
