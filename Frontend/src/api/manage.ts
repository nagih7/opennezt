import callReduxApi from './callReduxApi'
import {
   startRequestGetTotalUsers,
   startRequestGetTotalUsersSuccess,
   startRequestGetTotalUsersFail,
   requestGetListRole,
   getListRoleSuccess,
   getListRoleFail,
   requestGetListType,
   getListTypeSuccess,
   getListTypeFail,
   requestCreateOrUpdateRole,
   createOrUpdateRoleSuccess,
   createOrUpdateRoleFail,
   requestCreateOrUpdateType,
   createOrUpdateTypeSuccess,
   createOrUpdateTypeFail,
   // INDUSTRY
   requestGetListIndustry,
   getListIndustrySuccess,
   getListIndustryFail,
   requestCreateOrUpdateIndustry,
   createOrUpdateIndustrySuccess,
   createOrUpdateIndustryFail,
   requestDeleteRole,
   deleteRoleSuccess,
   deleteRoleFail,
   requestDeleteType,
   deleteTypeSuccess,
   deleteTypeFail,
   requestDeleteIndustry,
   deleteIndustrySuccess,
   deleteIndustryFail,
   // EXPERIENCE LEVELS
   requestGetListExperienceLevel,
   getListExperienceLevelSuccess,
   getListExperienceLevelFail,
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
   requestCreateOrUpdateSkill,
   createOrUpdateSkillSuccess,
   createOrUpdateSkillFail,
   requestDeleteSkill,
   deleteSkillSuccess,
   deleteSkillFail,
   requestGetSkillCategories,
   getSkillCategoriesSuccess,
   getSkillCategoriesFail,
   // ORGANIZATION
   requestGetListOrganization,
   getListOrganizationSuccess,
   getListOrganizationFail,
   requestCreateOrUpdateOrganization,
   createOrUpdateOrganizationSuccess,
   createOrUpdateOrganizationFail,
   requestDeleteOrganization,
   deleteOrganizationSuccess,
   deleteOrganizationFail,
   getManageListArticle,
   getManageListArticleSuccess,
   getManageListArticleFail,
} from '../store/modules/manage'
import { AppDispatch } from '~/store'

export const getTotalUsers = () => async (dispatch: AppDispatch, getState: () => any) => {
   return callReduxApi({
      method: 'get',
      apiPath: `manage/total-users`,
      actionTypes: [startRequestGetTotalUsers, startRequestGetTotalUsersSuccess, startRequestGetTotalUsersFail],
      variables: {},
      dispatch,
      getState,
   })
}

// ROLE
export const getListRole =
   (
      dataFilter = {
         perPage: 10,
         page: 1,
         keySearch: '',
         status: '',
         order: null,
         column: null,
      }
   ) =>
   async (dispatch: AppDispatch, getState: () => any) => {
      let path = `manage/roles?per_page=${dataFilter.perPage}&page=${dataFilter.page}`

      if (dataFilter.keySearch) {
         path += `&q=${dataFilter.keySearch}`
      }

      if (dataFilter.status && dataFilter.status.length > 0) {
         path += `&status=${dataFilter.status}`
      }

      if (dataFilter.order && dataFilter.column) {
         path += `&order=${dataFilter.order}&column=${dataFilter.column}`
      }

      return callReduxApi({
         method: 'get',
         apiPath: path,
         actionTypes: [requestGetListRole, getListRoleSuccess, getListRoleFail],
         variables: {},
         dispatch,
         getState,
      })
   }
export const createOrUpdateRole =
   (data: any, action: any, id: string) => async (dispatch: AppDispatch, getState: () => any) => {
      let path = `manage/roles`
      if (action === 'UPDATE') {
         path += `/${id}`
      }
      return callReduxApi({
         method: action === 'CREATE' ? 'post' : 'put',
         apiPath: path,
         actionTypes: [requestCreateOrUpdateRole, createOrUpdateRoleSuccess, createOrUpdateRoleFail],
         variables: data,
         dispatch,
         getState,
      })
   }
