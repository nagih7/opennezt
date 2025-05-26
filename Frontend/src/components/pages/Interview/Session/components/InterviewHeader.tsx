import React from 'react'
import { InterviewHeaderProps } from '~/types'

const InterviewHeader: React.FC<InterviewHeaderProps> = ({ formattedTime, messages, showLastMessage = true }) => {
   return (
      <div className="flex w-full px-8 pt-4">
         <div className="w-full">
            <div className="flex items-center justify-between font-medium text-[#ffffff]">
               <div className="flex gap-2">
                  <span>{formattedTime}</span>
                  <span>|</span>
                  <span>Virtual interview</span>
               </div>
               {showLastMessage && (
                  <div className="text-sm">
                     {messages.length > 0 && (
                        <span>Last message: {messages[messages.length - 1]?.content?.substring(0, 30)}...</span>
                     )}
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}

export default InterviewHeader
