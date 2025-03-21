// import {LINK_STATIC_URL} from '@/configs'

import {ObjectId, Profile} from '@/models'

// =========== GET [Recruit Talents] =========== //
export async function recruitTalents(
    currentUser,
    {q, page, per_page, field, order, industry_id, experience_level_id, category_id, subcategory_id, skill_id}
) {
    q = q ? q : ''
    order = order === '-1' ? -1 : 1

    const matchProfileStage = {
        $match: {
            $and: [
                {user_id: {$ne: new ObjectId(currentUser._id)}},
                {industry_ids: industry_id ? {$in: [new ObjectId(industry_id)]} : {$ne: null}},
                {experience_level_id: experience_level_id ? new ObjectId(experience_level_id) : {$ne: null}},
                {category_ids: category_id ? {$in: [new ObjectId(category_id)]} : {$ne: null}},
                {skill_ids: skill_id ? {$in: [new ObjectId(skill_id)]} : {$ne: null}},
            ],
        },
    }

    const matchUserStage = {
        $match: {
            $or: [{name: {$regex: q, $options: 'i'}}, {email: {$regex: q, $options: 'i'}}],
        },
    }

    const talents = await Profile.aggregate([
        matchProfileStage,
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user',
                pipeline: [matchUserStage, {$project: {name: 1, email: 1, avatar: 1, background: 1}}],
            },
        },
        {
            $unwind: '$user',
        },
        {
            $project: {
                _id: 1,
                user: 1,
                industry_ids: 1,
                experience_level_id: 1,
                category_ids: 1,
                skill_ids: 1,
            },
        },
        {$sort: {[field]: order}},
        {$skip: (page - 1) * per_page},
        {$limit: per_page},
    ])

    const filter = {
        $and: [
            {user_id: {$ne: new ObjectId(currentUser._id)}},
            {industry_ids: industry_id ? {$in: [new ObjectId(industry_id)]} : {$ne: null}},
            {experience_level_id: experience_level_id ? new ObjectId(experience_level_id) : {$ne: null}},
            {category_ids: category_id ? {$in: [new ObjectId(category_id)]} : {$ne: null}},
            {skill_ids: skill_id ? {$in: [new ObjectId(skill_id)]} : {$ne: null}},
        ],
    }

    const total = await Profile.countDocuments(filter)
    const total_page = Math.ceil(total / per_page)
    return {total, page, per_page, total_page, talents}
}
