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
    dispatch(
        addMessage({
            _id: `temp-${Date.now()}`,
            content: requestData.content,
            type: {
                class: 'user-message',
                name: 'User message',
            },
        })
    )

    return callApi({
        method: 'post',
        apiPath: `ai/interview/reply`,
        actionTypes: [requestReplyInterview, replyInterviewSuccess, replyInterviewFail],
        variables: requestData,
        dispatch,
        getState,
    })
}
