import { Button } from '@chakra-ui/react'
import { getProfile, updateProfessionalProfile } from 'api/profile'
import { getExperienceLevelFramwork, getIndustryFramework } from 'api/user'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfileCard from '../ProfileCard'
import ProfileEditMenu from '../ProfileEditMenu'
import ActionBar from '../ActionBar'
import SelectCustom from 'components/UI/SelectCustom'
import { toaster } from 'components/UI/toaster'

const ProfessionalBackground = () => {
    const dispatch = useDispatch()
    // ========== STATE FROM REDUX STORE ========== //
    const { profile, isLoadingUpdateProfile } = useSelector((state) => state.profile)
    const { industryFramework, experienceLevelFramework } = useSelector((state) => state.user)
    // ========== STATE MANAGEMENT ========== //
    const [formData, setFormData] = useState({
        industries: [],
        experience_level: [],
    })
    // ========== USE EFFECT ========== //
    useEffect(() => {
        if (!profile) dispatch(getProfile())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    useEffect(() => {
        dispatch(getIndustryFramework())
        dispatch(getExperienceLevelFramwork())
    }, [dispatch])

    useEffect(() => {
        if (profile) {
            setFormData({
                ...formData,
                industries: profile?.industries?.map((industry) => industry._id),
                experience_level: [profile?.experience_level?._id],
            })
        }
        // eslint-disable-next-line
    }, [profile])

    // ========== HANDLE CHANGE FUNCTION ========== //
    const handleChange = (event, nameSelect) => {
        if (nameSelect === 'industries') {
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
        }
        setFormData({
            ...formData,
            [nameSelect]: event.value,
        })
    }

    const handleSaveChanges = () => {
        dispatch(
            updateProfessionalProfile({
                industry_ids: formData.industries,
                experience_level_id: formData.experience_level[0],
            })
        )
    }
    // ========== COMPONENT RENDER ========== //
    return (
        <div className="flex flex-col md:flex-row gap-8 w-full py-8 px-[16px]">
            <ProfileEditMenu />
            <div className="md:w-8/12 w-full">
                <div className="bg-[#ffffff] hidden md:block p-8 rounded-md">
                    {/* =========== Profile Card ========== */}
                    <ProfileCard />
                    {/* =========== Action Bar  ========== */}
                    <ActionBar />
                </div>
                <div className="bg-[#ffffff] p-8 rounded-md md:mt-8">
                    <div className="pb-[20px] mb-8 border-b-[1px] border-gray-200">
                        <div>
                            <h4 className="">Professional Background</h4>
                        </div>
                    </div>
                    <div>
                        <div className="px-[16px] flex flex-col gap-8">
                            <SelectCustom
                                multiple
                                required
                                label="Industry"
                                placeholder="Ex: Software Engineer"
                                collection={industryFramework}
                                onChange={(event) => handleChange(event, 'industries')}
                                canChange
                                value={formData.industries}
                            />
                            <SelectCustom
                                required
                                label="Experience Level"
                                placeholder="Ex: Entry Level"
                                collection={experienceLevelFramework}
                                onChange={(event) => handleChange(event, 'experience_level')}
                                canChange
                                value={formData.experience_level}
                            />
                            <div className="flex justify-end">
                                <div className="">
                                    <Button
                                        onClick={handleSaveChanges}
                                        height={50}
                                        className="mt-[14px] text-sm  px-[20px] sm:px-[28px] py-3 bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                                        borderRadius={4}
                                        loading={isLoadingUpdateProfile}
                                    >
                                        SAVE CHANGES
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfessionalBackground
