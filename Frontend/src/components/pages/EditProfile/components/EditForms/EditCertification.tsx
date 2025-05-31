import React from 'react'
import { Button, DataList, Dialog, Portal, Stack, Switch } from '@chakra-ui/react'
import InputCustom from '~/components/UI/InputCustom'
import { IconlyDelete, IconlyEdit } from '~/components/UI/Iconly'
import moment from 'moment'
import useCertifications from '../Certifications/hooks/useCertifications'
import SelectCustom from '~/components/UI/SelectCustom'

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
      <div className="w-[500px] max-w-[95vw] max-h-[80vh] overflow-y-auto p-6">
         <div className="pb-4 mb-4 border-b border-gray-200 flex justify-between">
            <h4 className="text-lg font-semibold">Certifications</h4>
                      <Button
                              onClick={handleAddCertification}
                              height={50}
                              className="mt-[14px] px-[18px] text-sm sm:px-[28px] py-2 sm:py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                              borderRadius={4}
                              loading={false}
                              loadingText="Loading..."
                              spinnerPlacement="start">Add Certification</Button>
         </div>
        <div>
                  <div className="px-[16px]">
                     {certifications?.map((certification, index) => (
                        <DataList.Root orientation="horizontal" key={index}>
                           <div key={index}>
                              <div className="shadow rounded-[0.6rem]">
                                 <div className="relative p-4 mt-[2rem]">
                                    <Stack className="flex gap-2 md:float-right 2xl:float-right" direction={'row'}>
                                       <span
                                          className="cursor-pointer"
                                          onClick={() => handleUpdateCertification(certification)}
                                       >
                                          <IconlyEdit size={24} color={'#000'} backgroundColor={undefined} />
                                       </span>
                                       <span
                                          className="cursor-pointer"
                                          onClick={() => handleOpenModalDelete(certification)}
                                       >
                                          <IconlyDelete size={24} color={'#000'} />
                                       </span>
                                    </Stack>

                                    {certification.name && (
                                       <h4 className="flex font-bold mb-[0.75rem]">{certification.name}</h4>
                                    )}
                                    {certification.organization && (
                                       <p className="relative text-[#9B9B9B] top-[-1rem] left-[-0.1rem] text-[1rem]">
                                          {certification.organization}
                                       </p>
                                    )}
                                    {certification.issue_date && (
                                       <div className="flex items-center gap-2 mb-2">
                                          <DataList.ItemLabel>Issue Date</DataList.ItemLabel>
                                          <DataList.ItemValue className="mb-0">
                                             {moment(certification.issue_date).format('MMM YYYY')}
                                          </DataList.ItemValue>
                                       </div>
                                    )}
                                    {certification.expiration_date && (
                                       <div className="flex items-center gap-2 mb-2">
                                          <DataList.ItemLabel>Expiration Date</DataList.ItemLabel>
                                          <DataList.ItemValue className="mb-0">
                                             {certification.is_lifetime
                                                ? 'No Expiration Date'
                                                : moment(certification.expiration_date).format('MMM YYYY')}
                                          </DataList.ItemValue>
                                       </div>
                                    )}
                                    {certification.credential_id && (
                                       <div className="flex items-center gap-2 mb-2">
                                          <DataList.ItemLabel>Credential ID</DataList.ItemLabel>
                                          <DataList.ItemValue className="mb-0">
                                             {certification.credential_id}
                                          </DataList.ItemValue>
                                       </div>
                                    )}
                                    {certification.credential_url && (
                                       <div className="flex items-center gap-2 mb-2">
                                          <DataList.ItemLabel>Credential URL</DataList.ItemLabel>
                                          <DataList.ItemValue className="mb-0">
                                             <a
                                                href={certification.credential_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-blue-600 hover:underline"
                                             >
                                                {certification.credential_url}
                                             </a>
                                          </DataList.ItemValue>
                                       </div>
                                    )}
                                 </div>
                              </div>
                           </div>
                        </DataList.Root>
                     ))}
                  </div>
               </div>
                           <div className="flex gap-2 pt-4 border-t border-gray-200 justify-end">
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
