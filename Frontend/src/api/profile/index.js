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
