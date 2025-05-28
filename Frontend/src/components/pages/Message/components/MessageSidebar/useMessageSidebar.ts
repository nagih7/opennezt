import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyFriends } from '~/api/profile'
import { ROUTE_CONFIG } from '~/config/constants'
import { RootState, useAppSelector } from '~/store'
import { BaseConversationProps } from '~/types'

const useMessageSidebar = () => {
   const navigate = useNavigate()
   // Store
   const { conversations } = useAppSelector((state: RootState) => state.chat)
   const { authUser } = useAppSelector((state: RootState) => state.auth)
   const friends = useAppSelector((state: RootState) => state.profile.myFriends)

   // State
   const [allChat, setAllChat] = useState<[BaseConversationProps] | any>(conversations)
   const [directChat, setDirectChat] = useState<[BaseConversationProps] | any>([])
   const [groupChat, setGroupChat] = useState<[BaseConversationProps] | any>([])

   useEffect(() => {
      if (conversations?.length > 0) {
         setAllChat(conversations)
         setDirectChat(conversations.filter((item: BaseConversationProps) => item.type === 'direct'))
         setGroupChat(conversations.filter((item: BaseConversationProps) => item.type === 'group'))
      }
   }, [conversations])

   useEffect(() => {
      if (friends?.length === 0) {
         getMyFriends()
      }
   }, [])

   // Functions
   const navigateToConversation = (conversationId: string) => {
      navigate(ROUTE_CONFIG.USER.CONVERSATION.PREFIX + conversationId)
   }

   return {
      authUser,
      allChat,
      directChat,
      groupChat,
      navigateToConversation,
   }
}

export default useMessageSidebar
