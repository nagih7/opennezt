import { Profile, Project, User, ObjectId } from '@/models'
import callOpenAI from '@/configs/openAI'
import { AI_API_TOKEN, AI_API_URL, LINK_STATIC_URL, MATCHING_TALENTS_PROMPT } from '@/configs/constants'
import axios from 'axios'

export async function matchingProjects(user) {
    const profile = await Profile.aggregate([
        {
            $match: {
                user_id: user._id,
            },
        },
        {
            $lookup: {
                from: 'industries',
                localField: 'industry_ids',
                foreignField: '_id',
                as: 'industries',
                pipeline: [
                    {
                        $project: {
                            _id: 0,
                            name: 1,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: 'experience_levels',
                localField: 'experience_level_id',
                foreignField: '_id',
                as: 'experience_level',
                pipeline: [
                    {
                        $project: {
                            _id: 0,
                            name: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: '$experience_level',
        },
        {
            $lookup: {
                from: 'skills',
                localField: 'skill_ids',
                foreignField: '_id',
                as: 'skills',
                pipeline: [
                    {
                        $project: {
                            _id: 0,
                            name: 1,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: 'profile_additional_infos',
                localField: '_id',
                foreignField: 'profile_id',
                as: 'additional_infos',
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
        },
        {
            $lookup: {
                from: 'educations',
                localField: '_id',
                foreignField: 'profile_id',
                as: 'educations',
                pipeline: [
                    {
                        $project: {
                            _id: 0,
                            school: 1,
                            degree: 1,
                            field_of_study: 1,
                            start_date: 1,
                            end_date: 1,
                            grade: 1,
                            activities: 1,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: 'certifications',
                localField: '_id',
                foreignField: 'profile_id',
                as: 'certifications',
                pipeline: [
                    {
                        $lookup: {
                            from: 'organizations',
                            localField: 'organization_id',
                            foreignField: '_id',
                            as: 'organization',
                            pipeline: [
                                {
                                    $project: {
                                        _id: 0,
                                        name: 1,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        $unwind: '$organization',
                    },
                    {
                        $project: {
                            _id: 0,
                            organization: '$organization.name',
                            name: 1,
                            description: 1,
                            issue_date: 1,
                            expiration_date: 1,
                            is_lifetime: 1,
                        },
                    },
                ],
            },
        },
        {
            $project: {
                _id: 0,
                user_id: 0,
                name: 0,
                industry_ids: 0,
                experience_level_id: 0,
                category_ids: 0,
                skill_ids: 0,
                education_ids: 0,
                certification_ids: 0,
                created_at: 0,
                updated_at: 0,
            },
        },
    ])

    // Extract profile from array and transform industries to array of names
    const queryData = profile[0] || {}
    queryData.industries = queryData.industries ? queryData.industries.map((industry) => industry.name) : []
    queryData.experience_level = queryData.experience_level ? queryData.experience_level.name : ''
    queryData.skills = queryData.skills ? queryData.skills.map((skill) => skill.name) : []

    // API request data
    const requestData = {
        inputs: {},
        query: JSON.stringify(queryData),
        response_mode: 'blocking',
        conversation_id: '',
        user: 'abc-123',
        files: [
            {
                type: 'image',
                transfer_method: 'remote_url',
                url: 'https://cloud.dify.ai/logo/logo-site.png',
            },
        ],
    }

    // API call function
    try {
        const response = await axios.post(`${AI_API_URL}chat-messages`, requestData, {
            headers: {
                Authorization: `Bearer ${AI_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
        })

        const matches = JSON.parse(response.data?.answer)?.matches

        console.log('matches', matches)
        const matchesId = matches.map((match) => new ObjectId(match.id))
        const projects = await Project.aggregate([
            {
                $match: {
                    _id: { $in: matchesId },
                },
            },
            {
                $lookup: {
                    from: 'stages',
                    localField: 'stage_id',
                    foreignField: '_id',
                    as: 'stage',
                    pipeline: [
                        {
                            $project: {
                                _id: 0,
                                name: 1,
                            },
                        },
                    ],
                },
            },
            {
                $unwind: '$stage',
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user',
                    pipeline: [
                        {
                            $project: {
                                _id: 0,
                                name: 1,
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
            {
                $lookup: {
                    from: 'project_members',
                    localField: '_id',
                    foreignField: 'project_id',
                    as: 'members',
                    pipeline: [
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'user_id',
                                foreignField: '_id',
                                as: 'user',
                                pipeline: [
                                    {
                                        $project: {
                                            _id: 0,
                                            name: 1,
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
                        { $unwind: '$user' },
                        { $project: { _id: 0, user: 1 } },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'articles',
                    localField: '_id',
                    foreignField: 'project_id',
                    as: 'articles',
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    user: 1,
                    description: 1,
                    stage: 1,
                    logo: {
                        $cond: {
                            if: { $eq: [{ $ifNull: ['$logo', ''] }, ''] },
                            then: '$logo',
                            else: { $concat: [LINK_STATIC_URL, '$logo'] },
                        },
                    },
                    background: {
                        $cond: {
                            if: { $eq: [{ $ifNull: ['$background', ''] }, ''] },
                            then: '$background',
                            else: { $concat: [LINK_STATIC_URL, '$background'] },
                        },
                    },
                    members: 1,
                    articles: 1,
                },
            },
        ])
        // Map the job_titles from matches to projects
        const projectsWithJobTitles = projects.map((project) => {
            const matchInfo = matches.find((match) => match.id === project._id.toString())
            return {
                ...project,
                job_title: matchInfo ? matchInfo.job_title : null,
                percent_match: matchInfo ? matchInfo.percent_match : null,
            }
        })
        // Sort projects by percent_match in descending order
        projectsWithJobTitles.sort((a, b) => {
            return (b.percent_match || 0) - (a.percent_match || 0)
        })

        return projectsWithJobTitles
    } catch (error) {
        console.error('Error calling Dify API:', error.response?.data || error.message)
        throw error
    }
}

export async function matchingTalents(user) {
    const projects = await Project.find({ user_id: user._id }).lean().select('related_industries ')
    const founderProfile = await Profile.find({ user_id: { $ne: user._id } })
        .lean()
        .select('industry  user_id')

    // Get user skills and project requirements
    const skillRequirements = projects.map((project) => ({
        related_industries: project.related_industries,
        // problem_solving: project.problem,
    }))

    const relatedIndustries = [...new Set(skillRequirements.flatMap((item) => item.related_industries))]

    const userSkills = founderProfile.map((profile) => ({
        user_id: profile.user_id,
        industry: profile.industry,
        // skills: Object.keys(profile.areas_of_expertise).reduce((acc, key) => {
        //     if (profile.areas_of_expertise[key].length > 0) {
        //         acc[key] = profile.areas_of_expertise[key]
        //     }
        //     return acc
        // }, {}),
    }))
    // Filter userSkills with industry - skillRequirements.related_industries
    userSkills.forEach((userSkill) => {
        const commonIndustries = userSkill.industry.filter((industry) => relatedIndustries.includes(industry))
        userSkill.industry = commonIndustries
    })

    // Generate prompt for OpenAI API
    const prompt = MATCHING_TALENTS_PROMPT(relatedIndustries, userSkills)
    try {
        const response = await callOpenAI(prompt)
        // const cleanResponse = response.replace(/```json\n|```/g, '')
        // const talentsByMatching = JSON.parse(cleanResponse)

        const jsonString = response.replace('Output:\n', '')
        const jsonData = JSON.parse(jsonString)

        // Matching user_id with User model

        const userIds = Object.keys(jsonData).map((userId) => new ObjectId(userId))
        const result = await User.aggregate([
            {
                $match: {
                    _id: { $in: userIds },
                },
            },
            {
                // Thêm trường mới `_id_str` để lưu `_id` dưới dạng chuỗi
                $addFields: {
                    user_id: { $toString: '$_id' },
                },
            },

            {
                $addFields: {
                    match_score: {
                        $let: {
                            vars: { jsonData }, // Truyền trực tiếp ánh xạ
                            in: {
                                $getField: {
                                    field: '$user_id',
                                    input: '$$jsonData',
                                },
                            },
                        },
                    },
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
                $sort: {
                    match_score: -1,
                },
            },
            {
                $project: {
                    _id: 1, // Giữ lại _id
                    name: 1,
                    match_score: 1,
                    avatar: 1,
                    language: 1,
                },
            },
        ])

        return result
    } catch (error) {
        console.error(error)
        throw error
    }
}
