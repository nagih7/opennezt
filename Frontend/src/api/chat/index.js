import callReduxApi from '../callReduxApi'
import {
   // =========== GET CONVERSATIONS =========== //
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
} from '../../store/modules/chat'
import callSocket from 'api/callSocket'

// =========== GET CONVERSATIONS =========== //
export const getConversations = () => async (dispatch, getState) => {
   return callReduxApi({
      method: 'get',
      apiPath: 'chat/conversations',
      actionTypes: [requestGetConversations, getConversationsSuccess, getConversationsFail],
      variables: {},
      dispatch,
      getState,
   })
}

// ========== GET CONVERSATION ========== //
export const getConversation = (conversation_id) => async (dispatch, getState) => {
   return callReduxApi({
      method: 'get',
      apiPath: `chat/conversations/${conversation_id}`,
      actionTypes: [requestGetConversation, getConversationSuccess, getConversationFail],
      variables: {},
      dispatch,
      getState,
   })
}

// ========== GET MESSAGES ========== //
export const getMessages = (conversation_id) => async (dispatch, getState) => {
   return callReduxApi({
      method: 'get',
      apiPath: `chat/conversations/${conversation_id}/messages`,
      actionTypes: [requestGetMessages, getMessagesSuccess, getMessagesFail],
      variables: {},
      dispatch,
      getState,
   })
}

// ========== SEND MESSAGE ========== //
// export const sendMessage = (conversation_id, content) => async (dispatch, getState) => {
//     return callReduxApi({
//         method: 'post',
//         apiPath: `chat/conversations/${conversation_id}/messages`,
//         actionTypes: [requestSendMessage, sendMessageSuccess, sendMessageFail],
//         variables: { content },
//         dispatch,
//         getState,
//     });
// };

// ========== SEND MESSAGE ========== //
export const sendMessage = (conversation_id, content, socket) => async (dispatch, getState) => {
   return callSocket({
      event: 'message',
      actionTypes: [requestSendMessage, sendMessageSuccess, sendMessageFail],
      payload: { conversation_id, content },
      dispatch,
      getState,
      socket,
   })
}
