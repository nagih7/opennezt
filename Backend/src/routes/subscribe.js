import { Router } from 'express'
import { asyncHandler } from '@/utils/helpers'
import requireAuthentication from '@/app/middleware/common/require-authentication'
import * as subscriptionController from '../app/controllers/subscriptionController'
import { Subscription } from '@/models'

const subscribeRouter = Router()

subscribeRouter.use(asyncHandler(requireAuthentication))

// subscribeRouter.post('/email', async (req, res) => {
//     const { email, ip } = req.body

//     if (!email || !ip) {
//         return res.status(400).json({ error: 'Email and IP are required' })
//     }

//     try {
//         const existingSubscriptions = await Subscribe.find({ ip })

//         if (existingSubscriptions.length >= 3) {
//             return res.status(429).json({ error: 'You have made too many requests from this IP' })
//         }

//         const newSubscription = new Subscribe({ email, ip })
//         await newSubscription.save()
//         res.status(201).json({ message: 'Subscription successful' })
//     } catch (error) {
//         console.error('Error saving subscription:', error)
//         if (error.code === 11000) {
//             res.status(400).json({ error: 'Email already subscribed' })
//         } else {
//             res.status(500).json({ error: 'Internal server error' })
//         }
//     }
// })

subscribeRouter.get('/stats', async (req, res) => {
    try {
        const totalSubscriptions = await Subscription.countDocuments()
        const latestSubscriptions = await Subscription.find().sort({ createdAt: -1 }).limit(5)
        // .select('-keys')

        res.status(200).json({
            totalSubscriptions,
            latestSubscriptions,
        })
    } catch (error) {
        console.error('Lỗi khi lấy thống kê:', error)
        res.status(500).json({ error: 'Không thể lấy thống kê' })
    }
})

subscribeRouter.post('/unsubscribe', asyncHandler(subscriptionController.unsubscribe))

subscribeRouter.post('/', asyncHandler(subscriptionController.subscribe))

export default subscribeRouter
