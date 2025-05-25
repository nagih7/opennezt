import React, { forwardRef, useState, useEffect } from 'react'
import { FaCircleCheck } from "react-icons/fa6";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'
import { Avatar } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { handleGetLinkPreview } from 'api/linkPreview'

const ArticlePreview = forwardRef(({ feed }, ref) => {
    const { user, project, content, reaction_count, created_at, comment_count, link_preview } = feed
    const dispatch = useDispatch()
    const { linkDataArticle, isLoadingGetLinkPreview } = useSelector((state) => state.linkPreview)
    const [previewData, setPreviewData] = useState(null)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Fetch link preview data
    useEffect(() => {
        if (link_preview) {
            dispatch(handleGetLinkPreview({ data: { url: link_preview } }))
        }
    }, [link_preview, dispatch])

    // Update preview data when API responds
    useEffect(() => {
        if (linkDataArticle?.url === link_preview) {
            setPreviewData(linkDataArticle)
        }
    }, [linkDataArticle, link_preview])

    const LinkPreviewSkeleton = () => {
        return (
            <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                <div className="flex flex-col sm:flex-row animate-pulse">
                    <div className="sm:w-48 h-48 sm:h-auto flex-shrink-0 bg-gray-200"></div>
                    <div className="flex-1 p-4">
                        <div className="space-y-3">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderLinkPreview = () => {
        if (isLoadingGetLinkPreview) {
            return <LinkPreviewSkeleton />
        }

        if (!previewData) return null

        const getDisplayUrl = (url) => {
            try {
                const urlObject = new URL(url)
                return urlObject.hostname
            } catch (error) {
                return url
            }
        }

        return (
            <div
                className="mt-4 border border-gray-200 hover:border-gray-300 rounded-xl overflow-hidden transition-all duration-200 bg-white shadow-sm cursor-pointer"
                onClick={() => {
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
                        <div className="sm:w-48 h-48 sm:h-auto flex-shrink-0">
                            <img
                                src={previewData.image}
                                alt={previewData.title}
                                className="w-full h-full object-cover"
                            />
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

    // Posted Date Logic
    const postedAt = new Date(created_at)
    const postedDate = postedAt.toDateString()
    const today = new Date()
    const day = differenceInDays(today, postedAt)
    const hour = differenceInHours(today, postedAt) % 24
    const minute = differenceInMinutes(today, postedAt) % 60
    const second = differenceInSeconds(today, postedAt) % 60

    // Parse URL in content
    const parseContent = (text) => {
        if (!text) return ''
        const parts = text.split(/(https?:\/\/[^\s]+)/g)
        return parts
            .map((part) => {
                if (part.match(/(https?:\/\/[^\s]+)/g)) {
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
        <div className="bg-white w-full max-h-full rounded-md p-8" ref={ref}>
            {/* Header với thông tin user */}
            <div className="flex items-center gap-3 mb-6">
                <Avatar.Root className="w-[50px] h-[50px] rounded-full">
                    <Avatar.Image src={user[0]?.avatar} />
                    <Avatar.Fallback name={user[0]?.name} />
                </Avatar.Root>

                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="font-medium">{user[0]?.name}</span>
                        <FaCircleCheck className="text-[#3897f0]" />
                        {project[0] && (
                            <span className="text-sm text-gray-600">
                                in <b>{project[0]?.name}</b>
                            </span>
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

            {/* Content and Link Preview */}
            {feed.link_preview ? (
                <div className="mt-6">
                    <div
                        className="whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{
                            __html: parseContent(content?.caption),
                        }}
                    />
                    {renderLinkPreview()}
                </div>
            ) : (
                <div className="mt-6">
                    <p className="my-[6px]">{content?.caption}</p>
                </div>
            )}

            {/* Image Gallery */}
            <div className="mt-4">
                {content?.attachment && content.attachment.length > 0 && (
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
                            let className = 'relative h-[200px]'
                            if (content.attachment.length === 1) {
                                className = 'relative h-[400px]'
                            } else if (content.attachment.length === 3 && index === 0) {
                                className = 'relative h-[250px] col-span-2'
                            } else if (content.attachment.length === 3 && index > 0) {
                                className = 'relative h-[146px]'
                            }

                            if (index > 3) return null

                            return (
                                <div key={index} className={className}>
                                    <img
                                        src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                    {content.attachment.length > 4 && index === 3 && (
                                        <div className="absolute inset-0 flex items-center justify-center rounded-lg overflow-hidden">
                                            <div className="absolute inset-0 bg-black/25" />
                                            <span className="relative z-10 text-white text-2xl font-semibold">
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

            {/* Interactions Count */}
            <div className="flex items-center gap-4 mt-6 text-gray-600 text-sm">
                <div>❤️ {reaction_count || 0} reactions</div>
                <div>💬 {comment_count || 0} comments</div>
            </div>
        </div>
    )
})

ArticlePreview.displayName = 'ArticlePreview'

export default ArticlePreview
