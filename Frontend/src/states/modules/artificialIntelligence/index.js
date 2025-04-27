import { createSlice } from '@reduxjs/toolkit'

import { toaster } from 'components/UI/toaster'

const artificialIntelligenceSlice = createSlice({
    name: 'artificialIntelligence',
    initialState: {
        // ========== AI Matching Project ========== //
        projects: [],
        isLoadingMatchingProjects: false,
        isOpenModalMatchingProjects: false,
        // ========== AI Matching Talents ========== //
        talents: [],
        openModalMatchingTalents: false,
        loadingMatchingTalents: false,
        isLoadingConvertSpeechToText: false,
    },
    reducers: {
        setOpenModalMatchingProjects: (state, action) => ({
            ...state,
            isOpenModalMatchingProjects: action.payload,
        }),
        requestMatchingProjects: (state) => {
            toaster.create({
                title: 'Matching projects with AI...',
                type: 'info',
            })
            return {
                ...state,
                isLoadingMatchingProjects: true,
            }
        },
        matchingProjectsSuccess: (state, action) => {
            if (action.payload.data.length === 0) {
                toaster.create({
                    title: 'No matching projects found',
                    type: 'info',
                })
                return {
                    ...state,
                    projects: [],
                    isLoadingMatchingProjects: false,
                }
            } else {
                toaster.create({
                    title: 'Matching projects with AI successfully',
                    type: 'success',
                })
                return {
                    ...state,
                    projects: action.payload.data,
                    isLoadingMatchingProjects: false,
                    isOpenModalMatchingProjects: true,
                }
            }
        },
        matchingProjectsFail: (state) => {
            toaster.create({
                title: 'Matching projects with AI failed',
                type: 'error',
            })
            return {
                ...state,
                projects: [],
                isLoadingMatchingProjects: false,
            }
        },
    },
})

export const { requestMatchingProjects, matchingProjectsSuccess, matchingProjectsFail, setOpenModalMatchingProjects } =
    artificialIntelligenceSlice.actions

export default artificialIntelligenceSlice.reducer
