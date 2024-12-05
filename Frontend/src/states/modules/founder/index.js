import { createSlice } from "@reduxjs/toolkit";

const founderSlice = createSlice({
	name: "founder",
	initialState: {
		founderProfile: {},
		loadingUpdateFounderProfile: false,
	},
	reducers: {
		// setTitle: (state) => ({
		// 	...state,
		// 	title: "title",
		// }),
		startRequestGetFounderProfile: (state) => ({
			...state,
		}),
		startRequestGetFounderProfileSuccess: (state, action) => ({
			...state,
			founderProfile: action.payload.data,
		}),
		startRequestGetFounderProfileFail: (state) => ({
			...state,
			founderProfile: {},
		}),
		startUpdateFounderProfile: (state) => ({
			...state,
			loadingUpdateFounderProfile: true,
		}),
		startUpdateFounderProfileSuccess: (state, action) => ({
			...state,
			founderProfile: action.payload.data,
			loadingUpdateFounderProfile: false,
		}),
		startUpdateFounderProfileFail: (state) => ({
			...state,
			loadingUpdateFounderProfile: false,
		}),
	},
});

export const {
	startRequestGetFounderProfile,
	startRequestGetFounderProfileSuccess,
	startRequestGetFounderProfileFail,
	startUpdateFounderProfile,
	startUpdateFounderProfileSuccess,
	startUpdateFounderProfileFail,
} = founderSlice.actions;

export default founderSlice.reducer;
