import { createSlice } from "@reduxjs/toolkit";

const activitySlice = createSlice({
	name: "Activity",
	initialState: {
		// ========== PROJECT ACCESS ========== //
		isLoadingAccessProject: false,
		// ========== MY PROJECT ACCESS ========== //
		myProjectAccess: [],
		isLoadingGetMyProjectAccess: false,
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
} = activitySlice.actions;

export default activitySlice.reducer;
