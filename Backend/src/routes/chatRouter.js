import {Router} from 'express'
import {asyncHandler} from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import * as chatController from '../app/controllers/chatController'

const chatRouter = Router()

chatRouter.use(asyncHandler(requireAuthentication))

chatRouter.get('/chat-list', asyncHandler(chatController.getChatList))

chatRouter.get('/chat-history/:conversation_id', asyncHandler(chatController.getChatHistory))

export default chatRouter
