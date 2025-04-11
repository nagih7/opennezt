import { createSlice } from '@reduxjs/toolkit'

import { message } from 'antd'
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
        startRequestMatchingTalents: (state) => ({
            ...state,
            loadingMatchingTalents: true,
        }),
        startRequestMatchingTalentsSuccess: (state, action) => {
            if (action.payload.data.length === 0) {
                message.error({
                    content: 'No matching talents found',
                    duration: 10,
                })
                return {
                    ...state,
                    talents: [],
                    loadingMatchingTalents: false,
                }
            } else {
                message.success({
                    content: 'Matching talents with AI successfully',
                    duration: 10,
                })
                return {
                    ...state,
                    talents: action.payload.data,
                    loadingMatchingTalents: false,
                    openModalMatchingTalents: true,
                }
            }
        },
        startRequestMatchingTalentsFail: (state) => {
            message.destroy('matchingTalents')
            message.error({
                content: 'Matching talents with AI failed',
                duration: 5,
            })
            return {
                ...state,
                talents: [],
                loadingMatchingTalents: false,
            }
        },
        setOpenModalMatchingTalents: (state, action) => ({
            ...state,
            openModalMatchingTalents: action.payload,
        }),
    },
})

export const {
    requestMatchingProjects,
    matchingProjectsSuccess,
    matchingProjectsFail,
    setOpenModalMatchingProjects,
    startRequestMatchingTalents,
    startRequestMatchingTalentsSuccess,
    startRequestMatchingTalentsFail,
    setOpenModalMatchingTalents,
} = artificialIntelligenceSlice.actions

export default artificialIntelligenceSlice.reducer
