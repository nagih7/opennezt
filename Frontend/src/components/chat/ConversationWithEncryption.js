import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSignal } from '../../context/SignalContext'
import ChatWithEncryption from './ChatWithEncryption'
import EncryptionToggle from './EncryptionToggle'
import useConversationEncryption from '../../hooks/useConversationEncryption'
import { useDispatch, useSelector } from 'react-redux'
import { getConversation } from 'api/chat'

/**
 * Conversation component chat sử dụng mã hoá
 */
const ConversationWithEncryption = () => {
   const dispatch = useDispatch()
   const { conversationId } = useParams()
   const { initialized: signalInitialized } = useSignal()
   const { isEncryptionEnabled } = useConversationEncryption(conversationId)

   // State from Redux store
   const { conversation } = useSelector((state) => state.chat)

   // Fetch conversation details
   useEffect(() => {
      if (conversationId) {
         dispatch(getConversation(conversationId))
      }
   }, [dispatch, conversationId])

   // Handle encryption toggle
   const handleEncryptionToggle = () => {
      window.location.reload()
   }

   // Get the recipient ID (assuming 1-1 conversation)
   const recipient = conversation.members && conversation.members.length > 0 ? conversation?.members[0] : null

   return (
      <div className="conversation-container">
         <div className="conversation-header">
            <h2>{recipient ? recipient.name : 'Conversation'}</h2>

            {signalInitialized && (
               <EncryptionToggle conversationId={conversationId} onToggle={handleEncryptionToggle} />
            )}
         </div>

         <div className="conversation-content">
            <ChatWithEncryption
               conversationId={conversationId}
               userId={recipient?._id || null}
               encryptionEnabled={isEncryptionEnabled}
            />
         </div>
      </div>
   )
}

export default ConversationWithEncryption
