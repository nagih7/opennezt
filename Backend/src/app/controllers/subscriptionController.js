import * as subscriptionService from '../services/subscriptionService'

export async function subscribe(req, res) {
    await subscriptionService.subscribe(req.currentUser, req.body)
    return res.jsonify('Subscription successful')
}

export async function unsubscribe(req, res) {
    const { endpoint } = req.body
    await subscriptionService.unsubscribe(req.currentUser, endpoint)
    return res.jsonify('Unsubscribed successfully')
}
