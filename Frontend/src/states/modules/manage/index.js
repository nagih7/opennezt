import { createSlice } from "@reduxjs/toolkit";
import { getListCategory } from "api/manage";
import store from "states/configureStore";

const manageSlice = createSlice({
	name: "home",
	initialState: {
		totalUsers: 0,
		roles: [],
		types: [],
		industries: [],
		experienceLevels: [],
		categories: [],
		skills: [],
		skillCategories: [],
		paginationListRole: {
			currentPage: 1,
			perPage: 10,
			totalPage: 1,
			totalRecord: 0,
		},
		paginationListType: {
			currentPage: 1,
			perPage: 10,
			totalPage: 1,
			totalRecord: 0,
		},
		paginationListIndustry: {
			currentPage: 1,
			perPage: 10,
			totalPage: 1,
			totalRecord: 0,
		},
		paginationListExperienceLevel: {
			currentPage: 1,
			perPage: 10,
			totalPage: 1,
			totalRecord: 0,
		},
		paginationListCategory: {
			currentPage: 1,
			perPage: 10,
			totalPage: 1,
			totalRecord: 0,
		},
		paginationListSkill: {
			currentPage: 1,
			perPage: 10,
			totalPage: 1,
			totalRecord: 0,
		},
		// ROLES
		isLoadingGetListRole: false,
		visibleModalCreateOrUpdateRole: false,
		isLoadingBtnCreateOrUpdateRole: false,
		visibleModalDeleteRole: false,
		isLoadingDeleteRole: false,
		// TYPES
		isLoadingGetListType: false,
		visibleModalCreateOrUpdateType: false,
		isLoadingBtnCreateOrUpdateType: false,
		visibleModalDeleteType: false,
		isLoadingDeleteType: false,
		// INDUSTRIES
		isLoadingGetListIndustry: false,
		visibleModalCreateOrUpdateIndustry: false,
		isLoadingBtnCreateOrUpdateIndustry: false,
		visibleModalDeleteIndustry: false,
		isLoadingDeleteIndustry: false,
		// EXPERIENCE LEVELS
		isLoadingGetListExperienceLevel: false,
		visibleModalCreateOrUpdateExperienceLevel: false,
		isLoadingBtnCreateOrUpdateExperienceLevel: false,
		visibleModalDeleteExperienceLevel: false,
		isLoadingDeleteExperienceLevel: false,
		// CATEGORIES
		isLoadingGetListCategory: false,
		visibleModalCreateOrUpdateCategory: false,
		isLoadingBtnCreateOrUpdateCategory: false,
		visibleModalDeleteCategory: false,
		isLoadingDeleteCategory: false,
		// SKILLS
		isLoadingGetListSkill: false,
		visibleModalCreateOrUpdateSkill: false,
		isLoadingBtnCreateOrUpdateSkill: false,
		visibleModalDeleteSkill: false,
		isLoadingDeleteSkill: false,
		isLoadingGetSkillCategories: false,
	},
	reducers: {
		startRequestGetTotalUsers: (state) => ({
			...state,
		}),
		startRequestGetTotalUsersSuccess: (state, action) => ({
			...state,
			totalUsers: action.payload.data,
		}),
		startRequestGetTotalUsersFail: (state) => ({
			...state,
		}),

		// ROLES
		requestGetListRole: (state) => ({
			...state,
			isLoadingGetListRole: true,
		}),
		getListRoleSuccess: (state, action) => ({
			...state,
			isLoadingGetListRole: false,
			roles: action.payload.data.roles,
			paginationListRole: {
				currentPage: action.payload.data.page,
				perPage: action.payload.data.per_page,
				totalPage: action.payload.data.last_page,
				totalRecord: action.payload.data.total,
			},
		}),
		getListRoleFail: (state) => ({
			...state,
			isLoadingGetListRole: false,
		}),
		setVisibleModalCreateOrUpdateRole: (state, action) => ({
			...state,
			visibleModalCreateOrUpdateRole: action.payload,
		}),
		setVisibleModalDeleteRole: (state, action) => ({
			...state,
			visibleModalDeleteRole: action.payload,
		}),
		requestCreateOrUpdateRole: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateRole: true,
		}),
		createOrUpdateRoleSuccess: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateRole: false,
			visibleModalCreateOrUpdateRole: false,
		}),
		createOrUpdateRoleFail: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateRole: false,
		}),
		requestDeleteRole: (state) => ({
			...state,
			isLoadingDeleteRole: true,
		}),
		deleteRoleSuccess: (state) => ({
			...state,
			isLoadingDeleteRole: false,
			visibleModalDeleteRole: false,
		}),
		deleteRoleFail: (state) => ({
			...state,
			isLoadingDeleteRole: false,
		}),

		// TYPES
		requestGetListType: (state) => ({
			...state,
			isLoadingGetListType: true,
		}),
		getListTypeSuccess: (state, action) => ({
			...state,
			isLoadingGetListType: false,
			types: action.payload.data.types,
			paginationListType: {
				currentPage: action.payload.data.page,
				perPage: action.payload.data.per_page,
				totalPage: action.payload.data.last_page,
				totalRecord: action.payload.data.total,
			},
		}),
		getListTypeFail: (state) => ({
			...state,
			isLoadingGetListType: false,
		}),
		setVisibleModalCreateOrUpdateType: (state, action) => ({
			...state,
			visibleModalCreateOrUpdateType: action.payload,
		}),
		setVisibleModalDeleteType: (state, action) => ({
			...state,
			visibleModalDeleteType: action.payload,
		}),
		requestCreateOrUpdateType: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateType: true,
		}),
		createOrUpdateTypeSuccess: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateType: false,
			visibleModalCreateOrUpdateType: false,
		}),
		createOrUpdateTypeFail: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateType: false,
		}),
		requestDeleteType: (state) => ({
			...state,
			isLoadingDeleteType: true,
		}),
		deleteTypeSuccess: (state) => ({
			...state,
			isLoadingDeleteType: false,
			visibleModalDeleteType: false,
		}),
		deleteTypeFail: (state) => ({
			...state,
			isLoadingDeleteType: false,
		}),

		// INDUSTRIES
		requestGetListIndustry: (state) => ({
			...state,
			isLoadingGetListIndustry: true,
		}),
		getListIndustrySuccess: (state, action) => ({
			...state,
			isLoadingGetListIndustry: false,
			industries: action.payload.data.industries,
			paginationListIndustry: {
				currentPage: action.payload.data.page,
				perPage: action.payload.data.per_page,
				totalPage: action.payload.data.last_page,
				totalRecord: action.payload.data.total,
			},
		}),
		getListIndustryFail: (state) => ({
			...state,
			isLoadingGetListIndustry: false,
		}),
		setVisibleModalCreateOrUpdateIndustry: (state, action) => ({
			...state,
			visibleModalCreateOrUpdateIndustry: action.payload,
		}),
		setVisibleModalDeleteIndustry: (state, action) => ({
			...state,
			visibleModalDeleteIndustry: action.payload,
		}),
		requestCreateOrUpdateIndustry: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateIndustry: true,
		}),
		createOrUpdateIndustrySuccess: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateIndustry: false,
			visibleModalCreateOrUpdateIndustry: false,
		}),
		createOrUpdateIndustryFail: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateIndustry: false,
		}),
		requestDeleteIndustry: (state) => ({
			...state,
			isLoadingDeleteIndustry: true,
		}),
		deleteIndustrySuccess: (state) => ({
			...state,
			isLoadingDeleteIndustry: false,
			visibleModalDeleteIndustry: false,
		}),
		deleteIndustryFail: (state) => ({
			...state,
			isLoadingDeleteIndustry: false,
		}),

		// EXPERIENCE LEVELS
		requestGetListExperienceLevel: (state) => ({
			...state,
			isLoadingGetListExperienceLevel: true,
		}),
		getListExperienceLevelSuccess: (state, action) => ({
			...state,
			isLoadingGetListExperienceLevel: false,
			experienceLevels: action.payload.data.experience_levels,
			paginationListExperienceLevel: {
				currentPage: action.payload.data.page,
				perPage: action.payload.data.per_page,
				totalPage: action.payload.data.last_page,
				totalRecord: action.payload.data.total,
			},
		}),
		getListExperienceLevelFail: (state) => ({
			...state,
			isLoadingGetListExperienceLevel: false,
		}),
		setVisibleModalCreateOrUpdateExperienceLevel: (state, action) => ({
			...state,
			visibleModalCreateOrUpdateExperienceLevel: action.payload,
		}),
		setVisibleModalDeleteExperienceLevel: (state, action) => ({
			...state,
			visibleModalDeleteExperienceLevel: action.payload,
		}),
		requestCreateOrUpdateExperienceLevel: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateExperienceLevel: true,
		}),
		createOrUpdateExperienceLevelSuccess: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateExperienceLevel: false,
			visibleModalCreateOrUpdateExperienceLevel: false,
		}),
		createOrUpdateExperienceLevelFail: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateExperienceLevel: false,
		}),
		requestDeleteExperienceLevel: (state) => ({
			...state,
			isLoadingDeleteExperienceLevel: true,
		}),
		deleteExperienceLevelSuccess: (state) => ({
			...state,
			isLoadingDeleteExperienceLevel: false,
			visibleModalDeleteExperienceLevel: false,
		}),
		deleteExperienceLevelFail: (state) => ({
			...state,
			isLoadingDeleteExperienceLevel: false,
		}),

		// CATEGORIES
		requestGetListCategory: (state) => ({
			...state,
			isLoadingGetListCategory: true,
		}),
		getListCategorySuccess: (state, action) => ({
			...state,
			isLoadingGetListCategory: false,
			categories: action.payload.data.categories,
			paginationListCategory: {
				currentPage: action.payload.data.page,
				perPage: action.payload.data.per_page,
				totalPage: action.payload.data.last_page,
				totalRecord: action.payload.data.total,
			},
		}),
		getListCategoryFail: (state) => ({
			...state,
			isLoadingGetListCategory: false,
		}),
		setVisibleModalCreateOrUpdateCategory: (state, action) => ({
			...state,
			visibleModalCreateOrUpdateCategory: action.payload,
		}),
		setVisibleModalDeleteCategory: (state, action) => ({
			...state,
			visibleModalDeleteCategory: action.payload,
		}),
		requestCreateOrUpdateCategory: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateCategory: true,
		}),
		createOrUpdateCategorySuccess: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateCategory: false,
			visibleModalCreateOrUpdateCategory: false,
		}),
		createOrUpdateCategoryFail: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateCategory: false,
		}),
		requestDeleteCategory: (state) => ({
			...state,
			isLoadingDeleteCategory: true,
		}),
		deleteCategorySuccess: (state) => ({
			...state,
			isLoadingDeleteCategory: false,
			visibleModalDeleteCategory: false,
		}),
		deleteCategoryFail: (state) => ({
			...state,
			isLoadingDeleteCategory: false,
		}),

		// SKILLS
		requestGetListSkill: (state) => ({
			...state,
			isLoadingGetListSkill: true,
		}),
		getListSkillSuccess: (state, action) => ({
			...state,
			isLoadingGetListSkill: false,
			skills: action.payload.data.skills,
			paginationListSkill: {
				currentPage: action.payload.data.page,
				perPage: action.payload.data.per_page,
				totalPage: action.payload.data.last_page,
				totalRecord: action.payload.data.total,
			},
		}),
		getListSkillFail: (state) => ({
			...state,
			isLoadingGetListSkill: false,
		}),
		setVisibleModalCreateOrUpdateSkill: (state, action) => ({
			...state,
			visibleModalCreateOrUpdateSkill: action.payload,
		}),
		setVisibleModalDeleteSkill: (state, action) => ({
			...state,
			visibleModalDeleteSkill: action.payload,
		}),
		requestCreateOrUpdateSkill: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateSkill: true,
		}),
		createOrUpdateSkillSuccess: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateSkill: false,
			visibleModalCreateOrUpdateSkill: false,
		}),
		createOrUpdateSkillFail: (state) => ({
			...state,
			isLoadingBtnCreateOrUpdateSkill: false,
		}),
		requestDeleteSkill: (state) => ({
			...state,
			isLoadingDeleteSkill: true,
		}),
		deleteSkillSuccess: (state) => ({
			...state,
			isLoadingDeleteSkill: false,
			visibleModalDeleteSkill: false,
		}),
		deleteSkillFail: (state) => ({
			...state,
			isLoadingDeleteSkill: false,
		}),
		requestGetSkillCategories: (state) => ({
			...state,
			isLoadingGetSkillCategories: true,
		}),
		getSkillCategoriesSuccess: (state, action) => ({
			...state,
			isLoadingGetSkillCategories: false,
			skillCategories: action.payload.data,
		}),
		getSkillCategoriesFail: (state) => ({
			...state,
			isLoadingGetSkillCategories: false,
		}),
	},
});

