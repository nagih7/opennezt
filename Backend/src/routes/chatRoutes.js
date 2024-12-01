import express from 'express'
import expressWs from 'express-ws'
import {saveMessage, getReceiverIds} from '../app/controllers/chatController.js'
import wss from '../app/socket/websocket.js'
import Messenger from '../models/messenger.js'
import {verifyToken} from '@/utils/helpers'
import {TOKEN_TYPE} from '@/configs'

const app = express()
const chatrouter = express.Router()
expressWs(app)

wss.clients = new Map()
chatrouter.post('/create-chat', async (req, res) => {
    try {
        const {receiverId, message} = req.body
        const token = req.headers['authorization']?.split(' ')[1]
        const {user_id} = verifyToken(token, TOKEN_TYPE.AUTHORIZATION)

        const existingChat = await Messenger.findOne({
            $or: [
                {senderId: user_id, receiverId: receiverId},
                {senderId: receiverId, receiverId: user_id},
            ],
        })

        if (existingChat) {
            const chatHistory = await Messenger.find({
                $or: [
                    {senderId: user_id, receiverId: receiverId},
                    {senderId: receiverId, receiverId: user_id},
                ],
            }).sort({date: 1})

            const newMessage = new Messenger({
                senderId: user_id,
                receiverId: receiverId,
                message: message || "Hi! Let's continue chatting.",
                date: new Date().toISOString(),
            })

            await newMessage.save()

            const wsReceiver = wss.clients.get(receiverId)
            if (wsReceiver) {
                wsReceiver.send(
                    JSON.stringify({
                        senderId: user_id,
                        message: message || "Hi! Let's continue chatting.",
                        date: new Date().toISOString(),
                    })
                )
            }

            return res.status(200).json({
                success: true,
                message: 'Chat exists, returning chat history and added new message',
                chatHistory: chatHistory.map((chat) => ({
                    message: chat.message,
                    date: chat.date,
                })),
                newMessage: {
                    message: newMessage.message,
                    date: newMessage.date,
                },
            })
        }

        const newChat = new Messenger({
            senderId: user_id,
            receiverId: receiverId,
            message: "Hi! Let's start chatting.",
            date: new Date().toISOString(),
        })

        await newChat.save()

        await saveMessage(user_id, receiverId, "Hi! Let's start chatting.")

        const wsReceiver = wss.clients.get(receiverId)
        if (wsReceiver) {
            wsReceiver.send(
                JSON.stringify({
                    senderId: user_id,
                    message: "Hi! Let's start chatting.",
                    date: new Date().toISOString(),
                })
            )
        }

        res.status(201).json({message: 'Chat created successfully', chatId: newChat._id})
    } catch (error) {
        console.error('Error creating chat:', error)
        res.status(500).json({message: 'Internal server error'})
    }
})

chatrouter.get('/receiverIds/:userId', async (req, res) => {
    const {userId} = req.params
    try {
        const receiverIds = await getReceiverIds(userId)
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

    const user_id = verifyToken(token, TOKEN_TYPE.ACCESS_TOKEN)

    console.log(`User ${user_id} connected`)

    if (wss.clients.has(user_id)) {
        const existingSocket = wss.clients.get(user_id)
        existingSocket.close()
    }

    wss.clients.set(user_id, ws)
    ws.on('message', async (message) => {
        try {
            const {receiverId, content} = JSON.parse(message)

            if (!receiverId || !content) {
                throw new Error('Invalid message data')
            }

            await saveMessage(user_id, receiverId, content)

            const receiverSocket = wss.clients.get(receiverId)
            if (receiverSocket) {
                receiverSocket.send(JSON.stringify({senderId: user_id, message: content}))
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

export default chatrouter
