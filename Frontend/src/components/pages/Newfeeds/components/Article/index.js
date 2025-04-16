import React, { forwardRef, useState, useRef, useEffect } from 'react'
import { CheckCircleFilled } from '@ant-design/icons'
import { IconlyBookmark, IconlyDelete, IconlyMoreCircle } from 'components/UI/Iconly'
import avt from 'assets/images/background/avt.jpg'
import { IconlyChat } from 'components/UI/Iconly'
import { IconlyHeart } from 'components/UI/Iconly'
import { IconlySend } from 'components/UI/Iconly'
import { IconlyEdit } from 'components/UI/Iconly'
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'
import { Button, Avatar } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Article = forwardRef(
    ({ feed, reaction, onReaction, isLoading, onSelect, onEdit, onDelete, onBookmark, bookmark }, ref) => {
        const { _id, user, project, content, reaction_count, created_at, comment_count } = feed

        const navigate = useNavigate()
        const displayReaction = () => {
            if (reaction == 'like') {
                return (
                    <div onClick={() => handleReactionClick('like')} style={{ cursor: 'pointer' }}>
                        <IconlyHeart size={25} color={'red'} backgroundColor={'red'} />
                    </div>
                )
            }
            if (reaction == undefined) {
                return (
                    <div onClick={() => handleReactionClick('like')} style={{ cursor: 'pointer' }}>
                        <IconlyHeart size={25} color={'#6f7f92'} />
                    </div>
                )
            }
        }

        const handleReactionClick = (type) => {
            if (isLoading) return
            const data = new FormData()
            data.append('type', type)
            data.append('target_type', 'article')
            onReaction(_id, data)
        }

        const handleSetClick = () => {
            onSelect(feed)
        }

        const handleEdit = () => {
            handleClickMore()
            onEdit(feed)
        }

        const [isConfirmDelete, setIsConfirmDelete] = useState(false)

        const handleClickDelete = () => {
            setIsConfirmDelete(!isConfirmDelete)
        }

        const handleDelete = async () => {
            onDelete(_id)
        }

        //
        const [isShowMore, setIsShowMore] = useState(false)
        const handleClickMore = () => {
            setIsShowMore(!isShowMore)
        }
        const dropdownRef = useRef(null)

        useEffect(() => {
            const handleClickOutside = (event) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setIsShowMore(false)
                }
            }

            document.addEventListener('mousedown', handleClickOutside)
            return () => {
                document.removeEventListener('mousedown', handleClickOutside)
            }
        }, [])

        //==================================================================================================
        //Posted Date Logic
        //==================================================================================================
        const postedAt = new Date(created_at)
        const postedDate = postedAt.toDateString()
        const today = new Date()
        const day = differenceInDays(today, postedAt)
        const hour = differenceInHours(today, postedAt) % 24
        const minute = differenceInMinutes(today, postedAt) % 60
        const second = differenceInSeconds(today, postedAt) % 60
        //==================================================================================================
        //End of Posted Date Logic
        //==================================================================================================

        const handleBookmark = (data) => {
            onBookmark(data)
        }

        const displayBookmark = () => {
            if (bookmark === 'yes') {
                return (
                    <div
                        className="flex items-start pr-4 mt-2 text-2xl"
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                            handleBookmark({
                                article_id: feed?._id,
                                marked: 'no',
                            })
                        }
                    >
                        <IconlyBookmark size={25} color={'#6f7f92'} backgroundColor={'#6f7f92'} />
                    </div>
                )
            }
            if (bookmark === 'no' || bookmark === undefined) {
                return (
                    <div
                        className="flex items-start pr-4 mt-2 text-2xl"
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                            handleBookmark({
                                article_id: feed?._id,
                                marked: 'yes',
                            })
                        }
                    >
                        <IconlyBookmark size={25} color={'#6f7f92'} />
                    </div>
                )
            }
        }

        const authUser = useSelector((state) => state.auth.authUser)

        const verifyAction = () => {
            if (authUser?._id === user[0]?._id) {
                return (
                    <div
                        className="flex text-2xl items-start pr-4"
                        style={{ cursor: 'pointer' }}
                        onClick={handleClickMore}
                    >
                        ...
                    </div>
                )
            }
        }

        const handleViewTalentDetails = (user) => {
            navigate(`/talents/${user?._id}/details`)
        }

        const [isModalOpen, setIsModalOpen] = useState(false)
        const [selectedImageIndex, setSelectedImageIndex] = useState(0)

        const handlePrevImage = (e) => {
            e.stopPropagation()
            setSelectedImageIndex((prev) => (prev === 0 ? content.attachment.length - 1 : prev - 1))
        }

        const handleNextImage = (e) => {
            e.stopPropagation()
            setSelectedImageIndex((prev) => (prev === content.attachment.length - 1 ? 0 : prev + 1))
        }

        return (
            <div className="bg-[#ffffff] w-full max-h-full mb-8 rounded-md p-8 mt-3" ref={ref}>
                {isConfirmDelete ? (
                    <div
                        className="fixed inset-0 flex justify-center items-center z-[999999] bg-gray-900 bg-opacity-50"
                        onClick={handleClickDelete}
                    >
                        <div className="bg-[#ffffff] w-[600px] p-8 rounded-md mb-4">
                            <div className="flex items-center justify-center border-b-[0.5px] border-[#6f7f92] p-2 font-medium">
                                Delete Post?
                            </div>
                            <span className="p-2 text-sm">
                                {`Are you sure wan't to delete this post. After delete
                        you are not able to get it back`}
                            </span>
                            <div>
                                <div className="flex justify-end gap-1">
                                    <Button
                                        onClick={handleClickDelete}
                                        className="rounded-md bg-[#FFFFFF] hover:bg-gray-300 font-medium text-[15px]"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleDelete}
                                        className="rounded-md bg-[#0866FF] hover:bg-[#3897F0] font-medium text-[#FFFFFF] text-[15px]"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}

                <div className="flex items-center gap-3">
                    <div className="w-[65px] cursor-pointer" onClick={() => handleViewTalentDetails(user[0])}>
                        <Avatar.Root className="w-[50px] h-[50px] rounded-full ">
                            <Avatar.Fallback name={user[0]?.name} />
                            <Avatar.Image src={user[0].avatar} />
                        </Avatar.Root>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col w-9/12 gap-2 text-base font-medium">
                            <div className="flex items-center gap-1">
                                <div>
                                    <a
                                        onClick={() => handleViewTalentDetails(user[0])}
                                        className="text-black no-underline cursor-pointer"
                                    >
                                        {user[0]?.name}
                                    </a>
                                </div>
                                {/* {user[0].name} */}
                                <CheckCircleFilled className="text-[#3897f0]" />
                                {project[0] ? (
                                    <>
                                        {' '}
                                        <span className="text-sm">posted in</span>
                                        <span
                                            className="cursor-pointer"
                                            onClick={() => navigate(`/projects/${project[0]?._id}/details`)}
                                        >
                                            <b> {project[0]?.name}</b>
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        {' '}
                                        <span className="text-sm">created a new post</span>
                                    </>
                                )}
                            </div>
                            <span className="text-xs text-gray-500">
                                {day <= 7
                                    ? day == 0
                                        ? hour == 0
                                            ? minute == 0
                                                ? second + 's'
                                                : minute + 'm'
                                            : hour + 'h'
                                        : day + 'd'
                                    : postedDate}
                            </span>
                        </div>
                        {/* */}

                        <div>
                            <div className="relative flex" ref={dropdownRef}>
                                {verifyAction()}
                                {displayBookmark(bookmark)}
                                {isShowMore && (
                                    <div className="absolute top-full right-0 bg-white shadow-lg rounded-md z-[99999] min-w-[200px] border border-gray-100">
                                        <ul className="p-0 m-2">
                                            <li
                                                className="flex items-center gap-2 px-3 cursor-pointer hover:bg-gray-100"
                                                onClick={handleClickDelete}
                                            >
                                                <IconlyDelete size={25} color={'#6f7f92'} />
                                                <span className="p-2 text-sm">Delete post</span>
                                            </li>
                                            <li
                                                className="flex items-center gap-2 px-3 cursor-pointer hover:bg-gray-100"
                                                onClick={handleEdit}
                                            >
                                                <IconlyEdit size={25} color={'#6f7f92'} backgroundColor={'#6f7f92'} />
                                                <span className="p-2 text-sm">Edit post</span>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <p className="my-[6px]">{content.caption}</p>
                </div>
                <div className="mt-4">
                    {content.attachment && content.attachment.length > 0 && (
                        <div
                            className={`
                            grid gap-2 
                            ${content.attachment.length === 1 ? 'grid-cols-1' : ''}
                            ${content.attachment.length === 2 ? 'grid-cols-2' : ''}
                            ${content.attachment.length === 3 ? 'grid-cols-2' : ''}
                            ${content.attachment.length >= 4 ? 'grid-cols-2' : ''}
                            max-h-[400px]
                        `}
                        >
                            {content.attachment.map((img, index) => {
                                let className = 'relative h-[200px]' // Default cho ảnh vuông

                                if (content.attachment.length === 1) {
                                    className = 'relative h-[400px]' // Ảnh đơn
                                } else if (content.attachment.length === 2) {
                                    className = 'relative h-[200px]' // 2 ảnh cạnh nhau
                                } else if (content.attachment.length === 3) {
                                    if (index === 0) {
                                        className = 'relative h-[250px] col-span-2' // Ảnh đầu tiên khi có 3 ảnh
                                    } else {
                                        className = 'relative h-[146px]' // 2 ảnh dưới khi có 3 ảnh
                                    }
                                } else if (content.attachment.length >= 4) {
                                    className = 'relative h-[200px]' // 4 ảnh hoặc nhiều hơn
                                }

                                if (index > 3) return null

                                return (
                                    <div
                                        key={index}
                                        className={className}
                                        onClick={() => {
                                            setSelectedImageIndex(index)
                                            setIsModalOpen(true)
                                        }}
                                    >
                                        <img
                                            src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-full object-cover cursor-pointer rounded-lg hover:opacity-95 transition-opacity"
                                        />

                                        {content.attachment.length > 4 && index === 3 && (
                                            <div className="absolute inset-0 flex items-center justify-center rounded-lg overflow-hidden">
                                                <div className="absolute inset-0 bg-black/25 hover:bg-black/30 transition-all duration-200" />
                                                <span className="relative z-10 text-white text-2xl font-semibold drop-shadow">
                                                    +{content.attachment.length - 4}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
                {isModalOpen && (
                    <div
                        className="fixed inset-0 bg-black/95 z-[999999] flex items-center justify-center"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <div className="relative w-full max-w-[90%] flex flex-col items-center">
                            <div className="relative max-h-[90vh]">
                                {content.attachment.length > 1 && (
                                    <>
                                        <button
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl bg-black/50 w-12 h-12 rounded-full flex items-center justify-center hover:bg-black/70 transition-all z-50"
                                            onClick={handlePrevImage}
                                        >
                                            ‹
                                        </button>
                                        <button
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl bg-black/50 w-12 h-12 rounded-full flex items-center justify-center hover:bg-black/70 transition-all z-50"
                                            onClick={handleNextImage}
                                        >
                                            ›
                                        </button>
                                    </>
                                )}
                                <img
                                    src={
                                        typeof content.attachment[selectedImageIndex] === 'string'
                                            ? content.attachment[selectedImageIndex]
                                            : URL.createObjectURL(content.attachment[selectedImageIndex])
                                    }
                                    alt="Full size preview"
                                    className="max-w-full max-h-[90vh] object-contain rounded-lg"
                                />
                                <button
                                    className="absolute top-4 right-4 text-white text-xl bg-black/50 w-10 h-10 rounded-full hover:bg-black/70 transition-all flex items-center justify-center"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setIsModalOpen(false)
                                    }}
                                >
                                    ×
                                </button>
                            </div>

                            {/* Controls container */}
                            <div className="absolute bottom-4 flex flex-col items-center gap-4">
                                {/* Số trang */}
                                <div className="text-white bg-black/50 px-6 py-2 rounded-full text-sm font-medium">
                                    {selectedImageIndex + 1} / {content.attachment.length}
                                </div>

                                {/* Dots */}
                                <div className="flex items-center justify-center gap-3">
                                    {content.attachment.map((_, index) => (
                                        <button
                                            key={index}
                                            className={`w-2.5 h-2.5 rounded-full transition-all ${index === selectedImageIndex
                                                    ? 'bg-white scale-110'
                                                    : 'bg-white/40 hover:bg-white/60'
                                                }`}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setSelectedImageIndex(index)
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex items-center border-b-[1px] border-gray-200 pb-2 text-sm gap-2 mt-[18px]">
                    <span className="text-[#6f7f92]"></span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 pt-[16px] text-[#6f7f92]">
                        <a className="flex items-center gap-1 text-current no-underline">
                            {displayReaction(reaction)}
                            <span className="text-sm">
                                {reaction_count > 0
                                    ? reaction_count > 1000
                                        ? Math.floor(reaction_count / 1000) + 'k'
                                        : reaction_count
                                    : ' '}{' '}
                            </span>
                        </a>
                        <a
                            className="flex items-center gap-1 text-current no-underline"
                            onClick={handleSetClick}
                            style={{ cursor: 'pointer' }}
                        >
                            <IconlyChat size={20} color={'#6f7f92'} />
                            <span className="text-sm">
                                {comment_count > 0
                                    ? comment_count > 1000
                                        ? Math.floor(comment_count / 1000) + 'k'
                                        : comment_count
                                    : ' '}{' '}
                            </span>
                        </a>
                    </div>
                    <div className="flex items-center gap-1 pt-[16px] text-[#6f7f92]">
                        <IconlySend size={22} color={'#6f7f92'} />
                        <span>Share</span>
                    </div>
                </div>
            </div>
        )
    }
)

Article.displayName = 'Article'

export default Article
