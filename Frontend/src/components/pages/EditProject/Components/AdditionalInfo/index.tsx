import React from 'react'
import { Button } from '@chakra-ui/react'
import ActionBar from '../../../EditProfile/components/ActionBar'
import ProjectEditMenu from '../ProjectEditMenu'
import ProjectCard from '../ProjectCard'
import { IconlyEdit, IconlyDocument } from 'components/UI/Iconly'
import TextAreaCustom from 'components/UI/TextAreaCustom'
import { useEditAdditionalInfo } from './useEditAdditionalInfo'

const EditAdditionalInfo: React.FC = () => {
   // Use custom hook for all logic
   const {
      fields,
      isEditing,
      isSaving,
      projectFormData,
      isLoadingUpdateMyProject,
      handleChange,
      toggleEdit,
      handleSaveChanges,
   } = useEditAdditionalInfo()

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
               <div className="pb-[20px] mb-8 border-b-[1px] border-gray-200">
                  <div className="flex items-center justify-between">
                     <div>
                        <h4 className="text-xl font-semibold">Additional Information</h4>
                        <p className="mt-1 text-sm text-gray-600">
                           <strong className="font-medium">Note: max 500 characters for each field</strong>
                        </p>
                     </div>
                  </div>
               </div>

               {/* Structured form fields */}
               <div className="mb-6 overflow-hidden border rounded-md">
                  <table className="w-full">
                     <tbody>
                        {fields.map((field, index) => (
                           <tr key={field.id}>
                              <td
                                 className={`p-4 ${
                                    index < fields.length - 1 ? 'border-b border-gray-200' : ''
                                 } ${field.backgroundColor}`}
                              >
                                 <div className="flex items-center justify-between mb-2">
                                    <label htmlFor={field.id} className="font-medium text-gray-700">
                                       {field.name}
                                    </label>
                                    {!isEditing && index === 0 && (
                                       <Button
                                          onClick={toggleEdit}
                                          className="bg-[#2f65b9] text-white px-3 py-1 rounded-md"
                                          size="sm"
                                       >
                                          <IconlyEdit size={18} color="#ffffff" backgroundColor="#2f65b9" />
                                       </Button>
                                    )}
                                 </div>
                                 <TextAreaCustom
                                    id={field.id}
                                    resize="none"
                                    placeholder={field.placeholder}
                                    name={field.id}
                                    onChange={handleChange}
                                    value={projectFormData[field.id] || ''}
                                    rows={4}
                                    disabled={!isEditing}
                                    nomax={true}
                                 />
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>

               {isEditing && (
                  <div className="flex justify-end mt-4 space-x-3">
                     <Button onClick={toggleEdit} className="px-6 py-2 text-white bg-gray-400 rounded-md">
                        Cancel
                     </Button>
                     <Button
                        onClick={handleSaveChanges}
                        isLoading={isSaving || isLoadingUpdateMyProject}
                        className="bg-[#2f65b9] text-white px-6 py-2 rounded-md"
                        loadingText="Saving..."
                        spinnerPlacement="start"
                     >
                        <IconlyDocument size={18} color="#ffffff" className="mr-2" /> Save Changes
                     </Button>
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}

export default EditAdditionalInfo
