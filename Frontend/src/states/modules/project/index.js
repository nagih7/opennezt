import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const projectSlice = createSlice({
	name: "ProJect",

	initialState: {
		title: "",
		projects: [],
		projectDetails: null,
		projectsBySeek: [],
		projectInvitations: [],
		resultCreateProject: null,
		loadingGetProjects: false,
		loadingGetProjectDetails: false,
		loadingCreateNewProject: false,
		loadingSeekProjects: false,
		loadingUpdatePitchDeck: false,
		loadingUpdateProject: false,
		resultUpdateProject: null,
		loadingDeleteProject: false,
		loadingGetProjectInvitations: false,
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
			projectDetails: null,
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
		startRequestUpdateBackground: (state) => ({
			...state,
			loadingUpdateBackground: true,
		}),

		startRequestUpdateBackgroundSuccess: (state, action) => {
			message.success("Update background successfully");
			return {
				...state,
				loadingUpdateBackground: false,
			};
		},

		startRequestUpdateBackgroundFail: (state) => {
			message.error("Update background failed");
			return {
				...state,
				loadingUpdateBackground: false,
			};
		},
		startRequestGetProjectInvitations: (state) => ({
			...state,
			loadingGetProjectInvitations: true,
		}),
		startRequestGetProjectInvitationsSuccess: (state, action) => ({
			...state,
			loadingGetProjectInvitations: false,
			projectInvitations: action.payload.data,
		}),
		startRequestGetProjectInvitationsFail: (state) => ({
			...state,
			loadingGetProjectInvitations: false,
			projectInvitations: [],
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
	startUpdateRequestStatus,
	startUpdateRequestStatusSuccess,
	startUpdateRequestStatusFail,
	startRequestUpdateBackground,
	startRequestUpdateBackgroundSuccess,
	startRequestUpdateBackgroundFail,
	startRequestGetProjectInvitations,
	startRequestGetProjectInvitationsSuccess,
	startRequestGetProjectInvitationsFail,
} = projectSlice.actions;

export default projectSlice.reducer;
