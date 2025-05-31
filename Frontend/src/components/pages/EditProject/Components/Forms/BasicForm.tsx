import React from 'react'
import { Button } from '@chakra-ui/react'
import InputCustom from 'components/UI/InputCustom'
import TextAreaCustom from 'components/UI/TextAreaCustom'
import { useEditDetail } from '../Detail/useEditDetail'

const BasicForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
   const { formData, isLoadingUpdateMyProject, handleChange, handleSaveChanges } = useEditDetail()

   const handleSave = async () => {
      await handleSaveChanges()
      onClose()
   }

   return (
      <div className="w-[600px] max-w-[95vw] max-h-[80vh] overflow-y-auto p-6">
         <div className="pb-4 mb-4 border-b border-gray-200">
            <h4 className="text-lg font-semibold">Basic Information</h4>
         </div>
         <div className="flex flex-col gap-6">
            <InputCustom
               change
               onChange={handleChange}
               value={formData.name}
               name="name"
               required
               label="Project Name"
               placeholder="Enter project name"
            />
            <TextAreaCustom
               onChange={handleChange}
               value={formData.description}
               name="description"
               type="areas"
               label="Description"
               placeholder="Enter project description"
            />

            <div className="flex gap-2 pt-4">
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

export default BasicForm
