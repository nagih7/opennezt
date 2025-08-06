import { forwardRef, useState, useRef, useEffect } from 'react'
import { GoPlus } from 'react-icons/go'
import { IconlyDelete } from '~/components/UI/Iconly'
import { IconlyChat } from '~/components/UI/Iconly'
import { IconlyHeart } from '~/components/UI/Iconly'
import { IconlySend } from '~/components/UI/Iconly'
import { IconlyEdit } from '~/components/UI/Iconly'
import { IconlyBookmark } from '~/components/UI/Iconly'
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { handleGetLinkPreview } from '~/api/linkPreview'
import { ROUTE_CONFIG } from '~/config/constants'
import { Article as ArticleType } from '~/types'
import { useAppDispatch, useAppSelector } from '~/store'
import { Avatar, AvatarImage } from '~/components/UI/avatar'
import { AVATAR_DEFAULT } from '~/config/constants'

interface BookmarkData {
   article_id: string
   marked: string
}

interface ArticleProps {
   feed: ArticleType
   reaction?: string
   onReaction: (articleId: string, formData: FormData) => Promise<void>
   isLoading: boolean
   onSelect: (feed: ArticleType) => Promise<void>
   onEdit: (feed: ArticleType) => Promise<void>
   onDelete: (id: string) => void
   bookmark?: string
   onBookmark: (data: BookmarkData) => Promise<void>
}

