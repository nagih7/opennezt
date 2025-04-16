import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconlyBookmark, IconlyHeart, IconlyShow } from '../../../../../UI/Iconly'
import { Avatar, Button } from '@chakra-ui/react'
import { bookmarkTalent, updateTalentBookmarks } from '../../../../../../states/modules/talent';
import { accessToTalent } from "api/activity";
import { useNavigate } from 'react-router-dom'
const BookmarkTalent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { talents = [], bookmarks = [] } = useSelector((state) => state.talent);


    const bookmarkedTalents = useMemo(() => {
        return talents.filter((talent) =>
            bookmarks.some((bookmark) => bookmark.talent_id === talent._id)
        );
    }, [talents, bookmarks]);


    const handleBookmark = (talent) => {
        const isBookmarked = bookmarks.some((bookmark) => bookmark.talent_id === talent._id);
        const data = {
            talent_id: talent._id,
            marked: isBookmarked ? "no" : "yes",
        };
        dispatch(bookmarkTalent(data));
        dispatch(updateTalentBookmarks(data));
    };
    const isBookmarked = bookmarks.some(
        (bookmark) => bookmark.talent_id === talents._id
    )
    const handleViewTalentDetails = (user) => {
        dispatch(accessToTalent(user._id))
        navigate(`/talents/${user._id}/details`)
    }


    return <>
        {bookmarkedTalents.map((talent) => (
            <>
                <div className="relative">
                    <div className="relative group">
                        <Avatar.Root onClick={() => handleViewTalentDetails(talent.user)} className="w-[280px] h-[280px] rounded-md" shape="square">
                            <Avatar.Fallback name={talent.user.name} />
                            <Avatar.Image src={talent.user.avatar} />
                        </Avatar.Root>
                        <div
                            className="absolute top-[15px] right-[15px] fade-element"
                            style={{
                                opacity: 0,
                                transition: 'opacity 0.7s ease-in-out',
                            }}
                        >
                            <ul className="flex flex-col gap-2 pl-0 m-0">
                                <li className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center">
                                    <IconlyShow size={20} color={'#2f65b9'} />
                                </li>
                                <li className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center">
                                    <IconlyHeart size={20} color={'#2f65b9'} />
                                </li>
                                <li onClick={handleBookmark} className="h-10 w-10 bg-[#ffffff] rounded-md flex justify-center items-center">
                                    <IconlyBookmark size={20} color={isBookmarked ? "#FFD700" : '#2f65b9'} />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="absolute bottom-[-40px] group-hover:bottom-[-21px] group-hover:translate-x-0 translate-x-full transition-all duration-700 ease-in-out w-[280px] p-[16px] bg-[#f6f4f4] flex flex-col justify-center items-center gap-2">

                        <div className="font-semibold text-black no-underline">{talent.user.name}</div>

                        <div
                            className="mt-[16px] fade-element"
                            style={{
                                opacity: 0,
                                transition: 'opacity 0.3s ease-in-out',
                            }}
                        >
                            <Button onClick={() => handleViewTalentDetails(talent.user)} className="no-underline text-white font-semibold text-xs bg-[#2f65b9] px-[24px] py-[12px] rounded-md">
                                VIEW DETAILS
                            </Button>
                        </div>
                    </div>
                </div>

            </>
        ))}
    </>

}
export default BookmarkTalent;