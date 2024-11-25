import {User} from '@/models'

async function userSeeder(session) {
    const email = 'user@opennezt.vn'
    const password = 'User.12345'
    const role = 'user'
    let superAdmin = await User.findOne({email})
    if (!superAdmin) {
        superAdmin = new User({name: 'User', email, password, role})
        await superAdmin.save({session})
    }
}

export default userSeeder
