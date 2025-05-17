import React, { useEffect, useState } from 'react'
import ProfessionalProfile from './components/ProfessionalProfile'
import { Image } from '@chakra-ui/react'
import ProfileOverview from './components/ProfileOverview'
import { useParams } from 'react-router-dom'
import { getTalentDetails } from 'api/talent'
import { OPENNEZT_BG_BLACK } from 'utils/constants'
import { useAppDispatch, useAppSelector } from 'store/hooks'

const TalentDetails: React.FC = () => {
    const params = useParams()
    const dispatch = useAppDispatch()
    const { id } = params

    // ========== STATE FROM REDUX  ========== //
    const { talentDetails } = useAppSelector((state) => state.talent)

    // ========== STATE  ========== //
    const [imageError, setImageError] = useState<boolean>(false)

    // ========== USE EFFECT  ========== //
    useEffect(() => {
        if (id) {
            dispatch(getTalentDetails(id))
        }
    }, [dispatch, id])

    // ========== AUTO SCROLL TO TOP  ========== //
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    // ========== RENDER  ========== //
    return (
        <div className="relative bg-[#ffffff] w-full max-h-full mb-8">
            {!imageError ? (
                <Image
                    className="h-[400px] object-cover bg-cover bg-center"
                    src={talentDetails?.user?.background}
                    aspectRatio={16 / 9}
                    width="100%"
                    onError={() => setImageError(true)}
                />
            ) : (
                <Image
                    className="h-[400px] object-cover bg-cover bg-center"
                    aspectRatio={16 / 9}
                    src={OPENNEZT_BG_BLACK}
                    alt="OpenNezt"
                    width="100%"
                />
            )}
            <div className="absolute w-full top-[275px] px-[16px]">
                <ProfileOverview 
                    user={talentDetails?.user} 
                    friendRequest={talentDetails?.friend_request} 
                />
                <ProfessionalProfile profile={talentDetails} />
            </div>
        </div>
    )
}

export default TalentDetails
