import { logger } from '@/configs'

/**
 * Performance monitoring middleware
 */
export function performanceMonitor() {
    return (req, res, next) => {
        const startTime = process.hrtime.bigint()
        const startMemory = process.memoryUsage()
        
        // Add request ID for tracking
        req.requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        
        // Override res.end to capture response time
        const originalEnd = res.end
        res.end = function(...args) {
            const endTime = process.hrtime.bigint()
            const endMemory = process.memoryUsage()
            
            const responseTime = Number(endTime - startTime) / 1000000 // Convert to milliseconds
            const memoryDelta = endMemory.heapUsed - startMemory.heapUsed
            
            // Log performance metrics
            const performanceData = {
                requestId: req.requestId,
                method: req.method,
                url: req.originalUrl,
                statusCode: res.statusCode,
                responseTime: `${responseTime.toFixed(2)}ms`,
                memoryUsage: `${(memoryDelta / 1024 / 1024).toFixed(2)}MB`,
                userAgent: req.get('User-Agent'),
                ip: req.ip,
                timestamp: new Date().toISOString(),
            }
            
            // Log slow requests (> 1 second)
            if (responseTime > 1000) {
                logger.warn({
                    message: 'Slow request detected',
                    ...performanceData,
                })
            }
            
            // Log high memory usage (> 50MB)
            if (Math.abs(memoryDelta) > 50 * 1024 * 1024) {
                logger.warn({
                    message: 'High memory usage detected',
                    ...performanceData,
                })
            }
            
            // Add performance headers
            res.set('X-Response-Time', `${responseTime.toFixed(2)}ms`)
            res.set('X-Request-ID', req.requestId)
            
            // Log all requests in development
            if (process.env.NODE_ENV === 'development') {
                console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${responseTime.toFixed(2)}ms`)
            }
            
            return originalEnd.apply(this, args)
        }
        
        next()
    }
}

/**
 * Memory usage monitoring
 */
export function memoryMonitor() {
    const memoryThreshold = 500 * 1024 * 1024 // 500MB threshold
    
    return (req, res, next) => {
        const memoryUsage = process.memoryUsage()
        
        if (memoryUsage.heapUsed > memoryThreshold) {
            logger.warn({
                message: 'High memory usage detected',
                memoryUsage: {
                    heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)}MB`,
                    heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)}MB`,
                    external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)}MB`,
                    rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)}MB`,
                },
                url: req.originalUrl,
                method: req.method,
            })
        }
        
        next()
    }
}

/**
 * Database query performance monitoring
 */
export function dbQueryMonitor() {
    const slowQueryThreshold = 100 // 100ms
    
    return (req, res, next) => {
        // Store original mongoose query methods
        const originalExec = require('mongoose').Query.prototype.exec
        
        require('mongoose').Query.prototype.exec = function() {
            const startTime = Date.now()
            const query = this.getQuery()
            const collection = this.model.collection.name
            
            return originalExec.apply(this, arguments).then(result => {
                const duration = Date.now() - startTime
                
                if (duration > slowQueryThreshold) {
                    logger.warn({
                        message: 'Slow database query detected',
                        collection,
                        query: JSON.stringify(query),
                        duration: `${duration}ms`,
                        url: req.originalUrl,
                        method: req.method,
                        requestId: req.requestId,
                    })
                }
                
                return result
            }).catch(error => {
                logger.error({
                    message: 'Database query error',
                    collection,
                    query: JSON.stringify(query),
                    error: error.message,
                    url: req.originalUrl,
                    method: req.method,
                    requestId: req.requestId,
                })
                throw error
            })
        }
        
        next()
    }
}

/**
 * API rate limiting with performance tracking
 */
export function apiPerformanceTracker() {
    const requestCounts = new Map()
    const responseTimes = new Map()
    
    return (req, res, next) => {
        const endpoint = `${req.method} ${req.route?.path || req.originalUrl}`
        const startTime = Date.now()
        
        // Track request count
        requestCounts.set(endpoint, (requestCounts.get(endpoint) || 0) + 1)
        
        // Override res.end to track response time
        const originalEnd = res.end
        res.end = function(...args) {
            const responseTime = Date.now() - startTime
            
            // Track response times
            if (!responseTimes.has(endpoint)) {
                responseTimes.set(endpoint, [])
            }
            responseTimes.get(endpoint).push(responseTime)
            
            // Keep only last 100 response times per endpoint
            const times = responseTimes.get(endpoint)
            if (times.length > 100) {
                times.splice(0, times.length - 100)
            }
            
            return originalEnd.apply(this, args)
        }
        
        next()
    }
}

/**
 * Get performance statistics
 */
export function getPerformanceStats() {
    const memoryUsage = process.memoryUsage()
    const cpuUsage = process.cpuUsage()
    
    return {
        memory: {
            heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)}MB`,
            heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)}MB`,
            external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)}MB`,
            rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)}MB`,
        },
        cpu: {
            user: cpuUsage.user,
            system: cpuUsage.system,
        },
        uptime: `${(process.uptime() / 60).toFixed(2)} minutes`,
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
    }
}

/**
 * Health check endpoint with performance metrics
 */
export function healthCheckWithMetrics() {
    return (req, res) => {
        const stats = getPerformanceStats()
        
        res.status(200).json({
            status: 'OK',
            timestamp: new Date().toISOString(),
            performance: stats,
            environment: process.env.NODE_ENV,
        })
    }
}

export default {
    performanceMonitor,
    memoryMonitor,
    dbQueryMonitor,
    apiPerformanceTracker,
    getPerformanceStats,
    healthCheckWithMetrics,
}
