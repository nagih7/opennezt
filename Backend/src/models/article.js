import createModel, { ObjectId } from './base'
import { Schema } from 'mongoose'
import User from './user'
import Project from './project'
import { ARTICLE_AUDIENCE_ENUM, ARTICLE_STATUS_ENUM } from '@/configs'

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
        index: true,
    },
    project_id: {
        type: ObjectId,
        ref: Project,
        required: false,
        index: true,
    },
    content: {
        type: Content,
        required: true,
    },
    reaction_count: {
        type: Number,
        required: true,
        default: 0,
        index: true,
    },
    comment_count: {
        type: Number,
        required: true,
        default: 0,
        index: true,
    },
    parent_id: {
        type: ObjectId,
        required: false,
        index: true,
    },
    //quyền riêng tư(đối tượng sẽ đọc được bài viết)
    audience: {
        type: String,
        enum: ARTICLE_AUDIENCE_ENUM,
        required: true,
        default: null,
        index: true,
    },
    //đăng hay chưa đăng
    status: {
        type: String,
        enum: ARTICLE_STATUS_ENUM,
        required: true,
        default: null,
        index: true,
    },
    link_preview: {
        type: String,
        required: false,
    },
})

// Add compound indexes for common query patterns
Article.schema.index({ status: 1, created_at: -1 })
Article.schema.index({ user_id: 1, status: 1, created_at: -1 })
Article.schema.index({ audience: 1, status: 1, created_at: -1 })
Article.schema.index({ project_id: 1, status: 1, created_at: -1 })

export default Article
