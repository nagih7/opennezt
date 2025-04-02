import createModel, { ObjectId } from './base'
import { Schema } from 'mongoose'
import User from './user'
import Project from './project'
import { ARTICLE_AUDIENCE_ENUM, ARTICLE_STATUS_ENUM } from '@/configs'
import { de } from '@faker-js/faker'

const Content = new Schema(
    {
        caption: {
            type: String,
            required: false,
            default: '',
        },
        attachment: {
            type: [String],
            required: false,
        },
        hashtags: {
            type: [String],
            required: false,
        },
    },
    {
        _id: false,
    }
)

const Article = createModel('Article', 'articles', {
    user_id: {
        type: ObjectId,
        ref: User,
        required: true,
    },
    project_id: {
        type: ObjectId,
        ref: Project,
        required: false,
    },
    content: {
        type: Content,
        required: true,
    },
    reaction_count: {
        type: Number,
        required: true,
        default: 0,
    },
    comment_count: {
        type: Number,
        required: true,
        default: 0,
    },
    parent_id: {
        type: ObjectId,
        required: false,
    },
    //quyền riêng tư(đối tượng sẽ đọc được bài viết)
    audience: {
        type: String,
        enum: ARTICLE_AUDIENCE_ENUM,
        required: true,
        default: null,
    },
    //đăng hay chưa đăng
    status: {
        type: String,
        enum: ARTICLE_STATUS_ENUM,
        required: true,
        default: null,
    },
})

export default Article
