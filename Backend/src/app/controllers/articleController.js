import * as articleService from '../services/articleService.js'

export const createArticle = async (req, res) => {
    await articleService.createArticle(req.currentUser, req.body)
    res.status(201).jsonify('Create Article Success.')
}

export const getArticleList = async (req, res) => {
    const data = await articleService.getArticleList(req.currentUser, req.query)
    res.status(200).jsonify(data)
}

export const getArticleById = async (req, res) => {
    const article = await articleService.getArticleById(req.params.id)
    res.status(200).jsonify(article)
}

export async function getCommentList(req, res) {
    const commentList = await articleService.getCommentList(req.currentUser, req.query.value)
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
    await articleService.updateArticle(req.params.id, req.body)
    res.status(200).jsonify('Update Article Success')
}

export const deleteArticle = async (req, res) => {
    try {
        await articleService.deleteArticle(req.params.id)
        res.status(200).jsonify('Delete Article Success')
    } catch (err) {
        res.status(500).jsonify('Error While Deleting Article')
    }
}

export const shareArticle = async (req, res) => {
    await articleService.shareArticle(req.params.id, req.currentUser)
    res.status(200).jsonify('Share Article Success')
}