const Article = forwardRef<HTMLDivElement, ArticleProps>(
   ({ feed, reaction, onReaction, isLoading, onSelect, onEdit, onDelete, bookmark, onBookmark }, ref) => {
      const { _id, user, project, content, reaction_count, created_at, comment_count, link_preview } = feed
      const dispatch = useAppDispatch()
      const { linkDataArticle, isLoadingGetLinkPreview } = useAppSelector((state) => state.linkPreview)
      const [previewData, setPreviewData] = useState<any>(null)

      // Replace both of your useEffect hooks with this single hook:

      // Keep track of URLs that we've already requested
      const requestedUrlsRef = useRef<Set<string>>(new Set())

      // Single useEffect for link preview logic
      useEffect(() => {
         // Only proceed if we have a valid link_preview URL
         if (!link_preview) return

         // Return early if we already have the preview data matching our URL
         if (previewData && previewData.url === link_preview) return

         // If the correct preview data is already in Redux store, just use it
         if (linkDataArticle?.url === link_preview) {
            setPreviewData(linkDataArticle)
            return
         }

         // Prevent duplicate API requests for the same URL
         if (requestedUrlsRef.current.has(link_preview) || isLoadingGetLinkPreview) {
            return
         }

         // Mark this URL as requested
         requestedUrlsRef.current.add(link_preview)

         // Make the API request
         dispatch(handleGetLinkPreview({ data: { url: link_preview } })).then(() => {
            // If the response is for our URL, update the preview data
            if (linkDataArticle?.url === link_preview) {
               setPreviewData(linkDataArticle)
            }
         })
      }, [link_preview, linkDataArticle, isLoadingGetLinkPreview, dispatch, previewData])

      const LinkPreviewSkeleton = () => {
         return (
            <div className="mt-4 overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
               <div className="flex flex-col sm:flex-row animate-pulse">
                  <div className="flex-shrink-0 h-48 bg-gray-200 sm:w-48 sm:h-auto"></div>
                  <div className="flex-1 p-4">
                     <div className="space-y-3">
                        <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                        <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                        <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
                     </div>
                  </div>
               </div>
            </div>
         )
      }

      // Thêm hàm render link preview
      const renderLinkPreview = () => {
         if (isLoadingGetLinkPreview) {
            return <LinkPreviewSkeleton />
         }

         if (!previewData) return null

         // Hàm kiểm tra và format URL
         const getDisplayUrl = (url: string) => {
            try {
               const urlObject = new URL(url)
               return urlObject.hostname
            } catch (error) {
               // Nếu URL không hợp lệ, trả về URL gốc
               return url
            }
         }

         return (
            <div
               className="mt-4 overflow-hidden transition-all duration-200 bg-white border border-gray-200 shadow-sm cursor-pointer hover:border-gray-300 rounded-xl"
               onClick={() => {
                  // Kiểm tra URL trước khi mở
                  try {
                     new URL(previewData?.url)
                     window.open(previewData.url, '_blank')
                  } catch (error) {
                     console.error('Invalid URL:', previewData.url)
                  }
               }}
            >
               <div className="flex flex-col sm:flex-row">
                  {previewData.image && (
                     <div className="flex-shrink-0 h-48 sm:w-48 sm:h-auto">
                        <img src={previewData.image} alt={previewData.title} className="object-cover w-full h-full" />
                     </div>
                  )}
                  <div className="flex-1 p-4">
                     <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900 line-clamp-2">{previewData.title}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{previewData.description}</p>
                        <div className="flex items-center gap-2 pt-1">
                           {previewData.favicon && (
                              <img src={previewData.favicon} alt="" className="w-4 h-4 rounded-full" />
                           )}
                           <span className="text-sm text-gray-500 truncate">{getDisplayUrl(previewData.url)}</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )
      }

      const navigate = useNavigate()
      const displayReaction = (reaction: string | undefined | null) => {
         if (reaction == 'like') {
            return (
               <div onClick={() => handleReactionClick('like')} style={{ cursor: 'pointer' }}>
                  <IconlyHeart size={25} color={'red'} backgroundColor={'red'} />
               </div>
            )
         }
         if (reaction == undefined || reaction == null) {
            return (
               <div onClick={() => handleReactionClick('like')} style={{ cursor: 'pointer' }}>
                  <IconlyHeart size={25} color={'#6f7f92'} backgroundColor={'transparent'} />
               </div>
            )
         }
      }

      const handleReactionClick = (type: any) => {
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

      // Bookmark functionality
      const handleBookmarkClick = () => {
         const isBookmarked = bookmark === 'yes'
         onBookmark({
            article_id: _id,
            marked: isBookmarked ? 'no' : 'yes',
         })
      }

      const displayBookmark = (bookmark: string | undefined) => {
         const isBookmarked = bookmark === 'yes'
         return (
            <div onClick={handleBookmarkClick} style={{ cursor: 'pointer' }}>
               <IconlyBookmark
                  size={22}
                  color={isBookmarked ? '#2f65b9' : '#6f7f92'}
                  backgroundColor={isBookmarked ? '#2f65b9' : 'transparent'}
               />
            </div>
         )
      }

      //
      const [isShowMore, setIsShowMore] = useState(false)
      const handleClickMore = () => {
         setIsShowMore(!isShowMore)
      }
      const dropdownRef = useRef<HTMLDivElement>(null)

      useEffect(() => {
         const handleClickOutside = (event: any) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
               setIsShowMore(false)
            }
         }

         document.addEventListener('mousedown', handleClickOutside)
         return () => {
            document.removeEventListener('mousedown', handleClickOutside)
         }
      }, [])

      const postedAt = new Date(created_at)
      const postedDate = postedAt.toDateString()
      const today = new Date()
      const day = differenceInDays(today, postedAt)
      const hour = differenceInHours(today, postedAt) % 24
      const minute = differenceInMinutes(today, postedAt) % 60
      const second = differenceInSeconds(today, postedAt) % 60

      const authUser = useAppSelector((state) => state.auth.authUser)

      const verifyAction = () => {
         if (authUser?._id === user[0]?._id) {
            return (
               <div className="flex items-start pr-4 text-2xl" style={{ cursor: 'pointer' }} onClick={handleClickMore}>
                  ...
               </div>
            )
         }
      }

      const handleViewTalentDetails = (user: any) => {
         navigate(ROUTE_CONFIG.USER.RECRUIT_TALENT.PREFIX + user._id)
      }

      const [isModalOpen, setIsModalOpen] = useState(false)
      const [selectedImageIndex, setSelectedImageIndex] = useState(0)

      const handlePrevImage = (e: any) => {
         e.stopPropagation()
         setSelectedImageIndex((prev) => (prev === 0 ? content.attachment.length - 1 : prev - 1))
      }

      const handleNextImage = (e: any) => {
         e.stopPropagation()
         setSelectedImageIndex((prev) => (prev === content.attachment.length - 1 ? 0 : prev + 1))
      }

      const parseContent = (text: any) => {
         if (!text) return ''

         const parts = text.split(/(https?:\/\/[^\s]+)/g)

         return parts
            .map((part: any) => {
               if (part.match(/(https?:\/\/[^\s]+)/g)) {
                  // Cắt ngắn URL nếu quá dài
                  const displayUrl = part.length > 50 ? part.substring(0, 47) + '...' : part
                  return `<a 
                  href="${part}" 
                  target="_blank" 
                  rel="noreferrer noopener" 
                  class="text-blue-500 hover:underline"
                  title="${part}"
                >${displayUrl}</a>`
               }
               return part
            })
            .join('')
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
                  <Avatar className="w-[50px] h-[50px] rounded-full ">
                     <AvatarImage src={user[0]?.avatar || undefined} />
                     <AvatarImage src={AVATAR_DEFAULT} />
                  </Avatar>
               </div>
               <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col w-9/12 gap-2 text-base font-medium">
                     <div className="flex items-center gap-1">
                        <div className="flex items-center gap-2">
                           <a
                              onClick={() => handleViewTalentDetails(user[0])}
                              className="text-sm text-black no-underline cursor-pointer md:text-base"
                           >
                              {user[0]?.name}
                           </a>
                        </div>
                        {/* {user[0].name} */}
                        {project && project[0] && (
                           <div className="hidden md:block">
                              {' '}
                              <GoPlus className="text-[#3897f0]" />
                              <span className="text-sm">posted in</span>
                              <span
                                 className="cursor-pointer"
                                 onClick={() => navigate(ROUTE_CONFIG.USER.PROJECT.PREFIX + project[0]?._id)}
                              >
                                 <b> {project[0]?.name}</b>
                              </span>
                           </div>
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
            {feed.link_preview ? (
               <div className="mt-6">
                  <div
                     className="whitespace-pre-wrap"
                     dangerouslySetInnerHTML={{
                        __html: parseContent(feed.content.caption),
                     }}
                  />{' '}
                  {renderLinkPreview()}
               </div>
            ) : (
               <div className="mt-6">
                  <p className="my-[6px]">{content.caption}</p>
               </div>
            )}

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
                                 className="object-cover w-full h-full transition-opacity rounded-lg cursor-pointer hover:opacity-95"
                              />

                              {content.attachment.length > 4 && index === 3 && (
                                 <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-lg">
                                    <div className="absolute inset-0 transition-all duration-200 bg-black/25 hover:bg-black/30" />
                                    <span className="relative z-10 text-2xl font-semibold text-white drop-shadow">
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
                                 className="absolute z-50 flex items-center justify-center w-12 h-12 text-4xl text-white transition-all -translate-y-1/2 rounded-full left-4 top-1/2 bg-black/50 hover:bg-black/70"
                                 onClick={handlePrevImage}
                              >
                                 ‹
                              </button>
                              <button
                                 className="absolute z-50 flex items-center justify-center w-12 h-12 text-4xl text-white transition-all -translate-y-1/2 rounded-full right-4 top-1/2 bg-black/50 hover:bg-black/70"
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
                           className="absolute flex items-center justify-center w-10 h-10 text-xl text-white transition-all rounded-full top-4 right-4 bg-black/50 hover:bg-black/70"
                           onClick={(e) => {
                              e.stopPropagation()
                              setIsModalOpen(false)
                           }}
                        >
                           ×
                        </button>
                     </div>

                     {/* Controls container */}
                     <div className="absolute flex flex-col items-center gap-4 bottom-4">
                        {/* Số trang */}
                        <div className="px-6 py-2 text-sm font-medium text-white rounded-full bg-black/50">
                           {selectedImageIndex + 1} / {content.attachment.length}
                        </div>

                        {/* Dots */}
                        <div className="flex items-center justify-center gap-3">
                           {content.attachment.map((_, index) => (
                              <button
                                 key={index}
                                 className={`w-2.5 h-2.5 rounded-full transition-all ${
                                    index === selectedImageIndex
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
                  {/* Bookmark Button */}
                  <a className="flex items-center gap-1 text-current no-underline">{displayBookmark(bookmark)}</a>
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

export default Article
