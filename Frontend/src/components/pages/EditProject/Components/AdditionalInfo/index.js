import React, { useEffect, useState } from 'react'
import { Button, createListCollection } from '@chakra-ui/react'
import ActionBar from '../../../EditProfile/components/ActionBar'
import ProjectEditMenu from '../ProjectEditMenu'
import ProjectCard from '../ProjectCard'
import { useDispatch, useSelector } from 'react-redux'
import { IconlyDelete } from 'components/UI/Iconly'
import { useParams } from 'react-router-dom'
import SelectCustom from 'components/UI/SelectCustom'
import { PlusOutlined } from '@ant-design/icons'
import { PROJECT_ADDITIONAL_INFO } from 'utils/constants'
import TextAreaCustom from 'components/UI/TextAreaCustom'
import { toaster } from 'components/UI/toaster'
import { updateProjectAdditionalInfos } from 'api/project'

const projectAdditionalInfoFramework = createListCollection({
    items: PROJECT_ADDITIONAL_INFO['EN'],
})

const EditAdditionalInfo = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const { id } = params

    // ========== STATE FROM REDUX STORE ========== //
    const { myProjectDetails, isLoadingUpdateMyProject } = useSelector((state) => state.project)
    const project = myProjectDetails

    // ========== STATE ========== //
    const [formData, setFormData] = useState([])
    // ========== USEEFFECT ========== //

    useEffect(() => {
        if (project) {
            setFormData(
                project.additional_infos?.map((item) => {
                    return {
                        name: item.name,
                        content: item.content,
                    }
                })
            )
        }
        // eslint-disable-next-line
    }, [project])

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

    const handleAddProjectAdditionalInfo = () => {
        // VERIFY
        if (formData.some((item) => !item.name || !item.content)) {
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

    const handleSaveChanges = () => {
        dispatch(
            updateProjectAdditionalInfos(id, {
                additional_infos: formData.map((item) => {
                    return {
                        name: item.name[0],
                        content: item.content,
                    }
                }),
            })
        )
    }
    // ========== COMPONENT RENDER ========== //
    return (
        <div className="flex gap-8 w-full py-8 px-[16px]">
            <ProjectEditMenu />
            <div className="w-8/12">
                <div className="bg-[#ffffff] p-8 rounded-md">
                    {/* =========== Profile Card ========== */}
                    <ProjectCard />
                    {/* =========== Action Bar  ========== */}
                    <ActionBar />
                </div>
                <div className="bg-[#ffffff] p-8 rounded-md mt-8">
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
                                    placeholder="Ex: ..."
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

export default EditAdditionalInfo
