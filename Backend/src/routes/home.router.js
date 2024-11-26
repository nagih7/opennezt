import {Router} from 'express'
import {asyncHandler} from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import validate from '@/app/middleware/common/validate'
import * as userMiddleware from '../app/middleware/user.middleware'
import * as userRequest from '../app/requests/user.request'
import * as userController from '../app/controllers/user.controller'

const homeRouter = Router()

homeRouter.use(asyncHandler(requireAuthentication))

homeRouter.get('/gettest', (req, res) => {
    res.send('Hello World')
})

export default homeRouter
