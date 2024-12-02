import express from 'express'
import expressWs from 'express-ws'
import { saveMessage, getReceiverIds } from '../app/controllers/chatController.js'
import wss from '../app/socket/websocket.js'
import Messenger from '../models/messenger.js'
import jwt from 'jsonwebtoken' 
import { abort, verifyToken, getToken } from '@/utils/helpers'
import { TOKEN_TYPE } from '@/configs'

const app = express()
const chatrouter = express.Router()
expressWs(app) 

wss.clients = new Map()
chatrouter.get('/get-chat-history/:receiverId', async (req, res) => {
    try {
        const receiverId = req.params.receiverId
        const token = req.headers['authorization']?.split(' ')[1]
        const { user_id } = verifyToken(token, TOKEN_TYPE.AUTHORIZATION)

        const chatHistory = await Messenger.find({
            $or: [
                { senderId: user_id },
                { receiverId: user_id}
            ]
        }).sort({ date: 1 })

        return res.status(200).json({
            success: true,
            chatHistory: chatHistory.map(chat => ({
                message: chat.message,
                date: chat.date,
                senderId: chat.senderId,
                receiverId: chat.receiverId
            }))
        })
    } catch (error) {
        console.error('Error fetching chat history:', error)
        return res.status(500).json({ message: 'Internal server error' })
    }
})
chatrouter.post('/create-chat', async (req, res) => {
    try {
        const { receiverId, message } = req.body
        const token = req.headers['authorization']?.split(' ')[1]
        const { user_id } = verifyToken(token, TOKEN_TYPE.AUTHORIZATION)

        const existingChat = await Messenger.findOne({
            $or: [
                { senderId: user_id, receiverId: receiverId },
                { senderId: receiverId, receiverId: user_id }
            ]
        })

        if (existingChat) {
            const newMessage = new Messenger({
                senderId: user_id,
                receiverId: receiverId,
                message: message || "Hi! Let's continue chatting.",
                date: new Date().toISOString(),
            })

            await newMessage.save()

            const wsReceiver = wss.clients.get(receiverId)
            if (wsReceiver) {
                wsReceiver.send(JSON.stringify({
                    senderId: user_id,
                    message: newMessage.message,
                    date: newMessage.date
                }))
            }

            return res.status(200).json({
                success: true,
                message: 'Chat exists, added new message',
                newMessage: {
                    message: newMessage.message,
                    date: newMessage.date
                }
            })
        }

        const newChat = new Messenger({
            senderId: user_id,
            receiverId: receiverId,
            message: "Hi! Let's start chatting.",
            date: new Date().toISOString(),
        })

        await newChat.save()

        const wsReceiver = wss.clients.get(receiverId)
        if (wsReceiver) {
            wsReceiver.send(JSON.stringify({
                senderId: user_id,
                message: newChat.message,
                date: newChat.date
            }))
        }

        res.status(201).json({
            success: true,
            message: 'Chat created successfully',
            chatId: newChat._id,
            chatHistory: [newChat] 
        })
    } catch (error) {
        console.error('Error creating chat:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
})


chatrouter.get('/receiverIds/:userId', async (req, res) => {
    const { userId } = req.params
    try {
        const receiverIds = await getReceiverIds(userId)  
        res.status(200).json(receiverIds)
    } catch (error) {
        res.status(500).json({ message: 'Failed to get receiverIds' })
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

    ws.on('message', async (message) => {
        try {
            const { receiverId, content } = JSON.parse(message)

            if (!receiverId || !content) {
                throw new Error('Invalid message data')
            }

            console.log('Received message:', { receiverId, content })

            const newMessage = new Messenger({
                senderId: user_id,
                receiverId: receiverId,
                message: content,
                date: new Date().toISOString(),
            })

            console.log('Saving message to database:', newMessage)

            await newMessage.save()
            console.log('Message saved successfully:', newMessage)

            const receiverSocket = wss.clients.get(receiverId)
            if (receiverSocket) {
                receiverSocket.send(JSON.stringify({
                    senderId: user_id,
                    message: content,
                    date: newMessage.date
                }))
            } else {
                console.log(`Receiver ${receiverId} is not connected. Message will be saved.`)
            }

        } catch (error) {
            console.error('Error handling message:', error)
        }
    })

    ws.on('close', () => {
        wss.clients.delete(user_id)
        console.log(`User ${user_id} disconnected`)
    })

    ws.on('error', (err) => {
        console.error('WebSocket error:', err)
        wss.clients.delete(user_id)
    })
})

chatrouter.post('/save-messages', async (req, res) => {
    try {
        const messages = req.body
        const token = req.headers['authorization']?.split(' ')[1]
        const { user_id } = verifyToken(token, TOKEN_TYPE.AUTHORIZATION)

        for (const msg of messages) {
            const newMessage = new Messenger({
                senderId: msg.senderId,
                receiverId: msg.receiverId,
                message: msg.message,
                date: msg.timestamp,
            })
            await newMessage.save()
        }

        res.status(200).json({ success: true, message: 'Messages saved successfully' })
    } catch (error) {
        console.error('Error saving messages:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

export default chatrouter
