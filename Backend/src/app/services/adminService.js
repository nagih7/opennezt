import {User} from '@/models'
// import {FileUpload} from '@/utils/classes'
import {LINK_STATIC_URL} from '@/configs'

export async function getAllUsers() {
    const users = await User.find()
    users.forEach(function (user) {
        user.avatar = user.avatar && LINK_STATIC_URL + user.avatar
    })
    return users
}

export async function getTotalUsers() {
    return await User.countDocuments()
}
