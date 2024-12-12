import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		isAuthSuccess: false,
		authorize: "user",
		authUser: {},
		errorRegister: {
			name: "",
			email: "",
			phone: "",
			address: "",
			password: "",
			confirmPassword: "",
		},
		isLoadingBtnLogin: false,
		isLoadingBtnRegister: false,
		isSuccessForgotPassword: false,
	},
	reducers: {
		startRequestLogin: (state) => ({
			...state,
			isLoadingBtnLogin: true,
		}),
		startRequestLoginSuccess: (state) => {
			message.success("Đăng nhập thành công!");
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
		}),
		startRequestGetMeSuccess: (state, action) => ({
			...state,
			isAuthSuccess: true,
			authUser: action.payload.data,
			authorize: action.payload.data.role,
		}),
		startRequestGetMeFail: (state) => ({
			...state,
			isAuthSuccess: false,
			authUser: {},
			authorize: "user",
		}),
		startRequestRegister: (state) => ({
			...state,
			isLoadingBtnRegister: true,
		}),
		startRequestRegisterSuccess: (state) => ({
			...state,
			isLoadingBtnRegister: false,
		}),
		startRequestRegisterFail: (state) => ({
			...state,
			isLoadingBtnRegister: false,
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
	startRequestLogout,
	startRequestLogoutSuccess,
	startRequestLogoutFail,
	startRequestForgotPassword,
	startRequestForgotPasswordSuccess,
	startRequestForgotPasswordFail,
} = authSlice.actions;

export default authSlice.reducer;
