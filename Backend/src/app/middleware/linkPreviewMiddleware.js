import NodeCache from 'node-cache'

const cache = new NodeCache({
    stdTTL: 3600, // Cache trong 1 giờ
    checkperiod: 120, // Kiểm tra và xóa cache hết hạn mỗi 2 phút
})

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
        return res.status(200).json({
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

export const validateLickPreview = (req, res, next) => {
    const { url } = req.body
    if (!url) {
        return res.status(400).json({
            success: false,
            message: 'URL is required',
        })
    }

    // Kiểm tra định dạng URL
    const urlPattern = new RegExp(
        '^(https?:\\/\\/)' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])?)\\.)+[a-z]{2,}|' + // domain name
            'localhost|' + // localhost
            '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|' + // ipv4
            '\\[([0-9a-f]{1,4}:){7}[0-9a-f]{1,4}\\])' + // ipv6
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$',
        'i' // fragment locator
    )
    if (!urlPattern.test(url)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid URL format',
        })
    }

    next()
}
