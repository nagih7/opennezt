import callApi from "../callApi";
import SeekProject from "api/seekprojectapi";

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
	getIdByEmailUser,
	getIdByEmailUserSuccess,
	getIdByEmailUserFail
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
export const getIdByEmail = (email) => async (dispatch, getState) => {
    console.log('Calling getIdByEmail with email:', email);
    
   return SeekProject({
	method: "post",
	apiPath: `/users/getid-byemail`,
	actionTypes: [getIdByEmailUser, getIdByEmailUserSuccess, getIdByEmailUserFail],
	variables: { email },
	dispatch,
	getState,
	});
};