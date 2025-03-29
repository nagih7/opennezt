import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfessionalProfile from './components/ProfessionalProfile';
import { Image } from '@chakra-ui/react';
import ProfileOverview from './components/ProfileOverview';
import { useParams } from 'react-router-dom';
import { getTalentDetails } from 'api/talent';
import { OPENNEZT_BG_BLACK } from 'utils/constants';

const TalentDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { id } = params;

    // ========== STATE FROM REDUX  ========== //
    const { talentDetails } = useSelector((state) => state.talent);

    // ========== STATE  ========== //
    const [imageError, setImageError] = useState(false);

    // ========== USE EFFECT  ========== //
    useEffect(() => {
        dispatch(getTalentDetails(id));
    }, [dispatch, id]);

    // ========== AUTO SCROLL TO TOP  ========== //
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // ========== RENDER  ========== //
    return (
        <div className="relative bg-[#ffffff] w-full max-h-full mb-8">
            {!imageError ? (
                <Image
                    className="h-[400px] object-cover bg-cover bg-center"
                    src={talentDetails?.user?.background}
                    aspectRatio={16 / 9}
                    width="100%"
                    onError={setImageError(true)}
                />
            ) : (
                <div className="h-[400px] flex items-center justify-center bg-gray-200 pb-10 px-10 user-select-none">
                    <Image src={OPENNEZT_BG_BLACK} alt="OpenNezt" />
                </div>
            )}
            <div className="absolute w-full top-[275px] px-[16px]">
                <ProfileOverview
                    user={talentDetails?.user}
                    isFriendRequested={talentDetails?.is_friend_requested}
                />
                <ProfessionalProfile profile={talentDetails} />
            </div>
        </div>
    );
};

export default TalentDetails;
