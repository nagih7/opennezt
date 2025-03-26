// import {LINK_STATIC_URL} from '@/configs'

import {ACCESS_TYPE, FRIEND_REQUEST, LINK_STATIC_URL, NOTIFICATION_TYPE, PROFILE_ACCESS} from '@/configs'
import {ActivityLog, Category, NotificationFeed, ObjectId, Profile, Type} from '@/models'

// =========== GET [Recruit Talents] =========== //
export async function recruitTalents(
    currentUser,
    {q, page, per_page, field, order, industry_id, experience_level_id, category_id, subcategory_id, skill_id}
) {
    q = q ? q : ''
    order = order === '-1' ? -1 : 1

    if (category_id && !subcategory_id) {
        const category = await Category.find({parent_id: new ObjectId(category_id)})
        subcategory_id = category.map((item) => item._id)
    } else if (category_id && subcategory_id) {
        subcategory_id = [subcategory_id]
    }

    const matchProfileStage = {
        $match: {
            $and: [
                {user_id: {$ne: new ObjectId(currentUser._id)}},
                {industry_ids: industry_id ? {$in: [new ObjectId(industry_id)]} : {$ne: null}},
                {experience_level_id: experience_level_id ? new ObjectId(experience_level_id) : {$ne: null}},
                {
                    category_ids: subcategory_id
                        ? {$in: [...subcategory_id.map((id) => new ObjectId(id))]}
                        : {$ne: null},
                },
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

// =========== GET [Talent Details] =========== //
export async function getTalentDetails(user, {id}) {
    const matchStage = {
        $match: {user_id: new ObjectId(id)},
    }
    const lookupUser = {
        $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'user',
            pipeline: [
                {
                    $project: {
                        __v: 0,
                        password: 0,
                        created_at: 0,
                        updated_at: 0,
                        is_active: 0,
                        email: 0,
                        phone: 0,
                        role_id: 0,
                    },
                },
                {
                    $addFields: {
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
                },
            ],
        },
    }
    const lookupIndustry = {
        $lookup: {
            from: 'industries',
            localField: 'industry_ids',
            foreignField: '_id',
            as: 'industries',
        },
    }
    const lookupExperienceLevel = {
        $lookup: {
            from: 'experience_levels',
            localField: 'experience_level_id',
            foreignField: '_id',
            as: 'experience_level',
        },
    }
    const lookupEducation = {
        $lookup: {
            from: 'educations',
            localField: '_id',
            foreignField: 'profile_id',
            as: 'educations',
        },
    }
    const lookupCertification = {
        $lookup: {
            from: 'certifications',
            localField: '_id',
            foreignField: 'profile_id',
            as: 'certifications',
        },
    }
    const lookupCategory = {
        $lookup: {
            from: 'categories',
            localField: 'category_ids',
            foreignField: '_id',
            as: 'categories',
        },
    }
    const lookupSkill = {
        $lookup: {
            from: 'skills',
            localField: 'skill_ids',
            foreignField: '_id',
            as: 'skills',
            pipeline: [
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'category_id',
                        foreignField: '_id',
                        as: 'category',
                    },
                },
                {
                    $unwind: {path: '$category', preserveNullAndEmptyArrays: true},
                },
                {
                    $project: {
                        __v: 0,
                        category_id: 0,
                        'category.created_at': 0,
                        'category.updated_at': 0,
                        'category.__v': 0,
                    },
                },
            ],
        },
    }
    const lookupAdditionalInfo = {
        $lookup: {
            from: 'profile_additional_infos',
            localField: '_id',
            foreignField: 'profile_id',
            as: 'additional_infos',
        },
    }
    const lookupStages = [
        lookupUser,
        lookupIndustry,
        lookupExperienceLevel,
        lookupEducation,
        lookupCertification,
        lookupCategory,
        lookupSkill,
        lookupAdditionalInfo,
    ]

    const unwindStages = [
        {
            $unwind: '$user',
        },
        {
            $unwind: {path: '$experience_level', preserveNullAndEmptyArrays: true},
        },
    ]
    const projectStage = {
        $project: {
            _id: 0,
            __v: 0,
            user_id: 0,
            industry_ids: 0,
            experience_level_id: 0,
            education_ids: 0,
            certification_ids: 0,
            category_ids: 0,
            skill_ids: 0,
            created_at: 0,
            updated_at: 0,

            'industries._id': 0,
            'industries.profile_id': 0,
            'industries.created_at': 0,
            'industries.updated_at': 0,
            'industries.__v': 0,
            'experience_level._id': 0,
            'experience_level.profile_id': 0,
            'experience_level.created_at': 0,
            'experience_level.updated_at': 0,
            'experience_level.__v': 0,
            'educations._id': 0,
            'educations.profile_id': 0,
            'educations.created_at': 0,
            'educations.updated_at': 0,
            'educations.__v': 0,
            'certifications._id': 0,
            'certifications.profile_id': 0,
            'certifications.created_at': 0,
            'certifications.updated_at': 0,
            'certifications.__v': 0,
            'categories._id': 0,
            'categories.created_at': 0,
            'categories.updated_at': 0,
            'categories.__v': 0,
            'skills._id': 0,
            category_id: 0,
            'skills.created_at': 0,
            'skills.updated_at': 0,
            'skills.__v': 0,
            'additional_infos._id': 0,
            'additional_infos.profile_id': 0,
            'additional_infos.created_at': 0,
            'additional_infos.updated_at': 0,
            'additional_infos.__v': 0,
        },
    }

    const talent = await Profile.aggregate([matchStage, ...lookupStages, ...unwindStages, projectStage])

    // Check if user has sent friend request
    const requestType = await Type.findOne({class: NOTIFICATION_TYPE, name: FRIEND_REQUEST})

    const friendRequest = await NotificationFeed.findOne({
        user_id: new ObjectId(id),
        source_id: user._id,
        type_id: requestType._id,
    })

    talent[0].is_friend_requested = !!friendRequest

    return talent[0]
}

// =========== POST [Access to Talent] =========== //
export async function accessToTalent(user, {id}) {
    const profile = await Profile.findOne({user_id: new ObjectId(id)})
    const accessType = await Type.findOne({class: ACCESS_TYPE, name: PROFILE_ACCESS})
    const oldActivity = await ActivityLog.findOne({
        user_id: user._id,
        'data.profile_id': profile._id,
        type_id: accessType._id,
    })
    if (oldActivity) {
        // Update timestamp
        oldActivity.timestamp = new Date()
        await oldActivity.save()
    } else {
        // Create new activity
        const activity = new ActivityLog({
            user_id: user._id,
            type_id: accessType._id,
            data: {profile_id: profile._id, owner_id: new ObjectId(id)},
            metadata: {},
        })
        await activity.save()
    }
}
