import { Image } from '@chakra-ui/react';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { OPENNEZT_BG_BLACK } from 'utils/constants';
import { accessToProject } from '../../../../../../api/activity';
import { bookmarkProject, getUserProjectBookmarks } from 'api/project';
import { updateBookmarks } from 'states/modules/project';
import { IconlyBookmark } from '../../../../../UI/Iconly';
import { Button } from 'antd';

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
            ) : bookmarkedProjects.length > 0 ? (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookmarkedProjects.map((project) => (

                        <div onClick={() => handleViewProjectDetails(project)} key={project._id} className="relative group 2xl:w-[356px] h-[23.5rem] bg-white rounded-md shadow-md overflow-hidden cursor-pointer">

                            <div

                                className="w-full h-[170px] overflow-hidden "
                            >
                                <Image
                                    src={project.background || OPENNEZT_BG_BLACK}
                                    alt={project.name}
                                    className="w-full h-full object-cover transition-transform duration-500 transform origin-center ease-out group-hover:scale-110"
                                    fallbackSrc={OPENNEZT_BG_BLACK}
                                />
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white transition-all duration-300 ease-in-out h-[calc(23.5rem-170px)] flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center mb-1 justify-between">
                                        <p className="bg-[#EAEFF8] p-1 rounded-sm text-[#737F92] text-xs md:text-[0.85rem] font-semibold">
                                            {project.stage?.name || 'N/A'}
                                        </p>
                                        <p className="text-xs font-semibold md:text-sm">
                                            By{' '}
                                            <span className="font-semibold text-blue-600">
                                                {project.user?.name || 'N/A'}
                                            </span>
                                        </p>
                                    </div>
                                    <h5

                                        className="text-sm font-semibold text-gray-900 mt-1 mb-2 leading-snug cursor-pointer hover:text-[#2f65b9] line-clamp-2"
                                        title={project.name}
                                    >
                                        {project.name}
                                    </h5>
                                    <div className="flex items-center justify-between mt-3 text-xs text-gray-600 md:text-sm">
                                        <p className="text-xs text-nowrap">
                                            📖 {project.articles || 0} Posts
                                        </p>
                                        <p className="text-xs text-nowrap">
                                            👨‍🎓 {project.members || 0} Members
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (

                <div className="bg-[#E3F1F6] pl-4 py-3 border-l-2 border-[#0098CB] w-full absolute ">
                    <p className="relative top-[0.6rem] text-[#1599CC]">
                        You have no saved projects.
                    </p>
                </div>
            )}
        </>
    );
};

export default BookmarkProject;