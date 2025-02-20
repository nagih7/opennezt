import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "home",
	initialState: {
		// INDUSTRIES
		industries: [],
		isLoadingGetAllIndustry: false,
		// EXPERIENCE_LEVELS
		experienceLevels: [],
		isLoadingGetAllExperienceLevel: false,
	},
	reducers: {
		// INDUSTRIES
		requestGetAllIndustries: (state) => ({
			...state,
			isLoadingGetAllIndustry: true,
		}),
		getAllIndustriesSuccess: (state, action) => ({
			...state,
			isLoadingGetAllIndustry: false,
			industries: action.payload.data,
		}),
		getAllIndustriesFail: (state) => ({
			...state,
			isLoadingGetAllIndustry: false,
		}),
		// EXPERIENCE_LEVELS
		requestGetAllExperienceLevels: (state) => ({
			...state,
			isLoadingGetAllExperienceLevel: true,
		}),
		getAllExperienceLevelsSuccess: (state, action) => ({
			...state,
			isLoadingGetAllExperienceLevel: false,
			experienceLevels: action.payload.data,
		}),
		getAllExperienceLevelsFail: (state) => ({
			...state,
			isLoadingGetAllExperienceLevel: false,
		}),
	},
});

export const {
	// INDUSTRIES
	requestGetAllIndustries,
	getAllIndustriesSuccess,
	getAllIndustriesFail,
	// EXPERIENCE_LEVELS
	requestGetAllExperienceLevels,
	getAllExperienceLevelsSuccess,
	getAllExperienceLevelsFail,
} = userSlice.actions;

export default userSlice.reducer;
