import { ACCESS_TYPE, LINK_STATIC_URL, PROFILE_ACCESS } from '@/configs'
import {
    Certification,
    Education,
    Profile,
    ProfileAdditionalInfo,
    Organization,
    Type,
    ActivityLog,
    Friend,
} from '@/models'

// ========== GET [Profile] ========== //
export async function getProfile(user) {
    const accessType = await Type.findOne({ class: ACCESS_TYPE, name: PROFILE_ACCESS })

    const matchStage = {
        $match: { user_id: user._id },
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
                    $unwind: { path: '$category', preserveNullAndEmptyArrays: true },
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
    const lookupArticle = {
        $lookup: {
            from: 'articles',
            localField: 'user_id',
            foreignField: 'user_id',
            as: 'articles',
            pipeline: [
                // {
                //     $lookup: {
                //         from: 'projects',
                //         localField: 'project_id',
                //         foreignField: '_id',
                //         as: 'project',
                //     },
                // },
                // {
                //     $unwind: { path: '$project', preserveNullAndEmptyArrays: true },
                // },
                // {
                //     $lookup: {
                //         from: 'users',
                //         localField: 'user_id',
                //         foreignField: '_id',
                //         as: 'user',
                //     },
                // },
                // {
                //     $unwind: { path: '$user', preserveNullAndEmptyArrays: true },
                // },
                // {
                //     $addFields: {
                //         'user.avatar': {
                //             $cond: {
                //                 if: { $eq: [{ $ifNull: ['$user.avatar', ''] }, ''] },
                //                 then: '$user.avatar',
                //                 else: { $concat: [LINK_STATIC_URL, '$user.avatar'] },
                //             },
                //         },
                //     },
                // },
            ],
        },
    }
    const lookupActivity = {
        $lookup: {
            from: 'activity_logs',
            localField: '_id',
            foreignField: 'data.profile_id',
            as: 'activities',
            pipeline: [
                {
                    $match: {
                        type_id: accessType._id,
                    },
                },
                {
                    $project: {
                        _id: 0,
                        metadata: 1,
                    },
                },
            ],
        },
    }
    const addfieldStage = {
        $addFields: {
            activities: {
                $reduce: {
                    input: '$activities',
                    initialValue: 0,
                    in: {
                        $add: ['$$value', { $ifNull: [{ $toInt: '$$this.metadata.count' }, 0] }],
                    },
                },
            },
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
        lookupArticle,
        lookupActivity,
    ]

    const unwindStages = [
        {
            $unwind: { path: '$experience_level', preserveNullAndEmptyArrays: true },
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
            // 'industries._id': 0,
            'industries.profile_id': 0,
            'industries.created_at': 0,
            'industries.updated_at': 0,
            'industries.__v': 0,
            // 'experience_level._id': 0,
            'experience_level.profile_id': 0,
            'experience_level.created_at': 0,
            'experience_level.updated_at': 0,
            'experience_level.__v': 0,
            // 'educations._id': 0,
            'educations.profile_id': 0,
            'educations.created_at': 0,
            'educations.updated_at': 0,
            'educations.__v': 0,
            // 'certifications._id': 0,
            'certifications.profile_id': 0,
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
            'additional_infos.profile_id': 0,
            'additional_infos.created_at': 0,
            'additional_infos.updated_at': 0,
            'additional_infos.__v': 0,
        },
    }
    const profile = await Profile.aggregate([matchStage, ...lookupStages, ...unwindStages, addfieldStage, projectStage])
    return profile[0]
}

// ========== PUT [Professional] ========== //
export async function updateProfessionalProfile(user, requestBody) {
    const profile = await Profile.findOneAndUpdate({ user_id: user.id }, requestBody, { new: true })
    if (!profile) {
        const newProfile = new Profile({
            ...requestBody,
            user_id: user.id,
        })
        await newProfile.save()
    } else {
        await Profile.findOneAndUpdate({ user_id: user.id }, requestBody)
    }
}

// ========== POST [Education] ========== //
export async function createProfileEducation(user, requestBody) {
    const profile = await Profile.findOne({ user_id: user.id })
    if (!profile) {
        const newProfile = new Profile({
            user_id: user.id,
        })
        await newProfile.save()
        const education = new Education({
            ...requestBody,
            profile_id: newProfile._id,
        })
        await education.save()
        return education
    } else {
        const education = new Education({
            ...requestBody,
            profile_id: profile._id,
        })
        await education.save()
        return education
    }
}
// ========== PUT [Education] ========== //
export async function updateProfileEducation(user, requestBody) {
    const profile = await Profile.findOne({ user_id: user.id })
    if (!profile) {
        throw new Error('Profile not found.')
    }
    const education = await Education.findOneAndUpdate(
        {
            profile_id: profile._id,
            _id: requestBody._id,
        },
        requestBody,
        { new: true }
    )
    if (!education) {
        throw new Error('Education not found.')
    }
    return education
}
// =========== DELETE [Education] ========== //
export async function deleteProfileEducation(user, educationId) {
    const profile = await Profile.findOne({ user_id: user.id })
    if (!profile) {
        throw new Error('Profile not found.')
    }
    const education = await Education.findOneAndDelete({
        profile_id: profile._id,
        _id: educationId,
    })
    if (!education) {
        throw new Error('Education not found.')
    }
    return education._id
}

// ========== POST [Certification] ========== //
export async function createProfileCertifications(user, requestBody) {
    const profile = await Profile.findOne({ user_id: user.id })
    if (!profile) {
        const newProfile = new Profile({
            user_id: user.id,
        })
        await newProfile.save()
        const certification = new Certification({
            ...requestBody,
            profile_id: newProfile._id,
        })
        await certification.save()
        return certification
    } else {
        const certification = new Certification({
            ...requestBody,
            profile_id: profile._id,
        })
        await certification.save()
        return certification
    }
}
// ========== PUT [Certification] ========== //
export async function updateProfileCertification(user, requestBody) {
    const profile = await Profile.findOne({ user_id: user.id })
    if (!profile) {
        throw new Error('Profile not found.')
    }

    const certification = await Certification.findOneAndUpdate(
        {
            profile_id: profile._id,
            _id: requestBody._id,
        },
        requestBody,
        { new: true }
    )
    if (!certification) {
        throw new Error('Certification not found.')
    }
    return certification
}
// ========== DELETE [Certification] ========== //
export async function deleteProfileCertification(user, certificationId) {
    const profile = await Profile.findOne({ user_id: user.id })
    if (!profile) {
        throw new Error('Profile not found.')
    }
    const certification = await Certification.findOneAndDelete({
        profile_id: profile._id,
        _id: certificationId,
    })
    if (!certification) {
        throw new Error('Certification not found.')
    }
    return certification._id
}

// ========== PUT [Skills] ========== //
export async function updateProfileSkills(user, requestBody) {
    const skills = [...new Set(requestBody.skills.map((skill) => skill._id._id.toString()))]
    const categories = [...new Set(requestBody.skills.map((skill) => skill._id.category_id.toString()))]
    const profile = await Profile.findOne({ user_id: user._id })
    if (!profile) {
        const newProfile = new Profile({
            user_id: user._id,
            skill_ids: skills,
            category_ids: categories,
        })
        await newProfile.save()
    } else {
        await Profile.findOneAndUpdate({ user_id: user._id }, { skill_ids: skills, category_ids: categories })
    }
}

// ========== [Organization] ========== //
export async function getOrganizationFramework() {
    const organizations = await Organization.find().select('_id name description')
    return organizations
}

// ========== POST [Additional Info] ========== //
export async function createProfileAdditionalInfos(user, requestBody) {
    const profile = await Profile.findOne({ user_id: user._id })
    if (!profile) {
        const newProfile = new Profile({
            user_id: user._id,
        })
        await newProfile.save()
        const additionalInfo = new ProfileAdditionalInfo({
            ...requestBody,
            profile_id: newProfile._id,
        })

        await additionalInfo.save()
        return additionalInfo
    } else {
        const additionalInfo = new ProfileAdditionalInfo({
            ...requestBody,
            profile_id: profile._id,
        })
        await additionalInfo.save()
        return additionalInfo
    }
}

// ========== PUT [Additional Info] ========== //
export async function updateProfileAdditionalInfo(user, requestBody) {
    const profile = await Profile.findOne({ user_id: user._id })
    if (!profile) {
        throw new Error('Profile not found.')
    }
    const additionalInfo = await ProfileAdditionalInfo.findOneAndUpdate(
        {
            profile_id: profile._id,
            _id: requestBody._id,
        },
        requestBody,
        { new: true }
    )
    if (!additionalInfo) {
        throw new Error('Additional Info not found.')
    }
    return additionalInfo
}

// ========== DELETE [Additional Info] ========== //
export async function deleteProfileAdditionalInfo(user, additionalInfoId) {
    const profile = await Profile.findOne({ user_id: user._id })
    if (!profile) {
        throw new Error('Profile not found.')
    }
    const additionalInfo = await ProfileAdditionalInfo.findOneAndDelete({
        profile_id: profile._id,
        _id: additionalInfoId,
    })
    if (!additionalInfo) {
        throw new Error('Additional Info not found.')
    }
    return additionalInfo._id
}

// ========== GET [Profile Access] ========== //
export async function getAccessToMyProfile(user) {
    const accessType = await Type.findOne({ class: ACCESS_TYPE, name: PROFILE_ACCESS })
    const activities = await ActivityLog.aggregate([
        {
            $match: {
                'data.owner_id': user._id,
                type_id: accessType._id,
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user',
                pipeline: [
                    {
                        $addFields: {
                            avatar: {
                                $cond: {
                                    if: { $eq: [{ $ifNull: ['$avatar', ''] }, ''] },
                                    then: '$avatar',
                                    else: { $concat: [LINK_STATIC_URL, '$avatar'] },
                                },
                            },
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            avatar: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: '$user',
        },
        {
            $limit: 10,
        },
        {
            $sort: { timestamp: -1 },
        },
        {
            $project: {
                timestamp: 1,
                project: 1,
                user: 1,
            },
        },
    ])

    return activities
}

// ========= GET [Friends] ========== //
export async function getMyFriends(
    user
    // { page, per_page }
) {
    const friends = await Friend.aggregate([
        {
            $match: { user_id: user._id },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'friend_id',
                foreignField: '_id',
                as: 'user',
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            email: 1,
                            avatar: {
                                $cond: {
                                    if: { $eq: [{ $ifNull: ['$avatar', ''] }, ''] },
                                    then: '$avatar',
                                    else: { $concat: [LINK_STATIC_URL, '$avatar'] },
                                },
                            },
                        },
                    },
                ],
            },
        },
        {
            $unwind: '$user',
        },
        // {
        //     $skip: (page - 1) * per_page,
        // },
        // {
        //     $limit: per_page,
        // },
        {
            $project: {
                _id: 0,
                user: 1,
                status: 1,
                is_favorite: 1,
                created_at: 1,
            },
        },
    ])

    // const requestType = await Type.findOne({ class: NOTIFICATION_TYPE, name: FRIEND_REQUEST_NOTIFICATION })
    // const friendRequests = await NotificationFeed.aggregate([
    //     {
    //         $match: {
    //             user_id: user._id,
    //             type: requestType._id,
    //         },
    //     },
    //     {
    //         $lookup: {
    //             from: 'users',
    //             localField: 'source_id',
    //             foreignField: '_id',
    //             as: 'user',
    //             pipeline: [
    //                 {
    //                     $project: {
    //                         _id: 1,
    //                         name: 1,
    //                         avatar: {
    //                             $cond: {
    //                                 if: { $eq: [{ $ifNull: ['$avatar', ''] }, ''] },
    //                                 then: '$avatar',
    //                                 else: { $concat: [LINK_STATIC_URL, '$avatar'] },
    //                             },
    //                         },
    //                     },
    //                 },
    //             ],
    //         },
    //     },
    //     {
    //         $unwind: '$user',
    //     },
    //     {
    //         $sort: { timestamp: -1 },
    //     },
    //     {
    //         $project: {
    //             _id: 1,
    //             user: 1,
    //             timestamp: 1,
    //         },
    //     },
    // ])

    return friends
}
