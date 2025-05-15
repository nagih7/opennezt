import React, { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import SelectCustom from 'components/UI/SelectCustom'
import { getCategoryFramework, getSkillFramework, getSubCategoryFramework } from 'api/user'
import { Tag } from 'antd'
import { updateSkillRequirement } from 'api/project'
import { postProjectDetailsActivitiesProjectRequirement } from 'api/activity'
import { RootState } from 'store/types'
import { AppDispatch } from 'store/configureStore'
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
   const { categoryFramework, subCategoryFramework, skillFramework } = useSelector((state: RootState) => state.user)

   // ========== STATE MANAGEMENT ========== //
   const [formData, setFormData] = useState<FormData>({
      categories: [],
      subcategories: [],
      skills: [],
      skillFormat: [],
   })
   const [mySkills, setMySkills] = useState<Skill[]>([])

   // ========== USE EFFECT ========== //
   // ========== EFFECTS  ========== //
   useEffect(() => {
      if (myProjectDetails?.requirements?.skills?.length > 0) {
         setMySkills(myProjectDetails?.requirements?.skills)
      }
   }, [myProjectDetails])

   useEffect(() => {
      if (categoryFramework.items?.length === 0) {
         dispatch(getCategoryFramework())
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dispatch])

   // ========== HANDLE CHANGE FUNCTION ========== //
   const handleChangeCategory = (event: SelectEvent): void => {
      setFormData({
         ...formData,
         categories: event.value,
         subcategories: [],
         skills: [],
      })
      dispatch(getSubCategoryFramework(event.value[0]))
   }

   const handleChangeSubCategory = (event: SelectEvent): void => {
      setFormData({
         ...formData,
         subcategories: event.value,
         skills: [],
      })
      dispatch(getSkillFramework(event.value[0]))
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
            // subcategory_id: formData.subcategories[0],
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
      // Filter skills with unique _id
      const skills = mySkills.filter((skill, index, self) => index === self.findIndex((s) => s._id === skill._id))

      dispatch(updateSkillRequirement(myProjectDetails._id, { skills }))
      await postProjectDetailsActivitiesProjectRequirement(myProjectDetails._id)
   }

   // ========= RENDER  ========== //
   return (
      <div className="flex flex-col gap-4 mt-8 mb-8">
         <SelectCustom
            required
            label="Category"
            placeholder="Ex: Software Engineer"
            collection={categoryFramework}
            onChange={(event: SelectEvent) => handleChangeCategory(event)}
            value={formData?.categories}
         />
         <SelectCustom
            disabled={formData?.categories?.length === 0}
            required
            label="Sub Category"
            placeholder="Ex: Software Engineer"
            collection={subCategoryFramework}
            onChange={(event: SelectEvent) => handleChangeSubCategory(event)}
            value={formData.subcategories}
         />
         <SelectCustom
            multiple
            disabled={formData?.subcategories?.length === 0}
            required
            label="Experience Level"
            placeholder="Ex: Entry Level"
            collection={skillFramework}
            onChange={(event: SelectEvent) => handleChangeSkill(event)}
            value={formData.skills}
         />
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
                  <Tag className="relative bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full flex-wrap text-[1rem] cursor-pointer">
                     <div
                        className="absolute top-[-6px] right-[-6px] text-blue-500 bg-white rounded-full px-[4px] hidden group-hover:block "
                        onClick={() => handleRemoveSkill(skill)}
                     >
                        ✕
                     </div>
                     {skill.name}
                  </Tag>
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
