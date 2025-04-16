import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import './styles.scss'
import Article from './components/Article'
import NewArticle from './components/NewAricle'
import {
    getListFeeds,
    getUserReactionsList,
    handleReactArticle,
    handleCreateArticle,
    handleUpdateArticle,
    handleDeleteArticle,
    handleGetUserBookmarks,
    handleBookmarkArticle,
} from '../../../api/newfeeds'
import { useDispatch, useSelector } from 'react-redux'
import RightSidebar from 'components/common/RightSidebar'
import {
    updateDeletedArticle,
    updateReaction,
    updateUpdatedArticle,
    openCreateForm,
    closeCreateForm,
    openUpdateForm,
    closeUpdateForm,
    updateBookmarks,
} from 'states/modules/article'
import CreateAricleForm from './components/CreateAricleForm'
import CommentList from './components/CommentList'
import UpdateArticleForm from './components/UpdateArticleForm'
import store from 'states/configureStore'
import { PermPhoneMsg } from '@mui/icons-material'
import {
    deleteActivitySaveArticle,
    getComment,
    getReactionArticle,
    getReplyComment,
    getSaveArticle,
    getUpdateArticle,
    postActivitySaveArticle,
    postActivityUpdateArticle,
} from 'api/activity'

const unifiedAction = (activity) => {
    if (typeof activity === 'string' || !activity || activity === null) {
        return <span>has interacted with {activity}</span>
    }

    try {
        const { owner_id, owner_name } = activity
        const { auth } = store.getState()
        const currentUserId = auth.user?._id
        const displayName = owner_id === currentUserId ? 'You' : owner_name || 'Someone'
        // const displayAccessName = activity?.user?.name || 'Someone'

        const activityType = activity?.activity_type?.name
        const articleCaption = activity?.article?.caption
            ? `"${
                  activity.article.caption.length > 20
                      ? activity.article.caption.substring(0, 20) + '...'
                      : activity.article.caption
              }"`
            : 'an article'

        // Handle by type
        switch (activityType) {
            case 'save':
                return (
                    <span>
                        {displayName} has saved {articleCaption}
                    </span>
                )
            case 'update':
                return (
                    <span>
                        {displayName} has updated {articleCaption}
                    </span>
                )
            case 'create':
                return (
                    <span>
                        {displayName} has created {articleCaption}
                    </span>
                )
            case 'reply_comment':
                return <span>has replied to your comment on {articleCaption}</span>
            case 'comment':
                return <span>has commented on {articleCaption}</span>
            case 'reaction':
                return <span>liked your post {articleCaption}</span>
            default:
                return (
                    <span>
                        {displayName} has interacted with {articleCaption}
                    </span>
                )
        }
    } catch (error) {
        console.error('Error processing activity:', error)
        return <span>has performed an activity</span>
    }
}

