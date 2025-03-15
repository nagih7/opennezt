import {Certification, Education, Profile, ProfileAdditionalInfo, Organization} from '@/models'

// ========== GET [Profile] ========== //
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
    const profile = await Profile.aggregate([matchStage, ...lookupStages, ...unwindStages, projectStage])
    return profile[0]
}

// ========== PUT [Professional] ========== //
export async function updateProfessionalProfile(user, requestBody) {
    const profile = await Profile.findOneAndUpdate({user_id: user.id}, requestBody, {new: true})
    if (!profile) {
        throw new Error('Profile not found.')
    }
}

// ========== POST [Education] ========== //
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
// ========== PUT [Education] ========== //
export async function updateProfileEducation(user, requestBody) {
    const profile = await Profile.findOne({user_id: user.id})
    if (!profile) {
        throw new Error('Profile not found.')
    }
    const education = await Education.findOneAndUpdate(
        {
            profile_id: profile._id,
            _id: requestBody._id,
        },
        requestBody,
        {new: true}
    )
    if (!education) {
        throw new Error('Education not found.')
    }
}
// =========== DELETE [Education] ========== //
export async function deleteProfileEducation(user, educationId) {
    const profile = await Profile.findOne({user_id: user.id})
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
}

// ========== POST [Certification] ========== //
export async function createProfileCertifications(user, requestBody) {
    const profile = await Profile.findOne({user_id: user.id})
    if (!profile) {
        throw new Error('Profile not found.')
    }
    const certification = new Certification({
        ...requestBody,
        profile_id: profile._id,
    })
    await certification.save()
}
// ========== PUT [Certification] ========== //
export async function updateProfileCertification(user, requestBody) {
    const profile = await Profile.findOne({user_id: user.id})
    if (!profile) {
        throw new Error('Profile not found.')
    }

    const certification = await Certification.findOneAndUpdate(
        {
            profile_id: profile._id,
            _id: requestBody._id,
        },
        requestBody,
        {new: true}
    )
    if (!certification) {
        throw new Error('Certification not found.')
    }
}
// ========== DELETE [Certification] ========== //
export async function deleteProfileCertification(user, certificationId) {
    const profile = await Profile.findOne({user_id: user.id})
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
}

// ========== PUT [Skills] ========== //
export async function updateProfileSkills(user, requestBody) {
    const skills = requestBody.skills.map((skill) => skill._id)
    const profile = await Profile.findOne({user_id: user._id})
    if (!profile) {
        throw new Error('Profile not found.')
    }
    await Profile.findOneAndUpdate({user_id: user._id}, {skill_ids: skills})
}

// ========== [Organization] ========== //
export async function getOrganizationFramework() {
    const organizations = await Organization.find().select('_id name description')
    return organizations
}

// ========== POST [Additional Info] ========== //
export async function createProfileAdditionalInfos(user, requestBody) {
    const profile = await Profile.findOne({user_id: user._id})
    const additionalInfo = new ProfileAdditionalInfo({
        ...requestBody,
        profile_id: profile._id,
    })
    await additionalInfo.save()
}

// ========== PUT [Additional Info] ========== //
export async function updateProfileAdditionalInfo(user, requestBody) {
    const profile = await Profile.findOne({user_id: user._id})
    if (!profile) {
        throw new Error('Profile not found.')
    }
    const additionalInfo = await ProfileAdditionalInfo.findOneAndUpdate(
        {
            profile_id: profile._id,
            _id: requestBody._id,
        },
        requestBody,
        {new: true}
    )
    if (!additionalInfo) {
        throw new Error('Additional Info not found.')
    }
}
