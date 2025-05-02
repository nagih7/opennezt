import {
    User,
    Project,
    ObjectId,
    NotificationFeed,
    Industry,
    ExperienceLevel,
    Skill,
    Category,
    Stage,
    Type,
    Role,
    Subscription,
} from '@/models'
import { FileUpload } from '@/utils/classes'
import {
    CANCEL_ACTION,
    FRIEND_REQUEST_NOTIFICATION,
    LINK_STATIC_URL,
    NOTIFICATION_TYPE,
    SEND_ACTION,
    WAITING_STATUS,
} from '@/configs'
import { userSockets } from '@/routes'
import webpush from 'web-push'

export async function create(requestBody) {
    const user = new User(requestBody)
    await user.save()
    return user
}

export async function filter({ q, page, per_page, field, order }) {
    q = q ? q : ''
    order = order === '-1' ? -1 : 1
    const matchStage = {
        $match: {
            $or: [{ name: { $regex: q, $options: 'i' } }, { email: { $regex: q, $options: 'i' } }],
        },
    }

    const sortStage = {
        $sort: { [field]: order },
    }
    const skipStage = {
        $skip: (page - 1) * per_page,
    }
    const limitStage = {
        $limit: per_page,
    }

    const addSetStage = {
        $set: {
            avatar: {
                $cond: {
                    if: { $eq: [{ $ifNull: ['$avatar', ''] }, ''] },
                    then: '$avatar',
                    else: { $concat: [LINK_STATIC_URL, '$avatar'] },
                },
            },
            background: {
                $cond: {
                    if: { $eq: [{ $ifNull: ['$background', ''] }, ''] },
                    then: '$background',
                    else: { $concat: [LINK_STATIC_URL, '$background'] },
                },
            },
        },
    }
    const users = await User.aggregate([matchStage, sortStage, skipStage, limitStage, addSetStage])

    const filter = {
        ...(q && { $or: [{ name: q }, { email: q }, { phone: q }] }),
    }

    const total = await User.countDocuments(filter)
    return { total, page, per_page, users }
}

export async function details(userId) {
    const user = await User.findById(userId)
    user.avatar = user.avatar && LINK_STATIC_URL + user.avatar
    return user
}

export async function update(user, requestBody) {
    user.set(requestBody)
    await user.save()
}

export async function resetPassword(user, newPassword) {
    user.password = newPassword
    await user.save()
}

export async function remove(user) {
    if (user.avatar) {
        FileUpload.remove(user.avatar)
    }
    await User.deleteOne({ _id: user._id })
    await Project.deleteMany({ user_id: user._id })
    await NotificationFeed.deleteMany({ $or: [{ user_id: user._id }, { source_id: user._id }] })
}

export async function updateBackground(user, requestBody) {
    if (requestBody.background instanceof FileUpload) {
        if (user.background) {
            FileUpload.remove(user.background)
        }
        user.background = requestBody.background.save('background_users')
    }
    await user.save()
}

export async function updateAvatar(user, requestBody) {
    if (requestBody.avatar instanceof FileUpload) {
        if (user.avatar) {
            FileUpload.remove(user.avatar)
        }
        user.avatar = requestBody.avatar.save('avatars')
    }
    await user.save()
}

// Industry framework
export async function getIndustries() {
    const industries = await Industry.find().select('name _id description')
    return industries
}

// Experience level framework
export async function getExperienceLevels() {
    const experienceLevels = await ExperienceLevel.find().select('name _id description')
    return experienceLevels
}

// Category framework
export async function getCategories() {
    const categories = await Category.find({
        parent_id: null,
    }).select('name _id description')
    return categories
}

// Subcategory framework
export async function getSubCategories(categoryIds) {
    // Handle comma-separated string of IDs
    const idArray = Array.isArray(categoryIds) ? categoryIds : categoryIds.split(',').map((id) => id.trim())

    const subCategories = await Category.find({
        parent_id: { $in: idArray },
    }).select('name _id description parent_id')

    return subCategories
}

