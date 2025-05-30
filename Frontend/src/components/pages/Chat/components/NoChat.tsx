import React from 'react'
import { AiFillWechat } from 'react-icons/ai'

const NoChat: React.FC = () => {
   return (
      <div className="py-[16px] flex-1">
         <div className="flex flex-col items-center justify-center h-full gap-3 py-16">
            <p className="mb-0 w-14 h-14">
               <AiFillWechat className="text-8xl w-14 h-14 " />
            </p>
            <p className="mb-0 text-[#6f7f92]">Select a conversation to display messages</p>
            <p className="mb-0 text-[#6f7f92]">or</p>
            <p className="mb-0">
               <p
                  className="hidden md:block px-[28px] text-sm font-semibold py-[11px] bg-[#2f65b9] rounded-md no-underline text-[#ffffff]"
               >
                  START A NEW CONVERSATION
               </p>
            </p>
         </div>
      </div>
   )
}

export default NoChat
