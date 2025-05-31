import React from 'react'
import { Button, DataList, Dialog, Portal, Stack } from '@chakra-ui/react'
import { useEducations } from '../Educations/hooks/useEducations'
import InputCustom from '~/components/UI/InputCustom'
import { IconlyDelete, IconlyEdit } from '~/components/UI/Iconly'
import moment from 'moment'
import { Education } from '../Educations/types'

const EditEducation: React.FC<{ onClose: () => void }> = ({ onClose }) => {
   const {
      educations,
      action,
      formData,
      isOpenModalCreateOrUpdateEducation,
      isLoadingCreateOrUpdateEducation,
      isOpenModalDeleteEducation,
      handleChange,
      handleAddEducation,
      handleUpdateEducation,
      handleOpenModalDelete,
      handleDeleteEducation,
      handleSaveChanges,
      handleClose,
      setIsOpenModalDeleteEducation
   } = useEducations()

   const handleSave = () => {
      handleSaveChanges()
      onClose()
   }

   return (
      <div className="w-[500px] max-w-[95vw] max-h-[80vh] overflow-y-auto p-6">
         <div className="pb-4 mb-4 border-b border-gray-200 flex justify-between">
            <h4 className="text-lg font-semibold">Educations</h4>
                      <Button
                              onClick={handleAddEducation}
                              height={50}
                              className="mt-[14px] px-[18px] text-sm sm:px-[28px] py-2 sm:py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                              borderRadius={4}
                              loading={false}
                              loadingText="Loading..."
                              spinnerPlacement="start">Add Education</Button>
         </div>
         <div>
                  <div className="px-[16px]">
                     {educations?.map((education: Education, index: React.Key | null | undefined) => (
                        <DataList.Root orientation="horizontal" key={index}>
                           <div key={index}>
                              <div className=" shadow rounded-[0.6rem]">
                                 <div className="relative p-4 mt-[2rem]">
                                    <Stack className="flex gap-2 md:float-right 2xl:float-right" direction={'row'}>
                                       <span
                                          className="cursor-pointer"
                                          onClick={() => handleUpdateEducation(education)}
                                       >
                                          <IconlyEdit size={24} color={'#000'} backgroundColor={undefined} />
                                       </span>
                                       <span
                                          className="cursor-pointer"
                                          onClick={() => handleOpenModalDelete(education)}
                                       >
                                          <IconlyDelete size={24} color={'#000'} />
                                       </span>
                                    </Stack>

                                    {education.school && (
                                       <h4 className="flex font-bold mb-[0.75rem]">{education.school}</h4>
                                    )}
                                    {education.start_date && education.end_date && (
                                       <p className="relative text-[#9B9B9B] top-[-1rem] left-[-0.1rem] text-[1rem]">
                                          {`${moment(education.start_date).format('MMM YYYY')} ${
                                             education.end_date
                                                ? `- ${moment(education.end_date).format('MMM YYYY')}`
                                                : ''
                                          }`}
                                       </p>
                                    )}
                                    {education.field_of_study && (
                                       <div className="flex items-center gap-2 mb-2">
                                          <DataList.ItemLabel> Field of study</DataList.ItemLabel>
                                          <DataList.ItemValue className="mb-0">
                                             {education.field_of_study}
                                          </DataList.ItemValue>
                                       </div>
                                    )}
                                    {education.degree && (
                                       <div className="flex items-center gap-2 mb-2">
                                          <DataList.ItemLabel> Degree</DataList.ItemLabel>
                                          <DataList.ItemValue className="mb-0">{education.degree}</DataList.ItemValue>
                                       </div>
                                    )}
                                    {education.grade && (
                                       <div className="flex items-center gap-2 mb-2">
                                          <DataList.ItemLabel> Grade</DataList.ItemLabel>
                                          <DataList.ItemValue className="mb-0">{education.grade}</DataList.ItemValue>
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
            open={isOpenModalCreateOrUpdateEducation}
            placement={'center'}
            motionPreset="slide-in-bottom"
         >
            <Portal>
               <Dialog.Backdrop />
               <Dialog.Positioner>
                  <Dialog.Content className="bg-white">
                     <Dialog.Header>
                        <Dialog.Title>{action === 'create' ? 'Add education' : 'Update education'}</Dialog.Title>
                     </Dialog.Header>
                     <Dialog.Body gap={6}>
                        <Stack gap="6">
                           <Stack direction="row">
                              <InputCustom
                                 label="School"
                                 required
                                 placeholder="Ex: Harvard University"
                                 height="40px"
                                 name="school"
                                 onChange={handleChange}
                                 value={formData.school}
                              />
                           </Stack>
                           <Stack direction="row">
                              <InputCustom
                                 label="Degree"
                                 required
                                 placeholder="Ex: Bachelor"
                                 height="40px"
                                 name="degree"
                                 onChange={handleChange}
                                 value={formData.degree}
                              />
                              <InputCustom
                                 label="Field of Study"
                                 required
                                 placeholder="Ex: Computer Science"
                                 height="40px"
                                 name="field_of_study"
                                 onChange={handleChange}
                                 value={formData.field_of_study}
                              />
                           </Stack>
                           <Stack direction="row">
                              <InputCustom
                                 type="month"
                                 label="Start Date"
                                 required
                                 height="40px"
                                 name="start_date"
                                 onChange={handleChange}
                                 value={formData.start_date}
                              />
                              <InputCustom
                                 type="month"
                                 label="End Date"
                                 height="40px"
                                 name="end_date"
                                 onChange={handleChange}
                                 value={formData.end_date}
                              />
                           </Stack>
                           <Stack direction="row">
                              <InputCustom
                                 label="Grade"
                                 placeholder="Ex: 3.5"
                                 height="40px"
                                 name="grade"
                                 onChange={handleChange}
                                 value={formData.grade}
                              />
                           </Stack>
                           <Stack direction="row">
                              <InputCustom
                                 label="Activities"
                                 placeholder="Ex: Student Council"
                                 height="40px"
                                 name="activities"
                                 onChange={handleChange}
                                 value={formData.activities}
                              />
                           </Stack>
                        </Stack>
                     </Dialog.Body>
                     <Dialog.Footer>
                        <Button
                           className="border-[#F4F5F6] bg-[#2F65B9] text-white"
                           onClick={handleSave}
                           borderRadius={4}
                           loading={isLoadingCreateOrUpdateEducation}
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
         <Dialog.Root size={'md'} open={isOpenModalDeleteEducation} placement={'center'} motionPreset="slide-in-bottom">
            <Portal>
               <Dialog.Backdrop />
               <Dialog.Positioner>
                  <Dialog.Content className="bg-white">
                     <Dialog.Header>
                        <Dialog.Title>Delete education</Dialog.Title>
                     </Dialog.Header>
                     <Dialog.Body gap={6}>
                        <Stack gap="6">Do you want to delete this education?</Stack>
                     </Dialog.Body>
                     <Dialog.Footer>
                        <Button
                           className="border-[#F4F5F6] bg-[#2F65B9] text-white"
                           onClick={handleDeleteEducation}
                           borderRadius={4}
                           loading={isLoadingCreateOrUpdateEducation}
                           loadingText="Loading..."
                           spinnerPlacement="start"
                        >
                           CONFIRM
                        </Button>
                        <Dialog.ActionTrigger asChild>
                           <Button
                              className="border-[#F4F5F6] text-black hover:bg-[#F4F5F6]"
                              variant="outline"
                              onClick={() => setIsOpenModalDeleteEducation(false)}
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

export default EditEducation
