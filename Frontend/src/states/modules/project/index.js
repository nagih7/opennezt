import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
	name: "ProJect",

	initialState: {
		title: "",
		projects: [],
		projectDetails: {},
		projectsBySeek: [],
		resultCreateProject: false,
		loadingGetProjects: false,
		loadingGetProjectDetails: false,
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
		startGetProjectDetails: (state) => ({
			...state,
			loadingGetProjectDetails: true,
		}),
		startGetProjectDetailsSuccess: (state, action) => ({
			...state,
			loadingGetProjectDetails: false,
			projectDetails: action.payload.data,
		}),
		startGetProjectDetailsFail: (state) => ({
			...state,
			loadingGetProjectDetails: false,
			projectDetails: {},
		}),

		// Seek project
		startRequestSeekProjects: (state) => ({
			...state,
			loadingSeekProjects: true,
		}),

		startRequestSeekProjectsSuccess: (state, action) => ({
			...state,
			projectsBySeek: action.payload.projects,
			loadingSeekProjects: false,
		}),
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
		startRequestSearchProjects : (state) => ({
			...state,
			loadingSearchProjects: true,
		}),
		startRequestSearchProjectsSuccess : (state, action) => ({
			...state,
			projectsBySeek: action.payload.projects,
			loadingSearchProjects: false,
		}),
		startRequestSearchProjectsFail : (state) => ({
			...state,
			projectsBySeek: [],
			loadingSearchProjects: false,
		}),
		startRequestProjectDetails: (state) => ({
			...state,
			loadingProjectDetails: true,
		  }),
		  startRequestProjectDetailsSuccess: (state, action) => ({
			...state,
			projectDetails: action.payload,
			loadingProjectDetails: false,
		  }),
		  startRequestProjectDetailsFail: (state) => ({
			...state,
			projectDetails: null,
			loadingProjectDetails: false,
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
	startGetProjectDetails,
	startGetProjectDetailsSuccess,
	startGetProjectDetailsFail,
	startRequestSeekProjects,
	startRequestSeekProjectsSuccess,
	startRequestSeekProjectsFail,
	startRequestCreateProject,
	startRequestCreateProjectSuccess,
	startRequestCreateProjectFail,
	startRequestSearchProjects,
	startRequestSearchProjectsSuccess,
	startRequestSearchProjectsFail,
	startRequestProjectDetails,
	startRequestProjectDetailsSuccess,
	startRequestProjectDetailsFail,
} = projectSlice.actions;

export default projectSlice.reducer;
