import { Dispatch } from 'redux'
import callReduxApi from 'api/callReduxApi'

import {
   // ========== PROJECT ACCESS ========== //
   requestAccessToProject,
   accessToProjectSuccess,
   accessToProjectFailure,
   // ========== MY PROJECT ACCESS ========== //
   requestGetMyProjectAccess,
   getMyProjectAccessSuccess,
   getMyProjectAccessFail,
   // ========== ACCESS TO MY PROJECTS ========== //
   requestGetAccessToMyProjects,
   getAccessToMyProjectsSuccess,
   getAccessToMyProjectsFail,
   // ========== TALENT ACCESS ========== //
   requestAccessToTalent,
   accessToTalentSuccess,
   accessToTalentFailure,
   // ========== GET ACTIVITIES ARTICLE ========== //
   requestGetActivities,
   getActivitiesSuccess,
   getActivitiesFail,
   // ========== GET PROJECT DETAILS ACTIVITIES ========== //
   requestGetProjectDetailsActivity,
   getProjectDetailsActivitySuccess,
   getProjectDetailsActivityFail,
} from 'store/modules/activity'
import callApi from './callApi'

// ========== PROJECT ACCESS ========== //
export const accessToProject = (projectId: any) => async (dispatch: Dispatch, getState: () => any) => {
   return callReduxApi({
      method: 'post',
      apiPath: `projects/${projectId}/access`,
      actionTypes: [requestAccessToProject, accessToProjectSuccess, accessToProjectFailure],
      variables: {},
      dispatch,
      getState,
   })
}

// ========== MY PROJECT ACCESS ========== //
export const getMyProjectAccess = () => async (dispatch: Dispatch, getState: () => any) => {
   return callReduxApi({
      method: 'get',
      apiPath: `projects/access/me`,
      actionTypes: [requestGetMyProjectAccess, getMyProjectAccessSuccess, getMyProjectAccessFail],
      variables: {},
      dispatch,
      getState,
   })
}

// ========== ACCESS TO MY PROJECTS ========== //
export const getAccessToMyProjects = () => async (dispatch: Dispatch, getState: () => any) => {
   return callReduxApi({
      method: 'get',
      apiPath: `projects/me/access`,
      actionTypes: [requestGetAccessToMyProjects, getAccessToMyProjectsSuccess, getAccessToMyProjectsFail],
      variables: {},
      dispatch,
      getState,
   })
}

// ========== TALENT ACCESS ========== //
export const accessToTalent = (profileId: any) => async (dispatch: Dispatch, getState: () => any) => {
   return callReduxApi({
      method: 'post',
      apiPath: `talents/${profileId}/access`,
      actionTypes: [requestAccessToTalent, accessToTalentSuccess, accessToTalentFailure],
      variables: {},
      dispatch,
      getState,
   })
}

// ========== ACCESS TO MY PROFILE ========== //
export const getAccessToMyProfile = () => {
   return callApi({
      method: 'get',
      apiPath: `profile/me/access`,
   })
}

// ========== GET ACTIVITIES ARTICLE ========== //
export const getActivitiesArticle =
   (options: any = {}) =>
   async (dispatch: Dispatch, getState: () => any) => {
      return callReduxApi({
         method: 'get',
         apiPath: `article/activities`,
         actionTypes: [requestGetActivities, getActivitiesSuccess, getActivitiesFail],
         variables: options,
         dispatch,
         getState,
      })
   }

// ========== POST ACTIVITIES CREATE ARTICLE ========== //
export const postActivityCreateArticle = async (articleId: any): Promise<any> => {
   return callApi({
      method: 'post',
      apiPath: `article/activity/create/${articleId}`,
      variables: {},
   })
}

// ========== POST ACTIVITIES UPDATE ARTICLE ========== //
export const postActivityUpdateArticle = async (articleId: any): Promise<any> => {
   return callApi({
      method: 'post',
      apiPath: `article/activity/update/${articleId}`,
      variables: {},
   })
}

