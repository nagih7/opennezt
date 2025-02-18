import callApi from "api/callApi";
import { getList, getListSuccess, getListFail } from "states/modules/article";

export const getListFeeds =
   (
      dataFilter = {
         limit: 5,
      }
   ) =>
   async (dispatch, getState) => {
      let path = `article/article-list?cursor=${dataFilter.cursor}&limit=${dataFilter.limit}`;
      console.log("path" + path);
      return callApi({
         method: "get",
         apiPath: path,
         actionTypes: [getList, getListSuccess, getListFail],
         variables: {},
         dispatch,
         getState,
      });
   };
