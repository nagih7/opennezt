import callReduxApi from '../callReduxApi'

import {
   changePassword,
   changePasswordFail,
   changePasswordSuccess,
   updateInfoUser,
   updateInfoUserFail,
   updateInfoUserSuccess,
   // changeAvatarUser,
   // changeAvatarUserSuccess,
   // changeAvatarUserFail,
   changeBackgroundUser,
   changeBackgroundUserSuccess,
   changeBackgroundUserFail,
   // ========== Profile ========== //
   requestGetProfile,
   requestGetProfileSuccess,
   requestGetProfileFail,
   requestUpdateProfessionalProfile,
   UpdateProfessionalProfileSuccess,
   UpdateProfessionalProfileFail,
   // ========== Education ========== //
   requestCreateOrUpdateEducation,
   createEducationSuccess,
   updateEducationSuccess,
   createOrUpdateEducationFail,
   // ========== Delete Education ========== //
   requestDeleleEducation,
   deleteEducationSuccess,
   deleteEducationFail,
   // ========== Certification ========== //
   requestCreateOrUpdateCertification,
   createCertificationSuccess,
   updateCertificationSuccess,
   createOrUpdateCertificationFail,
   requestDeleleCertification,
   deleteCertificationSuccess,
   deleteCertificationFail,
   // ========== Skills ========== //
   requestUpdateSkills,
   updateSkillsSuccess,
   updateSkillsFail,
   // ========== Organization ========== //
   requestgetOrganizationFramework,
   requestgetOrganizationFrameworkSuccess,
   requestgetOrganizationFrameworkFail,
   // ========== Additional Info ========== //
   requestCreateOrUpdateProfileAdditionalInfo,
   createProfileAdditionalInfoSuccess,
   updateProfileAdditionalInfoSuccess,
   createOrUpdateProfileAdditionalInfoFail,
   requestDeleleProfileAdditionalInfo,
   deleteProfileAdditionalInfoSuccess,
   deleteProfileAdditionalInfoFail,
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
         'Content-Type': 'multipart/form-data'
      }
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
export const getProfile = () => async (dispatch: Dispatch, getState: () => any) => {
   return callReduxApi({
      method: 'get',
      apiPath: `/profile`,
      actionTypes: [requestGetProfile, requestGetProfileSuccess, requestGetProfileFail],
      dispatch,
      getState,
   })
}

export const updateProfessionalProfile = (data: any) => async (dispatch: Dispatch, getState: () => any) => {
   return callReduxApi({
      method: 'put',
      apiPath: `/profile/professional`,
      actionTypes: [requestUpdateProfessionalProfile, UpdateProfessionalProfileSuccess, UpdateProfessionalProfileFail],
      variables: data,
      dispatch,
      getState,
   })
}

// ========== Education ========== //
export const createEducation = (data: any) => async (dispatch: Dispatch, getState: () => any) => {
   return callReduxApi({
      method: 'post',
      apiPath: `/profile/education`,
      actionTypes: [requestCreateOrUpdateEducation, createEducationSuccess, createOrUpdateEducationFail],
      variables: data,
      dispatch,
      getState,
   })
}
export const updateEducation = (data: any) => async (dispatch: Dispatch, getState: () => any) => {
   return callReduxApi({
      method: 'put',
      apiPath: `/profile/education`,
      actionTypes: [requestCreateOrUpdateEducation, updateEducationSuccess, createOrUpdateEducationFail],
      variables: data,
      dispatch,
      getState,
   })
}
export const deleteEducation = (id: any) => async (dispatch: Dispatch, getState: () => any) => {
   return callReduxApi({
      method: 'delete',
      apiPath: `/profile/education/${id}`,
      actionTypes: [requestDeleleEducation, deleteEducationSuccess, deleteEducationFail],
      dispatch,
      getState,
   })
}

// ========== Certification ========== //
export const createCertification = (data: any, action: any) => async (dispatch: Dispatch, getState: () => any) => {
   return callReduxApi({
      method: 'post',
      apiPath: `/profile/certification`,
      actionTypes: [requestCreateOrUpdateCertification, createCertificationSuccess, createOrUpdateCertificationFail],
      variables: data,
      dispatch,
      getState,
      action,
   })
}
export const updateCertification = (data: any) => async (dispatch: Dispatch, getState: () => any) => {
   return callReduxApi({
      method: 'put',
      apiPath: `/profile/certification`,
      actionTypes: [requestCreateOrUpdateCertification, updateCertificationSuccess, createOrUpdateCertificationFail],
      variables: data,
      dispatch,
      getState,
   })
}
export const deleteCertification = (id: any) => async (dispatch: Dispatch, getState: () => any) => {
   return callReduxApi({
      method: 'delete',
      apiPath: `/profile/certification/${id}`,
      actionTypes: [requestDeleleCertification, deleteCertificationSuccess, deleteCertificationFail],
      dispatch,
      getState,
   })
}

// ========== Organization ========== //
export const getOrganizationFramework = () => async (dispatch: Dispatch, getState: () => any) => {
   return callReduxApi({
      method: 'get',
      apiPath: `/profile/organizations`,
      actionTypes: [
         requestgetOrganizationFramework,
         requestgetOrganizationFrameworkSuccess,
         requestgetOrganizationFrameworkFail,
      ],
      dispatch,
      getState,
   })
}

export const updateSkillProfile = (data: any) => async (dispatch: Dispatch, getState: () => any) => {
   return callReduxApi({
      method: 'put',
      apiPath: `/profile/skills`,
      actionTypes: [requestUpdateSkills, updateSkillsSuccess, updateSkillsFail],
      variables: data,
      dispatch,
      getState,
   })
}

// ========== Additional Info ========== //
export const createProfileAdditionalInfo = (data: any, action: string) => async (dispatch: Dispatch, getState: () => any) => {
   return callReduxApi({
      method: action === 'create' ? 'post' : 'put',
      apiPath: `/profile/additional-info`,
      actionTypes: [
         requestCreateOrUpdateProfileAdditionalInfo,
         createProfileAdditionalInfoSuccess,
         createOrUpdateProfileAdditionalInfoFail,
      ],
      variables: data,
      dispatch,
      getState,
   })
}
export const updateProfileAdditionalInfo = (data: any) => async (dispatch: Dispatch, getState: () => any) => {
   return callReduxApi({
      method: 'put',
      apiPath: `/profile/additional-info`,
      actionTypes: [
         requestCreateOrUpdateProfileAdditionalInfo,
         updateProfileAdditionalInfoSuccess,
         createOrUpdateProfileAdditionalInfoFail,
      ],
      variables: data,
      dispatch,
      getState,
   })
}

export const deleteProfileAdditionalInfo = (id: any) => async (dispatch: Dispatch, getState: () => any) => {
   return callReduxApi({
      method: 'delete',
      apiPath: `/profile/additional-info/${id}`,
      actionTypes: [
         requestDeleleProfileAdditionalInfo,
         deleteProfileAdditionalInfoSuccess,
         deleteProfileAdditionalInfoFail,
      ],
      dispatch,
      getState,
   })
}

// ========== GET [Friends] ========== //
export const getMyFriends = () => {
   return callApi({
      method: 'get',
      apiPath: `/profile/friends`,
   })
}
