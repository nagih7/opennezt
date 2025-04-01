import React, { useState } from 'react'
import { Button } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { addProjectRequirement } from 'api/project'
import SelectCustom from 'components/UI/SelectCustom'
import { getSkillFramework, getSubCategoryFramework } from 'api/user'

const SkillRequirement = () => {
    const dispatch = useDispatch()
    // ========== STATE FROM REDUX STORE  ========== //
    const { isLoadingCreateProjectRequirement, myProjectDetails } = useSelector((state) => state.project)

    const { categoryFramework, subCategoryFramework, skillFramework } = useSelector((state) => state.user)

    // ========== STATE  ========== //
    const [formData, setFormData] = useState({
        categories: [],
        subcategories: [],
        skills: [],
    })

    // ========== HANDLE CHANGE  ========== //
    const handleChange = (event, nameSelect) => {
        if (nameSelect) {
            setFormData({ ...formData, [nameSelect]: event.value })
        }
        switch (nameSelect) {
            case 'categories':
                setFormData((prev) => ({ ...prev, subcategories: [] }))
                dispatch(getSubCategoryFramework(event.value))
                break
            case 'subcategories':
                setFormData((prev) => ({ ...prev, skills: [] }))
                dispatch(getSkillFramework(event.value))
                break
            default:
                break
        }
    }

    const handleSaveProjectRequirement = () => {
        dispatch(addProjectRequirement(id, updatedFormData))
    }

    // ========= RENDER  ========== //
    return (
        <div className="flex flex-col gap-4 mb-8">
            <div className="relative">
                <SelectCustom
                    multiple
                    label="Category"
                    collection={categoryFramework}
                    onChange={(e) => handleChange(e, 'categories')}
                    value={formData.categories}
                    name="category"
                />
            </div>
            <div className="relative">
                <SelectCustom
                    multiple
                    label="Sub Category"
                    collection={subCategoryFramework}
                    onChange={(e) => handleChange(e, 'subcategories')}
                    value={formData.subcategories}
                    name="subcategories"
                />
            </div>
            <div className="relative">
                <SelectCustom
                    multiple
                    label="Skill"
                    collection={skillFramework}
                    onChange={(e) => handleChange(e, 'skills')}
                    value={formData.skills}
                    name="skills"
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

export default SkillRequirement
