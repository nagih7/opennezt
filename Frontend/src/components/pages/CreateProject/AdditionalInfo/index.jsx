import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StepHeader from '../StepHeader'
import { useDispatch, useSelector } from 'react-redux'
import { onChangeFormCreateProject } from 'states/modules/project'
import TextAreaCustom from 'components/UI/TextAreaCustom'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { PROJECT_ADDITIONAL_INFO_FIELDS } from 'utils/constants/additionalInfor'

const AdditionalInfo = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // ========== STATE FROM REDUX ========== //
    const { formCreateProject } = useSelector((state) => state.project)
    // Lấy ngôn ngữ từ state Redux (cần điều chỉnh theo cấu trúc thực tế của app)
    const { language } = useSelector((state) => state.app) || { language: 'EN' }

    // Chọn danh sách trường dựa trên ngôn ngữ
    const fields = PROJECT_ADDITIONAL_INFO_FIELDS[language] || PROJECT_ADDITIONAL_INFO_FIELDS.EN

    // ========== STATE ========== //
    const [formData, setFormData] = useState([{ name: '', content: '' }])
    const [currentStep, setCurrentStep] = useState(4)
    const [projectFormData, setProjectFormData] = useState({})

    // ========== USEEFFECT ========== //
    useEffect(() => {
        if (formCreateProject.name === '') {
            navigate('/project/details')
        }
        // Initialize form data with default structure if empty
        const initialData = {}
        fields.forEach((field) => {
            initialData[field.id] = ''
        })
        setProjectFormData(initialData)
    }, [navigate, formCreateProject.name, fields])

    useEffect(() => {
        if (formCreateProject.additional_infos?.length > 0) {
            setFormData(formCreateProject.additional_infos)

            // Map existing data to the form fields
            const mappedData = {}
            formCreateProject.additional_infos.forEach((item) => {
                const matchingField = fields.find((field) => field.name === item.name)
                if (matchingField) {
                    mappedData[matchingField.id] = item.content
                }
            })
            setProjectFormData((prev) => ({ ...prev, ...mappedData }))
        }
    }, [formCreateProject, fields])

    // Sửa các hàm khác để sử dụng fields thay vì PROJECT_ADDITIONAL_INFO_FIELDS
    const handlePreviousStep = () => {
        // Prepare data from fields
        const fieldData = []
        fields.forEach((field) => {
            console.log('Field ID:', field)
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

    const handleNextStep = async () => {
        // Prepare data from fields
        const fieldData = []
        fields.forEach((field) => {
            console.log('Field ID:', field)
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

    const handleChangeField = (e) => {
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
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="text-xl font-semibold">Additional Information</h4>
                                        <p className="text-gray-600 text-sm mt-1">
                                            <strong className="font-medium">
                                                Note: max 500 characters for each field
                                            </strong>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Structured form fields */}
                            <div className="border rounded-md overflow-hidden mb-6">
                                <table className="w-full">
                                    <tbody>
                                        {fields.map((field, index) => (
                                            <tr key={field.id}>
                                                <td
                                                    className={`p-4 ${
                                                        index < fields.length - 1 ? 'border-b border-gray-200' : ''
                                                    } ${field.backgroundColor}`}
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
