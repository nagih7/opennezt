import cacheManager from '@/configs/redis'
import crypto from 'crypto'

/**
 * Generate cache key from request
 */
function generateCacheKey(req) {
    const { method, originalUrl, query, user } = req
    const userId = user?._id?.toString() || 'anonymous'
    
    // Create a hash of the request parameters
    const keyData = {
        method,
        url: originalUrl,
        query,
        userId,
    }
    
    const keyString = JSON.stringify(keyData)
    const hash = crypto.createHash('md5').update(keyString).digest('hex')
    
    return `api:${hash}`
}

/**
 * Cache middleware for GET requests
 */
export function cacheResponse(ttlSeconds = 300) {
    return async (req, res, next) => {
        // Only cache GET requests
        if (req.method !== 'GET') {
            return next()
        }

        const cacheKey = generateCacheKey(req)
        
        try {
            // Try to get cached response
            const cached = await cacheManager.get(cacheKey)
            
            if (cached) {
                // Set cache headers
                res.set('X-Cache', 'HIT')
                res.set('Cache-Control', `public, max-age=${ttlSeconds}`)
                
                // Send cached response
                return res.status(cached.status).json(cached.data)
            }
            
            // Cache miss - continue to route handler
            res.set('X-Cache', 'MISS')
            
            // Override res.json to cache the response
            const originalJson = res.json
            res.json = function(data) {
                // Cache successful responses
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    const cacheData = {
                        status: res.statusCode,
                        data: data,
                        timestamp: new Date().toISOString(),
                    }
                    
                    // Cache asynchronously (don't wait)
                    cacheManager.set(cacheKey, cacheData, ttlSeconds).catch(err => {
                        console.error('Cache set error:', err)
                    })
                }
                
                // Set cache headers
                res.set('Cache-Control', `public, max-age=${ttlSeconds}`)
                
                // Call original json method
                return originalJson.call(this, data)
            }
            
            next()
        } catch (error) {
            console.error('Cache middleware error:', error)
            next()
        }
    }
}

/**
 * Cache middleware for specific routes with custom TTL
 */
export const cacheShort = cacheResponse(60) // 1 minute
export const cacheMedium = cacheResponse(300) // 5 minutes
export const cacheLong = cacheResponse(1800) // 30 minutes

/**
 * Invalidate cache by pattern
 */
export async function invalidateCache(pattern) {
    try {
        // This is a simplified version
        // In production, you'd want to implement proper pattern-based invalidation
        await cacheManager.del(pattern)
    } catch (error) {
        console.error('Cache invalidation error:', error)
    }
}

/**
 * Cache warming middleware - preload frequently accessed data
 */
export function warmCache(cacheKey, dataLoader, ttlSeconds = 300) {
    return async (req, res, next) => {
        try {
            const exists = await cacheManager.exists(cacheKey)
            
            if (!exists) {
                // Load data and cache it
                const data = await dataLoader(req)
                await cacheManager.set(cacheKey, data, ttlSeconds)
            }
        } catch (error) {
            console.error('Cache warming error:', error)
        }
        
        next()
    }
}

/**
 * Conditional caching based on user role or other criteria
 */
export function conditionalCache(condition, ttlSeconds = 300) {
    return async (req, res, next) => {
        if (typeof condition === 'function' && !condition(req)) {
            return next()
        }
        
        if (typeof condition === 'boolean' && !condition) {
            return next()
        }
        
        return cacheResponse(ttlSeconds)(req, res, next)
    }
}

/**
 * Cache for authenticated users only
 */
export const cacheForAuthenticatedUsers = conditionalCache(
    (req) => req.currentUser && req.currentUser._id,
    300
)

/**
 * Cache for public endpoints only
 */
export const cacheForPublicEndpoints = conditionalCache(
    (req) => !req.currentUser,
    600
)

/**
 * ETag-based caching middleware
 */
export function etagCache() {
    return (req, res, next) => {
        const originalJson = res.json
        
        res.json = function(data) {
            // Generate ETag from response data
            const etag = crypto
                .createHash('md5')
                .update(JSON.stringify(data))
                .digest('hex')
            
            res.set('ETag', `"${etag}"`)
            
            // Check if client has the same ETag
            const clientETag = req.headers['if-none-match']
            if (clientETag === `"${etag}"`) {
                return res.status(304).end()
            }
            
            return originalJson.call(this, data)
        }
        
        next()
    }
}

/**
 * Cache statistics middleware
 */
export function cacheStats() {
    const stats = {
        hits: 0,
        misses: 0,
        errors: 0,
    }
    
    return {
        middleware: (req, res, next) => {
            const cacheHeader = res.get('X-Cache')
            if (cacheHeader === 'HIT') {
                stats.hits++
            } else if (cacheHeader === 'MISS') {
                stats.misses++
            }
            next()
        },
        getStats: () => ({
            ...stats,
            hitRate: stats.hits / (stats.hits + stats.misses) || 0,
        }),
        resetStats: () => {
            stats.hits = 0
            stats.misses = 0
            stats.errors = 0
        },
    }
}

export default {
    cacheResponse,
    cacheShort,
    cacheMedium,
    cacheLong,
    invalidateCache,
    warmCache,
    conditionalCache,
    cacheForAuthenticatedUsers,
    cacheForPublicEndpoints,
    etagCache,
    cacheStats,
}
