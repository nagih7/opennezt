import callApi from 'api/callApi'

import {
   requestMatchingProjects,
   matchingProjectsSuccess,
   matchingProjectsFail,
} from '../../store/modules/artificialIntelligence'

export const matchingProjects = (linkedInUsername) => async (dispatch, getState) => {
   let path = `ai/matching/projects`
   if (linkedInUsername) {
      path += `?linkedin_username=${linkedInUsername}`
   }
   return callApi({
      method: 'get',
      apiPath: path,
      actionTypes: [requestMatchingProjects, matchingProjectsSuccess, matchingProjectsFail],
      variables: {},
      dispatch,
      getState,
   })
}
