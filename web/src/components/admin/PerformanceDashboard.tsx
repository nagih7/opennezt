import React, { useState, useEffect, useMemo } from 'react'
import { useWebVitals, useMemoryMonitor } from '~/hooks/useOptimizedPerformance'
import apiClient from '~/api/optimizedApi'

interface PerformanceMetrics {
   memory: {
      heapUsed: string
      heapTotal: string
      external: string
      rss: string
   }
   cpu: {
      user: number
      system: number
   }
   uptime: string
   nodeVersion: string
   platform: string
   arch: string
}

interface CacheStats {
   totalEntries: number
   validEntries: number
   expiredEntries: number
   hitRate: number
}

/**
 * Performance monitoring dashboard for admins
 */
const PerformanceDashboard: React.FC = () => {
   const [backendMetrics, setBackendMetrics] = useState<PerformanceMetrics | null>(null)
   const [cacheStats, setCacheStats] = useState<CacheStats | null>(null)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState<string | null>(null)
   const [autoRefresh, setAutoRefresh] = useState(true)

   const webVitals = useWebVitals()
   const memoryInfo = useMemoryMonitor()
   const frontendCacheStats = useMemo(() => apiClient.getCacheStats(), [])

   // Fetch backend metrics
   const fetchMetrics = async () => {
      try {
         setLoading(true)
         const [metricsResponse, cacheResponse] = await Promise.all([
            apiClient.get('/performance/metrics'),
            apiClient.get('/performance/cache/stats'),
         ])

         setBackendMetrics(metricsResponse.data)
         setCacheStats(cacheResponse.data)
         setError(null)
      } catch (err) {
         setError(err instanceof Error ? err.message : 'Failed to fetch metrics')
      } finally {
         setLoading(false)
      }
   }

   // Auto-refresh metrics
   useEffect(() => {
      fetchMetrics()

      if (autoRefresh) {
         const interval = setInterval(fetchMetrics, 30000) // Refresh every 30 seconds
         return () => clearInterval(interval)
      }
   }, [autoRefresh])

   // Clear cache
   const handleClearCache = async () => {
      try {
         await apiClient.delete('/performance/cache')
         apiClient.clearCache() // Clear frontend cache too
         await fetchMetrics()
      } catch (err) {
         setError('Failed to clear cache')
      }
   }

   // Performance score calculation
   const performanceScore = useMemo(() => {
      if (!webVitals.LCP || !webVitals.FID || !webVitals.CLS) return null

      let score = 100

      // LCP scoring (Largest Contentful Paint)
      if (webVitals.LCP > 4000) score -= 30
      else if (webVitals.LCP > 2500) score -= 15

      // FID scoring (First Input Delay)
      if (webVitals.FID > 300) score -= 30
      else if (webVitals.FID > 100) score -= 15

      // CLS scoring (Cumulative Layout Shift)
      if (webVitals.CLS > 0.25) score -= 30
      else if (webVitals.CLS > 0.1) score -= 15

      return Math.max(0, score)
   }, [webVitals])

   const getScoreColor = (score: number | null) => {
      if (!score) return 'text-gray-500'
      if (score >= 90) return 'text-green-600'
      if (score >= 70) return 'text-yellow-600'
      return 'text-red-600'
   }

   if (loading && !backendMetrics) {
      return (
         <div className="p-6">
            <div className="animate-pulse">
               <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                     <div key={i} className="bg-white p-6 rounded-lg shadow">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      )
   }

   return (
      <div className="p-6 max-w-7xl mx-auto">
         <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Performance Dashboard</h1>
            <div className="flex items-center space-x-4">
               <label className="flex items-center">
                  <input
                     type="checkbox"
                     checked={autoRefresh}
                     onChange={(e) => setAutoRefresh(e.target.checked)}
                     className="mr-2"
                  />
                  Auto-refresh
               </label>
               <button onClick={fetchMetrics} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Refresh
               </button>
               <button onClick={handleClearCache} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                  Clear Cache
               </button>
            </div>
         </div>

         {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

         {/* Performance Score */}
         <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Overall Performance Score</h2>
            <div className="flex items-center">
               <div className={`text-4xl font-bold ${getScoreColor(performanceScore)}`}>
                  {performanceScore ? `${performanceScore}/100` : 'Calculating...'}
               </div>
               <div className="ml-6 text-sm text-gray-600">
                  <div>LCP: {webVitals.LCP ? `${webVitals.LCP.toFixed(0)}ms` : 'N/A'}</div>
                  <div>FID: {webVitals.FID ? `${webVitals.FID.toFixed(0)}ms` : 'N/A'}</div>
                  <div>CLS: {webVitals.CLS ? webVitals.CLS.toFixed(3) : 'N/A'}</div>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Frontend Memory */}
            <div className="bg-white p-6 rounded-lg shadow">
               <h3 className="text-lg font-semibold mb-4">Frontend Memory</h3>
               {memoryInfo ? (
                  <div className="space-y-2">
                     <div>Used: {(memoryInfo.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB</div>
                     <div>Total: {(memoryInfo.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB</div>
                     <div>Limit: {(memoryInfo.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB</div>
                     <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                           className="bg-blue-600 h-2 rounded-full"
                           style={{
                              width: `${(memoryInfo.usedJSHeapSize / memoryInfo.totalJSHeapSize) * 100}%`,
                           }}
                        ></div>
                     </div>
                  </div>
               ) : (
                  <div className="text-gray-500">Not available</div>
               )}
            </div>

            {/* Backend Memory */}
            <div className="bg-white p-6 rounded-lg shadow">
               <h3 className="text-lg font-semibold mb-4">Backend Memory</h3>
               {backendMetrics ? (
                  <div className="space-y-2">
                     <div>Heap Used: {backendMetrics.memory.heapUsed}</div>
                     <div>Heap Total: {backendMetrics.memory.heapTotal}</div>
                     <div>RSS: {backendMetrics.memory.rss}</div>
                     <div>External: {backendMetrics.memory.external}</div>
                  </div>
               ) : (
                  <div className="text-gray-500">Loading...</div>
               )}
            </div>

            {/* Frontend Cache */}
            <div className="bg-white p-6 rounded-lg shadow">
               <h3 className="text-lg font-semibold mb-4">Frontend Cache</h3>
               <div className="space-y-2">
                  <div>Total Entries: {frontendCacheStats.totalEntries}</div>
                  <div>Valid Entries: {frontendCacheStats.validEntries}</div>
                  <div>Hit Rate: {(frontendCacheStats.hitRate * 100).toFixed(1)}%</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                     <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${frontendCacheStats.hitRate * 100}%` }}
                     ></div>
                  </div>
               </div>
            </div>

            {/* Backend Cache */}
            <div className="bg-white p-6 rounded-lg shadow">
               <h3 className="text-lg font-semibold mb-4">Backend Cache</h3>
               {cacheStats ? (
                  <div className="space-y-2">
                     <div>Total Entries: {cacheStats.totalEntries}</div>
                     <div>Valid Entries: {cacheStats.validEntries}</div>
                     <div>Hit Rate: {(cacheStats.hitRate * 100).toFixed(1)}%</div>
                     <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                           className="bg-green-600 h-2 rounded-full"
                           style={{ width: `${cacheStats.hitRate * 100}%` }}
                        ></div>
                     </div>
                  </div>
               ) : (
                  <div className="text-gray-500">Loading...</div>
               )}
            </div>

            {/* System Info */}
            <div className="bg-white p-6 rounded-lg shadow">
               <h3 className="text-lg font-semibold mb-4">System Info</h3>
               {backendMetrics ? (
                  <div className="space-y-2">
                     <div>Uptime: {backendMetrics.uptime}</div>
                     <div>Node: {backendMetrics.nodeVersion}</div>
                     <div>Platform: {backendMetrics.platform}</div>
                     <div>Arch: {backendMetrics.arch}</div>
                  </div>
               ) : (
                  <div className="text-gray-500">Loading...</div>
               )}
            </div>

            {/* Web Vitals */}
            <div className="bg-white p-6 rounded-lg shadow">
               <h3 className="text-lg font-semibold mb-4">Web Vitals</h3>
               <div className="space-y-2">
                  <div>FCP: {webVitals.FCP ? `${webVitals.FCP.toFixed(0)}ms` : 'N/A'}</div>
                  <div>LCP: {webVitals.LCP ? `${webVitals.LCP.toFixed(0)}ms` : 'N/A'}</div>
                  <div>FID: {webVitals.FID ? `${webVitals.FID.toFixed(0)}ms` : 'N/A'}</div>
                  <div>CLS: {webVitals.CLS ? webVitals.CLS.toFixed(3) : 'N/A'}</div>
                  <div>TTFB: {webVitals.TTFB ? `${webVitals.TTFB.toFixed(0)}ms` : 'N/A'}</div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default PerformanceDashboard
