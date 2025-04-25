import React from 'react'
import { IconlyArrowRight2, IconlyTimeSquare } from 'components/UI/Iconly'

const InterviewHeader = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-1 text-[#6f7f92] font-semibold">
                Interviews
                <IconlyArrowRight2 size={18} color={'#6f7f92'} />
                <span className="text-[#000000]">Consulting</span>
            </div>
            <span className="text-2xl font-semibold 2xl:text-3xl">Growth Hacker</span>
            <div className="items-center hidden gap-2 2xl:flex">
                <div className="flex items-center gap-1 px-2 py-1 border rounded-md">
                    <IconlyTimeSquare size={20} color={'#000000'} />
                    30m
                </div>
                <span className="text-[#6f7f92] font-semibold">Plan and strategize a product launch</span>
            </div>
        </div>
    )
}

export default InterviewHeader
