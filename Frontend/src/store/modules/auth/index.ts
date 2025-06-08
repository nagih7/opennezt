import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, AuthAccount } from './types'

// Define the initial state with TypeScript typing
const initialState: AuthState = {
   isAuthSuccess: false,
   authorize: 'user',
   authRegister: {},
   resetPasswordSuccess: false,
   errorRegister: {
      name: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      confirmPassword: '',
   },
   isRegisterSuccess: false,
   isLoadingRegister: false,
   isSuccessForgotPassword: false,
   isLoadingResetPassword: false,

   // User auth
   isUserAuthenticated: false,
   authUser: null,
   userToken: null,

   // Admin auth
   isAdminAuthenticated: false,
   authAdmin: null,
   adminToken: null,

   // Loading states
   isLoadingUser: false,
   isLoadingAdmin: false,
}

// Create a typed slice for auth state
const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
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
      startRequestRegisterFail: (state: AuthState) => {
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
      startRequestForgotPasswordSuccess: (state: AuthState) => {
         return {
            ...state,
            isSuccessForgotPassword: true,
         }
      },
      startRequestForgotPasswordFail: (state: AuthState) => {
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
      startRequestResetPasswordSuccess: (state: AuthState) => {
         return {
            ...state,
            isLoadingResetPassword: false,
            resetPasswordSuccess: true,
         }
      },
      startRequestResetPasswordFail: (state: AuthState) => {
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
      loginWithSocialSuccess: (state: AuthState) => {
         return {
            ...state,
         }
      },
      loginWithSocialFail: (state: AuthState) => ({
         ...state,
      }),

      setAuthState: (state: AuthState, action: PayloadAction<Partial<AuthState>>) => ({ ...state, ...action.payload }),
   },
})

// Export actions and reducer
export const {
   setAuthState,
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
