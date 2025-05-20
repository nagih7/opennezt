import React from 'react'
import { useSelector } from 'react-redux'
import PaginationCustom from 'components/UI/PaginationCustom'
import { recruitTalents } from 'api/talent'
import TalentBox from './TalentBox'
import { accessToTalent } from 'api/activity'
import { useNavigate } from 'react-router-dom'
import { User, PaginationData, FormRecruitTalents } from '../../types'
import { useAppDispatch } from '~/store/hooks'

interface PageData {
    page: number;
    pageSize: number;
}

interface RootState {
    talent: {
        talents: Array<{
            user: User;
        }>;
        formRecruitTalents: FormRecruitTalents;
        paginationRecruitTalents: PaginationData;
    };
}

const ListTalents: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    
    const { talents, formRecruitTalents, paginationRecruitTalents } = useSelector((state: RootState) => state.talent)

    const onPageChange = (pageData: PageData) => {
        dispatch(
            recruitTalents({
                ...formRecruitTalents,
                page: pageData.page,
                perPage: pageData.pageSize,
            })
        )
    }

    const handleViewTalentDetails = (user: User) => {
        dispatch(accessToTalent(user._id))
        navigate(`/talents/${user._id}/details`)
    }

    return (
        <div className="container flex w-full flex-col items-center justify-center gap-10 md:gap-20 py-8 mx-auto">
            <div className="grid lg:w-full w-fit lg:grid-cols-3 grid-cols-1 md:grid-cols-2 sm:gap-6 md:gap-8 lg:gap-3 gap-8">
                {talents?.map((talent, index) => (
                    <div
                        key={index}
                        className="relative group h-[380px] cursor-pointer"
                        onMouseEnter={(e) => {
                            const children = e.currentTarget.querySelectorAll('.fade-element')
                            children.forEach((child) => ((child as HTMLElement).style.opacity = '1'))
                        }}
                        onMouseLeave={(e) => {
                            const children = e.currentTarget.querySelectorAll('.fade-element')
                            children.forEach((child) => ((child as HTMLElement).style.opacity = '0'))
                        }}
                    >
                        <TalentBox handleViewTalentDetails={handleViewTalentDetails} talent={talent} />
                    </div>
                ))}
            </div>
            <PaginationCustom pagination={paginationRecruitTalents} onPageChange={onPageChange} />
        </div>
    )
}

export default ListTalents 