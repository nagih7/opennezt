import { getMyProjectAccess } from 'api/activity'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AccessBox from './AccessBox/Index'

const AccessLog = () => {
    const dispatch = useDispatch()
    // ========== STATE FROM REDUX ========== //
    const projectAccess = useSelector((state) => state.activity.myProjectAccess)

    // ========== USE EFFECT ========== //
    useEffect(() => {
        if (projectAccess.length === 0) dispatch(getMyProjectAccess())
        // eslint-disable-next-line
    }, [dispatch])
    // ========== RENDER COMPONENT ========== //
    return (
        <div className="w-4/12 bg-white p-4 rounded-md shadow-sm h-fit">
            <h3 className="text-lg font-semiboldmb-4 border-b border-[#DEDEDE] pb-4">Recent Project</h3>
            <div className="flex flex-col gap-4">
                {projectAccess.map((access, index) => (
                    <AccessBox access={access} key={index} />
                ))}
            </div>
        </div>
    )
}

export default AccessLog
