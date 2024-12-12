import { createSlice } from "@reduxjs/toolkit";

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
		loadingBtnChangeAvatar: false,
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
		updateInfoUserSuccess: (state) => ({
			...state,
			loadingBtnUpdateInfoUser: false,
		}),
		updateInfoUserFail: (state) => ({
			...state,
			loadingBtnUpdateInfoUser: false,
		}),
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
			// loadingBtnChangeAvatar: true,
		}),
		changeAvatarUserSuccess: (state) => ({
			...state,
			// loadingBtnChangeAvatar: false,
		}),
		changeAvatarUserFail: (state) => ({
			...state,
			// loadingBtnChangeAvatar: false,
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
		getIdByEmailUser: (state) => ({
            ...state,
           
        }),
        getIdByEmailUserSuccess: (state) => ({
            ...state,
          
        }),
        getIdByEmailUserFail: (state) => ({
            ...state,
        
        })
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
	getIdByEmailUser,
	getIdByEmailUserSuccess,
	getIdByEmailUserFail
} = profileSlice.actions;

export default profileSlice.reducer;
