import { Router } from 'express'
import Subscribe from '../models/Subscribe.js'

const router = Router()

router.post('/email', async (req, res) => {
    const { email, ip } = req.body

    if (!email || !ip) {
        return res.status(400).json({ error: 'Email and IP are required' })
    }

    try {
        const existingSubscriptions = await Subscribe.find({ ip })

        if (existingSubscriptions.length >= 3) {
            return res.status(429).json({ error: 'You have made too many requests from this IP' })
        }

        const newSubscription = new Subscribe({ email, ip })
        await newSubscription.save()
        res.status(201).json({ message: 'Subscription successful' })
    } catch (error) {
        console.error('Error saving subscription:', error)
        if (error.code === 11000) {
            res.status(400).json({ error: 'Email already subscribed' })
        } else {
            res.status(500).json({ error: 'Internal server error' })
        }
    }
})

export default router