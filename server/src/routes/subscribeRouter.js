import { Router } from 'express'
import { asyncHandler } from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import * as subscriptionController from '../app/controllers/subscriptionController'

const subscribeRouter = Router()

subscribeRouter.use(asyncHandler(requireAuthentication))

subscribeRouter.post('/unsubscribe', asyncHandler(subscriptionController.unsubscribe))

subscribeRouter.post('/', asyncHandler(subscriptionController.subscribe))

export default subscribeRouter
