import React, { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react'
import ActionBar from '../../../EditProfile/components/ActionBar'
import ProjectEditMenu from '../ProjectEditMenu'
import ProjectCard from '../ProjectCard'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateProjectLogo } from 'api/project'
import resizeLogo from 'utils/files/resizeLogo'
import { postProjectDetailsActivitiesLogo } from 'api/activity'

const EditLogo = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const { id } = params
    // ========== STATE FROM REDUX STORE ========== //
    const { myProjectDetails, isLoadingUpdateMyProject } = useSelector((state) => state.project)
    const project = myProjectDetails
    // ========== STATE ========== //
    const [logoURL, setLogoURL] = useState('')
    const [logoFile, setLogoFile] = useState(null)
    // ========== USEEFFECT ========== //

    useEffect(() => {
        if (project) {
            setLogoURL(project?.logo)
        }
        // eslint-disable-next-line
    }, [project])

    // ========== ONCHANGE FUNCTION ========== //
    const handleFileChange = async (event) => {
        // Check if the file is an image
        const file = event.target.files?.[0]
        if (!file) return

        const logo = await resizeLogo(file)
        setLogoFile(logo)
        setLogoURL(URL.createObjectURL(logo))
    }

    const handleSaveChanges = async () => {
        const formData = new FormData()
        formData.append('logo', logoFile)
        await dispatch(updateProjectLogo(id, formData))
        await dispatch(postProjectDetailsActivitiesLogo(id, formData))
    }

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
                            <h4 className=""> Logo</h4>
                        </div>
                    </div>
                    <div>
                        <div className="bg-[#f8f9fa] rounded-t-md mt-8">
                            <ul className="flex text-sm mb-0 px-[24px] pt-[24px] pb-[16px]">
                                <li className="pr-[24px] text-[#2f65b9] font-medium">Upload</li>
                                <li className="pr-[24px] text-[#6f7f92] font-medium">Delete</li>
                            </ul>
                        </div>
                        <div className="bg-[#f8f9fa] rounded-b-md">
                            <div className="px-[24px] pb-[24px]">
                                <div className="p-10 border-dashed border-[#6f7f9266] border-3 ">
                                    <div className="flex flex-col items-center justify-center gap-12 py-10">
                                        {!logoURL ? (
                                            <>
                                                <p className="mb-[5px] font-medium">Drop your file here</p>
                                                <p className="mb-[5px] text-[#6f7f92] font-medium">or</p>
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center w-full p-0 space-y-4">
                                                {logoURL && (
                                                    <div className="relative flex justify-center w-full gap-4">
                                                        <div className="overflow-hidden w-[400px] h-[400px] relative flex justify-center items-center">
                                                            <img
                                                                src={logoURL}
                                                                alt="Preview"
                                                                className="bg-center bg-no-repeat bg-cover"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        <div className="text-center">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                id="fileInput"
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />
                                            <label
                                                htmlFor="fileInput"
                                                className="px-[24px] py-[11px] cursor-pointer text-sm bg-[#2f65b9] rounded-md text-[#ffffff] font-semibold"
                                            >
                                                SELECT YOUR FILE
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-[16px] flex justify-end">
                            <div className="">
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
        </div>
    )
}

export default EditLogo
