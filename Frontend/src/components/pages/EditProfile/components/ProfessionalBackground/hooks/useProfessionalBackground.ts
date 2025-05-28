import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile, updateProfessionalProfile } from 'api/profile'
import { getExperienceLevelFramwork, getIndustryFramework } from 'api/user'
import { RootState } from '~/store'
import { FormData, SelectEvent } from '../types'
import { toast } from 'components/UI/toast'
import { AppDispatch } from '../../Certifications/types'
import { createListCollection } from '@chakra-ui/react'

export const useProfessionalBackground = () => {
   const dispatch = useDispatch<AppDispatch>()

   // ========== STATE FROM REDUX STORE ========== //
   const { isLoadingUpdateProfile } = useSelector((state: RootState) => state.profile)
   const [profile, setProfile] = useState<any>(null)
   const [industryFramework, setIndustryFramework] = useState<any>(null)
   const [experienceLevelFramework, setExperienceLevelFramework] = useState<any>(null)
      useEffect(() => {
      if (!profile) {
         const fetchProfile = async () => {
            const response = await getProfile()
            if (response && response.data) {
               setProfile(response.data)
            }
         }
         if (profile === null) {
            fetchProfile()
         }
   }}, [profile, getProfile])

   // ========== STATE MANAGEMENT ========== //
   const [formData, setFormData] = useState<FormData>({
      industries: [],
      experience_level: [],
   })

   const fetchIndustryFramework = async () => {
      const response = await getIndustryFramework()
      if (response && response.data) {
         setIndustryFramework(
            createListCollection({
            items: response.data.map((industry: any) => ({
               label: industry.name,
               value: industry._id,
            })),
         }),
         )
      }
   }

   const fetchExperienceLevelFramework = async () => {
      const response = await getExperienceLevelFramwork()
      if (response && response.data) {
         setExperienceLevelFramework(
            createListCollection({
               items: response.data.map((level: any) => ({
                  label: level.name,
                  value: level._id,
               })),
            }),
         )
      }
   }

   useEffect(() => {
      fetchIndustryFramework()
      fetchExperienceLevelFramework()
   }, [dispatch, getIndustryFramework, getExperienceLevelFramwork])

   useEffect(() => {
      if (profile) {
         setFormData({
            ...formData,
            industries: profile?.industries?.map((industry) => industry._id) || [],
            experience_level: profile?.experience_level?._id ? [profile.experience_level._id] : [],
         })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [profile])

   // ========== HANDLE CHANGE FUNCTION ========== //
   const handleChange = (event: SelectEvent, nameSelect: keyof FormData): void => {
      if (nameSelect === 'industries') {
         if (formData.industries.length > 2) {
            setFormData({
               ...formData,
               industries: formData.industries.slice(0, 2),
            })
         }
         if (event.value.length > 2) {
            toast.error('You can only select up to 2 industries.')
            return
         }
      }
      setFormData({
         ...formData,
         [nameSelect]: event.value,
      })
   }

   const handleUpdateProfessionalProfile = async () => {
      try {
         const response = await (
            updateProfessionalProfile({
               industry_ids: formData.industries,
               experience_level_id: formData.experience_level[0],
            })
         )
         if (response.status === 200) {
            toast.success('Professional background updated successfully.')
         }
         else {
            toast.error('Failed to update professional background.')
         }
      } catch (error) {
         toast.error('Failed to update professional background.')
      }
   }
   
   const handleSaveChanges = (): void => {
      handleUpdateProfessionalProfile()
   }

   return {
      profile,
      isLoadingUpdateProfile,
      industryFramework,
      experienceLevelFramework,
      formData,
      handleChange,
      handleSaveChanges
   }
}