import sourceMapSupport from 'source-map-support'
import { spawn } from 'child_process'
import { db } from './configs'
import createApp from '.'
import executeScheduledTasks from './tasks'
import { getInterfaceIp } from './utils/helpers'
import { cleanupLinkedInSession } from './utils/classes/linkedin-crawl'

sourceMapSupport.install()

const host = process.env.HOST || 'localhost'
const port = parseInt(process.env.PORT, 10) || 3456

const server = createApp()

db.connect().then(() => console.log('Database connection successful!'))

server.listen(port, host, async function () {
    let displayHostname = host
    if (['0.0.0.0', '::'].includes(host)) {
        if (host === '0.0.0.0') {
            displayHostname = await getInterfaceIp('IPv4')
        } else {
            displayHostname = await getInterfaceIp('IPv6')
        }
    }
    if (host.includes(':')) {
        displayHostname = `[${displayHostname}]`
    }
    console.log(`Server is running on http://${displayHostname}:${port} in ${process.env.NODE_ENV} mode.`)
})

executeScheduledTasks()

// Set up shutdown handlers
const shutdownHandlers = ['SIGINT', 'SIGTERM', 'uncaughtException', 'unhandledRejection']

/**
 * Handles graceful shutdown of the application
 * @param {Error} err - Error object if shutdown was triggered by an error
 * @returns {Promise<void>}
 */
async function gracefulShutdown(err) {
    console.log('Shutting down gracefully...')
    if (err) console.error('Error:', err)

    try {
        // Cleanup LinkedIn session
        await cleanupLinkedInSession()
        console.log('LinkedIn session closed successfully')

        // Close database connection
        await db.disconnect()
        console.log('Database connection closed')

        // Close server
        server.close(() => {
            console.log('Server closed')
            process.exit(err ? 1 : 0)
        })

        // Force exit after timeout if graceful shutdown fails
        setTimeout(() => {
            console.error('Force shutdown due to timeout')
            process.exit(1)
        }, 10000)
    } catch (cleanupError) {
        console.error('Error during cleanup:', cleanupError)
        process.exit(1)
    }
}

// Register shutdown handlers
shutdownHandlers.forEach((signal) => {
    process.on(signal, gracefulShutdown)
})

if (process.env.__ESLINT__ === 'true') {
    const command = 'npm'
    const args = ['run', 'lint:fix', '--silent']
    const options = { stdio: 'inherit', shell: true }
    const eslintProcess = spawn(command, args, options)

    eslintProcess.on('close', function (code) {
        if (code !== 0) process.exit(1)
    })
}
