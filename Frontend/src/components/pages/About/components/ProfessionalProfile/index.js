import { getAccessToMyProfile } from 'api/activity'
import RightSidebar from 'components/common/RightSidebar'
import { IconlyEditSquare } from 'components/UI/Iconly'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const action = () => {
    return <div>has accessed your profile.</div>
}

const ProfessionalProfile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // ========== STATE FROM REDUX STORE ========== //
    const { profile } = useSelector((state) => state.profile)
    const { accessToMyProfile } = useSelector((state) => state.activity)

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'
        const date = new Date(dateString)
        return `${date.getMonth() + 1}/${date.getFullYear()}`
    }

    const groupedSkills =
        profile?.skills?.reduce((acc, skill) => {
            let key = skill.category.name
            if (!acc[key]) {
                acc[key] = {
                    category: skill.category,
                    skills: [],
                }
            }
            acc[key].skills.push({
                name: skill.name,
                description: skill.description,
                _id: skill._id,
            })
            return acc
        }, {}) || {}

    const result = Object.values(groupedSkills)

    // ========== USE EFFECT ========== //
    useEffect(() => {
        if (accessToMyProfile?.length === 0) dispatch(getAccessToMyProfile())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex gap-8">
            <div className="w-10/12">
                <div className="bg-[#ffffff] rounded-md">
                    <div className="flex items-center justify-between border-b-[1px] border-[#f4f5f6] p-8">
                        <h5 className="mb-0">Professional Background</h5>
                        <span
                            onClick={() => navigate('/about/edit-profile/professional-background')}
                            className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md cursor-pointer"
                        >
                            <IconlyEditSquare size={20} color={'#ffffff'} />
                        </span>
                    </div>
                    <div className="p-8">
                        <ul className="grid grid-cols-2 p-0 mb-0 mx-[-16px] text-[#6f7f92]">
                            <li className="px-[16px] mb-10">
                                <div className="mb-2 text-sm font-medium">INDUSTRY</div>
                                <div>
                                    <p className="mb-2 text-base font-medium text-black line-clamp-3">
                                        {profile?.industries?.map((industry) => industry.name).join(', ') || 'N/A'}
                                    </p>
                                </div>
                            </li>
                            <li className="px-[16px] mb-10">
                                <div className="mb-2 text-sm font-medium">EXPERIENCE LEVEL</div>
                                <div>
                                    <p className="mb-2 text-base font-medium text-black">
                                        {profile?.experience_level?.name || 'N/A'}
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bg-[#ffffff] rounded-md mt-8">
                    <div className="flex items-center justify-between border-b-[1px] border-[#f4f5f6] p-8">
                        <h5 className="mb-0">Eduaction</h5>
                        <span
                            onClick={() => navigate('/about/edit-profile/educations')}
                            className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md cursor-pointer"
                        >
                            <IconlyEditSquare size={20} color={'#ffffff'} />
                        </span>
                    </div>
                    <div className="p-8">
                        <ul className=" p-0 mb-0 mx-[-16px] text-[#6f7f92]">
                            <li className="px-[16px] mb-10 ">
                                <div className="">
                                    <p className="mb-2 text-base font-medium text-black">
                                        {profile?.educations?.length > 0 ? (
                                            profile.educations.map((education, index) => (
                                                <div
                                                    key={index}
                                                    className="p-3  rounded-lg  mt-2 mr-1 shadow rounded-[0.6rem]"
                                                >
                                                    <h4 className="font-semibold">{education.school || 'N/A'}</h4>
                                                    <p>Degree: {education.degree || 'N/A'}</p>
                                                    <p>Field of Study: {education.field_of_study || 'N/A'}</p>
                                                    <p>
                                                        Years: {formatDate(education.start_date || 'N/A')} -{' '}
                                                        {formatDate(education.end_date || 'N/A')}
                                                    </p>
                                                    <p>Grade: {education.grade || 'N/A'}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500">No education information available.</p>
                                        )}
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bg-[#ffffff] rounded-md mt-8">
                    <div className="flex items-center justify-between border-b-[1px] border-[#f4f5f6] p-8">
                        <h5 className="mb-0">Certification</h5>
                        <span
                            onClick={() => navigate('/about/edit-profile/certifications')}
                            className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md cursor-pointer"
                        >
                            <IconlyEditSquare size={20} color={'#ffffff'} />
                        </span>
                    </div>
                    <div className="p-8">
                        <ul className=" p-0 mb-0 mx-[-16px] text-[#6f7f92]">
                            <li className="px-[16px] mb-10">
                                <div>
                                    <p className="mb-2 text-base font-medium text-black">
                                        {profile?.certifications?.length > 0 ? (
                                            profile.certifications.map((certification, index) => (
                                                <div
                                                    key={index}
                                                    className="p-3  rounded-lg  mt-2 mr-1 shadow rounded-[0.6rem]"
                                                >
                                                    <h4 className="font-semibold">{certification.name || 'N/A'}</h4>
                                                    <p>
                                                        Certificate Expiration:{' '}
                                                        {formatDate(certification.issue_date || 'N/A')}
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500">No education information available.</p>
                                        )}
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bg-[#ffffff] rounded-md mt-8">
                    <div className="flex items-center justify-between border-b-[1px] border-[#f4f5f6] p-8">
                        <h5 className="mb-0">Expertise</h5>
                        <span
                            onClick={() => navigate('/about/edit-profile/skills')}
                            className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md cursor-pointer"
                        >
                            <IconlyEditSquare size={20} color={'#ffffff'} />
                        </span>
                    </div>
                    <div className="p-8">
                        {result?.length > 0 ? (
                            <ul className="grid grid-cols-2 p-0 mb-0 mx-[-16px] text-[#6f7f92]">
                                {result?.map((re, idx) => (
                                    <li className="px-[16px] mb-10" key={idx}>
                                        <div className="mb-2 text-sm font-medium uppercase">{re?.category?.name}</div>
                                        <div>
                                            <p className="mb-2 text-base font-medium text-black">
                                                {re?.skills?.map((skill) => skill?.name).join(', ') || 'N/A'}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="p-8 text-[#6f7f92]">No expertise added yet</div>
                        )}
                    </div>
                </div>
                <div className="bg-[#ffffff] rounded-md mt-8">
                    <div className="flex items-center justify-between border-b-[1px] border-[#f4f5f6] p-8">
                        <h5 className="mb-0">More </h5>
                        <span
                            onClick={() => navigate('/about/edit-profile/more')}
                            className="bg-[#4374c0] w-7 h-7 flex items-center justify-center rounded-md cursor-pointer"
                        >
                            <IconlyEditSquare size={20} color={'#ffffff'} />
                        </span>
                    </div>
                    <div className="p-8">
                        {profile?.additional_infos?.length > 0 ? (
                            <ul className=" p-0 mb-0 mx-[-16px] text-[#6f7f92]">
                                {profile?.additional_infos?.map((info, idx) => (
                                    <li className="px-[16px] mb-10" key={idx}>
                                        <div className="mb-2 text-sm font-medium uppercase">{info?.name}</div>
                                        <div>
                                            <p className="mb-2 text-base font-medium text-black line-clamp-3">
                                                {info?.content}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="p-8 text-[#6f7f92]">No additional information added yet</div>
                        )}
                    </div>
                </div>
            </div>
            <RightSidebar activities={accessToMyProfile} action={action} />
        </div>
    )
}

export default ProfessionalProfile
