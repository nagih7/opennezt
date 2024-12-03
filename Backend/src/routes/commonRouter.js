import {Router} from 'express'
// import {asyncHandler} from '@/utils/helpers'
import * as commonController from '../app/controllers/commonController'

const commonRouter = Router()

commonRouter.post('/check-upload-background-startup', commonController.checkUploadBackgroundStartup)

commonRouter.post('/check-upload-pitch-desk', commonController.checkUploadPitchDesk)

export default commonRouter
