import express, {Router} from 'express'
import {asyncHandler, verifyToken} from '@/utils/helpers'
import validate from '@/app/middleware/common/validate'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import * as chatRequest from '../app/requests/chatRequest'
import * as chatController from '../app/controllers/chatController'
import expressWs from 'express-ws'
import wss from '../app/socket/websocket.js'
import Messenger from '../models/messenger.js'

import {TOKEN_TYPE} from '@/configs'

const app = express()
expressWs(app)
wss.clients = new Map()

const chatRouter = Router()

chatRouter.use(asyncHandler(requireAuthentication))

chatRouter.get('/get-chat-history/:receiver_id', async (req, res) => {
    try {
        const receiver_id = req.params.receiver_id
        const token = req.headers['authorization']?.split(' ')[1]
        const {user_id} = verifyToken(token, TOKEN_TYPE.AUTHORIZATION)

        const chatHistory = await Messenger.find({
            $or: [
                {sender_id: user_id, receiver_id: receiver_id},
                {sender_id: receiver_id, receiver_id: user_id},
            ],
        }).sort({date: 1})

        return res.status(200).json({
            success: true,
            chatHistory: chatHistory.map((chat) => ({
                content: chat.content,
                date: chat.date,
                sender_id: chat.sender_id,
                receiver_id: chat.receiver_id,
            })),
        })
    } catch (error) {
        console.error('Error fetching chat history:', error)
        return res.status(500).json({message: 'Internal server error'})
    }
})

chatRouter.post('/create-chat', async (req, res) => {
    try {
        const {receiver_id, content} = req.body
        const token = req.headers['authorization']?.split(' ')[1]
        const {user_id} = verifyToken(token, TOKEN_TYPE.AUTHORIZATION)

        const existingChat = await Messenger.findOne({
            $or: [
                {sender_id: user_id, receiver_id: receiver_id},
                {sender_id: receiver_id, receiver_id: user_id},
            ],
        })

        if (existingChat) {
            const newMessage = new Messenger({
                sender_id: user_id,
                receiver_id: receiver_id,
                content: content || "Hi! Let's continue chatting.",
                date: new Date().toISOString(),
            })

            await newMessage.save()

            const wsReceiver = wss.clients.get(receiver_id)
            if (wsReceiver) {
                wsReceiver.send(
                    JSON.stringify({
                        sender_id: user_id,
                        content: newMessage.content,
                        date: newMessage.date,
                    })
                )
            }

            return res.status(200).json({
                success: true,
                message: 'Chat exists, added new message',
                newMessage: {
                    content: newMessage.content,
                    date: newMessage.date,
                },
            })
        }

        const newChat = new Messenger({
            sender_id: user_id,
            receiver_id: receiver_id,
            content: "Hi! Let's start chatting.",
            date: new Date().toISOString(),
        })

        await newChat.save()

        const wsReceiver = wss.clients.get(receiver_id)
        if (wsReceiver) {
            wsReceiver.send(
                JSON.stringify({
                    sender_id: user_id,
                    content: newChat.content,
                    date: newChat.date,
                })
            )
        }

        res.status(201).json({
            success: true,
            content: 'Chat created successfully',
            chatId: newChat._id,
            chatHistory: [newChat],
        })
    } catch (error) {
        console.error('Error creating chat:', error)
        res.status(500).json({message: 'Internal server error'})
    }
})

chatRouter.get('/receiverIds/:userId', async (req, res) => {
    const {userId} = req.params
    try {
        const receiverIds = await chatController.getReceiverIds(userId)
        res.status(200).json(receiverIds)
    } catch (error) {
        res.status(500).json({message: 'Failed to get receiverIds'})
    }
})

app.ws('/chat', (ws, req) => {
    const urlParams = new URLSearchParams(req.url.split('?')[1])
    const token = urlParams.get('token')

    if (!token) {
        console.log('Token is missing')
        ws.close(4000, 'Authorization token missing')
        return
    }

    let user_id
    try {
        user_id = verifyToken(token, TOKEN_TYPE.ACCESS_TOKEN)
    } catch (error) {
        console.error('Token verification failed:', error)
        ws.close(4001, 'Invalid token')
        return
    }

    console.log(`User ${user_id} connected`)

    if (wss.clients.has(user_id)) {
        const existingSocket = wss.clients.get(user_id)
        existingSocket.close()
    }

    wss.clients.set(user_id, ws)

    // ws.on('message', async (message) => {
    //     console.log('Received message:', message)
    //     try {
    //         if (!receiver_id || !content) {
    //             throw new Error('Invalid message data')
    //         }
    //         const {sender_id, receiver_id} = JSON.parse(message)
    //         const content = JSON.parse(message).message

    //         const newMessage = new Messenger({
    //             sender_id: sender_id,
    //             receiver_id: receiver_id,
    //             message: content,
    //             date: new Date().toISOString(),
    //         })
    //         console.log('Creating2 new message object with:', {
    //             sender_id: user_id,
    //             receiver_id: receiver_id,
    //             message: content,
    //             date: new Date().toISOString(),
    //         })
    //         console.log('Received message:', {receiver_id, content})

    //         console.log('Saving message to database:', newMessage)

    //         await newMessage.save()
    //         console.log('Message saved successfully:', newMessage)

    //         const receiverSocket = wss.clients.get(receiver_id)
    //         if (receiverSocket) {
    //             receiverSocket.send(
    //                 JSON.stringify({
    //                     sender_id: user_id,
    //                     message: content,
    //                     date: newMessage.date,
    //                 })
    //             )
    //         } else {
    //             console.log(`Receiver ${receiver_id} is not connected. Message will be saved.`)
    //         }
    //     } catch (error) {
    //         console.error('Error handling message:', error)
    //     }
    // })

    // ws.on('close', () => {
    //     wss.clients.delete(user_id)
    //     console.log(`User ${user_id} disconnected`)
    // })

    // ws.on('error', (err) => {
    //     console.error('WebSocket error:', err)
    //     wss.clients.delete(user_id)
    // })
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
    asyncHandler(validate(chatRequest.chatInvitation)),
    asyncHandler(chatController.chatInvitation)
)

chatRouter.get('/chat-invitations', asyncHandler(chatController.getChatInvitations))

chatRouter.get('/chat-invitation/:receiver_id', asyncHandler(chatController.getChatInvitation))

export default chatRouter
