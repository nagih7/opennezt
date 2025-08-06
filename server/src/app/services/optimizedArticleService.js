import { Article, User, Project } from '@/models'
import { LINK_STATIC_URL } from '@/configs'
import cacheManager from '@/configs/redis'

// Cache keys
const CACHE_KEYS = {
    ARTICLE_LIST: (cursor, limit) => `articles:list:${cursor}:${limit}`,
    ARTICLE_DETAIL: (id) => `article:${id}`,
    USER_ARTICLES: (userId, page, limit) => `user:${userId}:articles:${page}:${limit}`,
    TRENDING_ARTICLES: (timeframe) => `articles:trending:${timeframe}`,
}

// Cache TTL in seconds
const CACHE_TTL = {
    ARTICLE_LIST: 300, // 5 minutes
    ARTICLE_DETAIL: 600, // 10 minutes
    USER_ARTICLES: 300, // 5 minutes
    TRENDING_ARTICLES: 1800, // 30 minutes
}

/**
 * Optimized article list with caching and efficient aggregation
 */
export async function getOptimizedArticleList(cursor = new Date(), limit = 10) {
    const cacheKey = CACHE_KEYS.ARTICLE_LIST(cursor.toISOString(), limit)
    
    // Try to get from cache first
    const cached = await cacheManager.get(cacheKey)
    if (cached) {
        return cached
    }

    // Optimized aggregation pipeline
    const pipeline = [
        {
            $match: {
                created_at: { $lt: new Date(cursor) },
                status: 'published',
            },
        },
        {
            $sort: { created_at: -1 },
        },
        {
            $limit: limit,
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user',
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            avatar: {
                                $cond: {
                                    if: { $eq: [{ $ifNull: ['$avatar', ''] }, ''] },
                                    then: '$avatar',
                                    else: { $concat: [LINK_STATIC_URL, '$avatar'] },
                                },
                            },
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: 'projects',
                localField: 'project_id',
                foreignField: '_id',
                as: 'project',
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            logo: {
                                $cond: {
                                    if: { $eq: [{ $ifNull: ['$logo', ''] }, ''] },
                                    then: '$logo',
                                    else: { $concat: [LINK_STATIC_URL, '$logo'] },
                                },
                            },
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: '$user',
                preserveNullAndEmptyArrays: false,
            },
        },
        {
            $unwind: {
                path: '$project',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $addFields: {
                'content.attachment': {
                    $map: {
                        input: '$content.attachment',
                        as: 'attachment',
                        in: {
                            $cond: {
                                if: { $eq: [{ $ifNull: ['$$attachment', ''] }, ''] },
                                then: '$$attachment',
                                else: { $concat: [LINK_STATIC_URL, '$$attachment'] },
                            },
                        },
                    },
                },
            },
        },
        {
            $project: {
                _id: 1,
                user: 1,
                project: 1,
                content: 1,
                reaction_count: 1,
                comment_count: 1,
                audience: 1,
                status: 1,
                link_preview: 1,
                created_at: 1,
                updated_at: 1,
            },
        },
    ]

    const articles = await Article.aggregate(pipeline)
    
    // Cache the result
    await cacheManager.set(cacheKey, articles, CACHE_TTL.ARTICLE_LIST)
    
    return articles
}

/**
 * Get article by ID with caching
 */
export async function getOptimizedArticleById(articleId) {
    const cacheKey = CACHE_KEYS.ARTICLE_DETAIL(articleId)
    
    // Try to get from cache first
    const cached = await cacheManager.get(cacheKey)
    if (cached) {
        return cached
    }

    const pipeline = [
        {
            $match: { _id: articleId },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user',
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            avatar: {
                                $cond: {
                                    if: { $eq: [{ $ifNull: ['$avatar', ''] }, ''] },
                                    then: '$avatar',
                                    else: { $concat: [LINK_STATIC_URL, '$avatar'] },
                                },
                            },
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: 'projects',
                localField: 'project_id',
                foreignField: '_id',
                as: 'project',
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            logo: {
                                $cond: {
                                    if: { $eq: [{ $ifNull: ['$logo', ''] }, ''] },
                                    then: '$logo',
                                    else: { $concat: [LINK_STATIC_URL, '$logo'] },
                                },
                            },
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: '$user',
                preserveNullAndEmptyArrays: false,
            },
        },
        {
            $unwind: {
                path: '$project',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $addFields: {
                'content.attachment': {
                    $map: {
                        input: '$content.attachment',
                        as: 'attachment',
                        in: {
                            $cond: {
                                if: { $eq: [{ $ifNull: ['$$attachment', ''] }, ''] },
                                then: '$$attachment',
                                else: { $concat: [LINK_STATIC_URL, '$$attachment'] },
                            },
                        },
                    },
                },
            },
        },
    ]

    const result = await Article.aggregate(pipeline)
    const article = result[0] || null
    
    if (article) {
        // Cache the result
        await cacheManager.set(cacheKey, article, CACHE_TTL.ARTICLE_DETAIL)
    }
    
    return article
}

/**
 * Get trending articles based on engagement
 */
export async function getTrendingArticles(timeframe = '24h', limit = 10) {
    const cacheKey = CACHE_KEYS.TRENDING_ARTICLES(timeframe)
    
    // Try to get from cache first
    const cached = await cacheManager.get(cacheKey)
    if (cached) {
        return cached
    }

    // Calculate time threshold
    const timeThresholds = {
        '1h': new Date(Date.now() - 60 * 60 * 1000),
        '24h': new Date(Date.now() - 24 * 60 * 60 * 1000),
        '7d': new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        '30d': new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    }

    const timeThreshold = timeThresholds[timeframe] || timeThresholds['24h']

    const pipeline = [
        {
            $match: {
                created_at: { $gte: timeThreshold },
                status: 'published',
            },
        },
        {
            $addFields: {
                engagement_score: {
                    $add: [
                        { $multiply: ['$reaction_count', 2] }, // Reactions worth 2 points
                        { $multiply: ['$comment_count', 3] },  // Comments worth 3 points
                    ],
                },
            },
        },
        {
            $sort: { engagement_score: -1, created_at: -1 },
        },
        {
            $limit: limit,
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user',
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            avatar: {
                                $cond: {
                                    if: { $eq: [{ $ifNull: ['$avatar', ''] }, ''] },
                                    then: '$avatar',
                                    else: { $concat: [LINK_STATIC_URL, '$avatar'] },
                                },
                            },
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: '$user',
                preserveNullAndEmptyArrays: false,
            },
        },
    ]

    const articles = await Article.aggregate(pipeline)
    
    // Cache the result
    await cacheManager.set(cacheKey, articles, CACHE_TTL.TRENDING_ARTICLES)
    
    return articles
}

/**
 * Invalidate article caches when article is updated
 */
export async function invalidateArticleCache(articleId, userId = null) {
    const patterns = [
        `articles:list:*`,
        `article:${articleId}`,
        `articles:trending:*`,
    ]
    
    if (userId) {
        patterns.push(`user:${userId}:articles:*`)
    }
    
    // Note: This is a simplified version. In production, you'd want to use Redis SCAN
    // to find and delete keys matching patterns
    for (const pattern of patterns) {
        if (pattern.includes('*')) {
            // For now, just clear specific known keys
            // In production, implement proper pattern-based cache invalidation
            continue
        }
        await cacheManager.del(pattern)
    }
}
