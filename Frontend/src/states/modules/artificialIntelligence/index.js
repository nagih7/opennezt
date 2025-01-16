import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const artificialIntelligenceSlice = createSlice({
	name: "artificialIntelligence",
	initialState: {
		projects: [],
		openModalMatchingProjects: false,
		loadingMatchingProjects: false,
	},
	reducers: {
		setOpenModalMatchingProjects: (state, action) => ({
			...state,
			openModalMatchingProjects: action.payload,
		}),
		startRequestMatchingProjects: (state) => ({
			...state,
			loadingMatchingProjects: true,
			matchedProjects: false,
		}),
		startRequestMatchingProjectsSuccess: (state, action) => {
			message.success({
				content: "Matching projects with AI successfully",
				key: "matchingProjects",
				duration: 5,
			});
			return {
				...state,
				projects: action.payload.data,
				loadingMatchingProjects: false,
			};
		},
		startRequestMatchingProjectsFail: (state) => {
			message.error({
				content: "Matching projects with AI failed",
				key: "matchingProjects",
				duration: 5,
			});
			return {
				...state,
				projects: [],
				loadingMatchingProjects: false,
			};
		},
	},
});

export const {
	startRequestMatchingProjects,
	startRequestMatchingProjectsSuccess,
	startRequestMatchingProjectsFail,
	setOpenModalMatchingProjects,
} = artificialIntelligenceSlice.actions;

export default artificialIntelligenceSlice.reducer;
