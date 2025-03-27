import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chatList: [],
        chatHistory: {},
        loadingGetChatList: false,
        loadingGetChatHistory: false,
        loadingRequestChatInvitation: false,
        // ========== CONVERSATION ========== //
        conversations: [],
        isLoadingGetConversations: false,
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

        startRequestGetChatHistory: (state) => ({
            ...state,
            loadingGetChatHistory: true,
        }),
        startRequestGetChatHistorySuccess: (state, action) => {
            const { data } = action.payload;
            let i = 0;
            while (i < state.conversations.length + 1) {
                if (i === state.conversations.length) {
                    return {
                        ...state,
                        conversations: [
                            ...state.conversations,
                            {
                                conversation: data.conversation,
                                messages: data.messages,
                            },
                        ],
                        loadingGetChatHistory: false,
                    };
                }
                if (state.conversations[i].conversation._id === data.conversation._id) {
                    return {
                        ...state,
                        conversations: [
                            ...state.conversations.slice(0, i),
                            {
                                conversation: data.conversation,
                                messages: data.messages,
                            },
                            ...state.conversations.slice(i + 1),
                        ],
                        loadingGetChatHistory: false,
                    };
                }

                i++;
            }
        },

        startRequestGetChatHistoryFail: (state) => ({
            ...state,
            loadingGetChatHistory: false,
            chatHistory: {},
        }),
        closeChatBox: (state, action) => {
            return {
                ...state,
                conversations: state.conversations.filter(
                    (conversation) => conversation.conversation._id !== action.payload
                ),
            };
        },
        comfirmSendMessage: (state, action) => {
            const { user_id, conversation_id, content, created_at, metadata, updated_at, _id } =
                action.payload;
            let i = 0;
            while (i < state.conversations.length + 1) {
                if (state.conversations[i].conversation._id === conversation_id) {
                    return {
                        ...state,
                        conversations: [
                            ...state.conversations.slice(0, i),
                            {
                                ...state.conversations[i],
                                messages: [
                                    ...state.conversations[i].messages,
                                    {
                                        user_id,
                                        conversation_id,
                                        content,
                                        created_at,
                                        metadata,
                                        updated_at,
                                        _id,
                                    },
                                ],
                            },
                            ...state.conversations.slice(i + 1),
                        ],
                    };
                }
                i++;
            }
        },
    },
});

export const {
    // ========== GET CONVERSATIONS ========== //
    requestGetConversations,
    getConversationsSuccess,
    getConversationsFail,

    startRequestGetChatHistory,
    startRequestGetChatHistorySuccess,
    startRequestGetChatHistoryFail,
    closeChatBox,
    comfirmSendMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