export const {
	// USERS
	startRequestGetTotalUsers,
	startRequestGetTotalUsersSuccess,
	startRequestGetTotalUsersFail,
	// ROLES
	requestGetListRole,
	getListRoleSuccess,
	getListRoleFail,
	setVisibleModalCreateOrUpdateRole,
	setVisibleModalDeleteRole,
	requestCreateOrUpdateRole,
	createOrUpdateRoleSuccess,
	createOrUpdateRoleFail,
	requestDeleteRole,
	deleteRoleSuccess,
	deleteRoleFail,
	// TYPES
	requestGetListType,
	getListTypeSuccess,
	getListTypeFail,
	setVisibleModalCreateOrUpdateType,
	setVisibleModalDeleteType,
	requestCreateOrUpdateType,
	createOrUpdateTypeSuccess,
	createOrUpdateTypeFail,
	requestDeleteType,
	deleteTypeSuccess,
	deleteTypeFail,
	// INDUSTRIES
	requestGetListIndustry,
	getListIndustrySuccess,
	getListIndustryFail,
	setVisibleModalCreateOrUpdateIndustry,
	setVisibleModalDeleteIndustry,
	requestCreateOrUpdateIndustry,
	createOrUpdateIndustrySuccess,
	createOrUpdateIndustryFail,
	requestDeleteIndustry,
	deleteIndustrySuccess,
	deleteIndustryFail,
	// EXPERIENCE LEVELS
	requestGetListExperienceLevel,
	getListExperienceLevelSuccess,
	getListExperienceLevelFail,
	setVisibleModalCreateOrUpdateExperienceLevel,
	setVisibleModalDeleteExperienceLevel,
	requestCreateOrUpdateExperienceLevel,
	createOrUpdateExperienceLevelSuccess,
	createOrUpdateExperienceLevelFail,
	requestDeleteExperienceLevel,
	deleteExperienceLevelSuccess,
	deleteExperienceLevelFail,
	// CATEGORIES
	requestGetListCategory,
	getListCategorySuccess,
	getListCategoryFail,
	setVisibleModalCreateOrUpdateCategory,
	setVisibleModalDeleteCategory,
	requestCreateOrUpdateCategory,
	createOrUpdateCategorySuccess,
	createOrUpdateCategoryFail,
	requestDeleteCategory,
	deleteCategorySuccess,
	deleteCategoryFail,
	// SKILLS
	requestGetListSkill,
	getListSkillSuccess,
	getListSkillFail,
	setVisibleModalCreateOrUpdateSkill,
	setVisibleModalDeleteSkill,
	requestCreateOrUpdateSkill,
	createOrUpdateSkillSuccess,
	createOrUpdateSkillFail,
	requestDeleteSkill,
	deleteSkillSuccess,
	deleteSkillFail,
	requestGetSkillCategories,
	getSkillCategoriesSuccess,
	getSkillCategoriesFail,
} = manageSlice.actions;

export default manageSlice.reducer;
