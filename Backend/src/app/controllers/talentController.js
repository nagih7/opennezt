import * as talentService from '../services/talentService'

// =========== GET [Recruit Talents] =========== //
export async function recruitTalents(req, res) {
    const result = await talentService.recruitTalents(req.currentUser, req.query)
    res.jsonify(result)
}

// =========== GET [Talent Details] =========== //
export async function getTalentDetails(req, res) {
    const result = await talentService.getTalentDetails(req.currentUser, req.params)
    res.jsonify(result)
}

// =========== POST [Access to Talent] =========== //
export async function accessToTalent(req, res) {
    const result = await talentService.accessToTalent(req.currentUser, req.params)
    res.jsonify(result)
}

// ========== GET [ Bookmark Talent] =========== //
export async function bookmarkTalent(req, res) {
    const result = await talentService.bookmarkTalent(req.body, req.currentUser)
    res.status(200).jsonify(result)
}

// ========== GET [User Bookmark Status] =========== //
export async function getUserBookmarkStatus(req, res) {
    const result = await talentService.getUserBookmarksStatus(req.currentUser, req.params.target_ids)
    res.jsonify(result)
}

// ========== GET [User Bookmark List] =========== //
export async function getUserBookmarkList(req, res) {
    const result = await talentService.getUserTalentBookmarks(req.currentUser, req.query)
    res.jsonify(result)
}
