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
            <div key={talent.user.id} className="relative group w-[343px] h-[23.5rem]">
                <Avatar.Root
                    onClick={() => handleViewTalentDetails(talent.user)}
                    className="w-[280px] h-[280px] rounded-md overflow-hidden cursor-pointer"
                    shape="square"
                >
                    <Avatar.Fallback name={talent.user.name} />
                    <Avatar.Image src={talent.user.avatar} />
                </Avatar.Root>

                {/* Action Icons */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col gap-2">
                    <button className="h-10 w-10 bg-white rounded-md flex justify-center items-center shadow">
                        <IconlyShow size={20} color="#2f65b9" />
                    </button>
                    <button className="h-10 w-10 bg-white rounded-md flex justify-center items-center shadow">
                        <IconlyHeart size={20} color="#2f65b9" />
                    </button>
                    <button
                        onClick={() => handleBookmark(talent.user)}
                        className="h-10 w-10 bg-white rounded-md flex justify-center items-center shadow"
                    >
                        <IconlyBookmark size={20} color={isBookmarked ? "#FFD700" : "#2f65b9"} />
                    </button>
                </div>

                {/* Info + View Details */}
                <div className="absolute bottom-[-40px] group-hover:bottom-[-21px] transition-all duration-700 ease-in-out w-[280px] p-4 bg-[#f6f4f4] flex flex-col items-center gap-3 rounded-b-md">
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

    </>

}
export default BookmarkTalent;