import { createSlice } from "@reduxjs/toolkit";

const founderSlice = createSlice({
	name: "founder",
	initialState: {
		founderProfile: {},
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
	},
});

export const {
	startRequestGetFounderProfile,
	startRequestGetFounderProfileSuccess,
	startRequestGetFounderProfileFail,
} = founderSlice.actions;

export default founderSlice.reducer;
