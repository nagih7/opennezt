import { createSlice } from "@reduxjs/toolkit";

const talentSlice = createSlice({
	name: "founder",
	initialState: {
		talents: [],
		talentDetails: null,
		formRecruitTalents: {
			keyword: null,
			sector: null,
			experience_level: null,
			education_level: null,
			commitment: null,
			location: null,
			language: null,
			page: 0,
		},
		loadingRecruitTalents: false,
		loadingGetTalentDetails: false,
		loadingSkipTalent: false,
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
			formRecruitTalents: {
				...state.formRecruitTalents,
				page: action.payload.data.page,
			},
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

		// formRecruitTalents
		setFormRecruitTalents: (state, action) => {
			const { event, nameSelect } = action.payload;
			if (nameSelect) {
				return {
					...state,
					formRecruitTalents: {
						...state.formRecruitTalents,
						[nameSelect]: event.value,
						page: 0,
					},
				};
			}
		},
		resetFormRecruitTalents: (state) => ({
			...state,
			formRecruitTalents: {
				keyword: null,
				sector: null,
				experience_level: null,
				education_level: null,
				commitment: null,
				location: null,
				language: null,
				page: 0,
			},
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
	setFormRecruitTalents,
	resetFormRecruitTalents,
} = talentSlice.actions;

export default talentSlice.reducer;
