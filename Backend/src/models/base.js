import mongoose from 'mongoose'

export default function createModel(name, collection, definition, options) {
    // Kiểm tra nếu model đã tồn tại
    if (mongoose.models[name]) {
        return mongoose.models[name]
    }

    const hasTimestamp = 'timestamp' in definition
    // Check if TTL is defined
    const ttlValue = definition.ttl
    if (ttlValue) {
        delete definition.ttl
    }

    const schema = new mongoose.Schema(definition, {
        timestamps: hasTimestamp ? null : { createdAt: 'created_at', updatedAt: 'updated_at' },
        versionKey: false,
        ...(options ?? {}),
    })

    schema.index({ created_at: 1 })
    schema.index({ updated_at: 1 })

    // Apply TTL index if needed
    if (ttlValue) {
        console.log(typeof ttlValue)
        schema.index({ created_at: 1 }, { expireAfterSeconds: ttlValue })
    }

    return mongoose.model(name, schema, collection)
}

export const { ObjectId } = mongoose.Types

export function deleteModel(modelName) {
    if (mongoose.models[modelName]) {
        delete mongoose.models[modelName]
        delete mongoose.modelSchemas[modelName]
        console.log(`Model ${modelName} đã được xóa khỏi bộ nhớ`)
    }
}
