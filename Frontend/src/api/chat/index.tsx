import callApi from '../callApi'
import callSocket from '../callSocket'
import { BaseApiResponse, BaseSocketResponse } from '~/types'

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

// ========== SEND MESSAGE VIA SOCKET ========== //
export const sendMessage = async (
   conversation_id: string,
   content: string | undefined,
   socket: any
): Promise<BaseSocketResponse> => {
   return callSocket({
      event: 'message',
      payload: { conversation_id, content },
      socket,
   })
}
