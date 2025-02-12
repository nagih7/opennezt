// import _ from 'lodash'
import {JsonWebTokenError, TokenExpiredError} from 'jsonwebtoken'
import {abort, getToken, verifyToken} from '@/utils/helpers'
import {Role, User} from '@/models'
import _ from 'lodash'
import {tokenBlocklist} from '@/app/services/authService'
import {TOKEN_TYPE} from '@/configs'

async function superAdminAuthentication(req, res, next) {
    try {
        // Get token from request headers
        const token = getToken(req.headers)

        if (token) {
            // Check if the token is not in the blocklist
            const allowedToken = _.isUndefined(await tokenBlocklist.get(token))
            if (allowedToken) {
                const {user_id} = verifyToken(token, TOKEN_TYPE.AUTHORIZATION)
                const user = await User.findOne({_id: user_id})
                if (user && user.is_active) {
                    const role_id = user.role_id
                    const role = await Role.findOne({_id: role_id})
                    if (role && role.name === 'Super Admin') {
                        req.currentUser = user
                        next()
                        return
                    }
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
    abort(403)
}

export default superAdminAuthentication
