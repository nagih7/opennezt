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

export const startInterview = (projectId) => async (dispatch, getState) => {
   return callReduxApi({
      method: 'post',
      apiPath: `interview/start`,
      actionTypes: [requestStartInterview, startInterviewSuccess, startInterviewFail],
      variables: { project_id: projectId },
      dispatch,
      getState,
   })
}

export const replyInterview = (payload) => async (dispatch, getState) => {
   const { audio, interview } = payload
   // Create a FormData object to send the audio file
   const formData = new FormData()
   formData.append('audio', audio)
   formData.append('interview', JSON.stringify(interview))

   return callReduxApi({
      method: 'post',
      apiPath: `interview/reply`,
      actionTypes: [requestReplyInterview, replyInterviewSuccess, replyInterviewFail],
      variables: formData,
      dispatch,
      getState,
   })
}

export const closeInterview = (payload) => async (dispatch, getState) => {
   return callReduxApi({
      method: 'post',
      apiPath: `interview/close`,
      actionTypes: [requestCloseInterview, closeInterviewSuccess, closeInterviewFail],
      variables: payload,
      dispatch,
      getState,
   })
}