export const deleteRole = (id: string) => async (dispatch: AppDispatch, getState: () => any) => {
   return callReduxApi({
      method: 'delete',
      apiPath: `manage/roles/${id}`,
      actionTypes: [requestDeleteRole, deleteRoleSuccess, deleteRoleFail],
      variables: {},
      dispatch,
      getState,
   })
}

// ALL TYPES
export const getAllTypes = () => async (dispatch: AppDispatch, getState: () => any) => {
   return callReduxApi({
      method: 'get',
      apiPath: `manage/types/all`,
      actionTypes: [requestGetListType, getListTypeSuccess, getListTypeFail],
      variables: {},
      dispatch,
      getState,
   })
}

// TYPE
export const getListType = (dataFilter: any) => async (dispatch: AppDispatch, getState: () => any) => {
   let path = `manage/types?per_page=${dataFilter.perPage}&page=${dataFilter.page}`

   if (dataFilter.keySearch) {
      path += `&q=${dataFilter.keySearch}`
   }

   if (dataFilter.status && dataFilter.status.length > 0) {
      path += `&status=${dataFilter.status}`
   }

   if (dataFilter.order && dataFilter.column) {
      path += `&order=${dataFilter.order}&column=${dataFilter.column}`
   }

   return callReduxApi({
      method: 'get',
      apiPath: path,
      actionTypes: [requestGetListType, getListTypeSuccess, getListTypeFail],
      variables: {},
      dispatch,
      getState,
   })
}
export const createOrUpdateType =
   (data: any, action: any, id: string) => async (dispatch: AppDispatch, getState: () => any) => {
      let path = `manage/types`
      if (action === 'UPDATE') {
         path += `/${id}`
      }
      return callReduxApi({
         method: action === 'CREATE' ? 'post' : 'put',
         apiPath: path,
         actionTypes: [requestCreateOrUpdateType, createOrUpdateTypeSuccess, createOrUpdateTypeFail],
         variables: data,
         dispatch,
         getState,
      })
   }
export const deleteType = (id: string) => async (dispatch: AppDispatch, getState: () => any) => {
   return callReduxApi({
      method: 'delete',
      apiPath: `manage/types/${id}`,
      actionTypes: [requestDeleteType, deleteTypeSuccess, deleteTypeFail],
      variables: {},
      dispatch,
      getState,
   })
}

// INDUSTRY
export const getListIndustry = (dataFilter: any) => async (dispatch: AppDispatch, getState: () => any) => {
   let path = `manage/industries?per_page=${dataFilter.perPage}&page=${dataFilter.page}`

   if (dataFilter.keySearch) {
      path += `&q=${dataFilter.keySearch}`
   }

   if (dataFilter.status && dataFilter.status.length > 0) {
      path += `&status=${dataFilter.status}`
   }

   if (dataFilter.order && dataFilter.column) {
      path += `&order=${dataFilter.order}&column=${dataFilter.column}`
   }

   return callReduxApi({
      method: 'get',
      apiPath: path,
      actionTypes: [requestGetListIndustry, getListIndustrySuccess, getListIndustryFail],
      variables: {},
      dispatch,
      getState,
   })
}
export const createOrUpdateIndustry =
   (data: any, action: any, id: string) => async (dispatch: AppDispatch, getState: () => any) => {
      let path = `manage/industries`
      if (action === 'UPDATE') {
         path += `/${id}`
      }
      return callReduxApi({
         method: action === 'CREATE' ? 'post' : 'put',
         apiPath: path,
         actionTypes: [requestCreateOrUpdateIndustry, createOrUpdateIndustrySuccess, createOrUpdateIndustryFail],
         variables: data,
         dispatch,
         getState,
      })
   }
export const deleteIndustry = (id: string) => async (dispatch: AppDispatch, getState: () => any) => {
   return callReduxApi({
      method: 'delete',
      apiPath: `manage/industries/${id}`,
      actionTypes: [requestDeleteIndustry, deleteIndustrySuccess, deleteIndustryFail],
      variables: {},
      dispatch,
      getState,
   })
}

