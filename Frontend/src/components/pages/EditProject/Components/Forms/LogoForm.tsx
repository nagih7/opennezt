import React, { useRef } from 'react'
import { Button } from '@chakra-ui/react'
import { useEditLogo } from '../Logo/useEditLogo'

const LogoForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
   const { logoURL, logoFile, isLoadingUpdateMyProject, handleFileChange, handleSaveChanges } = useEditLogo()
   const fileInputRef = useRef<HTMLInputElement>(null)

   const handleSave = async () => {
      await handleSaveChanges()
      onClose()
   }

   const triggerFileInput = () => {
      fileInputRef.current?.click()
   }

   return (
      <div className="w-[600px] max-w-[95vw] max-h-[90vh] overflow-y-auto">
         <div className="pb-[20px] mb-8 border-b-[1px] border-gray-200 px-8 pt-8">
            <div>
               <h4 className="text-lg font-semibold">Logo</h4>
            </div>
         </div>
         <div className="px-8 pb-8">
            <div className="bg-[#f8f9fa] rounded-t-md">
               <ul className="flex text-sm mb-0 px-[24px] pt-[24px] pb-[16px]">
                  <li className="pr-[24px] text-[#2f65b9] font-medium">Upload</li>
                  <li className="pr-[24px] text-[#6f7f92] font-medium">Delete</li>
               </ul>
            </div>
            <div className="bg-[#f8f9fa] rounded-b-md">
               <div className="px-[24px] pb-[24px]">
                  <div className="p-10 border-dashed border-[#6f7f9266] border-3">
                     <div className="flex flex-col items-center justify-center gap-12 py-10">
                        {!logoURL ? (
                           <>
                              <p className="mb-[5px] font-medium">Drop your file here</p>
                              <p className="mb-[5px] text-[#6f7f92] font-medium">or</p>
                           </>
                        ) : (
                           <div className="flex flex-col items-center w-full p-0 space-y-4">
                              {logoURL && (
                                 <div className="relative flex justify-center w-full gap-4">
                                    <div className="overflow-hidden w-[400px] h-[400px] relative flex justify-center items-center">
                                       <img
                                          src={logoURL}
                                          alt="Preview"
                                          className="bg-center bg-no-repeat bg-cover w-full h-full object-cover"
                                       />
                                    </div>
                                 </div>
                              )}
                           </div>
                        )}
                        <div className="text-center">
                           <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleFileChange}
                           />
                           <button
                              onClick={triggerFileInput}
                              className="px-[24px] py-[11px] cursor-pointer text-sm bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                           >
                              SELECT YOUR FILE
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="flex justify-end items-center mt-4">
               <div className="flex gap-2">
                  <Button onClick={onClose} variant="outline" size="sm">
                     Cancel
                  </Button>{' '}
                  <Button
                     onClick={handleSave}
                     loading={isLoadingUpdateMyProject}
                     className="bg-[#2f65b9] text-white px-[28px] py-3"
                     borderRadius={4}
                     loadingText="Loading..."
                     spinnerPlacement="start"
                     disabled={!logoFile}
                  >
                     SAVE CHANGES
                  </Button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default LogoForm
