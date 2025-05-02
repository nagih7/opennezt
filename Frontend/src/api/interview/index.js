import callApi, { callApiSimple } from 'api/callApi'
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
} from 'states/modules/interview'

export const startInterview = (projectId) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `interview/start`,
        actionTypes: [requestStartInterview, startInterviewSuccess, startInterviewFail],
        variables: { project_id: projectId },
        dispatch,
        getState,
    })
}

// export const replyInterviewByMessage = (requestData) => async (dispatch, getState) => {
//     const message = {
//         ...requestData,
//         key: `temp-${Date.now()}`,
//     }
//     dispatch(addMessage(message))

//     // Regular text message
//     return callApi({
//         method: 'post',
//         apiPath: `interview/reply-message`,
//         actionTypes: [requestReplyInterview, replyInterviewSuccess, replyInterviewFail],
//         variables: message,
//         dispatch,
//         getState,
//     })
// }

export const replyInterview = (payload) => async (dispatch, getState) => {
    const { audio, interview } = payload
    // Create a FormData object to send the audio file
    const formData = new FormData()
    formData.append('audio', audio)
    formData.append('interview', JSON.stringify(interview))

    return callApi({
        method: 'post',
        apiPath: `interview/reply`,
        actionTypes: [requestReplyInterview, replyInterviewSuccess, replyInterviewFail],
        variables: formData,
        dispatch,
        getState,
    })
}

export const clearAIAudio = async (payload) => {
    return callApiSimple({
        method: 'delete',
        apiPath: `interview/audio`,
        variables: payload,
    })
}

export const closeInterview = (payload) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `interview/close`,
        actionTypes: [requestCloseInterview, closeInterviewSuccess, closeInterviewFail],
        variables: payload,
        dispatch,
        getState,
    })
}
