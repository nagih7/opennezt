import React from 'react'
import { Button } from '@chakra-ui/react'
import SelectCustom from 'components/UI/SelectCustom'
import { useEditStage } from '../Stage/useEditStage'

const SectorForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
   const { formData, isLoadingUpdateMyProject, industryFramework, stageFramework, handleChange, handleSaveChanges } =
      useEditStage()

   const handleSave = async () => {
      await handleSaveChanges()
      onClose()
   }

   return (
      <div className="w-[500px] max-w-[95vw] max-h-[80vh] overflow-y-auto p-6">
         <div className="pb-4 mb-4 border-b border-gray-200">
            <h4 className="text-lg font-semibold">Sector Information</h4>
         </div>
         <div className="flex flex-col gap-6">
            <SelectCustom
               multiple
               onChange={(e: any) => handleChange(e, 'industries')}
               label="Industries"
               collection={industryFramework}
               placeholder="Select industries"
               value={formData.industries}
            />
            <SelectCustom
               onChange={(e: any) => handleChange(e, 'stage')}
               label="Stage"
               collection={stageFramework}
               placeholder="Select stage"
               value={formData.stage}
            />
            <div className="flex gap-2 pt-4 border-t border-gray-200">
               <Button
                  onClick={handleSave}
                  loading={isLoadingUpdateMyProject}
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

export default SectorForm
