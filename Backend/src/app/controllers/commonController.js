import * as commonService from '../services/commonService'

export function checkUploadBackgroundStartup(req, res) {
    const result = commonService.checkUploadBackgroundStartup(req.currentUser)
    res.jsonify(result)
}

export function checkUploadPitchDesk(req, res) {
    const result = commonService.checkUploadPitchDesk(req.currentUser)
    res.jsonify(result)
}
