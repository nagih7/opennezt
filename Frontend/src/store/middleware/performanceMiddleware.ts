import { Middleware } from '@reduxjs/toolkit'
import { RootState } from '../index'

/**
 * Performance monitoring middleware for Redux
 */
export const performanceMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
   const startTime = performance.now()
   const stateBefore = store.getState()

   // Execute action
   const result = next(action)

   const endTime = performance.now()
   const stateAfter = store.getState()
   const duration = endTime - startTime

   // Log slow actions in development
   if (process.env.NODE_ENV === 'development') {
      if (duration > 16) {
         // Actions taking longer than 16ms (1 frame)
         console.warn(`🐌 Slow Redux action: ${(action as { type: string }).type} took ${duration.toFixed(2)}ms`)
      }

      // Log state size changes
      const beforeSize = JSON.stringify(stateBefore).length
      const afterSize = JSON.stringify(stateAfter).length
      const sizeDiff = afterSize - beforeSize

      if (Math.abs(sizeDiff) > 10000) {
         // State size changed by more than 10KB
         console.warn(
            `📊 Large state change: ${(action as { type: string }).type} changed state size by ${(sizeDiff / 1024).toFixed(2)}KB`
         )
      }
   }

   return result
}

/**
 * Action batching middleware to reduce re-renders
 */
export const batchingMiddleware: Middleware<{}, RootState> = (store) => (next) => {
   let batchedActions: any[] = []
   let batchTimeout: NodeJS.Timeout | null = null

   return (action) => {
      // Add action to batch
      batchedActions.push(action)

      // Clear existing timeout
      if (batchTimeout) {
         clearTimeout(batchTimeout)
      }

      // Set new timeout to process batch
      batchTimeout = setTimeout(() => {
         // Process all batched actions
         const actions = [...batchedActions]
         batchedActions = []
         batchTimeout = null

         // Execute actions
         actions.forEach((batchedAction) => {
            next(batchedAction)
         })
      }, 0) // Process in next tick

      // For synchronous actions that need immediate processing
      if ((action as { meta?: { immediate?: boolean } }).meta?.immediate) {
         if (batchTimeout) {
            clearTimeout(batchTimeout)
            batchTimeout = null
         }
         const actions = [...batchedActions]
         batchedActions = []
         actions.forEach((batchedAction) => {
            next(batchedAction)
         })
      }
   }
}

/**
 * Memory monitoring middleware
 */
export const memoryMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
   const result = next(action)

   // Monitor memory usage periodically
   if (typeof window !== 'undefined' && 'memory' in performance) {
      const memory = (performance as any).memory
      const usedMB = memory.usedJSHeapSize / 1024 / 1024

      if (usedMB > 100) {
         // Warn if memory usage exceeds 100MB
         console.warn(`🧠 High memory usage: ${usedMB.toFixed(2)}MB`)
      }
   }

   return result
}

/**
 * State persistence middleware with compression
 */
export const persistenceMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
   const result = next(action)

   // Only persist certain slices
   const persistableSlices = ['auth', 'user', 'app']

   if (persistableSlices.some((slice) => (action as { type: string }).type.startsWith(slice))) {
      try {
         const state = store.getState()
         const persistableState = persistableSlices.reduce((acc, slice) => {
            acc[slice] = (state as any)[slice]
            return acc
         }, {} as any)

         // Compress and store
         const compressed = JSON.stringify(persistableState)
         localStorage.setItem('opennezt_state', compressed)
      } catch (error) {
         console.warn('Failed to persist state:', error)
      }
   }

   return result
}

/**
 * Action analytics middleware
 */
export const analyticsMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
   const result = next(action)

   // Track user actions for analytics
   if ((action as { type: string }).type.includes('user') || (action as { type: string }).type.includes('auth')) {
      // Send to analytics service
      if (typeof window !== 'undefined' && (window as any).gtag) {
         ;(window as any).gtag('event', 'redux_action', {
            action_type: (action as { type: string }).type,
            timestamp: Date.now(),
         })
      }
   }

   return result
}

/**
 * Error boundary middleware
 */
export const errorMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
   try {
      return next(action)
   } catch (error) {
      console.error(`Redux action error: ${(action as { type: string }).type}`, error)

      // Dispatch error action
      store.dispatch({
         type: 'app/setError',
         payload: {
            message: error instanceof Error ? error.message : 'Unknown error',
            action: (action as { type: string }).type,
            timestamp: Date.now(),
         },
      })

      // Re-throw error for development
      if (process.env.NODE_ENV === 'development') {
         throw error
      }

      return error
   }
}

/**
 * Combine all performance middlewares
 */
export const performanceMiddlewares = [
   errorMiddleware,
   performanceMiddleware,
   memoryMiddleware,
   persistenceMiddleware,
   analyticsMiddleware,
]

/**
 * Selector performance monitoring
 */
export function createPerformanceSelector<T, R>(selector: (state: T) => R, name: string): (state: T) => R {
   return (state: T) => {
      const startTime = performance.now()
      const result = selector(state)
      const endTime = performance.now()
      const duration = endTime - startTime

      if (process.env.NODE_ENV === 'development' && duration > 5) {
         console.warn(`🔍 Slow selector: ${name} took ${duration.toFixed(2)}ms`)
      }

      return result
   }
}

/**
 * Memoized selector creator with performance monitoring
 */
export function createMemoizedSelector<T, R>(
   selector: (state: T) => R,
   name: string,
   equalityFn?: (a: R, b: R) => boolean
): (state: T) => R {
   let lastState: T
   let lastResult: R
   let callCount = 0

   return (state: T) => {
      callCount++

      // Use custom equality function or reference equality
      const isEqual = equalityFn ? equalityFn : (a: R, b: R) => a === b

      if (lastState === state && lastResult !== undefined) {
         return lastResult
      }

      const startTime = performance.now()
      const result = selector(state)
      const endTime = performance.now()
      const duration = endTime - startTime

      lastState = state
      lastResult = result

      if (process.env.NODE_ENV === 'development') {
         if (duration > 5) {
            console.warn(`🔍 Slow selector: ${name} took ${duration.toFixed(2)}ms (call #${callCount})`)
         }

         if (callCount % 100 === 0) {
            console.log(`🔍 Selector ${name} called ${callCount} times`)
         }
      }

      return result
   }
}

export default {
   performanceMiddleware,
   batchingMiddleware,
   memoryMiddleware,
   persistenceMiddleware,
   analyticsMiddleware,
   errorMiddleware,
   performanceMiddlewares,
   createPerformanceSelector,
   createMemoizedSelector,
}
