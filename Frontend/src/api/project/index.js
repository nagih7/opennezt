import callApi from 'api/callApi'
import {
    // ========== MY PROJECTS ========== //
    requestGetListMyProjects,
    getListMyProjectsSuccess,
    getListMyProjectsFail,
    // ========== PROJECTS PARTICIPATED ========== //
    requestGetListProjectsParticipated,
    getListProjectsParticipatedSuccess,
    getListProjectsParticipatedFail,
    // ========== CREATE NEW PROJECT ========== //
    requestCreateNewProject,
    createNewProjectSuccess,
    createNewProjectFail,
    // ========== MY PROJECT DETAILS ========== //
    requestGetMyProjectDetails,
    getMyProjectDetailsSuccess,
    getMyProjectDetailsFail,
    // ========= UPDATE PROJECT ========== //
    requestUpdateMyProject,
    updateMyProjectSuccess,
    updateMyProjectFail,
    // ========== DELETE MY PROJECT ========== //
    requestDeleteMyProject,
    deleteMyProjectSuccess,
    deleteMyProjectFail,
    // ========== SEEK PROJECTS ========== //
    requestSeekProjects,
    seekProjectsSuccess,
    seekProjectsFail,
    // ========== APPLY TO JOIN PROJECT ========== //
    requestApplyToJoinProject,
    applyToJoinProjectSuccess,
    applyToJoinProjectFail,
    // ========== PROJECT DETAILS ========== //
    requestGetProjectDetails,
    getProjectDetailsSuccess,
    getProjectDetailsFail,
    // ========== PROJECT REQUIREMENT - ROLE ========== //
    requestUpdateRoleRequirement,
    updateRoleRequirementSuccess,
    updateRoleRequirementFail,
    // ========= PROJECT REQUIREMENT - SECTOR ========== //
    requestUpdateSectorRequirement,
    updateSectorRequirementSuccess,
    updateSectorRequirementFail,
    // ========= PROJECT REQUIREMENT - SKILL ========== //
    requestUpdateSkillRequirement,
    updateSkillRequirementSuccess,
    updateSkillRequirementFail,
    // ========== SEARCH MY PROJECT ========== //
    requestSearchMyProjects,
    searchMyProjectsSuccess,
    searchMyProjectsFail,
    // ========== INVITE MEMBER ========== //
    requestInviteMember,
    inviteMemberSuccess,
    inviteMemberFail,
    // ========== BOOKMARK PROJECT ========== //
    requestBookmarkProject,
    bookmarkProjectSuccess,
    bookmarkProjectFail,
    // Thêm các action types cho việc lấy project bookmarks
    requestGetUserProjectBookmarks,
    getUserProjectBookmarksSuccess,
    getUserProjectBookmarksFail,
} from '../../states/modules/project'

// ========== My projects ========== //
export const getListMyProjects = (dataFilter) => async (dispatch, getState) => {
    let path = `projects/me?per_page=${dataFilter.perPage}&page=${dataFilter.currentPage}`
    if (dataFilter.keySearch) {
        path += `&q=${dataFilter.keySearch}`
    }
    if (dataFilter.status && dataFilter.status.length > 0) {
        path += `&status=${dataFilter.status}`
    }

    if (dataFilter.order && dataFilter.column) {
        path += `&order=${dataFilter.order}&column=${dataFilter.column}`
    }
    return callApi({
        method: 'get',
        apiPath: path,
        actionTypes: [requestGetListMyProjects, getListMyProjectsSuccess, getListMyProjectsFail],
        variables: {},
        dispatch,
        getState,
    })
}

// ========== PROJECTS PARTICIPATED ========== //
export const getListProjectsParticipated = (dataFilter) => async (dispatch, getState) => {
    let path = `projects/me/participated?per_page=${dataFilter.perPage}&page=${dataFilter.currentPage}`
    if (dataFilter.keySearch) {
        path += `&q=${dataFilter.keySearch}`
    }
    if (dataFilter.status && dataFilter.status.length > 0) {
        path += `&status=${dataFilter.status}`
    }
    if (dataFilter.order && dataFilter.column) {
        path += `&order=${dataFilter.order}&column=${dataFilter.column}`
    }
    return callApi({
        method: 'get',
        apiPath: path,
        actionTypes: [
            requestGetListProjectsParticipated,
            getListProjectsParticipatedSuccess,
            getListProjectsParticipatedFail,
        ],
        variables: {},
        dispatch,
        getState,
    })
}

