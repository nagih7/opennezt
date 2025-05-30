import { Router } from 'express'
import { asyncHandler } from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import * as chatController from '../app/controllers/chatController'

const chatRouter = Router()

chatRouter.use(asyncHandler(requireAuthentication))

// ========== GET [MESSAGES] ========== //
chatRouter.get('/conversations/:conversationId/messages', asyncHandler(chatController.getMessages))

// ========== GET [CONVERSATION] ========== //
chatRouter.get('/conversations/:conversationId', asyncHandler(chatController.getConversation))

// ========== GET [CONVERSATIONS] ========== //
chatRouter.get('/conversations', asyncHandler(chatController.getConversations))

export default chatRouter
