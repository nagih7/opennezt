import callApi from 'api/callApi'

import {
    requestMatchingProjects,
    matchingProjectsSuccess,
    matchingProjectsFail,
    startRequestMatchingTalents,
    startRequestMatchingTalentsSuccess,
    startRequestMatchingTalentsFail,
} from '../../states/modules/artificialIntelligence'

export const matchingProjects = (linkedInUsername) => async (dispatch, getState) => {
    let path = `ai/matching/projects`
    if (linkedInUsername) {
        path += `?linkedin_username=${linkedInUsername}`
    }
    return callApi({
        method: 'get',
        apiPath: path,
        actionTypes: [requestMatchingProjects, matchingProjectsSuccess, matchingProjectsFail],
        variables: {},
        dispatch,
        getState,
    })
}

export const matchingTalents = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `ai/matching-talents`,
        actionTypes: [startRequestMatchingTalents, startRequestMatchingTalentsSuccess, startRequestMatchingTalentsFail],
        variables: {},
        dispatch,
        getState,
    })
}
