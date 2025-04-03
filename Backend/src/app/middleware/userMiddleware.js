import { isValidObjectId } from 'mongoose'
import { User } from '@/models'
import { abort } from '@/utils/helpers'

export async function checkUserId(req, res, next) {
    // if (isValidObjectId(req.params.id)) {
    //     const user = await User.findOne({_id: req.params.id})
    //     if (user) {
    //         req.user = user
    //         next()
    //         return
    //     }
    // }
    if (isValidObjectId(req.currentUser._id)) {
        const user = await User.findOne({ _id: req.currentUser._id })
        if (user) {
            req.user = user
            next()
            return
        }
    }
    abort(404, 'User not found.')
}

export async function checkUserIdDelete(req, res, next) {
    if (isValidObjectId(req.params.id)) {
        const user = await User.findOne({ _id: req.params.id })
        if (user) {
            req.user = user
            next()
            return
        }
    }
}

export function checkCanDeleteUser(req, res, next) {
    if (req.currentUser._id.equals(req.params.id)) {
        abort(403, 'Cannot delete yourself.')
    }
    next()
}
