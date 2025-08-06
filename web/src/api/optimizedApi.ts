import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'

interface CacheEntry<T = any> {
   data: T
   timestamp: number
   expiresAt: number
   hitCount: number
}

interface EnhancedInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
   metadata?: {
      startTime: number
      requestId: string
   }
}

interface CircuitBreakerConfig {
   threshold: number
   timeout: number
   monitoringPeriod: number
}

interface RequestConfig extends AxiosRequestConfig {
   cache?:
      | {
           ttl?: number // Time to live in milliseconds
           key?: string // Custom cache key
           invalidatePattern?: string // Pattern to invalidate related cache entries
           enabled?: boolean // Whether caching is enabled for this request
        }
      | false // Allow false to disable caching
   retry?: {
      attempts?: number
      delay?: number
      maxDelay?: number
   }
   timeout?: number
   transformRequest?: (data: any) => any
   transformResponse?: (data: any) => any
   circuitBreaker?: boolean
}

/**
 * Circuit Breaker implementation for API resilience
 */
class CircuitBreaker {
   private failures = 0
   private lastFailureTime = 0
   private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED'
   private nextAttempt = 0

   constructor(private config: CircuitBreakerConfig) {}

   async execute<T>(fn: () => Promise<T>): Promise<T> {
      if (this.state === 'OPEN') {
         if (Date.now() > this.nextAttempt) {
            this.state = 'HALF_OPEN'
         } else {
            throw new Error(`Circuit breaker is OPEN. Next attempt in ${this.nextAttempt - Date.now()}ms`)
         }
      }

      try {
         const result = await fn()
         this.onSuccess()
         return result
      } catch (error) {
         this.onFailure()
         throw error
      }
   }

   private onSuccess() {
      this.failures = 0
      this.state = 'CLOSED'
   }

   private onFailure() {
      this.failures++
      this.lastFailureTime = Date.now()

      if (this.failures >= this.config.threshold) {
         this.state = 'OPEN'
         this.nextAttempt = Date.now() + this.config.timeout
      }
   }

   getState() {
      return {
         state: this.state,
         failures: this.failures,
         lastFailureTime: this.lastFailureTime,
         nextAttempt: this.nextAttempt,
      }
   }

   reset() {
      this.failures = 0
      this.state = 'CLOSED'
      this.lastFailureTime = 0
      this.nextAttempt = 0
   }
}

/**
 * Optimized API client with caching, retry logic, circuit breaker, and performance monitoring
 * Created: 2025-06-08 14:40:47 UTC
 * Author: vuongmanhnghia
 */
class OptimizedApiClient {
   private client: AxiosInstance
   private cache = new Map<string, CacheEntry>()
   private requestQueue = new Map<string, Promise<any>>()
   private pendingRequests = new Map<string, AbortController>()
   private circuitBreaker: CircuitBreaker
   private cleanupInterval?: NodeJS.Timeout

   // Configuration
   private readonly defaultCacheTTL = 5 * 60 * 1000 // 5 minutes
   private readonly maxCacheSize = 100
   private readonly defaultRetryAttempts = 3
   private readonly defaultRetryDelay = 1000
   private readonly maxRetryDelay = 10000

   // Statistics
   private stats = {
      totalRequests: 0,
      cacheHits: 0,
      cacheMisses: 0,
      retries: 0,
      failures: 0,
      createdAt: new Date().toISOString(),
      createdBy: 'vuongmanhnghia',
   }

   constructor(baseURL: string, circuitBreakerConfig?: Partial<CircuitBreakerConfig>) {
      this.client = axios.create({
         baseURL,
         timeout: 10000,
         headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'OptimizedApiClient/1.0.0',
            'X-Client-Version': '1.0.0',
            'X-Created-By': 'vuongmanhnghia',
         },
      })

      // Initialize circuit breaker
      this.circuitBreaker = new CircuitBreaker({
         threshold: 5,
         timeout: 60000,
         monitoringPeriod: 10000,
         ...circuitBreakerConfig,
      })

      this.setupInterceptors()
      this.setupCacheCleanup()

      if (process.env.NODE_ENV === 'development') {
         console.log(`🚀 OptimizedApiClient initialized at ${new Date().toISOString()} by vuongmanhnghia`)
         console.log(`📍 Base URL: ${baseURL}`)
      }
   }

   private setupInterceptors() {
      // Request interceptor
      this.client.interceptors.request.use(
         (config: InternalAxiosRequestConfig): EnhancedInternalAxiosRequestConfig => {
            const requestId = this.generateRequestId()

            // Create enhanced config with metadata
            const enhancedConfig = config as EnhancedInternalAxiosRequestConfig

            // Add performance timing and request ID
            enhancedConfig.metadata = {
               startTime: performance.now(),
               requestId,
            }

            // Add auth token if available (consider using secure storage)
            const token = this.getSecureToken()
            if (token) {
               enhancedConfig.headers = enhancedConfig.headers || {}
               enhancedConfig.headers.Authorization = `Bearer ${token}`
            }

            // Add request ID to headers for tracing
            enhancedConfig.headers = enhancedConfig.headers || {}
            enhancedConfig.headers['X-Request-ID'] = requestId
            enhancedConfig.headers['X-Timestamp'] = new Date().toISOString()

            this.stats.totalRequests++

            return enhancedConfig
         },
         (error) => Promise.reject(error)
      )

      // Response interceptor
      this.client.interceptors.response.use(
         (response) => {
            const config = response.config as EnhancedInternalAxiosRequestConfig
            const duration = performance.now() - (config.metadata?.startTime || 0)
            const requestId = config.metadata?.requestId

            if (process.env.NODE_ENV === 'development') {
               console.log(
                  `🌐 API ${config.method?.toUpperCase()} ${config.url}: ${duration.toFixed(2)}ms [${requestId}]`
               )

               if (duration > 1000) {
                  console.warn(`🐌 Slow API request: ${config.url} took ${duration.toFixed(2)}ms [${requestId}]`)
               }
            }

            return response
         },
         (error: AxiosError) => {
            const config = error.config as EnhancedInternalAxiosRequestConfig
            const duration = performance.now() - (config?.metadata?.startTime || 0)
            const requestId = config?.metadata?.requestId

            console.error(`❌ API Error ${config?.url}: ${duration?.toFixed(2)}ms [${requestId}]`, {
               status: error.response?.status,
               statusText: error.response?.statusText,
               message: error.message,
               requestId,
               timestamp: new Date().toISOString(),
            })

            this.stats.failures++
            return Promise.reject(error)
         }
      )
   }

   private setupCacheCleanup() {
      // Clean expired cache entries every 5 minutes
      this.cleanupInterval = setInterval(
         () => {
            this.cleanExpiredCache()
         },
         5 * 60 * 1000
      )
   }

   private cleanExpiredCache() {
      const now = Date.now()
      let cleanedCount = 0

      for (const [key, entry] of this.cache.entries()) {
         if (now > entry.expiresAt) {
            this.cache.delete(key)
            cleanedCount++
         }
      }

      if (process.env.NODE_ENV === 'development' && cleanedCount > 0) {
         console.log(`🧹 Cleaned ${cleanedCount} expired cache entries at ${new Date().toISOString()}`)
      }
   }

   private generateRequestId(): string {
      return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
   }

   private getSecureToken(): string | null {
      // TODO: Implement secure token storage (consider httpOnly cookies, secure storage)
      // For now, keeping localStorage but with validation
      try {
         const token = localStorage.getItem('token')
         if (token && this.isValidToken(token)) {
            return token
         }
      } catch (error) {
         console.warn('Failed to retrieve token from localStorage:', error)
      }
      return null
   }

   private isValidToken(token: string): boolean {
      // Basic token validation (implement proper JWT validation in production)
      if (!token || typeof token !== 'string') return false
      if (token.length < 10) return false
      if (token.includes(' ') || token.includes('\n') || token.includes('\t')) return false

      // Basic JWT format check (header.payload.signature)
      const parts = token.split('.')
      if (parts.length === 3) {
         try {
            // Try to decode the payload to check if it's valid JSON
            const payload = JSON.parse(atob(parts[1]))
            // Check if token is not expired (if exp claim exists)
            if (payload.exp && payload.exp * 1000 < Date.now()) {
               return false
            }
            return true
         } catch {
            // If it's not a JWT, just do basic validation
            return true
         }
      }

      return true
   }

   private generateCacheKey(config: RequestConfig): string {
      if (config.cache && typeof config.cache === 'object' && config.cache.key) {
         return config.cache.key
      }

      const { method = 'GET', url = '', params, data } = config
      const paramsStr = this.generateStableKey(params)
      const dataStr = this.generateStableKey(data)

      return `${method}:${url}:${paramsStr}:${dataStr}`
   }

   private generateStableKey(obj: any): string {
      if (!obj || typeof obj !== 'object') return String(obj || '')

      try {
         // Sort object keys for consistent serialization
         const sorted = Object.keys(obj)
            .sort()
            .reduce((result, key) => {
               result[key] = obj[key]
               return result
            }, {} as any)
         return JSON.stringify(sorted)
      } catch (error) {
         console.warn('Failed to generate stable key:', error)
         return JSON.stringify(obj)
      }
   }

   private getCachedResponse<T>(key: string): T | null {
      const entry = this.cache.get(key)
      if (!entry) {
         this.stats.cacheMisses++
         return null
      }

      const now = Date.now()
      if (now > entry.expiresAt) {
         this.cache.delete(key)
         this.stats.cacheMisses++
         return null
      }

      entry.hitCount++
      this.stats.cacheHits++

      if (process.env.NODE_ENV === 'development') {
         console.log(`💾 Cache HIT for key: ${key} (hit count: ${entry.hitCount})`)
      }

      return entry.data
   }

   private setCachedResponse<T>(key: string, data: T, ttl: number) {
      // Implement LRU cache behavior
      if (this.cache.size >= this.maxCacheSize) {
         // Remove least recently used (oldest timestamp)
         let oldestKey = ''
         let oldestTime = Date.now()

         for (const [cacheKey, entry] of this.cache.entries()) {
            if (entry.timestamp < oldestTime) {
               oldestTime = entry.timestamp
               oldestKey = cacheKey
            }
         }

         if (oldestKey) {
            this.cache.delete(oldestKey)
            if (process.env.NODE_ENV === 'development') {
               console.log(`🗑️ Evicted LRU cache entry: ${oldestKey}`)
            }
         }
      }

      this.cache.set(key, {
         data,
         timestamp: Date.now(),
         expiresAt: Date.now() + ttl,
         hitCount: 0,
      })

      if (process.env.NODE_ENV === 'development') {
         console.log(`💾 Cache SET for key: ${key} (TTL: ${ttl}ms)`)
      }
   }

   private async retryRequest<T>(
      config: RequestConfig,
      attempts: number = this.defaultRetryAttempts,
      delay: number = this.defaultRetryDelay
   ): Promise<AxiosResponse<T>> {
      try {
         const response = await this.client.request<T>(config)
         return response
      } catch (error) {
         if (attempts > 1 && this.isRetryableError(error)) {
            this.stats.retries++

            const nextDelay = Math.min(delay * 2, config.retry?.maxDelay || this.maxRetryDelay)

            if (process.env.NODE_ENV === 'development') {
               console.log(`🔄 Retrying request in ${delay}ms. Attempts remaining: ${attempts - 1}`)
            }

            await this.delay(delay)
            return this.retryRequest(config, attempts - 1, nextDelay)
         }
         throw error
      }
   }

   private isRetryableError(error: any): boolean {
      // Network errors
      if (error.code === 'ECONNABORTED' || error.code === 'NETWORK_ERROR' || error.code === 'ENOTFOUND') {
         return true
      }

      // HTTP status codes that are retryable
      if (error.response) {
         const retryableStatuses = [408, 429, 502, 503, 504]
         return retryableStatuses.includes(error.response.status)
      }

      return false
   }

   private delay(ms: number): Promise<void> {
      return new Promise((resolve) => setTimeout(resolve, ms))
   }

   /**
    * GET request with caching and circuit breaker
    */
   async get<T = any>(url: string, config: RequestConfig = {}): Promise<T> {
      const requestConfig = { ...config, method: 'GET', url }
      const cacheKey = this.generateCacheKey(requestConfig)

      // Check cache first
      if (config.cache !== false) {
         const cachedResponse = this.getCachedResponse<T>(cacheKey)
         if (cachedResponse) {
            return cachedResponse
         }
      }

      // Check if request is already in progress (request deduplication)
      if (this.requestQueue.has(cacheKey)) {
         if (process.env.NODE_ENV === 'development') {
            console.log(`🔄 Request deduplication for: ${cacheKey}`)
         }
         return this.requestQueue.get(cacheKey)
      }

      // Setup abort controller for cancellation
      const controller = new AbortController()
      this.pendingRequests.set(cacheKey, controller)

      // Make request with circuit breaker
      const makeRequest = async (): Promise<T> => {
         const enhancedConfig = {
            ...requestConfig,
            signal: controller.signal,
         }

         const response = await this.retryRequest<T>(enhancedConfig, config.retry?.attempts, config.retry?.delay)

         // Apply response transformation
         let responseData = response.data
         if (config.transformResponse) {
            responseData = config.transformResponse(responseData)
         }

         // Cache successful responses
         if (config.cache !== false && response.status === 200) {
            const ttl = (config.cache && typeof config.cache === 'object' && config.cache.ttl) || this.defaultCacheTTL
            this.setCachedResponse(cacheKey, responseData, ttl)
         }

         return responseData
      }

      const requestPromise = (
         config.circuitBreaker !== false ? this.circuitBreaker.execute(makeRequest) : makeRequest()
      ).finally(() => {
         this.requestQueue.delete(cacheKey)
         this.pendingRequests.delete(cacheKey)
      })

      this.requestQueue.set(cacheKey, requestPromise)
      return requestPromise
   }

   /**
    * POST request with circuit breaker
    */
   async post<T = any>(url: string, data?: any, config: RequestConfig = {}): Promise<T> {
      // Apply request transformation
      let transformedData = data
      if (config.transformRequest) {
         transformedData = config.transformRequest(data)
      }

      const makeRequest = async (): Promise<T> => {
         const response = await this.retryRequest<T>(
            { ...config, method: 'POST', url, data: transformedData },
            config.retry?.attempts,
            config.retry?.delay
         )

         let responseData = response.data
         if (config.transformResponse) {
            responseData = config.transformResponse(responseData)
         }

         return responseData
      }

      const result =
         config.circuitBreaker !== false ? await this.circuitBreaker.execute(makeRequest) : await makeRequest()

      // Invalidate related cache entries
      if (config.cache && typeof config.cache === 'object' && config.cache.invalidatePattern) {
         this.invalidateCache(config.cache.invalidatePattern)
      }

      return result
   }

   /**
    * PUT request with circuit breaker
    */
   async put<T = any>(url: string, data?: any, config: RequestConfig = {}): Promise<T> {
      let transformedData = data
      if (config.transformRequest) {
         transformedData = config.transformRequest(data)
      }

      const makeRequest = async (): Promise<T> => {
         const response = await this.retryRequest<T>(
            { ...config, method: 'PUT', url, data: transformedData },
            config.retry?.attempts,
            config.retry?.delay
         )

         let responseData = response.data
         if (config.transformResponse) {
            responseData = config.transformResponse(responseData)
         }

         return responseData
      }

      const result =
         config.circuitBreaker !== false ? await this.circuitBreaker.execute(makeRequest) : await makeRequest()

      if (config.cache && typeof config.cache === 'object' && config.cache.invalidatePattern) {
         this.invalidateCache(config.cache.invalidatePattern)
      }

      return result
   }

   /**
    * PATCH request with circuit breaker
    */
   async patch<T = any>(url: string, data?: any, config: RequestConfig = {}): Promise<T> {
      let transformedData = data
      if (config.transformRequest) {
         transformedData = config.transformRequest(data)
      }

      const makeRequest = async (): Promise<T> => {
         const response = await this.retryRequest<T>(
            { ...config, method: 'PATCH', url, data: transformedData },
            config.retry?.attempts,
            config.retry?.delay
         )

         let responseData = response.data
         if (config.transformResponse) {
            responseData = config.transformResponse(responseData)
         }

         return responseData
      }

      const result =
         config.circuitBreaker !== false ? await this.circuitBreaker.execute(makeRequest) : await makeRequest()

      if (config.cache && typeof config.cache === 'object' && config.cache.invalidatePattern) {
         this.invalidateCache(config.cache.invalidatePattern)
      }

      return result
   }

   /**
    * DELETE request with circuit breaker
    */
   async delete<T = any>(url: string, config: RequestConfig = {}): Promise<T> {
      const makeRequest = async (): Promise<T> => {
         const response = await this.retryRequest<T>(
            { ...config, method: 'DELETE', url },
            config.retry?.attempts,
            config.retry?.delay
         )

         let responseData = response.data
         if (config.transformResponse) {
            responseData = config.transformResponse(responseData)
         }

         return responseData
      }

      const result =
         config.circuitBreaker !== false ? await this.circuitBreaker.execute(makeRequest) : await makeRequest()

      if (config.cache && typeof config.cache === 'object' && config.cache.invalidatePattern) {
         this.invalidateCache(config.cache.invalidatePattern)
      }

      return result
   }

   /**
    * Cancel a pending request by cache key
    */
   cancelRequest(cacheKey: string) {
      const controller = this.pendingRequests.get(cacheKey)
      if (controller) {
         controller.abort()
         this.pendingRequests.delete(cacheKey)
         console.log(`🚫 Request cancelled: ${cacheKey} at ${new Date().toISOString()}`)
         return true
      }
      return false
   }

   /**
    * Cancel a pending request by URL pattern
    */
   cancelRequestsByPattern(pattern: string) {
      let cancelledCount = 0
      const regex = new RegExp(pattern)

      for (const [key, controller] of this.pendingRequests.entries()) {
         if (regex.test(key)) {
            controller.abort()
            this.pendingRequests.delete(key)
            cancelledCount++
         }
      }

      if (cancelledCount > 0) {
         console.log(`🚫 Cancelled ${cancelledCount} requests matching pattern: ${pattern}`)
      }

      return cancelledCount
   }

   /**
    * Cancel all pending requests
    */
   cancelAllRequests() {
      const count = this.pendingRequests.size

      for (const [key, controller] of this.pendingRequests.entries()) {
         controller.abort()
      }

      this.pendingRequests.clear()
      console.log(`🚫 All ${count} pending requests cancelled at ${new Date().toISOString()}`)

      return count
   }

   /**
    * Invalidate cache entries by pattern
    */
   invalidateCache(pattern: string) {
      try {
         const regex = new RegExp(pattern)
         let invalidatedCount = 0

         for (const key of this.cache.keys()) {
            if (regex.test(key)) {
               this.cache.delete(key)
               invalidatedCount++
            }
         }

         if (process.env.NODE_ENV === 'development' && invalidatedCount > 0) {
            console.log(
               `🗑️ Invalidated ${invalidatedCount} cache entries matching pattern: ${pattern} at ${new Date().toISOString()}`
            )
         }

         return invalidatedCount
      } catch (error) {
         console.error('Invalid cache invalidation pattern:', pattern, error)
         return 0
      }
   }

   /**
    * Clear all cache
    */
   clearCache() {
      const size = this.cache.size
      this.cache.clear()
      console.log(`🧹 Cleared ${size} cache entries at ${new Date().toISOString()}`)
      return size
   }

   /**
    * Get cache statistics
    */
   getCacheStats() {
      const now = Date.now()
      let validEntries = 0
      let expiredEntries = 0
      let totalHits = 0

      for (const entry of this.cache.values()) {
         if (now > entry.expiresAt) {
            expiredEntries++
         } else {
            validEntries++
            totalHits += entry.hitCount
         }
      }

      const hitRate = this.stats.cacheHits / (this.stats.cacheHits + this.stats.cacheMisses) || 0

      return {
         cache: {
            totalEntries: this.cache.size,
            validEntries,
            expiredEntries,
            totalHits,
            hitRate: Math.round(hitRate * 100) / 100,
            maxSize: this.maxCacheSize,
         },
         requests: {
            total: this.stats.totalRequests,
            cacheHits: this.stats.cacheHits,
            cacheMisses: this.stats.cacheMisses,
            retries: this.stats.retries,
            failures: this.stats.failures,
            successRate:
               this.stats.totalRequests > 0
                  ? Math.round(((this.stats.totalRequests - this.stats.failures) / this.stats.totalRequests) * 100) /
                    100
                  : 0,
         },
         circuitBreaker: this.circuitBreaker.getState(),
         runtime: {
            createdAt: this.stats.createdAt,
            createdBy: this.stats.createdBy,
            uptime: Date.now() - new Date(this.stats.createdAt).getTime(),
            pendingRequests: this.pendingRequests.size,
         },
      }
   }

   /**
    * Reset all statistics
    */
   resetStats() {
      const oldStats = { ...this.stats }

      this.stats = {
         totalRequests: 0,
         cacheHits: 0,
         cacheMisses: 0,
         retries: 0,
         failures: 0,
         createdAt: oldStats.createdAt, // Keep original creation time
         createdBy: oldStats.createdBy, // Keep original creator
      }

      this.circuitBreaker.reset()
      console.log(`📊 Statistics reset at ${new Date().toISOString()} by vuongmanhnghia`)
   }

   /**
    * Health check for the API client
    */
   async healthCheck(): Promise<{ status: 'healthy' | 'degraded' | 'unhealthy'; details: any }> {
      const stats = this.getCacheStats()
      const circuitBreakerState = stats.circuitBreaker.state

      let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy'
      const issues: string[] = []

      if (circuitBreakerState === 'OPEN') {
         status = 'unhealthy'
         issues.push('Circuit breaker is OPEN')
      } else if (circuitBreakerState === 'HALF_OPEN') {
         status = 'degraded'
         issues.push('Circuit breaker is HALF_OPEN')
      }

      if (stats.requests.total > 10 && stats.requests.successRate < 0.9) {
         status = status === 'healthy' ? 'degraded' : 'unhealthy'
         issues.push(`Low success rate: ${(stats.requests.successRate * 100).toFixed(1)}%`)
      }

      if (stats.cache.expiredEntries > stats.cache.validEntries) {
         issues.push('High cache expiration rate')
      }

      return {
         status,
         details: {
            ...stats,
            issues,
            timestamp: new Date().toISOString(),
            checkedBy: 'vuongmanhnghia',
         },
      }
   }

   /**
    * Export configuration and statistics for debugging
    */
   exportDiagnostics() {
      return {
         config: {
            defaultCacheTTL: this.defaultCacheTTL,
            maxCacheSize: this.maxCacheSize,
            defaultRetryAttempts: this.defaultRetryAttempts,
            defaultRetryDelay: this.defaultRetryDelay,
            maxRetryDelay: this.maxRetryDelay,
         },
         stats: this.getCacheStats(),
         cache: {
            keys: Array.from(this.cache.keys()),
            entries: Array.from(this.cache.entries()).map(([key, entry]) => ({
               key,
               timestamp: new Date(entry.timestamp).toISOString(),
               expiresAt: new Date(entry.expiresAt).toISOString(),
               hitCount: entry.hitCount,
               isExpired: Date.now() > entry.expiresAt,
            })),
         },
         pendingRequests: Array.from(this.pendingRequests.keys()),
         queuedRequests: Array.from(this.requestQueue.keys()),
         exportedAt: new Date().toISOString(),
         exportedBy: 'vuongmanhnghia',
      }
   }

   /**
    * Destroy the client and cleanup resources
    */
   destroy() {
      // Cancel all pending requests
      const cancelledRequests = this.cancelAllRequests()

      // Clear cache
      const clearedCache = this.clearCache()

      // Clear intervals
      if (this.cleanupInterval) {
         clearInterval(this.cleanupInterval)
         this.cleanupInterval = undefined
      }

      // Clear request queue
      this.requestQueue.clear()

      console.log(`💀 OptimizedApiClient destroyed at ${new Date().toISOString()}`)
      console.log(`📊 Final stats - Cancelled requests: ${cancelledRequests}, Cleared cache: ${clearedCache}`)

      return {
         cancelledRequests,
         clearedCache,
         destroyedAt: new Date().toISOString(),
         destroyedBy: 'vuongmanhnghia',
      }
   }
}

// Create singleton instance
const apiClient = new OptimizedApiClient(
   process.env.REACT_APP_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3456',
   {
      threshold: 5,
      timeout: 60000,
      monitoringPeriod: 10000,
   }
)

// Cleanup on page unload (browser environment only)
if (typeof window !== 'undefined') {
   window.addEventListener('beforeunload', () => {
      apiClient.destroy()
   })

   // Add global error handler for unhandled promise rejections
   window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection in OptimizedApiClient:', event.reason)
   })
}

// Node.js cleanup (if running in Node.js environment)
if (typeof process !== 'undefined' && process.on) {
   const cleanup = () => {
      console.log('🛑 Process termination detected, cleaning up OptimizedApiClient...')
      apiClient.destroy()
      process.exit(0)
   }

   process.on('SIGINT', cleanup)
   process.on('SIGTERM', cleanup)
   process.on('exit', cleanup)
}

export default apiClient
export {
   OptimizedApiClient,
   CircuitBreaker,
   type RequestConfig,
   type CacheEntry,
   type CircuitBreakerConfig,
   type EnhancedInternalAxiosRequestConfig,
}

// Export a configured instance for backward compatibility
export const optimizedApi = apiClient

// Export utility functions
export const apiUtils = {
   /**
    * Create a new OptimizedApiClient instance
    */
   createClient: (baseURL: string, config?: Partial<CircuitBreakerConfig>) => new OptimizedApiClient(baseURL, config),

   /**
    * Get the default client stats
    */
   getDefaultClientStats: () => apiClient.getCacheStats(),

   /**
    * Perform health check on default client
    */
   healthCheck: () => apiClient.healthCheck(),

   /**
    * Export diagnostics from default client
    */
   exportDiagnostics: () => apiClient.exportDiagnostics(),

   /**
    * Reset default client statistics
    */
   resetStats: () => apiClient.resetStats(),

   /**
    * Clear default client cache
    */
   clearCache: () => apiClient.clearCache(),
}
