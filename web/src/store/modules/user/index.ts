import { createListCollection } from '@chakra-ui/react'
import { createSlice } from '@reduxjs/toolkit'
import { UserState } from './types'

// Define the initial state with TypeScript typing
const initialState: UserState = {
   // STAGES
   stageFramework: createListCollection({
      items: [],
   }),
   isLoadingGetStageFramework: false,
   // PROJECT ROLE
   projectRoleFramework: createListCollection({
      items: [],
   }),
   projectTeamRoleFramework: createListCollection({
      items: [],
   }),
   isLoadingGetProjectRoleFramework: false,
}

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      // STAGES
      requestGetStageFramework: (state) => ({
         ...state,
         isLoadingGetStageFramework: true,
      }),
      getStageFrameworkSuccess: (state, action) => ({
         ...state,
         isLoadingGetStageFramework: false,
         stageFramework: createListCollection({
            items: action.payload.data.map((stage: any) => ({
               label: stage.name,
               value: stage._id,
            })),
         }),
      }),
      getStageFrameworkFail: (state) => ({
         ...state,
         isLoadingGetStageFramework: false,
      }),
      // PROJECT ROLE
      requestGetProjectRoleFramework: (state) => ({
         ...state,
         isLoadingGetProjectRoleFramework: true,
      }),
      getProjectRoleFrameworkSuccess: (state, action) => ({
         ...state,
         isLoadingGetProjectRoleFramework: false,
         projectRoleFramework: createListCollection({
            items: action.payload.data.roles.map((role: any) => ({
               label: role.name,
               value: role._id,
            })),
         }),
         projectTeamRoleFramework: createListCollection({
            items: action.payload.data.teamRoles.map((role: any) => ({
               label: role.name,
               value: role._id,
            })),
         }),
      }),
      getProjectRoleFrameworkFail: (state) => ({
         ...state,
         isLoadingGetProjectRoleFramework: false,
      }),
   },
})

export const {
   // STAGES
   requestGetStageFramework,
   getStageFrameworkSuccess,
   getStageFrameworkFail,
   // PROJECT ROLE
   requestGetProjectRoleFramework,
   getProjectRoleFrameworkSuccess,
   getProjectRoleFrameworkFail,
} = userSlice.actions

export default userSlice.reducer
