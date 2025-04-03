import FileUpload from '@/utils/classes/file-upload.js'
import Article from '../../models/article.js'
import Reaction from '@/models/reaction.js'
import Comment from '../../models/comment.js'
import {
    ARTICLE_COMMENT,
    ARTICLE_CREATE,
    ARTICLE_REACTION,
    ARTICLE_REPLY_COMMENT,
    ARTICLE_SAVE,
    ARTICLE_TYPE,
    ARTICLE_UPDATE,
    LINK_STATIC_URL,
} from '@/configs'
import { ObjectId } from 'mongodb'
import delay from '@/utils/classes/delay.js'
import Project from '@/models/project.js'
import Bookmark from '@/models/bookmark.js'
import Type from '@/models/type.js'
import AccessLog from '@/models/accessLog.js'
import ActivityLog from '@/models/activityLog.js'

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

    if (validArticle.user_id.toString() === user._id.toString()) {
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
        }
    }
}
//End Article Reaction

//Get Article By Id
export const getArticleById = async (id) => {
    const article = await Article.findById(id).lean()

    if (article?.content?.attachment) {
        article.content.attachment = article.content.attachment.map((attachment) =>
            attachment ? LINK_STATIC_URL + attachment : attachment
        )
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
        requestBody.content.image = imageData.save('article-attachment')
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
    return newComment
}
//Get Article's Reactions
export const getArticleReactions = async (target_id) => {
    const reactions = await Reaction.find({
        target_id: target_id,
    })
    return reactions
}
//End Get Article's Reactions

//Get User's Reactions
export const getUserReactions = async (user_id, target_ids) => {
    // Chuyển đổi string thành array và map thành ObjectId
    const targetIdArray = target_ids.split(',').map((id) => new ObjectId(id))

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
        // {
        //     $sort: { created_at: -1 },
        // },
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
        requestBody.content.image = imageData.save('article-attachment')
    }

    const newComment = new Comment({
        ...requestBody,
        user_id: user._id,
        reaction_count: 0,
    })

    await newComment.save()

    await Article.findByIdAndUpdate(articleId, { $inc: { comment_count: 1 } })

    await postActivityComment(user, newComment._id)

    return newComment
}
//End Create Comment

//Get User Comment Reactions

export const getUserCommentReactions = async (user_id, target_ids) => {
    // Chuyển đổi string thành array và map thành ObjectId
    const targetIdArray = target_ids.split(',').map((id) => new ObjectId(id))

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
        article_id: article_id,
        user_id: user_id,
    })

    if (existingBookmark) {
        existingBookmark.marked = marked
        await existingBookmark.save()
        return existingBookmark
    } else {
        const newBookmark = new Bookmark({
            user_id: user_id,
            article_id: article_id,
            marked: marked,
        })
        await newBookmark.save()
        return newBookmark
    }
}

export const getUserBookmarks = async (user, article_ids) => {
    const user_id = user._id
    const articleIdsArray = article_ids.split(',').map((id) => new Object(id))

    const bookMarks = await Bookmark.find({
        user_id: user_id,
        article_id: { $in: articleIdsArray },
    })

    return bookMarks
}

