import { Router } from 'express'
import { asyncHandler } from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import { cacheMedium, cacheShort, cacheForAuthenticatedUsers } from '@/app/middleware/cacheMiddleware'
import { performanceMonitor } from '@/app/middleware/performanceMiddleware'
import * as optimizedArticleService from '@/app/services/optimizedArticleService'

const optimizedArticleRouter = Router()

// Apply performance monitoring to all routes
optimizedArticleRouter.use(performanceMonitor())

// Public endpoints with caching
optimizedArticleRouter.get(
    '/trending/:timeframe?',
    cacheMedium, // Cache for 5 minutes
    asyncHandler(async (req, res) => {
        const { timeframe = '24h' } = req.params
        const { limit = 10 } = req.query
        
        const articles = await optimizedArticleService.getTrendingArticles(
            timeframe,
            parseInt(limit, 10)
        )
        
        res.jsonify({
            success: true,
            data: articles,
            meta: {
                timeframe,
                limit: parseInt(limit, 10),
                cached: res.get('X-Cache') === 'HIT',
            },
        })
    })
)

// Authenticated endpoints with user-specific caching
optimizedArticleRouter.use(asyncHandler(requireAuthentication))

optimizedArticleRouter.get(
    '/feed',
    cacheForAuthenticatedUsers, // Cache for authenticated users
    asyncHandler(async (req, res) => {
        const { cursor, limit = 10 } = req.query
        const cursorDate = cursor ? new Date(cursor) : new Date()
        
        const articles = await optimizedArticleService.getOptimizedArticleList(
            cursorDate,
            parseInt(limit, 10)
        )
        
        res.jsonify({
            success: true,
            data: articles,
            meta: {
                cursor: cursorDate.toISOString(),
                limit: parseInt(limit, 10),
                hasMore: articles.length === parseInt(limit, 10),
                cached: res.get('X-Cache') === 'HIT',
            },
        })
    })
)

optimizedArticleRouter.get(
    '/:id',
    cacheShort, // Cache for 1 minute
    asyncHandler(async (req, res) => {
        const { id } = req.params
        
        const article = await optimizedArticleService.getOptimizedArticleById(id)
        
        if (!article) {
            return res.status(404).jsonify({
                success: false,
                message: 'Article not found',
            })
        }
        
        res.jsonify({
            success: true,
            data: article,
            meta: {
                cached: res.get('X-Cache') === 'HIT',
            },
        })
    })
)

// Write operations that invalidate cache
optimizedArticleRouter.post(
    '/',
    asyncHandler(async (req, res) => {
        // Create article logic here
        const newArticle = {} // Your article creation logic
        
        // Invalidate relevant caches
        await optimizedArticleService.invalidateArticleCache(
            newArticle._id,
            req.currentUser._id
        )
        
        res.status(201).jsonify({
            success: true,
            data: newArticle,
            message: 'Article created successfully',
        })
    })
)

optimizedArticleRouter.put(
    '/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params
        
        // Update article logic here
        const updatedArticle = {} // Your article update logic
        
        // Invalidate relevant caches
        await optimizedArticleService.invalidateArticleCache(
            id,
            req.currentUser._id
        )
        
        res.jsonify({
            success: true,
            data: updatedArticle,
            message: 'Article updated successfully',
        })
    })
)

optimizedArticleRouter.delete(
    '/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params
        
        // Delete article logic here
        
        // Invalidate relevant caches
        await optimizedArticleService.invalidateArticleCache(
            id,
            req.currentUser._id
        )
        
        res.jsonify({
            success: true,
            message: 'Article deleted successfully',
        })
    })
)

export default optimizedArticleRouter