// Skills framework
export async function getSkills(categoryIds) {
    // Handle comma-separated string of IDs
    const idArray = Array.isArray(categoryIds) ? categoryIds : categoryIds.split(',').map((id) => id.trim())

    const skills = await Skill.find({
        category_id: { $in: idArray },
    }).select('name _id description category_id')

    return skills
}

// Stage framework
export async function getStages() {
    const stages = await Stage.find().select('name _id description')
    return stages
}

// Project role framework
export async function getProjectRoles() {
    const roleType = await Type.findOne({ class: 'role', name: 'project_role' })
    const teamRoleType = await Type.findOne({ class: 'role', name: 'project_team_role' })
    const projectRoles = await Role.find({ type_id: roleType._id }).select('name _id description')
    const projectTeamRoles = await Role.find({ type_id: teamRoleType._id }).select('name _id description')
    return { roles: projectRoles, teamRoles: projectTeamRoles }
}

// ========== POST [User - Request Add Friend] ========== //
export async function sendFriendRequest(user, { userId }, { action }, io) {
    const requestType = await Type.findOne({ class: NOTIFICATION_TYPE, name: FRIEND_REQUEST_NOTIFICATION })
    switch (action) {
        case SEND_ACTION: {
            const newNotification = new NotificationFeed({
                user_id: new ObjectId(userId),
                source_id: user._id,
                type_id: requestType._id,
                metadata: {
                    read: false,
                    status: WAITING_STATUS,
                },
            })
            await newNotification.save()

            const notification = await NotificationFeed.aggregate([
                { $match: { _id: newNotification._id } },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'source_id',
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
                                    _id: 0,
                                    name: 1,
                                    avatar: 1,
                                },
                            },
                        ],
                    },
                },
                { $unwind: '$user' },
                {
                    $lookup: {
                        from: 'types',
                        localField: 'type_id',
                        foreignField: '_id',
                        as: 'type',
                        pipeline: [
                            {
                                $project: {
                                    _id: 0,
                                    class: 1,
                                    name: 1,
                                },
                            },
                        ],
                    },
                },
                { $unwind: '$type' },
                {
                    $project: {
                        _id: 1,
                        user_id: 0,
                        source_id: 0,
                        type_id: 0,
                    },
                },
            ]).exec()

            if (notification.length > 0) {
                // ========== SEND NOTIFICATION ========== //
                const userSocketId = Object.keys(userSockets).find((socketId) => userSockets[socketId] === userId)
                io.to(userSocketId).emit(FRIEND_REQUEST_NOTIFICATION, notification[0])

                // ========== [WEBPUSH] ========== //
                const subscription = await Subscription.findOne({ user_id: userId })
                if (subscription) {
                    const payload = JSON.stringify({
                        title: 'OpenNezt',
                        body: `${user.name} sent you a friend request`,
                        icon: user.avatar ? user.avatar : null,
                        tag: requestType._id,
                        data: {
                            url: '',
                            type: FRIEND_REQUEST_NOTIFICATION,
                        },
                    })
                    webpush.sendNotification(subscription, payload).catch(async (err) => {
                        if (err.statusCode === 410 || err.statusCode === 404) {
                            await Subscription.deleteOne({ endpoint: subscription.endpoint })
                        } else {
                            console.error('Error sending notification:', err)
                        }
                    })
                }
            }
            return {
                _id: newNotification._id,
                source_id: newNotification.source_id,
                metadata: newNotification.metadata,
                timestamp: newNotification.timestamp,
            }
        }
        case CANCEL_ACTION: {
            const notification = await NotificationFeed.deleteOne({
                user_id: new ObjectId(userId),
                source_id: user._id,
                type_id: requestType._id,
            })
            if (!notification.deletedCount) {
                throw new Error('Notification not found')
            } else {
                return
            }
        }
        default:
            throw new Error('Invalid action type')
    }
}
