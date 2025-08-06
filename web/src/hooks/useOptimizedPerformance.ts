import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { debounce, throttle } from 'lodash'

/**
 * Enhanced performance monitoring hook with Web Vitals
 */
export function useWebVitals() {
   const [vitals, setVitals] = useState<{
      CLS: number | null
      FID: number | null
      FCP: number | null
      LCP: number | null
      TTFB: number | null
   }>({
      CLS: null,
      FID: null,
      FCP: null,
      LCP: null,
      TTFB: null,
   })

   useEffect(() => {
      // Dynamically import web-vitals to avoid bundle bloat
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }: any) => {
         getCLS((metric: any) => setVitals((prev) => ({ ...prev, CLS: metric.value })))
         getFID((metric: any) => setVitals((prev) => ({ ...prev, FID: metric.value })))
         getFCP((metric: any) => setVitals((prev) => ({ ...prev, FCP: metric.value })))
         getLCP((metric: any) => setVitals((prev) => ({ ...prev, LCP: metric.value })))
         getTTFB((metric: any) => setVitals((prev) => ({ ...prev, TTFB: metric.value })))
      })
   }, [])

   return vitals
}

/**
 * Optimized debounce hook with cleanup
 */
export function useOptimizedDebounce<T extends (...args: any[]) => any>(
   callback: T,
   delay: number,
   deps: React.DependencyList = []
): T {
   const callbackRef = useRef(callback)
   callbackRef.current = callback

   const debouncedCallback = useMemo(
      () =>
         debounce((...args: Parameters<T>) => {
            callbackRef.current(...args)
         }, delay),
      [delay, ...deps]
   )

   useEffect(() => {
      return () => {
         debouncedCallback.cancel()
      }
   }, [debouncedCallback])

   return debouncedCallback as unknown as T
}

/**
 * Optimized throttle hook with cleanup
 */
export function useOptimizedThrottle<T extends (...args: any[]) => any>(
   callback: T,
   delay: number,
   deps: React.DependencyList = []
): T {
   const callbackRef = useRef(callback)
   callbackRef.current = callback

   const throttledCallback = useMemo(
      () =>
         throttle((...args: Parameters<T>) => {
            callbackRef.current(...args)
         }, delay),
      [delay, ...deps]
   )

   useEffect(() => {
      return () => {
         throttledCallback.cancel()
      }
   }, [throttledCallback])

   return throttledCallback as unknown as T
}

/**
 * Intersection Observer hook for lazy loading
 */
export function useIntersectionObserver(options: IntersectionObserverInit = {}): [React.RefCallback<Element>, boolean] {
   const [isIntersecting, setIsIntersecting] = useState(false)
   const [element, setElement] = useState<Element | null>(null)

   const observer = useMemo(() => {
      if (typeof window === 'undefined') return null

      return new IntersectionObserver(([entry]) => {
         setIsIntersecting(entry.isIntersecting)
      }, options)
   }, [options.root, options.rootMargin, options.threshold])

   useEffect(() => {
      if (!observer || !element) return

      observer.observe(element)
      return () => observer.disconnect()
   }, [observer, element])

   const ref = useCallback((node: Element | null) => {
      setElement(node)
   }, [])

   return [ref, isIntersecting]
}

/**
 * Memory usage monitoring hook
 */
export function useMemoryMonitor() {
   const [memoryInfo, setMemoryInfo] = useState<{
      usedJSHeapSize: number
      totalJSHeapSize: number
      jsHeapSizeLimit: number
   } | null>(null)

   useEffect(() => {
      const updateMemoryInfo = () => {
         if ('memory' in performance) {
            const memory = (performance as any).memory
            setMemoryInfo({
               usedJSHeapSize: memory.usedJSHeapSize,
               totalJSHeapSize: memory.totalJSHeapSize,
               jsHeapSizeLimit: memory.jsHeapSizeLimit,
            })
         }
      }

      updateMemoryInfo()
      const interval = setInterval(updateMemoryInfo, 5000) // Update every 5 seconds

      return () => clearInterval(interval)
   }, [])

   return memoryInfo
}

/**
 * Optimized event listener hook
 */
export function useOptimizedEventListener<T extends keyof WindowEventMap>(
   eventType: T,
   handler: (event: WindowEventMap[T]) => void,
   options: {
      throttle?: number
      debounce?: number
      passive?: boolean
   } = {}
) {
   const handlerRef = useRef(handler)
   handlerRef.current = handler

   useEffect(() => {
      let optimizedHandler = handlerRef.current

      if (options.throttle) {
         optimizedHandler = throttle(handlerRef.current, options.throttle)
      } else if (options.debounce) {
         optimizedHandler = debounce(handlerRef.current, options.debounce)
      }

      const eventOptions = {
         passive: options.passive ?? true,
      }

      window.addEventListener(eventType, optimizedHandler as any, eventOptions)

      return () => {
         window.removeEventListener(eventType, optimizedHandler as any)
         if ('cancel' in optimizedHandler) {
            ;(optimizedHandler as any).cancel()
         }
      }
   }, [eventType, options.throttle, options.debounce, options.passive])
}

/**
 * Component render tracking hook
 */
export function useRenderTracker(componentName: string) {
   const renderCount = useRef(0)
   const lastRenderTime = useRef(Date.now())

   renderCount.current += 1

   useEffect(() => {
      const currentTime = Date.now()
      const timeSinceLastRender = currentTime - lastRenderTime.current
      lastRenderTime.current = currentTime

      if (process.env.NODE_ENV === 'development') {
         console.log(`🔄 ${componentName} render #${renderCount.current} (${timeSinceLastRender}ms since last render)`)

         if (renderCount.current > 10) {
            console.warn(`⚠️ ${componentName} has rendered ${renderCount.current} times!`)
         }
      }
   })

   return {
      renderCount: renderCount.current,
      timeSinceLastRender: Date.now() - lastRenderTime.current,
   }
}

/**
 * Optimized state update hook to prevent unnecessary re-renders
 */
export function useOptimizedState<T>(
   initialState: T | (() => T),
   compareFn?: (prev: T, next: T) => boolean
): [T, (newState: T | ((prev: T) => T)) => void] {
   const [state, setState] = useState(initialState)

   const optimizedSetState = useCallback(
      (newState: T | ((prev: T) => T)) => {
         setState((prevState) => {
            const nextState = typeof newState === 'function' ? (newState as (prev: T) => T)(prevState) : newState

            // Use custom compare function or shallow comparison
            if (compareFn) {
               return compareFn(prevState, nextState) ? prevState : nextState
            }

            // Default shallow comparison for objects
            if (typeof prevState === 'object' && typeof nextState === 'object') {
               if (prevState === null || nextState === null) {
                  return prevState === nextState ? prevState : nextState
               }

               const prevKeys = Object.keys(prevState)
               const nextKeys = Object.keys(nextState)

               if (prevKeys.length !== nextKeys.length) {
                  return nextState
               }

               for (const key of prevKeys) {
                  if ((prevState as any)[key] !== (nextState as any)[key]) {
                     return nextState
                  }
               }

               return prevState
            }

            return prevState === nextState ? prevState : nextState
         })
      },
      [compareFn]
   )

   return [state, optimizedSetState]
}

/**
 * Hook for measuring component performance
 */
export function usePerformanceMeasure(measureName: string) {
   const startTimeRef = useRef<number | undefined>(undefined)

   useEffect(() => {
      startTimeRef.current = performance.now()

      return () => {
         if (startTimeRef.current) {
            const duration = performance.now() - startTimeRef.current
            if (process.env.NODE_ENV === 'development') {
               console.log(`⏱️ ${measureName}: ${duration.toFixed(2)}ms`)
            }

            // Mark performance for DevTools
            if (performance.mark && performance.measure) {
               performance.mark(`${measureName}-end`)
               performance.measure(measureName, `${measureName}-start`, `${measureName}-end`)
            }
         }
      }
   }, [measureName])

   useEffect(() => {
      if (performance.mark) {
         performance.mark(`${measureName}-start`)
      }
   }, [measureName])
}

export default {
   useWebVitals,
   useOptimizedDebounce,
   useOptimizedThrottle,
   useIntersectionObserver,
   useMemoryMonitor,
   useOptimizedEventListener,
   useRenderTracker,
   useOptimizedState,
   usePerformanceMeasure,
}