// EXPERIENCE LEVELS
export const getListExperienceLevel = (dataFilter: any) => async (dispatch: AppDispatch, getState: () => any) => {
   let path = `manage/experience-levels?per_page=${dataFilter.perPage}&page=${dataFilter.page}`

   if (dataFilter.keySearch) {
      path += `&q=${dataFilter.keySearch}`
   }

   if (dataFilter.status && dataFilter.status.length > 0) {
      path += `&status=${dataFilter.status}`
   }

   if (dataFilter.order && dataFilter.column) {
      path += `&order=${dataFilter.order}&column=${dataFilter.column}`
   }

   return callReduxApi({
      method: 'get',
      apiPath: path,
      actionTypes: [requestGetListExperienceLevel, getListExperienceLevelSuccess, getListExperienceLevelFail],
      variables: {},
      dispatch,
      getState,
   })
}
export const createOrUpdateExperienceLevel =
   (data: any, action: any, id: string) => async (dispatch: AppDispatch, getState: () => any) => {
      let path = `manage/experience-levels`
      if (action === 'UPDATE') {
         path += `/${id}`
      }
      return callReduxApi({
         method: action === 'CREATE' ? 'post' : 'put',
         apiPath: path,
         actionTypes: [
            requestCreateOrUpdateExperienceLevel,
            createOrUpdateExperienceLevelSuccess,
            createOrUpdateExperienceLevelFail,
         ],
         variables: data,
         dispatch,
         getState,
      })
   }
export const deleteExperienceLevel = (id: string) => async (dispatch: AppDispatch, getState: () => any) => {
   return callReduxApi({
      method: 'delete',
      apiPath: `manage/experience-levels/${id}`,
      actionTypes: [requestDeleteExperienceLevel, deleteExperienceLevelSuccess, deleteExperienceLevelFail],
      variables: {},
      dispatch,
      getState,
   })
}

// CATEGORIES
export const getListCategory = (dataFilter: any) => async (dispatch: AppDispatch, getState: () => any) => {
   let path = `manage/categories?per_page=${dataFilter.perPage}&page=${dataFilter.page}`

   if (dataFilter.keySearch) {
      path += `&q=${dataFilter.keySearch}`
   }

   if (dataFilter.status && dataFilter.status.length > 0) {
      path += `&status=${dataFilter.status}`
   }

   if (dataFilter.order && dataFilter.column) {
      path += `&order=${dataFilter.order}&column=${dataFilter.column}`
   }

   return callReduxApi({
      method: 'get',
      apiPath: path,
      actionTypes: [requestGetListCategory, getListCategorySuccess, getListCategoryFail],
      variables: {},
      dispatch,
      getState,
   })
}
export const createOrUpdateCategory =
   (data: any, action: any, id: string) => async (dispatch: AppDispatch, getState: () => any) => {
      let path = `manage/categories`
      if (action === 'UPDATE') {
         path += `/${id}`
      }
      return callReduxApi({
         method: action === 'CREATE' ? 'post' : 'put',
         apiPath: path,
         actionTypes: [requestCreateOrUpdateCategory, createOrUpdateCategorySuccess, createOrUpdateCategoryFail],
         variables: data,
         dispatch,
         getState,
      })
   }
export const deleteCategory = (id: String) => async (dispatch: AppDispatch, getState: () => any) => {
   return callReduxApi({
      method: 'delete',
      apiPath: `manage/categories/${id}`,
      actionTypes: [requestDeleteCategory, deleteCategorySuccess, deleteCategoryFail],
      variables: {},
      dispatch,
      getState,
   })
}

