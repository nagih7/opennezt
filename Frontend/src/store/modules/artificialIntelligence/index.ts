import { createSlice } from '@reduxjs/toolkit'
import { ArtificialIntelligenceState } from './types'

// Define the initial state with TypeScript typing
const initialState: ArtificialIntelligenceState = {
   isLoadingConvertSpeechToText: false,
}

const artificialIntelligenceSlice = createSlice({
   name: 'artificialIntelligence',
   initialState,
   reducers: {
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

export const { requestConvertSpeechToText, convertSpeechToTextSuccess, convertSpeechToTextFail } =
   artificialIntelligenceSlice.actions

export default artificialIntelligenceSlice.reducer
