import { callApiSimple } from 'api/callApi'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

/**
 * Hook kiểm tra trạng thái mã hóa của cuộc trò chuyện
 * @param {String} conversationId - Conversation ID to check
 * @returns {Object} - Encryption status information
 */
const useConversationEncryption = (conversationId) => {
   // State from Redux store
   const { conversation } = useSelector((state) => state.chat)

   const [isEncryptionEnabled, setIsEncryptionEnabled] = useState(false)

   // Kiểm tra trạng thái mã hóa khi conversation thay đổi
   useEffect(() => {
      setIsEncryptionEnabled(conversation.encryption_enabled || false)
   }, [conversation.encryption_enabled])

   // Hàm call API kích hoạt mã hóa
   const toggleEncryption = async () => {
      try {
         const response = await callApiSimple({
            method: 'post',
            apiPath: `chat/conversations/${conversationId}/encryption`,
            variables: { enabled: true },
         })
         if (response.success) {
            setIsEncryptionEnabled(true)
            return true
         }
         return false
      } catch (err) {
         return false
      }
   }

   // Hàm call API hủy kích hoạt mã hóa
   const disableEncryption = async () => {
      if (!conversationId) return false

      try {
         const response = await callApiSimple({
            method: 'post',
            apiPath: `chat/conversations/${conversationId}/encryption`,
            variables: { enabled: false },
         })
         if (response.success) {
            setIsEncryptionEnabled(false)
            return true
         }
         return false
      } catch (err) {
         return false
      }
   }

   return {
      isEncryptionEnabled,
      toggleEncryption,
      disableEncryption,
   }
}

export default useConversationEncryption
