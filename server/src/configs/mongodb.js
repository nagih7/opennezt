import mongoose from 'mongoose' // Import mongoose module
import { DATABASE_URI, DB_NAME, DB_USERNAME, DB_PASSWORD, DB_AUTH_SOURCE } from './constants' // Import constants

const mongoDb = {
    connect() {
        return new Promise((resolve, reject) => {
            mongoose
                .connect(DATABASE_URI, {
                    dbName: DB_NAME,
                    user: DB_USERNAME,
                    pass: DB_PASSWORD,
                    authSource: DB_AUTH_SOURCE,
                    autoCreate: true,
                    autoIndex: process.env.NODE_ENV !== 'production', // Disable in production
                    connectTimeoutMS: 10000,
                    socketTimeoutMS: 45000,
                    serverSelectionTimeoutMS: 10000,
                    maxPoolSize: 10, // Maximum number of connections
                    minPoolSize: 2, // Minimum number of connections
                    maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
                    heartbeatFrequencyMS: 10000, // How often to check connection health
                })
                .then(() => {
                    resolve()
                })
                .catch(err => {
                    console.error('MongoDB connection error:', err)
                    reject(err)
                })
        })
    },
    close(force) {
        return mongoose.connection.close(force)
    },
    disconnect(force) {
        return mongoose.connection.close(force)
    },
    transaction(...args) {
        return mongoose.connection.transaction(...args)
    },
    isDisconnected() {
        return mongoose.connection.readyState === 0
    },
}

export default mongoDb
