import {FileUpload} from '@/utils/classes'

export function checkUploadBackgroundStartup(requestBody) {
    if (requestBody.background instanceof FileUpload) {
        return true
    }
    return false
}

export function checkUploadPitchDesk(requestBody) {
    if (requestBody.pitch_deck instanceof FileUpload) {
        return true
    }
    return false
}

export function checkUploadAvatar(requestBody) {
    if (requestBody.avatar instanceof FileUpload) {
        // save to path
        return true
    }
    return false
}
