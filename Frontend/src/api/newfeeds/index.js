import callApi from "api/callApi";
import { getList, getListSuccess, getListFail } from "states/modules/newfeeds";

export const getListFeeds =
   (
      dataFilter = {
         limit: 5,
      }
   ) =>
   async (dispatch, getState) => {
      let path = `article/article-list?cursor=${dataFilter.cursor}&limit=${dataFilter.limit}`;
      return callApi({
         method: "get",
         apiPath: path,
         actionTypes: [getList, getListSuccess, getListFail],
         variables: {},
         dispatch,
         getState,
      });
   };
