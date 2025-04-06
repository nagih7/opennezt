import { createListCollection } from '@chakra-ui/react'
import { createSlice } from '@reduxjs/toolkit'
import { toaster } from 'components/UI/toaster'

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        errorInfoUser: {
            name: '',
            email: '',
            phone: '',
        },
        errorChangePassword: {
            currentPassword: '',
            password: '',
            confirmPassword: '',
        },
        loadingBtnUpdateInfoUser: false,
        loadingBtnChangePassword: false,
        isLoadingBtnChangeAvatar: false,
        // ========== Profile ========== //
        profile: null,
        isLoadingGetProfile: false,
        isLoadingUpdateProfile: false,
        isOpenAvatarPreview: false,
        // ========== Education ========== //
        isOpenModalCreateOrUpdateEducation: false,
        isLoadingCreateOrUpdateEducation: false,
        // ========== Certification ========== //
        isOpenModalCreateOrUpdateCertification: false,
        isLoadingCreateOrUpdateCertification: false,
        // ========== Skills ========== //
        isLoadingUpdateSkills: false,
        // ========== Organization ========== //
        organizationFramework: createListCollection({
            items: [],
        }),
        isLoadingGetAllOrganizationFramework: false,
        // ========== Additional Info ========== //
        isOpenModalCreateOrUpdateProfileAdditionalInfo: false,
        isLoadingCreateOrUpdateProfileAdditionalInfo: false,
    },
    reducers: {
        setErrorInfoUser: (state, action) => ({
            ...state,
            errorInfoUser: action.payload,
        }),
        setErrorChangePassword: (state, action) => ({
            ...state,
            errorChangePassword: action.payload,
        }),
        updateInfoUser: (state) => ({
            ...state,
            loadingBtnUpdateInfoUser: true,
        }),
        updateInfoUserSuccess: (state, action) => {
            toaster.create({
                title: `Update info user successfully.`,
                type: 'success',
            })
            return {
                ...state,
                loadingBtnUpdateInfoUser: false,
            }
        },
        updateInfoUserFail: (state, action) => {
            toaster.create({
                title: `${Object.values(action.payload.data.detail)[0]}`,
                type: 'error',
            })
            return {
                ...state,
                loadingBtnUpdateInfoUser: false,
            }
        },
        changePassword: (state) => ({
            ...state,
            loadingBtnChangePassword: true,
        }),
        changePasswordSuccess: (state) => ({
            ...state,
            loadingBtnChangePassword: false,
        }),
        changePasswordFail: (state) => ({
            ...state,
            loadingBtnChangePassword: false,
        }),
        changeAvatarUser: (state) => ({
            ...state,
            isLoadingBtnChangeAvatar: true,
        }),
        changeAvatarUserSuccess: (state) => {
            return {
                ...state,
                isLoadingBtnChangeAvatar: false,
                isOpenAvatarPreview: false,
            }
        },
        changeAvatarUserFail: (state) => ({
            ...state,
            isLoadingBtnChangeAvatar: false,
        }),
        changeBackgroundUser: (state) => ({
            ...state,
        }),
        changeBackgroundUserSuccess: (state) => ({
            ...state,
        }),
        changeBackgroundUserFail: (state) => ({
            ...state,
        }),

        // ========== Profile ========== //
        requestGetProfile: (state) => ({
            ...state,
            isLoadingGetProfile: true,
        }),
        requestGetProfileSuccess: (state, action) => {
            return {
                ...state,
                profile: action.payload.data,
                isLoadingGetProfile: false,
            }
        },
        requestGetProfileFail: (state) => {
            return {
                ...state,
                isLoadingGetProfile: false,
            }
        },
        requestUpdateProfessionalProfile: (state) => ({
            ...state,
            isLoadingUpdateProfile: true,
        }),
        UpdateProfessionalProfileSuccess: (state) => {
            toaster.create({
                title: `Update professional profile successfully.`,
                type: 'success',
            })
            return {
                ...state,
                isLoadingUpdateProfile: false,
            }
        },
        UpdateProfessionalProfileFail: (state) => {
            toaster.create({
                title: `Update professional profile fail.`,
                type: 'error',
            })
            return {
                ...state,
                isLoadingUpdateProfile: false,
            }
        },
        setIsOpenAvatarPreview: (state, action) => ({
            ...state,
            isOpenAvatarPreview: action.payload,
        }),

        // ========== Education ========== //
        requestCreateOrUpdateEducation: (state) => ({
            ...state,
            isLoadingCreateOrUpdateEducation: true,
        }),
        createEducationSuccess: (state, action) => {
            toaster.create({
                title: `${action.payload.message}`,
                type: 'success',
            })
            return {
                ...state,
                profile: {
                    ...state.profile,
                    educations: [...state.profile.educations, action.payload.data],
                },
                isLoadingCreateOrUpdateEducation: false,
                isOpenModalCreateOrUpdateEducation: false,
            }
        },
        updateEducationSuccess: (state, action) => {
            toaster.create({
                title: `${action.payload.message}`,
                type: 'success',
            })
            return {
                ...state,
                profile: {
                    ...state.profile,
                    educations: state.profile.educations.map((item) =>
                        item._id === action.payload.data._id ? action.payload.data : item
                    ),
                },
                isLoadingCreateOrUpdateEducation: false,
                isOpenModalCreateOrUpdateEducation: false,
            }
        },
        createOrUpdateEducationFail: (state, action) => {
            toaster.create({
                title: `${Object.values(action.payload.data.detail)[0]}`,
                type: 'error',
            })
            return {
                ...state,
                isLoadingCreateOrUpdateEducation: false,
            }
        },
        requestDeleleEducation: (state) => ({
            ...state,
            isLoadingCreateOrUpdateEducation: true,
        }),
        deleteEducationSuccess: (state, action) => {
            toaster.create({
                title: `${action.payload.message}`,
                type: 'success',
            })
            return {
                ...state,
                profile: {
                    ...state.profile,
                    educations: state.profile.educations.filter((item) => item._id !== action.payload.data),
                },
                isLoadingCreateOrUpdateEducation: false,
            }
        },
        deleteEducationFail: (state, action) => {
            toaster.create({
                title: `${Object.values(action.payload.data.detail)[0]}`,
                type: 'error',
            })
            return {
                ...state,
                isLoadingCreateOrUpdateEducation: false,
            }
        },
        setIsOpenModalCreateOrUpdateEducation: (state, action) => ({
            ...state,
            isOpenModalCreateOrUpdateEducation: action.payload,
        }),

        // ========== Certification ========== //
        requestCreateOrUpdateCertification: (state) => ({
            ...state,
            isLoadingCreateOrUpdateCertification: true,
        }),
        createCertificationSuccess: (state, action) => {
            toaster.create({
                title: `${action.payload.message}`,
                type: 'success',
            })
            return {
                ...state,
                profile: {
                    ...state.profile,
                    certifications: [...state.profile.certifications, action.payload.data],
                },
                isLoadingCreateOrUpdateCertification: false,
                isOpenModalCreateOrUpdateCertification: false,
            }
        },
        updateCertificationSuccess: (state, action) => {
            toaster.create({
                title: `${action.payload.message}`,
                type: 'success',
            })
            return {
                ...state,
                profile: {
                    ...state.profile,
                    certifications: state.profile.certifications.map((item) =>
                        item._id === action.payload.data._id ? action.payload.data : item
                    ),
                },
                isLoadingCreateOrUpdateCertification: false,
                isOpenModalCreateOrUpdateCertification: false,
            }
        },
        createOrUpdateCertificationFail: (state, action) => {
            toaster.create({
                title: `${Object.values(action.payload.data.detail)[0]}`,
                type: 'error',
            })
            return {
                ...state,
                isLoadingCreateOrUpdateCertification: false,
            }
        },
        setIsOpenModalCreateOrUpdateCertification: (state, action) => ({
            ...state,
            isOpenModalCreateOrUpdateCertification: action.payload,
        }),
        requestDeleleCertification: (state) => ({
            ...state,
            isLoadingCreateOrUpdateCertification: true,
        }),
        deleteCertificationSuccess: (state, action) => {
            toaster.create({
                title: `${action.payload.message}`,
                type: 'success',
            })
            return {
                ...state,
                profile: {
                    ...state.profile,
                    certifications: state.profile.certifications.filter((item) => item._id !== action.payload.data),
                },
                isLoadingCreateOrUpdateCertification: false,
            }
        },
        deleteCertificationFail: (state, action) => {
            toaster.create({
                title: `${Object.values(action.payload.data.detail)[0]}`,
                type: 'error',
            })
            return {
                ...state,
                isLoadingCreateOrUpdateCertification: false,
            }
        },
        // ========== Skills ========== //
        requestUpdateSkills: (state) => ({
            ...state,
            isLoadingUpdateSkills: true,
        }),
        updateSkillsSuccess: (state, action) => {
            toaster.create({
                title: `${action.payload.message}`,
                type: 'success',
            })
            return {
                ...state,
                isLoadingUpdateSkills: false,
            }
        },
        updateSkillsFail: (state) => ({
            ...state,
            isLoadingUpdateSkills: false,
        }),

        // ========== Organization ========== //
        requestgetOrganizationFramework: (state) => ({
            ...state,
            isLoadingGetAllOrganizationFramework: true,
        }),
        requestgetOrganizationFrameworkSuccess: (state, action) => ({
            ...state,
            isLoadingGetAllOrganizationFramework: false,
            organizationFramework: createListCollection({
                items: action.payload.data.map((organization) => ({
                    label: organization.name,
                    value: organization._id,
                })),
            }),
        }),
        requestgetOrganizationFrameworkFail: (state) => ({
            ...state,
            isLoadingGetAllOrganizationFramework: false,
        }),
        // ========== Additional Info ========== //
        requestCreateOrUpdateProfileAdditionalInfo: (state) => ({
            ...state,
            isLoadingCreateOrUpdateProfileAdditionalInfo: true,
        }),
        createProfileAdditionalInfoSuccess: (state, action) => {
            toaster.create({
                title: `${action.payload.message}`,
                type: 'success',
            })
            return {
                ...state,
                profile: {
                    ...state.profile,
                    additional_infos: [...state.profile.additional_infos, action.payload.data],
                },
                isLoadingCreateOrUpdateProfileAdditionalInfo: false,
                isOpenModalCreateOrUpdateProfileAdditionalInfo: false,
            }
        },
        updateProfileAdditionalInfoSuccess: (state, action) => {
            toaster.create({
                title: `${action.payload.message}`,
                type: 'success',
            })
            return {
                ...state,
                profile: {
                    ...state.profile,
                    additional_infos: state.profile.additional_infos.map((item) =>
                        item._id === action.payload.data._id ? action.payload.data : item
                    ),
                },
                isLoadingCreateOrUpdateProfileAdditionalInfo: false,
                isOpenModalCreateOrUpdateProfileAdditionalInfo: false,
            }
        },
        createOrUpdateProfileAdditionalInfoFail: (state, action) => {
            toaster.create({
                title: `${Object.values(action.payload.data.detail)[0]}`,
                type: 'error',
            })
            return {
                ...state,
                isLoadingCreateOrUpdateProfileAdditionalInfo: false,
            }
        },
        setIsOpenModalCreateOrUpdateProfileAdditionalInfo: (state, action) => ({
            ...state,
            isOpenModalCreateOrUpdateProfileAdditionalInfo: action.payload,
        }),
        // ========== Additional Info - Delete ========== //
        requestDeleleProfileAdditionalInfo: (state) => ({
            ...state,
            isLoadingCreateOrUpdateProfileAdditionalInfo: true,
        }),
        deleteProfileAdditionalInfoSuccess: (state, action) => {
            toaster.create({
                title: `${action.payload.message}`,
                type: 'success',
            })
            return {
                ...state,
                profile: {
                    ...state.profile,
                    additional_infos: state.profile.additional_infos.filter((item) => item._id !== action.payload.data),
                },
                isLoadingCreateOrUpdateProfileAdditionalInfo: false,
            }
        },
        deleteProfileAdditionalInfoFail: (state, action) => {
            toaster.create({
                title: `${Object.values(action.payload.data.detail)[0]}`,
                type: 'error',
            })
            return {
                ...state,
                isLoadingCreateOrUpdateProfileAdditionalInfo: false,
            }
        },
    },
})

