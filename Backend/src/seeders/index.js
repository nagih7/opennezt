import {db} from '@/configs'
import chalk from 'chalk'
// import userSeeder from './userSeeder'
// import adminSeeder from './adminSeeder'
import typeSeeder from './typeSeeder'
import roleSeeder from './roleSeeder'

async function seed() {
    await db.transaction(async function (session) {
        console.log(chalk.bold('Initializing data...'))

        // await adminSeeder(session)
        // await userSeeder(session)
        // await adminSeeder(session)
        await typeSeeder(session)
        await roleSeeder(session)

        console.log(chalk.bold('Data has been initialized!'))
    })
}

db.connect().then(seed).then(db.close)
