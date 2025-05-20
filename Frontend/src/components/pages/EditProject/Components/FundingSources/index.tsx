import React, { useEffect, useState } from 'react'
import { Button, createListCollection } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import ActionBar from '../../../EditProfile/components/ActionBar'
import ProjectEditMenu from '../ProjectEditMenu'
import { PlusOutlined } from '@ant-design/icons'
import ProjectCard from '../ProjectCard'
import { IconlyDelete } from 'components/UI/Iconly'
import { useParams } from 'react-router-dom'
import SelectCustom from 'components/UI/SelectCustom'
import InputCustom from 'components/UI/InputCustom'
import { CURRENCY, FUNDING_SOURCES } from 'utils/constants'
import { updateProjectFundingSources } from 'api/project'
import { postProjectDetailsActivitiesFundingSource } from 'api/activity'
import { toaster } from 'components/UI/toaster'
import { AppDispatch } from '~/store/configureStore'

// Define types for the component
interface FundingSource {
   name: string
   amount: string | number
   currency: string
}

interface Project {
   _id: string
   funding_sources?: FundingSource[]
}

interface FormFundingSource {
   name: string[]
   amount: string | number
   currency: string[]
}

interface RootState {
   project: {
      myProjectDetails: Project
      isLoadingUpdateMyProject: boolean
   }
}

interface SelectEvent {
   value: string[]
}

const currencyFramework = createListCollection({
   items: CURRENCY['EN'],
})
const fundingSourceFramework = createListCollection({
   items: FUNDING_SOURCES['EN'],
})

const EditFundingSources: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>()
   const params = useParams<{ id: string }>()
   const { id } = params

   // ========== STATE FROM REDUX STORE ========== //
   const { myProjectDetails, isLoadingUpdateMyProject } = useSelector((state: RootState) => state.project)
   const project = myProjectDetails

   // ========== STATE ========== //
   const [formData, setFormData] = useState<FormFundingSource[]>([])
   // ========== USEEFFECT ========== //

   useEffect(() => {
      if (project) {
         setFormData(
            project.funding_sources?.map((item) => {
               return {
                  name: [item.name],
                  amount: item.amount,
                  currency: [item.currency],
               }
            }) || []
         )
      }
      // eslint-disable-next-line
   }, [project])

   // ========== ONCHANGE FUNCTION ========== //
   const handleChange = (e: React.ChangeEvent<HTMLInputElement> | SelectEvent, index: number, nameSelect?: string) => {
      if (nameSelect) {
         const newForm = formData.map((item, i) => {
            if (i === index) {
               return { ...item, [nameSelect]: (e as SelectEvent).value }
            }
            return item
         })
         setFormData(newForm)
      } else {
         const { name, value } = e as React.ChangeEvent<HTMLInputElement>
         const newForm = formData.map((item, i) => {
            if (i === index) {
               return { ...item, [name]: value }
            }
            return item
         })
         setFormData(newForm)
      }
   }

   const handleAddFundingSource = () => {
      // VERIFY
      if (formData.some((item) => !item.name || !item.amount || !item.currency)) {
         toaster.create({
            title: `Please fill all fields.`,
            type: 'error',
         })
         return
      }
      setFormData([...formData, { name: [], amount: '', currency: [] }])
   }

   const handleRemoveForm = (index: number) => {
      const newForm = formData.filter((_, i) => i !== index)
      setFormData(newForm)
   }

   const handleSaveChanges = async () => {
      dispatch(
         updateProjectFundingSources(id, {
            funding_sources: formData.map((item) => ({
               name: item.name[0],
               amount: item.amount,
               currency: item.currency[0],
            })),
         })
      )
      await postProjectDetailsActivitiesFundingSource(id, {
         funding_sources: formData.map((item) => ({
            name: item.name[0],
            amount: item.amount,
            currency: item.currency[0],
         })),
      })
   }
   // ========== COMPONENT RENDER ========== //
   return (
      <div className="flex gap-8 w-full py-8 px-[16px]">
         <ProjectEditMenu />
         <div className="w-8/12">
            <div className="bg-[#ffffff] p-8 rounded-md">
               <ProjectCard />
               <ActionBar />
            </div>
            <div className="bg-[#ffffff] p-8 rounded-md mt-8">
               <div className="flex justify-end ">
                  <div
                     className="flex items-center gap-1 cursor-pointer bg-[#2f65b9] rounded-md text-[#ffffff] px-[20px] py-2 mb-[14px]"
                     onClick={handleAddFundingSource}
                  >
                     <PlusOutlined className="text-[#ffffff]" />
                     <button height={50} className="text-xs bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold">
                        ADD FUNDING SOURCE
                     </button>
                  </div>
               </div>
               {formData?.map((_, index) => (
                  <div key={index} className="relative flex flex-col gap-6 mb-12 rounded-md ">
                     <div className="flex flex-col gap-12">
                        <SelectCustom
                           onChange={(e) => handleChange(e, index, 'name')}
                           value={formData[index].name}
                           name="name"
                           required
                           label="Name"
                           placeholder="Ex: Angel"
                           collection={fundingSourceFramework}
                        />
                        <InputCustom
                           onChange={(e) => handleChange(e, index)}
                           value={formData[index].amount}
                           name="amount"
                           required
                           label="Amount"
                           placeholder="Ex: 10000"
                        />
                        <SelectCustom
                           onChange={(e) => handleChange(e, index, 'currency')}
                           value={formData[index].currency}
                           name="currency"
                           required
                           label="Currency"
                           placeholder="Select Currency"
                           collection={currencyFramework}
                        />
                     </div>
                     {formData.length > 1 && (
                        <div className="flex justify-end">
                           <span onClick={() => handleRemoveForm(index)} className="cursor-pointer">
                              <IconlyDelete size={24} color={'#000'} />
                           </span>
                        </div>
                     )}
                  </div>
               ))}
               <div className="px-[16px] flex justify-end">
                  <Button
                     onClick={handleSaveChanges}
                     height={50}
                     className="mt-[14px] px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                     borderRadius={4}
                     loading={isLoadingUpdateMyProject}
                     loadingText="Loading..."
                     spinnerPlacement="start"
                  >
                     SAVE CHANGES
                  </Button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default EditFundingSources
