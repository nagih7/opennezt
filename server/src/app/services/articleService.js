import { FileUpload } from '@/utils/classes'
import Article from '@/models/article'
import Reaction from '@/models/reaction'
import Comment from '@/models/comment'
import {
    ARTICLE_COMMENT,
    ARTICLE_COMMENT_NOTIFICATION,
    ARTICLE_CREATE,
    ARTICLE_LIKE_NOTIFICATION,
    ARTICLE_REACTION,
    ARTICLE_REPLY_COMMENT,
    ARTICLE_SAVE,
    ARTICLE_TYPE,
    ARTICLE_UPDATE,
    COMMENT_REPLY_NOTIFICATION,
    LINK_STATIC_URL,
} from '@/configs'
import delay from '@/utils/classes/delay'
import Project from '@/models/project'
import Bookmark from '@/models/bookmark'
import Type from '@/models/type'
import AccessLog from '@/models/accessLog'
import ActivityLog from '@/models/activityLog'
import Subscription from '@/models/subscription'
import webpush from 'web-push'
import Role from '@/models/role'
import { ObjectId } from '@/models'

//Create Article
//Lấy project_id ra khỏi requestBody => requestBody không còn project_id nữa
export const createArticle = async (user, requestBody) => {
    const filesArray = requestBody.content.attachment

    if (filesArray && filesArray.length > 0) {
        const listAttachment = []

        for (const file of filesArray) {
            if (file instanceof FileUpload) {
                const savedFile = await file.save('article-attachment')
                listAttachment.push(savedFile)
            }
        }
        requestBody.content.attachment = listAttachment
    }

    if (!requestBody.project_id) {
        requestBody.project_id = null
    }

    const newArticle = new Article(requestBody)
    newArticle.user_id = user._id
    await newArticle.save()
    await delay(2000)
    return newArticle
}
//End Create Article

//Scroll Feed
export const getArticleList = async (user, requestQuery) => {
    const { limit = 5, cursor } = requestQuery

    const articleLimit = parseInt(limit)

    const fixedCursor = cursor.replace(' ', '+')

    const articleList = await Article.aggregate([
        {
            $match: {
                created_at: { $lt: new Date(fixedCursor) },
                // $or: [{audience: 'public'}, {audience: 'friends', user_id: {$in: friendIds}}],
                status: 'published',
            },
        },
        // {
        //     $lookup: {
        //         from: 'users',
        //         localField: 'user_id',
        //         foreignField: '_id',
        //         as: 'user',
        //     },
        // },
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
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
                            _id: 1,
                            name: 1,
                            avatar: 1,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: 'projects',
                localField: 'project_id',
                foreignField: '_id',
                as: 'project',
            },
        },
        {
            $addFields: {
                'content.attachment': {
                    $map: {
                        input: '$content.attachment',
                        as: 'attachment',
                        in: {
                            $cond: {
                                if: { $eq: [{ $ifNull: ['$$attachment', ''] }, ''] },
                                then: '$$attachment',
                                else: { $concat: [LINK_STATIC_URL, '$$attachment'] },
                            },
                        },
                    },
                },
            },
        },
        {
            $sort: { created_at: -1 },
        },
        {
            $limit: articleLimit,
        },
    ])
    // const articleList = await Article.find({
    //     created_at: {$lt: new Date(fixedCursor)},
    //     // $or: [{audience: 'public'}, {audience: 'friends', user_id: {$in: friendIds}}],
    //     status: 'published',
    // })
    //     .sort({created_at: -1}) //Sắp xếp giảm dần theo thời gian
    //     .limit(articleLimit)

    //Tìm cursor mới cho phần load trang tiếp theo
    //Nếu có phần tử trong articleList
    //Gán phần thử cuối cùng trong articleList `articleList.length - 1`
    const next_cursor = articleList.length > 0 ? articleList[articleList.length - 1].created_at : null

    return {
        articleList,
        next_cursor, // Cursor cho lần tiếp theo
        has_more: !!next_cursor, // Xác định còn dữ liệu không
    }
}
//End Scroll Feed

//Update Comment
export const updateComment = async (user, requestBody) => {
    const comment = await Comment.findById(requestBody.comment_id)
    if (!comment) {
        throw new Error('Không tìm thấy bình luận này')
    }
    if (comment.user_id.toString() !== user._id.toString()) {
        throw new Error('Bạn không có quyền chỉnh sửa bình luận của người khác')
    }
    comment.content = requestBody.content
    await comment.save()
    return comment
}

//Delete Comment
export const deleteComment = async (user, requestBody) => {
    const ownArticle = await Comment.findById(requestBody.article_id.user_id)
    const comment = await Comment.findById(requestBody.comment_id)
    if (!comment) {
        throw new Error('Không tìm thấy bình luận này')
    }
    if (comment.user_id.toString() !== user._id.toString()) {
        throw new Error('Bạn không có quyền xóa bình luận của người khác')
    }
    await comment.deleteOne()
    await ownArticle.comment.pull(comment._id)
    await ownArticle.save()
    return comment
}

