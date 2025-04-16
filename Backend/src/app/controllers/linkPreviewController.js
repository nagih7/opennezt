import * as linkPreviewService from '../services/linkPreviewService.js'

export const getLinkPreview = async (req, res) => {
    const { url } = req.body
    const linkPreview = await linkPreviewService.getLinkPreview(url)

    if (linkPreview.success) {
        // Lưu vào cache nếu request thành công
        res.saveToCache(linkPreview.data)
    }

    res.status(linkPreview.success ? 200 : 400).jsonify(linkPreview)
}
