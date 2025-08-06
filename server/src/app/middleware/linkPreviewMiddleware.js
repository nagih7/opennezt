import { BLACKLISTED_URLS, URL_PATTERN } from '@/configs'
import NodeCache from 'node-cache'

const cache = new NodeCache({
    stdTTL: 3600, // Cache trong 1 giờ
    checkperiod: 120, // Kiểm tra và xóa cache hết hạn mỗi 2 phút
})

//Kiểm tra xem URL có trong cache hay không
export const linkPreviewCache = async (req, res, next) => {
    const url = await req.body.url
    if (!url) {
        return res.status(400).jsonify({
            success: false,
            message: 'URL is required',
        })
    }

    // Kiểm tra cache
    const cacheData = cache.get(url)
    if (cacheData) {
        return res.status(200).jsonify({
            success: true,
            data: cacheData,
            cached: true,
        })
    }

    // Thêm function lưu cache vào res object
    res.saveToCache = (data) => {
        cache.set(url, data)
    }

    next()
}

// Kiểm tra blacklist
const isBlacklisted = (url) => {
    try {
        const urlObj = new URL(url)
        return BLACKLISTED_URLS.some((domain) => urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`))
    } catch {
        return false
    }
}

export const checkBlacklist = async (req, res, next) => {
    try {
        const url = await req.body.url
        if (!url) {
            return next()
        }

        if (isBlacklisted(url)) {
            return res.status(200).jsonify({
                success: false,
                message: 'this domain is not allowed',
                data: {
                    isBlacklisted: true,
                    url: url,
                },
            })
        }
        next()
    } catch (error) {
        next(error)
    }
}
//

/// Middleware để kiểm tra định dạng URL
export const validLinkPreview = async (req, res, next) => {
    try {
        const { url } = await req.body

        // Check if URL exists
        if (!url) {
            return res.status(400).json({
                success: false,
                message: 'URL is required',
            })
        }

        // Check URL length
        if (url.length > 2048) {
            return res.status(400).json({
                success: false,
                message: 'URL is too long (max 2048 characters)',
            })
        }

        // Check URL format using regex
        if (!URL_PATTERN.test(url)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid URL format',
            })
        }

        // Validate URL can be parsed
        try {
            new URL(url)
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: 'Invalid URL structure',
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}
//
