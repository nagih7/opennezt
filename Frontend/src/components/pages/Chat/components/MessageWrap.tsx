import moment from 'moment'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/UI/avatar'
import { AVATAR_DEFAULT } from '~/utils/constants'
import { renderContent } from '~/utils/formatMessage'

interface MessageWrapProps {
   userId: string
   ownerId: string
   messageId: string
   ownerName?: string
   favicon: string
   content: string
   timestamp: string
   prevUserId?: string | undefined
}

const MessageWrap: React.FC<MessageWrapProps> = ({
   userId,
   ownerId,
   ownerName,
   messageId,
   favicon,
   content,
   timestamp,
   prevUserId,
}) => {
   return (
      <div className={`flex w-full gap-2` + (ownerId === userId && ' flex-row-reverse')} key={messageId}>
         {ownerId === prevUserId ? (
            <div className="w-[35px] h-[35px]" />
         ) : (
            <Avatar className="w-[35px] h-[35px]">
               <AvatarFallback>{ownerName}</AvatarFallback>
               <AvatarImage src={favicon || AVATAR_DEFAULT} />
            </Avatar>
         )}

         <div className="flex flex-col items-start mb-[5px] max-w-[70%]">
            <div className="group flex flex-row-reverse pl-[10px]">
               <div className="flex items-center bg-[#2f65b9] rounded-md w-fit max-w-[400px] px-[12px] py-[7px] text-[#ffffff]">
                  <div className="flex flex-col flex-1 min-w-0">
                     <span className="text-sm font-medium break-words">
                        <p className="mb-0">{renderContent(content)}</p>
                     </span>
                     <span className="text-[10px] font-semibold mt-1">{moment(timestamp).format('HH:mm')}</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default MessageWrap
