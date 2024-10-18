import {db} from '@/configs'
import userSeeder from './userSeeder'
import adminSeeder from './adminSeeder'
import chalk from 'chalk'

async function seed() {
    await db.transaction(async function (session) {
        console.log(chalk.bold('Initializing data...'))

        await adminSeeder(session)
        await userSeeder(session)

        console.log(chalk.bold('Data has been initialized!'))
    })
}

db.connect().then(seed).then(db.close)
