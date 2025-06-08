import Redis from 'ioredis'
import { NODE_ENV, APP_ENV } from './constants'

let redis = null

// Redis configuration
const redisConfig = {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
    db: parseInt(process.env.REDIS_DB, 10) || 0,
    retryDelayOnFailover: 100,
    maxRetriesPerRequest: 3,
    lazyConnect: true,
    keepAlive: 30000,
    connectTimeout: 10000,
    commandTimeout: 5000,
}

// Only use Redis in production or when explicitly enabled
const useRedis = NODE_ENV === APP_ENV.PRODUCTION || process.env.USE_REDIS === 'true'

if (useRedis) {
    try {
        redis = new Redis(redisConfig)
        
        redis.on('connect', () => {
            console.log('Redis connected successfully')
        })
        
        redis.on('error', (err) => {
            console.error('Redis connection error:', err)
        })
        
        redis.on('close', () => {
            console.log('Redis connection closed')
        })
    } catch (error) {
        console.error('Failed to initialize Redis:', error)
        redis = null
    }
}

// Cache wrapper with fallback to memory cache
class CacheManager {
    constructor() {
        this.memoryCache = new Map()
        this.memoryTTL = new Map()
    }

    async get(key) {
        if (redis) {
            try {
                const value = await redis.get(key)
                return value ? JSON.parse(value) : null
            } catch (error) {
                console.error('Redis get error:', error)
                return this._getFromMemory(key)
            }
        }
        return this._getFromMemory(key)
    }

    async set(key, value, ttlSeconds = 3600) {
        if (redis) {
            try {
                await redis.setex(key, ttlSeconds, JSON.stringify(value))
                return true
            } catch (error) {
                console.error('Redis set error:', error)
                return this._setToMemory(key, value, ttlSeconds)
            }
        }
        return this._setToMemory(key, value, ttlSeconds)
    }

    async del(key) {
        if (redis) {
            try {
                await redis.del(key)
            } catch (error) {
                console.error('Redis del error:', error)
            }
        }
        this._deleteFromMemory(key)
    }

    async exists(key) {
        if (redis) {
            try {
                return await redis.exists(key)
            } catch (error) {
                console.error('Redis exists error:', error)
                return this._existsInMemory(key)
            }
        }
        return this._existsInMemory(key)
    }

    async flushAll() {
        if (redis) {
            try {
                await redis.flushall()
            } catch (error) {
                console.error('Redis flushall error:', error)
            }
        }
        this.memoryCache.clear()
        this.memoryTTL.clear()
    }

    // Memory cache fallback methods
    _getFromMemory(key) {
        const ttl = this.memoryTTL.get(key)
        if (ttl && Date.now() > ttl) {
            this.memoryCache.delete(key)
            this.memoryTTL.delete(key)
            return null
        }
        return this.memoryCache.get(key) || null
    }

    _setToMemory(key, value, ttlSeconds) {
        this.memoryCache.set(key, value)
        this.memoryTTL.set(key, Date.now() + (ttlSeconds * 1000))
        return true
    }

    _deleteFromMemory(key) {
        this.memoryCache.delete(key)
        this.memoryTTL.delete(key)
    }

    _existsInMemory(key) {
        const ttl = this.memoryTTL.get(key)
        if (ttl && Date.now() > ttl) {
            this.memoryCache.delete(key)
            this.memoryTTL.delete(key)
            return false
        }
        return this.memoryCache.has(key)
    }

    // Cleanup expired memory cache entries
    _cleanupMemoryCache() {
        const now = Date.now()
        for (const [key, ttl] of this.memoryTTL.entries()) {
            if (now > ttl) {
                this.memoryCache.delete(key)
                this.memoryTTL.delete(key)
            }
        }
    }
}

const cacheManager = new CacheManager()

// Cleanup memory cache every 5 minutes
setInterval(() => {
    cacheManager._cleanupMemoryCache()
}, 5 * 60 * 1000)

export { redis, cacheManager }
export default cacheManager
