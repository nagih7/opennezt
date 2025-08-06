import createModel, {ObjectId} from './base'
import User from './user'
import {REACTION_TARGET_TYPE_ENUM, REACTIONS_ENUM} from '@/configs'

const Reaction = createModel('Reaction', 'reactions', {
    user_id: {
        type: ObjectId,
        ref: User,
        required: true,
    },
    target_id: {
        type: ObjectId,
        required: true,
    },
    target_type: {
        type: String,
        enum: REACTION_TARGET_TYPE_ENUM,
        required: true,
        default: null,
    },
    type: {
        type: String,
        enum: REACTIONS_ENUM,
        required: true,
        default: null,
    },
})

export default Reaction
