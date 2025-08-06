import {Type} from '@/models'

async function typeSeeder(session) {
    // const types = [
    //     {
    //         class: 'account',
    //         name: 'Account',
    //         description: 'Account Classification',
    //         metadata: {},
    //     },
    // ]

    // types.map(async (type) => {
    //     let typeObj = await Type.findOne({class: type.class})
    //     if (!typeObj) {
    //         typeObj = new Type({
    //             class: type.class,
    //             name: type.name,
    //             description: type.description,
    //             metadata: type.metadata,
    //         })
    //         await typeObj.save({session})
    //     }
    // })

    let typeObj = await Type.findOne({class: 'account'})
    if (!typeObj) {
        typeObj = new Type({
            class: 'account',
            name: 'Account',
            description: 'Account Classification',
            metadata: {},
        })
        await typeObj.save({session})
    }
}

export default typeSeeder
