import * as socketController from '../../app/controllers/socketController'

const chatRouter = async (socket, io) => {
    // Sử dụng callback trong socket.on
    await socket.on('message', async (data, callback) => {
        try {
            const req = {
                body: data,
                params: {},
                currentUser: socket.currentUser,
            }

            // Gọi service và lấy kết quả
            const result = await socketController.processMessage(req, io, socket.id)

            // Gọi callback để trả kết quả về cho client
            if (typeof callback === 'function') {
                callback({
                    status: 200,
                    success: true,
                    message: 'Send message successfully',
                    data: result,
                })
            }

            // Vẫn có thể emit sự kiện đến các client khác nếu cần
            // socket.broadcast.emit('new-message', result)
        } catch (error) {
            console.error('Error processing message:', error)

            // Trả về lỗi cho client nếu có callback
            if (typeof callback === 'function') {
                callback({
                    status: 500,
                    success: false,
                    message: 'Error processing message',
                    error: error.message,
                })
            }
        }
    })
}

export default chatRouter
