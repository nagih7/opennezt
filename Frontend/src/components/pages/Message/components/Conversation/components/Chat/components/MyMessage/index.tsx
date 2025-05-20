import { Avatar } from '@chakra-ui/react'
import { MoreOutlined } from '@ant-design/icons'
import { IconlyStar } from 'components/UI/Iconly'
import moment from 'moment'
import React, { FC } from 'react'
import { renderContent } from 'utils/formatMessage'

interface User {
   _id: string
   name: string
   avatar: string
}

interface Message {
   content: string
   timestamp: string
   user?: User
}

interface MyMessageProps {
   message: Message
   haveAvatar?: boolean
}

const MyMessage: FC<MyMessageProps> = ({ message, haveAvatar }) => {
   return (
      <div className="flex w-full">
         <div className="flex flex-col items-start w-[30%] mb-[5px]" />
         <div className="flex w-[70%] mb-[5px] flex-row-reverse gap-2">
            <div className="w-[35px] h-[35px]">
               {haveAvatar && (
                  <Avatar.Root size={'md'} className="w-[35px] h-[35px] rounded-full">
                     <Avatar.Fallback name={message.user?.name} />
                     <Avatar.Image src={message.user?.avatar} />
                  </Avatar.Root>
               )}
            </div>
            <div className="flex flex-col items-start flex-1 w-full">
               <div className="group flex flex-row-reverse pl-[10px] w-full">
                  <div className="flex items-center bg-[#2f65b9] rounded-md w-fit max-w-[400px] px-[12px] py-[7px] text-[#ffffff]">
                     <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-sm font-medium break-words">
                           <p className="mb-0">{renderContent(message?.content)}</p>
                        </span>
                        <span className="text-[10px] font-semibold mt-1">
                           {moment(message?.timestamp).format('HH:mm')}
                        </span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default MyMessage
