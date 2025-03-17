import {Router} from 'express'
import {asyncHandler} from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import * as articleController from '@/app/controllers/articleController'

const articleRouter = Router()

articleRouter.use(asyncHandler(requireAuthentication))

articleRouter.get('/article-list', asyncHandler(articleController.getArticleList))

articleRouter.get('/article-by-id/:id', asyncHandler(articleController.getArticleById))

articleRouter.get('/user-reactions/:id', asyncHandler(articleController.getUserReactions))

articleRouter.get('/user-comment-reactions/:id', asyncHandler(articleController.getUserCommentReactions))

articleRouter.post('/', asyncHandler(articleController.createArticle))

articleRouter.get('/list-comment', asyncHandler(articleController.getCommentList))

articleRouter.post('/create-comment', asyncHandler(articleController.createComment))

articleRouter.put('/update-comment', asyncHandler(articleController.updateComment))

articleRouter.delete('/delete-comment', asyncHandler(articleController.deleteComment))

articleRouter.post('/article-reaction/:id', asyncHandler(articleController.reactArticle))

articleRouter.post('/share-article/:id', asyncHandler(articleController.shareArticle))

articleRouter.put('/article-update/:id', asyncHandler(articleController.updateArticle))

articleRouter.delete('/:id', asyncHandler(articleController.deleteArticle))

export default articleRouter
