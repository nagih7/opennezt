import React, { useEffect, useState } from 'react'
import StepHeader from '../StepHeader'
import { useNavigate } from 'react-router-dom'
import SelectCustom from 'components/UI/SelectCustom'
import { onChangeFormCreateProject } from 'store/modules/project'
import { getIndustryFramework, getStageFramework } from '~/api/user'
import { useDispatch, useSelector } from 'react-redux'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { RootState } from '~/store'
import { ROUTE_CONFIG } from '~/config/constants/routes'

interface FormData {
   industries: string[]
   stage: string
}

const Stage: React.FC = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   // ========== STATE FROM REDUX ========== //
   const { formCreateProject } = useSelector((state: RootState) => state.project)
   const { industryFramework, stageFramework } = useSelector((state: RootState) => state.user)
   // ========== STATE ========== //
   const [formData, setFormData] = useState<FormData>({
      industries: [],
      stage: '',
   })
   const [currentStep, setCurrentStep] = useState<number>(1)
   // ========== USEEFFECT ========== //
   useEffect(() => {
      if (formCreateProject.name === '') {
         navigate(ROUTE_CONFIG.USER.PROJECT.CREATE.BASIC)
      }
   }, [navigate, formCreateProject.name])

   useEffect(() => {
      if (!industryFramework.length) dispatch(getIndustryFramework())
      // eslint-disable-next-line
   }, [dispatch])

   useEffect(() => {
      if (!stageFramework.length) dispatch(getStageFramework())
      // eslint-disable-next-line
   }, [dispatch])

   useEffect(() => {
      setFormData({
         industries: formCreateProject.industries,
         stage: formCreateProject.stage,
      })
   }, [formCreateProject])

   // ========== ONCHANGE FUNCTION ========== //
   const handleChange = (event: any, nameSelect?: string) => {
      if (event.value.length > 2) {
         // toaster.create({
         //    type: 'error',
         //    title: 'You can only select up to 2 industries',
         // })
         return
      }
      if (nameSelect) {
         setFormData({ ...formData, [nameSelect]: event.value })
      }
   }

   const handlePreviousStep = () => {
      dispatch(onChangeFormCreateProject(formData))
      navigate(ROUTE_CONFIG.USER.PROJECT.CREATE.BASIC)
   }

   const handleNextStep = () => {
      // VERIFY
      if (!formData.industries.length) {
         // toaster.create({
         //    title: `Industry is required.`,
         //    type: 'error',
         // })
         return
      }
      if (!formData.stage) {
         // toaster.create({
         //    title: `Stage is required.`,
         //    type: 'error',
         // })
         return
      }
      dispatch(onChangeFormCreateProject(formData))
      navigate(ROUTE_CONFIG.USER.PROJECT.CREATE.REVENUE)
   }
   const handlePrevStep = () => {
      if (currentStep > 0) {
         setCurrentStep((prev) => prev - 1)
         navigate(ROUTE_CONFIG.USER.PROJECT.CREATE.BASIC)
      }
   }

   const handleNext = () => {
      if (currentStep < 6) {
         handleNextStep()
         setCurrentStep((prev) => prev + 1)
      }
   }
   return (
      <div className="w-full h-full">
         <div className="px-[16px] ">
            <div>
               <div className="mt-8 bg-[#ffffff] rounded-md">
                  <StepHeader currentStep={1} />
               </div>
               <div className="mt-8 bg-[#ffffff] rounded-md p-8">
                  <div className="flex flex-col w-full">
                     <div className="relative flex flex-col gap-12 mb-8">
                        <SelectCustom
                           multiple
                           required
                           label="Industries"
                           collection={industryFramework}
                           placeholder="Ex: Business"
                           onChange={(e: any) => handleChange(e, 'industries')}
                           value={formData.industries}
                           name="industries"
                        />
                        <SelectCustom
                           required
                           label="Stage"
                           collection={stageFramework}
                           placeholder="Ex: Idea Stage"
                           onChange={(e: any) => handleChange(e, 'stage')}
                           value={formData.stage}
                           name="stage"
                        />
                     </div>
                     <div className="flex justify-end gap-6">
                        <ButtonGroup size="sm" variant="outline">
                           <Button
                              onClick={handlePrevStep}
                              isDisabled={currentStep === 0}
                              height={50}
                              className="mt-[14px] px-[28px] py-3 text-sm bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold "
                           >
                              BACK TO PREVIOUS STEP
                           </Button>
                           <Button
                              onClick={handleNext}
                              height={50}
                              isDisabled={currentStep === 6}
                              className="mt-[14px] px-[28px] py-3 text-sm bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold "
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

export default Stage
