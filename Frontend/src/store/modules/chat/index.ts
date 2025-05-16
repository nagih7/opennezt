import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChatState } from './types'

// Define the initial state with TypeScript typing
const initialState: ChatState = {
   // ========== CONVERSATIONS ========== //
   conversations: [],
   isLoadingGetConversations: false,
   // ========== CONVERSATION ========== //
   conversation: {},
   isLoadingGetConversation: false,
   // ========== MESSAGES ========== //
   isLoadingGetMessages: false,
}

const chatSlice = createSlice({
   name: 'chat',
   initialState,
   reducers: {
      // ========== GET CONVERSATIONS ========== //
      requestGetConversations: (state: ChatState) => ({
         ...state,
         isLoadingGetConversations: true,
      }),
      getConversationsSuccess: (state: ChatState, action: PayloadAction<any>) => ({
         ...state,
         conversations: action.payload.data,
         isLoadingGetConversations: false,
      }),
      getConversationsFail: (state: ChatState) => ({
         ...state,
         isLoadingGetConversations: false,
      }),
      // ========== GET CONVERSATION ========== //
      requestGetConversation: (state: ChatState) => ({
         ...state,
         isLoadingGetConversation: true,
      }),
      getConversationSuccess: (state: ChatState, action: PayloadAction<any>) => ({
         ...state,
         conversation: action.payload.data,
         isLoadingGetConversation: false,
      }),
      getConversationFail: (state: ChatState) => ({
         ...state,
         isLoadingGetConversation: false,
      }),
      // ========== GET MESSAGES ========== //
      requestGetMessages: (state: ChatState) => ({
         ...state,
         isLoadingGetMessages: true,
      }),
      getMessagesSuccess: (state: ChatState, action: PayloadAction<any>) => ({
         ...state,
         conversation: {
            ...state.conversation,
            messages: action.payload.data,
         },
         isLoadingGetMessages: false,
      }),
      getMessagesFail: (state: ChatState) => ({
         ...state,
         isLoadingGetMessages: false,
      }),
      // ========== SEND MESSAGE ========== //
      requestSendMessage: (state: ChatState) => ({
         ...state,
         isLoadingGetMessages: true,
      }),
      sendMessageSuccess: (state: ChatState, action: PayloadAction<any>) => ({
         ...state,
         conversation: {
            ...state.conversation,
            messages: [...state.conversation.messages, action.payload.data],
         },
         isLoadingGetMessages: false,
      }),
      sendMessageFail: (state: ChatState) => ({
         ...state,
         isLoadingGetMessages: false,
      }),
      // ========== SET MESSAGES ========== //
      setMessages: (state: ChatState, action: PayloadAction<any>) => {
         const { message } = action.payload
         if (state.conversation._id === message.conversation_id) {
            return {
               ...state,
               conversation: {
                  ...state.conversation,
                  messages: [...state.conversation.messages, message],
               },
            }
         }
      },
      closeChatBox: (state: ChatState) => ({
         ...state,
         conversation: {},
      }),
   },
})

export const {
   // ========== GET CONVERSATIONS ========== //
   requestGetConversations,
   getConversationsSuccess,
   getConversationsFail,
   // ========== GET CONVERSATION ========== //
   requestGetConversation,
   getConversationSuccess,
   getConversationFail,
   // ========== GET MESSAGES ========== //
   requestGetMessages,
   getMessagesSuccess,
   getMessagesFail,
   // ========== SEND MESSAGE ========== //
   requestSendMessage,
   sendMessageSuccess,
   sendMessageFail,
   // ========== SET MESSAGES ========== //
   setMessages,
   closeChatBox,
} = chatSlice.actions

export default chatSlice.reducer
