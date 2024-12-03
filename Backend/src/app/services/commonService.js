import {FileUpload} from '@/utils/classes'

export function checkUploadBackgroundStartup(file) {
    if (file instanceof FileUpload) {
        return true
    }
    return false
}

export function checkUploadPitchDesk(file) {
    if (file instanceof FileUpload) {
        return true
    }
    return false
}
