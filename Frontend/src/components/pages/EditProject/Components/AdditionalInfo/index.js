import React, { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react'
import ActionBar from '../../../EditProfile/components/ActionBar'
import ProjectEditMenu from '../ProjectEditMenu'
import ProjectCard from '../ProjectCard'
import { useDispatch, useSelector } from 'react-redux'
import { IconlyDelete, IconlyEdit, IconlyDocument } from 'components/UI/Iconly'
import { useParams } from 'react-router-dom'
import TextAreaCustom from 'components/UI/TextAreaCustom'
import { toaster } from 'components/UI/toaster'
import { updateProjectAdditionalInfos } from 'api/project'
import { postProjectDetailsActivitiesAdditionalInfo } from 'api/activity'
import { PROJECT_ADDITIONAL_INFO_FIELDS } from 'utils/constants/additionalInfor'

const EditAdditionalInfo = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const { id } = params

    // ========== STATE FROM REDUX STORE ========== //
    const { myProjectDetails, isLoadingUpdateMyProject } = useSelector((state) => state.project)
    const { language } = useSelector((state) => state.app) || { language: 'EN' }
    const project = myProjectDetails

    // Chọn danh sách trường dựa trên ngôn ngữ
    const fields = PROJECT_ADDITIONAL_INFO_FIELDS[language] || PROJECT_ADDITIONAL_INFO_FIELDS.EN

    // ========== STATE ========== //
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [projectFormData, setProjectFormData] = useState({})

    // ========== USEEFFECT ========== //
    useEffect(() => {
        // Kiểm tra xem project và additional_infos có tồn tại không
        if (project) {
            console.log('Project data:', project) // Thêm log để kiểm tra

            // Initialize form data with default structure
            const initialData = {}
            fields.forEach((field) => {
                initialData[field.id] = ''
            })

            // Fill in data from project if available
            if (project.additional_infos && project.additional_infos.length > 0) {
                console.log('Project additional_infos:', project.additional_infos) // Thêm log để kiểm tra

                project.additional_infos.forEach((item) => {
                    // Kiểm tra khớp giữa tên field trong additional_infos và trong fields
                    // Lưu ý: có thể cần so sánh cả name và value
                    const matchingField = fields.find(
                        (field) => field.name === item.name || field.value === item.name || field.name === item.value
                    )

                    if (matchingField) {
                        initialData[matchingField.id] = item.content
                        console.log(`Matched field ${matchingField.id} with value ${item.content}`)
                    } else {
                        console.log(`No match found for field: ${item.name}`)
                    }
                })
            }

            console.log('Initial form data:', initialData) // Thêm log để kiểm tra
            setProjectFormData(initialData)
        }
    }, [project, fields])

    // ========== HANDLE FUNCTIONS ========== //
    const handleChange = (e) => {
        if (!isEditing) return

        const { name, value } = e.target
        setProjectFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const toggleEdit = () => {
        setIsEditing(!isEditing)
    }

    const handleSaveChanges = async () => {
        setIsSaving(true)

        // Prepare data from fields
        const fieldData = []
        fields.forEach((field) => {
            if (projectFormData[field.id]) {
                fieldData.push({
                    name: field.name,
                    content: projectFormData[field.id],
                })
            }
        })

        try {
            // Update project additional info
            await dispatch(
                updateProjectAdditionalInfos(id, {
                    additional_infos: fieldData,
                })
            )

            // Post activity log
            await postProjectDetailsActivitiesAdditionalInfo(id, {
                additional_infos: fieldData,
            })

            toaster.create({
                title: `Successfully updated additional information`,
                type: 'success',
            })

            setIsEditing(false)
        } catch (error) {
            toaster.create({
                title: `Failed to update additional information`,
                type: 'error',
            })
        } finally {
            setIsSaving(false)
        }
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
                    <div className="pb-[20px] mb-8 border-b-[1px] border-gray-200">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-xl font-semibold">Additional Information</h4>
                                <p className="text-gray-600 text-sm mt-1">
                                    <strong className="font-medium">Note: max 500 characters for each field</strong>
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
                                            <div className="flex justify-between items-center mb-2">
                                                <label htmlFor={field.id} className="font-medium text-gray-700">
                                                    {field.name}
                                                </label>
                                                {!isEditing && index === 0 && (
                                                    <Button
                                                        onClick={toggleEdit}
                                                        className="bg-[#2f65b9] text-white px-3 py-1 rounded-md"
                                                        size="sm"
                                                    >
                                                        <IconlyEdit size={18} color="#ffffff" />
                                                    </Button>
                                                )}
                                            </div>
                                            <TextAreaCustom
                                                id={field.id}
                                                resize="none"
                                                placeholder={field.placeholder}
                                                name={field.id}
                                                onChange={handleChange}
                                                value={projectFormData[field.id] || ''}
                                                rows={4}
                                                disabled={!isEditing}
                                                nomax={true}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {isEditing && (
                        <div className="flex justify-end mt-4 space-x-3">
                            <Button onClick={toggleEdit} className="bg-gray-400 text-white px-6 py-2 rounded-md">
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSaveChanges}
                                isLoading={isSaving || isLoadingUpdateMyProject}
                                className="bg-[#2f65b9] text-white px-6 py-2 rounded-md"
                                loadingText="Saving..."
                                spinnerPlacement="start"
                            >
                                <IconlyDocument size={18} color="#ffffff" className="mr-2" /> Save Changes
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EditAdditionalInfo
