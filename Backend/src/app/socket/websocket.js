import WebSocket from 'ws'
import {saveMessage} from '../controllers/chatController.js'
import {verifyToken} from '@/utils/helpers'

const wss = new WebSocket.Server({
    noServer: true,
})

const clients = new Map()

wss.on('connection', (ws, req) => {
    console.log('req.url:', req.url)
    const urlParams = new URLSearchParams(req.url.split('?')[1])
    const token = urlParams.get('token')
    console.log('Token:', token)

    if (!token) {
        console.log('Token is missing')
        ws.close(4000, 'Authorization token missing')
        return
    }

    verifyToken(token)
        .then((user) => {
            if (!user) {
                console.log('Invalid token')
                ws.close(4000, 'Invalid token')
                return
            }

            ws.user = user
            const userId = user._id
            console.log(`User ${userId} connected`)

            if (clients.has(userId)) {
                const existingSocket = clients.get(userId)
                existingSocket.close()
            }

            clients.set(userId, ws)

            ws.on('message', async (message) => {
                try {
                    const {receiverId, content} = JSON.parse(message)

                    if (!receiverId || !content) {
                        throw new Error('Invalid message data')
                    }

                    await saveMessage(userId, receiverId, content)

                    const receiverSocket = clients.get(receiverId)
                    if (receiverSocket) {
                        receiverSocket.send(JSON.stringify({senderId: userId, message: content}))
                    } else {
                        console.log(`Receiver ${receiverId} is not connected. Message will be saved.`)
                    }
                } catch (error) {
                    console.error('Error handling message:', error)
                }
            })

            ws.on('close', () => {
                clients.delete(userId)
                console.log(`User ${userId} disconnected`)
            })

            ws.on('error', (err) => {
                console.error('WebSocket error:', err)
                clients.delete(userId)
            })
        })
        .catch((error) => {
            console.error('Authentication failed', error)
            ws.close(4000, 'Authentication failed')
        })
})

export default wss
