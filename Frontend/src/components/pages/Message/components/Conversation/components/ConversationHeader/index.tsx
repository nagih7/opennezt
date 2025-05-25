import { Avatar } from '@chakra-ui/react'
import React, { FC } from 'react'
import { FaCircleCheck } from "react-icons/fa6";

interface ConversationHeaderProps {
   name: string
   logo: string
}

const ConversationHeader: FC<ConversationHeaderProps> = ({ name, logo }) => {
   return (
      <div className="flex items-center">
         <span className="mr-[8px]">
            <Avatar.Root size={'md'}>
               <Avatar.Fallback name={name} />
               <Avatar.Image src={logo} />
            </Avatar.Root>
         </span>
         <span className="flex items-center gap-1 font-[600]">
            {name}
            <FaCircleCheck className="text-blue-500" />
         </span>
      </div>
   )
}

export default ConversationHeader
