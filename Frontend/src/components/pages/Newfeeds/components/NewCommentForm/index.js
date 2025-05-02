import React, { useEffect } from 'react'
import { IconlyImage2, IconlySend } from 'components/UI/Iconly'
import avt from 'assets/images/background/avt.jpg'
import { useSelector } from 'react-redux'
import { FileUpload } from '@chakra-ui/react'
import { useState } from 'react'
import { resetComment, resetReply } from 'states/modules/article'
import { useDispatch } from 'react-redux'
import resizeBackground from 'utils/files/resizeBackground'
const NewCommentForm = ({ article_id, onSubmit, selectedComment, isCommentOrReply, handleClickReply, onReset }) => {
    const dispatch = useDispatch()
    const authUser = useSelector((state) => state.auth.authUser)
    const [formData, setFormData] = useState({
        article_id: article_id,
        content: {
            caption: '',
            image: '',
        },
    })

    const [fileKey, setFileKey] = useState(0)

    const handleFileChange = async (event) => {
        const file = event.target.files[0]
        const resizeFile = await resizeBackground(file)

        setFormData({
            ...formData,
            content: {
                ...formData.content,
                image: resizeFile,
            },
        })
    }

    const handleSubmit = async () => {
        await onSubmit(formData)
        if (isCommentOrReply === 'reply') {
            dispatch(resetReply())
            onReset()
            handleClickReply()
        }
        setFormData({
            article_id: article_id,
            content: {
                caption: '',
                image: '',
            },
        })
        setFileKey((prev) => prev + 1)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault() // Prevent default enter behavior
            if (formData.content.caption.trim()) {
                // Only submit if there's content
                handleSubmit()
            }
        }
    }

    const handleRemoveImage = () => {
        setFormData({
            ...formData,
            content: {
                ...formData.content,
                image: '',
            },
        })
    }

    const handlePreviewImage = () => {
        const image = formData.content.image
        if (formData.content.image) {
            return (
                <div className="relative mt-2" style={{ width: '15vw' }}>
                    <div className="relative">
                        <button
                            className="absolute top-1 right-1 text-[30px] text-[#6f7f92] rounded-full w-6 h-6 flex items-center justify-center z-[999999]"
                            onClick={() => handleRemoveImage()}
                        >
                            ×
                        </button>
                        <img
                            src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                            className="object-cover rounded-md auto"
                        />
                    </div>
                </div>
            )
        }
    }

    const handleCancelReply = () => {
        setFormData({
            article_id: article_id,
            content: {
                caption: '',
                image: '',
            },
        })
        handleClickReply()
    }
    return (
        <div>
            <div className="flex items-center w-full rounded-md " onKeyDown={handleKeyDown}>
                <div className="flex items-center p-3">
                    <div className="w-8 h-8">
                        {authUser?.avatar ? (
                            <img src={authUser?.avatar} className="w-8 h-8 rounded-full" />
                        ) : (
                            <img src={avt} className="w-8 h-8 rounded-full" />
                        )}
                    </div>
                </div>
                <div className="flex items-center bg-[#F8F9FA] p-3 rounded-md w-full justify-between">
                    <div className="w-full flex-2">
                        <div className="w-full pb-2 flex-2">
                            {isCommentOrReply === 'reply' ? (
                                <div className="space-y-2">
                                    <div className="relative w-full bg-gray-50 rounded-lg overflow-hidden">
                                        <div className="relative border-l-4 border-blue-500 p-3">
                                            <button
                                                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 rounded-full w-6 h-6 flex items-center justify-center transition-colors duration-200"
                                                onClick={() => handleCancelReply()}
                                            >
                                                <span className="text-xl">×</span>
                                            </button>
                                            <div className="text-xs text-blue-500 font-medium mb-1">
                                                Replying to {selectedComment.user[0]?.name}
                                            </div>
                                            <p className="text-sm text-gray-600 pr-8 line-clamp-2">
                                                {selectedComment.content.caption}
                                            </p>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Write your reply..."
                                        className="w-full h-9 bg-[#F8F9FA] pr-[50px] outline-none focus:ring-1 focus:ring-blue-500 rounded-md transition-all duration-200"
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                content: {
                                                    ...formData.content,
                                                    caption: e.target.value,
                                                },
                                            })
                                        }
                                        value={formData.content.caption}
                                    />
                                </div>
                            ) : (
                                <input
                                    type="text"
                                    placeholder="Write a comment..."
                                    className="w-full h-9 bg-[#F8F9FA] pr-[50px] outline-none "
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            content: {
                                                ...formData.content,
                                                caption: e.target.value,
                                            },
                                        })
                                    }
                                    value={formData.content.caption}
                                />
                            )}

                            <div className="p-1">{formData.content.image && handlePreviewImage()}</div>
                        </div>
                        <div className="w-1 h-1 bg-[#f8f9fa] rounded-md flex items-center justify-center">
                            <FileUpload.Root
                                accept="image/*"
                                value={formData.content.image}
                                onChange={handleFileChange}
                                key={fileKey}
                            >
                                <FileUpload.HiddenInput />
                                <FileUpload.Trigger asChild>
                                    <div className="flex items-center justify-center p-0 cursor-pointer">
                                        <IconlyImage2 size={25} color={'#6f7f92'} />
                                    </div>
                                </FileUpload.Trigger>
                            </FileUpload.Root>
                        </div>
                    </div>
                    {formData.content.image || formData.content.caption ? (
                        <div className="flex" onClick={handleSubmit} style={{ cursor: 'pointer' }}>
                            <IconlySend size={30} color={'#6f7f92'} />
                        </div>
                    ) : (
                        <div className="flex" style={{ cursor: 'pointer' }}>
                            <IconlySend size={30} color={'#6f7f92'} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NewCommentForm
