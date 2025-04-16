import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PaginationCustom from 'components/UI/PaginationCustom'
import { recruitTalents } from 'api/talent'
import TalentBox from './TalentBox'
import { accessToTalent } from 'api/activity'
import { useNavigate } from 'react-router-dom'

const ListTalents = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // ========== STATE FROM REDUX ========== //
    const { talents, formRecruitTalents, paginationRecruitTalents } = useSelector((state) => state.talent)

    // ========== HANDLE FUNCTION ========== //
    const onPageChange = (pageData) => {
        dispatch(
            recruitTalents({
                ...formRecruitTalents,
                page: pageData.page,
                perPage: pageData.pageSize,
            })
        )
    }

    const handleViewTalentDetails = (user) => {
        dispatch(accessToTalent(user._id))
        navigate(`/talents/${user._id}/details`)
    }

    // ========== RENDER COMPONENT ========== //
    return (
        <div className="container flex w-full flex-col items-center justify-center gap-10 md:gap-20 py-8 mx-auto">
            <div className="grid w-full lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 sm:gap-6 md:gap-8">
                {talents?.map((talent, index) => (
                    <div
                        key={index}
                        onClick={() => handleViewTalentDetails(talent.user)}
                        className="relative group h-[380px] cursor-pointer"
                        onMouseEnter={(e) => {
                            const children = e.currentTarget.querySelectorAll('.fade-element')
                            children.forEach((child) => (child.style.opacity = 1))
                        }}
                        onMouseLeave={(e) => {
                            const children = e.currentTarget.querySelectorAll('.fade-element')
                            children.forEach((child) => (child.style.opacity = 0))
                        }}
                    >
                        <TalentBox talent={talent} />
                    </div>
                ))}
            </div>
            <PaginationCustom pagination={paginationRecruitTalents} onPageChange={onPageChange} />
        </div>
    )
}

export default ListTalents
