import React from 'react'
import { Badge, Button, DataList, Dialog, Portal, Stack } from '@chakra-ui/react'
import { useEducations } from '../Educations/hooks/useEducations'
import InputCustom from '~/components/UI/InputCustom'
import { IconlyCalendar, IconlyDelete, IconlyEdit, IconlyEditSquare } from '~/components/UI/Iconly'
import moment from 'moment'
import { Education } from '../Educations/types'
import { LuBookOpen, LuGraduationCap } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { FiBookOpen } from "react-icons/fi";
import { LuAward } from "react-icons/lu";
import { FaRegAddressCard } from "react-icons/fa";

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
      <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[1000px] bg-[#ffffff] rounded-lg max-w-[95vw] max-h-[80vh] overflow-y-auto p-6">
         <div className="pb-4 mb-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <div className='w-14 h-14 flex items-center justify-center bg-[#2f65b9] rounded-xl'>
                  <LuGraduationCap className='w-6 h-6 text-[#ffffff]' />
               </div>
               <div>
                  <h4 className="text-lg font-semibold">Educations</h4>
                  <span className="text-sm text-gray-500">Manage your education history</span>
               </div>
            </div>
            <Button
               onClick={handleAddEducation}
               height={50}
               className="mt-[14px] px-[18px] text-sm sm:px-[28px] py-2 sm:py-3 bg-[#2f65b9] !rounded-3xl text-[#ffffff] font-semibold"
               borderRadius={4}
               loading={false}
               loadingText="Loading..."
               spinnerPlacement="start">
               <FaPlus className='w-4 h-4 text-[#ffffff]' />
               Add Education</Button>
         </div>
         <div>
            <div className="px-[16px]">
               {educations?.map((education: Education, index: React.Key | null | undefined) => (
                  <DataList.Root orientation="horizontal" key={index}>
                     <div key={index}>
                        <div className="group border mt-6 rounded-[0.6rem]">
                           <div className="relative p-4">
                              <Stack className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex gap-3 md:float-right 2xl:float-right" direction={'row'}>
                                 <span
                                    className="cursor-pointer"
                                    onClick={() => handleUpdateEducation(education)}
                                 >
                                    <IconlyEditSquare size={24} color={'blue'}/>
                                 </span>
                                 <span
                                    className="cursor-pointer"
                                    onClick={() => handleOpenModalDelete(education)}
                                 >
                                    <IconlyDelete size={24} color={'red'} />
                                 </span>
                              </Stack>

                              <div className='flex items-center gap-3'>
                                 <div className="w-10 h-10 rounded-xl bg-[#2f65b9] flex items-center justify-center">
                                    <FiBookOpen className='w-4 h-4 text-[#ffffff]' />
                                 </div>
                                 <div>
                                    {education.school && (
                                       <h4 className="font-bold">{education.school}</h4>
                                    )}
                                    {education.start_date && education.end_date && (
                                       <p className="flex items-center gap-1 text-[#9B9B9B]">
                                          <IconlyCalendar size={16} color={'#9B9B9B'} />
                                          {`${moment(education.start_date).format('MMM YYYY')} ${education.end_date
                                             ? `- ${moment(education.end_date).format('MMM YYYY')}`
                                             : ''
                                             }`}
                                       </p>
                                    )}
                                 </div>
                              </div>
                              <div className='grid grid-cols-3 gap-6 mt-4'>
                                 {education.field_of_study && (
                                    <div className="flex flex-col gap-2 bg-slate-100 rounded-xl p-4">
                                       <DataList.ItemLabel className='flex items-center font-semibold text-gray-500 gap-1'>
                                          <LuBookOpen className='w-4 h-4 text-gray-500' />
                                          FIELD OF STUDY</DataList.ItemLabel>
                                       <DataList.ItemValue className="mb-0">
                                          {education.field_of_study}
                                       </DataList.ItemValue>
                                    </div>
                                 )}
                                 {education.degree && (
                                    <div className="flex flex-col gap-2 bg-slate-100 rounded-xl p-4">
                                       <DataList.ItemLabel className='flex items-center font-semibold text-gray-500 gap-1'> 
                                          <FaRegAddressCard className='w-4 h-4 text-gray-500'/>
                                          DEGREE
                                       </DataList.ItemLabel>
                                       <DataList.ItemValue className="mb-0">{education.degree}</DataList.ItemValue>
                                    </div>
                                 )}
                                 {education.grade && (
                                    <div className="flex flex-col gap-2 bg-slate-100 rounded-xl p-4">
                                       <DataList.ItemLabel className='flex items-center font-semibold text-gray-500 gap-1'>
                                          <LuAward className='w-4 h-4 text-gray-500' />
                                          GRADE
                                       </DataList.ItemLabel>
                                       <DataList.ItemValue className="mb-0">
                                          <Badge colorPalette="green" className="bg-green-100 text-green-800 font-semibold">{education.grade}</Badge>
                                       </DataList.ItemValue>
                                    </div>
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>
                  </DataList.Root>
               ))}
            </div>
         </div>
         <div className="flex gap-2 pt-4 justify-end">
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
