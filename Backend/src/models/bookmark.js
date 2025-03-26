import createModel, {ObjectId} from './base'
import User from './user'
import Article from './article'

const Bookmark = createModel('Bookmark', 'bookmark', {
    user_id: {
        type: ObjectId,
        ref: User,
        required: true,
    },
    article_id: {
        type: ObjectId,
        ref: Article,
        required: true,
    },
    marked: {
        type: String,
        required: true,
        default: 'no',
    },
})

export default Bookmark
