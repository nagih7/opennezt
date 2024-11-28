import { createSlice } from "@reduxjs/toolkit";

const talentSlice = createSlice({
	name: "founder",
	initialState: {
		talents: {},
	},
	reducers: {
		// setTitle: (state) => ({
		// 	...state,
		// 	title: "title",
		// }),
		startRequestRecruitTalents: (state) => ({
			...state,
		}),
		startRequestRecruitTalentsSuccess: (state, action) => ({
			...state,
			talents: action.payload.data,
		}),
		startRequestRecruitTalentsFail: (state) => ({
			...state,
			talents: {},
		}),
	},
});

export const {
	startRequestRecruitTalents,
	startRequestRecruitTalentsSuccess,
	startRequestRecruitTalentsFail,
} = talentSlice.actions;

export default talentSlice.reducer;
