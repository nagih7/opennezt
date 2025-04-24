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

        // Move the abort call inside the try block
        abort(401, 'Please login to continue.')
    } catch (error) {
        if (!(error instanceof JsonWebTokenError)) {
            // Pass the error to the error handler middleware
            return next(error)
        }
        if (error instanceof TokenExpiredError) {
            // Create a new error with status and message
            const err = new Error('Your session has expired. Please log in again!')
            err.status = 401
            return next(err)
        }
        // Default error for other JWT errors
        const err = new Error('Authentication failed')
        err.status = 401
        return next(err)
    }
}

export default requireAuthentication
