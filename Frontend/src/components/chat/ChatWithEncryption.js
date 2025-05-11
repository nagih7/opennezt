import React, { useState, useEffect } from 'react'
import signalService from '../../services/SignalServiceBrowser'
import EncryptedChat from './EncryptedChat'

/**
 * Component chat sử dụng mã hoá
 */
const ChatWithEncryption = ({ conversationId, userId, encryptionEnabled = false }) => {
   const [isInitialized, setIsInitialized] = useState(false) // Trạng thái khởi tạo mã hóa

   useEffect(() => {
      const initializeEncryption = async () => {
         if (!encryptionEnabled) {
            setIsInitialized(true) // Nếu mã hóa không được bật, không cần khởi tạo
            return
         }

         // initializeKeys cho currentUser
         if (!isInitialized) {
            try {
               if (!signalService.initialized) {
                  await signalService.initializeKeys()
               }
               // Thiết lập session với người dùng trong cuộc trò chuyện
               if (userId && !signalService.hasSession(userId)) await signalService.establishSession(userId)

               setIsInitialized(true)
            } catch (err) {
               console.error(`Failed to initialize encryption: ${err.message}`)
            }
         }
      }

      initializeEncryption() // Khởi tạo mã hóa khi component được mount
   }, [conversationId, userId, encryptionEnabled, isInitialized])

   if (!isInitialized) {
      return <div className="initializing-encryption">Setting up secure chat...</div>
   }

   return <EncryptedChat conversationId={conversationId} userId={userId} />
}

export default ChatWithEncryption
