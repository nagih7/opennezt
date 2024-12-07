import _ from 'lodash'
import {tokenBlocklist} from '../services/authService'
import {JsonWebTokenError, TokenExpiredError} from 'jsonwebtoken'
import {abort, verifyToken} from '@/utils/helpers'
import {TOKEN_TYPE} from '@/configs'
import {User} from '@/models'
export async function verifyForgotPasswordToken(req, res, next) {
    const token = req.params.token
    try {
        const allowedToken = _.isUndefined(await tokenBlocklist.get(token))
        if (allowedToken) {
            const {user_id} = verifyToken(token, TOKEN_TYPE.FORGOT_PASSWORD)
            const user = await User.findOne({_id: user_id})
            if (user && user.is_active) {
                req.currentUser = user
                next()
                return
            }
        }
        abort(410, 'Liên kết đã hết hạn.')
    } catch (error) {
        if (!(error instanceof JsonWebTokenError)) {
            throw error
        }
        if (error instanceof TokenExpiredError) {
            abort(410, 'Liên kết đã hết hạn.')
        }
    }
    abort(403, 'Liên kết không hợp lệ.')
}

export async function verifyEmailToken(req, res, next) {
    const token = req.params.token
    try {
        const {user_id} = verifyToken(token, TOKEN_TYPE.VERIFY_EMAIL)
        const user = await User.findOne({_id: user_id})
        if (user) {
            req.currentUser = user
            next()
            return
        }
        abort(410, 'Liên kết đã hết hạn.')
    } catch (error) {
        if (!(error instanceof JsonWebTokenError)) {
            throw error
        }
        if (error instanceof TokenExpiredError) {
            abort(410, 'Liên kết đã hết hạn.')
        }
    }
    abort(403, 'Liên kết không hợp lệ.')
}
export async function authenticateWebSocket(ws, req, next) {}
export async function authMiddleware(req, res, next) {
    if (!req.headers['authorization']) {
        return res.status(401).json({message: 'Không có token'})
    }
    const token2 = req.headers['authorization']
   
    const token=token2.split(' ')[1]
    // console.log(token)
    if (!token) {
        return res.status(401).json({ message: 'Không có token' })
    }
    
    try {
        const decoded = verifyToken(token, TOKEN_TYPE.AUTHORIZATION)
        
        const user = await User.findOne({ _id: decoded.user_id })
        if (!user) {
            return res.status(401).json({ message: 'User không tồn tại' })
        }
        req.user = user
        next()
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            return res.status(401).json({ message: 'Token không hợp lệ' })
        }
        next(error)
    }
}