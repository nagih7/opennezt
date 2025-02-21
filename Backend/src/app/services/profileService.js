import {Education, Profile, ProfileAdditionalInfo} from '@/models'

export async function createProfile(user, {additional_infos, ...requestBody}) {
    const isExist = await Profile.findOne({user_id: user.id})
    if (isExist) {
        throw new Error('Profile already exists.')
    }
    const profile = new Profile({
        ...requestBody,
        user_id: user.id,
    })
    await profile.save()

    // Save additional_infos
    if (additional_infos && additional_infos.length > 0) {
        await ProfileAdditionalInfo.insertMany(
            additional_infos.map((info) => ({
                ...info,
                profile_id: profile._id,
            }))
        )
    }
}

export async function getProfile(user) {
    const matchStage = {
        $match: {user_id: user._id},
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
            $unwind: {path: '$experience_level', preserveNullAndEmptyArrays: true},
        },
    ]

    const projectStage = {
        $project: {
            _id: 0,
            __v: 0,
            industry_ids: 0,
            experience_level_id: 0,
            education_ids: 0,
            certification_ids: 0,
            category_ids: 0,
            skill_ids: 0,
            created_at: 0,
            updated_at: 0,
            // 'industries._id': 0,
            'industries.created_at': 0,
            'industries.updated_at': 0,
            'industries.__v': 0,
            // 'experience_level._id': 0,
            'experience_level.created_at': 0,
            'experience_level.updated_at': 0,
            'experience_level.__v': 0,
            // 'educations._id': 0,
            'educations.created_at': 0,
            'educations.updated_at': 0,
            'educations.__v': 0,
            // 'certifications._id': 0,
            'certifications.created_at': 0,
            'certifications.updated_at': 0,
            'certifications.__v': 0,
            // 'categories._id': 0,
            'categories.created_at': 0,
            'categories.updated_at': 0,
            'categories.__v': 0,
            // 'skills._id': 0,
            'skills.created_at': 0,
            'skills.updated_at': 0,
            'skills.__v': 0,
            // 'additional_infos._id': 0,
            // 'additional_infos.profile_id': 0,
            'additional_infos.created_at': 0,
            'additional_infos.updated_at': 0,
            'additional_infos.__v': 0,
        },
    }

    const profile = await Profile.aggregate([matchStage, ...lookupStages, ...unwindStages, projectStage])

    return profile[0]
}

// ========== Profile Education ========== //
export async function createProfileEducation(user, requestBody) {
    const profile = await Profile.findOne({user_id: user.id})
    if (!profile) {
        throw new Error('Profile not found.')
    }

    const education = new Education({
        ...requestBody,
        profile_id: profile._id,
    })
    await education.save()
}
export async function updateProfileEducation(user, requestBody) {
    const profile = await Profile.findOne({user_id: user.id})
    if (!profile) {
        throw new Error('Profile not found.')
    }

    const education = await Education.findOneAndUpdate(
        {
            profile_id: profile._id,
            _id: requestBody.id,
        },
        requestBody,
        {new: true}
    )
    if (!education) {
        throw new Error('Education not found.')
    }
}
