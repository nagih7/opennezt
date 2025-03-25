import { createSlice } from "@reduxjs/toolkit";

const activitySlice = createSlice({
	name: "Activity",
	initialState: {
		// ========== PROJECT ACCESS ========== //
		isLoadingAccessProject: false,
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
	},
});

export const {
	// ========== PROJECT ACCESS ========== //
	requestAccessToProject,
	accessToProjectSuccess,
	accessToProjectFailure,
} = activitySlice.actions;

export default activitySlice.reducer;
