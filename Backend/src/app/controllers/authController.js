import {LINK_RESET_PASSWORD_URL, LINK_VERIFY_EMAIL_URL, TOKEN_TYPE, APP_URL_CLIENT} from '@/configs'
import {abort, generateToken, getToken} from '@/utils/helpers'
import * as authService from '../services/authService'
import * as userService from '../services/userService'

export async function login(req, res) {
    const validLogin = await authService.checkValidLogin(req.body)

    if (validLogin && !validLogin.is_active) {
        abort(403, 'Account is not active. Please verify by email.')
    } else if (validLogin && validLogin.is_active) {
        // Set cookie
        res
            // .cookie('access_token', authService.authToken(validLogin).access_token, {
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === 'production',
            //     sameSite: 'strict',
            // })
            .jsonify(authService.authToken(validLogin))
    } else {
        abort(400, 'Email or password is incorrect.')
    }
}

export async function register(req, res) {
    const token = await authService.register(req.body)
    await res.sendMail(req.body.email, 'Verify account', 'emails/verify-email', {
        name: req.body.name,
        // verify email link
        linkVerifyEmail: `${LINK_VERIFY_EMAIL_URL}/${encodeURIComponent(token)}`,
    })
    res.status(201).jsonify(req.body)
}

export async function verifyEmail(req, res) {
    await authService.verifyEmail(req.currentUser)
    res.redirect(`${APP_URL_CLIENT}`)
}

export async function logout(req, res) {
    const token = getToken(req.headers)
    await authService.blockToken(token)
    res.jsonify('Logout success.')
}

export async function me(req, res) {
    const result = await authService.profile(req.currentUser._id)
    res.jsonify(result)
}

export async function getRole(req, res) {
    const result = await authService.getRole(req.currentUser.role_id)
    res.jsonify(result)
}

export async function updateProfile(req, res) {
    await authService.updateProfile(req.currentUser, req.body)
    res.status(201).jsonify('Update profile success.')
}

export async function changePassword(req, res) {
    await userService.resetPassword(req.currentUser, req.body.password)
    res.status(201).jsonify('Change password success.')
}

export async function forgotPassword(req, res) {
    const token = generateToken({user_id: req.currentUser._id}, TOKEN_TYPE.FORGOT_PASSWORD, 600)
    await res.sendMail(req.currentUser.email, 'Forgot password', 'emails/forgot-password', {
        name: req.currentUser.name,
        linkResetPassword: `${LINK_RESET_PASSWORD_URL}?token=${encodeURIComponent(token)}`,
    })
    res.status(200).jsonify('Please check your email to reset password.')
}

export async function requestResetPassword(req, res) {
    if (req.currentUser) {
        await res.render('forms/reset-password', {token: req.params.token, email: req.currentUser.email})
    } else {
        abort(403, 'Token is invalid.')
    }
}

export async function resetPassword(req, res) {
    await userService.resetPassword(req.currentUser, req.body.password)
    await authService.blockToken(req.params.token)
    res.status(201).jsonify('Reset password success.')
}

// ================== Social Login ================== //
export async function loginWithLinkedIn(req, res) {
    const url = await authService.loginWithLinkedIn(req)
    res.redirect(url)
}

export async function loginWithLinkedInCallback(req, res) {
    const result = await authService.loginWithLinkedInCallback(req.query.code)
    const accessToken = authService.authToken(result).access_token
    res.redirect(`${APP_URL_CLIENT}/login?access_token=${accessToken}`)
}
