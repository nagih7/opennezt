// import {LINK_STATIC_URL} from '@/configs'

import {Profile} from '@/models'

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
                {industry_ids: industry_id ? {$in: industry_id} : {$ne: null}},
                {experience_level_id: experience_level_id ? experience_level_id : {$ne: null}},
                {category_ids: category_id ? {$in: category_id} : {$ne: null}},
                {skill_ids: skill_id ? {$in: skill_id} : {$ne: null}},
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
        // {
        //     $lookup: {
        //         from: 'users',
        //         localField: 'user_id',
        //         foreignField: '_id',
        //         as: 'user',
        //     },
        // },
        // {
        //     $unwind: '$user',
        // },
        // matchUserStage,
        // {
        //     $lookup: {
        //         from: 'users',
        //         localField: 'user_id',
        //         foreignField: '_id',
        //         as: 'user',
        //     },
        // },
        // {
        //     $unwind: '$user',
        // },
        // {
        //     $lookup: {
        //         from: 'profiles',
        //         localField: 'user.profile_id',
        //         foreignField: '_id',
        //         as: 'user.profile',
        //     },
        // },
        // {
        //     $unwind: '$user.profile',
        // },
        // {
        //     $lookup: {
        //         from: 'industries',
        //         localField: 'user.profile.industry_id',
        //         foreignField: '_id',
        //         as: 'industry',
        //     },
        // },
        // {
        //     $unwind: '$industry',
        // },
        // {
        //     $lookup: {
        //         from: 'experience_levels',
        //         localField: 'user.profile.experience_level_id',
        //         foreignField: '_id',
        //         as: 'experience_level',
        //     },
        // },
        // {
        //     $unwind: '$experience_level',
        // },
        // {
        //     $lookup: {
        //         from: 'categories',
        //         localField: 'user.profile.category_id',
        //         foreignField: '_id',
        //         as: 'category',
        //     },
        // },
        // {
        //     $unwind: '$category',
        // },
        // {
        //     $lookup: {
        //         from: 'subcategories',
        //         localField: 'user.profile.subcategory_id',
        //         foreignField: '_id',
        //         as: 'subcategory',
        //     },
        // },
        // {
        //     $unwind: '$subcategory',
        // },
        // {
        //     $lookup: {
        //         from: 'skills',
        //         localField: 'user.profile.skill_id',
        //         foreignField: '_id',
        //         as: 'skill',
        //     },
        // },
        // {
        //     $unwind: '$skill',
        // },

        // {
        //     $project: {
        //         _id: 1,
        //         user_id: 1,
        //         user: {
        //             _id: '$user._id',
        //             profile_id: '$user.profile._id',
        //             first_name: '$user.first_name',
        //             last_name: '$user.last_name',
        //             email: '$user.email',
        //             phone: '$user.phone',
        //             profile: '$user.profile.first_name' + ' ' + '$user.profile.last_name',
        //             industry: '$industry.name',
        //         },
        //     },
        // },
    ])

    return talents
}
