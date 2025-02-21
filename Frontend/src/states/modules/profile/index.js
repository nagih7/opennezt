import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { toaster } from "components/UI/toaster";
import { set } from "lodash";

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
		// ========== Education ========== //
		formDataEducation: {
			school: "",
			degree: "",
			field_of_study: "",
			start_date: "",
			end_date: "",
			grade: "",
		},
		isOpenModalCreateOrUpdateEducation: false,
		isLoadingCreateOrUpdateEducation: false,
		// ========== Certification ========== //
		formDataCertification: {
			name: "",
			organization: "",
			start_date: "",
			end_date: "",
			credential_id: "",
			credential_url: "",
		},
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

		// ========== Education ========== //
		requestCreateOrUpdateEducation: (state) => ({
			...state,
			isLoadingCreateOrUpdateEducation: true,
		}),
		createOrUpdateEducationSuccess: (state, action) => {
			toaster.create({
				title: `${action.payload.message}`,
				type: "success",
			});
			return {
				...state,
				isLoadingCreateOrUpdateEducation: false,
				isOpenModalCreateOrUpdateEducation: false,
				formDataEducation: {
					school: "",
					degree: "",
					field_of_study: "",
					start_date: "",
					end_date: "",
					grade: "",
				},
			};
		},
		createOrUpdateEducationFail: (state, action) => {
			toaster.create({
				title: `${Object.values(action.payload.data.detail)[0]}`,
				type: "error",
			});
			return {
				...state,
				isLoadingCreateOrUpdateEducation: false,
			};
		},
		setIsOpenModalCreateOrUpdateEducation: (state, action) => ({
			...state,
			isOpenModalCreateOrUpdateEducation: action.payload,
		}),
		setFormDataEducation: (state, action) => ({
			...state,
			formDataEducation: action.payload,
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
	// ========== Education ========== //
	requestCreateOrUpdateEducation,
	createOrUpdateEducationSuccess,
	createOrUpdateEducationFail,
	setIsOpenModalCreateOrUpdateEducation,
	setFormDataEducation,
} = profileSlice.actions;

export default profileSlice.reducer;
