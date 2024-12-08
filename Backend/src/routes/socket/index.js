import notificationRouter from './notificationRouter'
import chatRouter from './chatRouter'

const socketRoutes = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected')

        notificationRouter(socket)
        chatRouter(socket)

        socket.on('disconnect', () => {
            console.log('User disconnected')
        })
    })
}

export default socketRoutes
