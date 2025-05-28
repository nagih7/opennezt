import callApi from '../callApi'
import callReduxApi from '../callReduxApi'

import { AppDispatch } from '~/store'
import { BaseApiResponse, LoginPayload } from '~/types'

import {
   startRequestGetMe,
   startRequestGetMeFail,
   startRequestGetMeSuccess,
   startRequestRegister,
   startRequestRegisterSuccess,
   startRequestRegisterFail,
   startRequestLogout,
   startRequestLogoutSuccess,
   startRequestLogoutFail,
   startRequestForgotPassword,
   startRequestForgotPasswordSuccess,
   startRequestForgotPasswordFail,
   startRequestResetPassword,
   startRequestResetPasswordSuccess,
   startRequestResetPasswordFail,
   requestGetAuthRole,
   getAuthRoleSuccess,
   getAuthRoleFail,
} from '../../store/modules/auth'

const baseUrlApi = import.meta.env.VITE_API_URL

// export const getMe = () => async (dispatch: AppDispatch, getState: () => any) => {
//    return callReduxApi({
//       method: 'get',
//       apiPath: `auth/me`,
//       actionTypes: [startRequestGetMe, startRequestGetMeSuccess, startRequestGetMeFail],
//       variables: {},
//       dispatch,
//       getState,
//    })
// }

export const getAuthRole = () => async (dispatch: AppDispatch, getState: () => any) => {
   return callReduxApi({
      method: 'get',
      apiPath: `auth/role`,
      actionTypes: [requestGetAuthRole, getAuthRoleSuccess, getAuthRoleFail],
      variables: {},
      dispatch,
      getState,
   })
}

export const register = (data: any) => async (dispatch: AppDispatch, getState: () => any) => {
   return callReduxApi({
      method: 'post',
      apiPath: `auth/register`,
      actionTypes: [startRequestRegister, startRequestRegisterSuccess, startRequestRegisterFail],
      variables: {
         name: data.name,
         email: data.email,
         password: data.password,
         phone: data.phone,
         address: data.address,
      },
      dispatch,
      getState,
   })
}

export const logout = () => async (dispatch: AppDispatch, getState: () => any) => {
   localStorage.removeItem('token')
   return callReduxApi({
      method: 'post',
      apiPath: `auth/logout`,
      actionTypes: [startRequestLogout, startRequestLogoutSuccess, startRequestLogoutFail],
      variables: {},
      dispatch,
      getState,
   })
}

export const forgotPassword = (email: string) => async (dispatch: AppDispatch, getState: () => any) => {
   return callReduxApi({
      method: 'post',
      apiPath: `auth/forgot-password`,
      actionTypes: [startRequestForgotPassword, startRequestForgotPasswordSuccess, startRequestForgotPasswordFail],
      variables: {
         email: email,
      },
      dispatch,
      getState,
   })
}

export const resetPassword =
   (token: string, password: string) => async (dispatch: AppDispatch, getState: () => any) => {
      return callReduxApi({
         method: 'post',
         apiPath: `auth/reset-password/${token}`,
         actionTypes: [startRequestResetPassword, startRequestResetPasswordSuccess, startRequestResetPasswordFail],
         variables: { password },
         dispatch,
         getState,
      })
   }

// Login with social
export const loginWithSocial = (social: string) => {
   window.location.href = `${baseUrlApi}/auth/${social}`
}

export const login = (data: LoginPayload): Promise<BaseApiResponse> => {
   return callApi({
      method: 'post',
      apiPath: `auth/login`,
      variables: data,
   })
}

export const getMe = (): Promise<BaseApiResponse> => {
   return callApi({
      method: 'get',
      apiPath: `auth/me`,
   })
}

export const getAuthAdmin = (): Promise<BaseApiResponse> => {
   return callApi({
      method: 'get',
      apiPath: `auth/admin/me`,
   })
}
