import callReduxApi from 'api/callReduxApi'
import { getLinkPreview, getLinkPreviewFail, getLinkPreviewSuccess } from 'store/modules/linkPreview'

export const handleGetLinkPreview =
   ({ data }) =>
   async (dispatch, getState) => {
      const path = `link-preview/link-preview`
      return callReduxApi({
         method: 'post',
         apiPath: path,
         actionTypes: [getLinkPreview, getLinkPreviewSuccess, getLinkPreviewFail],
         variables: data,
         dispatch,
         getState,
      })
   }
