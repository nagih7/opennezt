import { IconlyStar } from 'components/UI/Iconly'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { AiFillWechat } from "react-icons/ai";
import { BsArrowsAngleExpand } from "react-icons/bs";

const NoChat: FC = () => {
   return (
      <>
         <div className="flex justify-end p-[10px] mb-[18px] bg-[#ffffff] rounded-md">
            <a href="#" className="flex justify-center items-center w-[50px] h-11">
               <IconlyStar size={18} color={'#6f7f92'} />
            </a>
            <span className="flex items-center justify-center text-[#6f7f92] w-[50px] h-11">
               <BsArrowsAngleExpand  />
            </span>
         </div>
         <div className="py-[16px] flex-1">
            <div className="flex flex-col items-center justify-center h-full gap-3 py-16">
               <p className="mb-0 w-14 h-14">
                  <AiFillWechat  className="text-8xl w-14 h-14 " />
               </p>
               <p className="mb-0 text-[#6f7f92]">Select a conversation to display messages</p>
               <p className="mb-0 text-[#6f7f92]">or</p>
               <p className="mb-0">
                  <Link
                     to={'/messages-sidebar'}
                     className="block md:hidden px-[28px] text-sm font-semibold py-[11px] bg-[#2f65b9] rounded-md no-underline text-[#ffffff]"
                  >
                     START A NEW CONVERSATION
                  </Link>
                  <Link
                     to={'/messages-sidebar'}
                     className="hidden md:block px-[28px] text-sm font-semibold py-[11px] bg-[#2f65b9] rounded-md no-underline text-[#ffffff]"
                  >
                     START A NEW CONVERSATION
                  </Link>
               </p>
            </div>
         </div>
      </>
   )
}

export default NoChat
