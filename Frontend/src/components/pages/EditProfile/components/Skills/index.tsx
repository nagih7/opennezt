import { Button } from '@chakra-ui/react'
import { getProfile, updateSkillProfile } from 'api/profile'
import { getCategoryFramework, getSkillFramework, getSubCategoryFramework } from 'api/user'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfileCard from '../ProfileCard'
import ProfileEditMenu from '../ProfileEditMenu'
import ActionBar from '../ActionBar'
import SelectCustom from 'components/UI/SelectCustom'
import { toaster } from 'components/UI/toaster'
import { Badge } from '~/components/UI/badge'
import { AppDispatch } from '~/store/store.types'
import { RootState } from '~/store'

interface Skill {
   _id: string
   name: string
   category_id: string
}

interface Profile {
   skills: Skill[]
   [key: string]: any
}

interface FormData {
   categories: string[]
   subcategories: string[]
   skills: string[]
   skillFormat: Skill[]
}

interface SelectEvent {
   value: string[]
   items?: { value: string; label: string }[]
}

const Skills = (): React.ReactElement => {
   // Sử dụng AppDispatch thay vì mặc định
   const dispatch = useDispatch<AppDispatch>()

   // ========== STATE FROM REDUX STORE ========== //
   const { categoryFramework, subCategoryFramework, skillFramework } = useSelector((state: RootState) => state.user)
   const { profile, isLoadingUpdateSkills } = useSelector((state: RootState) => state.profile)
   const { skills } = profile || { skills: [] }

   // ========== STATE MANAGEMENT ========== //
   const [formData, setFormData] = useState<FormData>({
      categories: [],
      subcategories: [],
      skills: [],
      skillFormat: [],
   })
   const [mySkills, setMySkills] = useState<Skill[]>([])

   // ========== USE EFFECT ========== //
   useEffect(() => {
      if (!profile) dispatch(getProfile())
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dispatch])

   useEffect(() => {
      if (!categoryFramework?.items?.length) {
         dispatch(getCategoryFramework())
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dispatch])

   useEffect(() => {
      if (skills) {
         setMySkills(skills)
      }
   }, [skills])

   // ========== HANDLE CHANGE FUNCTION ========== //
   const handleChangeCategory = (event: SelectEvent): void => {
      setFormData({
         ...formData,
         categories: event.value,
         subcategories: [],
         skills: [],
         skillFormat: [],
      })
      dispatch(getSubCategoryFramework(event.value[0]))
   }

   const handleChangeSubCategory = (event: SelectEvent): void => {
      setFormData({
         ...formData,
         subcategories: event.value,
         skills: [],
         skillFormat: [],
      })
      dispatch(getSkillFramework(event.value[0]))
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

   const handleSaveChanges = (): void => {
      dispatch(
         updateSkillProfile({
            skills: mySkills,
         })
      )
   }

   // ========== COMPONENT RENDER ========== //
   return (
      <div className="flex gap-8 flex-col md:flex-row w-full py-8 px-[16px]">
         <ProfileEditMenu />
         <div className="w-full md:w-8/12">
            <div className="bg-[#ffffff] p-8 hidden md:block rounded-md">
               {/* =========== Profile Card ========== */}
               <ProfileCard />
               {/* =========== Action Bar  ========== */}
               <ActionBar />
            </div>
            <div className="bg-[#ffffff] p-8 rounded-md md:mt-8">
               <div className="pb-[20px] mb-8 border-b-[1px] border-gray-200">
                  <div>
                     <h4 className="">Skills</h4>
                  </div>
               </div>
               <div className="px-[16px] flex flex-col gap-8">
                  <SelectCustom
                     required
                     label="Category"
                     placeholder="Ex: Software Engineer"
                     collection={categoryFramework}
                     onChange={(event: SelectEvent) => handleChangeCategory(event)}
                     canChange
                     value={formData?.categories}
                  />
                  <SelectCustom
                     disabled={formData?.categories?.length === 0}
                     required
                     label="Sub Category"
                     placeholder="Ex: Software Engineer"
                     collection={subCategoryFramework}
                     onChange={(event: SelectEvent) => handleChangeSubCategory(event)}
                     canChange
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
                     canChange
                     value={formData.skills}
                  />
                  <div className="flex justify-end">
                     <div className="">
                        <Button
                           disabled={formData?.skills?.length === 0}
                           onClick={handleAddSkill}
                           height={50}
                           className="mt-[14px] text-sm px-[18px] py-2 sm:text-base sm:px-[28px] sm:py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                           borderRadius={4}
                           loading={false}
                           loadingText="Loading..."
                           spinnerPlacement="start"
                        >
                           ADD
                        </Button>
                     </div>
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
               <div className="px-[16px] flex flex-col gap-8">
                  <div className="flex justify-end">
                     <div className="">
                        <Button
                           loading={isLoadingUpdateSkills}
                           disabled={mySkills?.length === 0}
                           onClick={handleSaveChanges}
                           height={50}
                           className="mt-[14px] text-sm px-[18px] py-2 sm:text-base sm:px-[28px] sm:py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                           borderRadius={4}
                           loadingText="Loading..."
                           spinnerPlacement="start"
                        >
                           SAVE CHANGES
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Skills
