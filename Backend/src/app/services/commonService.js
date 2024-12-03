import {User, FounderProfile, Project, Invitation} from '@/models'
import {FileUpload} from '@/utils/classes'
import {LINK_STATIC_URL} from '@/configs'

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
