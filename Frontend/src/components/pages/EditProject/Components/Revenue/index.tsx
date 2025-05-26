import React, { useEffect, useState } from 'react'
import { Button, createListCollection } from '@chakra-ui/react'
import { GoPlus } from "react-icons/go";
import ActionBar from '../../../EditProfile/components/ActionBar'
import ProjectEditMenu from '../ProjectEditMenu'
import ProjectCard from '../ProjectCard'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import InputCustom from 'components/UI/InputCustom'
import SelectCustom from 'components/UI/SelectCustom'
import { IconlyDelete } from 'components/UI/Iconly'
import { CURRENCY } from 'utils/constants'
import { updateProjectRevenue } from 'api/project'
import { toaster } from 'components/UI/toaster'
import { postProjectDetailsActivitiesRevenue } from 'api/activity'
import { RootState } from '~/store'

// Define types for the component
interface Revenue {
   date: string
   amount: string | number
   currency: string
}

interface Project {
   _id: string
   revenues?: Revenue[]
}

interface FormRevenue {
   date: string
   amount: string | number
   currency: string[]
}

interface SelectEvent {
   value: string[]
}

const currencyFramework = createListCollection({
   items: CURRENCY['EN'],
})

const EditRevenue: React.FC = () => {
   const dispatch = useDispatch()
   const params = useParams<{ id: string }>()
   const { id } = params

   // ========== STATE FROM REDUX STORE ========== //
   const { myProjectDetails, isLoadingUpdateMyProject } = useSelector((state: RootState) => state.project)
   const project = myProjectDetails

   // ========== STATE ========== //
   const [formData, setFormData] = useState<FormRevenue[]>([])
   // ========== USEEFFECT ========== //

   useEffect(() => {
      if (project) {
         setFormData(
            project.revenues?.map((item) => {
               return {
                  date: new Date(item.date).toISOString().slice(0, 7),
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

   const handleAddRevenue = () => {
      // VERIFY
      if (formData.some((item) => !item.date || !item.amount || !item.currency)) {
         toaster.create({
            title: `Please fill all fields.`,
            type: 'error',
         })
         return
      }
      setFormData([...formData, { date: '', amount: '', currency: [] }])
   }

   const handleRemoveForm = (index: number) => {
      const newForm = formData.filter((_, i) => i !== index)
      setFormData(newForm)
   }

   const handleSaveChanges = async () => {
      dispatch(
         updateProjectRevenue(id, {
            revenues: formData.map((item) => ({
               date: item.date,
               amount: item.amount,
               currency: item.currency[0],
            })),
         })
      )
      await postProjectDetailsActivitiesRevenue(id, {
         revenues: formData.map((item) => ({
            date: item.date,
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
               <div className="flex justify-end">
                  <div
                     className="flex items-center gap-1 cursor-pointer bg-[#2f65b9] rounded-md text-[#ffffff] px-[20px] py-2 mb-[14px]"
                     onClick={handleAddRevenue}
                  >
                     <GoPlus  className="text-[#ffffff]" />
                     <button height={50} className="text-xs bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold">
                        ADD REVENUE
                     </button>
                  </div>
               </div>
               {formData?.map((_, index) => (
                  <div key={index} className="relative flex flex-col gap-6 mb-12 rounded-md ">
                     <div className="flex flex-col gap-12">
                        <InputCustom
                           type="month"
                           onChange={(e) => handleChange(e, index)}
                           value={formData[index].date}
                           name="date"
                           required
                           label="Date"
                           placeholder="Ex: 01/2025"
                        />
                        <InputCustom
                           type="number"
                           onChange={(e) => handleChange(e, index)}
                           value={formData[index].amount}
                           name="amount"
                           required
                           label="Amount"
                           placeholder="Ex: 1000"
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

export default EditRevenue
