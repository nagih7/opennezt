import { createSlice } from "@reduxjs/toolkit";
import { toaster } from "components/UI/toaster";
import { last } from "lodash";

const projectSlice = createSlice({
	name: "ProJect",

	initialState: {
		title: "",

		projects: [],
		projectDetails: {},
		projectsBySeek: [],
		projectInvitations: [],
		resultCreateProject: null,
		loadingGetProjects: false,
		loadingGetProjectDetails: false,
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
		// ========== My projects ========== //
		myProjects: [],
		myProjectDetails: {},
		isLoadingCreateNewProject: false,
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
		isLoadingGetListMyProjects: false,
		isLoadingGetMyProjectDetails: false,
		paginationListMyProjects: {
			currentPage: 1,
			perPage: 6,
			totalPage: 1,
			totalRecord: 0,
		},
	},
	reducers: {
		setTitle: (state) => ({
			...state,
			title: "title",
		}),
		// ========== My projects ========== //
		requestGetListMyProjects: (state) => ({
			...state,
			isLoadingGetListMyProjects: true,
		}),
		getListMyProjectsSuccess: (state, action) => ({
			...state,
			myProjects: [...state.myProjects, ...action.payload.data.projects],
			paginationListMyProjects: {
				currentPage: action.payload.data.page,
				perPage: action.payload.data.per_page,
				totalPage: action.payload.data.last_page,
				totalRecord: action.payload.data.total,
			},
			isLoadingGetListMyProjects: false,
		}),
		getListMyProjectsFail: (state) => ({
			...state,
			isLoadingGetListMyProjects: false,
		}),

		// ========== CREATE NEW PROJECT ========== //
		requestCreateNewProject: (state) => ({
			...state,
			isLoadingCreateNewProject: true,
		}),
		createNewProjectSuccess: (state, action) => {
			toaster.create({
				title: "Create project successfully",
				description: "You have successfully created the project",
				type: "success",
			});
			window.location.href = `/projects/details/${action.payload.data.project_id}`;
			return {
				...state,
				isLoadingCreateNewProject: false,
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
				isLoadingCreateNewProject: false,
				resultCreateProject: false,
			};
		},
		// ========== MY PROJECT DETAILS ========== //
		requestGetMyProjectDetails: (state) => ({
			...state,
			isLoadingGetMyProjectDetails: true,
		}),
		getMyProjectDetailsSuccess: (state, action) => ({
			...state,
			myProjectDetails: action.payload.data,
			isLoadingGetMyProjectDetails: false,
		}),
		getMyProjectDetailsFail: (state) => ({
			...state,
			isLoadingGetMyProjectDetails: false,
		}),

		// ========== PROJECT DETAILS ========== //
		requestGetProjectDetails: (state) => ({
			...state,
			loadingGetProjectDetails: true,
		}),
		getProjectDetailsSuccess: (state, action) => ({
			...state,
			loadingGetProjectDetails: false,
			// projectDetails: action.payload.data,
		}),
		getProjectDetailsFail: (state) => ({
			...state,
			loadingGetProjectDetails: false,
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
	requestGetListMyProjects,
	getListMyProjectsSuccess,
	getListMyProjectsFail,
	requestCreateNewProject,
	createNewProjectSuccess,
	createNewProjectFail,
	requestGetMyProjectDetails,
	getMyProjectDetailsSuccess,
	getMyProjectDetailsFail,
	// ========== Projects ========== //
	startRequestGetProjects,
	startRequestGetProjectsSuccess,
	startRequestGetProjectsFail,
	requestGetProjectDetails,
	getProjectDetailsSuccess,
	getProjectDetailsFail,
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