// ========== CREATE NEW PROJECT ========== //
export const createNewProject = (data) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: 'projects/me/create',
        actionTypes: [requestCreateNewProject, createNewProjectSuccess, createNewProjectFail],
        variables: data,
        dispatch,
        getState,
    })
}

// ========== GET MY PROJECT DETAILS ========== //
export const getMyProjectDetails = (projectId) => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `projects/me/${projectId}/details`,
        actionTypes: [requestGetMyProjectDetails, getMyProjectDetailsSuccess, getMyProjectDetailsFail],
        variables: {},
        dispatch,
        getState,
    })
}

// ========== UPDATE PROJECT BASIC ========== //
export const updateProjectBasic = (projectId, formRequest) => async (dispatch, getState) => {
    return callApi({
        method: 'patch',
        apiPath: `projects/me/${projectId}/basic`,
        actionTypes: [requestUpdateMyProject, updateMyProjectSuccess, updateMyProjectFail],
        variables: formRequest,
        dispatch,
        getState,
    })
}

// ========== UPDATE PROJECT SECTORS ========== //
export const updateProjectSector = (projectId, formRequest) => async (dispatch, getState) => {
    return callApi({
        method: 'patch',
        apiPath: `projects/me/${projectId}/sector`,
        actionTypes: [requestUpdateMyProject, updateMyProjectSuccess, updateMyProjectFail],
        variables: formRequest,
        dispatch,
        getState,
    })
}

// ========== UPDATE PROJECT REVENUES ========== //
export const updateProjectRevenue = (projectId, formRequest) => async (dispatch, getState) => {
    return callApi({
        method: 'patch',
        apiPath: `projects/me/${projectId}/revenues`,
        actionTypes: [requestUpdateMyProject, updateMyProjectSuccess, updateMyProjectFail],
        variables: formRequest,
        dispatch,
        getState,
    })
}

// ========= UPDATE PROJECT FUNDING SOURCES ========== //
export const updateProjectFundingSources = (projectId, formRequest) => async (dispatch, getState) => {
    return callApi({
        method: 'patch',
        apiPath: `projects/me/${projectId}/funding-sources`,
        actionTypes: [requestUpdateMyProject, updateMyProjectSuccess, updateMyProjectFail],
        variables: formRequest,
        dispatch,
        getState,
    })
}

// ========== UPDATE PROJECT ADDITIONAL INFOS ========== //
export const updateProjectAdditionalInfos = (projectId, formRequest) => async (dispatch, getState) => {
    return callApi({
        method: 'patch',
        apiPath: `projects/me/${projectId}/additional-infos`,
        actionTypes: [requestUpdateMyProject, updateMyProjectSuccess, updateMyProjectFail],
        variables: formRequest,
        dispatch,
        getState,
    })
}

// ========== UPDATE PROJECT LOGO ========== //
export const updateProjectLogo = (projectId, formRequest) => async (dispatch, getState) => {
    return callApi({
        method: 'patch',
        apiPath: `projects/me/${projectId}/logo`,
        actionTypes: [requestUpdateMyProject, updateMyProjectSuccess, updateMyProjectFail],
        variables: formRequest,
        dispatch,
        getState,
    })
}

// ========== UPDATE PROJECT BACKGROUND ========== //
export const updateProjectBackground = (projectId, formRequest) => async (dispatch, getState) => {
    return callApi({
        method: 'patch',
        apiPath: `projects/me/${projectId}/background`,
        actionTypes: [requestUpdateMyProject, updateMyProjectSuccess, updateMyProjectFail],
        variables: formRequest,
        dispatch,
        getState,
    })
}

// ========== DELETE MY PROJECT ========== //
export const deleteMyProject = (projectId) => async (dispatch, getState) => {
    return callApi({
        method: 'delete',
        apiPath: `projects/${projectId}/delete`,
        actionTypes: [requestDeleteMyProject, deleteMyProjectSuccess, deleteMyProjectFail],
        variables: {},
        dispatch,
        getState,
    })
}

