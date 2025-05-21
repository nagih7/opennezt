import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StepHeader from '../StepHeader'
import { useDispatch, useSelector } from 'react-redux'
import { onChangeFormCreateProject } from 'store/modules/project'
import TextAreaCustom from 'components/UI/TextAreaCustom'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { PROJECT_ADDITIONAL_INFO_FIELDS } from 'utils/constants/additionalInfor'
import { RootState } from '~/store'

interface Field {
   id: string
   name: string
   placeholder: string
   backgroundColor?: string
}

interface FormDataItem {
   name: string
   content: string
}

interface ProjectFormData {
   [key: string]: string
}

const AdditionalInfo: React.FC = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   // ========== STATE FROM REDUX ========== //
   const { formCreateProject } = useSelector((state: RootState) => state.project)
   const { language } = useSelector((state: RootState) => state.app) || { language: 'EN' }

   // Chọn danh sách trường dựa trên ngôn ngữ
   const fields: Field[] = PROJECT_ADDITIONAL_INFO_FIELDS[language] || PROJECT_ADDITIONAL_INFO_FIELDS.EN

   // ========== STATE ========== //
   const [formData, setFormData] = useState<FormDataItem[]>([{ name: '', content: '' }])
   const [currentStep, setCurrentStep] = useState<number>(4)
   const [projectFormData, setProjectFormData] = useState<ProjectFormData>({})

   // ========== USEEFFECT ========== //
   useEffect(() => {
      if (formCreateProject.name === '') {
         navigate('/project/details')
      }
      // Initialize form data with default structure if empty
      const initialData: ProjectFormData = {}
      fields.forEach((field) => {
         initialData[field.id] = ''
      })
      setProjectFormData(initialData)
   }, [navigate, formCreateProject.name, fields])

   useEffect(() => {
      if (formCreateProject.additional_infos?.length > 0) {
         setFormData(formCreateProject.additional_infos)

         // Map existing data to the form fields
         const mappedData: ProjectFormData = {}
         formCreateProject.additional_infos.forEach((item) => {
            const matchingField = fields.find((field) => field.name === item.name)
            if (matchingField) {
               mappedData[matchingField.id] = item.content
            }
         })
         setProjectFormData((prev) => ({ ...prev, ...mappedData }))
      }
   }, [formCreateProject, fields])

   const handlePreviousStep = (): void => {
      // Prepare data from fields
      const fieldData: FormDataItem[] = []
      fields.forEach((field) => {
         if (projectFormData[field.id]) {
            fieldData.push({
               name: field.name,
               content: projectFormData[field.id],
            })
         }
      })

      dispatch(onChangeFormCreateProject({ additional_infos: fieldData }))
      navigate('/project/funding-sources')
   }

   const handleNextStep = async (): Promise<void> => {
      // Prepare data from fields
      const fieldData: FormDataItem[] = []
      fields.forEach((field) => {
         if (projectFormData[field.id]) {
            fieldData.push({
               name: field.name,
               content: projectFormData[field.id],
            })
         }
      })

      dispatch(onChangeFormCreateProject({ additional_infos: fieldData }))
      navigate('/project/logo')
   }

   const handlePrevStep = (): void => {
      if (currentStep > 0) {
         setCurrentStep((prev) => prev - 1)
         handlePreviousStep()
      }
   }

   const handleNext = (): void => {
      if (currentStep < 8) {
         handleNextStep()
         setCurrentStep((prev) => prev + 1)
      }
   }

   const handleChangeField = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      const { name, value } = e.target
      setProjectFormData((prev) => ({
         ...prev,
         [name]: value,
      }))
   }

   // ========== COMPONENT RENDER ========== //
   return (
      <div className="w-full h-full">
         <div className="px-[16px]">
            <div>
               <div className="mt-8 bg-[#ffffff] rounded-md">
                  <StepHeader currentStep={4} />
               </div>
               <div className="mt-8 bg-[#ffffff] rounded-md p-8">
                  <div className="flex flex-col w-full">
                     <div className="pb-[20px] mb-8 border-b-[1px] border-gray-200">
                        <div className="flex items-center justify-between">
                           <div>
                              <h4 className="text-xl font-semibold">Additional Information</h4>
                              <p className="mt-1 text-sm text-gray-600">
                                 <strong className="font-medium">Note: max 500 characters for each field</strong>
                              </p>
                           </div>
                        </div>
                     </div>

                     {/* Structured form fields */}
                     <div className="mb-6 overflow-hidden border rounded-md">
                        <table className="w-full">
                           <tbody>
                              {fields.map((field, index) => (
                                 <tr key={field.id}>
                                    <td
                                       className={`p-4 ${index < fields.length - 1 ? 'border-b border-gray-200' : ''} ${
                                          field.backgroundColor
                                       }`}
                                    >
                                       <div className="mb-2">
                                          <label htmlFor={field.id} className="font-medium text-gray-700">
                                             {field.name}
                                          </label>
                                       </div>
                                       <TextAreaCustom
                                          id={field.id}
                                          resize="none"
                                          placeholder={field.placeholder}
                                          name={field.id}
                                          onChange={handleChangeField}
                                          value={projectFormData[field.id] || ''}
                                          rows={4}
                                          nomax={true}
                                       />
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>

                     <div className="flex justify-end gap-6 mt-8">
                        <ButtonGroup size="sm" variant="outline">
                           <Button
                              onClick={handlePrevStep}
                              height={50}
                              isDisabled={currentStep === 0}
                              className="mt-[14px] px-[28px] py-3 text-sm bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                           >
                              BACK TO PREVIOUS STEP
                           </Button>
                           <Button
                              onClick={handleNext}
                              height={50}
                              isDisabled={currentStep === 6}
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

export default AdditionalInfo
