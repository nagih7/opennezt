import callApi from '../callApi'
import callSocket from 'api/callSocket'
import { BaseApiResponse } from '~/types'

// =========== GET CONVERSATIONS =========== //
export const getConversations = (): Promise<BaseApiResponse> => {
   return callApi({
      method: 'get',
      apiPath: 'chat/conversations',
      variables: {},
   })
}

// ========== GET CONVERSATION ========== //
export const getConversation = (conversation_id: string): Promise<BaseApiResponse> => {
   return callApi({
      method: 'get',
      apiPath: `chat/conversations/${conversation_id}`,
      variables: {},
   })
}

// ========== GET MESSAGES ========== //
export const getMessages = (conversation_id: string): Promise<BaseApiResponse> => {
   return callApi({
      method: 'get',
      apiPath: `chat/conversations/${conversation_id}/messages`,
      variables: {},
   })
}

// ========== SEND MESSAGE ========== //
// export const sendMessage =
//    (conversation_id: string, content: string | undefined, socket: any) =>
//    async (dispatch: AppDispatch, getState: any) => {
//       return callSocket({
//          event: 'message',
//          actionTypes: [requestSendMessage, sendMessageSuccess, sendMessageFail],
//          payload: { conversation_id, content },
//          dispatch,
//          getState,
//          socket,
//       })
//    }

export const sendMessage = (conversation_id: string, content: string | undefined): Promise<BaseApiResponse> => {
   return callApi({
      method: 'post',
      apiPath: `chat/conversations/${conversation_id}/messages`,
      variables: { content },
   })
}
