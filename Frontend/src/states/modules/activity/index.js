import { createSlice } from "@reduxjs/toolkit";

const activitySlice = createSlice({
	name: "Activity",
	initialState: {
		// ========== PROJECT ACCESS ========== //
		isLoadingAccessProject: false,
		// ========== MY PROJECT ACCESS ========== //
		myProjectAccess: [],
		isLoadingGetMyProjectAccess: false,
		// ========== ACCESS TO MY PROJECTS ========== //
		accessToMyProjects: [],
		isLoadinggGetAccessToMyProjects: false,
		// ========== TALENT ACCESS ========== //
		isLoadingAccessTalent: false,
		// ========== ACCESS TO MY PROFILE ========== //
		accessToMyProfile: [],
		isLoadingGetAccessToMyProfile: false,
	},
	reducers: {
		// ========== PROJECT ACCESS ========== //
		requestAccessToProject: (state) => ({
			...state,
			isLoadingAccessProject: true,
		}),
		accessToProjectSuccess: (state) => ({
			...state,
			isLoadingAccessProject: false,
		}),
		accessToProjectFailure: (state) => ({
			...state,
			isLoadingAccessProject: false,
		}),
		// ========== MY PROJECT ACCESS ========== //
		requestGetMyProjectAccess: (state) => ({
			...state,
			isLoadingGetMyProjectAccess: true,
		}),
		getMyProjectAccessSuccess: (state, action) => ({
			...state,
			myProjectAccess: action.payload.data,
			isLoadingGetMyProjectAccess: false,
		}),
		getMyProjectAccessFail: (state) => ({
			...state,
			isLoadingGetMyProjectAccess: false,
		}),
		// ========== ACCESS TO MY PROJECTS ========== //
		requestGetAccessToMyProjects: (state) => ({
			...state,
			isLoadinggGetAccessToMyProjects: true,
		}),
		getAccessToMyProjectsSuccess: (state, action) => ({
			...state,
			accessToMyProjects: action.payload.data,
			isLoadinggGetAccessToMyProjects: false,
		}),
		getAccessToMyProjectsFail: (state) => ({
			...state,
			isLoadinggGetAccessToMyProjects: false,
		}),
		// ========== TALENT ACCESS ========== //
		requestAccessToTalent: (state) => ({
			...state,
			isLoadingAccessTalent: true,
		}),
		accessToTalentSuccess: (state) => ({
			...state,
			isLoadingAccessTalent: false,
		}),
		accessToTalentFailure: (state) => ({
			...state,
			isLoadingAccessTalent: false,
		}),
		// ========== ACCESS TO MY PROFILE ========== //
		requestGetAccessToMyProfile: (state) => ({
			...state,
			isLoadingGetAccessToMyProfile: true,
		}),
		getAccessToMyProfileSuccess: (state, action) => ({
			...state,
			accessToMyProfile: action.payload.data,
			isLoadingGetAccessToMyProfile: false,
		}),
		getAccessToMyProfileFail: (state) => ({
			...state,
			isLoadingGetAccessToMyProfile: false,
		}),
	},
});

export const {
	// ========== PROJECT ACCESS ========== //
	requestAccessToProject,
	accessToProjectSuccess,
	accessToProjectFailure,
	// ========== MY PROJECT ACCESS ========== //
	requestGetMyProjectAccess,
	getMyProjectAccessSuccess,
	getMyProjectAccessFail,
	// ========== ACCESS TO MY PROJECTS ========== //
	requestGetAccessToMyProjects,
	getAccessToMyProjectsSuccess,
	getAccessToMyProjectsFail,
	// ========== TALENT ACCESS ========== //
	requestAccessToTalent,
	accessToTalentSuccess,
	accessToTalentFailure,
	// ========== ACCESS TO MY PROFILE ========== //
	requestGetAccessToMyProfile,
	getAccessToMyProfileSuccess,
	getAccessToMyProfileFail,
} = activitySlice.actions;

export default activitySlice.reducer;
