import {Role, Type} from '@/models'

async function roleSeeder(session) {
    const accountType = await Type.findOne({class: 'account'})
    if (accountType) {
        const roles = [
            {
                name: 'Super Admin',
                description: 'Super admin',
                type_id: accountType._id,
                metadata: {},
            },
            {name: 'Admin', description: 'Admin', type_id: accountType._id, metadata: {}},
            {name: 'User', description: 'User', type_id: accountType._id, metadata: {}},
        ]
        for (const role of roles) {
            let roleRecord = await Role.findOne({name: role.name})
            if (!roleRecord) {
                roleRecord = new Role(role)
                await roleRecord.save({session})
            }
        }
    }
}

export default roleSeeder
