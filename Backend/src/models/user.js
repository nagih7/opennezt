import bcrypt from 'bcrypt'
import createModel, {ObjectId} from './base'

const User = createModel(
    'User',
    'users',
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: false,
            set(password) {
                const salt = bcrypt.genSaltSync(10)
                return bcrypt.hashSync(password, salt)
            },
        },
        phone: {
            type: String,
            default: '',
            required: false,
        },
        avatar: {
            type: String,
            default: '',
            required: false,
        },
        background: {
            type: String,
            default: '',
        },
        facebook: {
            type: String,
            default: '',
        },
        linkedin: {
            type: String,
            default: '',
        },
        region: {
            type: String,
            default: '',
            required: false,
        },
        city: {
            type: String,
            default: '',
        },
        language: {
            type: [String],
            default: ['Vietnamese'],
            required: true,
        },
        role_id: {
            type: ObjectId,
            ref: 'Role',
            required: true,
        },
        is_active: {
            type: Boolean,
            required: true,
            default: false,
            enum: [true, false],
        },
    },
    {
        toJSON: {
            virtuals: false,
            transform(doc, ret) {
                // eslint-disable-next-line no-unused-vars
                const {password, is_active, updated_at, ...result} = ret
                return result
            },
        },
        methods: {
            verifyPassword(password) {
                return bcrypt.compareSync(password, this.password)
            },
        },
    }
)

export default User
