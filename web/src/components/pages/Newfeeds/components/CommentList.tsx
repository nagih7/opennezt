import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import { IconlyChat } from 'components/UI/Iconly'
import { IconlyHeart } from 'components/UI/Iconly'
import { IconlySend } from 'components/UI/Iconly'
import { FaCircleCheck } from 'react-icons/fa6'
import {
   handleCreateComment,
   handleGetListComment,
   handleGetUserCommentReactions,
   handleReactComment,
   handleGetListReplyComment,
   handleReplyComment,
   handleGetUserReplyCommentReactions,
} from '~/api/newfeeds'
import { resetComment, resetReplyReaction, updateCommentReaction, updateCreatedComment } from 'store/modules/article'
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'
import Comment from './Comment'
import NewCommentForm from './NewCommentForm'
import { resetReply } from 'store/modules/article'
import store, { useAppDispatch, useAppSelector } from '~/store'
import { handleGetLinkPreview } from '~/api/linkPreview'
import {
   RootState,
   Article,
   Comment as CommentType,
   CommentDataFilter,
   UserReaction,
   CommentFormData,
   LinkPreview,
} from '~/types'
import { GoPlus } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import { AVATAR_DEFAULT, ROUTE_CONFIG } from '~/config/constants'
import { Avatar, AvatarImage } from '~/components/UI/avatar'

interface CommentListComponentProps {
   feed: Article
   reaction?: string
   onReaction: (feedId: string, data: FormData) => Promise<void>
   isLoading: boolean
   onClose: () => void
}

interface ReplyCommentListItem {
   replyComments: CommentType[]
   pagination: {
      hasMore: boolean
      limit: number
      page: number
      total: number
   }
}

interface ReplyCommentList {
   [key: string]: ReplyCommentListItem
}

