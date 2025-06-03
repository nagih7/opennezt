import React from 'react'
import { Badge, Button, DataList, Dialog, Portal, Stack, Switch } from '@chakra-ui/react'
import InputCustom from '~/components/UI/InputCustom'
import { IconlyCalendar, IconlyDelete, IconlyEdit, IconlyEditSquare } from '~/components/UI/Iconly'
import moment from 'moment'
import useCertifications from '../Certifications/hooks/useCertifications'
import SelectCustom from '~/components/UI/SelectCustom'
import { FaPlus } from "react-icons/fa6";
import { LuAward, LuLink } from "react-icons/lu";

const EditCertification: React.FC<{ onClose: () => void }> = ({ onClose }) => {
   const {
      certifications,
      isOpenModalCreateOrUpdateCertification,
      isLoadingCreateOrUpdateCertification,
      organizationFramework,
      action,
      formData,
      isOpenModalDeleteCertification,
      handleChange,
      handleChangeSwitch,
      handleChangeSelect,
      handleAddCertification,
      handleUpdateCertification,
      handleOpenModalDelete,
      handleDeleteCertification,
      handleSaveChanges,
      handleClose,
      setIsOpenModalDeleteCertification
   } = useCertifications()

   return (
      <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[1000px] rounded-lg bg-[#ffffff] max-w-[95vw] max-h-[80vh] overflow-y-auto p-6">
         <div className="pb-4 mb-4 border-b border-gray-200 flex justify-between">
            <div className="flex items-center gap-2">
               <div className="w-14 h-14 flex items-center justify-center bg-[#2f65b9] rounded-xl">
                  <LuAward className="w-6 h-6 text-[#ffffff]" />
               </div>
               <div>
                  <h4 className="text-lg font-semibold">Certifications</h4>
                  <p className="text-sm text-gray-500">Manage your certifications and credentials</p>
               </div>
            </div>
            <Button
               onClick={handleAddCertification}
               height={50}
               className="mt-[14px] px-[18px] text-sm sm:px-[28px] py-2 sm:py-3 bg-[#2f65b9] !rounded-3xl text-[#ffffff] font-semibold"
               borderRadius={4}
               loading={false}
               loadingText="Loading..."
               spinnerPlacement="start">
               <FaPlus className="mr-2" />
               Add Certification</Button>
         </div>
         <div>
            <div className="px-[16px]">
               {certifications?.map((certification, index) => (
                  <DataList.Root orientation="horizontal" key={index}>
                     <div key={index}>
                        <div className="group border mt-6 rounded-[0.6rem]">
                           <div className="relative p-4">
                              <Stack className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2 md:float-right 2xl:float-right" direction={'row'}>
                                 <span
                                    className="cursor-pointer"
                                    onClick={() => handleUpdateCertification(certification)}
                                 >
                                    <IconlyEditSquare size={24} color={'blue'} />
                                 </span>
                                 <span
                                    className="cursor-pointer"
                                    onClick={() => handleOpenModalDelete(certification)}
                                 >
                                    <IconlyDelete size={24} color={'red'} />
                                 </span>
                              </Stack>

                              <div className='flex flex-col gap-2'>
                                 {certification.name && (
                                    <h4 className="font-bold text-lg">{certification.name}</h4>
                                 )}
                                 {certification.organization && (
                                    <p className="mb-2">
                                       {certification.organization}
                                    </p>
                                 )}
                              </div>
                              <div className='flex items-center gap-10 mb-2'>
                                 {certification.issue_date && (
                                    <div className="flex items-center">
                                       <DataList.ItemLabel className='flex items-center gap-1 font-semibold'>
                                          <IconlyCalendar size={16} color={'black'} />
                                          Issue Date:</DataList.ItemLabel>
                                       <DataList.ItemValue className="-ml-3">
                                          {moment(certification.issue_date).format('MMM YYYY')}
                                       </DataList.ItemValue>
                                    </div>
                                 )}
                                 {certification.expiration_date && (
                                    <div className="flex items-center">
                                       <DataList.ItemLabel className='flex items-center gap-1 font-semibold'>
                                          <IconlyCalendar size={16} color={'black'} />
                                          Expiration Date:</DataList.ItemLabel>
                                       <DataList.ItemValue className="ml-3">
                                          {certification.is_lifetime
                                             ? 'No Expiration Date'
                                             : moment(certification.expiration_date).format('MMM YYYY')}
                                       </DataList.ItemValue>
                                    </div>
                                 )}                              </div>
                              {(certification.credential_id || certification.credential_url) && (
                                 <div className='border-t border-gray-200 pt-2'>
                                    {certification.credential_id && (
                                       <div className="flex items-center gap-2 mb-2">
                                          <DataList.ItemLabel className='flex items-center gap-1 text-black font-medium'>
                                             <LuAward className="w-4 h-4 text-black" />
                                             Credential ID:
                                          </DataList.ItemLabel>
                                          <DataList.ItemValue className="-ml-2">
                                             <Badge colorPalette="green" className="bg-gray-200 text-gray-600 font-medium"> {certification.credential_id}</Badge>
                                          </DataList.ItemValue>
                                       </div>
                                    )}
                                    {certification.credential_url && (
                                       <div className="flex items-center gap-2 mb-2">
                                          <DataList.ItemLabel className='flex items-center gap-1 text-black font-medium'>
                                             <LuLink className="w-4 h-4 text-black" />
                                             Credential URL:
                                          </DataList.ItemLabel>
                                          <DataList.ItemValue className="mb-0">
                                             <a
                                                href={certification.credential_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-blue-700 hover:underline truncate w-72"
                                             >
                                                {certification.credential_url}
                                             </a>
                                          </DataList.ItemValue>
                                       </div>
                                    )}
                                 </div>
                              )}
                           </div>
                        </div>
                     </div>
                  </DataList.Root>
               ))}
            </div>
         </div>
         <div className="flex gap-2 pt-4 border-gray-200 justify-end">
            <Button onClick={onClose} variant="outline" className="flex-1" size="sm">
               Cancel
            </Button>
         </div>
         <Dialog.Root
            size={'lg'}
            open={isOpenModalCreateOrUpdateCertification}
            placement={'center'}
            motionPreset="slide-in-bottom"
         >
            <Portal>
               <Dialog.Backdrop />
               <Dialog.Positioner>
                  <Dialog.Content className="bg-white">
                     <Dialog.Header>
                        <Dialog.Title>
                           {action === 'create' ? 'Add certification' : 'Update certification'}
                        </Dialog.Title>
                     </Dialog.Header>
                     <Dialog.Body gap={6}>
                        <Stack gap="6">
                           <Stack direction="row">
                              <InputCustom
                                 label="Name"
                                 required
                                 placeholder="Ex: AWS Certified Solutions Architect"
                                 height="40px"
                                 name="name"
                                 onChange={handleChange}
                                 value={formData.name}
                              />
                           </Stack>
                           <Stack direction="row">
                              <SelectCustom
                                 required
                                 label="Organization"
                                 placeholder="Ex: Amazon Web Services"
                                 collection={organizationFramework}
                                 onChange={handleChangeSelect}
                                 canChange
                                 value={formData.organization_id}
                              />
                           </Stack>
                           <Stack direction="row">
                              <InputCustom
                                 type="date"
                                 label="Issue Date"
                                 required
                                 height="40px"
                                 name="issue_date"
                                 onChange={handleChange}
                                 value={formData.issue_date}
                              />
                              <InputCustom
                                 type="date"
                                 label="Expiration Date"
                                 height="40px"
                                 name="expiration_date"
                                 onChange={handleChange}
                                 value={formData.expiration_date}
                                 disabled={formData.is_lifetime}
                              />
                           </Stack>
                           <Stack direction="row">
                              <div className="flex items-center justify-between w-full">
                                 <span>This credential does not expire</span>
                                 <Switch.Root
                                    size="md"
                                    isChecked={formData.is_lifetime}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                       handleChangeSwitch(e.target.checked)
                                    }
                                 />
                              </div>
                           </Stack>
                           <Stack direction="row">
                              <InputCustom
                                 label="Credential ID"
                                 placeholder="Ex: ABC123"
                                 height="40px"
                                 name="credential_id"
                                 onChange={handleChange}
                                 value={formData.credential_id}
                              />
                           </Stack>
                           <Stack direction="row">
                              <InputCustom
                                 label="Credential URL"
                                 placeholder="Ex: https://example.com/cert"
                                 height="40px"
                                 name="credential_url"
                                 onChange={handleChange}
                                 value={formData.credential_url}
                              />
                           </Stack>
                        </Stack>
                     </Dialog.Body>
                     <Dialog.Footer>
                        <Button
                           className="border-[#F4F5F6] bg-[#2F65B9] text-white"
                           onClick={handleSaveChanges}
                           borderRadius={4}
                           loading={isLoadingCreateOrUpdateCertification}
                           loadingText="Loading..."
                           spinnerPlacement="start"
                        >
                           SAVE CHANGES
                        </Button>
                        <Dialog.ActionTrigger asChild>
                           <Button
                              className="border-[#F4F5F6] text-black hover:bg-[#F4F5F6]"
                              variant="outline"
                              onClick={handleClose}
                           >
                              Cancel
                           </Button>
                        </Dialog.ActionTrigger>
                     </Dialog.Footer>
                  </Dialog.Content>
               </Dialog.Positioner>
            </Portal>
         </Dialog.Root>
         {/* DELETE */}
         <Dialog.Root
            size={'md'}
            open={isOpenModalDeleteCertification}
            placement={'center'}
            motionPreset="slide-in-bottom"
         >
            <Portal>
               <Dialog.Backdrop />
               <Dialog.Positioner>
                  <Dialog.Content className="bg-white">
                     <Dialog.Header>
                        <Dialog.Title>Delete certification</Dialog.Title>
                     </Dialog.Header>
                     <Dialog.Body gap={6}>
                        <Stack gap="6">Do you want to delete this certification?</Stack>
                     </Dialog.Body>
                     <Dialog.Footer>
                        <Button
                           className="border-[#F4F5F6] bg-[#2F65B9] text-white"
                           onClick={handleDeleteCertification}
                           borderRadius={4}
                           loading={isLoadingCreateOrUpdateCertification}
                           loadingText="Loading..."
                           spinnerPlacement="start"
                        >
                           CONFIRM
                        </Button>
                        <Dialog.ActionTrigger asChild>
                           <Button
                              className="border-[#F4F5F6] text-black hover:bg-[#F4F5F6]"
                              variant="outline"
                              onClick={() => setIsOpenModalDeleteCertification(false)}
                           >
                              Cancel
                           </Button>
                        </Dialog.ActionTrigger>
                     </Dialog.Footer>
                  </Dialog.Content>
               </Dialog.Positioner>
            </Portal>
         </Dialog.Root>
      </div>
   )
}

export default EditCertification