export const {
    setErrorInfoUser,
    setErrorChangePassword,
    updateInfoUser,
    updateInfoUserSuccess,
    updateInfoUserFail,
    changePassword,
    changePasswordSuccess,
    changePasswordFail,
    changeAvatarUser,
    changeAvatarUserSuccess,
    changeAvatarUserFail,
    changeBackgroundUser,
    changeBackgroundUserSuccess,
    changeBackgroundUserFail,
    // ========== Profile ========== //
    requestGetProfile,
    requestGetProfileSuccess,
    requestGetProfileFail,
    requestUpdateProfessionalProfile,
    UpdateProfessionalProfileSuccess,
    UpdateProfessionalProfileFail,
    setIsOpenAvatarPreview,
    // ========== Education ========== //
    requestCreateOrUpdateEducation,
    createEducationSuccess,
    updateEducationSuccess,
    createOrUpdateEducationFail,
    setIsOpenModalCreateOrUpdateEducation,
    // ========== Education - Delete ========== //
    requestDeleleEducation,
    deleteEducationSuccess,
    deleteEducationFail,
    // ========== Certification ========== //
    requestCreateOrUpdateCertification,
    createCertificationSuccess,
    updateCertificationSuccess,
    createOrUpdateCertificationFail,
    setIsOpenModalCreateOrUpdateCertification,
    // ========== Certification - Delete ========== //
    requestDeleleCertification,
    deleteCertificationSuccess,
    deleteCertificationFail,
    // ========== Skills ========== //
    requestUpdateSkills,
    updateSkillsSuccess,
    updateSkillsFail,
    // ========== Organization ========== //
    requestgetOrganizationFramework,
    requestgetOrganizationFrameworkSuccess,
    requestgetOrganizationFrameworkFail,
    // ========== Additional Info ========== //
    requestCreateOrUpdateProfileAdditionalInfo,
    createProfileAdditionalInfoSuccess,
    updateProfileAdditionalInfoSuccess,
    createOrUpdateProfileAdditionalInfoFail,
    setIsOpenModalCreateOrUpdateProfileAdditionalInfo,
    // ========== Additional Info - Delete ========== //
    requestDeleleProfileAdditionalInfo,
    deleteProfileAdditionalInfoSuccess,
    deleteProfileAdditionalInfoFail,
} = profileSlice.actions

export default profileSlice.reducer
