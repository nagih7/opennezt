import {LINK_STATIC_URL} from '@/configs'
import {Project, FounderProfile, ProjectRequest} from '@/models'
import {FileUpload} from '@/utils/classes'

export async function seekProjects(userId, requestQuery) {
    if (!requestQuery) {
        const industries = await FounderProfile.findOne({user_id: userId}, {industry: 1})
        const projects = await Project.aggregate([
            {
                $match: {
                    related_industries: {$in: industries},
                    user_id: {$ne: userId},
                },
            },
            {
                $lookup: {
                    from: 'notifications_feed',
                    localField: '_id',
                    foreignField: 'source_id',
                    as: 'friend_request',
                    pipeline: [
                        {
                            $match: {
                                source_id: userId,
                                type: 'friend_request',
                            },
                        },
                    ],
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
                    friend_request: {$arrayElemAt: ['$friend_request', 0]},
                },
            },
            {
                $limit: 10,
            },
            {
                $project: {
                    user_id: 1,
                    problem: 1,
                    solution: 1,
                    background: 1,
                    updated_at: 1,
                    name: 1,
                    _id: 1,
                    friend_request: 1,
                },
            },
        ])
        return projects
    } else {
        const {industry, stage, name} = requestQuery
        const query = {user_id: {$ne: userId}}
        if (industry && industry !== 'null') {
            query.related_industries = industry
        }
        if (stage && stage !== 'null') {
            query.stage = stage
        }
        if (name && name !== 'null') {
            query.name = {$regex: name, $options: 'i'}
            query.user_id = {$ne: userId}
        }

        const projects = await Project.aggregate([
            {
                $match: query,
            },
            {
                $lookup: {
                    from: 'notifications_feed',
                    localField: '_id',
                    foreignField: 'source_id',
                    as: 'friend_request',
                    pipeline: [
                        {
                            $match: {
                                source_id: userId,
                                type: 'friend_request',
                            },
                        },
                    ],
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
                    friend_request: {$arrayElemAt: ['$friend_request', 0]},
                },
            },
            {
                $project: {
                    user_id: 1,
                    problem: 1,
                    solution: 1,
                    background: 1,
                    updated_at: 1,
                    name: 1,
                    _id: 1,
                    friend_request: 1,
                },
            },
        ])

        return projects
    }
}

export async function getRequestsToJoinProject(userId) {
    const requests = await ProjectRequest.find({receiver_id: userId}).sort({updatedAt: -1})
    return requests
}

export async function responseRequest(requestData) {
    const {request_id, status} = requestData
    await ProjectRequest.updateOne({_id: request_id}, {status})
}

export async function updateBackground(user, requestBody) {
    if (requestBody.background instanceof FileUpload) {
        const project = await Project.findOne({user_id: user._id, _id: requestBody.project_id})
        if (project.background) {
            FileUpload.remove(project.background)
        }
        project.background = requestBody.background.save('background_projects')
        await project.save()
    }
}