function NewFeeds() {
    const dispatch = useDispatch()

    const {
        feeds,
        onetimefeeds,
        reactions,
        isLoadingGetFeeds,
        isLoadingReactArticle,
        isLoadingCreateArticle,
        isLoadingUpdateArticle,
        isOpenCreateForm,
        isOpenUpdateForm,
        pagination,
        bookmarks,
    } = useSelector((state) => state.article)

    const {
        updateArticleActivity,
        saveArticleActivity,
        reactionArticleActivity,
        replyCommentActivity,
        commentActivity,
    } = useSelector((state) => state.activity)

    const { nextCursor, limit, hasMore } = pagination

    const [dataFilter, setDataFilter] = useState({
        cursor: 0,
        limit: limit,
    })

    // Activities
    useEffect(() => {
        dispatch(getUpdateArticle())
        dispatch(getSaveArticle())
        dispatch(getReactionArticle())
        dispatch(getReplyComment())
        dispatch(getComment())
    }, [dispatch])

    // End Activities

    useEffect(() => {
        if (feeds.length === 0 && hasMore === true) {
            dispatch(
                getListFeeds({
                    cursor: new Date(),
                    limit: limit,
                })
            )
        }
    }, [dispatch, feeds.length, limit, hasMore])

    useEffect(() => {
        // Chỉ gọi API khi cursor thay đổi (không phải lần đầu load)
        if (dataFilter.cursor !== 0) {
            dispatch(getListFeeds(dataFilter))
        }
    }, [dispatch, dataFilter])
    //Xử lí bất đồng bộ
    const isLoadingRef = useRef(isLoadingGetFeeds) // Tạo một ref để lưu trạng thái
    const cursorRef = useRef(nextCursor)
    useEffect(() => {
        isLoadingRef.current = isLoadingGetFeeds // Cập nhật giá trị ref mỗi khi trạng thái thay đổi
    }, [isLoadingGetFeeds])
    useEffect(() => {
        cursorRef.current = nextCursor
    }, [nextCursor])
    //End
    //Lướt xuống bài viết cuối thì load tiếp
    const observerRef = useRef(null)

    const lastElementRef = useCallback(
        (node) => {
            // Ngắt kết nối observer cũ
            if (observerRef.current) {
                observerRef.current.disconnect()
                observerRef.current = null
            }

            // Tạo observer mới nếu có node và hasMore
            if (node && hasMore) {
                observerRef.current = new IntersectionObserver(
                    (entries) => {
                        const first = entries[0]
                        if (first.isIntersecting && hasMore && !isLoadingRef.current) {
                            setDataFilter({
                                cursor: cursorRef.current,
                                limit: limit,
                            })
                        }
                    },
                    { threshold: 0.1 }
                )

                observerRef.current.observe(node)
            }
        },
        [hasMore, limit]
    )
    //Reaction User's Status
    // Tải trạng thái reaction của người dùng hiện tại
    useEffect(() => {
        if (onetimefeeds.length > 0) {
            // Lấy tất cả article IDs
            const articleIds = onetimefeeds.filter((feed) => feed?._id).map((feed) => feed?._id)

            // Gọi API một lần với array của IDs
            if (articleIds.length > 0) {
                dispatch(getUserReactionsList(articleIds))
            }
        }
    }, [onetimefeeds, dispatch])

    const reactionMap = useMemo(() => {
        return new Map(reactions.map((r) => [r.target_id.toString(), r.type]))
    }, [reactions])
    //End Reaction User's Status
    //Form Create Article

    const handleOpenForm = useCallback(() => {
        dispatch(openCreateForm())
    }, [dispatch])

    const handleCloseForm = useCallback(() => {
        dispatch(closeCreateForm())
    }, [dispatch])

    const handleReaction = useCallback(
        async (articleId, formData) => {
            const reactionType = formData.get('type')
            await dispatch(updateReaction({ articleId, reactionType }))

            //Gọi API để update server
            await dispatch(handleReactArticle({ articleId, data: formData }))
            await dispatch(getReactionArticle())
        },
        [dispatch]
    )

    const handleFormSubmit = useCallback(
        async (formData) => {
            const newFormData = new FormData()
            newFormData.append('caption', formData.content.caption)
            formData.content.attachment.forEach((file) => {
                newFormData.append('attachment', file)
            })
            newFormData.append('hashtags', JSON.stringify(formData.content.hashtags))
            newFormData.append('audience', formData.audience)
            newFormData.append('status', formData.status)
            newFormData.append('project_id', formData.project_id)
            dispatch(handleCreateArticle({ data: newFormData }))
        },
        [dispatch]
    )
    //End Form Create Article

    //Comment Article
    const [selectedArticle, setSelectedArticle] = useState({})
    const [isOpenComment, setIsOpenComment] = useState(false)
    const handleSelectArticle = useCallback(async (feed) => {
        setSelectedArticle(feed)
        setIsOpenComment(true)
    }, [])

    const handleCloseComment = useCallback(() => {
        setIsOpenComment(false)
        setSelectedArticle({})
    }, [])

    //End Comment Article

    //Update Article
    const handleOpenUpdateForm = useCallback(
        async (feed) => {
            setSelectedArticle(feed)
            dispatch(openUpdateForm())
        },
        [dispatch]
    )
    const handleCloseUpdateForm = useCallback(async () => {
        setSelectedArticle({})
        dispatch(closeUpdateForm())
    }, [dispatch])
    const handleUpdateFormSubmit = useCallback(async (id, formData) => {
        const newFormData = new FormData()
        newFormData.append('caption', formData.content.caption)
        formData.content.attachment.forEach((file) => {
            newFormData.append('attachment', file)
        })
        newFormData.append('hashtags', JSON.stringify(formData.content.hashtags))
        newFormData.append('audience', formData.audience)
        newFormData.append('status', formData.status)
        newFormData.append('project_id', formData.project_id)
        await store.dispatch(handleUpdateArticle({ id: id, data: newFormData }))
        await store.dispatch(updateUpdatedArticle(formData))
        await store.dispatch(postActivityUpdateArticle(id))
        await store.dispatch(getUpdateArticle())
    }, [])
    //End Update Article
    //Delete Article
    const handleDelete = useCallback(
        (id) => {
            dispatch(updateDeletedArticle(id))
            dispatch(handleDeleteArticle({ id }))
        },
        [dispatch]
    )

    useEffect(() => {
        if (onetimefeeds.length > 0) {
            const articleIds = onetimefeeds.filter((r) => r?._id).map((r) => r?._id)

            if (articleIds.length > 0) {
                dispatch(handleGetUserBookmarks(articleIds))
            }
        }
    }, [dispatch, onetimefeeds])

    const bookmarksMap = useMemo(() => {
        return new Map(bookmarks.map((r) => [r.article_id.toString(), r.marked]))
    }, [bookmarks])

    const bookmarkArticle = useCallback(
        async (data) => {
            await dispatch(handleBookmarkArticle({ data }))
            dispatch(updateBookmarks(data))
            if (data.marked === 'yes') {
                await dispatch(postActivitySaveArticle(data.article_id))
            } else if (data.marked === 'no') {
                await dispatch(deleteActivitySaveArticle(data.article_id))
            }
            dispatch(getSaveArticle())
        },
        [dispatch]
    )
    //End Delete Article

    return (
<<<<<<< HEAD
        <div className="flex w-full gap-[16px] pt-[16px] px-[16px]">
            <div className="lg:w-8/12 w-full">
=======
        <div className="flex w-full gap-8 pt-4 px-[16px]">
            <div className="w-10/12">
>>>>>>> f4da3f9c2720a18179b23875b7b279546eb85b56
                {isOpenUpdateForm ? (
                    <UpdateArticleForm
                        feed={selectedArticle}
                        onClose={handleCloseUpdateForm}
                        onSubmit={handleUpdateFormSubmit}
                        isLoadingUpdateArticle={isLoadingUpdateArticle}
                    />
                ) : null}
                {isOpenComment ? (
                    <CommentList
                        key={selectedArticle?._id}
                        feed={selectedArticle}
                        onClose={handleCloseComment}
                        reaction={reactionMap.get(selectedArticle?._id)}
                        onReaction={handleReaction}
                        isLoading={isLoadingReactArticle}
                    />
                ) : null}
                {isOpenCreateForm ? (
                    <CreateAricleForm
                        onSubmitForm={handleFormSubmit}
                        onCloseForm={handleCloseForm}
                        isLoadingCreateArticle={isLoadingCreateArticle}
                    />
                ) : null}
                <div>
                    <NewArticle onOpenForm={handleOpenForm} />
                </div>
                {feeds.map((feed, index) => {
                    if (index === feeds.length - 1) {
                        return (
                            <Article
                                key={feed?._id}
                                ref={lastElementRef}
                                feed={feed}
                                reaction={reactionMap.get(feed?._id)}
                                onReaction={handleReaction}
                                isLoading={isLoadingReactArticle}
                                onSelect={handleSelectArticle}
                                onEdit={handleOpenUpdateForm}
                                onDelete={handleDelete}
                                bookmark={bookmarksMap.get(feed?._id)}
                                onBookmark={bookmarkArticle}
                            />
                        )
                    } else {
                        return (
                            <Article
                                key={feed?._id}
                                feed={feed}
                                reaction={reactionMap.get(feed?._id)}
                                onReaction={handleReaction}
                                isLoading={isLoadingReactArticle}
                                onSelect={handleSelectArticle}
                                onEdit={handleOpenUpdateForm}
                                onDelete={handleDelete}
                                bookmark={bookmarksMap.get(feed?._id)}
                                onBookmark={bookmarkArticle}
                            />
                        )
                    }
                })}
            </div>
            <RightSidebar
                activities={[
                    ...updateArticleActivity,
                    ...saveArticleActivity,
                    ...reactionArticleActivity,
                    ...replyCommentActivity,
                    ...commentActivity,
                ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))}
                action={unifiedAction}
            />{' '}
        </div>
    )
}

export default NewFeeds
