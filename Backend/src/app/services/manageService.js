import {LINK_STATIC_URL} from '@/configs'
import {User, Type, Role, Industry} from '@/models'

// GET TOTAL USERS
export async function getTotalUsers() {
    return await User.countDocuments()
}

// USER
export async function userReadRoot({q, page, per_page, field, order}) {
    q = q ? q : ''
    order = order === '-1' ? -1 : 1
    const matchStage = {
        $match: {
            $or: [{name: {$regex: q, $options: 'i'}}, {email: {$regex: q, $options: 'i'}}],
        },
    }

    const sortStage = {
        $sort: {[field]: order},
    }
    const skipStage = {
        $skip: (page - 1) * per_page,
    }
    const limitStage = {
        $limit: per_page,
    }

    const addSetStage = {
        $set: {
            avatar: {
                $cond: {
                    if: {$eq: [{$ifNull: ['$avatar', '']}, '']},
                    then: '$avatar',
                    else: {$concat: [LINK_STATIC_URL, '$avatar']},
                },
            },
            background: {
                $cond: {
                    if: {$eq: [{$ifNull: ['$background', '']}, '']},
                    then: '$background',
                    else: {$concat: [LINK_STATIC_URL, '$background']},
                },
            },
        },
    }
    const users = await User.aggregate([matchStage, sortStage, skipStage, limitStage, addSetStage])

    const filter = {
        ...(q && {$or: [{name: q}, {email: q}, {phone: q}]}),
    }

    const total = await User.countDocuments(filter)
    return {total, page, per_page, users}
}

// ROLE
export async function roleReadRoot({q, page, per_page, field, order}) {
    q = q ? q : ''
    order = order === '-1' ? -1 : 1
    const matchStage = {
        $match: {name: {$regex: q, $options: 'i'}},
    }

    const sortStage = {
        $sort: {[field]: order},
    }
    const skipStage = {
        $skip: (page - 1) * per_page,
    }
    const limitStage = {
        $limit: per_page,
    }

    const roles = await Role.aggregate([matchStage, sortStage, skipStage, limitStage])

    const filter = {
        ...(q && {name: q}),
    }

    const total = await Role.countDocuments(filter)
    return {total, page, per_page, roles}
}
export async function createRole(requestBody) {
    const role = new Role({
        name: requestBody.name,
        description: requestBody.description,
    })
    const type = await Type.findOne({class: 'account', name: 'Account'})
    role.type_id = type._id
    await role.save()
}
export async function updateRole(id, requestBody) {
    await Role.updateOne(
        {_id: id},
        {
            $set: {
                name: requestBody.name,
                description: requestBody.description,
            },
        }
    )
}
export async function deleteRole(id) {
    await Role.deleteOne({_id: id})
}

// TYPE
export async function typeReadRoot({q, page, per_page, field, order}) {
    q = q ? q : ''
    order = order === '-1' ? -1 : 1
    const matchStage = {
        $match: {name: {$regex: q, $options: 'i'}},
    }

    const sortStage = {
        $sort: {[field]: order},
    }
    const skipStage = {
        $skip: (page - 1) * per_page,
    }
    const limitStage = {
        $limit: per_page,
    }

    const types = await Type.aggregate([matchStage, sortStage, skipStage, limitStage])

    const filter = {
        ...(q && {name: q}),
    }

    const total = await Type.countDocuments(filter)
    return {total, page, per_page, types}
}
export async function createType(requestBody) {
    const type = new Type({
        class: requestBody.class,
        name: requestBody.name,
        description: requestBody.description,
    })
    await type.save()
}
export async function updateType(id, requestBody) {
    await Type.updateOne(
        {_id: id},
        {
            $set: {
                class: requestBody.class,
                name: requestBody.name,
                description: requestBody.description,
            },
        }
    )
}
export async function deleteType(id) {
    await Type.deleteOne({_id: id})
}

// INDUSTRY
export async function industryReadRoot({q, page, per_page, field, order}) {
    q = q ? q : ''
    order = order === '-1' ? -1 : 1
    const matchStage = {
        $match: {name: {$regex: q, $options: 'i'}},
    }

    const sortStage = {
        $sort: {[field]: order},
    }
    const skipStage = {
        $skip: (page - 1) * per_page,
    }
    const limitStage = {
        $limit: per_page,
    }

    const industries = await Industry.aggregate([matchStage, sortStage, skipStage, limitStage])

    const filter = {
        ...(q && {name: q}),
    }

    const total = await Industry.countDocuments(filter)
    return {total, page, per_page, industries}
}
export async function createIndustry(requestBody) {
    const industry = new Industry({
        name: requestBody.name,
        description: requestBody.description,
    })
    await industry.save()
}
export async function updateIndustry(id, requestBody) {
    await Industry.updateOne(
        {_id: id},
        {
            $set: {
                name: requestBody.name,
                description: requestBody.description,
            },
        }
    )
}
export async function deleteIndustry(id) {
    await Industry.deleteOne({_id: id})
}
