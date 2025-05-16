import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toaster } from 'components/UI/toaster'
import { ArtificialIntelligenceState } from './types'

// Define the initial state with TypeScript typing
const initialState: ArtificialIntelligenceState = {
   // ========== AI Matching Project ========== //
   projects: [],
   isLoadingMatchingProjects: false,
   isOpenModalMatchingProjects: false,
   // ========== AI Matching Talents ========== //
   talents: [],
   openModalMatchingTalents: false,
   loadingMatchingTalents: false,
   isLoadingConvertSpeechToText: false,
}

const artificialIntelligenceSlice = createSlice({
   name: 'artificialIntelligence',
   initialState,
   reducers: {
      setOpenModalMatchingProjects: (state: ArtificialIntelligenceState, action: PayloadAction<boolean>) => ({
         ...state,
         isOpenModalMatchingProjects: action.payload,
      }),
      requestMatchingProjects: (state: ArtificialIntelligenceState) => {
         toaster.create({
            title: 'Matching projects with AI...',
            type: 'info',
         })
         return {
            ...state,
            isLoadingMatchingProjects: true,
         }
      },
      matchingProjectsSuccess: (state: ArtificialIntelligenceState, action: PayloadAction<any>) => ({
         ...state,
         projects: action.payload.data,
         isLoadingMatchingProjects: false,
      }),
      matchingProjectsFail: (state: ArtificialIntelligenceState) => ({
         ...state,
         isLoadingMatchingProjects: false,
      }),
      setOpenModalMatchingTalents: (state: ArtificialIntelligenceState, action: PayloadAction<boolean>) => ({
         ...state,
         openModalMatchingTalents: action.payload,
      }),
      requestMatchingTalents: (state: ArtificialIntelligenceState) => {
         toaster.create({
            title: 'Matching talents with AI...',
            type: 'info',
         })
         return {
            ...state,
            loadingMatchingTalents: true,
         }
      },
      matchingTalentsSuccess: (state: ArtificialIntelligenceState, action: PayloadAction<any>) => ({
         ...state,
         talents: action.payload.data,
         loadingMatchingTalents: false,
      }),
      matchingTalentsFail: (state: ArtificialIntelligenceState) => ({
         ...state,
         loadingMatchingTalents: false,
      }),
      requestConvertSpeechToText: (state: ArtificialIntelligenceState) => ({
         ...state,
         isLoadingConvertSpeechToText: true,
      }),
      convertSpeechToTextSuccess: (state: ArtificialIntelligenceState) => ({
         ...state,
         isLoadingConvertSpeechToText: false,
      }),
      convertSpeechToTextFail: (state: ArtificialIntelligenceState) => ({
         ...state,
         isLoadingConvertSpeechToText: false,
      }),
   },
})

export const {
   setOpenModalMatchingProjects,
   requestMatchingProjects,
   matchingProjectsSuccess,
   matchingProjectsFail,
   setOpenModalMatchingTalents,
   requestMatchingTalents,
   matchingTalentsSuccess,
   matchingTalentsFail,
   requestConvertSpeechToText,
   convertSpeechToTextSuccess,
   convertSpeechToTextFail,
} = artificialIntelligenceSlice.actions

export default artificialIntelligenceSlice.reducer
