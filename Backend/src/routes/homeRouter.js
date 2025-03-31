import { Router } from 'express'
import { asyncHandler } from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'

const homeRouter = Router()

homeRouter.use(asyncHandler(requireAuthentication))

homeRouter.get('/gettest', (req, res) => {
    res.send('Hello World')
})

export default homeRouter
