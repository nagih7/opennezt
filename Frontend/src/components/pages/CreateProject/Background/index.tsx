import React, { useEffect, useState } from 'react'
import StepHeader from '../StepHeader'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { onChangeFormCreateProject } from 'store/modules/project'
import { createNewProject } from 'api/project'
import resizeBackground from 'utils/files/resizeBackground'
import { Button, ButtonGroup } from '@chakra-ui/react'

interface Revenue {
   [key: string]: any
}
interface FundingSource {
   [key: string]: any
}
interface AdditionalInfo {
   [key: string]: any
}
interface FormCreateProject {
   name: string
   description: string
   industries: string[]
   stage: string[]
   revenues: Revenue[]
   funding_sources: FundingSource[]
   additional_infos: AdditionalInfo[]
   logo?: File
   background?: File
}
interface RootState {
   project: {
      formCreateProject: FormCreateProject
      isLoadingCreateNewProject: boolean
   }
}

const CoverImage: React.FC = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   // ========== STATE FROM REDUX ========== //
   const { formCreateProject, isLoadingCreateNewProject } = useSelector((state: RootState) => state.project)
   // ========== STATE ========== //
   const [bgURL, setBgURL] = useState<string>('')
   const [bgFile, setBgFile] = useState<File | null>(null)
   // ========== USEEFFECT ========== //
   useEffect(() => {
      if (formCreateProject.name === '') {
         navigate('/project/details')
      }
   }, [navigate, formCreateProject.name])
   const [currentStep, setCurrentStep] = useState<number>(6)
   useEffect(() => {
      if (formCreateProject.background) {
         setBgFile(formCreateProject.background)
         setBgURL(URL.createObjectURL(formCreateProject.background))
      }
   }, [formCreateProject])

   // ========== ONCHANGE FUNCTION ========== //
   const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
      // Check if the file is an image
      const file = event.target.files?.[0]
      if (!file) return

      const background = await resizeBackground(file)
      setBgFile(background)
      setBgURL(URL.createObjectURL(background))
      dispatch(onChangeFormCreateProject({ background: background }))
   }

   const handleConfirmCreateProject = (): void => {
      const formData = new FormData()
      formData.append('name', formCreateProject.name)
      formData.append('description', formCreateProject.description)
      formData.append('industries', JSON.stringify(formCreateProject.industries))
      formData.append('stage', formCreateProject.stage[0])
      formData.append(
         'revenues',
         JSON.stringify(
            formCreateProject.revenues
               .map((revenue) => {
                  let valid = true
                  Object.keys(revenue).forEach((key) => {
                     if (
                        revenue[key] === '' ||
                        revenue[key] === null ||
                        revenue[key] === undefined ||
                        revenue[key].length === 0
                     ) {
                        valid = false
                     }
                  })
                  if (valid) {
                     return {
                        ...revenue,
                        currency: revenue.currency[0],
                     }
                  }
                  return null
               })
               .filter((item) => item !== null)
         )
      )
      formData.append(
         'funding_sources',
         JSON.stringify(
            formCreateProject.funding_sources
               .map((source) => {
                  let valid = true
                  Object.keys(source).forEach((key) => {
                     if (
                        source[key] === '' ||
                        source[key] === null ||
                        source[key] === undefined ||
                        source[key]?.length === 0
                     ) {
                        valid = false
                     }
                  })
                  if (valid) {
                     return {
                        ...source,
                        name: source.name[0],
                        currency: source.currency[0],
                     }
                  }
                  return null
               })
               .filter((item) => item !== null)
         )
      )
      formData.append(
         'additional_infos',
         JSON.stringify(
            formCreateProject.additional_infos
               .map((info) => {
                  let valid = true
                  Object.keys(info).forEach((key) => {
                     if (info[key] === '' || info[key] === null || info[key] === undefined || info[key].length === 0) {
                        valid = false
                     }
                  })
                  if (valid) {
                     return {
                        ...info,
                        name: info.name,
                     }
                  }
                  return null
               })
               .filter((item) => item !== null)
         )
      )
      if (formCreateProject.logo) formData.append('logo', formCreateProject.logo)
      if (formCreateProject.background) formData.append('background', formCreateProject.background)

      dispatch(createNewProject(formData))
   }
   const handlePrevStep = (): void => {
      navigate('/project/logo')
      if (currentStep > 0) {
         setCurrentStep((prev) => prev - 1)
      }
   }

   return (
      <div className="w-full h-full">
         <div className="px-[16px] ">
            <div>
               <div className="mt-8 bg-[#ffffff] rounded-md">
                  <StepHeader currentStep={6} />
               </div>
               <div className="mt-8 bg-[#ffffff] rounded-md p-8">
                  <div className="flex flex-col w-full">
                     <div>
                        <p className="my-[16px] text-[#6f7f92]">
                           The Cover Image will be used to customize the header of your project.
                        </p>
                        <div className="bg-[#f8f9fa] rounded-md">
                           <div className="px-[24px] py-[24px]">
                              <div>
                                 <div className="p-10 border-dashed border-[#6f7f9266] border-3">
                                    <div className="flex flex-col items-center justify-center py-10">
                                       {/* Hiển thị ảnh nếu đã chọn, nếu không thì hiển thị text */}
                                       {!bgURL ? (
                                          <>
                                             <p className="mb-[5px] font-medium">Drop your file here</p>
                                             <p className="mb-[5px] text-[#6f7f92] font-medium">or</p>
                                          </>
                                       ) : (
                                          <div className="text-center">
                                             <img
                                                src={bgURL}
                                                alt="Selected Preview"
                                                className="mt-2 rounded-md mb-[16px]"
                                                style={{
                                                   maxWidth: '100%',
                                                   maxHeight: '100%',
                                                   objectFit: 'cover',
                                                }}
                                             />
                                          </div>
                                       )}
                                       <div className="text-center">
                                          {/* Input file */}
                                          <input
                                             type="file"
                                             accept="image/*"
                                             id="fileInput"
                                             className="hidden"
                                             onChange={handleFileChange}
                                          />
                                          <label
                                             htmlFor="fileInput"
                                             className="px-[24px] py-[11px] cursor-pointer text-sm bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                                          >
                                             SELECT YOUR FILE
                                          </label>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="my-[16px]">
                           <p className="border-l-2 border-[#f14646] font-medium text-sm text-[#f14646] rounded-r-md bg-[#f8eaea] p-[15px]">
                              For better results, make sure to upload an image that is larger than 0px wide, and 225px
                              tall.
                           </p>
                        </div>
                     </div>
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
                              isLoading={isLoadingCreateNewProject}
                              loadingText="Creating..."
                              onClick={handleConfirmCreateProject}
                              height={50}
                              className="mt-[14px] px-[28px] py-3 text-sm bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                           >
                              CREATE PROJECT
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

export default CoverImage
