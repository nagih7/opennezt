import {LINK_STATIC_URL} from '@/configs'
import {User, Type, Role, Industry, Category, Skill, ExperienceLevel} from '@/models'

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

// EXPERIENCE_LEVELS
export async function experienceLevelReadRoot({q, page, per_page, field, order}) {
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

    const experienceLevels = await ExperienceLevel.aggregate([matchStage, sortStage, skipStage, limitStage])

    const filter = {
        ...(q && {name: q}),
    }

    const total = await ExperienceLevel.countDocuments(filter)
    return {total, page, per_page, experienceLevels}
}
export async function createExperienceLevel(requestBody) {
    const experienceLevel = new ExperienceLevel({
        name: requestBody.name,
        description: requestBody.description,
    })
    await experienceLevel.save()
}
export async function updateExperienceLevel(id, requestBody) {
    await ExperienceLevel.updateOne(
        {_id: id},
        {
            $set: {
                name: requestBody.name,
                description: requestBody.description,
            },
        }
    )
}
export async function deleteExperienceLevel(id) {
    await ExperienceLevel.deleteOne({_id: id})
}

// CATEGORIES
export async function categoryReadRoot({q, page, per_page, field, order}) {
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

    const categories = await Category.aggregate([matchStage, sortStage, skipStage, limitStage])

    const filter = {
        ...(q && {name: q}),
    }

    const total = await Category.countDocuments(filter)
    return {total, page, per_page, categories}
}
export async function createCategory(requestBody) {
    const category = new Category({
        name: requestBody.name,
        description: requestBody.description,
    })
    await category.save()
}
export async function updateCategory(id, requestBody) {
    await Category.updateOne(
        {_id: id},
        {
            $set: {
                name: requestBody.name,
                description: requestBody.description,
            },
        }
    )
}
export async function deleteCategory(id) {
    await Category.deleteOne({_id: id})
    await Skill.deleteMany({category_id: id})
}

// SKILLS
export async function skillReadRoot({q, page, per_page, field, order}) {
    q = q ? q : ''
    order = order === '-1' ? -1 : 1
    const matchStage = {
        $match: {name: {$regex: q, $options: 'i'}},
    }
    const lookupStage = {
        $lookup: {
            from: 'categories',
            localField: 'category_id',
            foreignField: '_id',
            as: 'category',
            pipeline: [
                {
                    $project: {
                        _id: 0,
                        name: 1,
                        description: 1,
                    },
                },
            ],
        },
    }

    const unwindStage = {
        $unwind: '$category',
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

    const skills = await Skill.aggregate([
        matchStage,
        lookupStage,
        unwindStage,
        sortStage,
        skipStage,
        limitStage,
    ])

    const filter = {
        ...(q && {name: q}),
    }

    const total = await Skill.countDocuments(filter)
    return {total, page, per_page, skills}
}
export async function createSkill(requestBody) {
    const skill = new Skill({
        category_id: requestBody.category_id,
        name: requestBody.name,
        description: requestBody.description,
    })
    await skill.save()
}
export async function updateSkill(id, requestBody) {
    await Skill.updateOne(
        {_id: id},
        {
            $set: {
                category_id: requestBody.category_id,
                name: requestBody.name,
                description: requestBody.description,
            },
        }
    )
}
export async function deleteSkill(id) {
    await Skill.deleteOne({_id: id})
}
export async function skillCategories() {
    return await Category.find().select('_id name description')
}
