import chatRouter from './chatRouter'
import {TOKEN_TYPE} from '@/configs'
import {verifyToken} from '@/utils/helpers'
import {userSockets} from '..'

const socketRoutes = async (io) => {
    await io.on('connection', async (socket) => {
        await socket.on('login', async (token) => {
            const {user_id} = await verifyToken(token, TOKEN_TYPE.AUTHORIZATION)
            if (!user_id) {
                socket.emit('error', 'Invalid token')
                return
            }
            console.log('User connected:', user_id)
            userSockets[socket.id] = user_id
        }),
        await chatRouter(socket, io)
        await socket.on('disconnect', () => {
            const user_id = userSockets[socket.id]
            if (user_id) {
                delete userSockets[socket.id]
            }
            console.log('User disconnected:', user_id)
        })
    })
}

export default socketRoutes
