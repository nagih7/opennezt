import { Image } from '@chakra-ui/react';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { OPENNEZT_BG_BLACK } from 'utils/constants';
import { accessToProject } from '../../../../../../api/activity';
import { bookmarkProject, getUserProjectBookmarks } from 'api/project';
import { updateBookmarks } from 'states/modules/project';
import { IconlyBookmark } from '../../../../../UI/Iconly';

const BookmarkProject = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // Thêm state loading
    const [loading, setLoading] = useState(true);

    // ========== STATE FROM REDUX STORE ========== //

    const { projectsBySeek, bookmarks, projectBookmarks = [] } = useSelector((state) => state.project);


    useEffect(() => {
        setLoading(true);

        dispatch(getUserProjectBookmarks({}))
            .then(response => {

                setLoading(false);
            })
            .catch(error => {

                setLoading(false);
            });
    }, [dispatch]);


    useEffect(() => {
        const storedBookmarks = JSON.parse(localStorage.getItem('bookmarkedProjects')) || [];
        dispatch(updateBookmarks({ bookmarks: storedBookmarks }));
    }, [dispatch]);



    const bookmarkedProjects = useMemo(() => {

        if (projectBookmarks.length > 0) {

            return projectBookmarks;
        }


        return projectsBySeek.filter((project) =>
            bookmarks.some((bookmark) => bookmark.project_id === project._id)
        );
    }, [projectsBySeek, bookmarks, projectBookmarks]);

    // ========== STATE ========== //
    const [imageError, setImageError] = useState(false);

    // ========== HANDLE FUNCTION ========== //
    const handleViewProjectDetails = useCallback(
        (project) => {
            dispatch(accessToProject(project._id))
            navigate(`/projects/${project._id}/details`)
        },
        [dispatch, navigate]
    )





    // ========== RENDER ========== //
    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2f65b9]"></div>
                </div>
            ) : (
                <ul className='p-0'>
                    {bookmarkedProjects.length > 0 ? (<>
                        {bookmarkedProjects.map((project) => (
                            <li
                                key={project._id}
                                onClick={() => handleViewProjectDetails(project)}
                                className="overflow-hidden rounded-sm cursor-pointer group mt-4"
                            >
                                <div className="bg-white flex items-center p-4 2xl:w-[70rem] w-full">
                                    <div className="relative w-[16rem] h-[10rem] rounded-md overflow-hidden group">
                                        {!imageError ? (
                                            <Image
                                                aspectRatio={16 / 9}
                                                className="object-cover absolute w-[16rem] h-full !transition-transform !duration-500 !transform !origin-center !ease-out !group-hover:scale-110"
                                                src={project.background}
                                                alt={project.name}
                                                onError={() => setImageError(true)}
                                            />
                                        ) : (
                                            <Image
                                                aspectRatio={16 / 9}
                                                src={OPENNEZT_BG_BLACK}
                                                alt={project.name}
                                            />
                                        )}
                                    </div>

                                    <div className="flex flex-col justify-center ml-4">
                                        <div className="flex">
                                            <p className="bg-[#EAEFF8] p-1 rounded-sm text-[#737F92] text-xs md:text-[0.85rem] font-semibold mr-4">
                                                {project.stage.name}
                                            </p>
                                            <p className="text-xs font-semibold md:text-sm">
                                                By{' '}
                                                <span className="font-semibold text-blue-600">
                                                    {project.user.name}
                                                </span>
                                            </p>
                                        </div>

                                        <h5 className="text-base md:text-[0.95rem] font-semibold text-gray-900 mt-2 whitespace-normal break-words leading-[1.3rem]">
                                            {project.name}
                                        </h5>
                                        <div className="flex items-center mt-3 text-xs text-gray-600 md:text-sm">
                                            <p className="mr-4 text-xs text-nowrap">
                                                📖 {project.articles?.length} Posts
                                            </p>
                                            <p className="text-xs text-nowrap">
                                                👨‍🎓 {project.members.length} Members
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </>) : (<>
                        <div className="bg-[#E3F1F6] pl-4 py-3 border-l-2 border-[#0098CB] w-full absolute ">
                            <p className="relative top-[0.6rem] text-[#1599CC]">
                                You have no saved projects.
                            </p>
                        </div>
                    </>)}

                </ul>
            )}
        </>
    );
};

export default BookmarkProject;