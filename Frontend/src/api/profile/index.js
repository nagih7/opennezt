import callApi from '../callApi'

import {
   changePassword,
   changePasswordFail,
   changePasswordSuccess,
   updateInfoUser,
   updateInfoUserFail,
   updateInfoUserSuccess,
   changeAvatarUser,
   changeAvatarUserSuccess,
   changeAvatarUserFail,
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
   // ========== FRIENDS ========= //
   requestGetMyFriends,
   getMyFriendsSuccess,
   getMyFriendsFail,
} from '../../store/modules/profile'

export const updateUser = (data) => async (dispatch, getState) => {
   return callApi({
      method: 'put',
      apiPath: `/users`,
      actionTypes: [updateInfoUser, updateInfoUserSuccess, updateInfoUserFail],
      variables: data,
      dispatch,
      getState,
   })
}

export const handleChangePassword = (data) => async (dispatch, getState) => {
   return callApi({
      method: 'patch',
      apiPath: `/auth/change-password`,
      actionTypes: [changePassword, changePasswordSuccess, changePasswordFail],
      variables: data,
      dispatch,
      getState,
   })
}

export const changeAvatar = (formData) => async (dispatch, getState) => {
   return callApi({
      method: 'put',
      apiPath: `/users/avatar`,
      actionTypes: [changeAvatarUser, changeAvatarUserSuccess, changeAvatarUserFail],
      variables: formData,
      dispatch,
      getState,
   })
}

export const changeBackground = (formData) => async (dispatch, getState) => {
   return callApi({
      method: 'put',
      apiPath: `/users/background`,
      actionTypes: [changeBackgroundUser, changeBackgroundUserSuccess, changeBackgroundUserFail],
      variables: formData,
      dispatch,
      getState,
   })
}

// ========== Profile ========== //
export const getProfile = () => async (dispatch, getState) => {
   return callApi({
      method: 'get',
      apiPath: `/profile`,
      actionTypes: [requestGetProfile, requestGetProfileSuccess, requestGetProfileFail],
      dispatch,
      getState,
   })
}

export const updateProfessionalProfile = (data) => async (dispatch, getState) => {
   return callApi({
      method: 'put',
      apiPath: `/profile/professional`,
      actionTypes: [requestUpdateProfessionalProfile, UpdateProfessionalProfileSuccess, UpdateProfessionalProfileFail],
      variables: data,
      dispatch,
      getState,
   })
}

// ========== Education ========== //
export const createEducation = (data) => async (dispatch, getState) => {
   return callApi({
      method: 'post',
      apiPath: `/profile/education`,
      actionTypes: [requestCreateOrUpdateEducation, createEducationSuccess, createOrUpdateEducationFail],
      variables: data,
      dispatch,
      getState,
   })
}
export const updateEducation = (data) => async (dispatch, getState) => {
   return callApi({
      method: 'put',
      apiPath: `/profile/education`,
      actionTypes: [requestCreateOrUpdateEducation, updateEducationSuccess, createOrUpdateEducationFail],
      variables: data,
      dispatch,
      getState,
   })
}
export const deleteEducation = (id) => async (dispatch, getState) => {
   return callApi({
      method: 'delete',
      apiPath: `/profile/education/${id}`,
      actionTypes: [requestDeleleEducation, deleteEducationSuccess, deleteEducationFail],
      dispatch,
      getState,
   })
}

// ========== Certification ========== //
export const createCertification = (data, action) => async (dispatch, getState) => {
   return callApi({
      method: 'post',
      apiPath: `/profile/certification`,
      actionTypes: [requestCreateOrUpdateCertification, createCertificationSuccess, createOrUpdateCertificationFail],
      variables: data,
      dispatch,
      getState,
      action,
   })
}
export const updateCertification = (data) => async (dispatch, getState) => {
   return callApi({
      method: 'put',
      apiPath: `/profile/certification`,
      actionTypes: [requestCreateOrUpdateCertification, updateCertificationSuccess, createOrUpdateCertificationFail],
      variables: data,
      dispatch,
      getState,
   })
}
export const deleteCertification = (id) => async (dispatch, getState) => {
   return callApi({
      method: 'delete',
      apiPath: `/profile/certification/${id}`,
      actionTypes: [requestDeleleCertification, deleteCertificationSuccess, deleteCertificationFail],
      dispatch,
      getState,
   })
}

// ========== Organization ========== //
export const getOrganizationFramework = () => async (dispatch, getState) => {
   return callApi({
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

export const updateSkillProfile = (data) => async (dispatch, getState) => {
   return callApi({
      method: 'put',
      apiPath: `/profile/skills`,
      actionTypes: [requestUpdateSkills, updateSkillsSuccess, updateSkillsFail],
      variables: data,
      dispatch,
      getState,
   })
}

// ========== Additional Info ========== //
export const createProfileAdditionalInfo = (data, action) => async (dispatch, getState) => {
   return callApi({
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
export const updateProfileAdditionalInfo = (data) => async (dispatch, getState) => {
   return callApi({
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
export const deleteProfileAdditionalInfo = (id) => async (dispatch, getState) => {
   return callApi({
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
export const getMyFriends = () => async (dispatch, getState) => {
   return callApi({
      method: 'get',
      apiPath: `/profile/friends`,
      actionTypes: [requestGetMyFriends, getMyFriendsSuccess, getMyFriendsFail],
      variables: {},
      dispatch,
      getState,
   })
}
