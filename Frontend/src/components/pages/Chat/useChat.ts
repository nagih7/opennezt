import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getConversation, getConversations } from '~/api/chat'
import { ROUTE_CONFIG } from '~/config/constants'
import { useSocket } from '~/contexts'
import { useAppSelector } from '~/store'
import { BaseChatProps, BaseConversationProps, ChatProps, MessageProps } from '~/types'
import { MESSAGE_TYPE } from '~/utils/constants'

const useChat = () => {
   const navigate = useNavigate()
   const { id: conversationId } = useParams<{ id: string }>()
   const socket = useSocket()
   // Store
   const { authUser } = useAppSelector((state) => state.auth)

   // Refs
   const messagesContainerRef = useRef<HTMLDivElement>(null)

   // State
   const [loading, setLoading] = useState<boolean>(false)
   const [allChat, setAllChat] = useState<[BaseChatProps] | any>([])
   const [directChat, setDirectChat] = useState<[BaseChatProps] | any>([])
   const [groupChat, setGroupChat] = useState<[BaseChatProps] | any>([])
   const [currentChat, setCurrentChat] = useState<ChatProps | null>(null)

   // Fetch all chats when component mounts
   useEffect(() => {
      const fetchChats = async () => {
         setLoading(true)
         try {
            const response = await getConversations()
            if (response.success) {
               const chats: BaseChatProps[] = response.data
               setAllChat(chats)
               setDirectChat(chats.filter((item: BaseConversationProps) => item.type === 'direct'))
               setGroupChat(chats.filter((item: BaseConversationProps) => item.type === 'group'))
            } else console.error('Failed to fetch conversations:', response.message)
         } catch (err) {
            console.error('Error fetching conversations:', err)
         } finally {
            setLoading(false)
         }
      }
      if (authUser) {
         fetchChats()
      }
   }, [])

   // Fetch current chat when conversationId changes
   useEffect(() => {
      if (!conversationId) return

      const updateCurrentChat = (chat: ChatProps) => {
         if (chat.type === 'direct') {
            setCurrentChat({
               ...chat,
               name: chat.members[0].name,
               logo: chat.members[0].avatar,
            })
         } else if (chat.type === 'group') {
            setCurrentChat({
               ...chat,
               name: chat.data?.project?.name,
               logo: chat.data?.project?.logo,
            })
         } else {
            // Fallback for unknown chat types
            setCurrentChat(chat)
         }
      }

      const fetchChat = async () => {
         setLoading(true)
         try {
            const response = await getConversation(conversationId)
            if (response.success) {
               const chat: ChatProps = response.data
               updateCurrentChat(chat)
            } else console.error('Failed to fetch conversation:', response.message)
         } catch (err) {
            console.error('Error fetching conversation:', err)
         } finally {
            setLoading(false)
         }
      }
      fetchChat()
   }, [conversationId])

   // Update messages in current chat when a new message is received
   useEffect(() => {
      if (!socket || !currentChat) return

      const handleNewMessage = (message: MessageProps) => {
         console.log('New message received:', message)
         if (message.conversation_id !== currentChat._id) return
         setCurrentChat((prevChat) => {
            if (!prevChat) return null
            return {
               ...prevChat,
               messages: [...(prevChat.messages || []), message],
            }
         })
      }

      socket.on(MESSAGE_TYPE, handleNewMessage)

      // Cleanup on unmount
      return () => {
         socket.off(MESSAGE_TYPE, handleNewMessage)
      }
   }, [socket, currentChat])

   const onSendMessage = useCallback(
      (message: MessageProps) => {
         if (!currentChat) return
         if (currentChat._id !== conversationId) return

         // Update current chat with new message
         setCurrentChat((prevChat) => {
            if (!prevChat) return null
            return {
               ...prevChat,
               messages: [...(prevChat.messages || []), message],
            }
         })
      },
      [currentChat, conversationId]
   )

   // Functions
   const navigateToConversation = useCallback(
      (conversation: ChatProps) => {
         if (!conversation) return
         if (conversation._id === conversationId) return
         navigate(ROUTE_CONFIG.USER.CONVERSATION.PREFIX + conversation._id)
         setCurrentChat(conversation)
      },
      [navigate, conversationId]
   )

   const navigateToPrefix = useCallback(() => {
      setCurrentChat(null)
      navigate(ROUTE_CONFIG.USER.CONVERSATION.PREFIX)
   }, [navigate])

   useEffect(() => {
      if (messagesContainerRef.current && currentChat?.messages?.length) {
         messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
      }
   }, [currentChat?.messages])

   // Adjust textarea height

   return {
      loading,
      authUser,
      allChat,
      directChat,
      groupChat,
      currentChat,
      messagesContainerRef,
      onSendMessage,
      navigateToConversation,
      navigateToPrefix,
   }
}

export default useChat
