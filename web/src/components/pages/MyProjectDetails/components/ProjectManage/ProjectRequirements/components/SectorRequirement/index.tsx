import React, { useEffect, useState } from 'react'
import { Button, createListCollection } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import SelectCustom from 'components/UI/SelectCustom'
import { updateSectorRequirement } from '~/api/project'
import { getExperienceLevelFramwork, getIndustryFramework } from '~/api/user'
import { postProjectDetailsActivitiesProjectRequirement } from '~/api/activity'
import { RootState } from 'store/types'
import { AppDispatch } from '~/store'

interface FormData {
   industries: string[]
   experienceLevels: string[]
}

interface SelectEvent {
   value: string[]
   items?: any[]
}

const SectorRequirement: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>()
   // ========== STATE FROM REDUX STORE  ========== //
   const { myProjectDetails, isLoadingUpdateSectorRequirement } = useSelector((state: RootState) => state.project)

   // ========== LOCAL STATE FOR FRAMEWORKS ========== //
   const [industryFramework, setIndustryFramework] = useState<any>(null)
   const [experienceLevelFramework, setExperienceLevelFramework] = useState<any>(null)

   // ========== STATE  ========== //
   const [formData, setFormData] = useState<FormData>({
      industries: [],
      experienceLevels: [],
   })

   // ========== EFFECTS  ========== //
   useEffect(() => {
      if (myProjectDetails?.requirements?.industry_ids?.length > 0) {
         setFormData((prev) => ({
            ...prev,
            industries: myProjectDetails?.requirements?.industry_ids,
         }))
      }
      if (myProjectDetails?.requirements?.experience_level_ids?.length > 0) {
         setFormData((prev) => ({
            ...prev,
            experienceLevels: myProjectDetails?.requirements?.experience_level_ids,
         }))
      }
   }, [myProjectDetails])

   // ========== FETCH FRAMEWORKS ========== //
   const fetchIndustryFramework = async () => {
      try {
         const response = await getIndustryFramework()
         if (response && response.data) {
            setIndustryFramework(
               createListCollection({
                  items: response.data.map((industry: any) => ({
                     label: industry.name,
                     value: industry._id,
                  })),
               })
            )
         }
      } catch (error) {
         console.error('Error fetching industry framework:', error)
         setIndustryFramework(createListCollection({ items: [] }))
      }
   }

   const fetchExperienceLevelFramework = async () => {
      try {
         const response = await getExperienceLevelFramwork()
         if (response && response.data) {
            setExperienceLevelFramework(
               createListCollection({
                  items: response.data.map((level: any) => ({
                     label: level.name,
                     value: level._id,
                  })),
               })
            )
         }
      } catch (error) {
         console.error('Error fetching experience level framework:', error)
         setExperienceLevelFramework(createListCollection({ items: [] }))
      }
   }

   useEffect(() => {
      fetchIndustryFramework()
      fetchExperienceLevelFramework()
   }, [])

   // ========== HANDLE CHANGE  ========== //
   const handleChange = (event: SelectEvent, nameSelect: string): void => {
      if (nameSelect) {
         setFormData({ ...formData, [nameSelect]: event.value })
      }
   }

   const handleSaveProjectRequirement = async (): Promise<void> => {
      try {
         await updateSectorRequirement(myProjectDetails._id, formData)
         await postProjectDetailsActivitiesProjectRequirement(myProjectDetails._id)
      } catch (error) {
         console.error('Error updating sector requirement:', error)
      }
   }

   // ========= RENDER  ========== //
   return (
      <div className="flex flex-col gap-4 mt-8 mb-4">
         <div className="relative">
            {industryFramework && (
               <SelectCustom
                  multiple
                  label="Industries"
                  collection={industryFramework}
                  onChange={(e: SelectEvent) => handleChange(e, 'industries')}
                  value={formData.industries}
               />
            )}
         </div>
         <div className="relative">
            {experienceLevelFramework && (
               <SelectCustom
                  multiple
                  label="Experience Level"
                  collection={experienceLevelFramework}
                  onChange={(e: SelectEvent) => handleChange(e, 'experienceLevels')}
                  value={formData.experienceLevels}
               />
            )}
         </div>
         <div className="flex justify-end">
            <Button
               height={50}
               className=" text-sm px-[28px] bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
               borderRadius={4}
               loading={isLoadingUpdateSectorRequirement}
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

export default SectorRequirement
