import React, { useEffect, useState } from 'react'
import StepHeader from '../StepHeader'
import { useDispatch, useSelector } from 'react-redux'
import { onChangeFormCreateProject } from 'states/modules/project'
import { useNavigate } from 'react-router-dom'
import resizeLogo from 'utils/files/resizeLogo'

const Logo = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // ========== STATE FROM REDUX ========== //
    const { formCreateProject } = useSelector((state) => state.project)
    // ========== STATE ========== //
    const [logoURL, setLogoURL] = useState('')
    const [logoFile, setLogoFile] = useState(null)
    // ========== USEEFFECT ========== //
    useEffect(() => {
        if (formCreateProject.name === '') {
            navigate('/project/details')
        }
        // ========== CLEANUP FUNCTION ========== //
    }, [navigate, formCreateProject.name])

    useEffect(() => {
        if (formCreateProject.logo) {
            setLogoFile(formCreateProject.logo)
            setLogoURL(URL.createObjectURL(formCreateProject.logo))
        }
    }, [formCreateProject])

    // ========== ONCHANGE FUNCTION ========== //
    const handleFileChange = async (event) => {
        // Check if the file is an image
        const file = event.target.files?.[0]
        if (!file) return

        const logo = await resizeLogo(file)
        setLogoFile(logo)
        setLogoURL(URL.createObjectURL(logo))
        dispatch(onChangeFormCreateProject({ logo: logo }))
    }

    const handleNextStep = () => {
        navigate('/project/background')
    }

    return (
        <div className="w-full h-full px-[16px]">
            <div>
                <div className="mt-8 bg-[#ffffff] rounded-md">
                    <StepHeader />
                </div>
                <div className="mt-8 bg-[#ffffff] rounded-md p-8">
                    <div className="flex flex-col w-full">
                        <div className="flex gap-3">
                            {/* <div>
								<img
									src={img_logo_project}
									alt=""
									className="w-[150px] h-[150px] rounded-md"
								/>
							</div> */}
                            <div className="text-[#6f7f92]">
                                <p className="my-[16px]">
                                    Upload an image to use as a profile logo for this project. The image will be shown
                                    on the main group page, and in search results.
                                </p>
                                <p>To skip the group profile logo upload process, hit the Next Step button.</p>
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
                                    <div>
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
                                                                        // ref={imageRef}
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
                            </div>
                        </div>
                        <div className="flex justify-end gap-6">
                            <button
                                onClick={() => navigate('/project/additional-info')}
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
    )
}

export default Logo
