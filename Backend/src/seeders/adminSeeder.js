import {User} from '@/models'

async function adminSeeder(session) {
    const email = 'admin@opennezt.com'
    const password = 'Admin.12345'
    const role = 'admin'

    let superAdmin = await User.findOne({email})
    if (!superAdmin) {
        superAdmin = new User({name: 'Super Admin', email, password, role})
        await superAdmin.save({session})
    }
}

export default adminSeeder
