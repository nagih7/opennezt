import FileUpload from '@/utils/classes/file-upload.js'
import Article from '../../models/article.js'
import Reaction from '@/models/reaction.js'
import Comment from '../../models/comment.js'
import {REACTIONS_ENUM, LINK_STATIC_URL} from '@/configs'
import {ObjectId} from 'mongodb'
import {last} from 'lodash'

//Create Article
//Lấy project_id ra khỏi requestBody => requestBody không còn project_id nữa
export const createArticle = async (user, requestBody) => {
    const filesArray = requestBody.content.attachment

    if (filesArray && filesArray.length > 0) {
        const listAttachment = []

        for (const file of filesArray) {
            // Convert base64 to Buffer
            const base64Data = file.data.split(';base64,').pop()
            const buffer = Buffer.from(base64Data, 'base64')

            // Create file from buffer
            const fileUpload = new FileUpload({
                buffer,
                filename: file.name,
                mimetype: file.type,
            })

            const savedFile = await fileUpload.save('article-attachment')
            listAttachment.push(savedFile)
        }

        requestBody.content.attachment = listAttachment
    }

    const newArticle = new Article(requestBody)
    newArticle.user_id = user._id
    await newArticle.save()
    return newArticle
}
//End Create Article

//Scroll Feed
export const getArticleList = async (user, requestQuery) => {
    const {limit = 5, cursor} = requestQuery

    const articleLimit = parseInt(limit)

    const fixedCursor = cursor.replace(' ', '+')

    const articleList = await Article.aggregate([
        {
            $match: {
                created_at: {$lt: new Date(fixedCursor)},
                // $or: [{audience: 'public'}, {audience: 'friends', user_id: {$in: friendIds}}],
                status: 'published',
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
                                if: {$eq: [{$ifNull: ['$$attachment', '']}, '']},
                                then: '$$attachment',
                                else: {$concat: [LINK_STATIC_URL, '$$attachment']},
                            },
                        },
                    },
                },
            },
        },
        {
            $sort: {created_at: -1},
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
export const deleteArticle = async (id) => {
    await Article.findByIdAndDelete(id)
}
//End Delete Article

//Update Article
export const updateArticle = async (id, requestBody) => {
    //Phải dùng ... không nếu để requestBody thì sẽ bị lưu trong db là một trường có tên là requestBody
    const updatedArticle = await Article.findByIdAndUpdate(id, {$set: {...requestBody}}, {new: true})
    return updatedArticle
}
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
                await Reaction.deleteOne({_id: existingReaction._id})
                article.reaction_count = article.reaction_count - 1
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
        }
    }
    if (target_type === 'comment') {
        const comment = await Comment.findById(id)
        if (existingReaction) {
            if (existingReaction.type === type) {
                await Reaction.deleteOne({_id: existingReaction._id})
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
    const {...articleData} = shareArticle

    const newArticle = await new Article({
        ...articleData,
        user_id: user._id,
        parent_id: id,
    })
    console.log(newArticle)
    await newArticle.save()
}
//End share article

//Get Article's Reactions
export const getArticleReactions = async (target_id) => {
    const reactions = await Reaction.find({
        target_id: target_id,
    })
    return reactions
}
//End Get Article's Reactions

//Get User's Reactions
export const getUserReactions = async (user_id, target_id) => {
    const reactions = await Reaction.find({
        user_id: user_id,
        target_id: target_id,
    })
    return reactions
}
//End Get User's Reactions

//Get Comment List
export const getCommentList = async (user, requestQuery) => {
    console.log(requestQuery)
    const {articleId, page, limit = 10} = requestQuery
    const skip = (page - 1) * limit
    const commentLimit = parseInt(limit)

    const commentList = await Comment.aggregate([
        {
            $match: {
                article_id: new ObjectId(articleId),
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
                'content.images': {
                    $map: {
                        input: '$content.images',
                        as: 'image',
                        in: {
                            $cond: {
                                if: {$eq: [{$ifNull: ['$$image', '']}, '']},
                                then: '$$image',
                                else: {$concat: [LINK_STATIC_URL, '$$image']},
                            },
                        },
                    },
                },
            },
        },
        {
            $sort: {created_at: -1},
        },
        {
            $skip: skip,
        },
        {
            $limit: commentLimit + 1, // Lấy thêm 1 item để kiểm tra hasMore
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

    if (imageData) {
        const base64Data = imageData.data.split(';base64,').pop()
        const buffer = Buffer.from(base64Data, 'base64')

        const fileUpload = new FileUpload({
            buffer,
            filename: imageData.name,
            mimetype: imageData.type,
        })

        const savedFile = await fileUpload.save('comment-images')
        requestBody.content.image = savedFile // Store single image path
    }

    const newComment = new Comment({
        ...requestBody,
        user_id: user._id,
        reaction_count: 0,
    })

    await newComment.save()

    await Article.findByIdAndUpdate(articleId, {$inc: {comment_count: 1}})

    return newComment
}
//End Create Comment

//Get User Comment Reactions
export const getUserCommentReactions = async (user_id, target_id) => {
    const reactions = await Reaction.find({
        user_id: user_id,
        target_id: target_id,
    })
    return reactions
}
