import * as chatController from '../../app/controllers/chatController'

const chatRouter = async (socket, io) => {
    await socket.on('message', (data) => chatController.saveMessage(data, io, socket.id))
}

export default chatRouter
