import bcrypt from 'bcrypt'
import createModel from './base'
import {required} from 'joi'

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
        phone: {
            type: String,
            default: '',
            required: true,
        },
        avatar: {
            type: String,
            default: '',
        },
        background: {
            type: String,
            default: '',
        },
        facebook: {
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
            required: false,
        },
        city: {
            type: String,
            default: '',
        },
        language: {
            type: String,
            default: 'vi',
            required: true,
        },
        role: {
            type: String,
            default: 'user',
            required: true,
            enum: ['user', 'admin'],
        },
        is_active: {
            type: Boolean,
            required: true,
            default: false,
            enum: [true, false],
        }
    },
    {
        toJSON: {
            virtuals: false,
            transform(doc, ret) {
                // eslint-disable-next-line no-unused-vars
                const {_id, password, is_active, created_at, updated_at, ...result} = ret
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
