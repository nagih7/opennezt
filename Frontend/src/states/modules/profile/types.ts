export interface ProfileState {
   errorInfoUser: {
      name: string
      email: string
      phone: string
   }
   errorChangePassword: {
      currentPassword: string
      password: string
      confirmPassword: string
   }
   loadingBtnUpdateInfoUser: boolean
   loadingBtnChangePassword: boolean
   isLoadingBtnChangeAvatar: boolean
   // ========== Profile ========== //
   profile: any | null
   isLoadingGetProfile: boolean
   isLoadingUpdateProfile: boolean
   isOpenAvatarPreview: boolean
   // ========== Education ========== //
   isOpenModalCreateOrUpdateEducation: boolean
   isLoadingCreateOrUpdateEducation: boolean
   // ========== Certification ========== //
   isOpenModalCreateOrUpdateCertification: boolean
   isLoadingCreateOrUpdateCertification: boolean
   // ========== Skill ========== //
   isLoadingUpdateSkills: boolean
   // Add other properties based on the full state
   [key: string]: any
}
