import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getConversation, getConversations } from '~/api/chat'
import { ROUTE_CONFIG } from '~/config/constants'
import { useAppSelector } from '~/store'
import { BaseChatProps, BaseConversationProps, ChatProps } from '~/types'

const useChat = () => {
   const navigate = useNavigate()
   const { id: projectId } = useParams<{ id: string }>()
   // Store
   const { authUser } = useAppSelector((state) => state.auth)

   // Refs
   const messagesContainerRef = useRef<HTMLDivElement>(null)

   // State
   const [error, setError] = useState<string | null>(null)
   const [loading, setLoading] = useState<boolean>(false)
   const [allChat, setAllChat] = useState<[BaseChatProps] | any>([])
   const [directChat, setDirectChat] = useState<[BaseChatProps] | any>([])
   const [groupChat, setGroupChat] = useState<[BaseChatProps] | any>([])
   const [currentChat, setCurrentChat] = useState<ChatProps | null>(null)

   // Fetch all chats when component mounts
   useEffect(() => {
      const fetchChats = async () => {
         setLoading(true)
         setError(null)
         try {
            const response = await getConversations()
            if (response.success) {
               const chats: BaseChatProps[] = response.data
               setAllChat(chats)
               setDirectChat(chats.filter((item: BaseConversationProps) => item.type === 'direct'))
               setGroupChat(chats.filter((item: BaseConversationProps) => item.type === 'group'))
            } else {
               setError(response.message || 'Failed to fetch conversations')
            }
         } catch (err) {
            console.error('Error fetching conversations:', err)
            setError('An error occurred while fetching conversations')
         } finally {
            setLoading(false)
         }
      }
      if (authUser) {
         fetchChats()
      }
   }, []) // Fetch current chat when projectId changes
   useEffect(() => {
      if (!projectId) return

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
         setError(null)
         try {
            const response = await getConversation(projectId)
            if (response.success) {
               const chat: ChatProps = response.data
               updateCurrentChat(chat)
            } else {
               setError(response.message || 'Failed to fetch conversation')
            }
         } catch (err) {
            setError('An error occurred while fetching the conversation')
         } finally {
            setLoading(false)
         }
      }
      fetchChat()
   }, [projectId])

   // Get messages when currentChat changes
   // useEffect(() => {
   //    if (!currentChat) return
   //    const fetchMessages = async () => {
   //       setLoading(true)
   //       setError(null)
   //       try {
   //          const response = await getMessages(currentChat._id)
   //          if (response.success) {
   //             const messages: MessageProps[] = response.data
   //             setCurrentChat({
   //                ...currentChat,
   //                messages: messages,
   //             })
   //          } else {
   //             setError(response.message || 'Failed to fetch messages')
   //          }
   //       } catch (err) {
   //          setError('An error occurred while fetching messages')
   //       } finally {
   //          setLoading(false)
   //       }
   //    }
   //    fetchMessages()
   // }, [currentChat?._id])

   // Functions
   const navigateToConversation = useCallback(
      (conversation: ChatProps) => {
         if (!conversation) return
         if (conversation._id === projectId) return
         navigate(ROUTE_CONFIG.USER.CONVERSATION.PREFIX + conversation._id)
         setCurrentChat(conversation)
      },
      [navigate, projectId]
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
      navigateToConversation,
      navigateToPrefix,
   }
}

export default useChat
