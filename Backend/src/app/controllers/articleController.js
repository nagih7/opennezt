import * as articleService from '../services/articleService.js'

export const createArticle = async (req, res) => {
    const newAricle = await articleService.createArticle(req.currentUser, req.body)
    res.status(200).jsonify(newAricle)
}

export const getArticleList = async (req, res) => {
    const data = await articleService.getArticleList(req.currentUser, req.query)
    res.status(200).jsonify(data)
}

export const getArticleById = async (req, res) => {
    const article = await articleService.getArticleById(req.params.id)
    res.status(200).jsonify(article)
}

export const getUserReactions = async (req, res) => {
    const reactions = await articleService.getUserReactions(req.currentUser._id, req.params.target_ids)
    res.status(200).jsonify(reactions)
}

export const getUserCommentReactions = async (req, res) => {
    const reactions = await articleService.getUserCommentReactions(req.currentUser._id, req.params.target_ids)
    res.status(200).jsonify(reactions)
}

export async function getCommentList(req, res) {
    const commentList = await articleService.getCommentList(req.currentUser, req.query)
    res.status(200).jsonify(commentList)
}

export async function getReplyCommentList(req, res) {
    const commentList = await articleService.getReplyCommentList(req.currentUser, req.query)
    res.status(200).jsonify(commentList)
}

export async function createComment(req, res) {
    const comment = await articleService.createComment(req.currentUser, req.body)
    res.status(200).jsonify(comment)
}

export async function updateComment(req, res) {
    const comment = await articleService.updateComment(req.currentUser, req.body)
    res.status(200).jsonify(comment)
}

export async function deleteComment(req, res) {
    const comment = await articleService.deleteComment(req.currentUser, req.body)
    res.status(200).jsonify(comment)
}

export const reactArticle = async (req, res) => {
    await articleService.reactArticle(req.params.id, req.currentUser, req.body)
    res.status(201).jsonify('React Article Success')
}

export const updateArticle = async (req, res) => {
    const updatedArticle = await articleService.updateArticle(req.currentUser._id, req.params.id, req.body)
    res.status(200).jsonify(updatedArticle)
}

export const deleteArticle = async (req, res) => {
    const deletedArticle = await articleService.deleteArticle(req.currentUser, req.params.id)
    res.status(200).jsonify(deletedArticle)
}

export const shareArticle = async (req, res) => {
    await articleService.shareArticle(req.params.id, req.currentUser)
    res.status(200).jsonify('Share Article Success')
}

export const replyComment = async (req, res) => {
    const replyComment = await articleService.replyComment(req.currentUser, req.body)
    res.status(200).jsonify(replyComment)
}

export const bookmarkArticle = async (req, res) => {
    const bookmarkArticle = await articleService.bookmarkArticle(req.body, req.currentUser)
    res.status(200).jsonify(bookmarkArticle)
}

export const getUserBookmarks = async (req, res) => {
    const bookmarks = await articleService.getUserBookmarks(req.currentUser, req.params.article_ids)
    res.status(200).jsonify(bookmarks)
}

// ========== POST [ARTICLE ACTIVITIES] ========== //
export const postActivityCreateArticle = async (req, res) => {
    const activity = await articleService.postActivityCreateArticle(req.currentUser, req.params.id)
    res.status(200).jsonify(activity)
}

export const postActivityUpdateArticle = async (req, res) => {
    const result = await articleService.postActivityUpdateArticle(req.currentUser, req.params.id)
    return res.json(result)
}

export const postActivitySaveArticle = async (req, res) => {
    const result = await articleService.postActivitySaveArticle(req.currentUser, req.params.id)
    return res.json(result)
}

export const postActivityReactionArticle = async (req, res) => {
    const result = await articleService.postActivityReactionArticle(req.currentUser, req.params.id)
    return res.json(result)
}

export const postActivityReplyComment = async (req, res) => {
    const result = await articleService.postActivityReplyComment(req.currentUser, req.params.id)
    return res.json(result)
}

export const postActivityComment = async (req, res) => {
    const result = await articleService.postActivityComment(req.currentUser, req.params.id)
    return res.json(result)
}

// ========== GET [ARTICLE ACTIVITIES] ========== //
export const getArticleActivities = async (req, res) => {
    const { types, limit, skip, ownedOnly, performedOnly } = req.query

    // Chuyển đổi các tham số từ chuỗi sang kiểu dữ liệu phù hợp
    const options = {
        types: types ? types.split(',') : [],
        limit: limit ? parseInt(limit) : 10,
        skip: skip ? parseInt(skip) : 0,
        ownedOnly: ownedOnly === 'true',
        performedOnly: performedOnly === 'true',
    }

    const activities = await articleService.getArticleActivities(req.currentUser, options)
    return res.status(200).json({
        success: true,
        data: activities,
    })
}

// ========== DELETE [ARTICLE ACTIVITIES] ========== //
export const deleteActivitySaveArticle = async (req, res) => {
    const result = await articleService.deleteActivitySaveArticle(req.currentUser, req.params.id)
    return res.json(result)
}

export const deleteActivityReactionArticle = async (req, res) => {
    const result = await articleService.deleteActivityReactionArticle(req.currentUser, req.params.id)
    return res.json(result)
}
