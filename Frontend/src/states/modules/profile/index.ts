import { createListCollection } from '@chakra-ui/react'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toaster } from 'components/UI/toaster'
import { ProfileState } from './types'

// Define the initial state with TypeScript typing
const initialState: ProfileState = {
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
   //  ========= Skill ========== //
   isLoadingUpdateSkills: false,
   // Initialize other properties as needed
   currentEducation: null,
   currentCertification: null,
   currentExperience: null,
   isOpenModalCreateOrUpdateExperience: false,
   isLoadingCreateOrUpdateExperience: false,
}

const profileSlice = createSlice({
   name: 'profile',
   initialState,
   reducers: {
      // ========== UPDATE INFO USER ========== //
      requestUpdateInfoUser: (state: ProfileState) => ({
         ...state,
         loadingBtnUpdateInfoUser: true,
      }),
      updateInfoUserSuccess: (state: ProfileState) => ({
         ...state,
         loadingBtnUpdateInfoUser: false,
         errorInfoUser: {
            name: '',
            email: '',
            phone: '',
         },
      }),
      updateInfoUserFailed: (state: ProfileState, action: PayloadAction<any>) => ({
         ...state,
         loadingBtnUpdateInfoUser: false,
         errorInfoUser: action.payload,
      }),
      // ========== CHANGE PASSWORD ========== //
      requestChangePassword: (state: ProfileState) => ({
         ...state,
         loadingBtnChangePassword: true,
      }),
      changePasswordSuccess: (state: ProfileState) => ({
         ...state,
         loadingBtnChangePassword: false,
         errorChangePassword: {
            currentPassword: '',
            password: '',
            confirmPassword: '',
         },
      }),
      changePasswordFailed: (state: ProfileState, action: PayloadAction<any>) => ({
         ...state,
         loadingBtnChangePassword: false,
         errorChangePassword: action.payload,
      }),
      // ========== CHANGE AVATAR ========== //
      requestChangeAvatar: (state: ProfileState) => ({
         ...state,
         isLoadingBtnChangeAvatar: true,
      }),
      changeAvatarSuccess: (state: ProfileState, action: PayloadAction<any>) => ({
         ...state,
         isLoadingBtnChangeAvatar: false,
         profile: {
            ...state.profile,
            avatar: action.payload,
         },
         isOpenAvatarPreview: false,
      }),
      changeAvatarFailed: (state: ProfileState) => ({
         ...state,
         isLoadingBtnChangeAvatar: false,
      }),
      setOpenAvatarPreview: (state: ProfileState, action: PayloadAction<boolean>) => ({
         ...state,
         isOpenAvatarPreview: action.payload,
      }),
      // ========== PROFILE ========== //
      requestGetProfile: (state: ProfileState) => ({
         ...state,
         isLoadingGetProfile: true,
      }),
      getProfileSuccess: (state: ProfileState, action: PayloadAction<any>) => ({
         ...state,
         profile: action.payload.data,
         isLoadingGetProfile: false,
      }),
      getProfileFailed: (state: ProfileState) => ({
         ...state,
         isLoadingGetProfile: false,
      }),
      updateProfileRequest: (state: ProfileState) => ({
         ...state,
         isLoadingUpdateProfile: true,
      }),
      updateProfileSuccess: (state: ProfileState, action: PayloadAction<any>) => ({
         ...state,
         profile: action.payload.data,
         isLoadingUpdateProfile: false,
      }),
      updateProfileFailed: (state: ProfileState) => ({
         ...state,
         isLoadingUpdateProfile: false,
      }),
      // ========== EDUCATION ========== //
      setOpenModalCreateOrUpdateEducation: (state: ProfileState, action: PayloadAction<boolean>) => ({
         ...state,
         isOpenModalCreateOrUpdateEducation: action.payload,
      }),
      setCurrentEducation: (state: ProfileState, action: PayloadAction<any>) => ({
         ...state,
         currentEducation: action.payload,
         isOpenModalCreateOrUpdateEducation: true,
      }),
      requestCreateOrUpdateEducation: (state: ProfileState) => ({
         ...state,
         isLoadingCreateOrUpdateEducation: true,
      }),
      createOrUpdateEducationSuccess: (state: ProfileState, action: PayloadAction<any>) => ({
         ...state,
         profile: {
            ...state.profile,
            educations: action.payload.data,
         },
         isLoadingCreateOrUpdateEducation: false,
         isOpenModalCreateOrUpdateEducation: false,
         currentEducation: null,
      }),
      createOrUpdateEducationFailed: (state: ProfileState) => ({
         ...state,
         isLoadingCreateOrUpdateEducation: false,
      }),
      // ========== CERTIFICATION ========== //
      setOpenModalCreateOrUpdateCertification: (state: ProfileState, action: PayloadAction<boolean>) => ({
         ...state,
         isOpenModalCreateOrUpdateCertification: action.payload,
      }),
      setCurrentCertification: (state: ProfileState, action: PayloadAction<any>) => ({
         ...state,
         currentCertification: action.payload,
         isOpenModalCreateOrUpdateCertification: true,
      }),
      requestCreateOrUpdateCertification: (state: ProfileState) => ({
         ...state,
         isLoadingCreateOrUpdateCertification: true,
      }),
      createOrUpdateCertificationSuccess: (state: ProfileState, action: PayloadAction<any>) => ({
         ...state,
         profile: {
            ...state.profile,
            certifications: action.payload.data,
         },
         isLoadingCreateOrUpdateCertification: false,
         isOpenModalCreateOrUpdateCertification: false,
         currentCertification: null,
      }),
      createOrUpdateCertificationFailed: (state: ProfileState) => ({
         ...state,
         isLoadingCreateOrUpdateCertification: false,
      }),
   },
})

export const {
   // ========== UPDATE INFO USER ========== //
   requestUpdateInfoUser,
   updateInfoUserSuccess,
   updateInfoUserFailed,
   // ========== CHANGE PASSWORD ========== //
   requestChangePassword,
   changePasswordSuccess,
   changePasswordFailed,
   // ========== CHANGE AVATAR ========== //
   requestChangeAvatar,
   changeAvatarSuccess,
   changeAvatarFailed,
   setOpenAvatarPreview,
   // ========== PROFILE ========== //
   requestGetProfile,
   getProfileSuccess,
   getProfileFailed,
   updateProfileRequest,
   updateProfileSuccess,
   updateProfileFailed,
   // ========== EDUCATION ========== //
   setOpenModalCreateOrUpdateEducation,
   setCurrentEducation,
   requestCreateOrUpdateEducation,
   createOrUpdateEducationSuccess,
   createOrUpdateEducationFailed,
   // ========== CERTIFICATION ========== //
   setOpenModalCreateOrUpdateCertification,
   setCurrentCertification,
   requestCreateOrUpdateCertification,
   createOrUpdateCertificationSuccess,
   createOrUpdateCertificationFailed,
} = profileSlice.actions

export default profileSlice.reducer
