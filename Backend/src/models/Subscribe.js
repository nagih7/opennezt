import mongoose from 'mongoose'

const subscribeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    ip: {
        type: String,
        required: true,
    },
    attempts: {
        type: Number,
        default: 1,
    },
}, {
    timestamps: true,
})

const Subscribe = mongoose.model('Subscribe', subscribeSchema)

export default Subscribe