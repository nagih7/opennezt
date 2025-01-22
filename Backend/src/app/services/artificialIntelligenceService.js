import {FounderProfile, Project, User, ObjectId} from '@/models'
import callOpenAI from '@/configs/openAI'
import {LINK_STATIC_URL, MATCHING_PROJECTS_PROMPT, MATCHING_TALENTS_PROMPT} from '@/configs/constants'

export async function matchingProjects(user) {
    const founderProfile = await FounderProfile.findOne({user_id: user._id}).lean()
    const projects = await Project.aggregate([
        {
            $match: {
                user_id: {$ne: user._id},
            },
        },
        {
            $addFields: {
                background: {
                    $cond: {
                        if: {$eq: [{$ifNull: ['$background', '']}, '']},
                        then: '$background',
                        else: {$concat: [LINK_STATIC_URL, '$background']},
                    },
                },
            },
        },
        {
            $project: {
                related_industries: 1,
                stage: 1,
                user_id: 1,
                created_at: 1,
                name: 1,
                _id: 1,
                background: 1,
            },
        },
    ])

    // Get user skills and project requirements
    const userSkills = {
        industry: founderProfile.industry,
        skills: founderProfile.areas_of_expertise,
    }
    const skillRequirements = projects.map((project) => ({
        _id: project._id,
        related_industries: project.related_industries,
        // problem_solving: project.problem,
    }))

    // Generate prompt for OpenAI API
    const prompt = MATCHING_PROJECTS_PROMPT(userSkills, skillRequirements)

    // Call OpenAI API to get matching projects
    try {
        const response = await callOpenAI(prompt)
        const cleanResponse = response.replace(/```json\n|```/g, '')
        const projectsByMatching = JSON.parse(cleanResponse)

        // Filter projects with projectsByMatching
        const result = projects
            .map((project) => {
                const match = projectsByMatching.find((p) => p.projectId === project._id.toString())
                if (match) {
                    return {
                        ...project,
                        matchScore: match.matchScore,
                    }
                } else {
                    return null
                }
            })
            .filter((project) => project !== null)
            .sort((a, b) => b.matchScore - a.matchScore)

        return result
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function matchingTalents(user) {
    const projects = await Project.find({user_id: user._id}).lean().select('related_industries ')
    const founderProfile = await FounderProfile.find({user_id: {$ne: user._id}})
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
        const cleanResponse = response.replace(/```json\n|```/g, '')
        const talentsByMatching = JSON.parse(cleanResponse)

        // Matching user_id with User model

        const userIds = Object.keys(talentsByMatching).map((userId) => new ObjectId(userId))
        const result = await User.aggregate([
            {
                $match: {
                    _id: {$in: userIds},
                },
            },
            {
                // Thêm trường mới `_id_str` để lưu `_id` dưới dạng chuỗi
                $addFields: {
                    user_id: {$toString: '$_id'},
                },
            },

            {
                $addFields: {
                    match_score: {
                        $let: {
                            vars: {talentsByMatching}, // Truyền trực tiếp ánh xạ
                            in: {
                                $getField: {
                                    field: '$user_id',
                                    input: '$$talentsByMatching',
                                },
                            },
                        },
                    },
                    avatar: {
                        $cond: {
                            if: {$eq: [{$ifNull: ['$avatar', '']}, '']},
                            then: '$avatar',
                            else: {$concat: [LINK_STATIC_URL, '$avatar']},
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
