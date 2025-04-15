import { Router } from 'express'
import { asyncHandler } from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import * as linkPreviewController from '@/app/controllers/linkPreviewController'
import * as linkPreviewMiddleware from '@/app/middleware/linkPreviewMiddleware'
import articleRouter from './articleRouter'

const linkPreviewRouter = Router()

linkPreviewRouter.use(asyncHandler(requireAuthentication))

linkPreviewRouter.post(
    '/link-preview',
    asyncHandler(linkPreviewMiddleware.validLinkPreview),
    asyncHandler(linkPreviewMiddleware.checkBlacklist),
    asyncHandler(linkPreviewMiddleware.linkPreviewCache),
    asyncHandler(linkPreviewController.getLinkPreview)
)

export default linkPreviewRouter
