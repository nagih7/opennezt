import { Router } from 'express'
import { asyncHandler } from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import * as articleController from '@/app/controllers/articleController'
import * as articleMiddleware from '@/app/middleware/articleMiddleware'

const articleRouter = Router()

articleRouter.use(asyncHandler(requireAuthentication))

articleRouter.get('/article-list', asyncHandler(articleController.getArticleList))

articleRouter.get('/article-by-id/:id', asyncHandler(articleController.getArticleById))

articleRouter.get('/user-reactions/:target_ids', asyncHandler(articleController.getUserReactions))

articleRouter.get('/user-comment-reactions/:target_ids', asyncHandler(articleController.getUserCommentReactions))

articleRouter.post('/', asyncHandler(articleMiddleware.decodeFormData), asyncHandler(articleController.createArticle))

articleRouter.get('/list-comments', asyncHandler(articleController.getCommentList))

articleRouter.get('/list-reply-comment', asyncHandler(articleController.getReplyCommentList))

articleRouter.post(
    '/create-comment',
    asyncHandler(articleMiddleware.decodeFormCommentData),
    asyncHandler(articleController.createComment)
)

articleRouter.put('/update-comment', asyncHandler(articleController.updateComment))

articleRouter.delete('/delete-comment', asyncHandler(articleController.deleteComment))

articleRouter.post('/article-reaction/:id', asyncHandler(articleController.reactArticle))

articleRouter.post('/share-article/:id', asyncHandler(articleController.shareArticle))

articleRouter.post(
    '/reply-comment',
    asyncHandler(articleMiddleware.decodeFormReplyCommentData),
    asyncHandler(articleController.replyComment)
)

articleRouter.put(
    '/article-update/:id',
    asyncHandler(articleMiddleware.decodeFormData),
    asyncHandler(articleController.updateArticle)
)

articleRouter.delete('/:id', asyncHandler(articleController.deleteArticle))

// Update project name after update article

articleRouter.post('/bookmark-article', asyncHandler(articleController.bookmarkArticle))

articleRouter.get('/user-bookmarks/:article_ids', asyncHandler(articleController.getUserBookmarks))

// ========== POST [ARTICLE ACTIVITIES] ========== //
articleRouter.post('/activity/create/:id', asyncHandler(articleController.postActivityCreateArticle))

articleRouter.post('/activity/update/:id', asyncHandler(articleController.postActivityUpdateArticle))

articleRouter.post('/activity/save/:id', asyncHandler(articleController.postActivitySaveArticle))

articleRouter.post('/activity/reaction/:id', asyncHandler(articleController.postActivityReactionArticle))

articleRouter.post('/activity/reply-comment/:id', asyncHandler(articleController.postActivityReplyComment))

articleRouter.post('/activity/comment/:id', asyncHandler(articleController.postActivityComment))

// ========== GET [ARTICLE ACTIVITIES] ========== //
articleRouter.get('/activity/create', asyncHandler(articleController.getActivityCreateArticle))

articleRouter.get('/activity/update', asyncHandler(articleController.getActivityUpdateArticle))

articleRouter.get('/activity/save', asyncHandler(articleController.getActivitySaveArticle))

articleRouter.get('/activity/reaction', asyncHandler(articleController.getActivityReactionArticle))

articleRouter.get('/activity/reply-comment', asyncHandler(articleController.getActivityReplyComment))

articleRouter.get('/activity/comment', asyncHandler(articleController.getActivityComment))

articleRouter.get('/activities', asyncHandler(articleController.getArticleActivities))

// ========== DELETE [ARTICLE ACTIVITIES] ========== //
articleRouter.delete('/activity/save/:id', asyncHandler(articleController.deleteActivitySaveArticle))

articleRouter.delete('/activity/reaction/:id', asyncHandler(articleController.deleteActivityReactionArticle))

export default articleRouter
