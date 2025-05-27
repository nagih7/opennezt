import callApi from '../callApi'
import callReduxApi, { callApiSimple } from 'api/callReduxApi'
import { AppDispatch } from '~/store'
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
} from '../../store/modules/project'

import { BaseApiResponse } from '~/types'

// ========== My projects ========== //
export const getListMyProjects = (dataFilter: any) => {
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
      variables: {},
   })
}

// ========== PROJECTS PARTICIPATED ========== //
export const getListProjectsParticipated = (dataFilter: any) => {
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
      variables: {},
   })
}

// ========== CREATE NEW PROJECT ========== //
export const createNewProject = (data: any) => async (dispatch: AppDispatch, getState: () => any) => {
   return callReduxApi({
      method: 'post',
      apiPath: 'projects/me/create',
      actionTypes: [requestCreateNewProject, createNewProjectSuccess, createNewProjectFail],
      variables: data,
      dispatch,
      getState,
   })
}

// ========== GET MY PROJECT DETAILS ========== //
export const getMyProjectDetails = (projectId: string) => async (dispatch: AppDispatch, getState: () => any) => {
   return callReduxApi({
      method: 'get',
      apiPath: `projects/me/${projectId}/details`,
      actionTypes: [requestGetMyProjectDetails, getMyProjectDetailsSuccess, getMyProjectDetailsFail],
      variables: {},
      dispatch,
      getState,
   })
}

// ========== UPDATE PROJECT BASIC ========== //
export const updateProjectBasic = (projectId: string, formRequest: any) => {
   return callApi({
      method: 'patch',
      apiPath: `projects/me/${projectId}/basic`,
      variables: formRequest,
   })
}

// ========== UPDATE PROJECT SECTORS ========== //
export const updateProjectSector = (projectId: string, formRequest: any) => {
   return callApi({
      method: 'patch',
      apiPath: `projects/me/${projectId}/sector`,
      variables: formRequest,
   })
}

// ========== UPDATE PROJECT REVENUES ========== //
export const updateProjectRevenue = (projectId: string, formRequest: any) => {
   return callApi({
      method: 'patch',
      apiPath: `projects/me/${projectId}/revenues`,
      variables: formRequest,
   })
}

// ========= UPDATE PROJECT FUNDING SOURCES ========== //
export const updateProjectFundingSources = (projectId: string, formRequest: any) => {
   return callApi({
      method: 'patch',
      apiPath: `projects/me/${projectId}/funding-sources`,
      variables: formRequest,
   })
}

// ========== UPDATE PROJECT ADDITIONAL INFOS ========== //
export const updateProjectAdditionalInfos = (projectId: string, formRequest: any) => {
   return callApi({
      method: 'patch',
      apiPath: `projects/me/${projectId}/additional-infos`,
      variables: formRequest,
   })
}

// ========== UPDATE PROJECT LOGO ========== //
export const updateProjectLogo = (projectId: string, formRequest: any) => {
   return callApi({
      method: 'patch',
      apiPath: `projects/me/${projectId}/logo`,
      variables: formRequest,
   })
}

// ========== UPDATE PROJECT BACKGROUND ========== //
export const updateProjectBackground = (projectId: string, formRequest: any) => {
   return callApi({
      method: 'patch',
      apiPath: `projects/me/${projectId}/background`,
      variables: formRequest,
   })
}

// ========== DELETE MY PROJECT ========== //
export const deleteMyProject = (projectId: string) => async (dispatch: AppDispatch, getState: () => any) => {
   return callReduxApi({
      method: 'delete',
      apiPath: `projects/${projectId}/delete`,
      actionTypes: [requestDeleteMyProject, deleteMyProjectSuccess, deleteMyProjectFail],
      variables: {},
      dispatch,
      getState,
   })
}

// ========== GET PROJECT DETAILS ========== //
export const getProjectDetails = (projectId: string) => async (dispatch: AppDispatch, getState: () => any) => {
   return callReduxApi({
      method: 'get',
      apiPath: `projects/${projectId}/details`,
      actionTypes: [requestGetProjectDetails, getProjectDetailsSuccess, getProjectDetailsFail],
      variables: {},
      dispatch,
      getState,
   })
}

// =========== SEEK PROJECTS =========== //
export const seekProjects = (dataFilter: any) => async (dispatch: AppDispatch, getState: () => any) => {
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

   return callReduxApi({
      method: 'get',
      apiPath: path,
      actionTypes: [requestSeekProjects, seekProjectsSuccess, seekProjectsFail],
      variables: {},
      dispatch,
      getState,
   })
}

// =========== APPLY TO JOIN PROJECT =========== //
export const applyToJoinProject =
   (projectId: string, formRequest: any) => async (dispatch: AppDispatch, getState: () => any) => {
      return callReduxApi({
         method: 'post',
         apiPath: `projects/${projectId}/apply`,
         actionTypes: [requestApplyToJoinProject, applyToJoinProjectSuccess, applyToJoinProjectFail],
         variables: formRequest,
         dispatch,
         getState,
      })
   }

// ========== PROJECT REQUIREMENT - ROLE ========== //
export const updateRoleRequirement =
   (projectId: string, formRequest: any) => async (dispatch: AppDispatch, getState: () => any) => {
      return callReduxApi({
         method: 'patch',
         apiPath: `projects/me/${projectId}/requirements/role`,
         actionTypes: [requestUpdateRoleRequirement, updateRoleRequirementSuccess, updateRoleRequirementFail],
         variables: formRequest,
         dispatch,
         getState,
      })
   }

// ========= PROJECT REQUIREMENT - SECTOR ========== //
export const updateSectorRequirement =
   (projectId: string, formRequest: any) => async (dispatch: AppDispatch, getState: () => any) => {
      return callReduxApi({
         method: 'patch',
         apiPath: `projects/me/${projectId}/requirements/sector`,
         actionTypes: [requestUpdateSectorRequirement, updateSectorRequirementSuccess, updateSectorRequirementFail],
         variables: formRequest,
         dispatch,
         getState,
      })
   }

// ========= PROJECT REQUIREMENT - SKILL ========== //
export const updateSkillRequirement =
   (projectId: string, formRequest: any) => async (dispatch: AppDispatch, getState: () => any) => {
      return callReduxApi({
         method: 'patch',
         apiPath: `projects/me/${projectId}/requirements/skill`,
         actionTypes: [requestUpdateSkillRequirement, updateSkillRequirementSuccess, updateSkillRequirementFail],
         variables: formRequest,
         dispatch,
         getState,
      })
   }

// ========== SEARCH PROJECT ========== //
export const searchMyProjects = (keySearch: string): Promise<BaseApiResponse> => {
   return callApi({
      method: 'get',
      apiPath: `projects/me/search?q=${keySearch}`,
   })
}

// ========== INVITE MEMBER ========== //
export const inviteMember = (projectId: string, formRequest: any): Promise<BaseApiResponse> => {
   return callApi({
      method: 'post',
      apiPath: `projects/me/${projectId}/invite`,
      variables: formRequest,
   })
}

// ========== GET LIST FRIEND INVITE ========== //
export const getListFriendInvite = async (projectId: string): Promise<BaseApiResponse> => {
   return callApi({
      method: 'get',
      apiPath: `projects/me/${projectId}/invitation`,
      variables: {},
   })
}
// ========== Cancel Invitation ========== //
export const cancelInvitation = async (projectId: string, userId: string): Promise<BaseApiResponse> => {
   return callApi({
      method: 'post',
      apiPath: `projects/me/${projectId}/invitation/cancel`,
      variables: { userId },
   })
}
