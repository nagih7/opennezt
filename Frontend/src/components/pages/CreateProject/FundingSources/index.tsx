import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons'
import StepHeader from '../StepHeader'
import { IconlyDelete } from 'components/UI/Iconly'
import { useDispatch, useSelector } from 'react-redux'
import { onChangeFormCreateProject } from 'store/modules/project'
import InputCustom from 'components/UI/InputCustom'
import { createListCollection } from '@chakra-ui/react'
import { FUNDING_SOURCES, CURRENCY } from 'utils/constants'
import SelectCustom from 'components/UI/SelectCustom'
import { toaster } from 'components/UI/toaster'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { RootState } from '~/store'

const currencyFramework = createListCollection({
   items: CURRENCY['EN'],
})
const fundingSourceFramework = createListCollection({
   items: FUNDING_SOURCES['EN'],
})

interface FundingSource {
   name: string
   amount: string
   currency: string
}

const FundingSources: React.FC = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   // ========== STATE FROM REDUX ========== //
   const { formCreateProject } = useSelector((state: RootState) => state.project)

   // ========== STATE ========== //
   const [formData, setFormData] = useState<FundingSource[]>([{ name: '', amount: '', currency: '' }])
   const [currentStep, setCurrentStep] = useState<number>(3)
   // ========== USEEFFECT ========== //
   useEffect(() => {
      if (formCreateProject.name === '') {
         navigate('/project/details')
      }
   }, [navigate, formCreateProject.name])

   useEffect(() => {
      setFormData(formCreateProject.funding_sources)
   }, [formCreateProject])

   // ========== ONCHANGE FUNCTION ========== //
   const handleChange = (e: any, index: number, nameSelect?: string) => {
      if (nameSelect) {
         const newForm = formData.map((item, i) => {
            if (i === index) {
               return { ...item, [nameSelect]: e.value }
            }
            return item
         })
         setFormData(newForm)
      } else {
         const { name, value } = e.target
         const newForm = formData.map((item, i) => {
            if (i === index) {
               return { ...item, [name]: value }
            }
            return item
         })
         setFormData(newForm)
      }
   }

   const handlePreviousStep = () => {
      dispatch(onChangeFormCreateProject({ funding_sources: formData }))
      navigate('/project/revenue')
   }

   const handleNextStep = async () => {
      dispatch(onChangeFormCreateProject({ funding_sources: formData }))
      navigate('/project/additional-info')
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
      setFormData([...formData, { name: '', amount: '', currency: '' }])
   }

   const handleRemoveForm = (index: number) => {
      const newForm = formData.filter((_, i) => i !== index)
      setFormData(newForm)
   }
   const handlePrevStep = () => {
      if (currentStep > 0) {
         setCurrentStep((prev) => prev - 1)
         handlePreviousStep()
      }
   }

   const handleNext = () => {
      if (currentStep < 8) {
         handleNextStep()
         setCurrentStep((prev) => prev + 1)
      }
   }
   // ========== COMPONENT RENDER ========== //
   return (
      <div className="w-full h-full">
         <div className="px-[16px] ">
            <div>
               <div className="mt-8 bg-[#ffffff] rounded-md">
                  <StepHeader currentStep={3} />
               </div>
               <div className="mt-8 bg-[#ffffff] rounded-md p-8">
                  <div className="flex flex-col w-full">
                     <div className="flex justify-end ">
                        <span
                           className="flex items-center gap-1 cursor-pointer bg-[#2f65b9] rounded-md text-[#ffffff] px-[20px] py-2 mb-[14px]"
                           onClick={handleAddFundingSource}
                        >
                           <PlusOutlined className="text-[#ffffff]" />
                           <button height={50} className="text-xs bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold">
                              ADD FUNDING SOURCE
                           </button>
                        </span>
                     </div>
                     {formData?.map((_, index) => (
                        <div key={index} className="relative flex flex-col gap-6 mb-12 rounded-md ">
                           <div className="flex flex-col gap-12">
                              <SelectCustom
                                 onChange={(e: any) => handleChange(e, index, 'name')}
                                 value={formData[index].name}
                                 name="name"
                                 required
                                 label="Name"
                                 placeholder="Ex: Angel"
                                 collection={fundingSourceFramework}
                              />
                              <InputCustom
                                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, index)}
                                 value={formData[index].amount}
                                 name="amount"
                                 required
                                 label="Amount"
                                 placeholder="Ex: 10000"
                              />
                              <SelectCustom
                                 onChange={(e: any) => handleChange(e, index, 'currency')}
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
                     <div className="flex justify-end gap-6">
                        <ButtonGroup size="sm" variant="outline">
                           <Button
                              onClick={handlePrevStep}
                              height={50}
                              isDisabled={currentStep === 0}
                              className="mt-[14px] px-[28px] py-3 text-sm bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold "
                           >
                              BACK TO PREVIOUS STEP
                           </Button>
                           <Button
                              onClick={handleNext}
                              height={50}
                              className="mt-[14px] px-[28px] py-3 text-sm bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                           >
                              NEXT STEP
                           </Button>
                        </ButtonGroup>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default FundingSources
