import {LINK_STATIC_URL} from '@/configs'
import {Project, NotificationFeed, ObjectId} from '@/models'
import {FileUpload} from '@/utils/classes'

export async function seekProjects(user, requestQuery) {
    const query = {user_id: {$ne: user._id}}
    const per_page = 6

    if (requestQuery.industry) {
        query.related_industries = {
            $regex: requestQuery.industry,
            $options: 'i',
        }
    }
    if (requestQuery.stage) {
        query.stage = {
            $regex: requestQuery.stage,
            $options: 'i',
        }
    }
    if (requestQuery.name) {
        query.name = {
            $regex: requestQuery.name,
            $options: 'i',
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
            $skip: per_page * requestQuery.page,
        },
        {
            $limit: per_page,
        },
        {
            $project: {
                related_industries: 1,
                stage: 1,
                background: 1,
                user_id: 1,
                created_at: 1,
                name: 1,
                _id: 1,
            },
        },
    ])

    return {total: projects.length, page: requestQuery.page + 1, per_page, projects}
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
    return invitations
}
