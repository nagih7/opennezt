import React from 'react'

interface VoiceStatusIndicatorProps {
   isLoadingReplyInterview: boolean
   currentAction: string
   isSpeaking: boolean
   isListening: boolean
   voiceError: string | null
}

const VoiceStatusIndicator: React.FC<VoiceStatusIndicatorProps> = ({
   isLoadingReplyInterview,
   currentAction,
   isSpeaking,
   isListening,
   voiceError,
}) => {
   if (isLoadingReplyInterview) {
      return (
         <div className="absolute z-10 flex items-center gap-2 px-3 py-1 text-white bg-yellow-600 rounded-full top-4 right-4">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span>Processing your message...</span>
         </div>
      )
   }

   if (currentAction === 'speaking') {
      return (
         <div className="absolute z-10 flex items-center gap-2 px-3 py-1 text-white bg-blue-600 rounded-full top-4 right-4">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span>AI Speaking...</span>
         </div>
      )
   }

   if (isSpeaking && currentAction === 'listening' && !isLoadingReplyInterview) {
      return (
         <div className="absolute z-10 flex items-center gap-2 px-3 py-1 text-white bg-red-600 rounded-full top-4 right-4">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span>Recording voice...</span>
         </div>
      )
   }

   if (isListening && !isSpeaking && currentAction === 'listening' && !isLoadingReplyInterview) {
      return (
         <div className="absolute z-10 flex items-center gap-2 px-3 py-1 text-white bg-green-600 rounded-full top-4 right-4">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span>Listening for your voice...</span>
         </div>
      )
   }

   if (voiceError) {
      return (
         <div className="absolute z-10 px-3 py-1 text-white bg-red-500 rounded-full top-4 right-4">{voiceError}</div>
      )
   }

   return null
}

export default VoiceStatusIndicator
