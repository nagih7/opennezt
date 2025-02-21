import { createListCollection } from "@chakra-ui/react";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "home",
	initialState: {
		// INDUSTRIES
		industryFramework: createListCollection({
			items: [],
		}),
		isLoadingGetAllIndustry: false,
		// EXPERIENCE_LEVELS
		experienceLevelFramework: createListCollection({
			items: [],
		}),
		isLoadingGetAllExperienceLevel: false,
	},
	reducers: {
		// INDUSTRIES
		requestgetIndustryFramework: (state) => ({
			...state,
			isLoadingGetAllIndustry: true,
		}),
		getIndustryFrameworkSuccess: (state, action) => ({
			...state,
			isLoadingGetAllIndustry: false,
			industryFramework: createListCollection({
				items: action.payload.data.map((industry) => ({
					label: industry.name,
					value: industry._id,
				})),
			}),
		}),
		getIndustryFrameworkFail: (state) => ({
			...state,
			isLoadingGetAllIndustry: false,
		}),
		// EXPERIENCE_LEVELS
		requestgetExperienceLevelFramwork: (state) => ({
			...state,
			isLoadingGetAllExperienceLevel: true,
		}),
		getExperienceLevelFramworkSuccess: (state, action) => ({
			...state,
			isLoadingGetAllExperienceLevel: false,
			experienceLevelFramework: createListCollection({
				items: action.payload.data.map((experienceLevel) => ({
					label: experienceLevel.name,
					value: experienceLevel._id,
				})),
			}),
		}),
		getExperienceLevelFramworkFail: (state) => ({
			...state,
			isLoadingGetAllExperienceLevel: false,
		}),
	},
});

export const {
	// INDUSTRIES
	requestgetIndustryFramework,
	getIndustryFrameworkSuccess,
	getIndustryFrameworkFail,
	// EXPERIENCE_LEVELS
	requestgetExperienceLevelFramwork,
	getExperienceLevelFramworkSuccess,
	getExperienceLevelFramworkFail,
} = userSlice.actions;

export default userSlice.reducer;
