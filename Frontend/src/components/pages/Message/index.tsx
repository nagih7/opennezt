import React, { FC } from 'react'
import MessageSidebar from './components/MessageSidebar'
import Conversation from './components/Conversation'

const Message: FC = () => {
   return (
      <div className="w-full px-[16px] py-[16px] h-full">
         <div className="flex flex-row w-full h-full gap-[16px]">
            <div className="flex-col hidden w-full h-full md:flex md:w-4/12">
               <MessageSidebar />
            </div>
            <div className="flex flex-col w-full md:w-8/12">
               <Conversation />
            </div>
         </div>
      </div>
   )
}

export default Message
