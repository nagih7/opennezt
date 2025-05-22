import NotFound from 'components/UI/NotFound'
import { Avatar } from '@chakra-ui/react'
import { DIRECT_CONVERSATION, GROUP_CONVERSATION } from 'utils/constants'
import { MoreOutlined } from '@ant-design/icons'
import { useMessage } from '~/hooks'
import moment from 'moment'

const PopoverMessage: React.FC = () => {
   const { conversations, handleNavigateChat } = useMessage()

   return (
      <div className="bg-[#ffffff] rounded-md">
         <div className="mx-2 p-[16px] border-b border-gray-200 text-lg font-medium ">Messages</div>
         <div className="flex flex-col items-center gap-2 p-2 overflow-y-scroll max-h-popover-message scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {conversations.length === 0 && <NotFound content="Not found" size="100" />}
            {conversations.length > 0 &&
               conversations.map((conversation, index) => {
                  return (
                     <div key={index} className="group cursor-pointer p-[15px] hover:bg-[#f6f5f5] w-full rounded-md">
                        <div
                           className="flex flex-row items-center w-full gap-2 overflow-hidden"
                           onClick={() => handleNavigateChat(conversation._id)}
                        >
                           <Avatar.Root size={'lg'}>
                              <Avatar.Fallback
                                 name={
                                    (conversation.type === DIRECT_CONVERSATION && conversation.members[0]?.name) ||
                                    (conversation.type === GROUP_CONVERSATION && conversation.data?.project?.name)
                                 }
                              />
                              <Avatar.Image
                                 src={
                                    (conversation.type === DIRECT_CONVERSATION && conversation.members[0]?.avatar) ||
                                    (conversation.type === GROUP_CONVERSATION && conversation.data?.project?.logo)
                                 }
                              />
                           </Avatar.Root>
                           <div className="flex flex-col w-full">
                              <div className="text-sm font-semibold text-gray-600">
                                 {(conversation.type === DIRECT_CONVERSATION && conversation.members[0]?.name) ||
                                    (conversation.type === GROUP_CONVERSATION && conversation.data?.project?.name)}
                              </div>
                              <p className="text-sm text-gray-500 truncate">
                                 {conversation.last_message?.content}
                                 {conversation.last_message?.timestamp && (
                                    <span className="ml-2 text-xs text-gray-400">
                                       {moment(conversation.last_message?.timestamp)?.local().fromNow()}
                                    </span>
                                 )}
                              </p>
                           </div>
                           <div className="justify-end hidden group-hover:flex">
                              <MoreOutlined className="w-[15px] h-[15px] text-black" />
                           </div>
                        </div>
                     </div>
                  )
               })}
         </div>
      </div>
   )
}

export default PopoverMessage
