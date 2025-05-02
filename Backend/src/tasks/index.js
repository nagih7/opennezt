// import runEveryDay from './run-every-day.task'
import cleanupExpiredFiles from './cleanup-expired-files.task'

export default function executeScheduledTasks() {
    // runEveryDay.start()
    cleanupExpiredFiles.start()
}
