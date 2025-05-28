import React from 'react'
import { AiOutlineLink } from 'react-icons/ai'
import { IconlySend } from '~/components/UI/Iconly'
import { Textarea } from '~/components/UI/textarea'
import useChatAction from '../hooks/useChatAction'

interface ChatActionBarProps {
   currentChatId: string
}

const ChatActionBar: React.FC<ChatActionBarProps> = ({ currentChatId }) => {
   const {
      textareaRef,
      message,
      isMultiLine,
      handleChangeMessage: onChange,
      handleSendMessage: onSend,
      handleKeyDown: onKeyDown,
   } = useChatAction({ currentChatId })

   return (
      <div className="flex items-center border-t border-gray-200 w-full bg-[#ffffff]">
         <div className="flex justify-center items-center w-[50px] h-[40px] my-1">
            <AiOutlineLink className="text-xl w-[24px] h-[24px]" />
         </div>
         <div className="py-[12px] w-full">
            <Textarea
               id="chat-input"
               ref={textareaRef}
               onKeyDown={onKeyDown}
               value={message}
               onChange={(e) => onChange(e.target.value)}
               placeholder="Type a message..."
               className={
                  'w-full bg-white outline-none py-[8px] scrollbar-hide min-h-[40px] max-h-[120px] resize-none overflow-auto' +
                  ` ${isMultiLine ? ' h-auto' : ' !h-[40px]'}`
               }
            />
         </div>
         <div
            className="min-w-[40px] mx-[10px] my-1 h-[40px] flex justify-center rounded-md bg-[#2f65b9] items-center cursor-pointer"
            onClick={onSend}
         >
            <IconlySend size={24} color={'#ffffff'} />
         </div>
      </div>
   )
}

export default ChatActionBar
