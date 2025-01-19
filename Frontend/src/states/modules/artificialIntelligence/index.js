import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const artificialIntelligenceSlice = createSlice({
	name: "artificialIntelligence",
	initialState: {
		projects: [],
		talents: [],
		openModalMatchingProjects: false,
		loadingMatchingProjects: false,
		loadingMatchingTalents: false,
	},
	reducers: {
		setOpenModalMatchingProjects: (state, action) => ({
			...state,
			openModalMatchingProjects: action.payload,
		}),
		startRequestMatchingProjects: (state) => {
			message.loading({
				content: "Matching projects with AI...",
				key: "matchingProjects",
				duration: 100000,
			});
			return {
				...state,
				loadingMatchingProjects: true,
				matchedProjects: false,
			};
		},
		startRequestMatchingProjectsSuccess: (state, action) => {
			message.destroy("matchingProjects");
			message.success({
				content: "Matching projects with AI successfully",
				duration: 5,
			});
			return {
				...state,
				projects: action.payload.data,
				loadingMatchingProjects: false,
			};
		},
		startRequestMatchingProjectsFail: (state) => {
			message.destroy("matchingProjects");
			message.error({
				content: "Matching projects with AI failed",
				duration: 5,
			});
			return {
				...state,
				projects: [],
				loadingMatchingProjects: false,
			};
		},
		startRequestMatchingTalents: (state) => {
			message.loading({
				content: "Matching projects with AI...",
				key: "matchingTalents",
				duration: 100000,
			});
			return {
				...state,
				loadingMatchingTalents: true,
			};
		},
		startRequestMatchingTalentsSuccess: (state, action) => {
			message.destroy("matchingTalents");
			message.success({
				content: "Matching talents with AI successfully",
				duration: 5,
			});
			return {
				...state,
				talents: action.payload.data,
				loadingMatchingTalents: false,
			};
		},
		startRequestMatchingTalentsFail: (state) => {
			message.destroy("matchingTalents");
			message.error({
				content: "Matching talents with AI failed",
				duration: 5,
			});
			return {
				...state,
				talents: [],
				loadingMatchingTalents: false,
			};
		},
	},
});

export const {
	startRequestMatchingProjects,
	startRequestMatchingProjectsSuccess,
	startRequestMatchingProjectsFail,
	setOpenModalMatchingProjects,
	startRequestMatchingTalents,
	startRequestMatchingTalentsSuccess,
	startRequestMatchingTalentsFail,
} = artificialIntelligenceSlice.actions;

export default artificialIntelligenceSlice.reducer;
