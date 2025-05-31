import React from 'react'
import { Button } from '@chakra-ui/react'
import SelectCustom from 'components/UI/SelectCustom'
import { useProfessionalBackground } from '../ProfessionalBackground/hooks/useProfessionalBackground'
import { SelectEvent } from '../ProfessionalBackground/types'

const EditBackground: React.FC<{ onClose: () => void }> = ({ onClose }) => {
   const {      
      formData,
      industryFramework,
      experienceLevelFramework,
      isLoadingUpdateProfile,
      handleChange,
      handleSaveChanges } =  useProfessionalBackground()

   const handleSave = () => {
      handleSaveChanges()
      onClose()
   }

   return (
      <div className="w-[500px] max-w-[95vw] max-h-[80vh] overflow-y-auto p-6">
         <div className="pb-4 mb-4 border-b border-gray-200">
            <h4 className="text-lg font-semibold">Professional Background</h4>
         </div>
         <div className="flex flex-col gap-6">
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
            <div className="flex gap-2 pt-4 border-t border-gray-200">
               <Button
                  onClick={handleSave}
                  loading={isLoadingUpdateProfile}
                  className="bg-[#2f65b9] text-white flex-1"
                  size="sm"
               >
                  Save Changes
               </Button>
               <Button onClick={onClose} variant="outline" className="flex-1" size="sm">
                  Cancel
               </Button>
            </div>
         </div>
      </div>
   )
}

export default EditBackground
