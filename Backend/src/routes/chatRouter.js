import { Router } from 'express'
import { asyncHandler } from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import * as chatController from '../app/controllers/chatController'

const chatRouter = Router()

chatRouter.use(asyncHandler(requireAuthentication))

// ========== GET [MESSAGES] ========== //
chatRouter.get('/conversations/:conversationId/messages', asyncHandler(chatController.getMessages))

// ========== SEND [MESSAGE] ========== //
chatRouter.post('/conversations/:conversationId/messages', asyncHandler(chatController.sendMessage))

// ========== GET [CONVERSATION] ========== //
chatRouter.get('/conversations/:conversationId', asyncHandler(chatController.getConversation))

// ========== GET [CONVERSATIONS] ========== //
chatRouter.get('/conversations', asyncHandler(chatController.getConversations))

// ========== ENCRYPTION ENDPOINTS ========== //
chatRouter.post('/conversations/:conversationId/encryption', asyncHandler(chatController.toggleEncryption))
// ========== GET [ENCRYPTION STATUS] ========== //
chatRouter.get('/conversations/:conversationId/encryption', asyncHandler(chatController.checkEncryptionStatus))
// ========== GET [ENCRYPTION KEYS] ========== //
chatRouter.get('/conversations/:conversationId/encryption/keys', asyncHandler(chatController.getEncryptionKeys))

export default chatRouter
