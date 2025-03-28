import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfessionalProfile from './components/ProfessionalProfile';
import { Image } from '@chakra-ui/react';
import ProfileOverview from './components/ProfileOverview';
import { useParams } from 'react-router-dom';
import { getTalentDetails } from 'api/talent';

const TalentDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { id } = params;

    // ========== STATE FROM REDUX  ========== //
    const { talentDetails } = useSelector((state) => state.talent);

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
            <Image
                className="h-[400px] object-cover"
                src={talentDetails?.user?.background}
                onError={(e) => {
                    e.target.src = 'https://wallpapercave.com/uwp/uwp4261619.png';
                }}
                aspectRatio={16 / 9}
                width={'100%'}
            />
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
