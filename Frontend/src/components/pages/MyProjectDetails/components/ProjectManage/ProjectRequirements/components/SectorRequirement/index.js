import React, { useState } from 'react'
import { Button } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { addProjectRequirement } from 'api/project'
import SelectCustom from 'components/UI/SelectCustom'

const SectorRequirement = () => {
    const dispatch = useDispatch()
    // ========== STATE FROM REDUX STORE  ========== //
    const { isLoadingCreateProjectRequirement, myProjectDetails } = useSelector((state) => state.project)

    const { industryFramework, experienceLevelFramework } = useSelector((state) => state.user)

    // ========== STATE  ========== //
    const [formData, setFormData] = useState({
        industries: [],
        experienceLevel: [],
    })

    // ========== HANDLE CHANGE  ========== //
    const handleChange = (event, nameSelect) => {
        if (nameSelect) {
            setFormData({ ...formData, [nameSelect]: event.value })
        }
    }

    const handleSaveProjectRequirement = () => {
        dispatch(addProjectRequirement(id, formData))
    }

    // ========= RENDER  ========== //
    return (
        <div className="flex flex-col gap-4 mb-8">
            <div className="relative">
                <SelectCustom
                    multiple
                    label="Industries"
                    collection={industryFramework}
                    onChange={(e) => handleChange(e, 'industries')}
                    value={formData.industries}
                    name="industries"
                />
            </div>
            <div className="relative">
                <SelectCustom
                    label="Experience Level"
                    collection={experienceLevelFramework}
                    onChange={(e) => handleChange(e, 'experienceLevel')}
                    value={formData.experienceLevel}
                    name="experienceLevel"
                />
            </div>
            <div className="flex justify-end">
                <Button
                    height={50}
                    className=" text-sm px-[28px] bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                    borderRadius={4}
                    loading={isLoadingCreateProjectRequirement}
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
