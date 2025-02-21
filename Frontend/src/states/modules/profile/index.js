import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const profileSlice = createSlice({
	name: "profile",
	initialState: {
		errorInfoUser: {
			name: "",
			email: "",
			phone: "",
		},
		errorChangePassword: {
			currentPassword: "",
			password: "",
			confirmPassword: "",
		},
		loadingBtnUpdateInfoUser: false,
		loadingBtnChangePassword: false,
		isLoadingBtnChangeAvatar: false,
		// ========== Profile ========== //
		profile: {},
		isLoadingGetProfile: false,
		isOpenAvatarPreview: false,
	},
	reducers: {
		setErrorInfoUser: (state, action) => ({
			...state,
			errorInfoUser: action.payload,
		}),
		setErrorChangePassword: (state, action) => ({
			...state,
			errorChangePassword: action.payload,
		}),
		updateInfoUser: (state) => ({
			...state,
			loadingBtnUpdateInfoUser: true,
		}),
		updateInfoUserSuccess: (state, action) => {
			message.success(action.payload.message);
			return {
				...state,
				loadingBtnUpdateInfoUser: false,
			};
		},
		updateInfoUserFail: (state, action) => {
			message.error(action.payload.message);
			return {
				...state,
				loadingBtnUpdateInfoUser: false,
			};
		},
		changePassword: (state) => ({
			...state,
			loadingBtnChangePassword: true,
		}),
		changePasswordSuccess: (state) => ({
			...state,
			loadingBtnChangePassword: false,
		}),
		changePasswordFail: (state) => ({
			...state,
			loadingBtnChangePassword: false,
		}),
		changeAvatarUser: (state) => ({
			...state,
			isLoadingBtnChangeAvatar: true,
		}),
		changeAvatarUserSuccess: (state) => {
			return {
				...state,
				isLoadingBtnChangeAvatar: false,
				isOpenAvatarPreview: false,
			};
		},
		changeAvatarUserFail: (state) => ({
			...state,
			isLoadingBtnChangeAvatar: false,
		}),
		changeBackgroundUser: (state) => ({
			...state,
		}),
		changeBackgroundUserSuccess: (state) => ({
			...state,
		}),
		changeBackgroundUserFail: (state) => ({
			...state,
		}),

		// ========== Profile ========== //
		requestGetProfile: (state) => ({
			...state,
			isLoadingGetProfile: true,
		}),
		requestGetProfileSuccess: (state, action) => {
			return {
				...state,
				profile: action.payload.data,
				isLoadingGetProfile: false,
			};
		},
		requestGetProfileFail: (state) => {
			return {
				...state,
				isLoadingGetProfile: false,
			};
		},
		setIsOpenAvatarPreview: (state, action) => ({
			...state,
			isOpenAvatarPreview: action.payload,
		}),
	},
});

export const {
	setErrorInfoUser,
	setErrorChangePassword,
	updateInfoUser,
	updateInfoUserSuccess,
	updateInfoUserFail,
	changePassword,
	changePasswordSuccess,
	changePasswordFail,
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
	setIsOpenAvatarPreview,
} = profileSlice.actions;

export default profileSlice.reducer;
