import callApi from 'api/callApi'
import {
    requestStartInterview,
    startInterviewSuccess,
    startInterviewFail,
    addMessage,
    requestReplyInterview,
    replyInterviewSuccess,
    replyInterviewFail,
} from 'states/modules/interview'

export const startInterview = (projectId) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `ai/interview/start`,
        actionTypes: [requestStartInterview, startInterviewSuccess, startInterviewFail],
        variables: { project_id: projectId },
        dispatch,
        getState,
    })
}

export const replyInterview = (requestData) => async (dispatch, getState) => {
    console.log('requestData', requestData)
    const message = {
        ...requestData,
        key: `temp-${Date.now()}`,
    }
    dispatch(addMessage(message))

    // // Handle audio file upload
    // if (requestData.audio && requestData.messageType === 'audio') {
    //     const formData = new FormData()
    //     formData.append('conversation_id', requestData.conversation_id)
    //     formData.append('audio', requestData.audio)
    //     formData.append('messageType', 'audio')

    //     return callApi({
    //         method: 'post',
    //         apiPath: `ai/interview/reply-audio`,
    //         actionTypes: [requestReplyInterview, replyInterviewSuccess, replyInterviewFail],
    //         variables: formData,
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },
    //         dispatch,
    //         getState,
    //     })
    // }

    // Regular text message
    return callApi({
        method: 'post',
        apiPath: `ai/interview/reply`,
        actionTypes: [requestReplyInterview, replyInterviewSuccess, replyInterviewFail],
        variables: message,
        dispatch,
        getState,
    })
}
