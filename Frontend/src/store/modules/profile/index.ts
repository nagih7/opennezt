import { createListCollection } from '@chakra-ui/react'
import { createSlice } from '@reduxjs/toolkit'
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
   // ========= FRIENDS ========= //
   myFriends: [],
   isLoadingGetMyFriends: false,
}

const profileSlice = createSlice({
   name: 'profile',
   initialState,
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
         // toaster.create({
         //    title: `Update info user successfully.`,
         //    type: 'success',
         // })
         return {
            ...state,
            loadingBtnUpdateInfoUser: false,
         }
      },
      updateInfoUserFail: (state, action) => {
         // toaster.create({
         //    title: `${Object.values(action.payload.data.detail)[0]}`,
         //    type: 'error',
         // })
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
      changeBackgroundUser: (state) => ({
         ...state,
      }),
      changeBackgroundUserSuccess: (state) => ({
         ...state,
      }),
      changeBackgroundUserFail: (state) => ({
         ...state,
      }),
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
   changeBackgroundUser,
   changeBackgroundUserSuccess,
   changeBackgroundUserFail,
} = profileSlice.actions

export default profileSlice.reducer
