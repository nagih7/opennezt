import {Router} from 'express'
import * as commonController from '../app/controllers/commonController'

const commonRouter = Router()

commonRouter.post('/check-upload-background-startup', commonController.checkUploadBackgroundStartup)

commonRouter.post('/check-upload-pitch-desk', commonController.checkUploadPitchDesk)

commonRouter.put('/check-upload-avatar', commonController.checkUploadAvatar)

export default commonRouter
