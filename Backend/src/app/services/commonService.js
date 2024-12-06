import {FileUpload} from '@/utils/classes'
import {LINK_STATIC_URL} from '@/configs'

export function checkUploadBackgroundStartup(file) {
    if (file instanceof FileUpload) {
        return file
    }
    return false
}

export function checkUploadPitchDesk(file) {
    if (file instanceof FileUpload) {
        return file
    }
    return false
}

export function checkUploadAvatar(avatar) {
    if (avatar instanceof FileUpload) {
        // save to path
        return LINK_STATIC_URL + avatar.save('avatars')
    }
    return false
}
