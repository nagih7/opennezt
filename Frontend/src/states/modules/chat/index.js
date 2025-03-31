import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        // ========== CONVERSATIONS ========== //
        conversations: [],
        isLoadingGetConversations: false,
        // ========== CONVERSATION ========== //
        conversation: {},
        isLoadingGetConversation: false,
        // ========== MESSAGES ========== //
        isLoadingGetMessages: false,
    },
    reducers: {
        // ========== GET CONVERSATIONS ========== //
        requestGetConversations: (state) => ({
            ...state,
            isLoadingGetConversations: true,
        }),
        getConversationsSuccess: (state, action) => ({
            ...state,
            conversations: action.payload.data,
            isLoadingGetConversations: false,
        }),
        getConversationsFail: (state) => ({
            ...state,
            isLoadingGetConversations: false,
        }),
        // ========== GET CONVERSATION ========== //
        requestGetConversation: (state) => ({
            ...state,
            isLoadingGetConversation: true,
        }),
        getConversationSuccess: (state, action) => ({
            ...state,
            conversation: {
                messages: [],
                ...action.payload.data,
            },
            isLoadingGetConversation: false,
        }),
        getConversationFail: (state) => ({
            ...state,
            isLoadingGetConversation: false,
        }),
        // ========== GET MESSAGES ========== //
        requestGetMessages: (state) => ({
            ...state,
            isLoadingGetMessages: true,
        }),
        getMessagesSuccess: (state, action) => ({
            ...state,
            conversation: {
                ...state.conversation,
                messages: action.payload.data,
            },
            isLoadingGetMessages: false,
        }),
        getMessagesFail: (state) => ({
            ...state,
            isLoadingGetMessages: false,
        }),

        // ========== SEND MESSAGE ========== //
        requestSendMessage: (state) => ({
            ...state,
            loadingSendMessage: true,
        }),
        sendMessageSuccess: (state, action) => ({
            ...state,
            conversation: {
                ...state.conversation,
                messages: [...state.conversation.messages, action.payload.data],
            },
            loadingSendMessage: false,
        }),
        sendMessageFail: (state) => ({
            ...state,
            loadingSendMessage: false,
        }),
        // ========== SET MESSAGES ========== //
        setMessages: (state, action) => {
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
