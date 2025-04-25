import React, { useMemo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconlyBookmark, IconlyHeart, IconlyShow } from '../../../../../UI/Iconly'
import { Avatar, Button } from '@chakra-ui/react'
import { bookmarkTalents, updateTalentBookmarks } from 'states/modules/talent';
import { bookmarkTalent, getUserBookmarksStatus, getUserTalentBookmarks } from 'api/talent';
import { accessToTalent } from "api/activity";
import { useNavigate } from 'react-router-dom'

const BookmarkTalent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);


    const { talents = [], bookmarks = [], talentBookmarks = [] } = useSelector((state) => state.talent);


    useEffect(() => {
        setLoading(true);
        dispatch(getUserTalentBookmarks({}))
            .then(response => {
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            });
    }, [dispatch]);


    useEffect(() => {
        const storedBookmarks = JSON.parse(localStorage.getItem('bookmarkedTalents')) || [];
        dispatch(updateTalentBookmarks({ bookmarks: storedBookmarks }));
    }, [dispatch]);


    const bookmarkedTalents = useMemo(() => {

        if (talentBookmarks.length > 0) {
            return talentBookmarks;
        }


        return talents.filter((talent) =>
            bookmarks.some((bookmark) => bookmark.talent_id === talent._id)
        );
    }, [talents, bookmarks, talentBookmarks]);


    const handleBookmark = (talent) => {
        const isBookmarked = bookmarks.some((bookmark) => bookmark.talent_id === talent._id);
        const data = {
            talent_id: talent._id,
            marked: isBookmarked ? "no" : "yes",
        };

        dispatch(bookmarkTalent(data))
            .then(response => {



                dispatch(updateTalentBookmarks(data));


                const storedBookmarks = JSON.parse(localStorage.getItem('bookmarkedTalents')) || [];
                if (isBookmarked) {

                    const updatedBookmarks = storedBookmarks.filter((bookmark) => bookmark.talent_id !== talent._id);
                    localStorage.setItem('bookmarkedTalents', JSON.stringify(updatedBookmarks));
                } else {

                    storedBookmarks.push({ talent_id: talent._id });
                    localStorage.setItem('bookmarkedTalents', JSON.stringify(storedBookmarks));
                }


                dispatch(getUserTalentBookmarks({}));
            })
            .catch(error => {

            });
    };


    const handleViewTalentDetails = (user) => {
        dispatch(accessToTalent(user._id));
        navigate(`/talents/${user._id}/details`);
    };

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2f65b9]"></div>
                </div>
            ) : bookmarkedTalents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookmarkedTalents.map((talent) => (
                        <div key={talent.user._id || talent._id} className="relative group 2xl:w-[356px] h-[23.5rem]">
                            <Avatar.Root
                                onClick={() => handleViewTalentDetails(talent.user)}
                                className="w-[361px] h-[280px] rounded-md overflow-hidden cursor-pointer"
                                shape="square"
                            >
                                <Avatar.Fallback name={talent.user.name} />
                                <Avatar.Image src={talent.user.avatar} />
                            </Avatar.Root>


                            <div
                                className="absolute top-[15px] right-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                <ul className="flex flex-col gap-2 pl-0 m-0">
                                    <li className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center">
                                        <IconlyShow size={20} color={'#2f65b9'} />
                                    </li>
                                    <li className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center">
                                        <IconlyHeart size={20} color={'#2f65b9'} />
                                    </li>
                                    <li
                                        onClick={() => handleBookmark(talent)}
                                        className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center cursor-pointer"
                                    >
                                        <IconlyBookmark size={20} color="#FFD700" />
                                    </li>
                                </ul>
                            </div>


                            <div className="absolute bottom-[-40px] group-hover:bottom-[-21px] transition-all duration-700 ease-in-out w-[360px] p-4 bg-[#f6f4f4] flex flex-col items-center gap-3 rounded-b-md">
                                <div className="font-semibold text-black">{talent.user.name}</div>

                                <Button
                                    onClick={() => handleViewTalentDetails(talent.user)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-semibold text-xs bg-[#2f65b9] px-6 py-3 rounded-md"
                                >
                                    VIEW DETAILS
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-[#E3F1F6] pl-4 py-3 border-l-2 border-[#0098CB] w-full">
                    <p className="relative top-[0.6rem] text-[#1599CC]">
                        You have no saved talents.
                    </p>
                </div>
            )}
        </>
    );
}

export default BookmarkTalent;