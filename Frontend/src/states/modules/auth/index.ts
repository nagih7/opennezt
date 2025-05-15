import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from './types'

// Define the initial state with TypeScript typing
const initialState: AuthState = {
   isAuthSuccess: false,
   authorize: 'user',
   authRegister: {},
   authUser: null,
   authRole: '',
   resetPasswordSuccess: false,
   errorRegister: {
      name: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      confirmPassword: '',
   },
   isLoadingGetMe: false,
   isLoadingBtnLogin: false,
   isLoadingGetAuthRole: false,
   isRegisterSuccess: false,
   isLoadingRegister: false,
   isSuccessForgotPassword: false,
   isLoadingResetPassword: false,
}

// Create a typed slice for auth state
const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      startRequestLogin: (state: AuthState) => ({
         ...state,
         isLoadingBtnLogin: true,
      }),
      startRequestLoginSuccess: (state: AuthState) => {
         return {
            ...state,
            isLoadingBtnLogin: false,
            isAuthSuccess: true,
         }
      },
      startRequestLoginFail: (state: AuthState, action: PayloadAction<any>) => {
         return {
            ...state,
            isLoadingBtnLogin: false,
            isAuthSuccess: false,
         }
      },
      startRequestGetMe: (state: AuthState) => ({
         ...state,
         isLoadingGetMe: true,
      }),
      startRequestGetMeSuccess: (state: AuthState, action: PayloadAction<any>) => ({
         ...state,
         isAuthSuccess: true,
         isLoadingGetMe: false,
         authUser: action.payload.data,
         authorize: action.payload.data.role,
      }),
      startRequestGetMeFail: (state: AuthState) => ({
         ...state,
         isAuthSuccess: false,
         isLoadingGetMe: false,
         authUser: {},
         authorize: 'user',
      }),
      requestGetAuthRole: (state: AuthState) => ({
         ...state,
         authRole: '',
         isLoadingGetAuthRole: true,
      }),
      getAuthRoleSuccess: (state: AuthState, action: PayloadAction<any>) => ({
         ...state,
         authRole: action.payload.data.role,
         isLoadingGetAuthRole: false,
      }),
      getAuthRoleFail: (state: AuthState, action: PayloadAction<any>) => ({
         ...state,
         authRole: '',
         isLoadingGetAuthRole: false,
      }),
      startRequestRegister: (state: AuthState) => ({
         ...state,
         isLoadingRegister: true,
         isRegisterSuccess: false,
         authRegister: {},
      }),
      startRequestRegisterSuccess: (state: AuthState, action: PayloadAction<any>) => ({
         ...state,
         isLoadingRegister: false,
         isRegisterSuccess: true,
         authRegister: action.payload.data,
      }),
      startRequestRegisterFail: (state: AuthState, action: PayloadAction<any>) => {
         return {
            ...state,
            isLoadingRegister: false,
            isRegisterSuccess: false,
            authRegister: {},
         }
      },
      resetRegister: (state: AuthState) => ({
         ...state,
         isRegisterSuccess: false,
      }),
      resetAuthRegister: (state: AuthState) => ({
         ...state,
         authRegister: null as unknown as Record<string, any>,
      }),
      startRequestLogout: (state: AuthState) => ({
         ...state,
      }),
      startRequestLogoutSuccess: (state: AuthState) => ({
         ...state,
         isAuthSuccess: false,
         authUser: null,
      }),
      startRequestLogoutFail: (state: AuthState) => ({
         ...state,
      }),
      startRequestForgotPassword: (state: AuthState) => ({
         ...state,
         isSuccessForgotPassword: false,
      }),
      startRequestForgotPasswordSuccess: (state: AuthState, action: PayloadAction<any>) => {
         return {
            ...state,
            isSuccessForgotPassword: true,
         }
      },
      startRequestForgotPasswordFail: (state: AuthState, action: PayloadAction<any>) => {
         return {
            ...state,
            isSuccessForgotPassword: false,
         }
      },
      resetForgotPassword: (state: AuthState) => ({
         ...state,
         isSuccessForgotPassword: false,
      }),
      startRequestResetPassword: (state: AuthState) => ({
         ...state,
         isLoadingResetPassword: true,
      }),
      startRequestResetPasswordSuccess: (state: AuthState, action: PayloadAction<any>) => {
         return {
            ...state,
            isLoadingResetPassword: false,
            resetPasswordSuccess: true,
         }
      },
      startRequestResetPasswordFail: (state: AuthState, action: PayloadAction<any>) => {
         return {
            ...state,
            isLoadingResetPassword: false,
            resetPasswordSuccess: false,
         }
      },

      // ================== Login with social ================== //
      requestLoginWithSocial: (state: AuthState) => ({
         ...state,
      }),
      loginWithSocialSuccess: (state: AuthState, action: PayloadAction<any>) => {
         return {
            ...state,
         }
      },
      loginWithSocialFail: (state: AuthState) => ({
         ...state,
      }),
   },
})

// Export actions and reducer
export const {
   startRequestLogin,
   startRequestLoginSuccess,
   startRequestLoginFail,
   startRequestGetMe,
   startRequestGetMeSuccess,
   startRequestGetMeFail,
   requestGetAuthRole,
   getAuthRoleSuccess,
   getAuthRoleFail,
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
   resetForgotPassword,
   startRequestResetPassword,
   startRequestResetPasswordSuccess,
   startRequestResetPasswordFail,
   requestLoginWithSocial,
   loginWithSocialSuccess,
   loginWithSocialFail,
} = authSlice.actions

export default authSlice.reducer
