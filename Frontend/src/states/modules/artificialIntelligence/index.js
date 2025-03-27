import { createSlice } from "@reduxjs/toolkit";

import { message } from "antd";

const artificialIntelligenceSlice = createSlice({
	name: "artificialIntelligence",
	initialState: {
		projects: [],
		talents: [],
		openModalMatchingProjects: false,
		openModalMatchingTalents: false,
		loadingMatchingProjects: false,
		loadingMatchingTalents: false,
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
			if (action.payload.data.length === 0) {
				message.error({
					content: "No matching projects found",
					duration: 10,
				});
				return {
					...state,
					projects: [],
					loadingMatchingProjects: false,
				};
			} else {
				message.success({
					content: "Matching projects with AI successfully",
					duration: 10,
				});
				return {
					...state,
					projects: action.payload.data,
					loadingMatchingProjects: false,
					openModalMatchingProjects: true,
				};
			}
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
		startRequestMatchingTalents: (state) => ({
			...state,
			loadingMatchingTalents: true,
		}),
		startRequestMatchingTalentsSuccess: (state, action) => {
			if (action.payload.data.length === 0) {
				message.error({
					content: "No matching talents found",
					duration: 10,
				});
				return {
					...state,
					talents: [],
					loadingMatchingTalents: false,
				};
			} else {
				message.success({
					content: "Matching talents with AI successfully",
					duration: 10,
				});
				return {
					...state,
					talents: action.payload.data,
					loadingMatchingTalents: false,
					openModalMatchingTalents: true,
				};
			}
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
		setOpenModalMatchingTalents: (state, action) => ({
			...state,
			openModalMatchingTalents: action.payload,
		}),
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
	setOpenModalMatchingTalents,
} = artificialIntelligenceSlice.actions;

export default artificialIntelligenceSlice.reducer;
