import createModel, {ObjectId} from './base'
import {Schema} from 'mongoose'
import User from './user'
import Article from './article'
import { REACTIONS_ENUM } from '@/configs' 
import { de } from '@faker-js/faker'

const Content = new Schema(
    {  
        caption: {
            type: String,
            required: true,
            default: '',
        },
        images: {
            type: [String],
            require: false,
        }
    },
    {
        _id: false,
    }
)

const Reaction = new Schema(
    {
        user_id: {
            type: ObjectId,
            ref: User,
            required: true
        },
        type: {
            type: String,
            required: true,
            enum: REACTIONS_ENUM
        }
    }
)

const Comment = createModel(
    'Comment', 
    'comments', 
    {
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
            required: false
        },
        reactions: {
            type: Reaction,
            required: true,
            default: []
        },
        content: {
            type: Content,
            required: true,
        },
    }
)

export default Comment