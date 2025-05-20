import { Stack } from '@chakra-ui/react'
import React, { FC } from 'react'
import MessageHeader from './components/MessageHeader'
import Conversations from './components/Conversations'
import MessageFooter from './components/MessageFooter'

const MessageSidebar: FC = () => {
   return (
      <Stack className="flex flex-col md:px-0 md:py-0 px-[16px] py-[16px] h-full w-full overflow-hidden">
         <MessageHeader />
         <Conversations />
         <MessageFooter />
      </Stack>
   )
}

export default MessageSidebar
