import callReduxApi from '../callReduxApi'

import {
   changePassword,
   changePasswordFail,
   changePasswordSuccess,
   updateInfoUser,
   updateInfoUserFail,
   updateInfoUserSuccess,
   changeBackgroundUser,
   changeBackgroundUserSuccess,
   changeBackgroundUserFail,
} from '../../store/modules/profile'
import { Dispatch } from 'redux'
import callApi from '../callApi'

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
      headers: {
         'Content-Type': 'multipart/form-data',
      },
   })
}

export const changeBackground = (formData: FormData) => async (dispatch: Dispatch, getState: () => any) => {
   return callReduxApi({
      method: 'put',
      apiPath: `/users/background`,
      actionTypes: [changeBackgroundUser, changeBackgroundUserSuccess, changeBackgroundUserFail],
      variables: formData,
      dispatch,
      getState,
   })
}

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
export const createProfileAdditionalInfo =
   (data: any, action: string) => {
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
