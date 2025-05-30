import React from 'react'
import { Button } from '@chakra-ui/react'
import TextAreaCustom from 'components/UI/TextAreaCustom'
import { useEditAdditionalInfo } from '../AdditionalInfo/useEditAdditionalInfo'

const MoreForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
   const { fields, projectFormData, isLoadingUpdateMyProject, isEditing, handleChange, toggleEdit, handleSaveChanges } =
      useEditAdditionalInfo() // Enable editing when component mounts
   React.useEffect(() => {
      if (!isEditing) {
         toggleEdit()
      }
   }, [isEditing, toggleEdit])

   const handleSave = async () => {
      await handleSaveChanges()
      onClose()
   }

   return (
      <div className="w-[600px] max-w-[95vw] max-h-[80vh] overflow-y-auto p-6">
         <div className="pb-4 mb-4 border-b border-gray-200">
            <h4 className="text-lg font-semibold">Additional Information</h4>
         </div>
         <div className="flex flex-col gap-4">
            {fields.map((field) => (
               <TextAreaCustom
                  key={field.id}
                  label={field.name}
                  placeholder={field.placeholder}
                  value={projectFormData[field.id] || ''}
                  onChange={handleChange}
                  name={field.id}
                  rows={3}
               />
            ))}
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

export default MoreForm
