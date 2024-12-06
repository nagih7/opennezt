import callApi from "api/callApi";
import {
  startRequestGetProjects,
  startRequestGetProjectsSuccess,
  startRequestGetProjectsFail,
  startRequestCreateProject,
  startRequestCreateProjectSuccess,
  startRequestCreateProjectFail,
} from "../../states/modules/seekproject";


export const requestsProject = (requestProjectData) => async (dispatch, getState) => {
  return callApi({
    method: "post",
    apiPath: `seek/requests-project`,
    actionTypes: [
      startRequestCreateProject,
      startRequestCreateProjectSuccess,
      startRequestCreateProjectFail,
    ],
    variables: requestProjectData,
    dispatch,
    getState,
  });
};

export const getMatchingProjects = (founder_id) => async (dispatch, getState) => {
  return callApi({
    method: "get",
    apiPath: `seek/founder/${founder_id}/matching-projects`,
    actionTypes: [
      startRequestGetProjects,
      startRequestGetProjectsSuccess,
      startRequestGetProjectsFail,
    ],
    variables: {},
    dispatch,
    getState,
  });
};