// ========== GET PROJECT DETAILS ========== //
export const getProjectDetails = (projectId) => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `projects/${projectId}/details`,
        actionTypes: [requestGetProjectDetails, getProjectDetailsSuccess, getProjectDetailsFail],
        variables: {},
        dispatch,
        getState,
    })
}

// =========== SEEK PROJECTS =========== //
export const seekProjects = (dataFilter) => async (dispatch, getState) => {
    let path = `projects/seek?page=${dataFilter.page}&per_page=${dataFilter.perPage}`

    if (dataFilter.keySearch) {
        path += `&q=${dataFilter.keySearch}`
    }
    if (dataFilter.industry) {
        path += `&industry=${dataFilter.industry}`
    }
    if (dataFilter.stage) {
        path += `&stage=${dataFilter.stage}`
    }

    return callApi({
        method: 'get',
        apiPath: path,
        actionTypes: [requestSeekProjects, seekProjectsSuccess, seekProjectsFail],
        variables: {},
        dispatch,
        getState,
    })
}

// =========== APPLY TO JOIN PROJECT =========== //
export const applyToJoinProject = (projectId, formRequest) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `projects/${projectId}/apply`,
        actionTypes: [requestApplyToJoinProject, applyToJoinProjectSuccess, applyToJoinProjectFail],
        variables: formRequest,
        dispatch,
        getState,
    })
}

// ========== PROJECT REQUIREMENT - ROLE ========== //
export const updateRoleRequirement = (projectId, formRequest) => async (dispatch, getState) => {
    return callApi({
        method: 'patch',
        apiPath: `projects/me/${projectId}/requirements/role`,
        actionTypes: [requestUpdateRoleRequirement, updateRoleRequirementSuccess, updateRoleRequirementFail],
        variables: formRequest,
        dispatch,
        getState,
    })
}

// ========= PROJECT REQUIREMENT - SECTOR ========== //
export const updateSectorRequirement = (projectId, formRequest) => async (dispatch, getState) => {
    return callApi({
        method: 'patch',
        apiPath: `projects/me/${projectId}/requirements/sector`,
        actionTypes: [requestUpdateSectorRequirement, updateSectorRequirementSuccess, updateSectorRequirementFail],
        variables: formRequest,
        dispatch,
        getState,
    })
}

// ========= PROJECT REQUIREMENT - SKILL ========== //
export const updateSkillRequirement = (projectId, formRequest) => async (dispatch, getState) => {
    return callApi({
        method: 'patch',
        apiPath: `projects/me/${projectId}/requirements/skill`,
        actionTypes: [requestUpdateSkillRequirement, updateSkillRequirementSuccess, updateSkillRequirementFail],
        variables: formRequest,
        dispatch,
        getState,
    })
}

// ========== SEARCH PROJECT ========== //
export const searchMyProjects = (keySearch) => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `projects/me/search?q=${keySearch}`,
        actionTypes: [requestSearchMyProjects, searchMyProjectsSuccess, searchMyProjectsFail],
        variables: {},
        dispatch,
        getState,
    })
}

// ========== INVITE MEMBER ========== //
export const inviteMember = (projectId, formRequest) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `projects/me/${projectId}/invite`,
        actionTypes: [requestInviteMember, inviteMemberSuccess, inviteMemberFail],
        variables: formRequest,
        dispatch,
        getState,
    })
}
export const bookmarkProject = (data) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `projects/bookmark`,
        actionTypes: [requestBookmarkProject, bookmarkProjectSuccess, bookmarkProjectFail],
        variables: data,
        dispatch,
        getState,
    });
};
export const getUserProjectBookmarks = (data) => async (dispatch, getState) => {

    return callApi({
        method: 'get',
        apiPath: `projects/bookmarks`,
        actionTypes: [
            requestGetUserProjectBookmarks,
            getUserProjectBookmarksSuccess,
            getUserProjectBookmarksFail
        ],
        variables: data,
        dispatch,
        getState,
    });
};