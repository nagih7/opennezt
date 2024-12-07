import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
	name: "ProJect",

	initialState: {
		title: "",
		projects: [],
		projectsBySeek: [],
		resultCreateProject: false,
		loadingGetProjects: false,
		loadingCreateNewProject: false,
		loadingSeekProjects: false,
		loadingUpdatePitchDeck: false,
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
			resultCreateProject: false,
		}),
		startRequestCreateNewProjectSuccess: (state, action) => ({
			...state,
			loadingCreateNewProject: false,
			resultCreateProject: true,
		}),
		startRequestCreateNewProjectFail: (state) => ({
			...state,
			loadingCreateNewProject: false,
			resultCreateProject: false,
		}),

		// Seek project
		startRequestSeekProjects: (state) => ({
			...state,
			loadingSeekProjects: true,
		}),

		startRequestSeekProjectsSuccess: (state, action) => {
			console.log("Action payload:", action.payload);
			return {
				...state,
				projectsBySeek: action.payload.projects,
				loadingSeekProjects: false,
			};
		},
		startRequestSeekProjectsFail: (state) => ({
			...state,
			projectsBySeek: [],
			loadingSeekProjects: false,
		}),
		startRequestCreateProject: (state) => ({
			...state,
			loading: true,
		}),
		startRequestCreateProjectSuccess: (state, action) => ({
			...state,
			projectsBySeek: [...state.projects, action.payload.data],
			loading: false,
		}),
		startRequestCreateProjectFail: (state) => ({
			...state,
			loading: false,
		}),
		// Update project
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
	startRequestSeekProjects,
	startRequestSeekProjectsSuccess,
	startRequestSeekProjectsFail,
	startRequestCreateProject,
	startRequestCreateProjectSuccess,
	startRequestCreateProjectFail,
} = projectSlice.actions;

export default projectSlice.reducer;