// ========== POST ACTIVITIES SAVE ARTICLE ========== //
export const postActivitySaveArticle = async (articleId: any): Promise<any> => {
   return callApi({
      method: 'post',
      apiPath: `article/activity/save/${articleId}`,
      variables: {},
   })
}

// ========== DELETE ACTIVITIES SAVE ARTICLE ========== //
export const deleteActivitySaveArticle = async (avitityId: any): Promise<any> => {
   return callApi({
      method: 'delete',
      apiPath: `article/activity/save/${avitityId}`,
      variables: {},
   })
}

// ========== GET PROJECT DETAILS ACTIVITIES ========== //
export const getProjectDetailsActivities = (projectId: any) => async (dispatch: Dispatch, getState: () => any) => {
   return callReduxApi({
      method: 'get',
      apiPath: `projects/me/${projectId}/activities`,
      actionTypes: [requestGetProjectDetailsActivity, getProjectDetailsActivitySuccess, getProjectDetailsActivityFail],
      variables: {},
      dispatch,
      getState,
   })
}

// ========== POST PROJECT DETAILS ACTIVITIES [ BASIC ] ========== //
export const postProjectDetailsActivitiesBasic = async (projectId: any, formRequest: any): Promise<any> => {
   return callApi({
      method: 'post',
      apiPath: `projects/me/${projectId}/basic/activity`,
      variables: formRequest,
   })
}

// ========== POST PROJECT DETAILS ACTIVITIES [ SECTOR ] ========== //
export const postProjectDetailsActivitiesSector = async (projectId: any, formRequest: any): Promise<any> => {
   return callApi({
      method: 'post',
      apiPath: `projects/me/${projectId}/sector/activity`,
      variables: formRequest,
   })
}
// ========== POST PROJECT DETAILS ACTIVITIES [ REVENUE ] ========== //
export const postProjectDetailsActivitiesRevenue = async (projectId: any, formRequest: any): Promise<any> => {
   return callApi({
      method: 'post',
      apiPath: `projects/me/${projectId}/revenues/activity`,
      variables: formRequest,
   })
}
// ========== POST PROJECT DETAILS ACTIVITIES [ FUNDING SOURCE ] ========== //
export const postProjectDetailsActivitiesFundingSource = async (projectId: any, formRequest: any): Promise<any> => {
   return callApi({
      method: 'post',
      apiPath: `projects/me/${projectId}/funding-sources/activity`,
      variables: formRequest,
   })
}
// ========== POST PROJECT DETAILS ACTIVITIES [ ADDITIONAL INFO ] ========== //
export const postProjectDetailsActivitiesAdditionalInfo = async (projectId: any, formRequest: any): Promise<any> => {
   return callApi({
      method: 'post',
      apiPath: `projects/me/${projectId}/additional-infos/activity`,
      variables: formRequest,
   })
}
// ========== POST PROJECT DETAILS ACTIVITIES [ LOGO ] ========== //
export const postProjectDetailsActivitiesLogo = async (projectId: any, formRequest: any): Promise<any> => {
   return callApi({
      method: 'post',
      apiPath: `projects/me/${projectId}/logo/activity`,
      variables: formRequest,
   })
}
// ========== POST PROJECT DETAILS ACTIVITIES [ BACKGROUND ] ========== //
export const postProjectDetailsActivitiesBackground = async (projectId: any, formRequest: any): Promise<any> => {
   return callApi({
      method: 'post',
      apiPath: `projects/me/${projectId}/background/activity`,
      variables: formRequest,
   })
}
// ========== POST PROJECT DETAILS ACTIVITIES [ PROJECT REQUIREMENT ] ========== //
export const postProjectDetailsActivitiesProjectRequirement = async (projectId: any): Promise<any> => {
   return callApi({
      method: 'post',
      apiPath: `projects/me/${projectId}/requirements/activity`,
      variables: {},
   })
}
// ========== POST PROJECT DETAILS ACTIVITIES [ NEW MEMBER ] ========== //
export const postProjectDetailsActivitiesNewMember = async (invitationId: any): Promise<any> => {
   return callApi({
      method: 'post',
      apiPath: `projects/me/new-member/activity/${invitationId}`,
      variables: {},
   })
}
