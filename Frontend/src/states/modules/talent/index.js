import { createSlice } from "@reduxjs/toolkit";

const talentSlice = createSlice({
	name: "founder",
	initialState: {
		talents: [],
		talentDetails: null,
		// RECRUIT TALENTS
		formRecruitTalents: {
			keySearch: null,
			industry: null,
			experience_level: null,
			category: null,
			subcategory: null,
			skill: null,
			page: 0,
			perPage: 6,
		},
		isLoadingRecruitTalents: false,
		paginationRecruitTalents: {
			currentPage: 1,
			perPage: 10,
			totalPage: 1,
			totalRecord: 0,
		},
		isLoadingGetTalentDetails: false,
		loadingSkipTalent: false,
	},
	reducers: {
		startRequestRecruitTalents: (state) => ({
			...state,
			isLoadingRecruitTalents: true,
			talents: [],
		}),
		startRequestRecruitTalentsSuccess: (state, action) => ({
			...state,
			talents: action.payload.data.talents,
			formRecruitTalents: {
				...state.formRecruitTalents,
				page: action.payload.data.page,
			},
			isLoadingRecruitTalents: false,
		}),
		startRequestRecruitTalentsFail: (state) => ({
			...state,
			talents: [],
			isLoadingRecruitTalents: false,
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
			isLoadingGetTalentDetails: true,
		}),
		startRequestGetDetailTalentSuccess: (state, action) => ({
			...state,
			talentDetails: action.payload.data,
			isLoadingGetTalentDetails: false,
		}),
		startRequestGetDetailTalentFail: (state) => ({
			...state,
			talentDetails: null,
			isLoadingGetTalentDetails: false,
		}),

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

		// ========== NEW ========== //
		requestRecruitTalents: (state) => ({
			...state,
			isLoadingRecruitTalents: true,
		}),
		recruitTalentsSuccess: (state, action) => ({
			...state,
			talents: action.payload.data.talents,
			paginationRecruitTalents: {
				currentPage: action.payload.data.page,
				perPage: action.payload.data.perPage,
				totalPage: action.payload.data.totalPage,
				totalRecord: action.payload.data.totalRecord,
			},
			isLoadingRecruitTalents: false,
		}),
		recruitTalentsFail: (state) => ({
			...state,
			talents: [],
			isLoadingRecruitTalents: false,
		}),

		setFormRecruitTalents: async (state, action) => {
			const { event, nameSelect } = action.payload;
			if (nameSelect) {
				return {
					...state,
					formRecruitTalents: {
						...state.formRecruitTalents,
						[nameSelect]: event.value[0],
						page: 0,
					},
				};
			}
		},
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
	resetFormRecruitTalents,
	// ========== NEW ========== //
	requestRecruitTalents,
	recruitTalentsSuccess,
	recruitTalentsFail,
	setFormRecruitTalents,
} = talentSlice.actions;

export default talentSlice.reducer;
