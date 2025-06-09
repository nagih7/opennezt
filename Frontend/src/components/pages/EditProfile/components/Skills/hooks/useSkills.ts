import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getProfile, updateSkillProfile } from '~/api/profile'
import { getCategoryFramework, getSkillFramework, getSubCategoryFramework } from '~/api/user'
import { RootState } from '~/store'
import { FormData, SelectEvent, Skill } from '../types'
import { toast } from 'components/UI/toast'
import { createListCollection } from '@chakra-ui/react'
import { Collection } from '~/store/modules/user/types'

export const useSkills = () => {
   // ========== STATE FROM REDUX STORE ========== //
   const { isLoadingUpdateSkills } = useSelector((state: RootState) => state.profile)
   const [profile, setProfile] = useState<any>(null)
   const [categoryFramework, setCategoryFramework] = useState<Collection<any>>()
   const [subCategoryFramework, setSubCategoryFramework] = useState<Collection<any>>()
   const [skillFramework, setSkillFramework] = useState<Collection<any>>()
   const { skills } = profile || { skills: [] }
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
      }
   }, [profile, getProfile])

   // ========== STATE MANAGEMENT ========== //
   const [formData, setFormData] = useState<FormData>({
      categories: [],
      subcategories: [],
      skills: [],
      skillFormat: [],
   })
   const [mySkills, setMySkills] = useState<Skill[]>([])

   // ========== USE EFFECT ========== //
   const fetchCategoryFramework = async () => {
      const response = await getCategoryFramework()
      if (response && response.data) {
         setCategoryFramework(
            createListCollection({
               items: response.data.map((category: any) => ({
                  label: category.name,
                  value: category._id,
               })),
            })
         )
      }
   }
   useEffect(() => {
      if (!categoryFramework?.items?.length) {
         fetchCategoryFramework()
      }
   }, [categoryFramework?.items?.length, fetchCategoryFramework])

   useEffect(() => {
      if (skills) {
         setMySkills(skills)
      }
   }, [skills])

   const handleCallGetSubCategoryFramework = async (categoryId: any) => {
      const response = await getSubCategoryFramework(categoryId)
      if (response && response.data) {
         setSubCategoryFramework(
            createListCollection({
               items: response.data.map((category: any) => ({
                  label: category.name,
                  value: category._id,
               })),
            })
         )
      }
   }

   // ========== HANDLE CHANGE FUNCTION ========== //
   const handleChangeCategory = (event: SelectEvent): void => {
      setFormData({
         ...formData,
         categories: event.value,
         subcategories: [],
         skills: [],
         skillFormat: [],
      })
      handleCallGetSubCategoryFramework(event.value[0])
   }

   const handleCallGetSkillFramework = async (categoryId: any) => {
      const response = await getSkillFramework(categoryId)
      if (response && response.data) {
         setSkillFramework(
            createListCollection({
               items: response.data.map((skill: any) => ({
                  label: skill.name,
                  value: skill._id,
               })),
            })
         )
      }
   }

   const handleChangeSubCategory = (event: SelectEvent): void => {
      setFormData({
         ...formData,
         subcategories: event.value,
         skills: [],
         skillFormat: [],
      })
      handleCallGetSkillFramework(event.value[0])
   }

   const handleChangeSkill = (event: SelectEvent): void => {
      if (event.items) {
         setFormData({
            ...formData,
            skills: event.value,
            skillFormat: event.items.map((item) => ({
               _id: item.value,
               name: item.label,
               category_id: formData.subcategories[0],
            })),
         })
      }
   }

   const handleAddSkill = (): void => {
      const isExist = mySkills.find((skill) => skill._id === formData.skills[0])
      if (isExist) {
         toast.error('This skill already exists in your profile.')
      } else {
         setMySkills([...mySkills, ...formData.skillFormat])
         setFormData({
            ...formData,
            skills: [],
            skillFormat: [],
         })
      }
   }

   const handleRemoveSkill = (skill: Skill): void => {
      const newSkills = mySkills.filter((item) => item.name !== skill.name)
      setMySkills(newSkills)
   }

   const handleCallSaveChanges = async () => {
      const response = await updateSkillProfile({ skills: mySkills })
      if (response.status === 200 || response.status === 201) {
         toast.success('Skills updated successfully.')
      } else {
         toast.error('Failed to update skills.')
      }
   }

   const handleSaveChanges = (): void => {
      handleCallSaveChanges()
   }

   return {
      categoryFramework,
      subCategoryFramework,
      skillFramework,
      formData,
      mySkills,
      isLoadingUpdateSkills,
      handleChangeCategory,
      handleChangeSubCategory,
      handleChangeSkill,
      handleAddSkill,
      handleRemoveSkill,
      handleSaveChanges,
   }
}
