import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ActivityState } from './types'

// Define the initial state with TypeScript typing
const initialState: ActivityState = {
   isLoadingAccessProject: false,
   myProjectAccess: [],
   isLoadingGetMyProjectAccess: false,
   accessToMyProjects: [],
   isLoadinggGetAccessToMyProjects: false,
   isLoadingAccessTalent: false,
   accessToMyProfile: [],
   isLoadingGetAccessToMyProfile: false,
   activities: [],
   isLoadingActivities: false,
   hasMore: true,
   skip: 0,
   limit: 10,
   deleteSaveArticleActivity: [],
   isLoadingDeleteSaveArticleActivity: false,
   projectDetailsActivity: [],
   isLoadingProjectDetailsActivity: false,
}

// Create a typed slice for activity state
const activitySlice = createSlice({
   name: 'activity',
   initialState,
   reducers: {
      // ========== PROJECT ACCESS ========== //
      requestAccessToProject: (state: ActivityState) => ({
         ...state,
         isLoadingAccessProject: true,
      }),
      accessToProjectSuccess: (state: ActivityState) => ({
         ...state,
         isLoadingAccessProject: false,
      }),
      accessToProjectFailure: (state: ActivityState) => ({
         ...state,
         isLoadingAccessProject: false,
      }), // ========== MY PROJECT ACCESS ========== //
      requestGetMyProjectAccess: (state: ActivityState) => ({
         ...state,
         isLoadingGetMyProjectAccess: true,
      }),
      getMyProjectAccessSuccess: (state: ActivityState, action: PayloadAction<any>) => ({
         ...state,
         myProjectAccess: action.payload.data,
         isLoadingGetMyProjectAccess: false,
      }),
      getMyProjectAccessFail: (state: ActivityState) => ({
         ...state,
         isLoadingGetMyProjectAccess: false,
      }), // ========== ACCESS TO MY PROJECTS ========== //
      requestGetAccessToMyProjects: (state: ActivityState) => ({
         ...state,
         isLoadinggGetAccessToMyProjects: true,
      }),
      getAccessToMyProjectsSuccess: (state: ActivityState, action: PayloadAction<any>) => ({
         ...state,
         accessToMyProjects: action.payload.data,
         isLoadinggGetAccessToMyProjects: false,
      }),
      getAccessToMyProjectsFail: (state: ActivityState) => ({
         ...state,
         isLoadinggGetAccessToMyProjects: false,
      }), // ========== TALENT ACCESS ========== //
      requestAccessToTalent: (state: ActivityState) => ({
         ...state,
         isLoadingAccessTalent: true,
      }),
      accessToTalentSuccess: (state: ActivityState) => ({
         ...state,
         isLoadingAccessTalent: false,
      }),
      accessToTalentFailure: (state: ActivityState) => ({
         ...state,
         isLoadingAccessTalent: false,
      }), // ========== GET ACTIVITIES ARTICLE ========== //
      requestGetActivities: (state: ActivityState) => ({
         ...state,
         isLoading: true,
      }),
      getActivitiesSuccess: (state: ActivityState, action: PayloadAction<any>) => {
         const newActivities = action.payload.data
         return {
            ...state,
            // Nếu skip = 0, thay thế mảng; nếu không, thêm vào mảng hiện có
            activities: state.skip === 0 ? newActivities : [...state.activities, ...newActivities],
            isLoading: false,
            hasMore: newActivities.length >= state.limit, // Còn dữ liệu nếu số lượng trả về >= limit
            skip: state.skip + newActivities.length, // Cập nhật skip cho lần sau
         }
      },
      getActivitiesFail: (state: ActivityState, action: PayloadAction<any>) => ({
         ...state,
         isLoading: false,
         error: action.payload,
      }), // ========== POST ACTIVITIES CREATE ARTICLE ========== //
      requestPostActivityCreateArticle: (state: ActivityState) => ({
         ...state,
         isLoadingCreateNewArticle: true,
      }),
      postActivityCreateArticleSuccess: (state: ActivityState) => ({
         ...state,
         isLoadingCreateNewArticle: false,
      }),
      postActivityCreateArticleFail: (state: ActivityState) => ({
         ...state,
         isLoadingCreateNewArticle: false,
      }),
      // ========== POST ACTIVITIES UPDATE ARTICLE ========== //
      requestPostActivityUpdateArticle: (state: ActivityState) => ({
         ...state,
         isLoadingUpdateArticleActivity: true,
      }),
      postActivityUpdateArticleSuccess: (state: ActivityState) => ({
         ...state,
         isLoadingUpdateArticle: false,
      }),
      postActivityUpdateArticleFail: (state: ActivityState) => ({
         ...state,
         isLoadingUpdateArticle: false,
      }), // ========== POST ACTIVITIES SAVE ARTICLE ========== //
      requestPostActivitySaveArticle: (state: ActivityState) => ({
         ...state,
         isLoadingSaveArticle: true,
      }),
      postActivitySaveArticleSuccess: (state: ActivityState) => ({
         ...state,
         isLoadingSaveArticle: false,
      }),
      postActivitySaveArticleFail: (state: ActivityState) => ({
         ...state,
         isLoadingSaveArticle: false,
      }),
      // ========== DELETE SAVE ARTICLE ACTIVITIES ========== //
      requestDeleteSaveArticleActivity: (state: ActivityState) => ({
         ...state,
         isLoadingDeleteSaveArticleActivity: true,
      }),
      deleteSaveArticleActivitySuccess: (state: ActivityState) => ({
         ...state,
         isLoadingDeleteSaveArticleActivity: false,
      }),
      deleteSaveArticleActivityFail: (state: ActivityState) => ({
         ...state,
         isLoadingDeleteSaveArticleActivity: false,
      }), // ========== GET PROJECT DETAILS ACTIVITIES ========== //
      requestGetProjectDetailsActivity: (state: ActivityState) => ({
         ...state,
         isLoadingProjectDetailsActivity: true,
      }),
      getProjectDetailsActivitySuccess: (state: ActivityState, action: PayloadAction<any>) => ({
         ...state,
         projectDetailsActivity: action.payload.data,
         isLoadingProjectDetailsActivity: false,
      }),
      getProjectDetailsActivityFail: (state: ActivityState) => ({
         ...state,
         isLoadingProjectDetailsActivity: false,
      }),
   },
})

// Export actions and reducer
export const {
   requestAccessToProject,
   accessToProjectSuccess,
   accessToProjectFailure,
   requestGetMyProjectAccess,
   getMyProjectAccessSuccess,
   getMyProjectAccessFail,
   requestGetAccessToMyProjects,
   getAccessToMyProjectsSuccess,
   getAccessToMyProjectsFail,
   requestAccessToTalent,
   accessToTalentSuccess,
   accessToTalentFailure,
   requestGetActivities,
   getActivitiesSuccess,
   getActivitiesFail,
   requestPostActivityCreateArticle,
   postActivityCreateArticleSuccess,
   postActivityCreateArticleFail,
   requestPostActivityUpdateArticle,
   postActivityUpdateArticleSuccess,
   postActivityUpdateArticleFail,
   requestPostActivitySaveArticle,
   postActivitySaveArticleSuccess,
   postActivitySaveArticleFail,
   requestDeleteSaveArticleActivity,
   deleteSaveArticleActivitySuccess,
   deleteSaveArticleActivityFail,
   requestGetProjectDetailsActivity,
   getProjectDetailsActivitySuccess,
   getProjectDetailsActivityFail,
} = activitySlice.actions

export default activitySlice.reducer
