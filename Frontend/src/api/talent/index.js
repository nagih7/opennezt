import callApi from 'api/callApi'

import {
    // ========== RECRUIT TALENTS ========== //
    requestRecruitTalents,
    recruitTalentsSuccess,
    recruitTalentsFail,
    // ========== TALENT DETAILS ========== //
    requestGetTalentDetails,
    getTalentDetailsSuccess,
    getTalentDetailsFail,
    // =========== REPLY FRIEND REQUEST =========== //
    requestReplyFriendRequest,
    replyFriendRequestSuccess,
    replyFriendRequestFail,
    // =========== BOOKMARK TALENT =========== //
    requestBookmarkTalent,
    bookmarkTalentSuccess,
    bookmarkTalentFail,
    // =========== GET BOOKMARK STATUS =========== //
    requestGetBookmarkStatus,
    getBookmarkStatusSuccess,
    getBookmarkStatusFail,
    // =========== GET TALENT BOOKMARKS =========== //
    requestGetTalentBookmarks,
    getTalentBookmarksSuccess,
    getTalentBookmarksFail,
} from '../../states/modules/talent'

// ========== RECRUIT TALENTS ========== //
export const recruitTalents = (dataFilter) => async (dispatch, getState) => {
    let path = `talents/recruit?per_page=${dataFilter.perPage}&page=${dataFilter.page}`
    if (dataFilter.keySearch) {
        path += `&q=${dataFilter.keySearch}`
    }
    if (dataFilter.order && dataFilter.column) {
        path += `&order=${dataFilter.order}&column=${dataFilter.column}`
    }
    if (dataFilter.industry) {
        path += `&industry_id=${dataFilter.industry}`
    }
    if (dataFilter.experienceLevel) {
        path += `&experience_level_id=${dataFilter.experienceLevel}`
    }
    if (dataFilter.category) {
        path += `&category_id=${dataFilter.category}`
    }
    if (dataFilter.subcategory) {
        path += `&subcategory_id=${dataFilter.subcategory}`
    }
    if (dataFilter.skill) {
        path += `&skill_id=${dataFilter.skill}`
    }

    return callApi({
        method: 'get',
        apiPath: path,
        actionTypes: [requestRecruitTalents, recruitTalentsSuccess, recruitTalentsFail],
        variables: {},
        dispatch,
        getState,
    })
}

export const getTalentDetails = (id) => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `talents/${id}/details`,
        actionTypes: [requestGetTalentDetails, getTalentDetailsSuccess, getTalentDetailsFail],
        variables: {},
        dispatch,
        getState,
    })
}

// =========== REPLY FRIEND REQUEST =========== //
export const replyFriendRequest = (notificationId, action) => async (dispatch, getState) => {
    return callApi({
        method: 'put',
        apiPath: `notifications/${notificationId}/reply`,
        actionTypes: [requestReplyFriendRequest, replyFriendRequestSuccess, replyFriendRequestFail],
        variables: { action },
        dispatch,
        getState,
    })
}
// Gọi API để bookmark/unbookmark talent
export const bookmarkTalent = (data) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `talents/bookmark`,
        actionTypes: [requestBookmarkTalent, bookmarkTalentSuccess, bookmarkTalentFail],
        variables: data,
        dispatch,
        getState,
    });
};

// Gọi API để lấy trạng thái bookmark của talent
export const getUserBookmarksStatus = (target_ids) => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `talents/bookmarks-status/${target_ids}`,
        actionTypes: [requestGetBookmarkStatus, getBookmarkStatusSuccess, getBookmarkStatusFail],
        variables: {},
        dispatch,
        getState,
    });
};


// Gọi API để lấy danh sách talent đã bookmark
export const getUserTalentBookmarks = (data) => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `talents/bookmarks`,
        actionTypes: [requestGetTalentBookmarks, getTalentBookmarksSuccess, getTalentBookmarksFail],
        variables: data,
        dispatch,
        getState,
    });
};
