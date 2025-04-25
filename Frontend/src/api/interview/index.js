import callApi from 'api/callApi'
import { requestStartInterview, startInterviewSuccess, startInterviewFail } from 'states/modules/interview'

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
