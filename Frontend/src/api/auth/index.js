import callApi from '../callApi'
import {
    startRequestGetMe,
    startRequestGetMeFail,
    startRequestGetMeSuccess,
    startRequestLogin,
    startRequestLoginFail,
    startRequestLoginSuccess,
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
} from '../../states/modules/auth'

const baseUrlApi = process.env.REACT_APP_API_URL

export const login = (data) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `auth/login`,
        actionTypes: [startRequestLogin, startRequestLoginSuccess, startRequestLoginFail],
        variables: {
            email: data.email,
            password: data.password,
        },
        dispatch,
        getState,
    })
}

export const getMe = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `auth/me`,
        actionTypes: [startRequestGetMe, startRequestGetMeSuccess, startRequestGetMeFail],
        variables: {},
        dispatch,
        getState,
    })
}

export const getAuthRole = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `auth/role`,
        actionTypes: [requestGetAuthRole, getAuthRoleSuccess, getAuthRoleFail],
        variables: {},
        dispatch,
        getState,
    })
}

export const register = (data) => async (dispatch, getState) => {
    return callApi({
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

export const logout = () => async (dispatch, getState) => {
    // Clear local storage
    localStorage.removeItem('token')
    return callApi({
        method: 'post',
        apiPath: `auth/logout`,
        actionTypes: [startRequestLogout, startRequestLogoutSuccess, startRequestLogoutFail],
        variables: {},
        dispatch,
        getState,
    })
}

export const forgotPassword = (email) => async (dispatch, getState) => {
    return callApi({
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

export const resetPassword = (token, password) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `auth/reset-password/${token}`,
        actionTypes: [startRequestResetPassword, startRequestResetPasswordSuccess, startRequestResetPasswordFail],
        variables: { password },
        dispatch,
        getState,
    })
}

// Login with social
export const loginWithSocial = (social) => {
    window.location.href = `${baseUrlApi}/auth/${social}`
}
