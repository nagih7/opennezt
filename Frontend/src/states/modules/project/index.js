import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
	name: "ProJect",

	initialState: {
		title: "",
		loadingGetProjects: false,
		projects: [],
	},
	reducers: {
		setTitle: (state) => ({
			...state,
			title: "title",
		}),
		startRequestGetProjects: (state) => ({
			...state,
			loadingGetProjects: true,
		}),
		startRequestGetProjectsSuccess: (state, action) => ({
			...state,
			loadingGetProjects: false,
			projects: action.payload.data,
		}),
		startRequestGetProjectsFail: (state) => ({
			...state,
			loadingGetProjects: false,
		}),
	},
});

export const {
	setTitle,
	startRequestGetProjects,
	startRequestGetProjectsSuccess,
	startRequestGetProjectsFail,
} = projectSlice.actions;

export default projectSlice.reducer;
