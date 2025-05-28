import moment from 'moment'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/UI/avatar'
import { AVATAR_DEFAULT } from '~/utils/constants'

interface ChatCardProps {
   conversation: any
   userId: string
   index: number
   onNavigate: () => void
}

const ChatCard: React.FC<ChatCardProps> = ({ conversation, userId, index, onNavigate }) => {
   return (
      <div
         key={index}
         onClick={onNavigate}
         className="p-4 bg-[#ffffff] cursor-pointer overflow-hidden flex items-center gap-2 hover:bg-[#f8f9fa] rounded-md"
      >
         <div className="flex items-center flex-1 gap-3 overflow-hidden">
            <Avatar>
               <AvatarFallback>{conversation?.members[0]?.name}</AvatarFallback>
               <AvatarImage src={conversation?.members[0]?.avatar || AVATAR_DEFAULT} />
            </Avatar>
            <div className="flex-1 overflow-hidden">
               <p className="text-sm font-bold">{conversation.members[0].name}</p>
               <p className="text-xs text-[#6f7f92] font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                  {!conversation.last_message && 'No messages yet'}
                  {conversation.last_message && (
                     <>
                        {conversation.last_message?.user?._id === userId
                           ? 'You: '
                           : conversation.last_message?.user?.name + ': '}
                        {conversation.last_message?.content || 'No content'}
                     </>
                  )}
               </p>
            </div>
         </div>
         <div className="text-xs text-[#6f7f92] ml-auto font-bold">
            <span>{moment(conversation.updated_at).local().fromNow()}</span>
         </div>
      </div>
   )
}

export default ChatCard
