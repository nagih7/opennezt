import FileUpload from '../utils/classes/file-upload'

const cleanupExpiredFiles = {
    name: 'cleanupExpiredFiles',

    // Run every hour to check for expired files
    schedule: '0 * * * *', // Runs at minute 0 of every hour

    execute: async () => {
        try {
            const result = await FileUpload.cleanupExpiredFiles()
            if (result) {
                console.log(`[${new Date().toISOString()}] Expired files have been cleaned up`)
            }
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error cleaning up expired files:`, error)
        }
    },

    start() {
        // Immediately run once when server starts
        this.execute()

        // Then set up interval to run every hour (3600000 ms)
        setInterval(() => this.execute(), 3600000)
    },
}

export default cleanupExpiredFiles
