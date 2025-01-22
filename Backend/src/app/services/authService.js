import moment from 'moment'
import jwt from 'jsonwebtoken'
import {User} from '@/models'
import {cache, LOGIN_EXPIRE_IN, LINK_STATIC_URL, TOKEN_TYPE, VERIFY_EMAIL_EXPIRE_IN} from '@/configs'
import {FileUpload} from '@/utils/classes'
import {generateToken} from '@/utils/helpers'

export const tokenBlocklist = cache.create('t   oken-block-list')

export async function checkValidLogin({email, password}) {
    const user = await User.findOne({email: email})

    if (user) {
        const verified = user.verifyPassword(password)
        if (verified) {
            return user
        }
    }

    return false
}

export function authToken(user) {
    // Generate access token
    const accessToken = generateToken({user_id: user._id}, TOKEN_TYPE.AUTHORIZATION, LOGIN_EXPIRE_IN)

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

export async function register({avatar, ...requestBody}) {
    const user = await User.findOne({email: requestBody.email})
    if (user && user.is_active === false) {
        // update user info
        user.set(requestBody)
        await user.save()
        return generateToken({user_id: user._id}, TOKEN_TYPE.VERIFY_EMAIL, VERIFY_EMAIL_EXPIRE_IN)
    } else {
        const newUser = new User(requestBody)
        await newUser.save()

        return generateToken({user_id: newUser._id}, TOKEN_TYPE.VERIFY_EMAIL, VERIFY_EMAIL_EXPIRE_IN)
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
    const user = await User.findOne({_id: userId})
    user.avatar = user.avatar && LINK_STATIC_URL + user.avatar
    user.background = user.background && LINK_STATIC_URL + user.background
    return user
}

export async function updateProfile(currentUser, {name, email, phone, avatar}) {
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
