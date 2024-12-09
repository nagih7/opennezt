import * as chatController from '../../app/controllers/chatController'

const chatRouter = (socket, io) => {
    socket.on('message', (data) => chatController.saveMessage(data, io, socket.id))
}

export default chatRouter
