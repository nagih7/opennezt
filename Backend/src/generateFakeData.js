import generateFakeData from './utils/fakeData'
import mongoDb from './configs/mongodb'

const initData = async () => {
    try {
        await mongoDb.connect()
        await generateFakeData()
        console.log('All fake data generated successfully!')
    } catch (error) {
        console.error('Error generating fake data:', error)
    }
}

initData()
