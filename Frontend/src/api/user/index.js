import callApi from '../callApi'
import {
    // INDUSTRY
    requestgetIndustryFramework,
    getIndustryFrameworkSuccess,
    getIndustryFrameworkFail,
    // EXPERIENCE_LEVEL
    requestgetExperienceLevelFramwork,
    getExperienceLevelFramworkSuccess,
    getExperienceLevelFramworkFail,
    // CATEGORIES
    requestGetCategoryFramework,
    getCategoryFrameworkSuccess,
    getCategoryFrameworkFail,
    // SUB CATEGORIES
    requestGetSubCategoryFramework,
    getSubCategoryFrameworkSuccess,
    getSubCategoryFrameworkFail,
    // SKILLS
    requestGetSkillFramework,
    getSkillFrameworkSuccess,
    getSkillFrameworkFail,
    // STAGES
    requestGetStageFramework,
    getStageFrameworkSuccess,
    getStageFrameworkFail,
    // PROJECT ROLE
    requestGetProjectRoleFramework,
    getProjectRoleFrameworkSuccess,
    getProjectRoleFrameworkFail,
} from '../../states/modules/user'
import {
    // REQUEST ADD FRIEND
    requestSendFriendRequest,
    sendFriendRequestSuccess,
    sendFriendRequestFail,
} from '../../states/modules/talent'

// INDUSTRY
export const getIndustryFramework = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: 'users/industries',
        actionTypes: [requestgetIndustryFramework, getIndustryFrameworkSuccess, getIndustryFrameworkFail],
        variables: {},
        dispatch,
        getState,
    })
}

// EXPERIENCE LEVEL
export const getExperienceLevelFramwork = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: 'users/experience-levels',
        actionTypes: [
            requestgetExperienceLevelFramwork,
            getExperienceLevelFramworkSuccess,
            getExperienceLevelFramworkFail,
        ],
        variables: {},
        dispatch,
        getState,
    })
}

// CATEGORIES
export const getCategoryFramework = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: 'users/categories',
        actionTypes: [requestGetCategoryFramework, getCategoryFrameworkSuccess, getCategoryFrameworkFail],
        variables: {},
        dispatch,
        getState,
    })
}

// SUB CATEGORIES
export const getSubCategoryFramework = (categoryId) => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `users/categories/${categoryId}`,
        actionTypes: [requestGetSubCategoryFramework, getSubCategoryFrameworkSuccess, getSubCategoryFrameworkFail],
        variables: {},
        dispatch,
        getState,
    })
}

// SKILLS
export const getSkillFramework = (categoryId) => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `users/skills/${categoryId}`,
        actionTypes: [requestGetSkillFramework, getSkillFrameworkSuccess, getSkillFrameworkFail],
        variables: {},
        dispatch,
        getState,
    })
}

// STAGES
export const getStageFramework = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: 'users/stages',
        actionTypes: [requestGetStageFramework, getStageFrameworkSuccess, getStageFrameworkFail],
        variables: {},
        dispatch,
        getState,
    })
}

// PROJECT ROLE
export const getProjectRoleFramework = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: 'users/roles/project',
        actionTypes: [requestGetProjectRoleFramework, getProjectRoleFrameworkSuccess, getProjectRoleFrameworkFail],
        variables: {},
        dispatch,
        getState,
    })
}

// REQUEST ADD FRIEND
export const sendFriendRequest = (userId, action) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `users/${userId}/friend-request`,
        actionTypes: [requestSendFriendRequest, sendFriendRequestSuccess, sendFriendRequestFail],
        variables: { action },
        dispatch,
        getState,
    })
}
