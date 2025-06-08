import callReduxApi from 'api/callReduxApi'
import { getLinkPreview, getLinkPreviewFail, getLinkPreviewSuccess } from 'store/modules/linkPreview'
import { AppDispatch } from '~/store'

export const handleGetLinkPreview =
   ({ data }: any) =>
   async (dispatch: AppDispatch, getState: () => any) => {
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
