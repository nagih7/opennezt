// import _ from 'lodash'
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { abort, verifyToken } from '@/utils/helpers'
import { User } from '@/models'
import _ from 'lodash'
import { tokenBlocklist } from '@/app/services/authService'
import { TOKEN_TYPE } from '@/configs'
import { userSockets } from '@/routes'

async function socketAuthentication(socket, token) {
    try {
        if (token) {
            // Check if the token is not in the blocklist
            const allowedToken = _.isUndefined(await tokenBlocklist.get(token))
            if (allowedToken) {
                const { user_id } = verifyToken(token, TOKEN_TYPE.AUTHORIZATION)
                const user = await User.findOne({ _id: user_id })
                if (user && user.is_active) {
                    socket.currentUser = user
                    userSockets[socket.id] = user._id.toString()
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
}

export default socketAuthentication
