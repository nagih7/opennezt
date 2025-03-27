import callApi from '../callApi';
import {
    // =========== GET CONVERSATIONS =========== //
    requestGetConversations,
    getConversationsSuccess,
    getConversationsFail,
    // ========== GET CONVERSATION ========== //
    requestGetConversation,
    getConversationSuccess,
    getConversationFail,
    startRequestGetChatHistory,
    startRequestGetChatHistorySuccess,
    startRequestGetChatHistoryFail,
} from '../../states/modules/chat';

// =========== GET CONVERSATIONS =========== //
export const getConversations = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: 'chat/conversations',
        actionTypes: [requestGetConversations, getConversationsSuccess, getConversationsFail],
        variables: {},
        dispatch,
        getState,
    });
};

// ========== GET CONVERSATION ========== //
export const getConversation = (conversation_id) => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `chat/conversations/${conversation_id}`,
        actionTypes: [requestGetConversation, getConversationSuccess, getConversationFail],
        variables: {},
        dispatch,
        getState,
    });
};

export const getChatHistory = (conversation_id) => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `chat/chat-history/${conversation_id}`,
        actionTypes: [
            startRequestGetChatHistory,
            startRequestGetChatHistorySuccess,
            startRequestGetChatHistoryFail,
        ],
        variables: {},
        dispatch,
        getState,
    });
};
