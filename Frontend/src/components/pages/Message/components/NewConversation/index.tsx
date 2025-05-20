import { IconlyArrowLeft2, IconlyStar } from 'components/UI/Iconly'
import { ArrowsAltOutlined, WechatOutlined } from '@ant-design/icons'
import React, { FC } from 'react'
import MessageSidebar from '../MessageSidebar'
import { Link } from 'react-router-dom'

const NewConversation: FC = () => {
   return (
      <div className="w-full h-auto px-[16px] py-8">
         <div className="flex w-full gap-8">
            <div className="w-4/12">
               {/* Left Message */}
               <MessageSidebar />
            </div>
            <div className="w-10/12 h-auto">
               <div className="flex justify-between p-[10px] mb-[18px] bg-[#ffffff] rounded-md">
                  <div className="flex items-center">
                     <Link to={'/conversation'} className="flex justify-center items-center w-[50px] h-11">
                        <IconlyArrowLeft2 size={18} color={'#6f7f92'} />
                     </Link>
                     <span>Start a new conversation</span>
                  </div>
                  <span className="flex items-center justify-center text-[#6f7f92] w-[50px] h-11">
                     <ArrowsAltOutlined />
                  </span>
               </div>
               <div className="px-[15px] border-b border-gray-200 bg-[#ffffff]">
                  <div className="flex items-center text-[#6f7f92]">
                     <span className="font-bold">To: </span>
                     <div className="flex items-center w-full h-12 px-[8px] py-[2px]">
                        <div className="font-normal w-full mx-[2px]">Start typing to search members</div>
                     </div>
                  </div>
               </div>
               <div className="bg-[#ffffff] rounded-t-md w-full">
                  <div className=" flex flex-col items-center justify-center w-full pt-[15px]">
                     <WechatOutlined className="text-8xl w-14 h-14 text-[#6f7f92] " />
                     <span className="text-[#6f7f92]  px-[10px] mt-[20px]">
                        Write a message to start the conversation
                     </span>
                  </div>
               </div>
               <div className="w-full h-[393px] bg-[#ffffff] border-b border-gray-200"></div>
            </div>
         </div>
      </div>
   )
}

export default NewConversation
