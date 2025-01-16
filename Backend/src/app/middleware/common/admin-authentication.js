// import _ from 'lodash'
import {JsonWebTokenError, TokenExpiredError} from 'jsonwebtoken'
import {abort} from '@/utils/helpers'

async function adminAuthentication(req, res, next) {
    try {
        // admin authentication
        const user = await req.currentUser
        if (user && user.is_active && user.role === 'admin') {
            next()
            return
        }
    } catch (error) {
        if (!(error instanceof JsonWebTokenError)) {
            throw error
        }
        if (error instanceof TokenExpiredError) {
            abort(401, 'Your account does not have permission to access this page!')
        }
    }
    abort(401)
}

export default adminAuthentication
