import React from 'react'
import { AiOutlineLink } from 'react-icons/ai'
import { IconlySend } from '~/components/UI/Iconly'
import { Textarea } from '~/components/UI/textarea'
import useChatAction from '../hooks/useChatAction'
import { MessageProps } from '~/types'
import { Button } from '~/components/UI/button'

interface ChatActionBarProps {
   currentChatId: string
   onSendMessage: (message: MessageProps) => void
}

const ChatActionBar: React.FC<ChatActionBarProps> = ({ currentChatId, onSendMessage }) => {
   const {
      loading,
      textareaRef,
      message,
      isMultiLine,
      handleChangeMessage: onChange,
      handleSendMessage: onSend,
      handleKeyDown: onKeyDown,
   } = useChatAction({ currentChatId, onSendMessage })

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
               placeholder={loading ? 'Sending...' : 'Type a message...'}
               className={
                  'w-full bg-white outline-none py-[8px] scrollbar-hide min-h-[40px] max-h-[120px] resize-none overflow-auto' +
                  ` ${isMultiLine ? ' h-auto' : ' !h-[40px]'}`
               }
            />
         </div>
         <Button
            className="w-[40px] mx-[10px] my-1 h-[40px] flex justify-center rounded-md bg-main-color items-center cursor-pointer overflow-hidden hover:bg-blue-700 disabled:opacity-50"
            onClick={onSend}
            loading={loading}
         >
            {!loading && <IconlySend size={24} color={'#ffffff'} />}
         </Button>
      </div>
   )
}

export default ChatActionBar
