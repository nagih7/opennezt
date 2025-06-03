import chatRouter from './chatRouter'
import { userSockets } from '..'
import socketAuthentication from '@/app/middleware/common/socket-authentication'

const socketRoutes = async io => {
    await io.on('connection', async socket => {
        await socket.on('login', async token => {
            await socketAuthentication(socket, token)
        }),
        await chatRouter(socket, io)

        await disconnectHandler(socket)
    })
}

const disconnectHandler = async socket => {
    await socket.on('disconnect', () => {
        const user_id = userSockets[socket.id]
        if (user_id) {
            delete userSockets[socket.id]
        }
    })
}

export default socketRoutes
