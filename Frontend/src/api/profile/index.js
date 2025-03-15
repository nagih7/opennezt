import callApi from "../callApi";

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
	createOrUpdateEducationSuccess,
	createOrUpdateEducationFail,
	// ========== Certification ========== //
	requestCreateOrUpdateCertification,
	createOrUpdateCertificationSuccess,
	createOrUpdateCertificationFail,
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
	createOrUpdateProfileAdditionalInfoSuccess,
	createOrUpdateProfileAdditionalInfoFail,
} from "../../states/modules/profile";

export const updateUser = (data) => async (dispatch, getState) => {
	return callApi({
		method: "put",
		apiPath: `/users`,
		actionTypes: [updateInfoUser, updateInfoUserSuccess, updateInfoUserFail],
		variables: data,
		dispatch,
		getState,
	});
};

export const handleChangePassword = (data) => async (dispatch, getState) => {
	return callApi({
		method: "patch",
		apiPath: `/auth/change-password`,
		actionTypes: [changePassword, changePasswordSuccess, changePasswordFail],
		variables: data,
		dispatch,
		getState,
	});
};

export const changeAvatar = (formData) => async (dispatch, getState) => {
	return callApi({
		method: "put",
		apiPath: `/users/avatar`,
		actionTypes: [
			changeAvatarUser,
			changeAvatarUserSuccess,
			changeAvatarUserFail,
		],
		variables: formData,
		dispatch,
		getState,
	});
};

export const changeBackground = (formData) => async (dispatch, getState) => {
	return callApi({
		method: "put",
		apiPath: `/users/background`,
		actionTypes: [
			changeBackgroundUser,
			changeBackgroundUserSuccess,
			changeBackgroundUserFail,
		],
		variables: formData,
		dispatch,
		getState,
	});
};

// ========== Profile ========== //
export const getProfile = () => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: `/profile`,
		actionTypes: [
			requestGetProfile,
			requestGetProfileSuccess,
			requestGetProfileFail,
		],
		dispatch,
		getState,
	});
};

export const updateProfessionalProfile =
	(data) => async (dispatch, getState) => {
		return callApi({
			method: "put",
			apiPath: `/profile/professional`,
			actionTypes: [
				requestUpdateProfessionalProfile,
				UpdateProfessionalProfileSuccess,
				UpdateProfessionalProfileFail,
			],
			variables: data,
			dispatch,
			getState,
		});
	};

// ========== Education ========== //
export const createOrUpdateEducation =
	(data, action) => async (dispatch, getState) => {
		const method = action === "create" ? "post" : "put";
		return callApi({
			method: method,
			apiPath: `/profile/education`,
			actionTypes: [
				requestCreateOrUpdateEducation,
				createOrUpdateEducationSuccess,
				createOrUpdateEducationFail,
			],
			variables: data,
			dispatch,
			getState,
			action,
		});
	};

// ========== Certification ========== //
export const createOrUpdateCertification =
	(data, action) => async (dispatch, getState) => {
		console.log(data, action);
		const method = action === "create" ? "post" : "put";
		return callApi({
			method: method,
			apiPath: `/profile/certification`,
			actionTypes: [
				requestCreateOrUpdateCertification,
				createOrUpdateCertificationSuccess,
				createOrUpdateCertificationFail,
			],
			variables: data,
			dispatch,
			getState,
			action,
		});
	};

// ========== Organization ========== //
export const getOrganizationFramework = () => async (dispatch, getState) => {
	return callApi({
		method: "get",
		apiPath: `/profile/organizations`,
		actionTypes: [
			requestgetOrganizationFramework,
			requestgetOrganizationFrameworkSuccess,
			requestgetOrganizationFrameworkFail,
		],
		dispatch,
		getState,
	});
};

export const updateSkillProfile = (data) => async (dispatch, getState) => {
	console.log(data);
	return callApi({
		method: "put",
		apiPath: `/profile/skills`,
		actionTypes: [requestUpdateSkills, updateSkillsSuccess, updateSkillsFail],
		variables: data,
		dispatch,
		getState,
	});
};

// ========== Additional Info ========== //
export const createOrUpdateProfileAdditionalInfo =
	(data, action) => async (dispatch, getState) => {
		return callApi({
			method: action === "create" ? "post" : "put",
			apiPath: `/profile/additional-info`,
			actionTypes: [
				requestCreateOrUpdateProfileAdditionalInfo,
				createOrUpdateProfileAdditionalInfoSuccess,
				createOrUpdateProfileAdditionalInfoFail,
			],
			variables: data,
			dispatch,
			getState,
		});
	};
