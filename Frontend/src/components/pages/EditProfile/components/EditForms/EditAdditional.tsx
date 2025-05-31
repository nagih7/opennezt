import React from 'react'
import { Button } from '@chakra-ui/react'
import useAdditionalInfo from '../AdditionalInfo/hooks/useAdditionalInfo'
import TextAreaCustom from '~/components/UI/TextAreaCustom'

const EditAdditional: React.FC<{ onClose: () => void }> = ({ onClose }) => {
   const {
      fields,
        formData,
        isSaving,
        handleChange,
        handleSaveAll
   } = useAdditionalInfo()

   const handleSave = () => {
      handleSaveAll()
      onClose()
   }

   return (
      <div className="w-[500px] max-w-[95vw] max-h-[80vh] overflow-y-auto p-6">
         <div className="pb-4 mb-4 border-b border-gray-200">
                     <div>
                        <h4 className="text-xl font-semibold">Additional Information</h4>
                        <p className="mt-1 text-sm text-gray-600">
                           Add more details about your professional background and career aspirations <br />
                           <strong className="font-bold">Note: max 500 characters for each field</strong>
                        </p>
                     </div>
         </div>
         <div className="overflow-hidden border rounded-md">
                  <table className="w-full">
                     <tbody>
                        {/* Render fields dynamically from fields array */}
                        {fields.map((field, index) => (
                           <tr key={field.id}>
                              <td
                                 className={`p-4 ${index < fields.length - 1 ? 'border-b border-gray-200' : ''} ${
                                    field.backgroundColor
                                 }`}
                              >
                                 <div className="flex items-center justify-between mb-2">
                                    <label htmlFor={field.id} className="font-medium text-gray-700">
                                       {field.name}
                                    </label>
                                 </div>
                                 <TextAreaCustom
                                    id={field.id}
                                    resize="none"
                                    placeholder={field.placeholder}
                                    name={field.id}
                                    onChange={handleChange}
                                    value={formData[field.id] || ''}
                                    rows={4}
                                    nomax={true}
                                 />
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            <div className="flex gap-2 pt-4 border-t border-gray-200">
               <Button
                  onClick={handleSave}
                  loading={isSaving}
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
   )
}

export default EditAdditional
