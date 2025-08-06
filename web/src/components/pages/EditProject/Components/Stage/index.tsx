import React from 'react'
import { Button } from '@chakra-ui/react'
import ActionBar from '../../../EditProfile/components/ActionBar'
import ProjectEditMenu from '../ProjectEditMenu'
import ProjectCard from '../ProjectCard'
import SelectCustom from 'components/UI/SelectCustom'
import { useEditStage } from './useEditStage'

const EditStage: React.FC = () => {
   // Use custom hook for all logic
   const { formData, isLoadingUpdateMyProject, industryFramework, stageFramework, handleChange, handleSaveChanges } =
      useEditStage()

   // ========== COMPONENT RENDER ========== //
   return (
      <div className="flex gap-8 w-full py-8 px-[16px]">
         <ProjectEditMenu />
         <div className="w-8/12">
            <div className="bg-[#ffffff] p-8 rounded-md">
               {/* =========== Profile Card ========== */}
               <ProjectCard />
               {/* =========== Action Bar  ========== */}
               <ActionBar />
            </div>
            <div className="bg-[#ffffff] p-8 rounded-md mt-8">
               <div className="pb-[20px] mb-8 border-b-[1px] border-gray-200 flex justify-between">
                  <div>
                     <h4 className=""> Sector</h4>
                  </div>
               </div>
               <div className="px-[16px] flex flex-col gap-8">
                  <SelectCustom
                     multiple
                     required
                     label="Industries"
                     collection={industryFramework}
                     placeholder="Ex: Business"
                     onChange={(e: any) => handleChange(e, 'industries')}
                     value={formData.industries}
                     name="industries"
                  />
                  <SelectCustom
                     required
                     label="Stage"
                     collection={stageFramework}
                     placeholder="Ex: Idea Stage"
                     onChange={(e: any) => handleChange(e, 'stage')}
                     value={formData.stage}
                     name="stage"
                  />
                  <div className="px-[16px] flex justify-end">
                     <div className="">
                        <Button
                           height={50}
                           className="mt-[14px] px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                           borderRadius={4}
                           loading={isLoadingUpdateMyProject}
                           loadingText="Loading..."
                           spinnerPlacement="start"
                           onClick={handleSaveChanges}
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

export default EditStage
