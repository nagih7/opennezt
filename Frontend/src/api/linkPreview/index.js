import callApi from 'api/callApi'
import { getLinkPreview, getLinkPreviewFail, getLinkPreviewSuccess } from 'states/modules/linkPreview'

export const handleGetLinkPreview =
    ({ data }) =>
    async (dispatch, getState) => {
        const path = `link-preview/link-preview`
        return callApi({
            method: 'post',
            apiPath: path,
            actionTypes: [getLinkPreview, getLinkPreviewSuccess, getLinkPreviewFail],
            variables: data,
            dispatch,
            getState,
        })
    }
