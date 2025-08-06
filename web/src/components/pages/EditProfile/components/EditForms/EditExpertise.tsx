import React from 'react'
import { Badge, Button } from '@chakra-ui/react'
import SelectCustom from 'components/UI/SelectCustom'
import { SelectEvent } from '../ProfessionalBackground/types'
import { useSkills } from '../Skills/hooks/useSkills'

const EditExpertise: React.FC<{ onClose: () => void }> = ({ onClose }) => {
   const {
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
      handleSaveChanges
   } = useSkills()

   const handleSave = () => {
      handleSaveChanges()
      onClose()
   }

   return (
      <div className="w-[500px] max-w-[95vw] max-h-[80vh] overflow-y-auto p-6">
         <div className="pb-4 mb-4 border-b border-gray-200">
            <h4 className="text-lg font-semibold">Skills</h4>
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
                           height={35}
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
            <div className="flex gap-2 pt-4 border-t border-gray-200">
               <Button
                  onClick={handleSave}
                  loading={isLoadingUpdateSkills}
                  className="bg-[#2f65b9] text-white flex-1"
                  size="sm"
                  disabled={mySkills.length === 0}
               >
                  Save Changes
               </Button>
               <Button onClick={onClose} variant="outline" className="flex-1" size="sm">
                  Cancel
               </Button>
            </div>
      </div>
   )
}

export default EditExpertise
