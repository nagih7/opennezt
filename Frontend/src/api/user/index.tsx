import { Dispatch } from 'redux'
import callReduxApi from '../callReduxApi'
import {
   // STAGES
   requestGetStageFramework,
   getStageFrameworkSuccess,
   getStageFrameworkFail,
   // PROJECT ROLE
   requestGetProjectRoleFramework,
   getProjectRoleFrameworkSuccess,
   getProjectRoleFrameworkFail,
} from '../../store/modules/user'
import {
   // REQUEST ADD FRIEND
   requestSendFriendRequest,
   sendFriendRequestSuccess,
   sendFriendRequestFail,
} from '../../store/modules/talent'
import callApi from '../callApi'

// INDUSTRY
export const getIndustryFramework = () => {
   return callApi({
      method: 'get',
      apiPath: 'users/industries',
   })
}

// EXPERIENCE LEVEL
export const getExperienceLevelFramwork = () => {
   return callApi({
      method: 'get',
      apiPath: 'users/experience-levels',
   })
}

// CATEGORIES
export const getCategoryFramework = (): any => {
   return callApi({
      method: 'get',
      apiPath: 'users/categories',
      variables: {},
   })
}

// SUB CATEGORIES
export const getSubCategoryFramework = (categoryId: any) => {
   return callApi({
      method: 'get',
      apiPath: `users/categories/${categoryId}`,
   })
}

// SKILLS
export const getSkillFramework = (categoryId: any) => {
   return callApi({
      method: 'get',
      apiPath: `users/skills/${categoryId}`,
   })
}

// STAGES
export const getStageFramework = () => async (dispatch: Dispatch, getState: any) => {
   return callReduxApi({
      method: 'get',
      apiPath: 'users/stages',
      actionTypes: [requestGetStageFramework, getStageFrameworkSuccess, getStageFrameworkFail],
      variables: {},
      dispatch,
      getState,
   })
}

// PROJECT ROLE
export const getProjectRoleFramework = () => async (dispatch: Dispatch, getState: any) => {
   return callReduxApi({
      method: 'get',
      apiPath: 'users/roles/project',
      actionTypes: [requestGetProjectRoleFramework, getProjectRoleFrameworkSuccess, getProjectRoleFrameworkFail],
      variables: {},
      dispatch,
      getState,
   })
}

// REQUEST ADD FRIEND
export const sendFriendRequest = (userId: any, action: any) => async (dispatch: Dispatch, getState: any) => {
   return callReduxApi({
      method: 'post',
      apiPath: `users/${userId}/friend-request`,
      actionTypes: [requestSendFriendRequest, sendFriendRequestSuccess, sendFriendRequestFail],
      variables: { action },
      dispatch,
      getState,
   })
}
