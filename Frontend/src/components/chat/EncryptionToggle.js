import React from 'react'
import useConversationEncryption from '../../hooks/useConversationEncryption'

/**
 * Component toggle mã hóa cuộc trò chuyện
 */
const EncryptionToggle = ({ conversationId, onToggle = () => {} }) => {
   const { isEncryptionEnabled, toggleEncryption, disableEncryption } = useConversationEncryption(conversationId)

   const handleToggle = async () => {
      const success = isEncryptionEnabled ? await disableEncryption() : await toggleEncryption()
      if (success) {
         console.log(`Encryption ${isEncryptionEnabled ? 'disabled' : 'enabled'} successfully`)
         onToggle(isEncryptionEnabled)
      }
   }

   return (
      <div className="encryption-toggle">
         <label className="switch">
            <input type="checkbox" checked={isEncryptionEnabled} onChange={handleToggle} />
            <span className="slider round"></span>
         </label>
         <span className="toggle-label">{isEncryptionEnabled ? 'Encryption Enabled' : 'Encryption Disabled'}</span>
         {isEncryptionEnabled && (
            <div className="encryption-info">
               <span role="img" aria-label="lock">
                  🔒
               </span>{' '}
               Messages are end-to-end encrypted
            </div>
         )}
      </div>
   )
}

export default EncryptionToggle
