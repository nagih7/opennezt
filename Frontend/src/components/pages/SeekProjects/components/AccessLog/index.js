import { Image } from '@chakra-ui/react';
import { getMyProjectAccess } from 'api/activity';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { OPENNEZT_LOGO } from 'utils/constants';

const AccessLog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // ========== STATE FROM REDUX ========== //
    const projectAccess = useSelector((state) => state.activity.myProjectAccess);
    // ========== STATE ========== //
    const [imageError, setImageError] = React.useState(false);
    // ========== USE EFFECT ========== //
    useEffect(() => {
        if (projectAccess.length === 0) dispatch(getMyProjectAccess());
        // eslint-disable-next-line
    }, [dispatch]);
    // ========== HANDLE FUNCTION ========== //

    const handleViewProjectDetails = (project) => {
        navigate(`/projects/${project._id}/details`);
    };

    // ========== RENDER COMPONENT ========== //
    return (
        <div className="w-4/12 2xl:w-[23.25rem] bg-white p-4 rounded-md shadow-sm h-fit">
            <h3 className="text-lg font-semibold mb-4 border-b border-[#DEDEDE] pb-4">
                Recent Project
            </h3>
            <ul className="space-y-4">
                {projectAccess.map((access, index) => (
                    <li
                        onClick={() => handleViewProjectDetails(access.project)}
                        key={index}
                        className="flex items-center gap-3 relative left-[-1.75rem] cursor-pointer"
                    >
                        {console.log(access)}
                        {!imageError ? (
                            <Image
                                className="relative w-[4.5rem] h-[4.5rem] rounded-md object-cover top-[-1.25rem]"
                                src={access.project.background}
                                alt={access.project.name}
                                aspectRatio={4 / 4}
                                objectFit="cover"
                                onError={setImageError(true)}
                            />
                        ) : (
                            <div className="relative w-[4.5rem] h-[4.5rem] rounded-md bg-[#EAEFF8] flex items-center justify-center p-2">
                                <Image
                                    src={OPENNEZT_LOGO}
                                    alt={access.project.name}
                                    objectFit="cover"
                                />
                            </div>
                        )}
                        <div>
                            <p className="text-sm font-semibold">{access.project.name}</p>
                            <p className={`text-xs relative top-[-0.75rem]`}>
                                {moment(access.createdAt).fromNow()}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AccessLog;
