import { Button, Dialog, Portal, Stack, Switch } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfileCard from '../ProfileCard'
import ProfileEditMenu from '../ProfileEditMenu'
import ActionBar from '../ActionBar'
import InputCustom from 'components/UI/InputCustom'
import moment from 'moment'
import { IconlyEdit, IconlyDelete } from 'components/UI/Iconly'
import { createCertification, updateCertification, deleteCertification, getProfile } from 'api/profile'
import { DataList } from '@chakra-ui/react'
import SelectCustom from 'components/UI/SelectCustom'
import { setIsOpenModalCreateOrUpdateCertification } from '~/store/modules/profile'

// Định nghĩa các interfaces
interface Certification {
   _id: string
   name?: string
   organization?: string
   issue_date?: string
   expiration_date?: string | null
   credential_id?: string
   credential_url?: string
   is_lifetime?: boolean
   [key: string]: any
}

interface FormData {
   name?: string
   organization?: string
   issue_date?: string
   expiration_date?: string | null
   credential_id?: string
   credential_url?: string
   is_lifetime?: boolean
   organization_id?: string | string[]
   [key: string]: any
}

interface SelectEvent {
   value: string[]
   items?: { value: string; label: string }[]
}

interface RootState {
   profile: {
      profile: {
         certifications?: Certification[]
         [key: string]: any
      } | null
      isOpenModalCreateOrUpdateCertification: boolean
      isLoadingCreateOrUpdateCertification: boolean
   }
   user: {
      organizationFramework: any
   }
}

type AppDispatch = any // Tạm thời dùng any, nên thay bằng kiểu từ Redux store thực tế

const Certifications: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>()

   // ========== STATE FROM REDUX STORE ========== //
   const { profile } = useSelector((state: RootState) => state.profile)
   const { certifications = [] } = profile || {}
   const { isOpenModalCreateOrUpdateCertification, isLoadingCreateOrUpdateCertification } = useSelector(
      (state: RootState) => state.profile
   )
   const { organizationFramework } = useSelector((state: RootState) => state.user)

   // ========== STATE MANAGEMENT ========== //
   const [action, setAction] = useState<'create' | 'update' | ''>('')
   const [formData, setFormData] = useState<FormData>({})
   const [targetDelete, setTargetDelete] = useState<Certification | null>(null)
   const [isOpenModalDeleteCertification, setIsOpenModalDeleteCertification] = useState<boolean>(false)

   // ========== USE EFFECT ========== //
   useEffect(() => {
      if (!profile) dispatch(getProfile())
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dispatch])

   // ========== HANDLE CHANGE FUNCTION ========== //
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      })
   }

   const handleChangeSwitch = (isChecked: boolean): void => {
      setFormData({
         ...formData,
         is_lifetime: isChecked,
         expiration_date: isChecked ? null : formData.expiration_date,
      })
   }

   const handleChangeSelect = (event: SelectEvent): void => {
      setFormData({
         ...formData,
         organization_id: event.value,
      })
   }

   const handleAddCertification = (): void => {
      dispatch(setIsOpenModalCreateOrUpdateCertification(true))
      setAction('create')
      setFormData({
         name: '',
         organization: '',
         issue_date: '',
         expiration_date: '',
         credential_id: '',
         credential_url: '',
         is_lifetime: false,
         organization_id: [],
      })
   }

   const handleUpdateCertification = (certification: Certification): void => {
      dispatch(setIsOpenModalCreateOrUpdateCertification(true))
      setAction('update')
      setFormData({
         ...certification,
         issue_date: moment(certification.issue_date).format('YYYY-MM-DD'),
         expiration_date: certification.expiration_date
            ? moment(certification.expiration_date).format('YYYY-MM-DD')
            : '',
         organization_id: certification.organization_id ? [certification.organization_id] : [],
      })
   }

   const handleOpenModalDelete = (certification: Certification): void => {
      setIsOpenModalDeleteCertification(true)
      setTargetDelete(certification)
   }

   const handleDeleteCertification = (): void => {
      if (targetDelete?._id) {
         dispatch(deleteCertification(targetDelete._id))
      }
      setIsOpenModalDeleteCertification(false)
   }

   const handleSaveChanges = (): void => {
      if (formData.is_lifetime) {
         const { organization_id, ...rest } = formData
         switch (action) {
            case 'create':
               dispatch(
                  createCertification({
                     ...rest,
                     expiration_date: null,
                     organization_id: typeof organization_id === 'object' ? organization_id[0] : organization_id,
                  })
               )
               break
            case 'update':
               dispatch(
                  updateCertification({
                     ...rest,
                     expiration_date: null,
                     organization_id: typeof organization_id === 'object' ? organization_id[0] : organization_id,
                  })
               )
               break
            default:
               break
         }
      } else {
         const { organization_id, ...rest } = formData
         switch (action) {
            case 'create':
               dispatch(
                  createCertification({
                     ...rest,
                     organization_id: typeof organization_id === 'object' ? organization_id[0] : organization_id,
                  })
               )
               break
            case 'update':
               dispatch(
                  updateCertification({
                     ...rest,
                     organization_id: typeof organization_id === 'object' ? organization_id[0] : organization_id,
                  })
               )
               break
            default:
               break
         }
      }
   }

   const handleClose = (): void => {
      dispatch(setIsOpenModalCreateOrUpdateCertification(false))
   }

   // ========== COMPONENT RENDER ========== //
   return (
      <div className="flex gap-8 flex-col md:flex-row w-full py-8 px-[16px]">
         <ProfileEditMenu />
         <div className="md:w-8/12 w-full">
            <div className="bg-[#ffffff] hidden md:block p-8 rounded-md">
               {/* =========== Profile Card ========== */}
               <ProfileCard />
               {/* =========== Action Bar  ========== */}
               <ActionBar />
            </div>
            <div className="bg-[#ffffff] p-8 rounded-md md:mt-8">
               <div className="pb-[20px] mb-8 border-b-[1px] border-gray-200 flex justify-between">
                  <div>
                     <h4 className="">Certifications</h4>
                  </div>
                  <Button
                     onClick={handleAddCertification}
                     height={50}
                     className="mt-[14px] px-[18px] text-sm sm:px-[28px] py-2 sm:py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                     borderRadius={4}
                     loading={false}
                     loadingText="Loading..."
                     spinnerPlacement="start"
                  >
                     Add Certification
                  </Button>
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
            </div>
         </div>
         {/* CREATE/UPDATE */}
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

export default Certifications
