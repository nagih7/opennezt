import { createListCollection } from "@chakra-ui/react";
import { createSlice } from "@reduxjs/toolkit";
import { toaster } from "components/UI/toaster";

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
		// STAGES
		stageFramework: createListCollection({
			items: [],
		}),
		isLoadingGetStageFramework: false,
		// PROJECT ROLE
		projectRoleFramework: createListCollection({
			items: [],
		}),
		projectTeamRoleFramework: createListCollection({
			items: [],
		}),
		isLoadingGetProjectRoleFramework: false,

		// REQUEST ADD FRIEND
		isLoadingSendFriendRequest: false,
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
		// STAGES
		requestGetStageFramework: (state) => ({
			...state,
			isLoadingGetStageFramework: true,
		}),
		getStageFrameworkSuccess: (state, action) => ({
			...state,
			isLoadingGetStageFramework: false,
			stageFramework: createListCollection({
				items: action.payload.data.map((stage) => ({
					label: stage.name,
					value: stage._id,
				})),
			}),
		}),
		getStageFrameworkFail: (state) => ({
			...state,
			isLoadingGetStageFramework: false,
		}),
		// PROJECT ROLE
		requestGetProjectRoleFramework: (state) => ({
			...state,
			isLoadingGetProjectRoleFramework: true,
		}),
		getProjectRoleFrameworkSuccess: (state, action) => ({
			...state,
			isLoadingGetProjectRoleFramework: false,
			projectRoleFramework: createListCollection({
				items: action.payload.data.roles.map((role) => ({
					label: role.name,
					value: role._id,
				})),
			}),
			projectTeamRoleFramework: createListCollection({
				items: action.payload.data.teamRoles.map((role) => ({
					label: role.name,
					value: role._id,
				})),
			}),
		}),
		getProjectRoleFrameworkFail: (state) => ({
			...state,
			isLoadingGetProjectRoleFramework: false,
		}),

		// REQUEST ADD FRIEND
		requestSendFriendRequest: (state) => ({
			...state,
			isLoadingSendFriendRequest: true,
		}),
		sendFriendRequestSuccess: (state) => {
			toaster.create({
				title: "Friend Request Sent",
				description: "Friend request sent successfully",
				type: "success",
			});
			return {
				...state,
				isLoadingSendFriendRequest: false,
			};
		},
		sendFriendRequestFail: (state) => {
			toaster.create({
				title: "Friend Request Failed",
				description: "Failed to send friend request",
				type: "error",
			});
			return {
				...state,
				isLoadingSendFriendRequest: false,
			};
		},
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
	// STAGES
	requestGetStageFramework,
	getStageFrameworkSuccess,
	getStageFrameworkFail,
	// PROJECT ROLE
	requestGetProjectRoleFramework,
	getProjectRoleFrameworkSuccess,
	getProjectRoleFrameworkFail,
	// REQUEST ADD FRIEND
	requestSendFriendRequest,
	sendFriendRequestSuccess,
	sendFriendRequestFail,
} = userSlice.actions;

export default userSlice.reducer;
