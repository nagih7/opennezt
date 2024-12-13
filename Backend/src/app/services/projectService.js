import {LINK_STATIC_URL} from '@/configs'
import {Project, FounderProfile, ProjectRequest, User} from '@/models'

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
                    from: 'project_requests',
                    localField: '_id',
                    foreignField: 'project_id',
                    as: 'project_request',
                    pipeline: [
                        {
                            $match: {
                                sender_id: userId,
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
                    project_request: {$arrayElemAt: ['$project_request', 0]},
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
                    project_request: {
                        status: 1,
                    },
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
                    from: 'project_requests',
                    localField: '_id',
                    foreignField: 'project_id',
                    as: 'project_request',
                    pipeline: [
                        {
                            $match: {
                                sender_id: userId,
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
                    project_request: {$arrayElemAt: ['$project_request', 0]},
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
                    project_request: {
                        status: 1,
                    },
                },
            },
        ])

        return projects
    }
}

export async function requestToJoinProject(user, requestProjectData) {
    const {project_id, project_name, owner_id, role} = requestProjectData
    const owner = await User.findOne({_id: owner_id}, {name: 1})

    const existingRequest = await ProjectRequest.findOne({
        sender_id: user._id,
        receiver_id: owner_id,
        project_id,
    })

    if (existingRequest) {
        if (existingRequest.status === 'rejected') {
            await ProjectRequest.updateOne(
                {_id: existingRequest._id},
                {
                    $set: {
                        status: 'waiting',
                        role: role,
                        updatedAt: new Date(),
                    },
                }
            )
            return
        }
    }

    const newRequest = new ProjectRequest({
        sender_id: user._id,
        project_name: project_name,
        sender_name: user.name,
        receiver_id: owner_id,
        receiver_name: owner.name,
        role,
        project_id,
        status: 'waiting',
    })

    await newRequest.save()
}

export async function getRequestsToJoinProject(userId) {
    const requests = await ProjectRequest.find({receiver_id: userId}).sort({updatedAt: -1})
    return requests
}

export async function responseRequest(requestData) {
    const {request_id, status} = requestData
    await ProjectRequest.updateOne({_id: request_id}, {status})
}
