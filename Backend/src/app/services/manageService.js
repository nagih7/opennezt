import {LINK_STATIC_URL} from '@/configs'
import {User, Type, Role, Industry} from '@/models'

// GET TOTAL USERS
export async function getTotalUsers() {
    return await User.countDocuments()
}

// USER READ ROOT
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

// ROLE READ ROOT
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

// TYPE READ ROOT
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

// INDUSTRY READ ROOT
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
