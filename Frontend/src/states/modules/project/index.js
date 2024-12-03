import { createSlice } from "@reduxjs/toolkit";
import { startRequest } from "../app";

const projectSlice = createSlice({
	name: "ProJect",

	initialState: {
		title: "",
		loadingGetProjects: false,
		loadingCreateNewProject: false,
		projects: [],
	},
	reducers: {
		setTitle: (state) => ({
			...state,
			title: "title",
		}),
		startRequestGetProjects: (state) => ({
			...state,
			loadingGetProjects: true,
		}),
		startRequestGetProjectsSuccess: (state, action) => ({
			...state,
			loadingGetProjects: false,
			projects: action.payload.data,
		}),
		startRequestGetProjectsFail: (state) => ({
			...state,
			loadingGetProjects: false,
		}),
		startRequestCreateNewProject: (state) => ({
			...state,
			loadingCreateNewProject: true,
		}),
		startRequestCreateNewProjectSuccess: (state) => ({
			...state,
			loadingCreateNewProject: false,
		}),
		startRequestCreateNewProjectFail: (state) => ({
			...state,
			loadingCreateNewProject: false,
		}),
	},
});

export const {
	setTitle,
	startRequestGetProjects,
	startRequestGetProjectsSuccess,
	startRequestGetProjectsFail,
	startRequestCreateNewProject,
	startRequestCreateNewProjectSuccess,
	startRequestCreateNewProjectFail,
} = projectSlice.actions;

export default projectSlice.reducer;
