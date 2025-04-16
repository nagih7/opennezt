import _ from 'lodash'
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { User } from '@/models'
import { tokenBlocklist } from '@/app/services/authService'
import { TOKEN_TYPE } from '@/configs'
import { abort, getToken, verifyToken } from '@/utils/helpers'

// Middleware to require authentication
async function requireAuthentication(req, res, next) {
    try {
        // Get token from request headers
        const token = getToken(req.headers)

        if (token) {
            // Check if the token is not in the blocklist
            const allowedToken = _.isUndefined(await tokenBlocklist.get(token))
            if (allowedToken) {
                const { user_id } = verifyToken(token, TOKEN_TYPE.AUTHORIZATION)
                const user = await User.findOne({ _id: user_id })
                if (user && user.is_active) {
                    req.currentUser = user
                    next()
                    return
                }
            }
        }
    } catch (error) {
        if (!(error instanceof JsonWebTokenError)) {
            throw error
        }
        if (error instanceof TokenExpiredError) {
            abort(401, 'Your session has expired. Please log in again!')
        }
    }
    abort(401)
}

export default requireAuthentication
