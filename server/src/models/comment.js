import createModel, {ObjectId} from './base'
import {Schema} from 'mongoose'
import User from './user'
import Article from './article'

const Content = new Schema(
    {
        caption: {
            type: String,
            required: true,
            default: '',
        },
        image: {
            type: String,
            require: false,
        },
    },
    {
        _id: false,
    }
)

const Comment = createModel('Comment', 'comments', {
    user_id: {
        type: ObjectId,
        required: true,
        ref: User,
    },
    article_id: {
        type: ObjectId,
        required: false,
        ref: Article,
    },
    parent_id: {
        type: ObjectId,
        ref: 'Comment',
        required: false,
    },
    reaction_count: {
        type: Number,
        required: true,
        default: 0,
    },
    reply_count: {
        type: Number,
        required: true,
        default: 0,
    },
    content: {
        type: Content,
        required: true,
    },
})

export default Comment
