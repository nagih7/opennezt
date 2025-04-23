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
        {bookmarkedTalents.length > 0 ? (<>
            {bookmarkedTalents.map((talent) => (
                <div key={talent.user.id} className="relative group 2xl:w-[356px] h-[23.5rem] ">
                    <Avatar.Root
                        onClick={() => handleViewTalentDetails(talent.user)}
                        className="w-[361px] h-[280px] rounded-md overflow-hidden cursor-pointer"
                        shape="square"
                    >
                        <Avatar.Fallback name={talent.user.name} />
                        <Avatar.Image src={talent.user.avatar} />
                    </Avatar.Root>



                    {/* Info + View Details */}
                    <div className="absolute bottom-[-40px] group-hover:bottom-[-21px] transition-all duration-700 ease-in-out w-[360px] p-4  flex flex-col items-center gap-3 rounded-b-md">
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
        </>) : (<>
            <div className="bg-[#E3F1F6] pl-4 py-3 border-l-2 border-[#0098CB] w-full absolute ">
                <p className="relative top-[0.6rem] text-[#1599CC]">
                    You have no saved talents.
                </p>
            </div>
        </>)}


    </>

}
export default BookmarkTalent;