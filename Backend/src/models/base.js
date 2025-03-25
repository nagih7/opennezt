import mongoose from 'mongoose'

export default function createModel(name, collection, definition, options) {
    const hasTimestamps = 'timestamp' in definition

    // Check if TTL is defined
    const ttlValue = definition.ttl
    if (ttlValue) {
        delete definition.ttl
    }

    const schema = new mongoose.Schema(definition, {
        timestamps: hasTimestamps ? false : {createdAt: 'created_at', updatedAt: 'updated_at'},
        versionKey: false,
        ...(options ?? {}),
    })

    // Apply TTL index if needed
    if (ttlValue) {
        schema.index({created_at: 1}, {expireAfterSeconds: ttlValue})
    }

    return mongoose.model(name, schema, collection)
}

export const {ObjectId} = mongoose.Types
