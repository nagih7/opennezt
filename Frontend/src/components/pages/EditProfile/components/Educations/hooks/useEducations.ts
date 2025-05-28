import { useState, useEffect } from 'react'
import moment from 'moment'
import { createEducation, updateEducation, deleteEducation, getProfile } from 'api/profile'
import { Education, FormData, ActionType } from '../types'
import { toast } from 'sonner'

export const useEducations = () => {
   // ========== STATE FROM REDUX STORE ========== //
   const [profile, setProfile] = useState<any>(null)
   const { educations = [] } = profile || {}
      useEffect(() => {
         if (!profile) {
            const fetchProfile = async () => {
               const response = await getProfile()
               if (response && response.data) {
                  setProfile(response.data)
               }
            }
            if (profile === null) {
               fetchProfile()
            }
      }}, [profile, getProfile])

   // ========== STATE MANAGEMENT ========== //
   const [action, setAction] = useState<ActionType>('')
   const [formData, setFormData] = useState<FormData>({})
   const [targetDelete, setTargetDelete] = useState<Education | null>(null)
   const [isOpenModalDeleteEducation, setIsOpenModalDeleteEducation] = useState<boolean>(false)
   const [isOpenModalCreateOrUpdateEducation, setIsOpenModalCreateOrUpdateEducation] = useState<boolean>(false)
   const [isLoadingCreateOrUpdateEducation, setIsLoadingCreateOrUpdateEducation] = useState<boolean>(false)

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      })
   }

   const handleCallAddEducation = async (data: any) => {
      setIsLoadingCreateOrUpdateEducation(true);
      const response = await createEducation(data);
      try {
         if (response.status === 201 || response.status === 200) {
            setProfile((prevProfile: any) => ({
            ...prevProfile,
            educations: [...prevProfile.educations, response.data],
            }));
            setIsOpenModalCreateOrUpdateEducation(false);
            setIsLoadingCreateOrUpdateEducation(false);
            toast.success(`${response.message}`);
         }
      } catch (error) {
         setIsLoadingCreateOrUpdateEducation(false);
         toast.error(`${response?.message}`);
      }
   };

   const handleAddEducation = (): void => {
      setIsOpenModalCreateOrUpdateEducation(true)
      setAction('create')
      setFormData({
         school: '',
         degree: '',
         field_of_study: '',
         start_date: '',
         end_date: '',
         grade: '',
         activities: '',
      })
   }

   const handleCallUpdateEducation = async (data: any) => {
      setIsLoadingCreateOrUpdateEducation(true);
      const response = await updateEducation(data);
      try {
         if (response.status === 200 || response.status === 201) {
            setProfile((prevProfile: any) => ({
               ...prevProfile,
               educations: prevProfile.educations.map((item: Education) =>
                  item._id === response.data._id ? response.data : item
               ),
            }));
            setIsOpenModalCreateOrUpdateEducation(false);
            setIsLoadingCreateOrUpdateEducation(false);
            toast.success(`${response.message}`);
         }
      } catch (error) {
         setIsLoadingCreateOrUpdateEducation(false);
         toast.error(`${response?.message}`);
      }
   }

   const handleUpdateEducation = (education: Education): void => {
      setIsOpenModalCreateOrUpdateEducation(true)
      setAction('update')
      setFormData({
         ...education,
         start_date: moment(education.start_date).format('YYYY-MM'),
         end_date: education.end_date ? moment(education.end_date).format('YYYY-MM') : '',
      })
   }

   const handleOpenModalDelete = (education: Education): void => {
      setIsOpenModalDeleteEducation(true)
      setTargetDelete(education)
   }

   const handleDeleteEducation = async (): Promise<void> => {
      if (targetDelete?._id) {
         const response = await deleteEducation(targetDelete._id)
         try {
            if (response.status === 200 || response.status === 201) {
               setProfile((prevProfile: any) => ({
                  ...prevProfile,
                  educations: prevProfile.educations.filter((item: any) => item._id !== response.data),
               }))
               toast.success(`${response.message}`)
            }
         } catch (error) {
            toast.error(`${response?.message}`)
         }
      }
      setIsOpenModalDeleteEducation(false)
   }

   const handleSaveChanges = (): void => {
      if (formData.is_lifetime) {
         const { organization_id, expiration_date, ...rest } = formData
         switch (action) {
            case 'create':
                  handleCallAddEducation({
                     ...rest,
                     expiration_date: null,
                     organization_id:
                        typeof organization_id === 'object' ? organization_id[0] : Array(organization_id)[0],
                  })
               break
            case 'update':
               handleCallUpdateEducation({
                     ...rest,
                     expiration_date: null,
                     organization_id:
                        typeof organization_id === 'object' ? organization_id[0] : Array(organization_id)[0],
                  })
               break
            default:
               break
         }
      } else {
         const { organization_id, ...rest } = formData
         switch (action) {
            case 'create':
               (
                  handleCallAddEducation({
                     ...rest,
                     organization_id:
                        typeof organization_id === 'object' ? organization_id[0] : Array(organization_id)[0],
                  })
               )
               break
            case 'update':
               handleCallUpdateEducation({
                     ...rest,
                     organization_id:
                        typeof organization_id === 'object' ? organization_id[0] : Array(organization_id)[0],
                  })
               break
            default:
               break
         }
      }
   }

   const handleClose = (): void => {
      setIsOpenModalCreateOrUpdateEducation(false)
   }

   return {
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
   }
}