// ========== POST [ARTICLE ACTIVITIES] ========== //
export const postActivityCreateArticle = async (user) => {
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
export const getActivityCreateArticle = async (user) => {
    const articleCreateType = await Type.findOne({ class: ARTICLE_TYPE, name: ARTICLE_CREATE })
    const activities = await AccessLog.aggregate([
        {
            $match: {
                user_id: user._id,
                type_id: articleCreateType._id,
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
            $unwind: '$user',
        },
        {
            $limit: 10,
        },
        {
            $sort: { timestamp: -1 },
        },
        {
            $project: {
                user: 1,
                timestamp: 1,
                metadata: 1,
                type_id: 1,
            },
        },
    ])
    return activities
}

export const getActivityUpdateArticle = async (user) => {
    const articleUpdateType = await Type.findOne({ class: ARTICLE_TYPE, name: ARTICLE_UPDATE })
    const activities = await ActivityLog.aggregate([
        {
            $match: {
                user_id: user._id,
                type_id: articleUpdateType._id,
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
                from: 'articles',
                localField: 'data.article_id',
                foreignField: '_id',
                as: 'article',
                pipeline: [
                    {
                        $project: {
                            caption: '$content.caption',
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
                pipeline: [
                    {
                        $project: {
                            name: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: '$user',
        },
        {
            $unwind: '$article',
        },
        {
            $unwind: '$activity_type',
        },
        {
            $limit: 10,
        },
        {
            $sort: { timestamp: -1 },
        },
        {
            $project: {
                user: 1,
                article: { caption: 1 },
                activity_type: { name: 1 },
                timestamp: 1,
                data: 1,
                type_id: 1,
            },
        },
    ])
    return activities
}

export const getActivitySaveArticle = async (user) => {
    const articleSaveType = await Type.findOne({ class: ARTICLE_TYPE, name: ARTICLE_SAVE })
    const activities = await ActivityLog.aggregate([
        {
            $match: {
                user_id: user._id,
                type_id: articleSaveType._id,
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
                from: 'articles',
                localField: 'data.article_id',
                foreignField: '_id',
                as: 'article',
                pipeline: [
                    {
                        $project: {
                            caption: '$content.caption',
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
                pipeline: [
                    {
                        $project: {
                            name: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: '$user',
        },
        {
            $unwind: '$article',
        },
        {
            $unwind: '$activity_type',
        },
        {
            $limit: 10,
        },
        {
            $sort: { timestamp: -1 },
        },
        {
            $project: {
                user: 1,
                article: { caption: 1 },
                activity_type: { name: 1 },
                timestamp: 1,
                data: 1,
                type_id: 1,
            },
        },
    ])
    return activities
}

export const getActivityReactionArticle = async (user) => {
    const articleReactionType = await Type.findOne({ class: ARTICLE_TYPE, name: ARTICLE_REACTION })
    const activities = await ActivityLog.aggregate([
        {
            $match: {
                'data.owner_id': user._id, // Articles owned by current user
                type_id: articleReactionType._id,
                user_id: { $ne: user._id }, // Exclude user's own reactions
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user_id', // This now shows the user who reacted
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
        // Rest of the pipeline remains the same
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
                pipeline: [
                    {
                        $project: {
                            name: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: '$user',
        },
        {
            $unwind: '$article',
        },
        {
            $unwind: '$activity_type',
        },
        {
            $limit: 10,
        },
        {
            $sort: { timestamp: -1 },
        },
        {
            $project: {
                user: 1,
                article: { caption: 1 },
                activity_type: { name: 1 },
                timestamp: 1,
                data: 1,
                type_id: 1,
            },
        },
    ])
    return activities
}

export const getActivityReplyComment = async (user) => {
    const commentReplyType = await Type.findOne({ class: ARTICLE_TYPE, name: ARTICLE_REPLY_COMMENT })
    const activities = await ActivityLog.aggregate([
        {
            $match: {
                'data.owner_id': user._id, // Comments owned by current user
                type_id: commentReplyType._id,
                user_id: { $ne: user._id }, // Exclude user's own replies
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user_id', // The user who replied
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
                from: 'comments',
                localField: 'data.comment_id',
                foreignField: '_id',
                as: 'comment',
                pipeline: [
                    {
                        $project: {
                            content: 1,
                            article_id: 1,
                        },
                    },
                ],
            },
        },
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
                pipeline: [
                    {
                        $project: {
                            name: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: '$user',
        },
        {
            $unwind: '$comment',
        },
        {
            $unwind: '$article',
        },
        {
            $unwind: '$activity_type',
        },
        {
            $limit: 10,
        },
        {
            $sort: { timestamp: -1 },
        },
        {
            $project: {
                user: 1,
                comment: { content: 1 },
                activity_type: { name: 1 },
                article: { caption: 1 },
                timestamp: 1,
                data: 1,
            },
        },
    ])
    return activities
}

export const getActivityComment = async (user) => {
    const commentType = await Type.findOne({ class: ARTICLE_TYPE, name: ARTICLE_COMMENT })
    const activities = await ActivityLog.aggregate([
        {
            $match: {
                'data.owner_id': user._id, // Articles owned by current user
                type_id: commentType._id,
                user_id: { $ne: user._id }, // Exclude user's own comments
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user_id', // The user who commented
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
                from: 'comments',
                localField: 'data.comment_id',
                foreignField: '_id',
                as: 'comment',
                pipeline: [
                    {
                        $project: {
                            content: 1,
                            article_id: 1,
                        },
                    },
                ],
            },
        },
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
                pipeline: [
                    {
                        $project: {
                            name: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: '$user',
        },
        {
            $unwind: '$comment',
        },
        {
            $unwind: '$article',
        },
        {
            $unwind: '$activity_type',
        },
        {
            $limit: 10,
        },
        {
            $sort: { timestamp: -1 },
        },
        {
            $project: {
                user: 1,
                comment: { content: 1 },
                activity_type: { name: 1 },
                article: { caption: 1 },
                timestamp: 1,
                data: 1,
            },
        },
    ])
    return activities
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
