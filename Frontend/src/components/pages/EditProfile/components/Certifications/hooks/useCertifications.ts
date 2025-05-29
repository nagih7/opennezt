import { Certification, FormData, SelectEvent } from "../types"
import { useEffect, useState } from "react"
import { createCertification, deleteCertification, getOrganizationFramework, getProfile, updateCertification } from "~/api/profile"
import moment from "moment"
import { toast } from "sonner"
import { createListCollection } from "@chakra-ui/react"

const useCertifications = () => {
   // ========== STATE MANAGEMENT ========== //
   const [action, setAction] = useState<'create' | 'update' | ''>('')
   const [formData, setFormData] = useState<FormData>({})
   const [targetDelete, setTargetDelete] = useState<Certification | null>(null)
   const [isOpenModalDeleteCertification, setIsOpenModalDeleteCertification] = useState<boolean>(false)
   const [isOpenModalCreateOrUpdateCertification, setIsOpenModalCreateOrUpdateCertification] = useState<boolean>(false)
   const [isLoadingCreateOrUpdateCertification, setIsLoadingCreateOrUpdateCertification] = useState<boolean>(false)
   const [organizationFramework, setOrganizationFramework] = useState<any>([])

   // ========== PROFILE DATA FETCHING ========== //
   const [profile, setProfile] = useState<any>(null)
   const { certifications = [] } = profile || {}

   const fetchOrganizationFramework = async () => {
      const response = await getOrganizationFramework()
      if (response && response.data) {
         setOrganizationFramework(
            createListCollection({
               items: response.data.map((organization: any) => ({
                  label: organization.name,
                  value: organization._id,
               })),
      }))
      }
   }

   useEffect(() => {
      if (!organizationFramework?.items || organizationFramework?.items.length === 0) {
         (fetchOrganizationFramework())
      }
   }, [organizationFramework, fetchOrganizationFramework])

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

const handleCallAddEducation = async (data: any) => {
   setIsLoadingCreateOrUpdateCertification(true);
   try {
      const response = await createCertification(data);
      if (response.status === 201 || response.status === 200) {
         setProfile((prevProfile: any) => ({
            ...prevProfile,
            certifications: [...prevProfile.certifications, response.data],
         }));
         setIsOpenModalCreateOrUpdateCertification(false);
         toast.success(`${response.message}`);
      } else {
         // Handle non-success status codes
         toast.error(`${response?.message}`);
      }
   } catch (error: any) {
      // Handle network/API errors
      toast.error(`Can't create certification, please try again later.`);
   } finally {
      // Always reset loading state
      setIsLoadingCreateOrUpdateCertification(false);
   }
};

   const handleAddCertification = (): void => {
      setIsOpenModalCreateOrUpdateCertification(true)
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

   const handleCallUpdateCertification = async (data: any) => {
      setIsLoadingCreateOrUpdateCertification(true);
      try {
         const response = await updateCertification(data);
         if (response.status === 200 || response.status === 201) {
            setProfile((prevProfile: any) => ({
               ...prevProfile,
               certifications: prevProfile.certifications.map((item: any) =>
                  item._id === response.data._id ? response.data : item
               ),
            }));
            setIsOpenModalCreateOrUpdateCertification(false);
            toast.success(`${response.message}`);
         } else {
            // Handle non-success status codes
            toast.error(`${response?.message}`);
         }
      } catch (error: any) {
         // Handle network/API errors
         toast.error(`Can't update certification, please try again later.`);
      } finally {
         // Always reset loading state
         setIsLoadingCreateOrUpdateCertification(false);
      }
   }

   const handleUpdateCertification = (certification: Certification): void => {
      setIsOpenModalCreateOrUpdateCertification(true)
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
         (deleteCertification(targetDelete._id))
            .then((response) => {
               if (response.status === 200 || response.status === 201) {
                  setProfile((prevProfile: any) => ({
                     ...prevProfile,
                     certifications: prevProfile.certifications.filter((item: any) => item._id !== response.data),
                  }))
                  toast.success(`${response.message}`)
               } else {
                  toast.error(`${response?.message}`)
               }
            })
            .catch(() => {
               toast.error(`Can't delete certification, please try again later.`)
            })
      }
      setIsOpenModalDeleteCertification(false)
   }

   const handleSaveChanges = (): void => {
      if (formData.is_lifetime) {
         const { organization_id, ...rest } = formData
         switch (action) {
            case 'create':
               (
                  handleCallAddEducation({
                     ...rest,
                     expiration_date: null,
                     organization_id: typeof organization_id === 'object' ? organization_id[0] : organization_id,
                  })
               )
               break
            case 'update':
               (
                  handleCallUpdateCertification({
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
               (
                  handleCallAddEducation({
                     ...rest,
                     organization_id: typeof organization_id === 'object' ? organization_id[0] : organization_id,
                  })
               )
               break
            case 'update':
               (
                  handleCallUpdateCertification({
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
      setIsOpenModalCreateOrUpdateCertification(false)
   }

   return {
      certifications,
      isOpenModalCreateOrUpdateCertification,
      isLoadingCreateOrUpdateCertification,
      organizationFramework,
      action,
      formData,
      targetDelete,
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
      setIsOpenModalDeleteCertification,
   }
}

export default useCertifications