// SKILLS
export const getListSkill = (dataFilter: any) => async (dispatch: AppDispatch, getState: () => any) => {
   let path = `manage/skills?per_page=${dataFilter.perPage}&page=${dataFilter.page}`

   if (dataFilter.keySearch) {
      path += `&q=${dataFilter.keySearch}`
   }

   if (dataFilter.status && dataFilter.status.length > 0) {
      path += `&status=${dataFilter.status}`
   }

   if (dataFilter.order && dataFilter.column) {
      path += `&order=${dataFilter.order}&column=${dataFilter.column}`
   }

   return callReduxApi({
      method: 'get',
      apiPath: path,
      actionTypes: [requestGetListSkill, getListSkillSuccess, getListSkillFail],
      variables: {},
      dispatch,
      getState,
   })
}
export const createOrUpdateSkill =
   (data: any, action: any, id: string) => async (dispatch: AppDispatch, getState: () => any) => {
      let path = `manage/skills`
      if (action === 'UPDATE') {
         path += `/${id}`
      }
      return callReduxApi({
         method: action === 'CREATE' ? 'post' : 'put',
         apiPath: path,
         actionTypes: [requestCreateOrUpdateSkill, createOrUpdateSkillSuccess, createOrUpdateSkillFail],
         variables: data,
         dispatch,
         getState,
      })
   }
export const deleteSkill = (id: string) => async (dispatch: AppDispatch, getState: () => any) => {
   return callReduxApi({
      method: 'delete',
      apiPath: `manage/skills/${id}`,
      actionTypes: [requestDeleteSkill, deleteSkillSuccess, deleteSkillFail],
      variables: {},
      dispatch,
      getState,
   })
}

export const getSkillCategories = () => async (dispatch: AppDispatch, getState: () => any) => {
   return callReduxApi({
      method: 'get',
      apiPath: `manage/skills/categories`,
      actionTypes: [requestGetSkillCategories, getSkillCategoriesSuccess, getSkillCategoriesFail],
      variables: {},
      dispatch,
      getState,
   })
}

// ORGANIZATION

export const getListOrganization = (dataFilter: any) => async (dispatch: AppDispatch, getState: () => any) => {
   let path = `manage/organizations?per_page=${dataFilter.perPage}&page=${dataFilter.page}`

   if (dataFilter.keySearch) {
      path += `&q=${dataFilter.keySearch}`
   }

   if (dataFilter.status && dataFilter.status.length > 0) {
      path += `&status=${dataFilter.status}`
   }

   if (dataFilter.order && dataFilter.column) {
      path += `&order=${dataFilter.order}&column=${dataFilter.column}`
   }

   return callReduxApi({
      method: 'get',
      apiPath: path,
      actionTypes: [requestGetListOrganization, getListOrganizationSuccess, getListOrganizationFail],
      variables: {},
      dispatch,
      getState,
   })
}
export const createOrUpdateOrganization =
   (data: any, action: any, id: string) => async (dispatch: AppDispatch, getState: () => any) => {
      let path = `manage/organizations`
      if (action === 'UPDATE') {
         path += `/${id}`
      }
      return callReduxApi({
         method: action === 'CREATE' ? 'post' : 'put',
         apiPath: path,
         actionTypes: [
            requestCreateOrUpdateOrganization,
            createOrUpdateOrganizationSuccess,
            createOrUpdateOrganizationFail,
         ],
         variables: data,
         dispatch,
         getState,
      })
   }
export const deleteOrganization = (id: string) => async (dispatch: AppDispatch, getState: () => any) => {
   return callReduxApi({
      method: 'delete',
      apiPath: `manage/organizations/${id}`,
      actionTypes: [requestDeleteOrganization, deleteOrganizationSuccess, deleteOrganizationFail],
      variables: {},
      dispatch,
      getState,
   })
}

//ARTICLES
export const getManageArticleList = (dataFilter: any) => async (dispatch: AppDispatch, getState: () => any) => {
   let path = `article/manage-article-list?page=${dataFilter.page}&limit=${dataFilter.perPage}`

   return callReduxApi({
      method: 'get',
      apiPath: path,
      actionTypes: [getManageListArticle, getManageListArticleSuccess, getManageListArticleFail],
      variables: {},
      dispatch,
      getState,
   })
}
