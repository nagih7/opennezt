import Messenger from '../models/messenger.js'
import {Router} from 'express'
import {asyncHandler} from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import validate from '@/app/middleware/common/validate'
import * as chatRequest from '../app/requests/chatRequest'
import * as chatController from '../app/controllers/chatController'

const chatRouter = Router()

chatRouter.use(asyncHandler(requireAuthentication))

chatRouter.get('/chat-list', asyncHandler(chatController.getChatList))

chatRouter.get('/chat-history/:receiver_id', asyncHandler(chatController.getChatHistory))

chatRouter.get('/receiverIds/:userId', async (req, res) => {
    const {userId} = req.params
    try {
        const receiverIds = await chatController.getReceiverIds(userId)
        res.status(200).json(receiverIds)
    } catch (error) {
        res.status(500).json({message: 'Failed to get receiverIds'})
    }
})

chatRouter.post('/save-messages', async (req, res) => {
    try {
        const messages = req.body
        // const token = req.headers['authorization']?.split(' ')[1]
        // const {user_id} = verifyToken(token, TOKEN_TYPE.AUTHORIZATION)

        for (const msg of messages) {
            const newMessage = new Messenger({
                sender_id: msg.sender_id,
                receiver_id: msg.receiver_id,
                content: msg.content,
                date: msg.timestamp,
            })
            await newMessage.save()
        }

        res.status(200).json({success: true, message: 'Messages saved successfully'})
    } catch (error) {
        console.error('Error saving messages:', error)
        res.status(500).json({message: 'Internal server error'})
    }
})

chatRouter.post(
    '/chat-invitation',
    asyncHandler(validate(chatRequest.createChatInvitation)),
    asyncHandler(chatController.createChatInvitation)
)

chatRouter.get('/chat-invitations', asyncHandler(chatController.getChatInvitations))

chatRouter.get('/chat-invitation/:receiver_id', asyncHandler(chatController.getChatInvitationByReceiverId))

export default chatRouter
