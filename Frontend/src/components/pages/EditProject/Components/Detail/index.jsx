import React, { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react'
import ActionBar from '../../../EditProfile/components/ActionBar'
import ProjectEditMenu from '../ProjectEditMenu'
import ProjectCard from '../ProjectCard'
import { useDispatch, useSelector } from 'react-redux'
import InputCustom from 'components/UI/InputCustom'
import TextAreaCustom from 'components/UI/TextAreaCustom'
import { getMyProjectDetails, updateProjectBasic } from 'api/project'
import { useParams } from 'react-router-dom'
import { postProjectDetailsActivitiesBasic } from 'api/activity'

const EditDetail = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const { id } = params

    // ========== STATE FROM REDUX STORE ========== //
    const { myProjectDetails, isLoadingUpdateMyProject } = useSelector((state) => state.project)
    const project = myProjectDetails

    // ========== STATE MANAGEMENT ========== //
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    })

    // ========== USE EFFECT ========== //

    useEffect(() => {
        if (!project || project?._id !== id) {
            dispatch(getMyProjectDetails(id))
        }
        // eslint-disable-next-line
    }, [dispatch, id])

    useEffect(() => {
        if (project) {
            setFormData({
                name: project?.name,
                description: project?.description,
            })
        }
        // eslint-disable-next-line
    }, [project])

    // ========== HANDLE CHANGE FUNCTION ========== //
    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }
    const handleSaveChanges = async () => {
        dispatch(
            updateProjectBasic(id, {
                name: formData.name,
                description: formData.description,
            })
        )
        await postProjectDetailsActivitiesBasic(id, formData)
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
                        <div>
                            <h4 className=""> Detail</h4>
                        </div>
                    </div>
                    <div className="px-[16px] flex flex-col gap-8">
                        <InputCustom
                            change
                            onChange={handleChange}
                            value={formData.name}
                            name="name"
                            required
                            label="Name"
                            placeholder="Ex: Project Name"
                        />
                        <TextAreaCustom
                            onChange={handleChange}
                            value={formData.description}
                            name="description"
                            type="areas"
                            label="Description"
                            placeholder="Ex: Project Description"
                        />

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
        </div>
    )
}

export default EditDetail
