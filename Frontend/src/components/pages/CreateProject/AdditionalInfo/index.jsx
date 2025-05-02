import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons'
import StepHeader from '../StepHeader'
import { IconlyDelete } from 'components/UI/Iconly'
import { useDispatch, useSelector } from 'react-redux'
import { onChangeFormCreateProject } from 'states/modules/project'
import { createListCollection } from '@chakra-ui/react'
import { PROJECT_ADDITIONAL_INFO } from 'utils/constants'
import SelectCustom from 'components/UI/SelectCustom'
import { toaster } from 'components/UI/toaster'
import TextAreaCustom from 'components/UI/TextAreaCustom'

const projectAdditionalInfoFramework = createListCollection({
    items: PROJECT_ADDITIONAL_INFO['EN'],
})

const AdditionalInfo = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // ========== STATE FROM REDUX ========== //
    const { formCreateProject } = useSelector((state) => state.project)

    // ========== STATE ========== //
    const [formData, setFormData] = useState([{ name: '', content: '' }])
    // ========== USEEFFECT ========== //
    useEffect(() => {
        if (formCreateProject.name === '') {
            navigate('/project/details')
        }
        // ========== CLEANUP FUNCTION ========== //
    }, [navigate, formCreateProject.name])

    useEffect(() => {
        setFormData(formCreateProject.additional_infos)
    }, [formCreateProject])

    // ========== ONCHANGE FUNCTION ========== //
    const handleChange = (e, index, nameSelect) => {
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
        dispatch(onChangeFormCreateProject({ additional_infos: formData }))
        navigate('/project/funding-sources')
    }

    const handleNextStep = async () => {
        dispatch(onChangeFormCreateProject({ additional_infos: formData }))
        navigate('/project/logo')
    }

    const handleAddProjectAdditionalInfo = () => {
        // VERIFY
        if (formData.some((item) => !item.name || !item.amount || !item.currency)) {
            toaster.create({
                title: `Please fill all fields.`,
                type: 'error',
            })
            return
        }
        setFormData([...formData, { name: '', content: '' }])
    }

    const handleRemoveForm = (index) => {
        const newForm = formData.filter((_, i) => i !== index)
        setFormData(newForm)
    }

    // ========== COMPONENT RENDER ========== //
    return (
        <div className="w-full h-full">
            <div className="px-[16px] ">
                <div>
                    <div className="mt-8 bg-[#ffffff] rounded-md">
                        <StepHeader />
                    </div>
                    <div className="mt-8 bg-[#ffffff] rounded-md p-8">
                        <div className="flex flex-col w-full">
                            <div className="flex justify-end">
                                <div
                                    className="flex items-center gap-1 cursor-pointer bg-[#2f65b9] rounded-md text-[#ffffff] px-[20px] py-2 mb-[14px]"
                                    onClick={handleAddProjectAdditionalInfo}
                                >
                                    <PlusOutlined className="text-[#ffffff]" />
                                    <button
                                        height={50}
                                        className="text-xs bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                                    >
                                        ADD ADDITIONAL INFO
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
                                            label="Title"
                                            placeholder="Ex: Project summary"
                                            collection={projectAdditionalInfoFramework}
                                        />
                                        <TextAreaCustom
                                            onChange={(e) => handleChange(e, index)}
                                            value={formData[index].content}
                                            name="content"
                                            required
                                            label="Content"
                                            placeholder="Ex: Project summary"
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
                                <button
                                    onClick={handlePreviousStep}
                                    height={50}
                                    className="mt-[14px] px-[28px] py-3 text-sm bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold "
                                >
                                    BACK TO PREVIOUS STEP
                                </button>
                                <button
                                    onClick={handleNextStep}
                                    height={50}
                                    className="mt-[14px] px-[28px] py-3 text-sm bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                                >
                                    NEXT STEP
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdditionalInfo
