import React from 'react'

// Utility để đo performance của React components
export class PerformanceMonitor {
   private static renderTimes: Map<string, number[]> = new Map()
   private static reRenderCounts: Map<string, number> = new Map()

   static startRender(componentName: string): () => void {
      const startTime = performance.now()

      // Đếm số lần re-render
      const currentCount = this.reRenderCounts.get(componentName) || 0
      this.reRenderCounts.set(componentName, currentCount + 1)

      return () => {
         const endTime = performance.now()
         const renderTime = endTime - startTime

         // Lưu thời gian render
         if (!this.renderTimes.has(componentName)) {
            this.renderTimes.set(componentName, [])
         }
         this.renderTimes.get(componentName)!.push(renderTime)

         console.log(`🔄 ${componentName} render #${currentCount + 1}: ${renderTime.toFixed(2)}ms`)
      }
   }

   static getStats(componentName: string) {
      const times = this.renderTimes.get(componentName) || []
      const count = this.reRenderCounts.get(componentName) || 0

      if (times.length === 0) {
         return {
            componentName,
            totalRenders: count,
            avgRenderTime: 0,
            minRenderTime: 0,
            maxRenderTime: 0,
            totalRenderTime: 0,
         }
      }

      const totalTime = times.reduce((sum, time) => sum + time, 0)
      const avgTime = totalTime / times.length
      const minTime = Math.min(...times)
      const maxTime = Math.max(...times)

      return {
         componentName,
         totalRenders: count,
         avgRenderTime: parseFloat(avgTime.toFixed(2)),
         minRenderTime: parseFloat(minTime.toFixed(2)),
         maxRenderTime: parseFloat(maxTime.toFixed(2)),
         totalRenderTime: parseFloat(totalTime.toFixed(2)),
      }
   }

   static getAllStats() {
      const allComponents = Array.from(new Set([...this.renderTimes.keys(), ...this.reRenderCounts.keys()]))

      return allComponents.map((name) => this.getStats(name))
   }

   static reset() {
      this.renderTimes.clear()
      this.reRenderCounts.clear()
   }

   static logSummary() {
      console.group('📊 Performance Summary')

      const stats = this.getAllStats()
      console.table(stats)

      // Tìm component có performance kém nhất
      const slowestComponent = stats.reduce((prev, current) =>
         current.avgRenderTime > prev.avgRenderTime ? current : prev
      )

      if (slowestComponent.avgRenderTime > 0) {
         console.warn(
            `⚠️ Slowest component: ${slowestComponent.componentName} (${slowestComponent.avgRenderTime}ms avg)`
         )
      }

      // Tìm component re-render nhiều nhất
      const mostRerenderedComponent = stats.reduce((prev, current) =>
         current.totalRenders > prev.totalRenders ? current : prev
      )

      if (mostRerenderedComponent.totalRenders > 10) {
         console.warn(
            `🔄 Most re-rendered: ${mostRerenderedComponent.componentName} (${mostRerenderedComponent.totalRenders} times)`
         )
      }

      console.groupEnd()
   }
}

// Hook để đo performance của component
export function usePerformanceMonitor(componentName: string) {
   const endRender = PerformanceMonitor.startRender(componentName)

   // Cleanup function được gọi sau khi render hoàn tất
   React.useEffect(() => {
      endRender()
   })

   return PerformanceMonitor.getStats(componentName)
}

// Component wrapper để đo performance
export function withPerformanceMonitor<T extends object>(Component: React.ComponentType<T>, displayName: string) {
   const WrappedComponent = React.forwardRef<any, React.PropsWithoutRef<T>>((props, ref) => {
      usePerformanceMonitor(displayName)
      return <Component {...(props as T)} ref={ref} />
   })

   WrappedComponent.displayName = `withPerformanceMonitor(${displayName})`
   return WrappedComponent
}

// Debounce utility để tối ưu event handlers
export function useDebounce<T extends (...args: any[]) => any>(callback: T, delay: number): T {
   const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

   return React.useCallback(
      (...args: Parameters<T>) => {
         if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
         }

         timeoutRef.current = setTimeout(() => {
            callback(...args)
         }, delay)
      },
      [callback, delay]
   ) as T
}

// Throttle utility cho scroll events
export function useThrottle<T extends (...args: any[]) => any>(callback: T, delay: number): T {
   const lastRun = React.useRef(Date.now())

   return React.useCallback(
      (...args: Parameters<T>) => {
         if (Date.now() - lastRun.current >= delay) {
            callback(...args)
            lastRun.current = Date.now()
         }
      },
      [callback, delay]
   ) as T
}

// Development-only performance warnings
export function usePerformanceWarning(componentName: string, maxRenderTime = 16) {
   if (process.env.NODE_ENV !== 'development') return

   React.useEffect(() => {
      const stats = PerformanceMonitor.getStats(componentName)

      if (stats.maxRenderTime > maxRenderTime) {
         console.warn(
            `⚠️ ${componentName} exceeded ${maxRenderTime}ms render time! ` +
               `Max: ${stats.maxRenderTime}ms, Avg: ${stats.avgRenderTime}ms`
         )
      }

      if (stats.totalRenders > 20) {
         console.warn(`🔄 ${componentName} has re-rendered ${stats.totalRenders} times! ` + `Consider memoization.`)
      }
   })
}
