import React from 'react'
import Sidebar from './components/MessageSidebar'
import Conversation from './components/Conversation'

const Message: React.FC = () => {
   return (
      <div className="w-full px-[16px] py-[16px] h-full">
         <div className="flex flex-row w-full h-full gap-[16px]">
            <div className="flex-col hidden w-full h-full md:flex md:w-1/4">
               <Sidebar />
            </div>
            <div className="flex flex-col w-full md:w-3/4">
               <Conversation />
            </div>
         </div>
      </div>
   )
}

export default Message
