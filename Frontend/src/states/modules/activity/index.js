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
} = activitySlice.actions;

export default activitySlice.reducer;
