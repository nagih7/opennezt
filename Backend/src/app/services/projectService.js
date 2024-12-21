import {LINK_STATIC_URL} from '@/configs'
import {Project, FounderProfile, ProjectRequest, NotificationFeed, ObjectId} from '@/models'
import {FileUpload} from '@/utils/classes'

export async function seekProjects(userId, requestQuery) {
    const query = {user_id: {$ne: userId}}

    if (!requestQuery) {
        const industries = await FounderProfile.findOne({user_id: userId}, {industry: 1})
        ;(query.related_industries = {$in: industries}), (query.user_id = {$ne: userId})
    } else {
        const {industry, stage, name} = requestQuery
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
    }

    const projects = await Project.aggregate([
        {
            $match: query,
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
            $limit: 10,
        },
        {
            $project: {
                problem: 1,
                solution: 1,
                background: 1,
                created_at: 1,
                name: 1,
                _id: 1,
            },
        },
    ])
    return projects
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

export async function getInvitations(userId, user_id) {
    const invitations = await NotificationFeed.aggregate([
        {
            $match: {
                source_id: userId,
                user_id: new ObjectId(user_id),
                type: 'project_invitation',
                'metadata.status': {$in: ['waiting', 'accepted']},
            },
        },
        {
            $lookup: {
                from: 'projects',
                localField: 'metadata.project_id',
                foreignField: '_id',
                as: 'project',
            },
        },
        {
            $unwind: '$project',
        },
        {
            $addFields: {
                'metadata.project': {
                    name: '$project.name',
                    _id: '$project._id',
                },
            },
        },
        {
            $project: {
                _id: 0,
                created_at: 1,
                type: 1,
                metadata: {
                    status: 1,
                    project: 1,
                },
            },
        },
    ])
    console.log(invitations)
    return invitations
}
