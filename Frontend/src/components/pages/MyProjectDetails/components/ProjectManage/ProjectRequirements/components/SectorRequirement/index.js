import React, { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import SelectCustom from 'components/UI/SelectCustom'
import { updateSectorRequirement } from 'api/project'
import { getExperienceLevelFramwork, getIndustryFramework } from 'api/user'
import { postProjectDetailsActivitiesProjectRequirement } from 'api/activity'

const SectorRequirement = () => {
    const dispatch = useDispatch()
    // ========== STATE FROM REDUX STORE  ========== //
    const { myProjectDetails, isLoadingUpdateSectorRequirement } = useSelector((state) => state.project)
    const { industryFramework, experienceLevelFramework } = useSelector((state) => state.user)

    // ========== STATE  ========== //
    const [formData, setFormData] = useState({
        industries: [],
        experienceLevels: [],
    })

    // ========== EFFECTS  ========== //
    useEffect(() => {
        if (myProjectDetails?.requirements?.industry_ids.length > 0) {
            setFormData((prev) => ({
                ...prev,
                industries: myProjectDetails?.requirements?.industry_ids,
            }))
        }
        if (myProjectDetails?.requirements?.experience_level_ids.length > 0) {
            setFormData((prev) => ({
                ...prev,
                experienceLevels: myProjectDetails?.requirements?.experience_level_ids,
            }))
        }
    }, [myProjectDetails])

    useEffect(() => {
        if (industryFramework.items?.length === 0) dispatch(getIndustryFramework())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])
    useEffect(() => {
        if (experienceLevelFramework.items?.length === 0) dispatch(getExperienceLevelFramwork())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    // ========== HANDLE CHANGE  ========== //
    const handleChange = (event, nameSelect) => {
        if (nameSelect) {
            setFormData({ ...formData, [nameSelect]: event.value })
        }
    }

    const handleSaveProjectRequirement = () => {
        dispatch(updateSectorRequirement(myProjectDetails._id, formData))
        dispatch(postProjectDetailsActivitiesProjectRequirement(myProjectDetails._id))
    }

    // ========= RENDER  ========== //
    return (
        <div className="flex flex-col gap-4 mt-8 mb-4">
            <div className="relative">
                <SelectCustom
                    multiple
                    label="Industries"
                    collection={industryFramework}
                    onChange={(e) => handleChange(e, 'industries')}
                    value={formData.industries}
                />
            </div>
            <div className="relative">
                <SelectCustom
                    multiple
                    label="Experience Level"
                    collection={experienceLevelFramework}
                    onChange={(e) => handleChange(e, 'experienceLevels')}
                    value={formData.experienceLevels}
                />
            </div>
            <div className="flex justify-end">
                <Button
                    height={50}
                    className=" text-sm px-[28px] bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                    borderRadius={4}
                    loading={isLoadingUpdateSectorRequirement}
                    loadingText="Loading..."
                    spinnerPlacement="start"
                    onClick={handleSaveProjectRequirement}
                >
                    SAVE CHANGES
                </Button>
            </div>
        </div>
    )
}

export default SectorRequirement
