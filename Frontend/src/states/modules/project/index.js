import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const projectSlice = createSlice({
	name: "ProJect",

	initialState: {
		title: "",
		// ========== My projects ========== //
		myProjects: [],
		isLoadingGetMyProjects: false,
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
		formSeekProjects: {
			industry: null,
			stage: null,
			name: null,
			page: 0,
		},
	},
	reducers: {
		setTitle: (state) => ({
			...state,
			title: "title",
		}),
		// ========== My projects ========== //
		requestGetMyProjects: (state) => ({
			...state,
			isLoadingGetMyProjects: true,
		}),
		getMyProjectsSuccess: (state, action) => ({
			...state,
			myProjects: action.payload.data,
			isLoadingGetMyProjects: false,
		}),
		getMyProjectsFail: (state) => ({
			...state,
			isLoadingGetMyProjects: false,
		}),

		requestCreateNewProject: (state) => ({
			...state,
			loadingCreateNewProject: true,
		}),
		createNewProjectSuccess: (state, action) => ({
			...state,
			loadingCreateNewProject: false,
		}),
		createNewProjectFail: (state) => ({
			...state,
			loadingCreateNewProject: false,
		}),
		// ========== Projects ========== //
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
			projectsBySeek: action.payload.data.projects,
			formSeekProjects: {
				...state.formSeekProjects,
				page: action.payload.data.page,
			},
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

		// formSeekProjects
		setFormSeekProjects: (state, action) => {
			const { event, nameSelect } = action.payload;
			if (nameSelect) {
				return {
					...state,
					formSeekProjects: {
						...state.formSeekProjects,
						[nameSelect]: event,
						page: 0,
					},
				};
			} else {
				const { name, value } = event.target;
				return {
					...state,
					formSeekProjects: {
						...state.formSeekProjects,
						[name]: value,
						page: 0,
					},
				};
			}
		},
		resetFormSeekProjects: (state) => ({
			...state,
			formSeekProjects: {
				industry: null,
				stage: null,
				name: null,
				page: 0,
			},
		}),
	},
});

export const {
	setTitle,
	// ========== My projects ========== //
	requestGetMyProjects,
	getMyProjectsSuccess,
	getMyProjectsFail,
	requestCreateNewProject,
	createNewProjectSuccess,
	createNewProjectFail,
	// ========== Projects ========== //
	startRequestGetProjects,
	startRequestGetProjectsSuccess,
	startRequestGetProjectsFail,
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
	setFormSeekProjects,
	resetFormSeekProjects,
} = projectSlice.actions;

export default projectSlice.reducer;
