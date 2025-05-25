import React, { FC } from 'react'
import { FaCircleCheck } from "react-icons/fa6";
import { IconlySetting } from 'components/UI/Iconly'
import { Avatar } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'

const MessageFooter: FC = () => {
   // ========== STATE FROM REDUX STORE ========== //
   const { authUser } = useSelector((state: RootState) => state.auth)
   return (
      <div className="bg-[#ffffff] flex justify-between mt-[15px] rounded-md">
         <span className="flex items-center pl-[16px] py-[6px] pr-[8px]">
            <span className="mr-[10px]">
               <Avatar.Root>
                  <Avatar.Fallback name={authUser?.name} />
                  <Avatar.Image src={authUser?.avatar} />
               </Avatar.Root>
            </span>
            <span className="flex items-center text-[#6f7f92] gap-1 text-sm font-medium">
               {authUser?.name}
               <FaCircleCheck className="text-blue-500" />
            </span>
         </span>
         <a href="#" className="w-[50px] h-[50px] flex items-center justify-center">
            <IconlySetting size={18} color={'#2f65b9'} />
         </a>
      </div>
   )
}

export default MessageFooter
