import { Router } from 'express'
import { asyncHandler } from '@/utils/helpers'
import superAdminAuthentication from '@/app/middleware/common/admin-authentication'
import { getPerformanceStats, healthCheckWithMetrics } from '@/app/middleware/performanceMiddleware'
import { cacheManager } from '@/configs/redis'

const performanceRouter = Router()

// Health check endpoint (public)
performanceRouter.get('/health', healthCheckWithMetrics())

// Admin-only performance endpoints
performanceRouter.use(asyncHandler(superAdminAuthentication))

// Get system performance metrics
performanceRouter.get(
    '/metrics',
    asyncHandler(async (req, res) => {
        const stats = getPerformanceStats()
        
        res.jsonify({
            success: true,
            data: stats,
            timestamp: new Date().toISOString(),
        })
    })
)

// Get cache statistics
performanceRouter.get(
    '/cache/stats',
    asyncHandler(async (req, res) => {
        // This would need to be implemented based on your cache manager
        const cacheStats = {
            // Placeholder - implement based on your cache solution
            status: 'connected',
            memory_usage: 'N/A',
            hit_rate: 'N/A',
            total_keys: 'N/A',
        }
        
        res.jsonify({
            success: true,
            data: cacheStats,
        })
    })
)

// Clear cache
performanceRouter.delete(
    '/cache',
    asyncHandler(async (req, res) => {
        await cacheManager.flushAll()
        
        res.jsonify({
            success: true,
            message: 'Cache cleared successfully',
        })
    })
)

// Get database performance metrics
performanceRouter.get(
    '/database/stats',
    asyncHandler(async (req, res) => {
        const mongoose = require('mongoose')
        const db = mongoose.connection.db
        
        try {
            const stats = await db.stats()
            const collections = await db.listCollections().toArray()
            
            const dbStats = {
                database: stats.db,
                collections: stats.collections,
                dataSize: `${(stats.dataSize / 1024 / 1024).toFixed(2)}MB`,
                storageSize: `${(stats.storageSize / 1024 / 1024).toFixed(2)}MB`,
                indexSize: `${(stats.indexSize / 1024 / 1024).toFixed(2)}MB`,
                objects: stats.objects,
                avgObjSize: `${(stats.avgObjSize / 1024).toFixed(2)}KB`,
                collectionsInfo: collections.map(col => ({
                    name: col.name,
                    type: col.type,
                })),
            }
            
            res.jsonify({
                success: true,
                data: dbStats,
            })
        } catch (error) {
            res.status(500).jsonify({
                success: false,
                message: 'Failed to get database stats',
                error: error.message,
            })
        }
    })
)

// Get slow queries log
performanceRouter.get(
    '/database/slow-queries',
    asyncHandler(async (req, res) => {
        // This would need to be implemented with proper logging
        // For now, return placeholder
        res.jsonify({
            success: true,
            data: {
                message: 'Slow query monitoring not implemented yet',
                recommendation: 'Implement database query logging',
            },
        })
    })
)

// Memory usage analysis
performanceRouter.get(
    '/memory/analysis',
    asyncHandler(async (req, res) => {
        const memoryUsage = process.memoryUsage()
        
        // Get heap snapshot if available
        let heapSnapshot = null
        try {
            if (global.gc) {
                global.gc() // Force garbage collection if available
            }
            
            heapSnapshot = {
                beforeGC: memoryUsage,
                afterGC: process.memoryUsage(),
            }
        } catch (error) {
            heapSnapshot = { error: 'GC not available' }
        }
        
        const analysis = {
            current: {
                heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)}MB`,
                heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)}MB`,
                external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)}MB`,
                rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)}MB`,
            },
            heapUtilization: `${((memoryUsage.heapUsed / memoryUsage.heapTotal) * 100).toFixed(2)}%`,
            recommendations: [],
            heapSnapshot,
        }
        
        // Add recommendations based on memory usage
        if (memoryUsage.heapUsed > 500 * 1024 * 1024) {
            analysis.recommendations.push('High heap usage detected - consider optimizing memory usage')
        }
        
        if (memoryUsage.external > 100 * 1024 * 1024) {
            analysis.recommendations.push('High external memory usage - check for memory leaks in native modules')
        }
        
        res.jsonify({
            success: true,
            data: analysis,
        })
    })
)

// Performance recommendations
performanceRouter.get(
    '/recommendations',
    asyncHandler(async (req, res) => {
        const stats = getPerformanceStats()
        const recommendations = []
        
        // Memory recommendations
        const heapUsedMB = parseFloat(stats.memory.heapUsed)
        if (heapUsedMB > 500) {
            recommendations.push({
                category: 'Memory',
                priority: 'High',
                issue: 'High memory usage detected',
                recommendation: 'Consider implementing memory optimization strategies',
                actions: [
                    'Review and optimize database queries',
                    'Implement proper caching strategies',
                    'Check for memory leaks',
                    'Consider using streaming for large data processing',
                ],
            })
        }
        
        // Uptime recommendations
        const uptimeMinutes = parseFloat(stats.uptime)
        if (uptimeMinutes > 24 * 60) {
            recommendations.push({
                category: 'Uptime',
                priority: 'Medium',
                issue: 'Long uptime detected',
                recommendation: 'Consider regular restarts for memory cleanup',
                actions: [
                    'Schedule regular application restarts',
                    'Monitor for memory leaks',
                    'Implement graceful shutdown procedures',
                ],
            })
        }
        
        // Add more recommendations based on your specific needs
        recommendations.push({
            category: 'Caching',
            priority: 'Medium',
            issue: 'Cache optimization',
            recommendation: 'Implement Redis caching for better performance',
            actions: [
                'Set up Redis server',
                'Implement cache warming strategies',
                'Monitor cache hit rates',
                'Optimize cache TTL values',
            ],
        })
        
        res.jsonify({
            success: true,
            data: {
                recommendations,
                totalRecommendations: recommendations.length,
                highPriority: recommendations.filter(r => r.priority === 'High').length,
                mediumPriority: recommendations.filter(r => r.priority === 'Medium').length,
                lowPriority: recommendations.filter(r => r.priority === 'Low').length,
            },
        })
    })
)

export default performanceRouter
