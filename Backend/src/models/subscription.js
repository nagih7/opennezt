import createModel, { ObjectId } from './base'

const Subscription = createModel(
    'Subscription',
    'subscriptions',
    {
        endpoint: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        expirationTime: {
            type: Date,
            required: false,
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
            type: ObjectId,
            ref: 'Users',
            required: true,
            index: true,
        },
        // email: {
        //     type: String,
        //     required: true,
        //     unique: true,
        //     index: true,
        // },
        // ip: {
        //     type: String,
        //     required: true,
        //     index: true,
        // },
    }
    // { timestamps: true }
)

export default Subscription
