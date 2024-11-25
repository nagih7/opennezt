import bcrypt from 'bcrypt'
import createModel from './base'

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
            required: true,
            set(password) {
                const salt = bcrypt.genSaltSync(10)
                return bcrypt.hashSync(password, salt)
            },
        },
        role: {
            type: String,
            default: 'user',
            required: true,
        },
        phone: {
            type: String,
            default: '',
        },
        avatar: {
            type: String,
            default: '',
        },
        linkedIn: {
            type: String,
            default: '',
        },
        region: {
            type: String,
            default: '',
        },
        city: {
            type: String,
            default: '',
        },
        language: {
            type: String,
            default: 'vi',
        },
        isActive: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        toJSON: {
            virtuals: false,
            transform(doc, ret) {
                // eslint-disable-next-line no-unused-vars
                const {_id, password, isActive, created_at, updated_at, ...result} = ret
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
