import React, { useState } from 'react'
import useEncryptedChat from '../../hooks/useEncryptedChat'

const EncryptedChat = ({ userId, conversationId }) => {
   const [newMessage, setNewMessage] = useState('')
   const { messages, isLoading, error, sendMessage, encryptionEnabled } = useEncryptedChat(conversationId, userId)

   const handleSendMessage = async () => {
      if (!newMessage.trim()) return

      try {
         await sendMessage(newMessage)
         setNewMessage('')
      } catch (error) {
         console.error('Error sending message:', error)
      }
   }

   return (
      <div className="encrypted-chat">
         {isLoading ? (
            <div className="loading">Loading messages...</div>
         ) : error ? (
            <div className="error">{error}</div>
         ) : (
            <>
               <div className="encryption-status">
                  {encryptionEnabled ? '🔒 End-to-end encrypted' : '🔓 Not encrypted'}
               </div>
               <div className="messages">
                  {messages.map((msg) => (
                     <div key={msg._id} className="message">
                        <strong>{msg.user?.name || 'User'}:</strong> {msg.content}
                        {msg.decryptError && <span className="error-badge">⚠️</span>}
                     </div>
                  ))}
               </div>
            </>
         )}
         <div className="input-area">
            <input
               type="text"
               value={newMessage}
               onChange={(e) => setNewMessage(e.target.value)}
               placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
         </div>
      </div>
   )
}

export default EncryptedChat
