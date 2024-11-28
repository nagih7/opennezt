import {LINK_RESET_PASSWORD_URL, LINK_VERIFY_EMAIL_URL, TOKEN_TYPE} from '@/configs'
import {abort, generateToken, getToken} from '@/utils/helpers'
import * as authService from '../services/authService'
import * as userService from '../services/userService'

export async function login(req, res) {
    const validLogin = await authService.checkValidLogin(req.body)

    if (validLogin && !validLogin.is_active) {
        abort(403, 'Tài khoản chưa được xác thực.')
    } else if (validLogin && validLogin.is_active) {
        // Set cookie
        res.cookie('access_token', authService.authToken(validLogin).access_token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        }).jsonify(authService.authToken(validLogin))
    } else {
        abort(400, 'Email hoặc mật khẩu không đúng.')
    }
}

export async function register(req, res) {
    const token = await authService.register(req.body)
    await res.sendMail(req.body.email, 'Xác thực tài khoản', 'emails/verify-email', {
        name: req.body.name,
        linkVerifyEmail: `${LINK_VERIFY_EMAIL_URL}/${encodeURIComponent(token)}`,
    })
    res.status(201).jsonify('Đăng ký thành công. Vui lòng kiểm tra email để xác thực tài khoản.')
}

export async function verifyEmail(req, res) {
    await authService.verifyEmail(req.currentUser)
    res.jsonify('Xác thực tài khoản thành công.')
}

export async function logout(req, res) {
    const token = getToken(req.headers)
    await authService.blockToken(token)
    res.jsonify('Đăng xuất thành công.')
}

export async function me(req, res) {
    const result = await authService.profile(req.currentUser._id)
    res.jsonify(result)
}

export async function updateProfile(req, res) {
    await authService.updateProfile(req.currentUser, req.body)
    res.status(201).jsonify('Cập nhật thông tin cá nhân thành công.')
}

export async function changePassword(req, res) {
    await userService.resetPassword(req.currentUser, req.body.new_password)
    res.status(201).jsonify('Cập nhật mật khẩu thành công.')
}

export async function forgotPassword(req, res) {
    const token = generateToken({user_id: req.currentUser._id}, TOKEN_TYPE.FORGOT_PASSWORD, 600)
    await res.sendMail(req.currentUser.email, 'Quên mật khẩu', 'emails/forgot-password', {
        name: req.currentUser.name,
        linkResetPassword: `${LINK_RESET_PASSWORD_URL}/${encodeURIComponent(token)}`,
    })
    res.status(200).jsonify('Yêu cầu lấy lại mật khẩu thành công! Vui lòng kiểm tra email của bạn.')
}

export async function requestResetPassword(req, res) {
    if (req.currentUser) {
        await res.render('forms/reset-password', {token: req.params.token, email: req.currentUser.email})
    } else {
        abort(403, 'Liên kết không hợp lệ.')
    }
}

export async function resetPassword(req, res) {
    await userService.resetPassword(req.currentUser, req.body.new_password)
    await authService.blockToken(req.params.token)
    res.status(201).jsonify('Cập nhật mật khẩu thành công.')
}
