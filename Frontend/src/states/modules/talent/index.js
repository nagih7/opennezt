import { createSlice } from "@reduxjs/toolkit";

const talentSlice = createSlice({
	name: "founder",
	initialState: {
		loadingRecruitTalents: false,
		loadingSkipTalent: false,
		talents: {},
		talentDetails: {},
	},
	reducers: {
		startRequestRecruitTalents: (state) => ({
			...state,
			loadingRecruitTalents: true,
			talents: {},
		}),
		startRequestRecruitTalentsSuccess: (state, action) => ({
			...state,
			talents: action.payload.data,
			loadingRecruitTalents: false,
		}),
		startRequestRecruitTalentsFail: (state) => ({
			...state,
			talents: {},
			loadingRecruitTalents: false,
		}),
		startRequestSkipTalent: (state) => ({
			...state,
			loadingSkipTalent: true,
			talents: {},
		}),
		startRequestSkipTalentSuccess: (state, action) => ({
			...state,
			talents: action.payload.data,
			loadingSkipTalent: false,
		}),
		startRequestSkipTalentFail: (state) => ({
			...state,
			talents: {},
			loadingSkipTalent: false,
		}),
		startRequestGetDetailTalent: (state) => ({
			...state,
		}),
		startRequestGetDetailTalentSuccess: (state, action) => ({
			...state,
			talentDetails: action.payload.data,
		}),
		startRequestGetDetailTalentFail: (state) => ({
			...state,
			talentDetails: {},
		}),
	},
});

export const {
	startRequestRecruitTalents,
	startRequestRecruitTalentsSuccess,
	startRequestRecruitTalentsFail,
	startRequestSkipTalent,
	startRequestSkipTalentSuccess,
	startRequestSkipTalentFail,
	startRequestGetDetailTalent,
	startRequestGetDetailTalentSuccess,
	startRequestGetDetailTalentFail,
} = talentSlice.actions;

export default talentSlice.reducer;