//Delete Article
export const deleteArticle = async (user, id) => {
    const validArticle = await Article.findById(id)

    if (!validArticle) {
        return "can't find article"
    }

    const role = await Role.findById(user.role_id)
    console.log('role', role.name)

    // Kiểm tra role trước
    if (role.name === 'Super Admin' || role.name === 'Admin') {
        await Comment.deleteMany({ article_id: id })
        await Article.findByIdAndDelete(id)
        return 'Delete Article Success'
    }

    // Nếu không phải admin, kiểm tra quyền sở hữu
    if (validArticle.user_id.toString() === user._id.toString()) {
        await Comment.deleteMany({ article_id: id })
        await Article.findByIdAndDelete(id)
        return 'Delete Article Success'
    }

    return "You don't have permission to delete"
}
//End Delete Article

//Update Article
export const updateArticle = async (user_id, id, requestBody) => {
    const validArticle = await Article.findById(id)

    if (!validArticle) {
        throw new Error('Article not found')
    }

    // Kiểm tra quyền sở hữu bài viết
    if (validArticle.user_id.toString() === user_id.toString()) {
        const filesArray = requestBody.content.attachment

        if (filesArray && filesArray.length > 0) {
            const listAttachment = []

            for (const file of filesArray) {
                // Nếu là string (URL), chỉ lấy phần path sau 'uploads'
                if (typeof file === 'string') {
                    const uploadIndex = file.indexOf('uploads')
                    if (uploadIndex !== -1) {
                        listAttachment.push(file.substring(uploadIndex))
                    } else {
                        listAttachment.push(file)
                    }
                    continue
                }

                // Nếu là FileUpload instance, lưu mới
                if (file instanceof FileUpload) {
                    const savedFile = await file.save('article-attachment')
                    listAttachment.push(savedFile)
                    continue
                }
            }

            requestBody.content.attachment = listAttachment
        }

        if ('project_id' in requestBody) {
            if (requestBody.project_id === 'null' || requestBody.project_id === null) {
                requestBody.project_id = null
                requestBody.project = []
            } else {
                const updatedProject = await Project.findById(requestBody.project_id)
                if (updatedProject) {
                    requestBody.project = [updatedProject]
                } else {
                    throw new Error('Project not found')
                }
            }
        }

        // Cập nhật bài viết với mảng project mới nếu có thay đổi
        const updatedArticle = await Article.findByIdAndUpdate(id, { ...requestBody }, { new: true })
        await delay(2000)
        return updatedArticle
    }

    throw new Error("You don't have permission to edit this article")
}

//Phải dùng ... không nếu để requestBody thì sẽ bị lưu trong db là một trường có tên là requestBody

//End Update Article

