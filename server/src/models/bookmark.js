import createModel, { ObjectId } from './base'
import User from './user'
import { BOOKMARK_TARGET_TYPE_ENUM } from '@/configs'

const Bookmark = createModel('Bookmark', 'bookmark', {
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
        enum: BOOKMARK_TARGET_TYPE_ENUM,
        required: true,
    },
    marked: {
        type: String,
        required: true,
        default: 'no',
    },
})

export default Bookmark
