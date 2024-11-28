import { createSlice } from "@reduxjs/toolkit";
import { startRequest } from "../app";

const talentSlice = createSlice({
	name: "founder",
	initialState: {
		talents: {},
		detailTalent: {},
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
		startRequestGetDetailTalent: (state) => ({
			...state,
		}),
		startRequestGetDetailTalentSuccess: (state, action) => ({
			...state,
			detailTalent: action.payload.data,
		}),
		startRequestGetDetailTalentFail: (state) => ({
			...state,
			detailTalent: {},
		}),
	},
});

export const {
	startRequestRecruitTalents,
	startRequestRecruitTalentsSuccess,
	startRequestRecruitTalentsFail,
	startRequestGetDetailTalent,
	startRequestGetDetailTalentSuccess,
	startRequestGetDetailTalentFail,
} = talentSlice.actions;

export default talentSlice.reducer;