//Article Reaction
//Article Reaction
export const reactArticle = async (id, user, requestBody) => {
    const target_type = requestBody.target_type
    const type = requestBody.type
    const user_id = user._id.toString()

    const existingReaction = await Reaction.findOne({
        target_id: id,
        user_id: user_id,
    })

    if (target_type === 'article') {
        const article = await Article.findById(id)
        if (existingReaction) {
            if (existingReaction.type === type) {
                // Delete the reaction
                await Reaction.deleteOne({ _id: existingReaction._id })
                article.reaction_count = article.reaction_count - 1
                await deleteActivityReactionArticle(user, id)
                await article.save()
            } else {
                existingReaction.type = type
                await existingReaction.save()
            }
        } else {
            const newReaction = await new Reaction({
                target_id: id,
                user_id: user_id,
                type: type,
                target_type: 'article',
            })
            await newReaction.save()
            article.reaction_count = article.reaction_count + 1
            await article.save()

            // Create activity record for the new reaction
            await postActivityReactionArticle(user, id)

            // Gửi web push khi người dùng thích bài viết và không phải tự thích bài viết của mình
            if (type === 'like' && article.user_id.toString() !== user_id) {
                try {
                    // Lấy loại thông báo
                    const notificationType = await Type.findOne({
                        class: ARTICLE_TYPE,
                        name: ARTICLE_LIKE_NOTIFICATION,
                    })

                    if (notificationType) {
                        // Kiểm tra và gửi web push notification
                        const subscription = await Subscription.findOne({ user_id: article.user_id })

                        if (subscription) {
                            const payload = JSON.stringify({
                                title: 'OpenNezt',
                                body: `${user.name} liked your post`,
                                icon: user.avatar ? user.avatar : null,
                                tag: ARTICLE_LIKE_NOTIFICATION,
                                data: {
                                    url: `/article/${article._id}`,
                                    type: ARTICLE_LIKE_NOTIFICATION,
                                    article_id: article._id.toString(),
                                },
                            })

                            try {
                                await webpush.sendNotification(subscription, payload)
                            } catch (err) {
                                console.error('Web Push Error:', err.message)

                                if (err.statusCode === 410 || err.statusCode === 404) {
                                    await Subscription.deleteOne({ user_id: article.user_id })
                                }
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error in notification process:', error)
                }
            }
        }
    }

    if (target_type === 'comment') {
        // Same logic for comments
        const comment = await Comment.findById(id)
        if (existingReaction) {
            if (existingReaction.type === type) {
                await Reaction.deleteOne({ _id: existingReaction._id })
                comment.reaction_count -= 1
                await comment.save()
            } else {
                existingReaction.type = type
                await existingReaction.save()
            }
        } else {
            const newReaction = await new Reaction({
                target_id: id,
                user_id: user_id,
                type: type,
                target_type: 'comment',
            })
            await newReaction.save()
            comment.reaction_count += 1
            await comment.save()

            // Gửi web push khi người dùng thích comment và không phải tự thích comment của mình
            if (type === 'like' && comment.user_id.toString() !== user_id) {
                try {
                    // Lấy loại thông báo (có thể cần tạo thêm COMMENT_LIKE_NOTIFICATION trong configs)
                    const notificationType = await Type.findOne({
                        class: ARTICLE_TYPE,
                        name: ARTICLE_LIKE_NOTIFICATION, // Có thể sử dụng COMMENT_LIKE_NOTIFICATION nếu cần riêng
                    })

                    if (notificationType) {
                        // Kiểm tra và gửi web push notification
                        const subscription = await Subscription.findOne({ user_id: comment.user_id })

                        if (subscription) {
                            // Lấy thông tin bài viết để hiển thị trong thông báo
                            // const article = await Article.findById(comment.article_id)

                            const payload = JSON.stringify({
                                title: 'OpenNezt',
                                body: `${user.name} liked your comment`,
                                icon: user.avatar ? user.avatar : null,
                                tag: ARTICLE_LIKE_NOTIFICATION,
                                data: {
                                    url: `/article/${comment.article_id}`, // Dẫn đến bài viết có comment
                                    type: ARTICLE_LIKE_NOTIFICATION,
                                    comment_id: comment._id.toString(),
                                    article_id: comment.article_id.toString(),
                                },
                            })

                            try {
                                await webpush.sendNotification(subscription, payload)
                            } catch (err) {
                                console.error('Web Push Error:', err.message)

                                if (err.statusCode === 410 || err.statusCode === 404) {
                                    await Subscription.deleteOne({ user_id: comment.user_id })
                                }
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error in comment notification process:', error)
                }
            }
        }
    }
}
//End Article Reaction

//Get Article By Id
export const getArticleById = async id => {
    const article = await Article.findById(id).lean()

    if (article?.content?.attachment) {
        article.content.attachment = article.content.attachment.map(attachment => (attachment ? LINK_STATIC_URL + attachment : attachment))
    }

    return article
}
//End Get Article By Id

//Share article
export const shareArticle = async (id, user) => {
    //nhớ tìm hiểu lean
    const shareArticle = await Article.findById(id).lean()
    const { ...articleData } = shareArticle

    const newArticle = await new Article({
        ...articleData,
        user_id: user._id,
        parent_id: id,
    })
    await newArticle.save()
}
//End share article

//Replycomment
export const replyComment = async (user, requestBody) => {
    const { comment_id, article_id } = requestBody
    const parentComment = await Comment.findById(comment_id)
    const updatedArticle = await Article.findById(article_id)
    const imageData = requestBody.content.image
    if (typeof imageData === 'string') {
        if (imageData === '') {
            requestBody.content.image = imageData
        } else {
            requestBody.content.image = imageData.indexOf('uploads')
        }
    }
    if (imageData instanceof FileUpload) {
        requestBody.content.image = await imageData.save('article-attachment')
    }

    const newComment = await new Comment({
        ...requestBody,
        user_id: user._id,
        parent_id: comment_id,
        article_id: article_id,
    })
    updatedArticle.comment_count += 1
    parentComment.reply_count += 1
    await parentComment.save()
    await updatedArticle.save()
    await newComment.save()
    await postActivityReplyComment(user, newComment._id)

    // Gửi web push khi người dùng trả lời bình luận và không phải tự trả lời bình luận của mình
    if (parentComment.user_id.toString() !== user._id.toString()) {
        try {
            // Lấy loại thông báo
            const notificationType = await Type.findOne({
                class: ARTICLE_TYPE,
                name: COMMENT_REPLY_NOTIFICATION,
            })

            if (notificationType) {
                // Kiểm tra và gửi web push notification
                const subscription = await Subscription.findOne({ user_id: parentComment.user_id })

                if (subscription) {
                    const payload = JSON.stringify({
                        title: 'OpenNezt',
                        body: `${user.name} replied to your comment`,
                        icon: user.avatar ? user.avatar : null,
                        tag: COMMENT_REPLY_NOTIFICATION,
                        data: {
                            url: `/article/${article_id}`,
                            type: COMMENT_REPLY_NOTIFICATION,
                            article_id: article_id.toString(),
                            comment_id: comment_id.toString(),
                            reply_id: newComment._id.toString(),
                        },
                    })

                    try {
                        await webpush.sendNotification(subscription, payload)
                    } catch (err) {
                        console.error('Web Push Error:', err.message)

                        if (err.statusCode === 410 || err.statusCode === 404) {
                            await Subscription.deleteOne({ user_id: parentComment.user_id })
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error in reply notification process:', error)
        }
    }

    return newComment
}
//Get Article's Reactions
export const getArticleReactions = async target_id => {
    const reactions = await Reaction.find({
        target_id: target_id,
    })
    return reactions
}
//End Get Article's Reactions

//Get User's Reactions
export const getUserReactions = async (user_id, target_ids) => {
    // Chuyển đổi string thành array và map thành ObjectId
    const targetIdArray = target_ids.split(',').map(id => new ObjectId(id))

    const reactions = await Reaction.find({
        user_id: user_id,
        target_id: { $in: targetIdArray },
    })

    return reactions
}
//End Get User's Reactions

//Get Comment List
export const getCommentList = async (user, requestQuery) => {
    const { articleId, page, limit = 10 } = requestQuery
    const skip = (page - 1) * limit
    const commentLimit = parseInt(limit)

    const commentList = await Comment.aggregate([
        {
            $match: {
                article_id: new ObjectId(articleId),
                parent_id: null,
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user',
                pipeline: [
                    {
                        $addFields: {
                            avatar: {
                                $cond: {
                                    if: { $eq: [{ $ifNull: ['$avatar', ''] }, ''] },
                                    then: '',
                                    else: { $concat: [LINK_STATIC_URL, '$avatar'] },
                                },
                            },
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            avatar: 1,
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                'content.image': {
                    $cond: {
                        if: { $eq: [{ $ifNull: ['$content.image', ''] }, ''] },
                        then: '',
                        else: { $concat: [LINK_STATIC_URL, '$content.image'] },
                    },
                },
            },
        },
        {
            $sort: { created_at: -1 },
        },
        {
            $skip: skip,
        },
        {
            $limit: commentLimit + 1,
        },
    ])

    // Kiểm tra xem có còn comments không
    const hasMore = commentList.length > commentLimit

    // Nếu có comment phụ thì bỏ đi
    if (hasMore) {
        commentList.pop()
    }

    return {
        commentList,
        pagination: {
            currentPage: parseInt(page),
            limit: commentLimit,
            hasMore,
        },
    }
}

export const getReplyCommentList = async (user, requestQuery) => {
    const { articleId, parentId, page, limit = 3 } = requestQuery
    const skip = (page - 1) * limit
    const commentLimit = parseInt(limit)

    const commentList = await Comment.aggregate([
        {
            $match: {
                article_id: new ObjectId(articleId),
                parent_id: new ObjectId(parentId),
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user',
                pipeline: [
                    {
                        $addFields: {
                            avatar: {
                                $cond: {
                                    if: { $eq: [{ $ifNull: ['$avatar', ''] }, ''] },
                                    then: '',
                                    else: { $concat: [LINK_STATIC_URL, '$avatar'] },
                                },
                            },
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            avatar: 1,
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                'content.image': {
                    $cond: {
                        if: { $eq: [{ $ifNull: ['$content.image', ''] }, ''] },
                        then: '',
                        else: { $concat: [LINK_STATIC_URL, '$content.image'] },
                    },
                },
            },
        },
        {
            $skip: skip,
        },
        {
            $limit: commentLimit + 1,
        },
    ])

    // Kiểm tra xem có còn comments không
    const hasMore = commentList.length > commentLimit

    // Nếu có comment phụ thì bỏ đi
    if (hasMore) {
        commentList.pop()
    }

    return {
        commentList,
        pagination: {
            currentPage: parseInt(page),
            limit: commentLimit,
            hasMore,
        },
    }
}

//Create Comment
export const createComment = async (user, requestBody) => {
    const articleId = requestBody.article_id
    const imageData = requestBody.content.image

    if (typeof imageData === 'string') {
        if (imageData === '') {
            requestBody.content.image = imageData
        } else {
            requestBody.content.image = imageData.indexOf('uploads')
        }
    }
    if (imageData instanceof FileUpload) {
        requestBody.content.image = await imageData.save('article-attachment')
    }

    const newComment = new Comment({
        ...requestBody,
        user_id: user._id,
        reaction_count: 0,
    })

    await newComment.save()

    await Article.findByIdAndUpdate(articleId, { $inc: { comment_count: 1 } })

    await postActivityComment(user, newComment._id)

    // Lấy thông tin bài viết để gửi thông báo cho chủ bài viết
    const article = await Article.findById(articleId)

    // Gửi web push khi người dùng bình luận và không phải tự bình luận bài viết của mình
    if (article.user_id.toString() !== user._id.toString()) {
        try {
            // Lấy loại thông báo
            const notificationType = await Type.findOne({
                class: ARTICLE_TYPE,
                name: ARTICLE_COMMENT_NOTIFICATION,
            })

            if (notificationType) {
                // Kiểm tra và gửi web push notification
                const subscription = await Subscription.findOne({ user_id: article.user_id })

                if (subscription) {
                    const payload = JSON.stringify({
                        title: 'OpenNezt',
                        body: `${user.name} commented on your post`,
                        icon: user.avatar ? user.avatar : null,
                        tag: ARTICLE_COMMENT_NOTIFICATION,
                        data: {
                            url: `/article/${article._id}`,
                            type: ARTICLE_COMMENT_NOTIFICATION,
                            article_id: article._id.toString(),
                            comment_id: newComment._id.toString(),
                        },
                    })

                    try {
                        await webpush.sendNotification(subscription, payload)
                    } catch (err) {
                        console.error('Web Push Error:', err.message)

                        if (err.statusCode === 410 || err.statusCode === 404) {
                            await Subscription.deleteOne({ user_id: article.user_id })
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error in comment notification process:', error)
        }
    }

    return newComment
}
//End Create Comment

//Get User Comment Reactions

export const getUserCommentReactions = async (user_id, target_ids) => {
    // Chuyển đổi string thành array và map thành ObjectId
    const targetIdArray = target_ids.split(',').map(id => new ObjectId(id))

    const reactions = await Reaction.find({
        user_id: user_id,
        target_id: { $in: targetIdArray },
    })

    return reactions
}

export const bookmarkArticle = async (requestBody, user) => {
    const { article_id, marked } = requestBody
    const user_id = user._id.toString()

    const existingBookmark = await Bookmark.findOne({
        target_id: article_id,
        target_type: 'article',
        user_id: user_id,
    })

    if (existingBookmark) {
        existingBookmark.marked = marked
        await existingBookmark.save()
        return existingBookmark
    } else {
        const newBookmark = new Bookmark({
            user_id: user_id,
            target_id: article_id,
            target_type: 'article',
            marked: marked,
        })
        await newBookmark.save()
        return newBookmark
    }
}

export const getUserBookmarks = async (user, article_ids) => {
    const user_id = user._id
    const articleIdsArray = article_ids.split(',').map(id => new Object(id))

    const bookMarks = await Bookmark.find({
        user_id: user_id,
        target_id: { $in: articleIdsArray },
        target_type: 'article',
    })

    return bookMarks
}

// ========== POST [ARTICLE ACTIVITIES] ========== //
export const postActivityCreateArticle = async user => {
    const articleCreateType = await Type.findOne({ class: ARTICLE_TYPE, name: ARTICLE_CREATE })
    const newActivity = new AccessLog({
        user_id: user._id,
        type_id: articleCreateType._id,
        metadata: {},
    })
    await newActivity.save()
    return newActivity
}

export const postActivityUpdateArticle = async (user, articleId) => {
    const article = await Article.findById(new ObjectId(articleId))
    const articleUpdateType = await Type.findOne({ class: ARTICLE_TYPE, name: ARTICLE_UPDATE })
    const oldActivity = await ActivityLog.findOne({
        user_id: user._id,
        type_id: articleUpdateType._id,
        'data.article_id': article._id,
    })

    if (oldActivity) {
        oldActivity.timestamp = new Date()
        await oldActivity.save()
    } else {
        const newActivity = new ActivityLog({
            user_id: user._id,
            type_id: articleUpdateType._id,
            data: { article_id: article._id, project_id: article.project_id, owner_id: article.user_id },
            metadata: {},
        })

        await newActivity.save()
        return newActivity
    }
}

export const postActivitySaveArticle = async (user, articleId) => {
    const article = await Article.findById(new ObjectId(articleId))
    const articleSaveType = await Type.findOne({ class: ARTICLE_TYPE, name: ARTICLE_SAVE })
    const oldActivity = await ActivityLog.findOne({
        user_id: user._id,
        type_id: articleSaveType._id,
        'data.article_id': article._id,
    })

    if (oldActivity) {
        oldActivity.timestamp = new Date()
        await oldActivity.save()
    } else {
        const newActivity = new ActivityLog({
            user_id: user._id,
            type_id: articleSaveType._id,
            data: { article_id: article._id, project_id: article.project_id, owner_id: article.user_id },
            metadata: {},
        })

        await newActivity.save()
        return newActivity
    }
}

export const postActivityReactionArticle = async (user, articleId) => {
    const article = await Article.findById(new ObjectId(articleId))
    const articleReactionType = await Type.findOne({ class: ARTICLE_TYPE, name: ARTICLE_REACTION })
    const oldActivity = await ActivityLog.findOne({
        user_id: user._id,
        type_id: articleReactionType._id,
        'data.article_id': article._id,
    })

    if (oldActivity) {
        oldActivity.timestamp = new Date()
        await oldActivity.save()
    } else {
        const newActivity = new ActivityLog({
            user_id: user._id,
            type_id: articleReactionType._id,
            data: { article_id: article._id, project_id: article.project_id, owner_id: article.user_id },
            metadata: {},
        })

        await newActivity.save()
        return newActivity
    }
}

export const postActivityReplyComment = async (user, commentId) => {
    const comment = await Comment.findById(new ObjectId(commentId))
    const parentComment = await Comment.findById(new ObjectId(comment?.parent_id))
    const commentReplyType = await Type.findOne({ class: ARTICLE_TYPE, name: ARTICLE_REPLY_COMMENT })
    const oldActivity = await ActivityLog.findOne({
        user_id: user._id,
        type_id: commentReplyType._id,
        'data.comment_id': comment._id,
    })

    if (oldActivity) {
        oldActivity.timestamp = new Date()
        await oldActivity.save()
    } else {
        const newActivity = new ActivityLog({
            user_id: user._id,
            type_id: commentReplyType._id,
            data: { comment_id: comment._id, article_id: comment.article_id, owner_id: parentComment.user_id },
            metadata: {},
        })
        await newActivity.save()
        return newActivity
    }
}

export const postActivityComment = async (user, commentId) => {
    const comment = await Comment.findById(new ObjectId(commentId))
    const article = await Article.findById(comment.article_id)
    const commentType = await Type.findOne({ class: ARTICLE_TYPE, name: ARTICLE_COMMENT })
    const oldActivity = await ActivityLog.findOne({
        user_id: user._id,
        type_id: commentType._id,
        'data.comment_id': comment._id,
    })

    if (oldActivity) {
        oldActivity.timestamp = new Date()
        await oldActivity.save()
    } else {
        const newActivity = new ActivityLog({
            user_id: user._id,
            type_id: commentType._id,
            data: { comment_id: comment._id, article_id: article._id, owner_id: article.user_id },
            metadata: {},
        })

        await newActivity.save()
        return newActivity
    }
}

// ========== GET [ARTICLE ACTIVITIES] ========== //
export const getArticleActivities = async (user, options = {}) => {
    if (!user) {
        throw new Error('User not found')
    }
    const { types = [], limit = 10, skip = 0, ownedOnly = false, performedOnly = false } = options

    // Lấy tất cả các loại hoạt động cần thiết
    let activityTypes = [ARTICLE_CREATE, ARTICLE_UPDATE, ARTICLE_SAVE, ARTICLE_REACTION, ARTICLE_COMMENT, ARTICLE_REPLY_COMMENT]

    // Lọc theo loại nếu được chỉ định
    if (types.length > 0) {
        activityTypes = activityTypes.filter(type => types.includes(type))
    }

    // Lấy tất cả type ID trong một truy vấn
    const typeObjects = await Type.find({
        class: ARTICLE_TYPE,
        name: { $in: activityTypes },
    })

    // Pipeline chung để lookup và projection
    const commonPipeline = [
        // User lookup
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
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
                            _id: 1,
                            name: 1,
                            avatar: 1,
                        },
                    },
                ],
            },
        },
        { $unwind: '$user' },
    ]

    // Mảng lưu kết quả từ tất cả các truy vấn
    const allActivities = []

    // 1. Truy vấn CREATE activities (từ AccessLog)
    if (activityTypes.includes(ARTICLE_CREATE)) {
        const createTypeId = typeObjects.find(t => t.name === ARTICLE_CREATE)?._id

        if (createTypeId) {
            const matchCreateCondition = { type_id: createTypeId }

            if (performedOnly) {
                matchCreateCondition.user_id = user._id
            }

            const createActivities = await AccessLog.aggregate([
                { $match: matchCreateCondition },
                ...commonPipeline,
                {
                    $lookup: {
                        from: 'types',
                        localField: 'type_id',
                        foreignField: '_id',
                        as: 'activity_type',
                        pipeline: [{ $project: { name: 1 } }],
                    },
                },
                { $unwind: '$activity_type' },
            ])

            allActivities.push(...createActivities)
        }
    }

    // 2. Truy vấn SAVE activities
    if (activityTypes.includes(ARTICLE_SAVE)) {
        const saveTypeId = typeObjects.find(t => t.name === ARTICLE_SAVE)?._id

        if (saveTypeId) {
            const matchSaveCondition = {
                type_id: saveTypeId,
                user_id: user._id,
            }

            const saveActivities = await ActivityLog.aggregate([
                { $match: matchSaveCondition },
                ...commonPipeline,
                // Lookup bài viết
                {
                    $lookup: {
                        from: 'articles',
                        localField: 'data.article_id',
                        foreignField: '_id',
                        as: 'article',
                        pipeline: [{ $project: { caption: '$content.caption', _id: 1 } }],
                    },
                },
                {
                    $lookup: {
                        from: 'types',
                        localField: 'type_id',
                        foreignField: '_id',
                        as: 'activity_type',
                        pipeline: [{ $project: { name: 1 } }],
                    },
                },
                { $unwind: { path: '$article', preserveNullAndEmptyArrays: true } },
                { $unwind: '$activity_type' },
            ])

            allActivities.push(...saveActivities)
        }
    }

    // 3. Truy vấn UPDATE activities
    if (activityTypes.includes(ARTICLE_UPDATE)) {
        const updateTypeId = typeObjects.find(t => t.name === ARTICLE_UPDATE)?._id

        if (updateTypeId) {
            const matchUpdateCondition = { type_id: updateTypeId }

            if (ownedOnly) {
                matchUpdateCondition['data.owner_id'] = user._id

                if (!performedOnly) {
                    matchUpdateCondition.user_id = { $ne: user._id }
                    matchUpdateCondition.$and = [{ 'data.owner_id': user._id }, { $expr: { $ne: ['$user_id', '$data.owner_id'] } }]
                }
            } else if (performedOnly) {
                matchUpdateCondition.user_id = user._id

                if (!ownedOnly) {
                    matchUpdateCondition.$expr = { $ne: ['$user_id', '$data.owner_id'] }
                }
            } else {
                matchUpdateCondition.$expr = { $ne: ['$user_id', '$data.owner_id'] }
            }

            const updateActivities = await ActivityLog.aggregate([
                { $match: matchUpdateCondition },
                ...commonPipeline,
                {
                    $lookup: {
                        from: 'articles',
                        localField: 'data.article_id',
                        foreignField: '_id',
                        as: 'article',
                        pipeline: [{ $project: { caption: '$content.caption', _id: 1 } }],
                    },
                },
                {
                    $lookup: {
                        from: 'types',
                        localField: 'type_id',
                        foreignField: '_id',
                        as: 'activity_type',
                        pipeline: [{ $project: { name: 1 } }],
                    },
                },
                { $unwind: { path: '$article', preserveNullAndEmptyArrays: true } },
                { $unwind: '$activity_type' },
            ])

            allActivities.push(...updateActivities)
        }
    }

    // 4. Truy vấn REACTION activities
    if (activityTypes.includes(ARTICLE_REACTION)) {
        const reactionTypeId = typeObjects.find(t => t.name === ARTICLE_REACTION)?._id

        if (reactionTypeId) {
            const reactionsOnUserPosts = await ActivityLog.aggregate([
                {
                    $match: {
                        type_id: reactionTypeId,
                        'data.owner_id': user._id,
                        user_id: { $ne: user._id },
                    },
                },
                ...commonPipeline,
                // Lookup bài viết
                {
                    $lookup: {
                        from: 'articles',
                        localField: 'data.article_id',
                        foreignField: '_id',
                        as: 'article',
                        pipeline: [
                            {
                                $project: {
                                    caption: '$content.caption',
                                    _id: 1,
                                    user_id: 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $lookup: {
                        from: 'types',
                        localField: 'type_id',
                        foreignField: '_id',
                        as: 'activity_type',
                        pipeline: [{ $project: { name: 1 } }],
                    },
                },
                { $unwind: { path: '$article', preserveNullAndEmptyArrays: true } },
                { $unwind: '$activity_type' },
            ])

            allActivities.push(...reactionsOnUserPosts)
        }
    }

    // 5. Truy vấn COMMENT activities
    if (activityTypes.includes(ARTICLE_COMMENT)) {
        const commentTypeId = typeObjects.find(t => t.name === ARTICLE_COMMENT)?._id

        if (commentTypeId) {
            const commentsOnUserPosts = await ActivityLog.aggregate([
                {
                    $match: {
                        type_id: commentTypeId,
                        'data.owner_id': user._id,
                        user_id: { $ne: user._id },
                    },
                },
                ...commonPipeline,
                {
                    $lookup: {
                        from: 'articles',
                        localField: 'data.article_id',
                        foreignField: '_id',
                        as: 'article',
                        pipeline: [
                            {
                                $project: {
                                    caption: '$content.caption',
                                    _id: 1,
                                    user_id: 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $lookup: {
                        from: 'comments',
                        localField: 'data.comment_id',
                        foreignField: '_id',
                        as: 'comment',
                        pipeline: [
                            {
                                $project: {
                                    content: 1,
                                    article_id: 1,
                                    user_id: 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $lookup: {
                        from: 'types',
                        localField: 'type_id',
                        foreignField: '_id',
                        as: 'activity_type',
                        pipeline: [{ $project: { name: 1 } }],
                    },
                },
                { $unwind: { path: '$article', preserveNullAndEmptyArrays: true } },
                { $unwind: '$activity_type' },
                { $unwind: { path: '$comment', preserveNullAndEmptyArrays: true } },
            ])

            allActivities.push(...commentsOnUserPosts)
        }
    }

    // 6. Truy vấn REPLY_COMMENT activities
    if (activityTypes.includes(ARTICLE_REPLY_COMMENT)) {
        const replyCommentTypeId = typeObjects.find(t => t.name === ARTICLE_REPLY_COMMENT)?._id

        if (replyCommentTypeId) {
            const repliesOnUserComments = await ActivityLog.aggregate([
                {
                    $match: {
                        type_id: replyCommentTypeId,
                        'data.owner_id': user._id,
                        user_id: { $ne: user._id },
                    },
                },
                ...commonPipeline,
                // Lookup bài viết
                {
                    $lookup: {
                        from: 'articles',
                        localField: 'data.article_id',
                        foreignField: '_id',
                        as: 'article',
                        pipeline: [
                            {
                                $project: {
                                    caption: '$content.caption',
                                    _id: 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $lookup: {
                        from: 'comments',
                        localField: 'data.comment_id',
                        foreignField: '_id',
                        as: 'comment',
                        pipeline: [
                            {
                                $project: {
                                    content: 1,
                                    article_id: 1,
                                    user_id: 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $lookup: {
                        from: 'types',
                        localField: 'type_id',
                        foreignField: '_id',
                        as: 'activity_type',
                        pipeline: [{ $project: { name: 1 } }],
                    },
                },
                { $unwind: { path: '$article', preserveNullAndEmptyArrays: true } },
                { $unwind: '$activity_type' },
                { $unwind: { path: '$comment', preserveNullAndEmptyArrays: true } },
            ])

            allActivities.push(...repliesOnUserComments)
        }
    }

    // Sắp xếp và phân trang kết quả
    allActivities.sort((a, b) => b.timestamp - a.timestamp)
    return allActivities.slice(skip, skip + limit)
}

// ========== DELETE [ARTICLE ACTIVITIES] ========== //
export const deleteActivitySaveArticle = async (user, articleId) => {
    try {
        const articleSaveType = await Type.findOne({ class: ARTICLE_TYPE, name: ARTICLE_SAVE })
        if (!articleSaveType) {
            console.log('Không tìm thấy loại bài viết.')
            return
        }

        const objectIdArticle = new ObjectId(articleId)

        const data = {
            user_id: user._id,
            type_id: articleSaveType._id,
            'data.article_id': objectIdArticle,
        }
        await ActivityLog.deleteOne(data)
    } catch (error) {
        console.error('Lỗi khi xóa bài viết:', error)
    }
}

// ========== DELETE [ARTICLE REACTIONS] ========== //
export const deleteActivityReactionArticle = async (user, activityOrArticleId) => {
    try {
        const articleReactionType = await Type.findOne({ class: ARTICLE_TYPE, name: ARTICLE_REACTION })
        if (!articleReactionType) {
            console.log('Không tìm thấy loại bài viết.')
            return
        }

        // Try first by activity ID (direct ID match)
        let deleteResult = await ActivityLog.deleteOne({
            _id: new ObjectId(activityOrArticleId),
            user_id: user._id,
            type_id: articleReactionType._id,
        })

        if (deleteResult.deletedCount === 0) {
            // If not found, try by article ID (data.article_id match)
            deleteResult = await ActivityLog.deleteOne({
                user_id: user._id,
                type_id: articleReactionType._id,
                'data.article_id': new ObjectId(activityOrArticleId),
            })
        }
        if (deleteResult.deletedCount === 0) {
            console.log('No document was deleted')
        } else {
            console.log(`Successfully deleted ${deleteResult.deletedCount} document`)
        }
    } catch (error) {
        console.error('Lỗi khi xóa bài viết:', error)
    }
}

//Api Get Article List for Manage
export const getManageArticleList = async (user, requestQuery) => {
    const { page, limit = 10 } = requestQuery
    console.log('requestQuery', requestQuery)
    const skip = (page - 1) * limit
    const articleLimit = parseInt(limit)
    const total = await Article.countDocuments()

    const articleList = await Article.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
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
                            _id: 1,
                            name: 1,
                            avatar: 1,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: 'projects',
                localField: 'project_id',
                foreignField: '_id',
                as: 'project',
            },
        },
        {
            $sort: { created_at: -1 },
        },
        {
            $addFields: {
                'content.attachment': {
                    $map: {
                        input: '$content.attachment',
                        as: 'attachment',
                        in: {
                            $cond: {
                                if: { $eq: [{ $ifNull: ['$$attachment', ''] }, ''] },
                                then: '$$attachment',
                                else: { $concat: [LINK_STATIC_URL, '$$attachment'] },
                            },
                        },
                    },
                },
            },
        },
        {
            $skip: skip,
        },
        {
            $limit: articleLimit,
        },
    ])

    return {
        articleList,
        pagination: {
            page: parseInt(page),
            limit: articleLimit,
            total: total,
            hasMore: total > skip + articleLimit,
        },
    }
}
