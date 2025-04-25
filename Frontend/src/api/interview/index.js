import callApi from 'api/callApi'
import { requestStartInterview, startInterviewSuccess, startInterviewFail, addMessage } from 'states/modules/interview'

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
    // Add user message immediately to the UI
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

    // Call API to get AI response
    const response = await callApi({
        method: 'post',
        apiPath: `ai/interview/reply`,
        variables: requestData,
        dispatch,
        getState,
    })

    // If API call was successful, add bot message to the UI
    if (response && !response.error) {
        dispatch(
            addMessage({
                _id: response.data.message._id,
                content: response.data.message.content,
                attachments: response.data.message.attachments,
                type: {
                    class: 'bot-message',
                    name: 'Bot message',
                },
            })
        )
    }

    return response
}
