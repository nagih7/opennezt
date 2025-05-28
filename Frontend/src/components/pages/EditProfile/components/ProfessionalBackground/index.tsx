import { Button } from '@chakra-ui/react'
import React from 'react'
import ProfileCard from '../ProfileCard'
import ProfileEditMenu from '../ProfileEditMenu'
import ActionBar from '../ActionBar'
import SelectCustom from 'components/UI/SelectCustom'
import { useProfessionalBackground } from './hooks/useProfessionalBackground'
import { SelectEvent } from './types'

const ProfessionalBackground: React.FC = () => {
   const {
      formData,
      industryFramework,
      experienceLevelFramework,
      isLoadingUpdateProfile,
      handleChange,
      handleSaveChanges,
   } = useProfessionalBackground()

   // ========== COMPONENT RENDER ========== //
   return (
      <div className="flex flex-col md:flex-row gap-8 w-full py-8 px-[16px]">
         <ProfileEditMenu />
         <div className="w-full md:w-8/12">
            <div className="bg-[#ffffff] hidden md:block p-8 rounded-md">
               {/* =========== Profile Card ========== */}
               <ProfileCard />
               {/* =========== Action Bar  ========== */}
               <ActionBar />
            </div>
            <div className="bg-[#ffffff] p-8 rounded-md md:mt-8">
               <div className="pb-[20px] mb-8 border-b-[1px] border-gray-200">
                  <div>
                     <h4 className="">Professional Background</h4>
                  </div>
               </div>
               <div>
                  <div className="px-[16px] flex flex-col gap-8">
                     <SelectCustom
                        multiple
                        required
                        label="Industry"
                        placeholder="Ex: Software Engineer"
                        collection={industryFramework}
                        onChange={(event: SelectEvent) => handleChange(event, 'industries')}
                        canChange
                        value={formData.industries}
                     />
                     <SelectCustom
                        required
                        label="Experience Level"
                        placeholder="Ex: Entry Level"
                        collection={experienceLevelFramework}
                        onChange={(event: SelectEvent) => handleChange(event, 'experience_level')}
                        canChange
                        value={formData.experience_level}
                     />
                     <div className="flex justify-end">
                        <div className="">
                           <Button
                              onClick={handleSaveChanges}
                              height={50}
                              className="mt-[14px] text-sm  px-[20px] sm:px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                              borderRadius={4}
                              loading={isLoadingUpdateProfile}
                              loadingText="Saving..."
                           >
                              SAVE CHANGES
                           </Button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ProfessionalBackground
