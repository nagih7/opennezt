import {User} from '@/models'

export async function getTotalUsers() {
    return await User.countDocuments()
}
