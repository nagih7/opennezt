import { Profile, Project, ObjectId, Conversation, Type } from '@/models'
// import callOpenAI from '@/configs/openAI'
import { AI_API_TOKEN, AI_API_URL, AI_INTERVIEW_TOKEN } from '@/configs/constants'
import axios from 'axios'
import { CONVERSATION_TYPE, INTERVIEW_CONVERSATION } from '@/configs'

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
        inputs: queryData,
        query: JSON.stringify(queryData),
        response_mode: 'blocking',
        user: user._id.toString(),
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

        for (const match of matches) {
            const project = await Project.findById(new ObjectId(match.id)).lean()
            if (project) {
                match.project = project
            }
        }

        return matches
    } catch (error) {
        console.error('Error calling Dify API:', error.response?.data || error.message)
        throw error
    }
}

export async function startInterview(user, projectId) {
    // Lấy thông tin dự án từ cơ sở dữ liệu
    const project = await Project.aggregate([
        {
            $match: {
                _id: new ObjectId(projectId),
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
                            email: 1,
                            phone: 1,
                        },
                    },
                ],
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
                from: 'project_additional_infos',
                localField: '_id',
                foreignField: 'project_id',
                as: 'additional_infos',
                pipeline: [
                    {
                        $project: {
                            _id: 0,
                            name: 1,
                            content: 1,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: 'project_requirements',
                localField: '_id',
                foreignField: 'project_id',
                as: 'project_requirement',
                pipeline: [
                    {
                        $lookup: {
                            from: 'roles',
                            localField: 'team_role_ids',
                            foreignField: '_id',
                            as: 'team_roles',
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
                            from: 'roles',
                            localField: 'role_ids',
                            foreignField: '_id',
                            as: 'roles',
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
                            localField: 'experience_level_ids',
                            foreignField: '_id',
                            as: 'experience_levels',
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
                        $addFields: {
                            team_roles: {
                                $map: {
                                    input: '$team_roles',
                                    as: 'team_role',
                                    in: '$$team_role.name',
                                },
                            },
                            roles: {
                                $map: {
                                    input: '$roles',
                                    as: 'role',
                                    in: '$$role.name',
                                },
                            },
                            industries: {
                                $map: {
                                    input: '$industries',
                                    as: 'industry',
                                    in: '$$industry.name',
                                },
                            },
                            experience_levels: {
                                $map: {
                                    input: '$experience_levels',
                                    as: 'experience_level',
                                    in: '$$experience_level.name',
                                },
                            },
                            skills: {
                                $map: {
                                    input: '$skills',
                                    as: 'skill',
                                    in: '$$skill.name',
                                },
                            },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            project_id: 0,
                            role_ids: 0,
                            team_role_ids: 0,
                            industry_ids: 0,
                            experience_level_ids: 0,
                            skill_ids: 0,
                            created_at: 0,
                            updated_at: 0,
                        },
                    },
                ],
            },
        },

        {
            $addFields: {
                industries: {
                    $map: {
                        input: '$industries',
                        as: 'industry',
                        in: '$$industry.name',
                    },
                },
                stage: '$stage.name',
            },
        },
        {
            $project: {
                user_id: 0,
                industry_ids: 0,
                stage_id: 0,
                logo: 0,
                background: 0,
                created_at: 0,
                updated_at: 0,
            },
        },
    ])
    // Call API tới AI interview
    const requestData = {
        inputs: {},
        query: JSON.stringify(project[0]),
        response_mode: 'blocking',
        conversation_id: '',
        user: user._id.toString(),
    }
    try {
        const response = await axios.post(`${AI_API_URL}chat-messages`, requestData, {
            headers: {
                Authorization: `Bearer ${AI_INTERVIEW_TOKEN}`,
                'Content-Type': 'application/json',
            },
        })
        const result = typeof response.data === 'object' ? response.data : JSON.parse(response.data)
        // Lấy type cuộc hội thoại interview
        const conversationType = await Type.findOne({
            class: CONVERSATION_TYPE,
            name: INTERVIEW_CONVERSATION,
        }).lean()

        // Tạo cuộc hội thoại
        const conversation = new Conversation({
            conversation_id: result.conversation_id,
            project_id: projectId,
            type_id: conversationType._id,
            data: { user_id: user._id, project_id: new ObjectId(projectId) },
        })
        await conversation.save()

        // Trả về kết quả
        return {
            event: result.event,
            message: {
                _id: result.message_id,
                content: result.answer,
            },
            conversation_id: conversation._id,
        }
    } catch (error) {
        console.error('Error calling Dify API:', error.response?.data || error.message)
        throw error
    }
}
