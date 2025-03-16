import { createSlice } from "@reduxjs/toolkit";
import { toaster } from "components/UI/toaster";

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

		// ========== NEW ========== //
		formCreateProject: {
			name: "",
			description: "",
			industries: [],
			stage: "",
			revenues: [{ date: "", amount: "", currency: "" }],
			funding_sources: [{ name: "", amount: "", currency: "" }],
			additional_infos: [{ name: "", content: "" }],
			logo: null,
			background: null,
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
		createNewProjectSuccess: (state, action) => {
			toaster.create({
				title: "Create project successfully",
				description: "You have successfully created the project",
				type: "success",
			});
			window.location.href = `/project/details/${action.payload.data.project_id}`;
			return {
				...state,
				loadingCreateNewProject: false,
				resultCreateProject: true,
			};
		},
		createNewProjectFail: (state, action) => {
			toaster.create({
				title: `${Object.values(action.payload.data.detail)[0]}`,
				description: "You have failed to create the project",
				type: "error",
			});
			return {
				...state,
				loadingCreateNewProject: false,
				resultCreateProject: false,
			};
		},
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
			toaster.create({
				title: "Update project successfully",
				description: "You have successfully updated the project",
				type: "success",
			});
			return {
				...state,
				loadingUpdateProject: false,
				resultUpdateProject: true,
			};
		},
		startRequestUpdateProjectFail: (state) => {
			toaster.create({
				title: "Update project failed",
				description: "You have failed to update the project",
				type: "error",
			});
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
			toaster.create({
				title: "Delete project successfully",
				description: "You have successfully deleted the project",
				type: "success",
			});

			return {
				...state,
				loadingDeleteProject: false,
			};
		},
		startRequestDeleteProjectFail: (state) => {
			toaster.create({
				title: "Delete project failed",
				description: "You have failed to delete the project",
				type: "error",
			});
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
			toaster.create({
				title: "Update background successfully",
				description: "You have successfully updated the background",
				type: "success",
			});
			return {
				...state,
				loadingUpdateBackground: false,
			};
		},

		startRequestUpdateBackgroundFail: (state) => {
			toaster.create({
				title: "Update background failed",
				description: "You have failed to update the background",
				type: "error",
			});
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

		// ========== NEW ========== //
		onChangeFormCreateProject: (state, action) => {
			Object.keys(action.payload).forEach((key) => {
				state.formCreateProject[key] = action.payload[key];
			});
		},
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
	// ========== NEW ========== //
	onChangeFormCreateProject,
} = projectSlice.actions;

export default projectSlice.reducer;
