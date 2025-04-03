import createModel from './base'

const Subscribe = createModel(
    'Subscribe',
    'subscribes',
    {
        endpoint: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        expirationTime: {
            type: Date,
            required: true,
        },
        keys: {
            p256dh: {
                type: String,
                required: true,
            },
            auth: {
                type: String,
                required: true,
            },
        },
        // Thông tin người dùng
        user_id: {
            type: String,
            ref: 'User',
            required: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        ip: {
            type: String,
            required: true,
            index: true,
        },
    },
    { timestamps: true }
)

export default Subscribe
