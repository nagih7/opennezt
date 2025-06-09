import callApi from './callApi'
import callReduxApi from 'api/callReduxApi'
import {
   requestStartInterview,
   startInterviewSuccess,
   startInterviewFail,
   requestReplyInterview,
   replyInterviewSuccess,
   replyInterviewFail,
   requestCloseInterview,
   closeInterviewSuccess,
   closeInterviewFail,
} from 'store/modules/interview'
import { AppDispatch } from '~/store'
import { BaseApiResponse } from '~/types'

export const startInterview = (projectId: string) => async (dispatch: AppDispatch, getState: any) => {
   return callReduxApi({
      method: 'post',
      apiPath: `interview/start`,
      actionTypes: [requestStartInterview, startInterviewSuccess, startInterviewFail],
      variables: { project_id: projectId },
      dispatch,
      getState,
   })
}

export const replyInterview = (payload: any) => async (dispatch: AppDispatch, getState: any) => {
   const { audio, interview } = payload
   // Create a FormData object to send the audio file
   const formData = new FormData()
   formData.append('audio', audio)
   formData.append('interview', JSON.stringify(interview))
   console.log('replyInterview formData:', formData)

   return callReduxApi({
      method: 'post',
      apiPath: `interview/reply`,
      actionTypes: [requestReplyInterview, replyInterviewSuccess, replyInterviewFail],
      variables: formData,
      dispatch,
      getState,
   })
}

export const closeInterview = (payload: any) => async (dispatch: AppDispatch, getState: any) => {
   return callReduxApi({
      method: 'post',
      apiPath: `interview/close`,
      actionTypes: [requestCloseInterview, closeInterviewSuccess, closeInterviewFail],
      variables: payload,
      dispatch,
      getState,
   })
}

export const fetchInterviewPracticeProjects = (): Promise<BaseApiResponse> => {
   return callApi({ method: 'get', apiPath: 'interview/practice-projects', variables: {} })
}
