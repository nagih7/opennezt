import React, { forwardRef, useEffect } from 'react'
import { useState, useRef } from 'react'
import { FileUpload, Input, InputGroup, Button, Textarea, Dialog, Portal, CloseButton } from '@chakra-ui/react'
import { LuUpload, LuSearch } from 'react-icons/lu'
import { debounce, last, set } from 'lodash'
import { CloseOutlined } from '@mui/icons-material'
import { Avatar } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { IconlyAddUser, IconlyImage2, IconlySwap, IconlyWork } from 'components/UI/Iconly'
import { useNavigate } from 'react-router-dom'
import { getProjectsToTag } from 'api/newfeeds'
import resizeBackground from 'utils/files/resizeBackground'
import { handleGetLinkPreview } from 'api/linkPreview'
import { resetLinkPreview } from 'states/modules/linkPreview'

const CreateArticleForm = forwardRef(({ onSubmitForm, onCloseForm, isLoadingCreateArticle }, ref) => {
    const [formData, setFormData] = useState({
        content: {
            caption: '',
            attachment: [],
            hashtags: [],
        },
        link_preview: '',
        audience: 'public',
        status: 'published',
        project_id: '',
    })
    const [fileKey, setFileKey] = useState(0)
    // const [bgFile, setBgFile] = useState(null)
    const { authUser } = useSelector((state) => state.auth)

    // Project Logic ==========================================
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedProject, setSelectedProject] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { projectsToTag, isLoadingMyProjectToTag } = useSelector((state) => state.article)

    const [dataFilter, setDataFilter] = useState({
        keySearch: '',
    })

    const selectedProjectName = projectsToTag?.find((project) => project?._id === formData.project_id)?.name

    useEffect(() => {
        dispatch(getProjectsToTag(dataFilter))
    }, [dataFilter, dispatch])

    const handleSelectProject = (project) => {
        setSelectedProject(project)
        setFormData({
            ...formData,
            project_id: project?._id || null,
        })
        setIsModalOpen(false)
    }

    const handleSearch = debounce((e) => {
        dispatch(getProjectsToTag({ keySearch: e.target.value }))
    }, 300)

    const handleModalOpen = () => {
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }
    //=========================================================
    const renderPreviewImages = () => {
        return (
            <div className="relative">
                {' '}
                {formData.content.attachment.length > 0 && (
                    <button
                        className="absolute top-2 right-2 text-[30px] text-[#6f7f92] rounded-full w-6 h-6 flex items-center justify-center z-[999999]"
                        onClick={() => handleRemoveImage()}
                    >
                        ×
                    </button>
                )}
                <div
                    className="max-h-[36vh] overflow-y-auto scrollbar-thin"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#CBD5E1 #F1F5F9',
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: '#F1F5F9',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#CBD5E1',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: '#94A3B8',
                        },
                    }}
                >
                    {formData.content.attachment.map((image, index) => (
                        <div key={index} className="relative">
                            <img
                                src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                                alt={`Preview ${index}`}
                                className="w-full auto object-cover rounded-md"
                            />
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    //Images
    const handleFileChange = async (event) => {
        const newFiles = Array.from(event.target.files)

        const resizePromises = newFiles.map((file) => resizeBackground(file))
        const resizeFiles = await Promise.all(resizePromises)

        const filteredFiles = resizeFiles.filter((newFile) => {
            const isDuplicate = formData.content.attachment.some(
                (existingFiles) => existingFiles?.name === newFile?.name
            )
            return !isDuplicate
        })
        setFormData({
            ...formData,
            link_preview: '',
            content: {
                ...formData.content,
                attachment: [...formData.content.attachment, ...filteredFiles],
            },
        })

        setLinkPreviews([]) // Reset link previews when new files are added
        dispatch(resetLinkPreview()) // Reset state link preview
    }

    const handleRemoveImage = () => {
        setFileKey((prev) => prev + 1)
        setFormData({
            ...formData,
            content: {
                ...formData.content,
                attachment: [],
            },
        })
    }

    //End Images
    const handleSubmit = async () => {
        await onSubmitForm(formData)
        setFileKey((prev) => prev + 1)
    }

    const handleClick = () => {
        onCloseForm()
        dispatch(resetLinkPreview())
    }

    const [linkPreviews, setLinkPreviews] = useState([])
    const { linkData, message } = useSelector((state) => state.linkPreview)

    const handleLinkPreview = debounce(async (text) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g
        const urls = text.match(urlRegex)

        if (urls && urls.length > 0) {
            // Lấy danh sách URLs độc nhất và đảo ngược thứ tự
            const uniqueUrls = [...new Set(urls)].reverse()
            uniqueUrls.forEach((url) => {
                dispatch(handleGetLinkPreview({ data: { url } }))
            })
        }
    }, 1000)

    // Thêm state để lưu link preview mặc định
    const [defaultPreview, setDefaultPreview] = useState(null)

    // // Sửa useEffect để tự động chọn link đầu tiên
    // useEffect(() => {
    //     if (linkData?.url) {
    //         setLinkPreviews((prev) => {
    //             const exists = prev.some((item) => item.url === linkData.url)
    //             if (!exists) {
    //                 // Nếu chưa có link nào được chọn, set link đầu tiên làm mặc định
    //                 if (!formData.link_preview) {
    //                     setFormData((prevForm) => ({
    //                         ...prevForm,
    //                         link_preview: linkData.url,
    //                     }))
    //                     setDefaultPreview(linkData)
    //                 }
    //                 return [...prev, linkData]
    //             }
    //             return prev
    //         })
    //     }
    // }, [linkData, formData.link_preview])

    // Sửa lại useEffect để lấy link cuối cùng làm mặc định
    useEffect(() => {
        if (linkData?.url) {
            setLinkPreviews((prev) => {
                const exists = prev.some((item) => item.url === linkData.url)
                if (!exists) {
                    // Luôn set link mới nhất làm mặc định
                    setFormData((prevForm) => ({
                        ...prevForm,
                        link_preview: linkData.url,
                    }))
                    setDefaultPreview(linkData)
                    return [...prev, linkData]
                }
                return prev
            })
        }
    }, [linkData])

    const handleSelectLinkPreview = (url) => {
        setFormData((prev) => ({
            ...prev,
            link_preview: url,
        }))
    }

    const handleTextChange = (e) => {
        const newText = e.target.value
        setFormData({
            ...formData,
            content: {
                ...formData.content,
                caption: newText,
            },
        })
        handleLinkPreview(newText)
    }

    // Thêm state để kiểm soát việc hiển thị danh sách link previews
    const [showLinkPreviews, setShowLinkPreviews] = useState(false)

    // Thêm hàm xử lý xóa link preview
    const handleRemoveLinkPreview = () => {
        setFormData((prev) => ({
            ...prev,
            link_preview: '',
        }))
        setDefaultPreview(null)
        setLinkPreviews([])
        setShowLinkPreviews(false)
    }

    // Sửa lại hàm renderLinkPreview
    const renderLinkPreview = () => {
        // Chỉ render khi có link preview được chọn
        if (!formData.link_preview || linkPreviews.length === 0) return null

        const selectedPreview = linkPreviews.find((preview) => preview.url === formData.link_preview) || defaultPreview
        if (!selectedPreview) return null

        return (
            <div className="mt-4">
                {selectedPreview && (
                    <div className="relative border border-gray-200 hover:border-gray-300 rounded-xl overflow-hidden transition-all duration-200 bg-white shadow-sm">
                        {/* Action buttons */}
                        <div className="absolute top-3 right-3 flex gap-2 z-10">
                            <button
                                onClick={() => setShowLinkPreviews(true)}
                                className="p-1.5 rounded-full bg-white/80 backdrop-blur hover:bg-white transition-all duration-200"
                            >
                                <IconlySwap size={20} color={'#4B5563'} />
                            </button>
                            <button
                                onClick={handleRemoveLinkPreview}
                                className="p-1.5 rounded-full bg-white/80 backdrop-blur hover:bg-white transition-all duration-200"
                            >
                                <CloseOutlined style={{ fontSize: '16px', color: '#4B5563' }} />
                            </button>
                        </div>

                        <div className="flex flex-col sm:flex-row">
                            {/* Image container */}
                            {selectedPreview.image && (
                                <div className="sm:w-48 h-48 sm:h-auto flex-shrink-0">
                                    <img
                                        src={selectedPreview.image}
                                        alt={selectedPreview.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            {/* Content container */}
                            <div className="flex-1 p-4">
                                <div className="space-y-2">
                                    {selectedPreview.message ? (
                                        <h4 className="font-semibold text-gray-900 line-clamp-2">
                                            {selectedPreview.message}
                                        </h4>
                                    ) : (
                                        <h4 className="font-semibold text-gray-900 line-clamp-2">
                                            {selectedPreview.title}
                                        </h4>
                                    )}
                                    <p className="text-sm text-gray-600 line-clamp-2">{selectedPreview.description}</p>
                                    <div className="flex items-center gap-2 pt-1">
                                        {selectedPreview.favicon && (
                                            <img
                                                src={selectedPreview.favicon}
                                                alt=""
                                                className="w-4 h-4 rounded-full"
                                            />
                                        )}
                                        <a
                                            href={selectedPreview.url}
                                            className="text-sm text-gray-500 hover:text-blue-600 truncate"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {new URL(selectedPreview.url).hostname}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal cho việc chọn link */}
                {showLinkPreviews && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => setShowLinkPreviews(false)}
                        />
                        <div className="relative bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Choose Link Preview</h3>
                                <button
                                    onClick={() => setShowLinkPreviews(false)}
                                    className="p-1.5 rounded-full hover:bg-gray-100"
                                >
                                    <CloseOutlined style={{ fontSize: '18px' }} />
                                </button>
                            </div>

                            <div className="space-y-3">
                                {linkPreviews.map((preview, index) => (
                                    <div
                                        key={index}
                                        className={`border rounded-lg p-3 cursor-pointer transition-all
                                            ${
                                                preview.url === formData.link_preview
                                                    ? 'border-blue-500 ring-2 ring-blue-100 bg-blue-50/50'
                                                    : 'hover:bg-gray-50 border-gray-200'
                                            }`}
                                        onClick={() => {
                                            handleSelectLinkPreview(preview.url)
                                            setShowLinkPreviews(false)
                                        }}
                                    >
                                        <div className="flex gap-4">
                                            {preview.image && (
                                                <img
                                                    src={preview.image}
                                                    alt={preview.title}
                                                    className="w-24 h-24 object-cover rounded-lg"
                                                />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-gray-900 mb-1">{preview.title}</h4>
                                                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                                                    {preview.description}
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    {preview.favicon && (
                                                        <img
                                                            src={preview.favicon}
                                                            alt=""
                                                            className="w-4 h-4 rounded-full"
                                                        />
                                                    )}
                                                    <span className="text-sm text-gray-500 truncate">
                                                        {new URL(preview.url).hostname}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    const renderDomainWarning = () => {
        if (message !== 'This domain is not allow') return null

        return (
            <div className="mt-2 px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <div>
                        <h4 className="font-medium text-yellow-800">Domain không được phép</h4>
                        <p className="text-sm text-yellow-700">
                            Link từ domain này không được phép sử dụng. Vui lòng thử link khác.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    // Xử lý khi thêm ảnh - xóa link preview
    const handleAttachmentChange = (files) => {
        setFormData((prev) => ({
            ...prev,
            content: {
                ...prev.content,
                attachment: files,
            },
            link_preview: '', // Xóa link preview khi thêm ảnh
        }))
        dispatch(resetLinkPreview()) // Reset state link preview
    }

    // Xử lý khi có link preview - xóa ảnh
    useEffect(() => {
        if (linkData?.url) {
            setFormData((prev) => ({
                ...prev,
                content: {
                    ...prev.content,
                    attachment: [], // Xóa ảnh khi có link preview
                },
            }))
        }
    }, [linkData])

    return (
        <>
            <div className="fixed inset-0 flex justify-center items-center z-[999]">
                <div className="fixed inset-0  bg-gray-900 bg-opacity-50" onClick={handleClick}></div>
                <div className="bg-[#ffffff] justify-center items-center w-[600px] p-8 rounded-md mb-4 z-10">
                    <div label="Caption" className="flex flex-col justify-center items-center gap-3">
                        <div className="flex justify-between w-full border-b-2 border-gray-200 pb-2">
                            <span> </span>
                            <span className="text-2xl font-bold text-center">Create Post</span>
                            <div
                                onClick={handleClick}
                                className="flex justify-center cursor-pointer items-center p-2 rounded-full w-9 h-9"
                            >
                                <CloseOutlined />
                            </div>
                        </div>
                        <div className="flex gap-3 justify-start w-full">
                            <Avatar size={50} src={authUser?.avatar} style={{ cursor: 'pointer' }}></Avatar>
                            <div>
                                <div href="#" className="flex items-center gap-2 text-black no-underline text-nowrap">
                                    <span className="font-semibold">
                                        {authUser?.name}{' '}
                                        {selectedProjectName ? `in project ${selectedProjectName}` : ''}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-500">@{authUser.email}</div>
                            </div>
                        </div>
                        <div className="w-full text-wrap p-2 ">
                            <Textarea
                                ref={ref}
                                placeholder="Hire Talents For Your Project"
                                style={{
                                    background: '#FFFFFF',
                                    outline: 'none',
                                    height: '100px',
                                }}
                                className="gap-2"
                                maxH="200px"
                                value={formData.content.caption}
                                onChange={handleTextChange}
                            ></Textarea>
                            {renderDomainWarning()}
                            {renderLinkPreview()}
                            <div>
                                <div className="overflow-y-auto">{renderPreviewImages()}</div>
                            </div>
                            <div>
                                <Dialog.Root
                                    open={isModalOpen}
                                    onClose={handleModalClose}
                                    style={{ width: '100%' }}
                                    zIndex={9999}
                                    motionPreset="slide-in-left"
                                    placement={'center'}
                                >
                                    <Portal>
                                        <Dialog.Backdrop />
                                        <Dialog.Positioner>
                                            <Dialog.Content>
                                                <Dialog.Header>
                                                    <Dialog.Title>Tag your project</Dialog.Title>
                                                </Dialog.Header>
                                                <Dialog.Header>
                                                    <InputGroup flex="1" startElement={<LuSearch />}>
                                                        <Input
                                                            placeholder="Search project"
                                                            onChange={(e) => handleSearch(e)}
                                                        />
                                                    </InputGroup>
                                                </Dialog.Header>
                                                <div>
                                                    <Dialog.Body>
                                                        {projectsToTag?.map((project, index) => (
                                                            <div className="mx-[-16px] px-[16px]" key={index}>
                                                                <div className=" rounded-md w-full max-w-[600px] p-4">
                                                                    <div
                                                                        className="bg-[#ffffff] border-[1px] rounded-md w-full max-w-[600px] p-4 cursor-pointer"
                                                                        onClick={() => handleSelectProject(project)}
                                                                    >
                                                                        <div className="flex items-center gap-4">
                                                                            <div className="flex-grow flex flex-col justify-between">
                                                                                <h5 className="text-lg font-semibold">
                                                                                    <a
                                                                                        href="#"
                                                                                        className="text-black no-underline"
                                                                                    >
                                                                                        {project?.name}
                                                                                    </a>
                                                                                </h5>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </Dialog.Body>
                                                </div>

                                                <Dialog.Footer>
                                                    <Dialog.ActionTrigger>
                                                        <Button variant="outline" onClick={handleModalClose}>
                                                            Cancel
                                                        </Button>
                                                    </Dialog.ActionTrigger>
                                                    <Button>Save</Button>
                                                </Dialog.Footer>
                                                <Dialog.CloseTrigger asChild>
                                                    <CloseButton size="sm" onClick={handleModalClose} />
                                                </Dialog.CloseTrigger>
                                            </Dialog.Content>
                                        </Dialog.Positioner>
                                    </Portal>
                                </Dialog.Root>
                            </div>
                        </div>
                        <div className=" flex items-center justify-between border border-gray-200 rounded-md p-3 w-full">
                            <span>Add to your post</span>
                            <div className="flex gap-3">
                                <div className="cursor-pointer">
                                    <FileUpload.Root
                                        key={fileKey}
                                        alignItems="stretch"
                                        maxFiles={10}
                                        value={formData.content.attachment}
                                        onChange={handleFileChange}
                                        maxW="100%" // Use full width
                                    >
                                        <FileUpload.HiddenInput maxWidth="xl" />
                                        <FileUpload.Trigger asChild>
                                            <div className="cursor-pointer p-0 flex items-center justify-center">
                                                <IconlyImage2 size={30} color={'#000000'} />
                                            </div>
                                        </FileUpload.Trigger>
                                    </FileUpload.Root>
                                </div>
                                <div className="cursor-pointer" onClick={handleModalOpen}>
                                    <IconlyWork size={30} color={'#000000'} />
                                </div>
                                <div className="cursor-pointer">
                                    <IconlyAddUser size={30} color={'#000000'} />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 w-full">
                            {isLoadingCreateArticle ? (
                                <Button
                                    loading
                                    className="rounded-md bg-[#0866FF] w-full hover:bg-[#3897F0] font-medium text-[#FFFFFF] text-[15px]"
                                >
                                    Post
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleSubmit}
                                    className="rounded-md bg-[#0866FF] w-full hover:bg-[#3897F0] font-medium text-[#FFFFFF] text-[15px]"
                                >
                                    Post
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

CreateArticleForm.displayName = 'CreateArticleForm'
export default CreateArticleForm
