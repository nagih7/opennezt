import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const projectSlice = createSlice({
	name: "ProJect",

	initialState: {
		title: "",
		projects: [],
		projectDetails: {},
		projectsBySeek: [],
		pendingRequests: [],
		resultCreateProject: null,
		loadingGetProjects: false,
		loadingGetProjectDetails: false,
		loadingCreateNewProject: false,
		loadingSeekProjects: false,
		loadingUpdatePitchDeck: false,
		loadingUpdateProject: false,
		resultUpdateProject: null,
		loadingDeleteProject: false,
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
			resultCreateProject: null,
		}),
		startRequestCreateNewProjectSuccess: (state, action) => {
			message.success("Create project successfully");
			return {
				...state,
				loadingCreateNewProject: false,
				resultCreateProject: true,
			};
		},
		startRequestCreateNewProjectFail: (state) => {
			message.error("Create project failed");
			return {
				...state,
				loadingCreateNewProject: false,
				resultCreateProject: false,
			};
		},
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
			projectsBySeek: action.payload.data,
			loadingSeekProjects: false,
		}),
		startRequestSeekProjectsFail: (state) => ({
			...state,
			projectsBySeek: [],
			loadingSeekProjects: false,
		}),
		startRequestUpdateProject: (state) => ({
			...state,
			loadingUpdateProject: true,
			resultUpdateProject: null,
		}),
		startRequestUpdateProjectSuccess: (state, action) => {
			message.success("Update project successfully");
			return {
				...state,
				loadingUpdateProject: false,
				resultUpdateProject: true,
			};
		},
		startRequestUpdateProjectFail: (state) => {
			message.error("Update project failed");
			return {
				...state,
				loadingUpdateProject: false,
				resultUpdateProject: false,
			};
		},
		startRequestDeleteProject: (state) => ({
			...state,
			loadingDeleteProject: true,
		}),
		startRequestDeleteProjectSuccess: (state) => {
			message.success("Delete project successfully");
			return {
				...state,
				loadingDeleteProject: false,
			};
		},
		startRequestDeleteProjectFail: (state) => {
			message.error("Delete project failed");
			return {
				...state,
				loadingDeleteProject: false,
			};
		},
		startGetPendingProjects: (state) => ({
			...state,
			loadingPendingProjects: true,
		}),
		startGetPendingProjectsSuccess: (state, action) => ({
			...state,
			pendingRequests: action.payload.data,
			loadingPendingProjects: false,
		}),
		startGetPendingProjectsFail: (state) => ({
			...state,
			pendingRequests: [],
			loadingPendingProjects: false,
		}),

		startUpdateRequestStatus: (state) => ({
			...state,
			loadingUpdateStatus: true,
		}),
		startUpdateRequestStatusSuccess: (state, action) => ({
			...state,
			updatedRequest: action.payload.data,
			loadingUpdateStatus: false,
		}),
		startUpdateRequestStatusFail: (state) => ({
			...state,
			updatedRequest: null,
			loadingUpdateStatus: false,
		}),
		startRequestJoinProject: (state) => ({
			...state,
			loadingJoinProject: true,
		}),
		startRequestJoinProjectSuccess: (state) => ({
			...state,
			loadingJoinProject: false,
		}),
		startRequestJoinProjectFail: (state) => ({
			...state,
			loadingJoinProject: false,
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
	startRequestUpdateProject,
	startRequestUpdateProjectSuccess,
	startRequestUpdateProjectFail,
	startRequestDeleteProject,
	startRequestDeleteProjectSuccess,
	startRequestDeleteProjectFail,
	startGetPendingProjects,
	startGetPendingProjectsSuccess,
	startGetPendingProjectsFail,
	startUpdateRequestStatus,
	startUpdateRequestStatusSuccess,
	startUpdateRequestStatusFail,
	startRequestJoinProject,
	startRequestJoinProjectSuccess,
	startRequestJoinProjectFail,
} = projectSlice.actions;

export default projectSlice.reducer;
