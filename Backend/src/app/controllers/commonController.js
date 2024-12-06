import * as commonService from '../services/commonService'

export function checkUploadBackgroundStartup(req, res) {
    const result = commonService.checkUploadBackgroundStartup(req.body)
    res.jsonify(result)
}

export function checkUploadPitchDesk(req, res) {
    const result = commonService.checkUploadPitchDesk(req.body)
    res.jsonify(result)
}

export function checkUploadAvatar(req, res) {
    const result = commonService.checkUploadAvatar(req.body)
    res.jsonify(result)
}
