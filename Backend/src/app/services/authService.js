import moment from 'moment'
import jwt from 'jsonwebtoken'
import { User, Role } from '@/models'
import {
    cache,
    LOGIN_EXPIRE_IN,
    LINK_STATIC_URL,
    TOKEN_TYPE,
    VERIFY_EMAIL_EXPIRE_IN,
    LINKEDIN_URL,
    LINKEDIN_RESPONSE_TYPE,
    LINKEDIN_CLIENT_ID,
    LINKEDIN_CLIENT_SECRET,
    LINKEDIN_REDIRECT_URI,
    LINKEDIN_SCOPE,
    LINKEDIN_STATE,
    GOOGLE_AUTH_URL,
    GOOGLE_CLIENT_ID,
    GOOGLE_REDIRECT_URI,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_TOKEN_ENDPOINT,
} from '@/configs'
import { FileUpload } from '@/utils/classes'
import { generateToken } from '@/utils/helpers'
import axios from 'axios'
import crypto from 'crypto'

const stateStore = new Map()

export const tokenBlocklist = cache.create('t   oken-block-list')

export async function checkValidLogin({ email, password }) {
    const user = await User.findOne({ email: email })

    if (user && user.password) {
        const verified = user.verifyPassword(password)
        if (verified) {
            return user
        }
    }

    return false
}

export function authToken(user) {
    // Generate access token
    const accessToken = generateToken({ user_id: user._id }, TOKEN_TYPE.AUTHORIZATION, LOGIN_EXPIRE_IN)

    // Decode access token to get expire time
    const decode = jwt.decode(accessToken)
    const expireIn = decode.exp - decode.iat

    // Return access token and expire time
    return {
        access_token: accessToken,
        expire_in: expireIn,
        auth_type: 'Bearer Token',
    }
}

export async function register({ ...requestBody }) {
    const user = await User.findOne({ email: requestBody.email })
    if (user && user.is_active === false) {
        // update user info
        user.set(requestBody)
        await user.save()
        return generateToken({ user_id: user._id }, TOKEN_TYPE.VERIFY_EMAIL, VERIFY_EMAIL_EXPIRE_IN)
    } else {
        const newUser = new User(requestBody)
        const userRole = await Role.findOne({ name: 'User' })
        newUser.role_id = userRole._id
        await newUser.save()

        return generateToken({ user_id: newUser._id }, TOKEN_TYPE.VERIFY_EMAIL, VERIFY_EMAIL_EXPIRE_IN)
    }
}

export async function verifyEmail(currentUser) {
    currentUser.is_active = true
    await currentUser.save()
}

export async function blockToken(token) {
    const decoded = jwt.decode(token)
    const expiresIn = decoded.exp
    const now = moment().unix()
    await tokenBlocklist.set(token, 1, expiresIn - now)
}

export async function profile(userId) {
    const user = await User.findOne({ _id: userId })
    user.avatar = user.avatar && LINK_STATIC_URL + user.avatar
    user.background = user.background && LINK_STATIC_URL + user.background
    return user
}

export async function getRole(role_id) {
    const role = await Role.findOne({ _id: role_id })
    return { role: role.name }
}

export async function updateProfile(currentUser, { name, email, phone, avatar }) {
    currentUser.name = name
    currentUser.email = email
    currentUser.phone = phone
    if (avatar instanceof FileUpload) {
        if (currentUser.avatar) {
            FileUpload.remove(currentUser.avatar)
        }
        avatar = avatar.save('images')
        currentUser.avatar = avatar
    }

    await currentUser.save()
}

// ================== Social Login ================== //
export async function loginWithLinkedIn() {
    const url =
        await `${LINKEDIN_URL}?response_type=${LINKEDIN_RESPONSE_TYPE}&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${LINKEDIN_REDIRECT_URI}&scope=${LINKEDIN_SCOPE}&state=${LINKEDIN_STATE}`
    return url
}

export async function loginWithLinkedInCallback(code) {
    const query = {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: LINKEDIN_REDIRECT_URI,
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET,
    }
    const response = await axios.post(
        `https://www.linkedin.com/oauth/v2/accessToken?grant_type=${query.grant_type}&code=${query.code}&redirect_uri=${query.redirect_uri}&client_id=${query.client_id}&client_secret=${query.client_secret}`
    )
    const accessToken = response.data.access_token
    const userInfo = await axios.get('https://api.linkedin.com/v2/userinfo', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })

    if (userInfo.data) {
        const user = await User.findOne({ email: userInfo.data.email })
        if (!user) {
            const newUser = new User({
                name: userInfo.data.name,
                email: userInfo.data.email,
                is_active: true,
            })
            const userRole = await Role.findOne({ name: 'User' })
            newUser.role_id = userRole._id
            await newUser.save()
            return newUser
        }

        return user
    }
}

// ========== Google Login ========== //
export async function loginWithGoogle(req) {
    try {
        // Tạo state ngẫu nhiên để bảo vệ chống CSRF
        const state = await crypto.randomBytes(16).toString('hex')

        // Lưu trạng thái với thời gian hết hạn (10 phút)
        stateStore.set(state, {
            timestamp: Date.now(),
            redirectUrl: req.query.redirect || '/', // URL chuyển hướng sau khi đăng nhập
        })

        // Tạo URL xác thực Google với các tham số cần thiết
        const authUrl = new URL(GOOGLE_AUTH_URL)
        authUrl.searchParams.append('client_id', GOOGLE_CLIENT_ID)
        authUrl.searchParams.append('redirect_uri', GOOGLE_REDIRECT_URI)
        authUrl.searchParams.append('response_type', 'code')
        authUrl.searchParams.append('scope', 'profile email')
        authUrl.searchParams.append('state', state)
        authUrl.searchParams.append('access_type', 'offline') // Để nhận refresh token
        authUrl.searchParams.append('prompt', 'consent') // Luôn yêu cầu người dùng đồng ý

        // Chuyển hướng người dùng đến trang đăng nhập Google
        return authUrl.toString()
    } catch (error) {
        console.error('Error initiating Google login:', error)
        throw new Error('Failed to initiate Google login')
    }
}

export async function loginWithGoogleCallback(requestQuery) {
    try {
        const { code, state } = requestQuery
        // Kiểm tra state để ngăn CSRF attack
        if (!stateStore.has(state)) {
            throw new Error('Invalid state parameter')
        }
        stateStore.delete(state) // Xóa state sau khi đã sử dụng
        // GỬI YÊU CẦU ĐẾN GOOGLE ĐỂ LẤY ACCESS TOKEN
        const tokenResponse = await axios.post(
            GOOGLE_TOKEN_ENDPOINT,
            new URLSearchParams({
                code,
                client_id: GOOGLE_CLIENT_ID,
                client_secret: GOOGLE_CLIENT_SECRET,
                redirect_uri: GOOGLE_REDIRECT_URI,
                grant_type: 'authorization_code',
            })
        )

        const { access_token } = tokenResponse.data
        // Sử dụng access token để lấy thông tin người dùng từ Google
        const userResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
        const userData = userResponse.data
        if (userData.email) {
            const user = await User.findOne({ email: userData.email })
            if (!user) {
                const newUser = new User({
                    name: userData.name,
                    email: userData.email,
                    is_active: true,
                })
                const userRole = await Role.findOne({ name: 'User' })
                newUser.role_id = userRole._id
                await newUser.save()
                return newUser
            }

            return user
        }
        // Kiểm tra xem người dùng đã tồn tại trong cơ sở dữ liệu hay chưa
    } catch (error) {
        console.error('Error during Google login callback:', error)
        throw new Error('Failed to complete Google login')
    }
}
