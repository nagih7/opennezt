import { createSlice } from "@reduxjs/toolkit";

const seekprojectSlice = createSlice({
  name: "seekproject",
  initialState: {
    projects: [],
    loading: false,
  },
  reducers: {
    startRequestGetProjects: (state) => ({
      ...state,
      loading: true,
    }),
    startRequestGetProjectsSuccess: (state, action) => ({
      ...state,
      projects: action.payload.data,
      loading: false,
    }),
    startRequestGetProjectsFail: (state) => ({
      ...state,
      projects: [],
      loading: false,
    }),
    startRequestCreateProject: (state) => ({
      ...state,
      loading: true,
    }),
    startRequestCreateProjectSuccess: (state, action) => ({
      ...state,
      projects: [...state.projects, action.payload.data],
      loading: false,
    }),
    startRequestCreateProjectFail: (state) => ({
      ...state,
      loading: false,
    }),
  },
});

export const {
  startRequestGetProjects,
  startRequestGetProjectsSuccess,
  startRequestGetProjectsFail,
  startRequestCreateProject,
  startRequestCreateProjectSuccess,
  startRequestCreateProjectFail,
} = seekprojectSlice.actions;

export default seekprojectSlice.reducer;