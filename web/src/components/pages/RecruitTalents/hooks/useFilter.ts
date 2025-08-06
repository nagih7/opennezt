import React, { useEffect, useState } from 'react'
import { getCategoryFramework, getIndustryFramework } from '~/api/user'

export const useFilter = () => {
   const [industries, setIndustries] = useState([])
   const [categories, setCategories] = useState([])
   const [subcategories, setSubcategories] = useState([])
   const [skills, setSkills] = useState([])
   const [formRecruitTalents, setFormRecruitTalents] = useState({
      industry: '',
      experienceLevel: '',
      category: '',
      subcategory: '',
      skill: '',
   })

   useEffect(() => {
      // Fetch industries, categories, subcategories, and skills from API or state management
      const fetchIndustries = async () => {
         try {
            const response = await getIndustryFramework()
            if (response.data) {
               setIndustries(response.data)
            }
         } catch (error) {
            console.error('Error fetching industries:', error)
         }
      }

      const fetchCategories = async () => {
         try {
            const response = await getCategoryFramework()
            if (response?.data) {
               setCategories(response.data)
            }
         } catch (error) {
            console.error('Error fetching categories:', error)
         }
      }

      const fetchSubcategories = async () => {
         // Implement fetching subcategories based on selected category
         // This is a placeholder function
      }
      // For example:
      // setIndustries(fetchIndustries())
      // setCategories(fetchCategories())
      // setSubcategories(fetchSubcategories())
      // setSkills(fetchSkills())
   }, [])

   // Function to handle changes in select inputs

   const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>, field: string) => {
      setFormRecruitTalents((prev) => ({
         ...prev,
         [field]: e.target.value,
      }))
   }

   return {
      industries,
      categories,
      subcategories,
      skills,

      formRecruitTalents,
      setFormRecruitTalents,
      handleChangeSelect,
   }
}
