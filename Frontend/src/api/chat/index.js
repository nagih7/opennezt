import callApi from '../callApi';
import {
    // =========== GET CONVERSATIONS =========== //
    requestGetConversations,
    getConversationsSuccess,
    getConversationsFail,
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
