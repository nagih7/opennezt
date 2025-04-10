import React, { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react'
import ActionBar from '../../../EditProfile/components/ActionBar'
import ProjectEditMenu from '../ProjectEditMenu'
import ProjectCard from '../ProjectCard'
import SelectCustom from 'components/UI/SelectCustom'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getMyProjectDetails, updateProjectSector } from 'api/project'
import { getIndustryFramework, getStageFramework } from 'api/user'
import { toaster } from 'components/UI/toaster'
import { postProjectDetailsActivitiesSector } from 'api/activity'

const EditStage = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const { id } = params

    // ========== STATE FROM REDUX STORE ========== //
    const { myProjectDetails, isLoadingUpdateMyProject } = useSelector((state) => state.project)
    const { industryFramework, stageFramework } = useSelector((state) => state.user)
    const project = myProjectDetails

    // ========== STATE MANAGEMENT ========== //
    const [formData, setFormData] = useState({
        industries: [],
        stage: [],
    })

    // ========== USE EFFECT ========== //
    useEffect(() => {
        if (!project || project?.id !== id) {
            dispatch(getMyProjectDetails(id))
        }
        // eslint-disable-next-line
    }, [dispatch, id])

    useEffect(() => {
        if (project) {
            setFormData({
                industries: project?.industries?.map((item) => item._id),
                stage: [project?.stage?._id],
            })
        }
        // eslint-disable-next-line
    }, [project])

    useEffect(() => {
        if (!industryFramework.length) dispatch(getIndustryFramework())
        // eslint-disable-next-line
    }, [dispatch])

    useEffect(() => {
        if (!stageFramework.length) dispatch(getStageFramework())
        // eslint-disable-next-line
    }, [dispatch])

    // ========== HANDLE CHANGE FUNCTION ========== //
    const handleChange = (event, nameSelect) => {
        if (formData.industries.length > 2) {
            setFormData({
                ...formData,
                industries: formData.industries.slice(0, 2),
            })
        }
        if (event.value.length > 2) {
            toaster.create({
                type: 'error',
                title: 'You can only select up to 2 industries',
            })
            return
        }
        if (nameSelect) {
            setFormData({ ...formData, [nameSelect]: event.value })
        }
    }
    const handleSaveChanges = async () => {
        await dispatch(
            updateProjectSector(id, {
                industries: formData.industries,
                stage: formData.stage[0],
            })
        )
        await dispatch(
            postProjectDetailsActivitiesSector(id, {
                industries: formData.industries,
                stage: formData.stage[0],
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
                    <div className="pb-[20px] mb-8 border-b-[1px] border-gray-200 flex justify-between">
                        <div>
                            <h4 className=""> Sector</h4>
                        </div>
                    </div>
                    <div className="px-[16px] flex flex-col gap-8">
                        <SelectCustom
                            multiple
                            required
                            label="Industries"
                            collection={industryFramework}
                            placeholder="Ex: Business"
                            onChange={(e) => handleChange(e, 'industries')}
                            value={formData.industries}
                            name="industries"
                        />
                        <SelectCustom
                            required
                            label="Stage"
                            collection={stageFramework}
                            placeholder="Ex: Idea Stage"
                            onChange={(e) => handleChange(e, 'stage')}
                            value={formData.stage}
                            name="stage"
                        />
                        <div className="px-[16px] flex justify-end">
                            <div className="">
                                <Button
                                    height={50}
                                    className="mt-[14px] px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                                    borderRadius={4}
                                    loading={isLoadingUpdateMyProject}
                                    loadingText="Loading..."
                                    spinnerPlacement="start"
                                    onClick={handleSaveChanges}
                                >
                                    SAVE CHANGES
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditStage
