import { Profile, Project, ObjectId } from '@/models'
// import callOpenAI from '@/configs/openAI'
import { AI_API_TOKEN, AI_API_URL } from '@/configs/constants'
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

    // const queryData = {
    //     industries: ['Technology Software', 'Information Technology'],
    //     experience_level: 'Junior/Associate',
    //     skills: [
    //         'Java',
    //         'Adobe XD',
    //         'InVision',
    //         'Balsamiq',
    //         'Axure RP',
    //         'Blender',
    //         'AutoCAD',
    //         '3ds Max',
    //         'Maya',
    //         'Cinema 4D',
    //         'Unity',
    //         'Unreal Engine',
    //         'HTML',
    //         'CSS',
    //         'JavaScript',
    //         'Webflow',
    //         'WordPress',
    //         'Wix',
    //         'B2B',
    //         'B2C',
    //         'B2B2C',
    //         'B2E',
    //     ],
    //     additional_infos: [
    //         {
    //             name: 'My career goal',
    //             description:
    //                 'I am a recent graduate with a strong foundation in information technology and a passion for software development. I am eager to apply my skills in a dynamic and innovative environment, where I can contribute to exciting projects and continue to learn and grow as a professional.',
    //         },
    //         {
    //             name: 'What I can offer',
    //             description:
    //                 'I have a solid understanding of programming languages such as Java, Python, and C++. I am proficient in web development technologies including HTML, CSS, and JavaScript. Additionally, I have experience with database management systems like MySQL and MongoDB. I am a quick learner and adaptable to new technologies.',
    //         },
    //         {
    //             name: 'Professional summary',
    //             description:
    //                 'I am a motivated and detail-oriented individual with a strong background in information technology. I have experience in software development, web design, and database management. I am passionate about technology and continuously seek to improve my skills and knowledge in the field.',
    //         },
    //     ],
    //     certifications: [
    //         {
    //             name: 'Certified Java Developer',
    //             issuing_organization: 'Oracle',
    //             issue_date: '2022-07-01',
    //             expiration_date: '2025-07-01',
    //         },
    //         {
    //             name: 'AWS Certified Solutions Architect',
    //             issuing_organization: 'Amazon Web Services',
    //             issue_date: '2023-01-15',
    //             expiration_date: '2026-01-15',
    //         },
    //         {
    //             name: 'Google Data Analytics Professional Certificate',
    //             issuing_organization: 'Google',
    //             issue_date: '2023-03-10',
    //             expiration_date: '2026-03-10',
    //         },
    //         {
    //             name: 'Microsoft Certified: Azure Fundamentals',
    //             issuing_organization: 'Microsoft',
    //             issue_date: '2023-05-20',
    //             expiration_date: '2026-05-20',
    //         },
    //     ],
    // }

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
    }))
    userSkills.forEach((userSkill) => {
        const commonIndustries = userSkill.industry.filter((industry) => relatedIndustries.includes(industry))
        userSkill.industry = commonIndustries
    })
}
