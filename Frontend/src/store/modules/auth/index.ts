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
      loginWithSocialSuccess: (state: AuthState) => {
         return {
            ...state,
         }
      },
      loginWithSocialFail: (state: AuthState) => ({
         ...state,
      }),

      setAuthState: (state: AuthState, action: PayloadAction<Partial<AuthState>>) => ({ ...state, ...action.payload }),

      setUserAuth: (state, action: PayloadAction<{ user: AuthAccount; token: string }>) => {
         state.isUserAuthenticated = true
         state.user = action.payload.user
         state.userToken = action.payload.token
         state.isLoadingUser = false
      },

      setAdminAuth: (state, action: PayloadAction<{ admin: AuthAccount; token: string }>) => {
         state.isAdminAuthenticated = true
         state.admin = action.payload.admin
         state.adminToken = action.payload.token
         state.isLoadingAdmin = false
      },

      clearUserAuth: (state) => {
         state.isUserAuthenticated = false
         state.user = null
         state.userToken = null
         state.isLoadingUser = false
      },

      clearAdminAuth: (state) => {
         state.isAdminAuthenticated = false
         state.admin = null
         state.adminToken = null
         state.isLoadingAdmin = false
      },

      setLoadingState: (state, action: PayloadAction<{ type: 'user' | 'admin'; loading: boolean }>) => {
         if (action.payload.type === 'user') {
            state.isLoadingUser = action.payload.loading
         } else {
            state.isLoadingAdmin = action.payload.loading
         }
      },

      resetAuthState: () => initialState,
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
