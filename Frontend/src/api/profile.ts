import callReduxApi from './callReduxApi'

import {
   changePassword,
   changePasswordFail,
   changePasswordSuccess,
   updateInfoUser,
   updateInfoUserFail,
   updateInfoUserSuccess,
} from '../store/modules/profile'
import { Dispatch } from 'redux'
import callApi, { callOptimizedApi } from './callApi'

export const updateUser = (data: any) => async (dispatch: Dispatch, getState: () => any) => {
   return callReduxApi({
      method: 'put',
      apiPath: `/users`,
      actionTypes: [updateInfoUser, updateInfoUserSuccess, updateInfoUserFail],
      variables: data,
      dispatch,
      getState,
   })
}

export const handleChangePassword = (data: any) => async (dispatch: Dispatch, getState: () => any) => {
   return callReduxApi({
      method: 'patch',
      apiPath: `/auth/change-password`,
      actionTypes: [changePassword, changePasswordSuccess, changePasswordFail],
      variables: data,
      dispatch,
      getState,
   })
}

export const changeAvatar = (formData: FormData) => {
   return callApi({
      method: 'put',
      apiPath: `/users/avatar`,
      variables: formData,
   })
}

export const changeBackground = (formData: FormData) => {
   return callApi({
      method: 'put',
      apiPath: `/users/background`,
      variables: formData,
      headers: {},
   })
}

// export const changeBackground = (formData: FormData) => async (dispatch: Dispatch, getState: () => any) => {
//    return callReduxApi({
//       method: 'put',
//       apiPath: `/users/background`,
//       actionTypes: [changeBackgroundUser, changeBackgroundUserSuccess, changeBackgroundUserFail],
//       variables: formData,
//       dispatch,
//       getState,
//    })
// }

// ========== Profile ========== //
export const getProfile = () => {
   return callApi({
      method: 'get',
      apiPath: `/profile`,
   })
}

export const updateProfessionalProfile = (data: any) => {
   return callApi({
      method: 'put',
      apiPath: `/profile/professional`,
      variables: data,
   })
}

// ========== Education ========== //
export const createEducation = (data: any) => {
   return callApi({
      method: 'post',
      apiPath: `/profile/education`,
      variables: data,
   })
}

export const updateEducation = (data: any) => {
   return callApi({
      method: 'put',
      apiPath: `/profile/education`,
      variables: data,
   })
}

export const deleteEducation = (id: any) => {
   return callApi({
      method: 'delete',
      apiPath: `/profile/education/${id}`,
   })
}

// ========== Certification ========== //
export const createCertification = (data: any) => {
   return callApi({
      method: 'post',
      apiPath: `/profile/certification`,
      variables: data,
   })
}
export const updateCertification = (data: any) => {
   return callApi({
      method: 'put',
      apiPath: `/profile/certification`,
      variables: data,
   })
}

export const deleteCertification = (id: any) => {
   return callApi({
      method: 'delete',
      apiPath: `/profile/certification/${id}`,
   })
}

// ========== Organization ========== //
export const getOrganizationFramework = () => {
   return callApi({
      method: 'get',
      apiPath: `/profile/organizations`,
   })
}

export const updateSkillProfile = (data: any) => {
   return callApi({
      method: 'put',
      apiPath: `/profile/skills`,
      variables: data,
   })
}

// ========== Additional Info ========== //
export const createProfileAdditionalInfo = (data: any, action: string) => {
   return callApi({
      method: action === 'create' ? 'post' : 'put',
      apiPath: `/profile/additional-info`,
      variables: data,
   })
}

export const updateProfileAdditionalInfo = (data: any) => {
   return callApi({
      method: 'put',
      apiPath: `/profile/additional-info`,
      variables: data,
   })
}

export const deleteProfileAdditionalInfo = (id: any) => {
   return callApi({
      method: 'delete',
      apiPath: `/profile/additional-info/${id}`,
   })
}

// ========== GET [Friends] ========== //
export const getMyFriends = () => {
   return callApi({
      method: 'get',
      apiPath: `/profile/friends`,
   })
}

// ========== OPTIMIZED API CALLS ========== //
// Optimized version with caching for frequently accessed data
export const getProfileOptimized = () => {
   return callOptimizedApi({
      method: 'get',
      apiPath: `/profile`,
      cache: {
         ttl: 5 * 60 * 1000, // 5 minutes cache
         key: 'user-profile',
      },
      retry: {
         attempts: 3,
         delay: 1000,
      },
   })
}

export const getOrganizationFrameworkOptimized = () => {
   return callOptimizedApi({
      method: 'get',
      apiPath: `/profile/organizations`,
      cache: {
         ttl: 30 * 60 * 1000, // 30 minutes cache (framework data changes rarely)
         key: 'organization-framework',
      },
      retry: {
         attempts: 2,
         delay: 500,
      },
   })
}

export const getMyFriendsOptimized = () => {
   return callOptimizedApi({
      method: 'get',
      apiPath: `/profile/friends`,
      cache: {
         ttl: 2 * 60 * 1000, // 2 minutes cache
         key: 'user-friends',
      },
      retry: {
         attempts: 2,
         delay: 500,
      },
   })
}
