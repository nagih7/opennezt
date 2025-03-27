import {isValidObjectId} from 'mongoose'
import {User} from '@/models'
import {abort} from '@/utils/helpers'
import {DecodeBase64} from '@/utils/classes'

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
        const user = await User.findOne({_id: req.currentUser._id})
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
        const user = await User.findOne({_id: req.params.id})
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

export async function validateProject(req, res, next) {
    const {pitch_deck, background} = req.body
    if (pitch_deck && pitch_deck.file && pitch_deck.name) {
        req.body.pitch_deck = await DecodeBase64(pitch_deck.file, pitch_deck.name)
    }
    if (background && background.file && background.name) {
        req.body.background = await DecodeBase64(background.file, background.name)
    }
    next()
}
