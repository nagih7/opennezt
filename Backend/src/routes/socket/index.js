import notificationRouter from './notificationRouter'
import chatRouter from './chatRouter'
import {TOKEN_TYPE} from '@/configs'
import {verifyToken} from '@/utils/helpers'

export const userSockets = {}

const socketRoutes = (io) => {
    io.on('connection', (socket) => {
        socket.on('login', async (token) => {
            const {user_id} = await verifyToken(token, TOKEN_TYPE.AUTHORIZATION)
            userSockets[socket.id] = user_id
        }),
        notificationRouter(socket)
        chatRouter(socket, io)
        socket.on('disconnect', () => {
            const user_id = userSockets[socket.id]
            if (user_id) {
                delete userSockets[socket.id]
            }
            console.log('User disconnected')
        })
    })
}

export default socketRoutes
