import { createSlice } from "@reduxjs/toolkit";

const talentSlice = createSlice({
	name: "founder",
	initialState: {
		loadingRecruitTalents: false,
		loadingGetTalentDetails: false,
		loadingSkipTalent: false,
		talents: [],
		talentRecruitPage: 0,
		talentDetails: null,
	},
	reducers: {
		startRequestRecruitTalents: (state) => ({
			...state,
			loadingRecruitTalents: true,
			talents: [],
		}),
		startRequestRecruitTalentsSuccess: (state, action) => ({
			...state,
			talents: action.payload.data.talents,
			talentRecruitPage: action.payload.data.page,
			loadingRecruitTalents: false,
		}),
		startRequestRecruitTalentsFail: (state) => ({
			...state,
			talents: [],
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
			loadingGetTalentDetails: true,
		}),
		startRequestGetDetailTalentSuccess: (state, action) => ({
			...state,
			talentDetails: action.payload.data,
			loadingGetTalentDetails: false,
		}),
		startRequestGetDetailTalentFail: (state) => ({
			...state,
			talentDetails: null,
			loadingGetTalentDetails: false,
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
