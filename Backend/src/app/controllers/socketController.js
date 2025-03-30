import * as socketService from '../services/socketService'

// Đổi tên hàm để rõ ràng về mục đích của nó (xử lý tin nhắn và trả về kết quả)
export async function processMessage(req, io, socketId) {
    const result = await socketService.sendMessage(req.currentUser, req.body, io, socketId)
    return result
}
