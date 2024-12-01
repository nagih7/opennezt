import Messenger from '../../models/messenger.js'
import User from '../../models/user.js'
export const saveMessage = async (senderId, receiverId, messageContent) => {
    try {
        const newMessage = new Messenger({
            senderId,
            receiverId,
            message: messageContent,
            date: new Date().toISOString(),
        })
        await newMessage.save()
        console.log('Message saved successfully.')
    } catch (error) {
        console.error('Error saving message:', error)
    }
}
export const getReceiverIds = async (userId) => {
    try {
        const messages = await Messenger.find({
            $or: [
                { senderId: userId },
                { receiverId: userId }
            ]
        }).distinct('receiverId')  
  
        const filteredReceiverIds = messages.filter(id => id.toString() !== userId.toString())
  
        if (filteredReceiverIds.length === 0) {
            return []
        }
  
        const users = await User.find({
            _id: { $in: filteredReceiverIds }
        })
  
        return users.map(user => {
            return {
                receiverId: userId,
                userId: user._id,
                username: user.name,
                avatar: user.avatar
            }
        })
  
    } catch (error) {
        console.error('Error getting receiver names:', error)
        throw error
    }
}
  