import { createListCollection } from "@chakra-ui/react";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "home",
	initialState: {
		// INDUSTRIES
		industryFramework: createListCollection({
			items: [],
		}),
		isLoadingGetIndustryFramwork: false,
		// EXPERIENCE_LEVELS
		experienceLevelFramework: createListCollection({
			items: [],
		}),
		isLoadingGetExperienceLevelFramwork: false,
		// CATEGORIES
		categoryFramework: createListCollection({
			items: [],
		}),
		subCategoryFramework: createListCollection({
			items: [],
		}),
		isLoadingGetCategoryFramework: false,
		isLoadingGetSubCategoryFramework: false,
		// SKILLS
		skillFramework: createListCollection({
			items: [],
		}),
		isLoadingGetSkillFramework: false,
	},
	reducers: {
		// INDUSTRIES
		requestgetIndustryFramework: (state) => ({
			...state,
			isLoadingGetIndustryFramwork: true,
		}),
		getIndustryFrameworkSuccess: (state, action) => ({
			...state,
			isLoadingGetIndustryFramwork: false,
			industryFramework: createListCollection({
				items: action.payload.data.map((industry) => ({
					label: industry.name,
					value: industry._id,
				})),
			}),
		}),
		getIndustryFrameworkFail: (state) => ({
			...state,
			isLoadingGetIndustryFramwork: false,
		}),
		// EXPERIENCE_LEVELS
		requestgetExperienceLevelFramwork: (state) => ({
			...state,
			isLoadingGetExperienceLevelFramwork: true,
		}),
		getExperienceLevelFramworkSuccess: (state, action) => ({
			...state,
			isLoadingGetExperienceLevelFramwork: false,
			experienceLevelFramework: createListCollection({
				items: action.payload.data.map((experienceLevel) => ({
					label: experienceLevel.name,
					value: experienceLevel._id,
				})),
			}),
		}),
		getExperienceLevelFramworkFail: (state) => ({
			...state,
			isLoadingGetExperienceLevelFramwork: false,
		}),
		// CATEGORIES
		requestGetCategoryFramework: (state) => ({
			...state,
			isLoadingGetAllCategory: true,
		}),
		getCategoryFrameworkSuccess: (state, action) => ({
			...state,
			isLoadingGetAllCategory: false,
			categoryFramework: createListCollection({
				items: action.payload.data.map((category) => ({
					label: category.name,
					value: category._id,
				})),
			}),
		}),
		getCategoryFrameworkFail: (state) => ({
			...state,
			isLoadingGetAllCategory: false,
		}),
		requestGetSubCategoryFramework: (state) => ({
			...state,
			isLoadingGetSubCategoryFramework: true,
		}),
		getSubCategoryFrameworkSuccess: (state, action) => ({
			...state,
			isLoadingGetSubCategoryFramework: false,
			subCategoryFramework: createListCollection({
				items: action.payload.data.map((category) => ({
					label: category.name,
					value: category._id,
				})),
			}),
		}),
		getSubCategoryFrameworkFail: (state) => ({
			...state,
			isLoadingGetSubCategoryFramework: false,
		}),
		// SKILLS
		requestGetSkillFramework: (state) => ({
			...state,
			isLoadingGetSkillFramework: true,
		}),
		getSkillFrameworkSuccess: (state, action) => ({
			...state,
			isLoadingGetSkillFramework: false,
			skillFramework: createListCollection({
				items: action.payload.data.map((skill) => ({
					label: skill.name,
					value: skill._id,
				})),
			}),
		}),
		getSkillFrameworkFail: (state) => ({
			...state,
			isLoadingGetSkillFramework: false,
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
	// CATEGORIES
	requestGetCategoryFramework,
	getCategoryFrameworkSuccess,
	getCategoryFrameworkFail,
	requestGetSubCategoryFramework,
	getSubCategoryFrameworkSuccess,
	getSubCategoryFrameworkFail,
	// SKILLS
	requestGetSkillFramework,
	getSkillFrameworkSuccess,
	getSkillFrameworkFail,
} = userSlice.actions;

export default userSlice.reducer;