const CommentList: React.FC<CommentListComponentProps> = ({ feed, reaction, onReaction, isLoading, onClose }) => {
   const { _id, user, project, content, reaction_count, created_at, comment_count, link_preview } = feed
   const { linkDataArticle, isLoadingGetLinkPreview } = useAppSelector((state) => state.linkPreview)
   const navigate = useNavigate()

   const {
      comment,
      isLoadingGetComments,
      comment_reactions,
      comment_pagination,
      isLoadingReactComment,
      onetimecomments,
      createdComment,
   } = useAppSelector((state: RootState) => state.article)

   const authUser = useAppSelector((state: RootState) => state.auth.authUser)

   const { hasMore, page, limit } = comment_pagination
   const dispatch = useAppDispatch()

   const [dataFilter, setDataFilter] = useState<CommentDataFilter>({
      articleId: _id,
      limit: 10,
      page: 1,
   })

   // First useEffect for initial load only
   const initialLoadMadeRef = useRef(false)

   useEffect(() => {
      if (dataFilter.page === 1 && comment.length === 0 && hasMore === true && !initialLoadMadeRef.current) {
         // Initial load - only happens once
         initialLoadMadeRef.current = true
         dispatch(
            handleGetListComment({
               articleId: feed?._id,
               page: 1,
               limit: limit,
            }) as any
         )
      } else if (dataFilter.page > 1) {
         // Loading more comments (pagination)
         dispatch(handleGetListComment(dataFilter) as any)
      }
   }, [dispatch, feed, limit, hasMore, dataFilter, comment.length])

   // Second useEffect for pagination only
   useEffect(() => {
      if (dataFilter.page > 1) {
         dispatch(handleGetListComment(dataFilter) as any)
      }
   }, [dataFilter.page])

   useEffect(() => {
      store.dispatch(updateCreatedComment({ createdComment, authUser }))
   }, [createdComment, authUser])

   const displayReaction = (): React.ReactElement => {
      if (reaction === 'like') {
         return (
            <div onClick={() => handleReactionClick('like')} style={{ cursor: 'pointer' }}>
               <IconlyHeart size={25} color={'red'} backgroundColor={'red'} />
            </div>
         )
      }
      // Default case for undefined or other reactions
      return (
         <div onClick={() => handleReactionClick('like')} style={{ cursor: 'pointer' }}>
            <IconlyHeart size={25} color={'#6f7f92'} backgroundColor={'transparent'} />
         </div>
      )
   }

   const handleReactionClick = (type: string): void => {
      if (isLoading) return
      const data = new FormData()
      data.append('type', type)
      data.append('target_type', 'article')
      onReaction(_id, data)
   }

   const handleCloseComment = async (): Promise<void> => {
      dispatch(resetComment())
      dispatch(resetReply())
      dispatch(resetReplyReaction())
      setReplyCommentList({})
      setReplyCommentReactions([])
      onClose()
   }

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

   //Xử lí bất đồng bộ
   const isLoadingRef = useRef(isLoadingGetComments) // Tạo một ref để lưu trạng thái
   const hasMoreRef = useRef(hasMore)
   const pageRef = useRef(page)
   const idRef = useRef(_id)

   useEffect(() => {
      if (idRef.current !== _id) {
         idRef.current = _id
      }
   })

   useEffect(() => {
      isLoadingRef.current = isLoadingGetComments // Cập nhật giá trị ref mỗi khi trạng thái thay đổi
   }, [isLoadingGetComments])

   useEffect(() => {
      pageRef.current = page
   }, [page])

   useEffect(() => {
      hasMoreRef.current = hasMore
   }, [hasMore]) //Lướt xuống bài viết cuối thì load tiếp

   const observerRef = useRef<IntersectionObserver | null>(null)

   const lastElementRef = useCallback(
      (node: HTMLElement | null) => {
         // Ngắt kết nối observer cũ
         if (observerRef.current) {
            observerRef.current.disconnect()
         }

         // Tạo observer mới nếu có node và hasMore
         if (node && hasMore) {
            observerRef.current = new IntersectionObserver(
               (entries) => {
                  const first = entries[0]
                  if (first.isIntersecting && hasMore && !isLoadingRef.current) {
                     setDataFilter({
                        articleId: feed?._id,
                        page: pageRef.current,
                        limit: limit,
                     })
                  }
               },
               { threshold: 0.1 }
            )

            observerRef.current.observe(node)
         }
      },
      [hasMore, feed, limit]
   )
   //Reaction User's Status

   //==============Reaction===============
   useEffect(() => {
      if (onetimecomments.length > 0) {
         // Lấy tất cả article IDs
         const commentIds = onetimecomments
            .filter((comment: CommentType) => comment?._id)
            .map((comment: CommentType) => comment?._id)

         // Gọi API một lần với array của IDs
         if (commentIds.length > 0) {
            dispatch(handleGetUserCommentReactions(commentIds))
         }
      }
   }, [onetimecomments, dispatch])

   const reactionMap = useMemo(() => {
      return new Map(comment_reactions.map((r: UserReaction) => [r.target_id.toString(), r.type]))
   }, [comment_reactions])

   const handleCommentReaction = useCallback(
      async (commentId: string, formData: FormData) => {
         const reactionType = formData.get('type')
         dispatch(updateCommentReaction({ commentId, reactionType }))
         //Gọi API để update server
         dispatch(handleReactComment({ commentId, data: formData }))
      },
      [dispatch]
   )
   //===============End=================

   //Form
   const [isCommentOrReply, setIsCommentOrReply] = useState<'comment' | 'reply'>('comment')
   const [selectedComment, setSelectedComment] = useState<CommentType | undefined>(undefined)
         const handleViewTalentDetails = (user: any) => {
            navigate(ROUTE_CONFIG.USER.RECRUIT_TALENT.PREFIX + user._id)
         }

   const handleFormSubmit = useCallback(
      async (formData: CommentFormData) => {
         if (isCommentOrReply === 'reply') {
            if (selectedComment?.parent_id) {
               const newFormData = new FormData()
               newFormData.append('article_id', formData.article_id)
               newFormData.append('comment_id', selectedComment.parent_id)
               newFormData.append('caption', formData.content.caption)
               if (formData.content.image) {
                  newFormData.append('image', formData.content.image)
               }
               await store.dispatch(handleReplyComment({ data: newFormData }))
               
               // Tăng reply_count của comment cha
               if (selectedComment.parent_id) {
                  const parentComment = comment.find((c) => c._id === selectedComment.parent_id)
                  if (parentComment) {
                     // Tăng reply_count của comment được reply
                     const updatedComment = {
                        ...parentComment,
                        reply_count: (parentComment.reply_count || 0) + 1
                     }
                     
                     // Cập nhật lại state comment
                     dispatch({ 
                        type: 'article/updateCommentReplyCount', 
                        payload: { commentId: selectedComment.parent_id, count: updatedComment.reply_count } 
                     })
                  }
               }
               
               // Tăng comment_count của article
               dispatch({
                  type: 'article/incrementArticleCommentCount',
                  payload: feed._id
               })
               
               return
            }
            
            if (selectedComment?._id) {
               const newFormData = new FormData()
               newFormData.append('article_id', formData.article_id)
               newFormData.append('comment_id', selectedComment._id)
               newFormData.append('caption', formData.content.caption)
               if (formData.content.image) {
                  newFormData.append('image', formData.content.image)
               }
               await store.dispatch(handleReplyComment({ data: newFormData }))
               
               // Tăng reply_count của comment được reply
               const commentToUpdate = comment.find((c) => c._id === selectedComment._id)
               if (commentToUpdate) {
                  // Tăng reply_count của comment được reply
                  const updatedComment = {
                     ...commentToUpdate,
                     reply_count: (commentToUpdate.reply_count || 0) + 1
                  }
                  
                  // Cập nhật lại state comment
                  dispatch({ 
                     type: 'article/updateCommentReplyCount', 
                     payload: { commentId: selectedComment._id, count: updatedComment.reply_count } 
                  })
               }
               
               // Tăng comment_count của article
               dispatch({
                  type: 'article/incrementArticleCommentCount',
                  payload: feed._id
               })
            }
         }
         
         if (isCommentOrReply === 'comment') {
            const newFormData = new FormData()
            newFormData.append('article_id', formData.article_id)
            newFormData.append('caption', formData.content.caption)
            if (formData.content.image) {
               newFormData.append('image', formData.content.image)
            }
            await store.dispatch(handleCreateComment({ data: newFormData }))
            
            // Comment_count của article sẽ tự động được cập nhật thông qua response API
         }
      },
      [isCommentOrReply, selectedComment, dispatch, comment, feed]
   )
   //End

   //Reply Comment Logic
   const replyCommentState = useAppSelector((state: RootState) => state.article)
   const [replyCommentList, setReplyCommentList] = useState<ReplyCommentList>({})

   const { reply_comments_pagination, isLoadingGetReplyComments, replyComments, reply_comment_reactions } =
      replyCommentState

   useEffect(() => {
      if (replyComments && replyComments.length > 0) {
         const parentId = replyComments[0].parent_id

         setReplyCommentList((prevState) => {
            // Kiểm tra xem parentId đã tồn tại trong state chưa
            const existingReplies = prevState[parentId]?.replyComments || []

            // Lọc ra những comments mới để tránh trùng lặp
            const newReplies = replyComments.filter(
               (newReply: CommentType) => !existingReplies.some((existing) => existing?._id === newReply?._id)
            )

            return {
               ...prevState,
               [parentId]: {
                  replyComments: [...existingReplies, ...newReplies],
                  pagination: {
                     ...reply_comments_pagination,
                     total: reply_comments_pagination.total || 0,
                  },
               },
            }
         })
      }
   }, [replyComments, isLoadingGetReplyComments, reply_comments_pagination])

   const [replyDataFilter, setReplyDataFilter] = useState<CommentDataFilter>({
      articleId: '',
      limit: 3,
      page: 1,
   })

   const getParentId = useCallback(
      (comment: CommentType) => {
         if (comment?._id && replyCommentList[comment?._id]) {
            if (replyCommentList[comment?._id].pagination.hasMore === true) {
               setReplyDataFilter((prev) => ({
                  ...prev,
                  parent_id: comment?._id,
                  limit: replyCommentList[comment?._id].pagination?.limit || 3,
                  hasMore: replyCommentList[comment?._id].pagination?.hasMore ?? true,
                  page: replyCommentList[comment?._id].pagination?.page || 1,
               }))
            }
         } else {
            // Nếu comment là comment gốc hoặc chưa có trong replyCommentList
            setReplyDataFilter((prev) => ({
               ...prev,
               parent_id: comment?._id,
               limit: 3,
               hasMore: true,
               page: 1,
            }))
         }
         // Nếu comment là reply comment (có parent_id), lấy pagination của parent
      },
      [replyCommentList]
   )

   useEffect(() => {
      if (replyDataFilter.parent_id) {
         // Ensure article_id is always set and parent_id is a string
         const dataFilterWithArticleId = {
            ...replyDataFilter,
            article_id: feed._id,
            parent_id: replyDataFilter.parent_id ?? '',
         }
         dispatch(handleGetListReplyComment({ dataFilter: dataFilterWithArticleId }))
      }
   }, [replyDataFilter, dispatch, feed._id])

   const handleClickReply = useCallback(async () => {
      if (isCommentOrReply === 'comment') {
         setIsCommentOrReply('reply')
      }
      if (isCommentOrReply === 'reply') {
         setIsCommentOrReply('comment')
      }
   }, [isCommentOrReply])

   const selectComment = useCallback((comment: CommentType) => {
      setSelectedComment(comment)
   }, [])

   const [replyCommentReactions, setReplyCommentReactions] = useState<UserReaction[]>([])

   useEffect(() => {
      if (replyComments.length > 0) {
         const replyCommentIds = replyComments
            .filter((replyCmt: CommentType) => replyCmt?._id)
            .map((replyCmt: CommentType) => replyCmt?._id)

         if (replyCommentIds.length > 0) {
            dispatch(handleGetUserReplyCommentReactions(replyCommentIds))
         }
      }
   }, [dispatch, replyComments])

   useEffect(() => {
      setReplyCommentReactions((prevState) => {
         return [...prevState, ...reply_comment_reactions]
      })
   }, [reply_comment_reactions])

   const replyReactionMap = useMemo(() => {
      return new Map(replyCommentReactions.map((r) => [r.target_id.toString(), r.type]))
   }, [replyCommentReactions])
   //End reply comment logic

   const updateReplyCommentReactions = useCallback(
      (reply: CommentType, type: string) => {
         if (!reply.parent_id) return

         const replyCommentIndex = replyCommentList[reply.parent_id]?.replyComments.findIndex(
            (replyCmt: CommentType) => replyCmt?._id.toString() === reply?._id.toString()
         )

         const existingReactionIndex = replyCommentReactions.findIndex(
            (reaction: UserReaction) => reaction.target_id.toString() === reply?._id.toString()
         )

         if (existingReactionIndex !== -1) {
            // Nếu đã có reaction
            if (replyCommentReactions[existingReactionIndex].type === type) {
               // Nếu click cùng loại reaction -> xóa reaction
               setReplyCommentReactions((prevReactions) =>
                  prevReactions.filter((_, index) => index !== existingReactionIndex)
               )

               // Giảm reaction_count
               if (replyCommentIndex !== -1) {
                  setReplyCommentList((prevState) => ({
                     ...prevState,
                     [reply.parent_id!]: {
                        ...prevState[reply.parent_id!],
                        replyComments: prevState[reply.parent_id!].replyComments.map(
                           (comment: CommentType, idx: number) =>
                              idx === replyCommentIndex
                                 ? {
                                      ...comment,
                                      reaction_count: Math.max(0, comment.reaction_count - 1),
                                   }
                                 : comment
                        ),
                     },
                  }))
               }
            } else {
               // Nếu click khác loại reaction -> update loại reaction
               setReplyCommentReactions((prevReactions) => {
                  const updatedReactions = [...prevReactions]
                  updatedReactions[existingReactionIndex] = {
                     ...updatedReactions[existingReactionIndex],
                     type: type as 'like' | 'love' | 'laugh' | 'wow' | 'sad' | 'angry',
                  }
                  return updatedReactions
               })
            }
         } else {
            // Nếu chưa có reaction -> thêm mới
            const newReaction: UserReaction = {
               _id: `temp-${Date.now()}`,
               user_id: authUser?._id || '',
               target_id: reply?._id || '',
               target_type: 'comment',
               type: type as 'like' | 'love' | 'laugh' | 'wow' | 'sad' | 'angry',
               created_at: new Date().toISOString(),
            }

            setReplyCommentReactions((prevReactions) => [...prevReactions, newReaction])

            // Tăng reaction_count
            if (replyCommentIndex !== -1) {
               setReplyCommentList((prevState) => ({
                  ...prevState,
                  [reply.parent_id!]: {
                     ...prevState[reply.parent_id!],
                     replyComments: prevState[reply.parent_id!].replyComments.map(
                        (comment: CommentType, idx: number) =>
                           idx === replyCommentIndex
                              ? {
                                   ...comment,
                                   reaction_count: comment.reaction_count + 1,
                                }
                              : comment
                     ),
                  },
               }))
            }
         }
      },
      [replyCommentList, replyCommentReactions, authUser]
   )

   const handleReactionReplyComment = useCallback(
      async (reply: CommentType, formData: FormData) => {
         const type = formData.get('type') as string
         await store.dispatch(handleReactComment({ commentId: reply?._id, data: formData }))
         updateReplyCommentReactions(reply, type)
      },
      [updateReplyCommentReactions]
   )

   const handleReset = useCallback(() => {
      setReplyCommentList({})
   }, [])

   const [isModalOpen, setIsModalOpen] = useState(false)
   const [selectedImageIndex, setSelectedImageIndex] = useState(0)

   const handlePrevImage = (e: React.MouseEvent) => {
      e.stopPropagation()
      setSelectedImageIndex((prev) => (prev === 0 ? content.attachment.length - 1 : prev - 1))
   }

   const handleNextImage = (e: React.MouseEvent) => {
      e.stopPropagation()
      setSelectedImageIndex((prev) => (prev === content.attachment.length - 1 ? 0 : prev + 1))
   }

   const [previewData, setPreviewData] = useState<LinkPreview | null>(null)

   // Thêm useEffect để lấy link preview data
   useEffect(() => {
      if (link_preview) {
         dispatch(handleGetLinkPreview({ data: { url: link_preview } }))
      }
   }, [link_preview, dispatch])

   // Cập nhật preview data khi có response từ API
   useEffect(() => {
      if (linkDataArticle?.url === link_preview) {
         setPreviewData(linkDataArticle)
      }
   }, [linkDataArticle, link_preview])

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
                  new URL(previewData.url)
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

   return (
      <div className="fixed inset-0 flex items-center justify-center overflow-hidden" style={{ zIndex: 100 }}>
         <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleCloseComment}></div>
         <div className="flex flex-col bg-[#ffffff] w-[50vw] max-h-[85vh] mb-8 rounded-md relative z-10">
            <div className="flex items-center w-full p-[10px] justify-center rounded-md border-[1px] border-gray-200 gap-3">
               {feed.parent_id ? (
                  <span className="text-lg">{`${feed.user[0]?.name}'s share post`}</span>
               ) : (
                  <span className="text-lg font-semibold">{`${feed.user[0]?.name}'s post`}</span>
               )}
            </div>
            {/* Add a scrollable container for the content */}
            <div className="flex-1 p-8 pb-24 overflow-y-auto">
               <div className="flex items-center gap-3">
                  <div className="w-[65px] cursor-pointer" onClick={() => handleViewTalentDetails(user[0])}>
                     <Avatar className="w-[50px] h-[50px] rounded-full ">
                        <AvatarImage src={user[0]?.avatar || undefined} />
                        <AvatarImage src={AVATAR_DEFAULT} />
                     </Avatar>
                  </div>
                  <div className="flex items-center justify-between w-full">
                     <div className="flex flex-col w-9/12 gap-2 text-base font-medium">
                        <div className="flex items-center gap-2">
                           {user[0]?.name}
                           {project && project[0] && (
                           <div className="hidden md:block">
                              {' '}
                              <GoPlus className="text-[#3897f0]" />
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
                  </div>
               </div>

               {feed.link_preview ? (
                  <div className="mt-6">
                     <p className="my-[6px]">{content.caption}</p>
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
                        {displayReaction()}
                        <span className="text-sm">
                           {(reaction_count.total || 0) > 0
                              ? (reaction_count.total || 0) > 1000
                                 ? Math.floor((reaction_count.total || 0) / 1000) + 'k'
                                 : reaction_count.total
                              : ' '}{' '}
                        </span>
                     </a>
                     <a className="flex items-center gap-1 text-current no-underline" style={{ cursor: 'pointer' }}>
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
               {comment &&
                  comment.length > 0 &&
                  comment.map((cmt, index) => {
                     if (index === comment.length - 1) {
                        return (
                           <Comment
                              key={cmt?._id}
                              comment={cmt}
                              ref={lastElementRef}
                              reaction={reactionMap.get(cmt?._id)}
                              replyReactionMap={replyReactionMap}
                              onCommentReaction={handleCommentReaction}
                              isLoading={isLoadingReactComment}
                              setParentId={getParentId}
                              replyCommentList={replyCommentList[cmt?._id]}
                              handleClickReply={handleClickReply}
                              selectComment={selectComment}
                              handleReactionReplyComment={handleReactionReplyComment}
                           />
                        )
                     }
                     return (
                        <Comment
                           key={cmt?._id}
                           comment={cmt}
                           reaction={reactionMap.get(cmt?._id)}
                           replyReactionMap={replyReactionMap}
                           onCommentReaction={handleCommentReaction}
                           isLoading={isLoadingReactComment}
                           setParentId={getParentId}
                           replyCommentList={replyCommentList[cmt?._id]}
                           handleClickReply={handleClickReply}
                           selectComment={selectComment}
                           handleReactionReplyComment={handleReactionReplyComment}
                        />
                     )
                  })}
            </div>
            {/* Comment form container */}
            <div className="sticky bottom-0 left-0 right-0 p-2 bg-white border-gray-200 rounded-md shadow-md">
               <NewCommentForm
                  article_id={_id}
                  onSubmit={handleFormSubmit}
                  selectedComment={selectedComment}
                  isCommentOrReply={isCommentOrReply}
                  handleClickReply={handleClickReply}
                  onReset={handleReset}
               />
            </div>
         </div>
      </div>
   )
}

export default CommentList
