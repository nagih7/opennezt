import React, { useEffect, useState } from 'react'
import { Button, createListCollection } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import SelectCustom from 'components/UI/SelectCustom'
import { getCategoryFramework, getSkillFramework, getSubCategoryFramework } from 'api/user'
import { Badge } from '~/components/UI/badge'
import { updateSkillRequirement } from 'api/project'
import { postProjectDetailsActivitiesProjectRequirement } from 'api/activity'
import { RootState } from 'store/types'
import { AppDispatch } from '~/store'
import { toaster } from 'components/UI/toaster'

interface FormData {
   categories: string[]
   subcategories: string[]
   skills: string[]
   skillFormat: Skill[]
}

interface Skill {
   _id: string
   name: string
   category_id: string
}

interface SelectEvent {
   value: string[]
   items?: Array<{
      value: string
      label: string
   }>
}

const SkillRequirement: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>()
   // ========== STATE FROM REDUX STORE  ========== //
   const { myProjectDetails, isLoadingUpdateSkillRequirement } = useSelector((state: RootState) => state.project)

   // ========== LOCAL STATE MANAGEMENT ========== //
   const [categoryFramework, setCategoryFramework] = useState<any>(null)
   const [subCategoryFramework, setSubCategoryFramework] = useState<any>(null)
   const [skillFramework, setSkillFramework] = useState<any>(null)

   const [formData, setFormData] = useState<FormData>({
      categories: [],
      subcategories: [],
      skills: [],
      skillFormat: [],
   })
   const [mySkills, setMySkills] = useState<Skill[]>([])

   // ========== USE EFFECT ========== //
   useEffect(() => {
      if (myProjectDetails?.requirements?.skills?.length > 0) {
         setMySkills(myProjectDetails?.requirements?.skills)
      }
   }, [myProjectDetails])

   // ========== FETCH FRAMEWORKS ========== //
   const fetchCategoryFramework = async () => {
      try {
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
      } catch (error) {
         console.error('Error fetching category framework:', error)
         setCategoryFramework(createListCollection({ items: [] }))
      }
   }

   useEffect(() => {
      fetchCategoryFramework()
   }, [])

   // ========== HANDLE CHANGE FUNCTION ========== //
   const handleChangeCategory = async (event: SelectEvent): Promise<void> => {
      setFormData({
         ...formData,
         categories: event.value,
         subcategories: [],
         skills: [],
      })

      // Fetch subcategories
      try {
         setSubCategoryFramework(null) // Reset trước khi fetch
         const response = await getSubCategoryFramework(event.value[0])
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
      } catch (error) {
         console.error('Error fetching subcategory framework:', error)
         setSubCategoryFramework(createListCollection({ items: [] }))
      }
   }

   const handleChangeSubCategory = async (event: SelectEvent): Promise<void> => {
      setFormData({
         ...formData,
         subcategories: event.value,
         skills: [],
      })

      // Fetch skills
      try {
         setSkillFramework(null) // Reset trước khi fetch
         const response = await getSkillFramework(event.value[0])
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
      } catch (error) {
         console.error('Error fetching skill framework:', error)
         setSkillFramework(createListCollection({ items: [] }))
      }
   }

   const handleChangeSkill = (event: SelectEvent): void => {
      if (!event.items) return

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

   const handleAddSkill = (): void => {
      // Verify if the skill is already added
      const isExist = mySkills.find((skill) => skill._id === formData.skills[0])
      if (isExist) {
         toaster.create({
            title: `Skill already added.`,
            type: 'error',
         })
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

   const handleSaveProjectRequirement = async (): Promise<void> => {
      try {
         // Filter skills with unique _id
         const skills = mySkills.filter((skill, index, self) => index === self.findIndex((s) => s._id === skill._id))

         dispatch(updateSkillRequirement(myProjectDetails._id, { skills }))
         await postProjectDetailsActivitiesProjectRequirement(myProjectDetails._id)
      } catch (error) {
         console.error('Error updating skill requirement:', error)
      }
   }

   // ========= RENDER  ========== //
   return (
      <div className="flex flex-col gap-4 mt-8 mb-8">
         {categoryFramework && (
            <SelectCustom
               required
               label="Category"
               placeholder="Ex: Software Engineer"
               collection={categoryFramework}
               onChange={(event: SelectEvent) => handleChangeCategory(event)}
               value={formData?.categories}
            />
         )}
         {subCategoryFramework && (
            <SelectCustom
               disabled={formData?.categories?.length === 0}
               required
               label="Sub Category"
               placeholder="Ex: Software Engineer"
               collection={subCategoryFramework}
               onChange={(event: SelectEvent) => handleChangeSubCategory(event)}
               value={formData.subcategories}
            />
         )}
         {skillFramework && (
            <SelectCustom
               multiple
               disabled={formData?.subcategories?.length === 0}
               required
               label="Skills"
               placeholder="Ex: React, Node.js"
               collection={skillFramework}
               onChange={(event: SelectEvent) => handleChangeSkill(event)}
               value={formData.skills}
            />
         )}
         <div className="flex justify-end">
            <div className="">
               <Button
                  disabled={formData?.skills?.length === 0}
                  onClick={handleAddSkill}
                  height={50}
                  className="mt-[14px] px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                  borderRadius={4}
                  loading={false}
                  loadingText="Loading..."
                  spinnerPlacement="start"
               >
                  ADD
               </Button>
            </div>
         </div>
         <div className="px-[16px] flex gap-8 mt-6 flex-wrap">
            {/* =========== SKILLS ========== */}
            {mySkills?.map((skill, index) => (
               <div key={index} className="relative group">
                  <Badge className="relative bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full flex-wrap text-[1rem] cursor-pointer">
                     <div
                        className="absolute top-[-6px] right-[-6px] text-blue-500 bg-white rounded-full px-[4px] hidden group-hover:block "
                        onClick={() => handleRemoveSkill(skill)}
                     >
                        ✕
                     </div>
                     {skill.name}
                  </Badge>
               </div>
            ))}
         </div>
         <div className="flex justify-end">
            <Button
               height={50}
               className=" text-sm px-[28px] bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
               borderRadius={4}
               loading={isLoadingUpdateSkillRequirement}
               loadingText="Loading..."
               spinnerPlacement="start"
               onClick={handleSaveProjectRequirement}
            >
               SAVE CHANGES
            </Button>
         </div>
      </div>
   )
}

export default SkillRequirement
