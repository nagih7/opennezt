import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		isAuthSuccess: false,
		authorize: "user",
		authRegister: {},
		authUser: {},
		errorRegister: {
			name: "",
			email: "",
			phone: "",
			address: "",
			password: "",
			confirmPassword: "",
		},
		isLoadingGetMe: false,
		isLoadingBtnLogin: false,
		isRegisterSuccess: false,
		isLoadingRegister: false,
		isSuccessForgotPassword: false,
	},
	reducers: {
		startRequestLogin: (state) => ({
			...state,
			isLoadingBtnLogin: true,
		}),
		startRequestLoginSuccess: (state) => {
			message.success("Login success!");
			return {
				...state,
				isLoadingBtnLogin: false,
				isAuthSuccess: true,
			};
		},
		startRequestLoginFail: (state, action) => {
			message.error(action.payload.data.message);
			return {
				...state,
				isLoadingBtnLogin: false,
				isAuthSuccess: false,
			};
		},
		startRequestGetMe: (state) => ({
			...state,
			isLoadingGetMe: true,
		}),
		startRequestGetMeSuccess: (state, action) => ({
			...state,
			isAuthSuccess: true,
			isLoadingGetMe: false,
			authUser: action.payload.data,
			authorize: action.payload.data.role,
		}),
		startRequestGetMeFail: (state) => ({
			...state,
			isAuthSuccess: false,
			isLoadingGetMe: false,
			authUser: {},
			authorize: "user",
		}),
		startRequestRegister: (state) => ({
			...state,
			isLoadingRegister: true,
			isRegisterSuccess: false,
			authRegister: {},
		}),
		startRequestRegisterSuccess: (state, action) => ({
			...state,
			isLoadingRegister: false,
			isRegisterSuccess: true,
			authRegister: action.payload.data,
		}),
		startRequestRegisterFail: (state, action) => {
			const error =
				Object.values(action.payload.data.detail).length > 0 &&
				Object.values(action.payload.data.detail)[0];
			message.error(error);
			return {
				...state,
				isLoadingRegister: false,
				isRegisterSuccess: false,
				authRegister: {},
			};
		},
		resetRegister: (state) => ({
			...state,
			isRegisterSuccess: false,
		}),
		resetAuthRegister: (state) => ({
			...state,
			authRegister: {},
		}),
		startRequestLogout: (state) => ({
			...state,
		}),
		startRequestLogoutSuccess: (state) => ({
			...state,
			isAuthSuccess: false,
			authUser: {},
		}),
		startRequestLogoutFail: (state) => ({
			...state,
		}),
		startRequestForgotPassword: (state) => ({
			...state,
			isSuccessForgotPassword: false,
		}),
		startRequestForgotPasswordSuccess: (state, action) => {
			message.success(action.payload.message);
			return {
				...state,
				isSuccessForgotPassword: true,
			};
		},
		startRequestForgotPasswordFail: (state, action) => {
			message.error(action.payload.data.detail.email);
			return {
				...state,
				isSuccessForgotPassword: false,
			};
		},
	},
});

export const {
	startRequestLogin,
	startRequestLoginSuccess,
	startRequestLoginFail,
	startRequestGetMe,
	startRequestGetMeSuccess,
	startRequestGetMeFail,
	startRequestRegister,
	startRequestRegisterSuccess,
	startRequestRegisterFail,
	resetRegister,
	resetAuthRegister,
	startRequestLogout,
	startRequestLogoutSuccess,
	startRequestLogoutFail,
	startRequestForgotPassword,
	startRequestForgotPasswordSuccess,
	startRequestForgotPasswordFail,
} = authSlice.actions;

export default authSlice.reducer;
